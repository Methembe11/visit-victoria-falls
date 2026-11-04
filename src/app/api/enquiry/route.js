import { NextResponse } from "next/server";
import { appendEnquiry } from "@/lib/store";
import { allow, clientKey } from "@/lib/rate-limit";

export const runtime = "nodejs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TOPICS = [
  "Trip planning",
  "Things to do",
  "Accommodation",
  "Restaurant",
  "Partnership",
  "List my business",
  "Website feedback",
  "Other",
];

function text(value, max) {
  return String(value ?? "").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "").trim().slice(0, max);
}

export async function POST(request) {
  if (Number(request.headers.get("content-length") || 0) > 20000) {
    return NextResponse.json({ error: "Please shorten your message." }, { status: 413 });
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

  if (!allow(`enquiry:${clientKey(request)}`, 10, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many enquiries from this connection. Please try again later or email us directly." },
      { status: 429 }
    );
  }

  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

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

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Please check the highlighted fields.", errors }, { status: 400 });
  }

  try {
    await appendEnquiry({
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      name,
      email,
      topic,
      listing,
      message,
      consent,
      userAgent: request.headers.get("user-agent")?.slice(0, 400) || "",
    });
  } catch (error) {
    console.error("Failed to store enquiry", error);
    return NextResponse.json(
      { error: "We could not send your enquiry. Please email us directly instead." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
