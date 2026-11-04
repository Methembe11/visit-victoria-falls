import Link from "next/link";
import { experiences, guides, stays, restaurants, itineraries, images } from "@/data/site";
import PageHero from "@/components/PageHero";
import ListingCard from "@/components/ListingCard";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Explore Victoria Falls",
  description:
    "Go beyond the Falls — local businesses, places and attractions, suggested itineraries and practical ways to spend your time in Victoria Falls.",
};

const pathways = [
  {
    title: "Local businesses",
    href: "/businesses",
    text: "Lodges, restaurants, guides and operators listed with the information we can verify.",
    count: `${stays.length + restaurants.length + experiences.length} listings`,
  },
  {
    title: "Places & attractions",
    href: "/landmarks",
    text: "The Falls, the rainforest, the bridge, the gorge and the national park.",
    count: "6 places",
  },
  {
    title: "Suggested itineraries",
    href: "/itineraries",
    text: "Two days, four days or a family week — with room to change your mind.",
    count: `${itineraries.length} outlines`,
  },
  {
    title: "AI trip planner",
    href: "/plan",
    text: "A suggested day-by-day outline built from your dates and interests.",
    count: "Interactive",
  },
  {
    title: "Travel guides",
    href: "/guides",
    text: "Dated, practical guides to the questions that come up before a visit.",
    count: `${guides.length} guides`,
  },
  {
    title: "About this site",
    href: "/about",
    text: "How the directory works, how we handle imagery and what we will not claim.",
    count: "Editorial policy",
  },
];

export default function ExplorePage() {
  return (
    <>
      <PageHero
        eyebrow="Go further"
        title="Beyond the Falls."
        sub="The waterfall is the reason you came. The town, the river and the people around it are the reason to stay another day."
        image={images.fallsCity}
        imageAlt="Victoria Falls town and the surrounding landscape"
        crumbs={[{ label: "Explore", href: "/explore" }]}
      />

      <section className="section">
        <div className="shell">
          <Reveal className="page-intro" style={{ paddingTop: 0 }}>
            <div>
              <span className="eyebrow">The destination</span>
              <h2 className="h2" style={{ marginTop: 14 }}>A small town with a large landscape around it.</h2>
            </div>
            <div className="page-intro__aside">
              <p>
                Victoria Falls town is compact, but the surrounding area is not. The rainforest, the
                Zambezi, the gorge, the national park and the borders with Zambia and Botswana all sit
                within a short drive. Plan travel time honestly.
              </p>
              <p className="micro">Reviewed October 2026</p>
            </div>
          </Reveal>

          <div className="grid grid--3">
            {pathways.map((path) => (
              <Reveal key={path.href}>
                <Link href={path.href} className="card" style={{ borderTop: "1px solid var(--hairline)", paddingTop: 22 }}>
                  <div className="card__body">
                    <div className="card__meta"><span>{path.count}</span></div>
                    <h3 className="card__title">{path.title}</h3>
                    <p className="card__excerpt">{path.text}</p>
                    <div className="card__foot">
                      <span>Explore</span>
                      <span className="arrow-circle" aria-hidden="true">↗</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--sage">
        <div className="shell split">
          <Reveal className="split__media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images.themeCulture} alt="Local culture and craft in Zimbabwe" loading="lazy" />
            <span className="split__caption">Local context · Zimbabwe</span>
          </Reveal>
          <Reveal className="split__body" delay={100}>
            <span className="eyebrow">Travel with context</span>
            <h2>The Falls are geological. The town is historical.</h2>
            <p>
              Victoria Falls town grew around the railway and the bridge. The area is home to communities
              whose lives and livelihoods are connected to the river and to tourism. A little context
              makes the place richer, and makes your spending more useful.
            </p>
            <p>
              Ask before taking photographs of people. Buy from local makers where you can. Treat the
              river and the wildlife with the respect they require.
            </p>
            <Link href="/guides/historical-victoria-falls" className="btn btn--dark">
              Read the history guide
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow">A good place to start</span>
              <h2 className="section-head__title">Three experiences that explain the destination.</h2>
            </div>
            <div className="section-head__aside">
              <p>
                One close-range view, one river view and one view from above. Together they make the scale
                of the place legible.
              </p>
              <Link href="/things-to-do" className="link-arrow">All experiences</Link>
            </div>
          </Reveal>
          <div className="grid grid--3">
            {["rainforest-walk", "zambezi-sunset-cruise", "helicopter-flights"].map((slug) => {
              const item = experiences.find((entry) => entry.slug === slug);
              if (!item) return null;
              return (
                <ListingCard
                  key={item.slug}
                  href={`/things-to-do/${item.slug}`}
                  image={item.image}
                  title={item.title}
                  tag={item.category}
                  excerpt={item.blurb}
                  meta={[item.duration]}
                />
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="shell" style={{ display: "grid", gap: 22, maxWidth: 760 }}>
          <span className="eyebrow">Make a plan</span>
          <h2 className="h2">Two days is enough for the Falls. Four is better for the place.</h2>
          <p className="lede">
            The planner can suggest a rhythm for your dates, or you can start from one of our fixed
            outlines and adapt it.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/plan" className="btn btn--solid">Open the planner</Link>
            <Link href="/itineraries" className="btn btn--ghost-light">Suggested itineraries</Link>
          </div>
        </div>
      </section>
    </>
  );
}
