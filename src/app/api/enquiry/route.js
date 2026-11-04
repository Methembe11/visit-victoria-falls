import { NextResponse } from "next/server";
import { insertRow } from "@/lib/supabase";
import { allow, clientKey } from "@/lib/rate-limit";

export const runtime = "nodejs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TOPICS = ["Trip planning", "Things to do", "Accommodation", "Restaurant", "Partnership", "List my business", "Website feedback", "Other"];
const FORM_ENDPOINT = "https://formspree.io/f/mjyyjejk";

function text(value, max) {
  return String(value ?? "").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "").trim().slice(0, max);
}

export async function POST(request) {
  if (Number(request.headers.get("content-length") || 0) > 20000) return NextResponse.json({ error: "Please shorten your message." }, { status: 413 });

  let payload;
  try { payload = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  if (!allow(`enquiry:${clientKey(request)}`, 10, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many enquiries from this connection. Please try again later or email us directly." }, { status: 429 });
  }
  if (payload.website) return NextResponse.json({ ok: true });

  const name = text(payload.name, 120);
  const email = text(payload.email, 200).toLowerCase();
  const topic = TOPICS.includes(payload.topic) ? payload.topic : "Other";
  const message = text(payload.message, 4000);
  const listing = text(payload.listing, 160);
  const consent = payload.consent === true;
  const errors = {};
  if (name.length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL.test(email)) errors.email = "Please enter a valid email address.";
  if (message.length < 20) errors.message = "Please add a little more detail (at least 20 characters).";
  if (!consent) errors.consent = "Please confirm we may reply to your enquiry.";
  if (Object.keys(errors).length) return NextResponse.json({ error: "Please check the highlighted fields.", errors }, { status: 400 });

  // Formspree is the delivery destination; Supabase keeps the private dashboard record.
  let formspreeResponse;
  try {
    formspreeResponse = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name, email, topic, message, listing,
        consent: "Visitor agreed to receive an email reply",
        _subject: `Visit Victoria Falls enquiry: ${topic}`,
        source: "Visit Victoria Falls website",
      }),
      signal: AbortSignal.timeout(12000),
    });
  } catch (error) {
    console.error("Formspree request failed:", error.message);
    return NextResponse.json({ error: "We could not send your enquiry right now. Please try again or contact us directly." }, { status: 502 });
  }
  if (!formspreeResponse.ok) {
    const detail = await formspreeResponse.text();
    console.error("Formspree rejected enquiry:", formspreeResponse.status, detail.slice(0, 400));
    return NextResponse.json({ error: "The enquiry service could not accept your message. Please try again shortly." }, { status: 502 });
  }

  try {
    await insertRow("enquiries", { name, email, topic, message });
  } catch (error) {
    // Do not tell the visitor their message failed after Formspree has already accepted it.
    console.error("Enquiry accepted by Formspree but Supabase archive failed:", error.message);
  }
  return NextResponse.json({ ok: true });
}
