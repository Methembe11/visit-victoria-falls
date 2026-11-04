import { NextResponse } from "next/server";
import { appendEvent } from "@/lib/store";
import { allow, clientKey } from "@/lib/rate-limit";

export const runtime = "nodejs";

const ALLOWED = new Set([
  "page_view",
  "listing_click",
  "plan_submit",
  "enquiry_submit",
  "outbound_click",
  "search",
  "filter",
]);

function text(value, max) {
  return String(value ?? "").replace(/[\u0000-\u001f]/g, "").trim().slice(0, max);
}

export async function POST(request) {
  if (Number(request.headers.get("content-length") || 0) > 4000) {
    return NextResponse.json({ ok: false }, { status: 413 });
  }

  if (!allow(`track:${clientKey(request)}`, 120, 60 * 1000)) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const type = text(payload.type, 40);
  if (!ALLOWED.has(type)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    await appendEvent({
      type,
      label: text(payload.label, 160),
      href: text(payload.href, 300),
      path: text(payload.path, 200),
      createdAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
