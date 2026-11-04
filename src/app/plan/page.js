import Link from "next/link";
import { images } from "@/data/site";
import PageHero from "@/components/PageHero";
import TripPlanner from "@/components/TripPlanner";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "AI trip planner",
  description:
    "Build a suggested Victoria Falls itinerary from your month, trip length, budget and interests. A planning aid, not a confirmed booking.",
};

export default function PlanPage() {
  return (
    <>
      <PageHero
        eyebrow="Trip planner"
        title="Tell us the shape of your trip."
        sub="A suggested itinerary built from the destination information on this site — with a clear line between a useful starting point and a confirmed booking."
        image={images.helicopter}
        imageAlt="Aerial view of Victoria Falls"
        crumbs={[{ label: "Plan", href: "/plan" }]}
      />

      <section className="section">
        <div className="shell planner">
          <Reveal className="planner__copy">
            <span className="eyebrow">How it works</span>
            <h2>One form. A starting point, not a schedule.</h2>
            <p>
              The planner uses your month, trip length, budget, group and interests to suggest a rhythm
              for your days. It draws on the experiences we describe on this site.
            </p>
            <div className="planner__prompts">
              <div className="planner__prompt"><span>01</span> Choose when you are travelling and for how long</div>
              <div className="planner__prompt"><span>02</span> Set a rough budget and who is coming</div>
              <div className="planner__prompt"><span>03</span> Pick the experiences you care about</div>
              <div className="planner__prompt"><span>04</span> Use the result as a draft, then confirm details</div>
            </div>
          </Reveal>

          <Reveal className="planner__panel" delay={100}>
            <TripPlanner />
          </Reveal>
        </div>
      </section>

      <section className="section section--sage">
        <div className="shell">
          <div className="grid grid--3">
            <Reveal>
              <span className="eyebrow">What it does</span>
              <h3 className="h4" style={{ marginTop: 14 }}>Builds a realistic outline</h3>
              <p style={{ marginTop: 10, lineHeight: 1.75, fontSize: 14 }}>
                It balances active experiences with rest, avoids repeating the same activity, and keeps
                travel times plausible for a short stay.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <span className="eyebrow">What it does not do</span>
              <h3 className="h4" style={{ marginTop: 14 }}>Check live availability</h3>
              <p style={{ marginTop: 10, lineHeight: 1.75, fontSize: 14 }}>
                It does not know which operator is free on your date, what a room costs tonight, or
                whether the river is suitable for a specific activity. Confirm with providers.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <span className="eyebrow">Your data</span>
              <h3 className="h4" style={{ marginTop: 14 }}>Kept simple</h3>
              <p style={{ marginTop: 10, lineHeight: 1.75, fontSize: 14 }}>
                The planner does not require an account. Do not enter passport numbers, card details or
                other sensitive information into the form. See our privacy policy for details.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell" style={{ display: "grid", gap: 20, maxWidth: 760 }}>
          <span className="eyebrow">Before you book</span>
          <h2 className="h2">A suggestion is not a reservation.</h2>
          <p className="muted" style={{ lineHeight: 1.8 }}>
            When you have an outline you like, contact the providers directly. Confirm the date, start
            time, meeting point, duration, inclusions, cancellation terms and total price. If weather or
            river conditions change the plan, the provider decides what happens next.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/guides/complete-guide-to-victoria-falls" className="btn btn--dark">
              Read the complete guide
            </Link>
            <Link href="/contact?topic=Trip%20planning" className="btn btn--ghost">
              Ask a planning question
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
