import Link from "next/link";
import { restaurants, images } from "@/data/site";
import PageHero from "@/components/PageHero";
import ListingCard from "@/components/ListingCard";
import Reveal from "@/components/Reveal";
import JourneyPathways from "@/components/JourneyPathways";

export const metadata = {
  title: "Restaurants & places to eat",
  description:
    "Where to eat in Victoria Falls — cafés, local restaurants, riverside dining and considered evening meals.",
};

const types = ["Café", "Local", "Fine dining"];

export default async function RestaurantsPage({ searchParams }) {
  const { type } = await searchParams;
  const active = types.includes(type) ? type : "All";
  const filtered = active === "All" ? restaurants : restaurants.filter((item) => item.type === active);

  return (
    <>
      <PageHero
        eyebrow="Eat & drink"
        title="Long lunches and river dinners."
        sub="Victoria Falls has more good food than its size suggests. Some tables sit above the gorge; others are simple cafés the town actually uses."
        image={images.restaurantLookout}
        imageAlt="A restaurant table with a view in Victoria Falls"
        crumbs={[{ label: "Restaurants", href: "/restaurants" }]}
      />

      <section className="section">
        <div className="shell">
          <Reveal className="page-intro" style={{ paddingTop: 0 }}>
            <div>
              <span className="eyebrow">Where to eat</span>
              <h2 className="h2" style={{ marginTop: 14 }}>Match the meal to the day you have had.</h2>
            </div>
            <div className="page-intro__aside">
              <p>
                After a hot morning in the rainforest, a shaded café makes more sense than a long
                tasting menu. After a river cruise, a slow dinner does. These listings are organised by
                that rhythm rather than by ranking.
              </p>
              <p className="micro">
                {restaurants.length} places · Hours and menus change — confirm before you go
              </p>
            </div>
          </Reveal>

          <div className="filters" aria-label="Filter restaurants">
            <Link href="/restaurants" className={`chip${active === "All" ? " chip--active" : ""}`}>
              All
            </Link>
            {types.map((item) => (
              <Link
                key={item}
                href={`/restaurants?type=${encodeURIComponent(item)}`}
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
              <p>Try another category, or see every place we currently list.</p>
              <Link href="/restaurants" className="btn btn--dark">All restaurants</Link>
            </div>
          ) : (
            <div className="grid grid--3">
              {filtered.map((place) => (
                <ListingCard
                  key={place.slug}
                  href={`/restaurants/${place.slug}`}
                  image={place.image}
                  title={place.name}
                  tag={place.type}
                  excerpt={place.blurb}
                  meta={[place.area]}
                  cta="View restaurant"
                />
              ))}
            </div>
          )}

          <Reveal className="callout" style={{ marginTop: 56 }}>
            <h3>We do not publish unverified menus or hours</h3>
            <p>
              Restaurant hours, menus and booking arrangements change with the season and with
              management. Confirm directly with the venue before making a special trip.
            </p>
          </Reveal>
        </div>
      </section>
      <JourneyPathways current="Eat" />
    </>
  );
}
