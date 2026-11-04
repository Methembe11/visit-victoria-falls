import { images, site } from "@/data/site";
import PageHero from "@/components/PageHero";
import EnquiryForm from "@/components/EnquiryForm";
import Reveal from "@/components/Reveal";
import Link from "next/link";

export const metadata = {
  title: "Contact",
  description:
    "Contact Visit Victoria Falls about trip planning, accommodation, experiences, partnerships, listings or corrections.",
};

const topics = [
  "Trip planning",
  "Things to do",
  "Accommodation",
  "Restaurant",
  "Partnership",
  "List my business",
  "Website feedback",
  "Other",
];

export default async function ContactPage({ searchParams }) {
  const { topic, listing } = await searchParams;
  const defaultTopic = topics.includes(topic) ? topic : "Trip planning";

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Ask us something useful."
        sub="Trip-planning questions, corrections, partnership enquiries and listing requests. We cannot confirm bookings, prices or availability."
        image={images.fallsCity}
        imageAlt="Victoria Falls town and the surrounding area"
        crumbs={[{ label: "Contact", href: "/contact" }]}
      />

      <section className="section">
        <div className="shell contact-grid">
          <Reveal className="contact-grid__aside">
            <span className="eyebrow">Before you write</span>
            <h2>What we can and cannot help with.</h2>
            <p>
              We can help with the shape of a trip: how long to stay, which experiences suit your group,
              how to think about the seasons, and what to confirm before you pay a provider.
            </p>
            <p>
              We cannot check live availability, hold a room, quote a provider&rsquo;s current price, or
              resolve a dispute with a business. Those need the provider or booking platform directly.
            </p>
            <dl className="aside-card__meta" style={{ borderTop: "1px solid var(--hairline)", paddingTop: 18 }}>
              <div><dt>Email</dt><dd>{site.email}</dd></div>
              <div><dt>Based in</dt><dd>{site.location}</dd></div>
              <div><dt>Reviews</dt><dd>{site.lastReviewed}</dd></div>
            </dl>
            <p className="micro">
              Enquiries submitted through this form are stored securely for follow-up. We do not sell
              contact details. See the privacy policy.
            </p>
            <Link href="/privacy" className="link-arrow">Privacy policy</Link>
          </Reveal>

          <Reveal delay={100}>
            <div className="planner__panel">
              <div className="panel__head">
                <h3>Send an enquiry</h3>
                <span>{listing ? "About a listing" : "We read every message"}</span>
              </div>
              <EnquiryForm defaultTopic={defaultTopic} listing={listing || ""} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--ivory-deep">
        <div className="shell">
          <div className="section-head">
            <div>
              <span className="eyebrow">Faster answers</span>
              <h2 className="section-head__title">Some questions are already answered.</h2>
            </div>
            <div className="section-head__aside">
              <p>Start with these if you are early in planning.</p>
            </div>
          </div>
          <div className="grid grid--3">
            <Link href="/faq" className="card" style={{ borderTop: "1px solid var(--hairline)", paddingTop: 22 }}>
              <div className="card__body">
                <h3 className="card__title">Frequently asked questions</h3>
                <p className="card__excerpt">Bookings, prices, seasons, safety and how this site works.</p>
              </div>
            </Link>
            <Link href="/travel" className="card" style={{ borderTop: "1px solid var(--hairline)", paddingTop: 22 }}>
              <div className="card__body">
                <h3 className="card__title">Travel information</h3>
                <p className="card__excerpt">Airports, transfers, borders and getting around.</p>
              </div>
            </Link>
            <Link href="/plan" className="card" style={{ borderTop: "1px solid var(--hairline)", paddingTop: 22 }}>
              <div className="card__body">
                <h3 className="card__title">Trip planner</h3>
                <p className="card__excerpt">A suggested outline for your dates and interests.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
