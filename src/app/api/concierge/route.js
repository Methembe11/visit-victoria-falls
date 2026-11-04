import { NextResponse } from "next/server";
import { experiences, stays, restaurants, guides } from "@/data/site";
import { allow, clientKey } from "@/lib/rate-limit";
export const runtime = "nodejs";
const catalogue = [
  ...experiences.map(x => ({ title:x.title, description:x.blurb, category:x.category, href:`/things-to-do/${x.slug}` })),
  ...stays.map(x => ({ title:x.name, description:x.blurb, category:x.type, href:`/places-to-stay/${x.slug}` })),
  ...restaurants.map(x => ({ title:x.name, description:x.blurb, category:x.type, href:`/restaurants/${x.slug}` })),
  ...guides.map(x => ({ title:x.title, description:x.excerpt, category:x.category, href:`/guides/${x.slug}` })),
];
const clean = (v,n=1200) => String(v??"").replace(/[\u0000-\u001f]/g," ").trim().slice(0,n);
function recommend(q) {
 const words=q.toLowerCase().split(/[^a-z0-9]+/).filter(w=>w.length>2);
 return catalogue.map(x=>({...x,score:words.reduce((s,w)=>s+(x.title.toLowerCase().includes(w)?3:0)+(x.description.toLowerCase().includes(w)?1:0)+(x.category.toLowerCase().includes(w)?2:0),0)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,3);
}
function fallback(q,items) {
 const t=q.toLowerCase();
 if (/\b(hello|hi|hey|good morning|good afternoon)\b/.test(t)) return "Hello! Lovely to have you here. Are you looking for things to do, somewhere to stay, places to eat, or help planning your days?";
 if (/\b(plan|itinerary|days|trip)\b/.test(t)) return "Tell me how many days you have, when you're visiting, who you're travelling with and what you enjoy. You can also use our trip planner for a day-by-day suggestion.";
 if (/\b(price|cost|availability|available|book|booking)\b/.test(t)) return "Prices and availability change, and we don't have live booking access. Please contact the provider to confirm the current price, dates, inclusions and cancellation terms.";
 if (items.length) return "Here are a few useful places to start from our Victoria Falls directory. Open a listing for details, then confirm current arrangements directly with the provider.";
 return "I can help you explore experiences, accommodation, restaurants and travel guides around Victoria Falls. Try asking about helicopter flights, sunset cruises, places to stay or how to plan a few days here.";
}
async function askAI(q,history) {
 const key=process.env.OPENAI_API_KEY; if(!key) return null;
 const list=catalogue.map(x=>`- ${x.title} [${x.category}] — ${x.description} (link: ${x.href})`).join("\n");
 const res=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${key}`},signal:AbortSignal.timeout(12000),body:JSON.stringify({model:process.env.OPENAI_MODEL||"gpt-4o-mini",temperature:.35,max_tokens:450,messages:[
 {role:"system",content:`You are a warm, concise travel concierge for Victoria Falls, Zimbabwe. Use only this catalogue for named listings and links. Never invent prices, availability, hours, phone numbers, transport schedules or booking confirmations. For live details, tell visitors to confirm with providers. Never claim to make bookings. Mention /plan for a day-by-day itinerary. Catalogue:\n${list}`},
 ...history.filter(x=>["user","assistant"].includes(x.role)).slice(-6).map(x=>({role:x.role,content:clean(x.content)})),
 {role:"user",content:q}
]})});
 if(!res.ok) throw new Error("AI unavailable");
 const data=await res.json(); return clean(data?.choices?.[0]?.message?.content,1800)||null;
}
async function store(q,a) {
 const url=process.env.SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key)return;
 try { await fetch(`${url}/rest/v1/concierge_messages`,{method:"POST",headers:{"Content-Type":"application/json",apikey:key,Authorization:`Bearer ${key}`,Prefer:"return=minimal"},body:JSON.stringify({visitor_message:q,assistant_reply:a}),signal:AbortSignal.timeout(2500)}); } catch {}
}
export async function POST(req) {
 if(!allow(`concierge:${clientKey(req)}`,18,60000)) return NextResponse.json({error:"Please wait a moment before sending another question."},{status:429});
 let body; try{body=await req.json()}catch{return NextResponse.json({error:"Please send a valid message."},{status:400})}
 const q=clean(body?.message); if(q.length<2)return NextResponse.json({error:"Please enter a little more detail."},{status:400});
 const matches=recommend(q); let reply=null;
 try{reply=await askAI(q,Array.isArray(body.history)?body.history:[])}catch{}
 reply ||= fallback(q,matches); await store(q,reply);
 return NextResponse.json({reply,recommendations:matches.map(({title,href})=>({title,href})),generatedBy:process.env.OPENAI_API_KEY?"ai-or-fallback":"local"});
}
