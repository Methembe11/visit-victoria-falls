import Link from "next/link";
import { notFound } from "next/navigation";
import { interests, restaurants, stays, experiences } from "@/data/site";
import { findGuide, findExperience, findStay } from "@/lib/resolve";
import PageHero from "@/components/PageHero";
import ListingCard from "@/components/ListingCard";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return interests.map((interest) => ({ slug: interest.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const interest = interests.find((item) => item.slug === slug);
  if (!interest) return { title: "Collection not found" };
  return {
    title: interest.name,
    description: interest.blurb,
    openGraph: { title: `${interest.name} in Victoria Falls`, description: interest.blurb, images: [{ url: interest.image }] },
  };
}

function resolveItem(slug) {
  if (slug === "restaurants") {
    return {
      kind: "page",
      title: "Restaurants in Victoria Falls",
      href: "/restaurants",
      image: restaurants[0]?.image,
      excerpt: "Cafés, local kitchens and considered evening dining, listed honestly.",
      meta: `${restaurants.length} places`,
    };
  }

  const experience = findExperience(slug);
  if (experience) {
    return {
      kind: "experience",
      title: experience.title,
      href: `/things-to-do/${experience.slug}`,
      image: experience.image,
      excerpt: experience.blurb,
      meta: experience.duration,
    };
  }

  const guide = findGuide(slug);
  if (guide) {
    return {
      kind: "guide",
      title: guide.title,
      href: `/guides/${guide.slug}`,
      image: guide.image,
      excerpt: guide.excerpt,
      meta: guide.readTime,
    };
  }

  return null;
}

function suggestedStays(interest) {
  const bySlug = {
    luxury: ["shongwe-oasis", "the-victorian-manor", "zambezi-sands-by-batoka"],
    relaxation: ["sian-simba-river-lodge", "shongwe-oasis", "parrot-lodge"],
    family: ["the-gray-luxury-apartments", "victoria-falls-river-lodge", "parrot-lodge"],
    wildlife: ["zambezi-sands-by-batoka", "victoria-falls-river-lodge", "sian-simba-river-lodge"],
  };

  const slugs = bySlug[interest.slug];
  if (slugs) return slugs.map(findStay).filter(Boolean);
  return stays.slice(0, 3);
}

export default async function InterestPage({ params }) {
  const { slug } = await params;
  const interest = interests.find((item) => item.slug === slug);
  if (!interest) notFound();

  const items = interest.experiences.map(resolveItem).filter(Boolean);
  const staySuggestions = suggestedStays(interest);
  const guideSuggestions = experiences
    .filter((item) => interest.experiences.includes(item.slug))
    .slice(0, 2);

  return (
    <>
      <PageHero
        eyebrow="Interest"
        title={interest.name}
        sub={interest.blurb}
        image={interest.image}
        imageAlt={interest.name}
        crumbs={[
          { label: "Interests", href: "/interests" },
          { label: interest.name, href: `/interests/${interest.slug}` },
        ]}
      />

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <span className="eyebrow">Experiences</span>
              <h2 className="section-head__title">Start with these.</h2>
            </div>
            <div className="section-head__aside">
              <p>
                A short, deliberate selection rather than everything loosely related. Each link explains
                what the experience involves and what to confirm.
              </p>
            </div>
          </div>

          <div className="grid grid--3">
            {items.map((item) => (
              <ListingCard
                key={item.href}
                href={item.href}
                image={item.image}
                title={item.title}
                excerpt={item.excerpt}
                meta={[item.meta]}
                cta={item.kind === "guide" ? "Read guide" : item.kind === "page" ? "Browse" : "View details"}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--ivory-deep">
        <div className="shell">
          <div className="section-head">
            <div>
              <span className="eyebrow">Where to stay</span>
              <h2 className="section-head__title">Places that suit this trip.</h2>
            </div>
            <div className="section-head__aside">
              <Link href="/places-to-stay" className="link-arrow">All accommodation</Link>
            </div>
          </div>
          <div className="grid grid--3">
            {staySuggestions.map((stay) => (
              <ListingCard
                key={stay.slug}
                href={`/places-to-stay/${stay.slug}`}
                image={stay.image}
                title={stay.name}
                tag={stay.type}
                excerpt={stay.blurb}
                meta={[stay.area]}
                cta="View stay"
              />
            ))}
          </div>
        </div>
      </section>

      {guideSuggestions.length > 0 && (
        <section className="section">
          <div className="shell">
            <div className="section-head">
              <div>
                <span className="eyebrow">Read next</span>
                <h2 className="section-head__title">Useful context.</h2>
              </div>
              <div className="section-head__aside">
                <Link href="/guides" className="link-arrow">All travel guides</Link>
              </div>
            </div>
            <div className="stack-links">
              {guideSuggestions.map((item) => (
                <Link key={item.slug} href={`/things-to-do/${item.slug}`}>
                  <span>{item.title}</span>
                  <span className="muted">{item.duration}</span>
                </Link>
              ))}
              <Link href="/guides/when-to-visit">
                <span>When to visit Victoria Falls</span>
                <span className="muted">Planning guide</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="section section--dark">
        <div className="shell" style={{ display: "grid", gap: 24, maxWidth: 760 }}>
          <span className="eyebrow">Make it yours</span>
          <h2 className="h2">Turn this into a day-by-day outline.</h2>
          <p className="lede">
            The planner uses your month, trip length and interests to suggest a rhythm. Change what you
            like, then confirm the details with providers.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/plan" className="btn btn--solid">Plan this trip</Link>
            <Link href="/interests" className="btn btn--ghost-light">Other interests</Link>
          </div>
        </div>
      </section>
    </>
  );
}
