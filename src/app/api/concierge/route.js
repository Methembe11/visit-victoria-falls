import { NextResponse } from "next/server";
import { experiences, stays, restaurants, guides, faqs, trustPoints } from "@/data/site";
import { allow, clientKey } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 60;

const catalogue = [
  ...experiences.map((x) => ({ title: x.title, description: x.blurb, category: x.category, href: "/things-to-do/" + x.slug })),
  ...stays.map((x) => ({ title: x.name, description: x.blurb, category: x.type, href: "/places-to-stay/" + x.slug })),
  ...restaurants.map((x) => ({ title: x.name, description: x.blurb, category: x.type, href: "/restaurants/" + x.slug })),
  ...guides.map((x) => ({ title: x.title, description: x.excerpt, category: x.category, href: "/guides/" + x.slug })),
];
const clean = (value, max = 1200) => String(value ?? "").replace(/[\u0000-\u001f]/g, " ").trim().slice(0, max);

function destinationKnowledge() {
  const guideText = guides.map((guide) => [
    "GUIDE: " + guide.title + " (" + guide.category + ")",
    guide.intro || guide.excerpt || "",
    ...(guide.sections || []).flatMap((section) => [section.heading, ...(section.body || []), ...(section.list || [])]),
  ].join("\n")).join("\n\n");
  const faqText = (faqs || []).map((item) => JSON.stringify(item)).join("\n");
  const trustText = (trustPoints || []).map((item) => JSON.stringify(item)).join("\n");
  const listings = catalogue.map((item) => "- " + item.title + " [" + item.category + "]: " + item.description + " (site link: " + item.href + ")").join("\n");
  return ["CURATED VICTORIA FALLS KNOWLEDGE", guideText, "SITE FAQS", faqText, "SITE INFORMATION", trustText, "CURRENT DIRECTORY LISTINGS", listings].join("\n\n");
}

function isRejectingOptions(message) {
  return /\b(i\s+)?(dont|don\x27t|do not|didnt|didn\x27t)\s+(want|like|need)\s+(those|these|them|that)\b|\bnot interested\b|\bnone of those\b|\btry something else\b/i.test(message);
}

function relevantRecommendations(question, reply, history) {
  const combined = (question + " " + reply).toLowerCase();
  const rejected = new Set();
  for (const message of history) {
    if (message.role === "assistant" && Array.isArray(message.recommendations)) {
      for (const item of message.recommendations) rejected.add(String(item.title || "").toLowerCase());
    }
  }
  const terms = combined.split(/[^a-z0-9]+/).filter((word) => word.length > 3);
  return catalogue.map((item) => {
    const text = (item.title + " " + item.description + " " + item.category).toLowerCase();
    const score = terms.reduce((total, word) => total + (text.includes(word) ? (item.title.toLowerCase().includes(word) ? 3 : 1) : 0), 0);
    return { ...item, score };
  }).filter((item) => item.score >= 2 && !rejected.has(item.title.toLowerCase()))
    .sort((a, b) => b.score - a.score).slice(0, 3)
    .map(({ title, href }) => ({ title, href }));
}

function responseText(data) {
  const parts = [];
  for (const item of data.output || []) {
    if (item.type !== "message") continue;
    for (const part of item.content || []) {
      if (part.type === "output_text" && part.text) parts.push(part);
    }
  }
  return { text: parts.map((part) => part.text).join("\n").trim(), parts };
}

