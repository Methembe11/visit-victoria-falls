import { NextResponse } from "next/server";
import { experiences } from "@/data/site";
import { allow, clientKey } from "@/lib/rate-limit";

export const runtime = "nodejs";

const VALID_BUDGETS = ["Budget", "Mid-range", "Comfort", "Luxury"];
const VALID_GROUPS = ["Solo", "Couple", "Family", "Friends"];
const VALID_INTERESTS = [
  "Adventure",
  "Wildlife",
  "Nature",
  "Culture",
  "Food",
  "Family",
  "Relaxation",
  "Luxury",
];

function clean(value, max = 60) {
  return String(value ?? "").replace(/[^\w\s'&-]/g, "").trim().slice(0, max);
}

function interestMatch(experience, interests) {
  const haystack = `${experience.category} ${experience.title} ${experience.blurb} ${(experience.bestFor || "")}`.toLowerCase();
  return interests.some((interest) => haystack.includes(interest.toLowerCase()));
}

const timeOfDay = {
  Adventure: "Morning",
  Wildlife: "Early morning",
  Nature: "Morning",
  River: "Late afternoon",
  Culture: "Afternoon",
  Food: "Evening",
  Travel: "Flexible",
  "Day trip": "Full day",
};

function buildLocalPlan({ month, days, budget, group, interests }) {
  const bySlug = new Map(experiences.map((item) => [item.slug, item]));

  const ranked = [...experiences].sort((a, b) => {
    return Number(interestMatch(b, interests)) - Number(interestMatch(a, interests));
  });

  const isFullDay = (item) => /full day/i.test(item.duration) || item.category === "Day trip";
  const excluded = new Set(["rainforest-walk", "airport-transfers"]);

  if (group === "Family" || interests.includes("Family")) {
    excluded.add("bungee-jump");
    excluded.add("devils-pool");
  }

  if (interests.includes("Relaxation")) {
    excluded.add("bungee-jump");
    excluded.add("devils-pool");
  }

  const morningPool = ranked.filter(
    (item) =>
      !excluded.has(item.slug) &&
      !isFullDay(item) &&
      ["Adventure", "Wildlife", "Nature"].includes(item.category)
  );

  const eveningPool = ranked.filter(
    (item) =>
      !excluded.has(item.slug) &&
      !isFullDay(item) &&
      ["River", "Food", "Culture"].includes(item.category)
  );

  const rainforest = bySlug.get("rainforest-walk");
  const cruise = bySlug.get("zambezi-sunset-cruise");

  let morningIndex = 0;
  let eveningIndex = 0;

  function nextMorning() {
    const item = morningPool[morningIndex] || null;
    morningIndex += 1;
    return item;
  }

  function nextEvening() {
    const item = eveningPool[eveningIndex] || null;
    eveningIndex += 1;
    return item;
  }

  const planDays = [];

  for (let index = 0; index < days; index += 1) {
    const dayNumber = index + 1;
    const isFirst = index === 0;
    const isLast = index === days - 1;
    const slots = [];

    if (isFirst) {
      slots.push({ time: "Midday", text: "Arrive, check in and take your time" });
      if (rainforest) {
        slots.push({ time: "Late afternoon", text: rainforest.title });
      }
      slots.push({ time: "Evening", text: "Dinner near your accommodation" });
      planDays.push({ day: dayNumber, title: "Arrive and meet the Falls", slots });
      continue;
    }

    if (isLast) {
      if (days >= 2) {
        const finalMorning = nextMorning();
        if (finalMorning) {
          slots.push({ time: "Early morning", text: finalMorning.title });
        }
      }
      slots.push({ time: "Morning", text: "Slow breakfast and a last look at the river" });
      slots.push({ time: "Midday", text: "Transfer to the airport" });
      planDays.push({
        day: dayNumber,
        title: "A last morning",
        slots,
      });
      continue;
    }

    const morning = nextMorning();
    const evening = nextEvening() || (morning ? null : cruise);

    if (morning) slots.push({ time: timeOfDay[morning.category] || "Morning", text: morning.title });
    slots.push({ time: "Midday", text: "Lunch and time at leisure" });
    if (evening) {
      slots.push({ time: timeOfDay[evening.category] || "Late afternoon", text: evening.title });
    } else if (morning) {
      slots.push({ time: "Late afternoon", text: "Time by the river or at your lodge" });
    }

    planDays.push({
      day: dayNumber,
      title: morning ? morning.title : "A day at your own pace",
      slots,
    });
  }

  const order = {
    "Early morning": 0,
    Morning: 1,
    Midday: 2,
    Afternoon: 3,
    "Late afternoon": 4,
    Evening: 5,
    "Full day": 2,
    Flexible: 2,
  };

  const finalDays = planDays.map((day) => ({
    day: day.day,
    title: day.title,
    items: [...day.slots]
      .sort((a, b) => (order[a.time] ?? 3) - (order[b.time] ?? 3))
      .map((slot) => `${slot.text} — ${slot.time.toLowerCase()}`),
  }));

  const pace = days <= 2 ? "compact first visit" : days <= 4 ? "unhurried short stay" : "slower, deeper stay";

  return {
    title: `${days} days in Victoria Falls`,
    summary: `A suggested ${pace} for a ${group.toLowerCase()} travelling in ${month} with a ${budget.toLowerCase()} budget, shaped around ${interests.slice(0, 3).join(", ").toLowerCase() || "the Falls"}.`,
    days: finalDays,
    notes: `Built from the destination information on this site for ${month}. Activity timing and availability change with river levels, weather and season.`,
    generatedBy: "local",
  };
}

function catalogueForPrompt() {
  return experiences
    .map(
      (item) =>
        `- ${item.title} | category: ${item.category} | duration: ${item.duration} | best for: ${item.bestFor} | summary: ${item.blurb}`
    )
    .join("\n");
}

async function buildAiPlan(payload, apiKey) {
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 14000);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        model,
        temperature: 0.4,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You are a careful travel planning assistant for Victoria Falls, Zimbabwe. Build a suggested itinerary using ONLY the experiences supplied. Never invent prices, availability, opening hours, contact details or bookings. Do not claim anything is confirmed. Keep the tone calm and editorial. Return JSON with keys: title (string), summary (string), days (array of {day:number,title:string,items:string[]}), notes (string). Each day should have 2-4 items. The notes must state that this is a suggestion, not a confirmed booking, and that prices, availability and conditions must be checked with providers.",
          },
          {
            role: "user",
            content: `Traveller: ${payload.days} days in ${payload.month}, budget ${payload.budget}, travelling as ${payload.group}, interests: ${payload.interests.join(", ")}.\n\nAvailable experiences:\n${catalogueForPrompt()}\n\nCreate an itinerary that balances active experiences with rest and does not repeat the same experience.`,
          },
        ],
      }),
    });

    if (!response.ok) throw new Error("AI provider unavailable");
    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) throw new Error("Empty AI response");
    const parsed = JSON.parse(content);

    if (!Array.isArray(parsed.days) || parsed.days.length === 0) throw new Error("Invalid AI plan");

    return {
      title: String(parsed.title || `${payload.days} days in Victoria Falls`).slice(0, 120),
      summary: String(parsed.summary || "").slice(0, 600),
      days: parsed.days.slice(0, payload.days).map((day, index) => ({
        day: index + 1,
        title: String(day.title || `Day ${index + 1}`).slice(0, 120),
        items: Array.isArray(day.items)
          ? day.items.slice(0, 5).map((item) => String(item).slice(0, 220))
          : [],
      })),
      notes: String(parsed.notes || "").slice(0, 500),
      generatedBy: "ai",
    };
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request) {
  if (Number(request.headers.get("content-length") || 0) > 20000) {
    return NextResponse.json({ error: "Invalid request." }, { status: 413 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!allow(`plan:${clientKey(request)}`, 20, 60 * 1000)) {
    return NextResponse.json(
      { error: "That is a lot of itineraries at once. Please wait a moment and try again." },
      { status: 429 }
    );
  }

  const month = clean(payload.month, 20) || "September";
  const days = Number(payload.days);
  const budget = VALID_BUDGETS.includes(payload.budget) ? payload.budget : "Mid-range";
  const group = VALID_GROUPS.includes(payload.group) ? payload.group : "Couple";
  const interests = Array.isArray(payload.interests)
    ? payload.interests.filter((item) => VALID_INTERESTS.includes(item)).slice(0, 8)
    : [];

  if (!Number.isFinite(days) || days < 1 || days > 10) {
    return NextResponse.json({ error: "Choose a trip length between 1 and 10 days." }, { status: 400 });
  }

  const cleanPayload = { month, days, budget, group, interests };

  const apiKey = process.env.OPENAI_API_KEY;
  if (apiKey) {
    try {
      const plan = await buildAiPlan(cleanPayload, apiKey);
      return NextResponse.json({ plan });
    } catch {
      // Fall back to the deterministic planner rather than failing the request.
    }
  }

  return NextResponse.json({ plan: buildLocalPlan(cleanPayload) });
}
