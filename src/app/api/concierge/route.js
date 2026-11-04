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
  return /\b(i\s+)?(dont|don\x27t|do not|didnt|didn\x27t)\s+(want|like|need)\s+(those|these|them|that)\b|\bnot interested\b|\bnone of those\b|\bnot what (i|we) (want|wanted|mean|meant)\b|\b(those|these) (aren\x27t|are not) (for me|what i want)\b|\btry something else\b|\bsomething different\b|\bdifferent suggestions\b/i.test(message);
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

function words(value) {
  return String(value || "").toLowerCase().match(/[a-z0-9]+/g) || [];
}

function scoreMatch(question, item) {
  const ignored = new Set(["what", "where", "when", "with", "from", "about", "tell", "show", "give", "help", "want", "need", "have", "does", "this", "that", "there", "they", "them", "your", "near", "falls", "victoria"]);
  const terms = [...new Set(words(question).filter((word) => word.length > 2 && !ignored.has(word)))];
  const haystack = words([item.title, item.name, item.category, item.type, item.area, item.blurb, item.summary, item.excerpt].join(" ")).join(" ");
  return terms.reduce((total, term) => total + (haystack.includes(term) ? 1 : 0), 0);
}

function localKnowledgeReply(question) {
  const text = question.toLowerCase();
  if (isRejectingOptions(question)) {
    return { reply: "No problem - I will not keep suggesting those. What kind of experience would you prefer instead: nature and wildlife, culture, food, relaxation, or something more adventurous?", recommendations: [], generatedBy: "rejection-handler" };
  }
  if (/\b(hello|hi|hey|good morning|good afternoon)\b/.test(text)) {
    return { reply: "Hello, and welcome to Victoria Falls. I can help you explore experiences, accommodation, restaurants and practical travel information using the Visit Victoria Falls guide. What would you like to know?", recommendations: [], generatedBy: "local-knowledge" };
  }

  if (/wild\s*horizons/i.test(question)) {
    return {
      reply: "Wild Horizons is not currently included in the Visit Victoria Falls directory information available to me. Live web research is temporarily unavailable, so I do not want to guess about its current activities, prices, schedules or contact details. I can still help you understand the types of Victoria Falls experiences to compare, such as game drives, Zambezi cruises, helicopter flights and transfers. Which Wild Horizons service are you interested in?",
      recommendations: [],
      generatedBy: "local-knowledge",
    };
  }

  const faq = (faqs || []).map((item) => ({ ...item, score: scoreMatch(question, { title: item.q, blurb: item.a }) }))
    .sort((a, b) => b.score - a.score)[0];
  if (faq && faq.score >= 3) {
    return { reply: faq.a, recommendations: [], generatedBy: "local-knowledge" };
  }

  const experience = experiences.map((item) => ({ ...item, score: scoreMatch(question, item) }))
    .sort((a, b) => b.score - a.score)[0];
  if (experience && experience.score >= 2) {
    const details = [
      experience.summary,
      experience.duration ? "Typical time: " + experience.duration + "." : "",
      experience.area ? "Location: " + experience.area + "." : "",
      experience.goodToKnow?.length ? "A few things to know: " + experience.goodToKnow.slice(0, 2).join(" ") : "",
    ].filter(Boolean);
    return {
      reply: details.join("\n\n") + "\n\nConfirm current prices, availability and operating arrangements directly with the provider before making plans.",
      recommendations: [{ title: experience.title, href: "/things-to-do/" + experience.slug }],
      generatedBy: "local-knowledge",
    };
  }

  const stay = stays.map((item) => ({ ...item, score: scoreMatch(question, item) })).sort((a, b) => b.score - a.score)[0];
  if (stay && stay.score >= 2) {
    return {
      reply: stay.blurb + " It is in " + stay.area + ". " + stay.note,
      recommendations: [{ title: stay.name, href: "/places-to-stay/" + stay.slug }],
      generatedBy: "local-knowledge",
    };
  }

  const restaurant = restaurants.map((item) => ({ ...item, score: scoreMatch(question, item) })).sort((a, b) => b.score - a.score)[0];
  if (restaurant && restaurant.score >= 2) {
    return {
      reply: restaurant.blurb + " " + restaurant.note,
      recommendations: [{ title: restaurant.name, href: "/restaurants/" + restaurant.slug }],
      generatedBy: "local-knowledge",
    };
  }

  if (/\b(wildlife|animals|safari|elephant|game drive|birds)\b/.test(text)) {
    const items = experiences.filter((item) => /wildlife/i.test(item.category + " " + item.title + " " + item.blurb));
    return {
      reply: "For wildlife around Victoria Falls, the site guide covers guided game drives near town and safaris in Zambezi National Park. Sightings depend on the season, area and time of day, and are never guaranteed. Early morning and late afternoon are common times for game drives. Confirm the route, fees and inclusions with the operator.",
      recommendations: items.slice(0, 3).map((item) => ({ title: item.title, href: "/things-to-do/" + item.slug })),
      generatedBy: "local-knowledge",
    };
  }

  if (/\b(season|weather|rain|water level|high water|low water)\b/.test(text)) {
    const guide = guides.find((item) => item.slug === "complete-guide-to-victoria-falls");
    return {
      reply: "The experience of the Falls changes with the Zambezi's water level. At high water, spray can be intense and paths may be wet; at lower water, more of the rock face is visible. Conditions vary through the year, so check current local conditions before travelling. " + (guide?.excerpt || ""),
      recommendations: guide ? [{ title: guide.title, href: "/guides/" + guide.slug }] : [],
      generatedBy: "local-knowledge",
    };
  }

  if (/\b(visa|passport|border|zambia|zimbabwe side)\b/.test(text)) {
    const item = faqs.find((entry) => /side of victoria falls/i.test(entry.q));
    return {
      reply: item?.a || "Border and visa requirements depend on your nationality and route. Check official immigration sources before travelling and carry your passport when crossing between Zimbabwe and Zambia.",
      recommendations: [],
      generatedBy: "local-knowledge",
    };
  }

  if (/\b(price|cost|availability|available|book|booking|open now|opening hours)\b/.test(text)) {
    return {
      reply: "I can explain what an experience includes, but this guide does not provide live prices, availability or confirmed opening hours. Those details are set by each provider and can change. Please confirm the total price, inclusions, date and time directly before paying.",
      recommendations: [],
      generatedBy: "local-knowledge",
    };
  }

  const best = catalogue.map((item) => ({ ...item, score: scoreMatch(question, item) })).sort((a, b) => b.score - a.score)[0];
  if (best && best.score >= 2) {
    return {
      reply: best.description + " I can share more about what to expect, but current prices and availability need to be confirmed with the provider.",
      recommendations: [{ title: best.title, href: best.href }],
      generatedBy: "local-knowledge",
    };
  }

  return {
    reply: "I can still help using the destination information built into this guide, but live AI research is temporarily unavailable. Try asking about the rainforest and Falls viewpoints, game drives, Zambezi cruises, places to stay, restaurants, border planning or how long to spend in Victoria Falls. I won't invent details that I can't verify.",
    recommendations: [],
    generatedBy: "local-fallback",
  };
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
  if (isRejectingOptions(question)) {
    const reply = "No problem - those suggestions clearly weren't what you had in mind. What would you prefer instead: wildlife and nature, adventure, culture, food, relaxation, or something else?";
    await store(question, reply);
    return NextResponse.json({ reply, recommendations: [], citations: [], generatedBy: "rejection-handler" });
  }
  let result = null;
  if (process.env.OPENAI_API_KEY) {
    try { result = await askAI(question, history); } catch (error) {
      console.error("[concierge] Live research failed:", error.message);
    }
  }
  const local = result ? null : localKnowledgeReply(question);
  const reply = result?.reply || local.reply;
  const recommendations = result ? relevantRecommendations(question, reply, history) : local.recommendations;
  const generatedBy = result ? "openai-web" : local.generatedBy;
  await store(question, reply);
  return NextResponse.json({ reply, recommendations, citations: result?.citations || [], generatedBy });
}