async function askAI(question, history) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  const model = process.env.OPENAI_WEB_SEARCH_MODEL || "gpt-5.5";
  const conversation = history.filter((item) => ["user", "assistant"].includes(item.role)).slice(-10)
    .map((item) => item.role.toUpperCase() + ": " + clean(item.content, 1200)).join("\n");
  const prompt = [
    "You are the official-feeling but independent Visit Victoria Falls digital concierge. Be warm, thoughtful, locally aware, accurate and concise.",
    "Answer questions about Victoria Falls, Zimbabwe and the wider Zambezi region. Use the curated knowledge below as the site\x27s first-party editorial source.",
    "If the knowledge does not cover the question, or the answer may have changed (weather, river levels, park access, visas, border rules, flights, schedules, safety advisories, prices, opening times, events or current operators), use web search before answering.",
    "Do not guess. If sources disagree or evidence is unclear, explain the uncertainty and recommend confirming with the responsible official body or provider.",
    "Prioritise official and primary sources for travel rules, safety, park access and current operating information. Clearly distinguish Zimbabwe from Zambia and identify which side a place or activity is on.",
    "Never invent prices, availability, opening hours, phone numbers, transport schedules, provider details or confirmed bookings. Never claim to book anything.",
    "For site directory recommendations, only link to exact catalogue paths supplied below. Do not invent site URLs. Recommend only items clearly relevant to the visitor\x27s stated interests.",
    "If the visitor rejects suggestions, acknowledge it and ask what they would prefer; do not immediately produce a different random list. Ask one useful clarifying question when needed.",
    "When giving researched information, include source links through the citations supplied by web search. Do not fabricate citations.",
    "Mention /plan when a day-by-day itinerary would help. Keep answers useful and not overly long.",
    "CURATED SITE KNOWLEDGE:\n" + destinationKnowledge(),
    "RECENT CONVERSATION:\n" + (conversation || "No earlier messages."),
    "VISITOR QUESTION:\n" + question,
  ].join("\n\n");
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + apiKey },
    signal: AbortSignal.timeout(50000),
    body: JSON.stringify({
      model,
      tools: [{ type: "web_search", search_context_size: "medium", user_location: { type: "approximate", country: "ZW", city: "Victoria Falls", region: "Matabeleland North", timezone: "Africa/Harare" } }],
      tool_choice: "auto",
      input: prompt,
      max_output_tokens: 850,
    }),
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error("OpenAI Responses API error: " + response.status + " " + error.slice(0, 500));
  }
  const data = await response.json();
  const parsed = responseText(data);
  if (!parsed.text) throw new Error("Empty concierge response");
  const citations = [];
  for (const part of parsed.parts) {
    for (const annotation of part.annotations || []) {
      if (annotation.type !== "url_citation") continue;
      const citation = annotation.url_citation || annotation;
      if (citation.url && !citations.some((item) => item.url === citation.url)) {
        citations.push({ title: clean(citation.title || citation.url, 160), url: citation.url });
      }
    }
  }
  return { reply: clean(parsed.text, 3500), citations: citations.slice(0, 6), model };
}

async function store(question, answer) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return;
  try {
    await fetch(url + "/rest/v1/concierge_messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: key, Authorization: "Bearer " + key, Prefer: "return=minimal" },
      body: JSON.stringify({ visitor_message: question, assistant_reply: answer }),
      signal: AbortSignal.timeout(2500),
    });
  } catch {}
}

function localReply(question) {
  const text = question.toLowerCase();
  if (isRejectingOptions(question)) return "No problem — I won\x27t keep suggesting those. What kind of experience would you prefer instead: nature and wildlife, culture, food, relaxation, or something more adventurous?";
  if (/\b(hello|hi|hey|good morning|good afternoon)\b/.test(text)) return "Hello, and welcome to Victoria Falls. I can help with the Falls themselves, experiences, places to stay, food, local culture and practical travel questions. What are you curious about?";
  if (/\b(price|cost|availability|available|book|booking|open now)\b/.test(text)) return "Those details can change, and I can\x27t confirm live prices or availability here. Please check directly with the relevant provider before making plans.";
  return "I can help explore Victoria Falls and the surrounding Zambezi region. I couldn\x27t reach the live research service just now, so I don\x27t want to guess. You can ask me about the Falls, seasons, activities, wildlife, travel logistics or local culture.";
}

export async function POST(request) {
  if (!allow("concierge:" + clientKey(request), 18, 60000)) {
    return NextResponse.json({ error: "Please wait a moment before sending another question." }, { status: 429 });
  }
  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Please send a valid message." }, { status: 400 }); }
  const question = clean(body?.message);
  if (question.length < 2) return NextResponse.json({ error: "Please enter a little more detail." }, { status: 400 });
  const history = Array.isArray(body.history) ? body.history.slice(-10).map((item) => ({
    role: item?.role === "assistant" ? "assistant" : "user",
    content: clean(item?.content, 1200),
    recommendations: Array.isArray(item?.recommendations) ? item.recommendations.slice(0, 5) : [],
  })) : [];
  let result = null;
  let generatedBy = "local";
  if (process.env.OPENAI_API_KEY) {
    try { result = await askAI(question, history); generatedBy = "openai-web"; } catch (error) {
      console.error("[concierge] Live research failed:", error.message);
    }
  }
  const reply = result?.reply || localReply(question);
  const recommendations = result ? relevantRecommendations(question, reply, history) : [];
  await store(question, reply);
  return NextResponse.json({ reply, recommendations, citations: result?.citations || [], generatedBy });
}