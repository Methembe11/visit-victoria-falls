import Link from "next/link";
import { experiences, images } from "@/data/site";
import PageHero from "@/components/PageHero";
import ListingCard from "@/components/ListingCard";
import Reveal from "@/components/Reveal";
import JourneyPathways from "@/components/JourneyPathways";

export const metadata = {
  title: "Things to do",
  description:
    "Experiences in Victoria Falls, Zimbabwe — helicopter flights, river cruises, the rainforest, the bridge, game drives and day trips.",
};

const categories = ["Adventure", "River", "Wildlife", "Nature", "Culture", "Day trip", "Transport"];

export default async function ThingsToDoPage({ searchParams }) {
  const { category } = await searchParams;
  const active = categories.includes(category) ? category : "All";
  const filtered = active === "All" ? experiences : experiences.filter((item) => item.category === active);

  return (
    <>
      <PageHero
        eyebrow="Things to do"
        title="Ways to meet the Falls."
        sub="From the rainforest path to the river, the bridge and the bush. Every listing explains what the experience is — not what we wish it was."
        image={images.helicopter}
        imageAlt="Helicopter flying over Victoria Falls"
        crumbs={[{ label: "Things to do", href: "/things-to-do" }]}
      />

      <section className="section">
        <div className="shell">
          <Reveal className="page-intro" style={{ paddingTop: 0 }}>
            <div>
              <span className="eyebrow">Experiences</span>
              <h2 className="h2" style={{ marginTop: 14 }}>Choose one anchor for each day.</h2>
            </div>
            <div className="page-intro__aside">
              <p>
                Victoria Falls rewards a slower plan. A morning activity and an evening on the river is
                usually enough; the heat and the spray make rushing unpleasant rather than efficient.
              </p>
              <p className="micro">
                {experiences.length} experiences · Details confirmed with providers before booking
              </p>
            </div>
          </Reveal>

          <div className="filters" aria-label="Filter experiences">
            <Link href="/things-to-do" className={`chip${active === "All" ? " chip--active" : ""}`}>
              All
            </Link>
            {categories.map((item) => (
              <Link
                key={item}
                href={`/things-to-do?category=${encodeURIComponent(item)}`}
                className={`chip${active === item ? " chip--active" : ""}`}
              >
                {item}
              </Link>
            ))}
            <span className="list-count">{filtered.length} shown</span>
          </div>

          {filtered.length === 0 ? (
            <div className="empty">
              <h2>Nothing listed in this category yet.</h2>
              <p>
                We only publish experiences we can describe accurately. Try another category, or see all
                experiences.
              </p>
              <Link href="/things-to-do" className="btn btn--dark">All experiences</Link>
            </div>
          ) : (
            <div className="grid grid--3">
              {filtered.map((item) => (
                <ListingCard
                  key={item.slug}
                  href={`/things-to-do/${item.slug}`}
                  image={item.image}
                  title={item.title}
                  tag={item.category}
                  excerpt={item.blurb}
                  meta={[item.duration, item.area]}
                />
              ))}
            </div>
          )}

          <Reveal className="callout" style={{ marginTop: 56 }}>
            <h3>How booking works here</h3>
            <p>
              We are a discovery and referral platform. We do not process payments or hold availability.
              When you contact a provider, confirm the price, inclusions, cancellation terms and meeting
              point directly with them.
            </p>
            <Link href="/disclosure" className="link-arrow">Read our disclosure</Link>
          </Reveal>
        </div>
      </section>
      <JourneyPathways current="Experiences" />
    </>
  );
}
