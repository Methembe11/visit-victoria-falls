import Link from "next/link";
import { stays, images } from "@/data/site";
import PageHero from "@/components/PageHero";
import ListingCard from "@/components/ListingCard";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Places to stay",
  description:
    "Accommodation in Victoria Falls, Zimbabwe — riverside lodges, town guesthouses, boutique stays and self-catering apartments.",
};

const types = ["Lodge", "Guesthouse", "Boutique", "Apartment"];

export default async function PlacesToStayPage({ searchParams }) {
  const { type } = await searchParams;
  const active = types.includes(type) ? type : "All";
  const filtered = active === "All" ? stays : stays.filter((item) => item.type === active);

  return (
    <>
      <PageHero
        eyebrow="Places to stay"
        title="Sleep close to the river, or close to town."
        sub="Riverside lodges trade convenience for quiet. Town guesthouses put restaurants and transfers within walking distance. We list both."
        image={images.safariFamily}
        imageAlt="A lodge in the Victoria Falls area"
        crumbs={[{ label: "Places to stay", href: "/places-to-stay" }]}
      />

      <section className="section">
        <div className="shell">
          <Reveal className="page-intro" style={{ paddingTop: 0 }}>
            <div>
              <span className="eyebrow">Accommodation</span>
              <h2 className="h2" style={{ marginTop: 14 }}>The right base changes the trip.</h2>
            </div>
            <div className="page-intro__aside">
              <p>
                Where you sleep determines how much time you spend in a vehicle. If you want the town,
                restaurants and the Falls entrance on foot, stay centrally. If you want the river and
                quiet, expect a transfer for everything else.
              </p>
              <p className="micro">
                {stays.length} places · Rates and availability set by each property
              </p>
            </div>
          </Reveal>

          <div className="filters" aria-label="Filter accommodation">
            <Link href="/places-to-stay" className={`chip${active === "All" ? " chip--active" : ""}`}>
              All
            </Link>
            {types.map((item) => (
              <Link
                key={item}
                href={`/places-to-stay?type=${encodeURIComponent(item)}`}
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
              <p>We only list properties we can describe accurately. Try another category.</p>
              <Link href="/places-to-stay" className="btn btn--dark">All accommodation</Link>
            </div>
          ) : (
            <div className="grid grid--3">
              {filtered.map((stay) => (
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
          )}

          <Reveal className="callout" style={{ marginTop: 56 }}>
            <h3>Before you book a room</h3>
            <p>
              Confirm the total rate, meal plan, transfers, park fees and cancellation policy directly
              with the property. We do not hold rooms or negotiate rates, and we do not accept payment
              for stays.
            </p>
            <Link href="/disclosure" className="link-arrow">How referrals work</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
