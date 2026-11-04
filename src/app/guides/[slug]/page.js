import Link from "next/link";
import { notFound } from "next/navigation";
import { guides } from "@/data/site";
import { resolveRelated } from "@/lib/resolve";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ListingCard from "@/components/ListingCard";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) return { title: "Guide not found" };
  return {
    title: guide.title,
    description: guide.excerpt,
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      images: [{ url: guide.image }],
    },
  };
}

export default async function GuidePage({ params }) {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) notFound();

  const related = (guide.related || []).map(resolveRelated).filter(Boolean);
  const more = guides.filter((item) => item.slug !== guide.slug).slice(0, 2);

  return (
    <>
      <PageHero
        eyebrow={guide.category}
        title={guide.title}
        sub={guide.excerpt}
        image={guide.image}
        imageAlt={guide.title}
        crumbs={[{ label: "Guides", href: "/guides" }, { label: guide.title }]}
        meta={[guide.readTime, `Reviewed ${guide.updated}`]}
      />

      <div className="shell article">
        <aside className="article__aside">
          <div>
            <h2>On this page</h2>
            <nav className="toc" aria-label="On this page">
              {guide.sections.map((section) => (
                <a key={section.id} href={`#${section.id}`}>{section.heading}</a>
              ))}
            </nav>
          </div>

          <div className="aside-card">
            <span className="eyebrow">Plan with this guide</span>
            <h3>Turn it into an itinerary.</h3>
            <p>
              Use the trip planner to turn these notes into a day-by-day outline. It is a suggestion, not
              a booking, and it does not check availability.
            </p>
            <Link href="/plan" className="btn btn--solid">Open the planner</Link>
            <Link href="/things-to-do" className="btn btn--ghost">Browse experiences</Link>
          </div>
        </aside>

        <article>
          <div className="article__meta">
            <span>{guide.category}</span>
            <span>{guide.readTime}</span>
            <span>Reviewed {guide.updated}</span>
          </div>

          <div className="prose">
            <p className="lede" style={{ fontSize: "1.15rem" }}>{guide.intro}</p>

            {guide.sections.map((section) => (
              <section id={section.id} key={section.id}>
                <h2>{section.heading}</h2>
                <div className="prose" style={{ marginTop: 14 }}>
                  {section.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                  {section.list && (
                    <ul>
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}

            <div className="callout">
              <h3>Confirm before you commit</h3>
              <p>
                Prices, availability, opening hours, park fees and border requirements change. Check
                the details directly with the provider or authority before you pay. Visit Victoria Falls
                does not process bookings.
              </p>
            </div>
          </div>
        </article>
      </div>

      {related.length > 0 && (
        <section className="section section--ivory-deep">
          <div className="shell">
            <Reveal className="section-head">
              <div>
                <span className="eyebrow">Related reading</span>
                <h2 className="section-head__title">Keep going.</h2>
              </div>
              <div className="section-head__aside">
                <p>Experiences and guides that pair naturally with this one.</p>
              </div>
            </Reveal>
            <div className="grid grid--3">
              {related.map((item) => (
                <ListingCard
                  key={item.href}
                  href={item.href}
                  image={item.image}
                  title={item.title}
                  excerpt={item.excerpt}
                  meta={[item.meta]}
                  cta={item.kind === "guide" ? "Read guide" : "View details"}
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
              <span className="eyebrow">More guides</span>
              <h2 className="section-head__title">Before you go.</h2>
            </div>
            <div className="section-head__aside">
              <Link href="/guides" className="link-arrow">All travel guides</Link>
            </div>
          </div>
          <div className="grid grid--2">
            {more.map((item) => (
              <ListingCard
                key={item.slug}
                href={`/guides/${item.slug}`}
                image={item.image}
                title={item.title}
                excerpt={item.excerpt}
                meta={[item.category, item.readTime]}
                cta="Read guide"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
