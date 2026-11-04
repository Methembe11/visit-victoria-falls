import Link from "next/link";
import { notFound } from "next/navigation";
import { stays } from "@/data/site";
import PageHero from "@/components/PageHero";
import ListingCard from "@/components/ListingCard";
import Reveal from "@/components/Reveal";
import ReferralPanel from "@/components/ReferralPanel";

export function generateStaticParams() {
  return stays.map((stay) => ({ slug: stay.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const stay = stays.find((item) => item.slug === slug);
  if (!stay) return { title: "Stay not found" };
  return {
    title: stay.name,
    description: stay.blurb,
    openGraph: { title: stay.name, description: stay.blurb, images: [{ url: stay.image }] },
  };
}

export default async function StayPage({ params }) {
  const { slug } = await params;
  const stay = stays.find((item) => item.slug === slug);
  if (!stay) notFound();

  const related = stays.filter((item) => item.slug !== stay.slug && item.type === stay.type).slice(0, 3);
  const fallback = stays.filter((item) => item.slug !== stay.slug).slice(0, 3);
  const suggestions = related.length > 0 ? related : fallback;

  return (
    <>
      <PageHero
        eyebrow={stay.type}
        title={stay.name}
        sub={stay.blurb}
        image={stay.image}
        imageAlt={stay.name}
        crumbs={[
          { label: "Places to stay", href: "/places-to-stay" },
          { label: stay.type, href: `/places-to-stay?type=${encodeURIComponent(stay.type)}` },
        ]}
        meta={[stay.area, "Rates set by property"]}
      />

      <div className="shell detail">
        <div className="detail__main">
          <div className="detail__stats">
            <div className="detail__stat">
              <span>Type</span>
              <strong>{stay.type}</strong>
            </div>
            <div className="detail__stat">
              <span>Area</span>
              <strong>{stay.area}</strong>
            </div>
            <div className="detail__stat">
              <span>Good for</span>
              <strong>{stay.goodFor}</strong>
            </div>
          </div>

          <div className="prose">
            <h2 style={{ marginTop: 0 }}>The short version</h2>
            <p>{stay.blurb}</p>
            <p>
              We have not stayed at every property we list. This page is a starting point, not an
              inspection report. Use it to decide whether the location and style suit your trip, then
              check current room types, facilities and rates directly with the property.
            </p>

            <h3>What to confirm before booking</h3>
            <ul>
              <li>Total rate for your dates, and whether taxes or levies are included.</li>
              <li>Meal plan, transfers and any park or conservation fees.</li>
              <li>Cancellation, deposit and change policies.</li>
              <li>Room type, bed configuration and accessibility requirements.</li>
              <li>Distance to the Falls entrance, town and the airport.</li>
            </ul>

            <div className="callout">
              <h3>Property note</h3>
              <p>{stay.note}</p>
            </div>
          </div>
        </div>

        <aside className="aside-card">
          <ReferralPanel type="accommodation" slug={stay.slug} name={stay.name} enquiryHref={`/contact?topic=Accommodation&listing=${encodeURIComponent(stay.name)}`} />
          <Link href="/places-to-stay" className="btn btn--ghost">Compare all stays</Link>
          <dl className="aside-card__meta">
            <div><dt>Type</dt><dd>{stay.type}</dd></div>
            <div><dt>Area</dt><dd>{stay.area}</dd></div>
            <div><dt>Booking</dt><dd>Direct with provider</dd></div>
            <div><dt>Payment</dt><dd>On provider website</dd></div>
          </dl>
        </aside>
      </div>

      <section className="section section--ivory-deep">
        <div className="shell">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow">Also consider</span>
              <h2 className="section-head__title">Similar places to stay.</h2>
            </div>
            <div className="section-head__aside">
              <Link href="/places-to-stay" className="link-arrow">All accommodation</Link>
            </div>
          </Reveal>
          <div className="grid grid--3">
            {suggestions.map((item) => (
              <ListingCard
                key={item.slug}
                href={`/places-to-stay/${item.slug}`}
                image={item.image}
                title={item.name}
                tag={item.type}
                excerpt={item.blurb}
                meta={[item.area]}
                cta="View stay"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
