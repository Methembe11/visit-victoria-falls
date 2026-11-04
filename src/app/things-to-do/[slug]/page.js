import Link from "next/link";
import { notFound } from "next/navigation";
import { experiences } from "@/data/site";
import { resolveRelated } from "@/lib/resolve";
import PageHero from "@/components/PageHero";
import ListingCard from "@/components/ListingCard";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return experiences.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = experiences.find((entry) => entry.slug === slug);
  if (!item) return { title: "Experience not found" };
  return {
    title: item.title,
    description: item.blurb,
    openGraph: { title: item.title, description: item.blurb, images: [{ url: item.image }] },
  };
}

export default async function ExperiencePage({ params }) {
  const { slug } = await params;
  const item = experiences.find((entry) => entry.slug === slug);
  if (!item) notFound();

  const related = (item.related || []).map(resolveRelated).filter(Boolean);

  return (
    <>
      <PageHero
        eyebrow={item.category}
        title={item.title}
        sub={item.blurb}
        image={item.image}
        imageAlt={item.title}
        crumbs={[
          { label: "Things to do", href: "/things-to-do" },
          { label: item.category, href: `/things-to-do?category=${encodeURIComponent(item.category)}` },
        ]}
        meta={[item.duration, item.area]}
      />

      <div className="shell detail">
        <div className="detail__main">
          <div className="detail__stats">
            <div className="detail__stat">
              <span>Duration</span>
              <strong>{item.duration}</strong>
            </div>
            <div className="detail__stat">
              <span>Where</span>
              <strong>{item.area}</strong>
            </div>
            <div className="detail__stat">
              <span>Good for</span>
              <strong>{item.bestFor}</strong>
            </div>
          </div>

          <div className="prose">
            <h2 style={{ marginTop: 0 }}>What this experience is</h2>
            <p>{item.summary}</p>

            <h3>Usually included</h3>
            <ul>
              {item.includes.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>

            <div className="callout">
              <h3>Good to know</h3>
              {item.goodToKnow.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>

            <h3>What we cannot tell you</h3>
            <p>
              We do not publish live prices, availability or operator contact details unless they have
              been confirmed. Those details change, and a stale price is worse than no price. Ask the
              provider for the total cost, what it includes and the cancellation terms before you pay.
            </p>
          </div>
        </div>

        <aside className="aside-card">
          <span className="eyebrow">Plan this experience</span>
          <h3>Add it to your trip.</h3>
          <p>
            Ask a trip-planning question, or use the planner to see how this experience fits into a
            day-by-day outline.
          </p>
          <Link href={`/contact?topic=Trip%20planning&listing=${encodeURIComponent(item.title)}`} className="btn btn--solid">
            Ask about this experience
          </Link>
          <Link href="/plan" className="btn btn--ghost">Open the planner</Link>
          <dl className="aside-card__meta">
            <div><dt>Category</dt><dd>{item.category}</dd></div>
            <div><dt>Duration</dt><dd>{item.duration}</dd></div>
            <div><dt>Area</dt><dd>{item.area}</dd></div>
            <div><dt>Booking</dt><dd>With provider</dd></div>
          </dl>
          <p className="micro">
            Visit Victoria Falls does not take payments or hold bookings. Some referrals may earn a
            commission; this never changes the price you pay.
          </p>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="section section--ivory-deep">
          <div className="shell">
            <Reveal className="section-head">
              <div>
                <span className="eyebrow">Pairs well with</span>
                <h2 className="section-head__title">Build a fuller day.</h2>
              </div>
              <div className="section-head__aside">
                <p>Experiences that work alongside this one without doubling the travel time.</p>
              </div>
            </Reveal>
            <div className="grid grid--3">
              {related.map((entry) => (
                <ListingCard
                  key={entry.href}
                  href={entry.href}
                  image={entry.image}
                  title={entry.title}
                  excerpt={entry.excerpt}
                  meta={[entry.meta]}
                  cta={entry.kind === "guide" ? "Read guide" : "View details"}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <span className="eyebrow">Keep exploring</span>
              <h2 className="section-head__title">More things to do.</h2>
            </div>
            <div className="section-head__aside">
              <Link href="/things-to-do" className="link-arrow">All experiences</Link>
            </div>
          </div>
          <div className="grid grid--2">
            {experiences
              .filter((entry) => entry.slug !== item.slug)
              .slice(0, 2)
              .map((entry) => (
                <ListingCard
                  key={entry.slug}
                  href={`/things-to-do/${entry.slug}`}
                  image={entry.image}
                  title={entry.title}
                  tag={entry.category}
                  excerpt={entry.blurb}
                  meta={[entry.duration]}
                />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
