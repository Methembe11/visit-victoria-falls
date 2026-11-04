import Link from "next/link";
import { itineraries, images } from "@/data/site";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Suggested itineraries",
  description:
    "Two-day, four-day and family-week outlines for Victoria Falls — with space to change your mind and clear notes on what to confirm.",
};

export default function ItinerariesPage() {
  return (
    <>
      <PageHero
        eyebrow="Suggested itineraries"
        title="A shape for the days."
        sub="Not a schedule to follow exactly. A starting point that keeps the travel realistic and leaves room for the river."
        image={images.sunsetGuide}
        imageAlt="Boats on the Zambezi at sunset"
        crumbs={[{ label: "Explore", href: "/explore" }, { label: "Itineraries", href: "/itineraries" }]}
        meta={["Reviewed October 2026", "Suggestions, not bookings"]}
      />

      <section className="section">
        <div className="shell">
          <Reveal className="page-intro" style={{ paddingTop: 0 }}>
            <div>
              <span className="eyebrow">Three outlines</span>
              <h2 className="h2" style={{ marginTop: 14 }}>Enough structure to book, enough slack to breathe.</h2>
            </div>
            <div className="page-intro__aside">
              <p>
                Each outline assumes you are staying in or near Victoria Falls town and that transfers
                are arranged. Activity times shift with the season, so treat the order as a guide rather
                than a timetable.
              </p>
              <p className="micro">Confirm all timings with providers</p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gap: 64 }}>
            {itineraries.map((itinerary) => (
              <Reveal key={itinerary.slug}>
                <div className="section-head" style={{ marginBottom: 28 }}>
                  <div>
                    <span className="eyebrow">{itinerary.duration}</span>
                    <h2 className="h3" style={{ marginTop: 12 }}>{itinerary.name}</h2>
                  </div>
                  <div className="section-head__aside">
                    <p>{itinerary.summary}</p>
                    <span className="micro">Best for: {itinerary.forWho}</span>
                  </div>
                </div>

                <div className="plan-result">
                  {itinerary.days.map((day) => (
                    <div className="plan-day" key={day.day}>
                      <div className="plan-day__label">
                        <span>Day</span>
                        <strong>{String(day.day).padStart(2, "0")}</strong>
                      </div>
                      <div className="plan-day__body">
                        <h4>{day.title}</h4>
                        <ul>
                          {day.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="callout" style={{ marginTop: 72 }}>
            <h3>Want something built around your dates?</h3>
            <p>
              The planner asks for your month, trip length, budget and interests, then suggests a
              day-by-day outline. It is a suggestion, not a confirmed booking.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/plan" className="btn btn--dark">Open the planner</Link>
              <Link href="/things-to-do" className="btn btn--ghost">Browse experiences</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
