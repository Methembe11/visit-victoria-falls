import { readLines } from "@/lib/store";
import { site } from "@/data/site";
import crypto from "node:crypto";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

function safeEqual(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  if (left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
}

function countBy(items, keyFn) {
  const map = new Map();
  for (const item of items) {
    const key = keyFn(item);
    if (!key) continue;
    map.set(key, (map.get(key) || 0) + 1);
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1]);
}

export default async function StudioPage({ searchParams }) {
  const { key } = await searchParams;
  const expected = process.env.STUDIO_KEY;

  if (!expected) {
    return (
      <section className="section">
        <div className="shell--narrow">
          <span className="eyebrow">Studio</span>
          <h1 className="h2" style={{ marginTop: 16 }}>Studio is not configured.</h1>
          <p className="muted" style={{ marginTop: 16, lineHeight: 1.8 }}>
            Set a <code>STUDIO_KEY</code> environment variable, then open this page with
            <code> ?key=your-key</code>. Analytics are stored as local JSONL files under <code>.data/</code>.
          </p>
        </div>
      </section>
    );
  }

  if (!key || !safeEqual(key, expected)) {
    return (
      <section className="section">
        <div className="shell--narrow">
          <span className="eyebrow">Studio</span>
          <h1 className="h2" style={{ marginTop: 16 }}>Access required.</h1>
          <p className="muted" style={{ marginTop: 16, lineHeight: 1.8 }}>
            Append the studio key to the URL to view analytics: <code>/studio?key=…</code>
          </p>
        </div>
      </section>
    );
  }

  const [events, enquiries] = await Promise.all([readLines("events.jsonl"), readLines("enquiries.jsonl")]);

  const pageViews = events.filter((event) => event.type === "page_view");
  const listingClicks = events.filter((event) => event.type === "listing_click");
  const planSubmits = events.filter((event) => event.type === "plan_submit");
  const enquirySubmits = events.filter((event) => event.type === "enquiry_submit");

  const topPages = countBy(pageViews, (event) => event.path).slice(0, 12);
  const topListings = countBy(listingClicks, (event) => event.label).slice(0, 12);
  const recentEnquiries = [...enquiries].reverse().slice(0, 25);
  const recentPlans = [...planSubmits].reverse().slice(0, 10);

  return (
    <section className="section studio">
      <div className="shell">
        <span className="eyebrow">Studio</span>
        <h1 className="h2" style={{ marginTop: 14 }}>Destination analytics.</h1>
        <p className="muted" style={{ marginTop: 12 }}>
          {site.name} · Local JSONL store · Last refreshed {new Date().toISOString()}
        </p>

        <div className="studio__grid" style={{ marginTop: 36 }}>
          <div className="studio__card">
            <span>Page views</span>
            <strong>{pageViews.length}</strong>
          </div>
          <div className="studio__card">
            <span>Listing clicks</span>
            <strong>{listingClicks.length}</strong>
          </div>
          <div className="studio__card">
            <span>Planner submits</span>
            <strong>{planSubmits.length}</strong>
          </div>
          <div className="studio__card">
            <span>Enquiries</span>
            <strong>{enquiries.length}</strong>
          </div>
        </div>

        <div className="grid grid--2" style={{ marginTop: 56 }}>
          <div>
            <h2 className="h4">Most viewed pages</h2>
            <table style={{ width: "100%", marginTop: 16, borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "1px solid var(--hairline)" }}>
                  <th style={{ padding: "8px 0" }}>Page</th>
                  <th style={{ padding: "8px 0", textAlign: "right" }}>Views</th>
                </tr>
              </thead>
              <tbody>
                {topPages.length === 0 && (
                  <tr><td colSpan={2} style={{ padding: "12px 0" }} className="muted">No page views recorded yet.</td></tr>
                )}
                {topPages.map(([path, count]) => (
                  <tr key={path} style={{ borderBottom: "1px solid var(--hairline)" }}>
                    <td style={{ padding: "8px 0" }}>{path}</td>
                    <td style={{ padding: "8px 0", textAlign: "right" }}>{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h2 className="h4">Most clicked listings</h2>
            <table style={{ width: "100%", marginTop: 16, borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "1px solid var(--hairline)" }}>
                  <th style={{ padding: "8px 0" }}>Listing</th>
                  <th style={{ padding: "8px 0", textAlign: "right" }}>Clicks</th>
                </tr>
              </thead>
              <tbody>
                {topListings.length === 0 && (
                  <tr><td colSpan={2} style={{ padding: "12px 0" }} className="muted">No listing clicks recorded yet.</td></tr>
                )}
                {topListings.map(([label, count]) => (
                  <tr key={label} style={{ borderBottom: "1px solid var(--hairline)" }}>
                    <td style={{ padding: "8px 0" }}>{label || "(unlabelled)"}</td>
                    <td style={{ padding: "8px 0", textAlign: "right" }}>{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ marginTop: 56 }}>
          <h2 className="h4">Recent enquiries ({enquirySubmits.length} form submissions)</h2>
          <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
            {recentEnquiries.length === 0 && <p className="muted">No enquiries stored yet.</p>}
            {recentEnquiries.map((enquiry) => (
              <article key={enquiry.id} style={{ border: "1px solid var(--hairline)", padding: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                  <strong>{enquiry.name} · {enquiry.email}</strong>
                  <span className="muted" style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    {new Date(enquiry.createdAt).toLocaleString()}
                  </span>
                </div>
                <p style={{ marginTop: 8, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}>
                  {enquiry.topic}{enquiry.listing ? ` · ${enquiry.listing}` : ""}
                </p>
                <p style={{ marginTop: 8, fontSize: 14, lineHeight: 1.7 }}>{enquiry.message}</p>
              </article>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 56 }}>
          <h2 className="h4">Recent planner runs</h2>
          <table style={{ width: "100%", marginTop: 16, borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid var(--hairline)" }}>
                <th style={{ padding: "8px 0" }}>Time</th>
                <th style={{ padding: "8px 0" }}>Page</th>
              </tr>
            </thead>
            <tbody>
              {recentPlans.length === 0 && (
                <tr><td colSpan={2} style={{ padding: "12px 0" }} className="muted">No planner runs recorded yet.</td></tr>
              )}
              {recentPlans.map((event, index) => (
                <tr key={`${event.createdAt}-${index}`} style={{ borderBottom: "1px solid var(--hairline)" }}>
                  <td style={{ padding: "8px 0" }}>{new Date(event.createdAt).toLocaleString()}</td>
                  <td style={{ padding: "8px 0" }}>{event.path}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
