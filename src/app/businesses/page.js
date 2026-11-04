import Link from "next/link";
import { experiences, stays, restaurants, images } from "@/data/site";
import PageHero from "@/components/PageHero";
import ListingCard from "@/components/ListingCard";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Local businesses",
  description:
    "A directory of lodges, restaurants, experiences and operators in Victoria Falls, Zimbabwe — with clear notes on what is confirmed and what to check.",
};

const groups = [
  {
    title: "Places to stay",
    href: "/places-to-stay",
    count: stays.length,
    text: "Lodges, guesthouses, boutique properties and apartments.",
    items: stays.slice(0, 3).map((item) => ({ title: item.name, href: `/places-to-stay/${item.slug}`, meta: item.type })),
  },
  {
    title: "Restaurants & cafés",
    href: "/restaurants",
    count: restaurants.length,
    text: "From gorge-side lunches to informal town grills.",
    items: restaurants.slice(0, 3).map((item) => ({ title: item.name, href: `/restaurants/${item.slug}`, meta: item.type })),
  },
  {
    title: "Experiences & operators",
    href: "/things-to-do",
    count: experiences.length,
    text: "Flights, cruises, guided walks, safaris and transfers.",
    items: experiences.slice(0, 3).map((item) => ({ title: item.title, href: `/things-to-do/${item.slug}`, meta: item.category })),
  },
];

export default function BusinessesPage() {
  return (
    <>
      <PageHero
        eyebrow="Local businesses"
        title="The people behind the place."
        sub="A working directory of businesses in and around Victoria Falls, with notes on what we have confirmed and what you should check directly."
        image={images.restaurantBeachHouse}
        imageAlt="A Victoria Falls hospitality setting"
        crumbs={[{ label: "Explore", href: "/explore" }, { label: "Local businesses", href: "/businesses" }]}
      />

      <section className="section">
        <div className="shell">
          <Reveal className="page-intro" style={{ paddingTop: 0 }}>
            <div>
              <span className="eyebrow">The directory</span>
              <h2 className="h2" style={{ marginTop: 14 }}>Editorial, not pay-to-rank.</h2>
            </div>
            <div className="page-intro__aside">
              <p>
                Businesses cannot buy a better position. Listings are grouped by what they are, and
                described with the information we can stand behind. If something is out of date, tell us
                and we will correct it.
              </p>
              <p className="micro">
                {stays.length + restaurants.length + experiences.length} listings · Corrections welcome
              </p>
              <Link href="/partners" className="link-arrow" style={{ marginTop: 16 }}>Explore our operator partnership proposal</Link>
            </div>
          </Reveal>

          {groups.map((group, index) => (
            <Reveal key={group.href} delay={index * 60}>
              <div className="section-head" style={{ marginTop: index === 0 ? 24 : 56, marginBottom: 22 }}>
                <div>
                  <span className="eyebrow">{group.count} listings</span>
                  <h2 className="h3" style={{ marginTop: 10 }}>{group.title}</h2>
                </div>
                <div className="section-head__aside">
                  <p>{group.text}</p>
                  <Link href={group.href} className="link-arrow">View all</Link>
                </div>
              </div>
              <div className="stack-links">
                {group.items.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <span>{item.title}</span>
                    <span className="muted">{item.meta}</span>
                  </Link>
                ))}
              </div>
            </Reveal>
          ))}

          <Reveal className="business-band" style={{ marginTop: 72 }}>
            <div>
              <span className="eyebrow">For owners & managers</span>
              <h2>Is your business missing or misdescribed?</h2>
              <p>
                We are actively building this directory and welcome corrections from people who know the
                business best. Send us the listing name, what needs to change, and a public source we can
                check.
              </p>
              <p>
                We do not guarantee inclusion, and we do not publish unverifiable claims. Community and
                cultural listings are free.
              </p>
              <Link href="/list-your-business" className="btn btn--dark">Submit your business</Link>
            </div>
            <div className="business-band__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={images.restaurantGarden} alt="A garden hospitality setting in Victoria Falls" loading="lazy" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
