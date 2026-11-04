import Link from "next/link";
import { notFound } from "next/navigation";
import { restaurants } from "@/data/site";
import PageHero from "@/components/PageHero";
import ListingCard from "@/components/ListingCard";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return restaurants.map((place) => ({ slug: place.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const place = restaurants.find((item) => item.slug === slug);
  if (!place) return { title: "Restaurant not found" };
  return {
    title: place.name,
    description: place.blurb,
    openGraph: { title: place.name, description: place.blurb, images: [{ url: place.image }] },
  };
}

export default async function RestaurantPage({ params }) {
  const { slug } = await params;
  const place = restaurants.find((item) => item.slug === slug);
  if (!place) notFound();

  const related = restaurants.filter((item) => item.slug !== place.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={place.type}
        title={place.name}
        sub={place.blurb}
        image={place.image}
        imageAlt={place.name}
        crumbs={[
          { label: "Restaurants", href: "/restaurants" },
          { label: place.type, href: `/restaurants?type=${encodeURIComponent(place.type)}` },
        ]}
        meta={[place.area]}
      />

      <div className="shell detail">
        <div className="detail__main">
          <div className="detail__stats">
            <div className="detail__stat">
              <span>Type</span>
              <strong>{place.type}</strong>
            </div>
            <div className="detail__stat">
              <span>Area</span>
              <strong>{place.area}</strong>
            </div>
            <div className="detail__stat">
              <span>Booking</span>
              <strong>Direct with venue</strong>
            </div>
          </div>

          <div className="prose">
            <h2 style={{ marginTop: 0 }}>Why it is listed</h2>
            <p>{place.blurb}</p>
            <p>
              This is a short editorial listing, not a review. We have not scored the food, and we do
              not accept payment for a better position. Use it to decide whether the setting and style
              fit your day, then check the current menu and hours with the venue.
            </p>

            <h3>Before you go</h3>
            <ul>
              <li>Confirm opening hours, especially on public holidays.</li>
              <li>Ask whether you need a reservation for dinner.</li>
              <li>Check dietary options directly with the kitchen.</li>
              <li>Confirm whether the venue is inside a hotel or activity site with access rules.</li>
            </ul>

            <div className="callout">
              <h3>Venue note</h3>
              <p>{place.note}</p>
            </div>
          </div>
        </div>

        <aside className="aside-card">
          <span className="eyebrow">Make an evening of it</span>
          <h3>Pair dinner with the river.</h3>
          <p>
            A sunset cruise followed by a late dinner is one of the simplest good days in Victoria
            Falls. The planner can place both without overloading the schedule.
          </p>
          <Link href="/plan" className="btn btn--solid">Plan an evening</Link>
          <Link href="/things-to-do/zambezi-sunset-cruise" className="btn btn--ghost">Sunset cruises</Link>
          <dl className="aside-card__meta">
            <div><dt>Type</dt><dd>{place.type}</dd></div>
            <div><dt>Area</dt><dd>{place.area}</dd></div>
            <div><dt>Payment</dt><dd>At venue</dd></div>
          </dl>
        </aside>
      </div>

      <section className="section section--ivory-deep">
        <div className="shell">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow">More places to eat</span>
              <h2 className="section-head__title">Another table.</h2>
            </div>
            <div className="section-head__aside">
              <Link href="/restaurants" className="link-arrow">All restaurants</Link>
            </div>
          </Reveal>
          <div className="grid grid--3">
            {related.map((item) => (
              <ListingCard
                key={item.slug}
                href={`/restaurants/${item.slug}`}
                image={item.image}
                title={item.name}
                tag={item.type}
                excerpt={item.blurb}
                meta={[item.area]}
                cta="View restaurant"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
