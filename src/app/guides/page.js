import { guides, images } from "@/data/site";
import PageHero from "@/components/PageHero";
import ListingCard from "@/components/ListingCard";
import Reveal from "@/components/Reveal";
import Link from "next/link";

export const metadata = {
  title: "Travel guides",
  description:
    "Practical, dated guides to Victoria Falls — when to visit, what to do, how to get there and what to confirm before you book.",
};

export default function GuidesPage() {
  const categories = [...new Set(guides.map((guide) => guide.category))];

  return (
    <>
      <PageHero
        eyebrow="Travel guides"
        title="What to know before you go."
        sub="Practical guides written for people who are actually travelling. We date every page and say when something needs to be confirmed."
        image={images.seasons}
        imageAlt="Victoria Falls and the Zambezi in the dry season"
        crumbs={[{ label: "Guides", href: "/guides" }]}
      />

      <section className="section">
        <div className="shell">
          <Reveal className="page-intro" style={{ paddingTop: 0 }}>
            <div>
              <span className="eyebrow">The library</span>
              <h2 className="h2" style={{ marginTop: 14 }}>Start with the question you actually have.</h2>
            </div>
            <div className="page-intro__aside">
              <p>
                Most visitors want to know three things: when to come, how long to stay, and which
                experiences are worth their time. These guides answer those questions without inventing
                prices or pretending conditions never change.
              </p>
              <p className="micro">
                Last reviewed {guides[0]?.updated || "October 2026"} · {guides.length} guides
              </p>
            </div>
          </Reveal>

          <div className="filters" aria-label="Guide categories">
            <span className="chip chip--active">All guides</span>
            {categories.map((category) => (
              <span className="chip" key={category}>{category}</span>
            ))}
            <span className="list-count">{guides.length} guides</span>
          </div>

          <div className="grid grid--3">
            {guides.map((guide) => (
              <ListingCard
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                image={guide.image}
                title={guide.title}
                tag={guide.category}
                excerpt={guide.excerpt}
                meta={[guide.readTime]}
                cta="Read guide"
              />
            ))}
          </div>

          <Reveal className="callout" style={{ marginTop: 56 }}>
            <h3>Not sure where to start?</h3>
            <p>
              The complete guide covers the shape of a first visit, from the rainforest walk to border
              practicalities. If you already know your dates, the trip planner can suggest a day-by-day
              outline.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/guides/complete-guide-to-victoria-falls" className="btn btn--dark">
                Read the complete guide
              </Link>
              <Link href="/plan" className="btn btn--ghost">
                Open the trip planner
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
