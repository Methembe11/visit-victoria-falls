import { selectRows } from "@/lib/supabase";
import { site } from "@/data/site";
import crypto from "node:crypto";

export const dynamic = "force-dynamic";
export const metadata = { title: "Studio", robots: { index: false, follow: false } };

function safeEqual(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

function countBy(items, key) {
  const counts = new Map();
  for (const item of items) {
    const value = item[key];
    if (value) counts.set(value, (counts.get(value) || 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12);
}

export default async function StudioPage({ searchParams }) {
  const { key } = await searchParams;
  const expected = process.env.STUDIO_KEY;
  if (!expected) return <section className="section"><div className="shell--narrow"><span className="eyebrow">Studio</span><h1 className="h2" style={{ marginTop: 16 }}>Studio is not configured.</h1><p className="muted">Set the server-side STUDIO_KEY environment variable.</p></div></section>;
  if (!key || !safeEqual(key, expected)) return <section className="section"><div className="shell--narrow"><span className="eyebrow">Studio</span><h1 className="h2" style={{ marginTop: 16 }}>Access required.</h1><p className="muted">Append your studio key to the URL: /studio?key=…</p></div></section>;

  let events = [];
  let enquiries = [];
  let error = "";
  try {
    [events, enquiries] = await Promise.all([
      selectRows("analytics_events", "select=event_type,label,path,created_at&order=created_at.desc&limit=1000"),
      selectRows("enquiries", "select=id,name,email,topic,message,created_at&order=created_at.desc&limit=100"),
    ]);
  } catch (err) {
    error = "The dashboard could not load its records from Supabase. Check the server-side database configuration.";
    console.error("[studio] Supabase read failed:", err.message);
  }

  const pageViews = events.filter((event) => event.event_type === "page_view");
  const listingClicks = events.filter((event) => event.event_type === "listing_click");
  const planSubmits = events.filter((event) => event.event_type === "plan_submit");
  const enquirySubmits = events.filter((event) => event.event_type === "enquiry_submit");
  const topPages = countBy(pageViews, "path");
  const topListings = countBy(listingClicks, "label");

  return <section className="section studio"><div className="shell">
    <span className="eyebrow">Studio</span><h1 className="h2" style={{ marginTop: 14 }}>Destination analytics.</h1>
    <p className="muted" style={{ marginTop: 12 }}>{site.name} · Supabase · Last refreshed {new Date().toLocaleString()}</p>
    {error && <p role="alert" className="field__error" style={{ marginTop: 20 }}>{error}</p>}
    <div className="studio__grid" style={{ marginTop: 36 }}>
      {[["Page views", pageViews.length], ["Listing clicks", listingClicks.length], ["Planner submits", planSubmits.length], ["Enquiries", enquiries.length], ["Enquiry submit events", enquirySubmits.length]].map(([label, value]) => <div className="studio__card" key={label}><span>{label}</span><strong>{value}</strong></div>)}
    </div>
    <div className="grid grid--2" style={{ marginTop: 56 }}>
      <div><h2 className="h4">Most viewed pages</h2><table style={{ width: "100%", marginTop: 16, borderCollapse: "collapse", fontSize: 14 }}><thead><tr><th style={{ textAlign: "left" }}>Page</th><th style={{ textAlign: "right" }}>Views</th></tr></thead><tbody>{topPages.map(([path, count]) => <tr key={path}><td>{path}</td><td style={{ textAlign: "right" }}>{count}</td></tr>)}{!topPages.length && <tr><td colSpan={2} className="muted">No page views recorded yet.</td></tr>}</tbody></table></div>
      <div><h2 className="h4">Most clicked listings</h2><table style={{ width: "100%", marginTop: 16, borderCollapse: "collapse", fontSize: 14 }}><thead><tr><th style={{ textAlign: "left" }}>Listing</th><th style={{ textAlign: "right" }}>Clicks</th></tr></thead><tbody>{topListings.map(([label, count]) => <tr key={label}><td>{label}</td><td style={{ textAlign: "right" }}>{count}</td></tr>)}{!topListings.length && <tr><td colSpan={2} className="muted">No listing clicks recorded yet.</td></tr>}</tbody></table></div>
    </div>
    <div style={{ marginTop: 56 }}><h2 className="h4">Recent enquiries ({enquiries.length})</h2><div style={{ display: "grid", gap: 12, marginTop: 18 }}>{enquiries.map((item) => <article key={item.id} style={{ border: "1px solid var(--hairline)", padding: 18 }}><div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}><strong>{item.name} · {item.email}</strong><span className="muted" style={{ fontSize: 11 }}>{new Date(item.created_at).toLocaleString()}</span></div><p style={{ marginTop: 8, fontSize: 12, textTransform: "uppercase" }}>{item.topic}</p><p style={{ marginTop: 8, fontSize: 14, lineHeight: 1.7 }}>{item.message}</p></article>)}{!enquiries.length && <p className="muted">No enquiries stored yet.</p>}</div></div>
  </div></section>;
}
