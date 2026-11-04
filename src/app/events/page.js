import Link from "next/link";
import { images } from "@/data/site";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Events",
  description:
    "Cultural events, festivals and seasonal happenings in Victoria Falls. We publish events only when dates and details are confirmed.",
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        title="What's happening in Victoria Falls."
        sub="We publish events once dates, venues and organisers have been confirmed. Until then, this page stays deliberately quiet."
        image={images.themeCulture}
        imageAlt="Cultural performance and craft in Zimbabwe"
        crumbs={[{ label: "Events", href: "/events" }]}
      />

      <section className="section">
        <div className="shell">
          <Reveal className="page-intro" style={{ paddingTop: 0 }}>
            <div>
              <span className="eyebrow">Verified listings only</span>
              <h2 className="h2" style={{ marginTop: 14 }}>No dates invented. No listings padded out.</h2>
            </div>
            <div className="page-intro__aside">
              <p>
                Event information is uniquely easy to get wrong. A date moves, a venue changes, a
                festival is cancelled. We would rather show an empty page than send you across town for
                something that is not happening.
              </p>
              <p className="micro">Last reviewed October 2026</p>
            </div>
          </Reveal>

          <div className="empty" id="upcoming">
            <span className="eyebrow">Currently</span>
            <h2 style={{ marginTop: 14 }}>No confirmed events are listed right now.</h2>
            <p>
              We are building relationships with local organisers so that listings can be published with
              confirmed dates and contact details. In the meantime, seasonal experiences and cultural
              visits are covered elsewhere on the site.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              <Link href="/things-to-do?category=Culture" className="btn btn--dark">
                Cultural experiences
              </Link>
              <Link href="/contact?topic=Other" className="btn btn--ghost">
                Tell us about an event
              </Link>
            </div>
          </div>

          <div className="grid grid--3" style={{ marginTop: 64 }} id="cultural">
            <Reveal>
              <h3 className="h4">Cultural events</h3>
              <p className="muted" style={{ marginTop: 8, lineHeight: 1.7, fontSize: 14 }}>
                Performances, craft markets and community-run experiences. We list these when an organiser
                confirms the schedule and whether visitors can attend.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h3 className="h4" id="festivals">Festivals & celebrations</h3>
              <p className="muted" style={{ marginTop: 8, lineHeight: 1.7, fontSize: 14 }}>
                Seasonal and national celebrations can affect opening hours, transport and availability.
                Check local sources and your provider before planning around a date.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <h3 className="h4" id="seasonal">Seasonal experiences</h3>
              <p className="muted" style={{ marginTop: 8, lineHeight: 1.7, fontSize: 14 }}>
                Some experiences depend on the river rather than the calendar — Devil&apos;s Pool being
                the clearest example. The season decides, not the event listing.
              </p>
            </Reveal>
          </div>

          <Reveal className="callout" style={{ marginTop: 56 }}>
            <h3>Organising something in Victoria Falls?</h3>
            <p>
              Send the date, venue, organiser and a public contact detail. We will check it before
              publishing. We do not charge for community event listings.
            </p>
            <Link href="/contact?topic=Other" className="btn btn--dark">Submit an event</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
