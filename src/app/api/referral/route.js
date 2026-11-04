import { NextResponse } from "next/server";
import { insertRow } from "@/lib/supabase";
import { getApprovedReferral } from "@/lib/partner-referrals";
import { allow, clientKey } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function GET(request) {
  if (!allow("referral:" + clientKey(request), 30, 60 * 1000)) return NextResponse.redirect(new URL("/things-to-do", request.url));
  const params = new URL(request.url).searchParams;
  const type = params.get("type");
  const slug = (params.get("slug") || "").slice(0, 100);
  if (!["accommodation", "experience", "dining"].includes(type) || !/^[a-z0-9-]+$/.test(slug)) return NextResponse.redirect(new URL("/", request.url));
  const partner = getApprovedReferral(type, slug);
  if (!partner) {
    const fallback = type === "accommodation" ? "/places-to-stay/" + slug : type === "dining" ? "/restaurants/" + slug : "/things-to-do/" + slug;
    return NextResponse.redirect(new URL(fallback, request.url));
  }
  try {
    await insertRow("analytics_events", { event_type: "outbound_click", label: type + ":" + slug + ":" + partner.providerName, path: "/api/referral" });
  } catch (error) {
    console.error("Referral click could not be recorded:", error.message);
  }
  return NextResponse.redirect(partner.bookingUrl, { status: 302 });
}
