import Link from "next/link";
import { experiences, guides, stays, restaurants, interests, images } from "@/data/site";
import PageHero from "@/components/PageHero";
import ListingCard from "@/components/ListingCard";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Search",
  description: "Search Victoria Falls experiences, places to stay, restaurants, guides and interests.",
  robots: { index: false, follow: true },
};

const index = [
  ...experiences.map((item) => ({
    title: item.title,
    href: `/things-to-do/${item.slug}`,
    image: item.image,
    excerpt: item.blurb,
    meta: item.category,
    text: `${item.title} ${item.category} ${item.blurb} ${item.summary} ${item.bestFor}`,
  })),
  ...stays.map((item) => ({
    title: item.name,
    href: `/places-to-stay/${item.slug}`,
    image: item.image,
    excerpt: item.blurb,
    meta: item.type,
    text: `${item.name} ${item.type} ${item.area} ${item.blurb} ${item.goodFor}`,
  })),
  ...restaurants.map((item) => ({
    title: item.name,
    href: `/restaurants/${item.slug}`,
    image: item.image,
    excerpt: item.blurb,
    meta: item.type,
    text: `${item.name} ${item.type} ${item.area} ${item.blurb}`,
  })),
  ...guides.map((item) => ({
    title: item.title,
    href: `/guides/${item.slug}`,
    image: item.image,
    excerpt: item.excerpt,
    meta: item.category,
    text: `${item.title} ${item.category} ${item.excerpt} ${item.intro}`,
  })),
  ...interests.map((item) => ({
    title: item.name,
    href: `/interests/${item.slug}`,
    image: item.image,
    excerpt: item.blurb,
    meta: "Interest",
    text: `${item.name} ${item.blurb}`,
  })),
];

export const dynamic = "force-dynamic";

export default async function SearchPage({ searchParams }) {
  const { q } = await searchParams;
  const query = String(q || "").trim();
  const needle = query.toLowerCase();

  const results =
    needle.length < 2
      ? []
      : index.filter((item) => item.text.toLowerCase().includes(needle)).slice(0, 24);

  return (
    <>
      <PageHero
        eyebrow="Search"
        title="Find the right page."
        sub="Search experiences, places to stay, restaurants, guides and interest collections."
        image={images.seasons}
        imageAlt="Victoria Falls landscape"
        crumbs={[{ label: "Search", href: "/search" }]}
      />

      <section className="section">
        <div className="shell">
          <form className="form" action="/search" method="get" role="search" style={{ maxWidth: 680 }}>
            <div className="field">
              <label htmlFor="search-q">What are you looking for?</label>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <input
                  id="search-q"
                  name="q"
                  type="search"
                  defaultValue={query}
                  placeholder="Helicopter, Devil's Pool, lodge, sunset cruise…"
                  style={{ flex: "1 1 260px" }}
                />
                <button type="submit" className="btn btn--solid">Search</button>
              </div>
            </div>
          </form>

          {needle.length >= 2 ? (
            <div style={{ marginTop: 48 }}>
              <div className="filters" style={{ borderTop: 0, paddingTop: 0 }}>
                <span className="list-count" style={{ marginLeft: 0 }}>
                  {results.length} result{results.length === 1 ? "" : "s"} for &ldquo;{query}&rdquo;
                </span>
              </div>

              {results.length === 0 ? (
                <div className="empty">
                  <h2>No matches yet.</h2>
                  <p>
                    Try a shorter word, a place name or a type of experience. The full directory is
                    organised under Things to do, Places to stay, Restaurants and Guides.
                  </p>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
                    <Link href="/things-to-do" className="btn btn--dark">Experiences</Link>
                    <Link href="/places-to-stay" className="btn btn--ghost">Places to stay</Link>
                  </div>
                </div>
              ) : (
                <div className="grid grid--3">
                  {results.map((item) => (
                    <ListingCard
                      key={item.href}
                      href={item.href}
                      image={item.image}
                      title={item.title}
                      excerpt={item.excerpt}
                      meta={[item.meta]}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div style={{ marginTop: 48 }}>
              <Reveal className="section-head">
                <div>
                  <span className="eyebrow">Popular starting points</span>
                  <h2 className="section-head__title">Not sure what to search for?</h2>
                </div>
                <div className="section-head__aside">
                  <p>These pages cover most of the questions visitors arrive with.</p>
                </div>
              </Reveal>
              <div className="grid grid--3">
                {["/guides/when-to-visit", "/things-to-do", "/places-to-stay"].map((href) => {
                  const entry =
                    href === "/things-to-do"
                      ? { title: "All experiences", excerpt: "Flights, cruises, walks, safaris and transfers.", image: images.helicopter, meta: "Directory" }
                      : href === "/places-to-stay"
                        ? { title: "All places to stay", excerpt: "Lodges, guesthouses, boutique stays and apartments.", image: stays[0].image, meta: "Directory" }
                        : { title: guides.find((g) => g.slug === "when-to-visit")?.title, excerpt: guides.find((g) => g.slug === "when-to-visit")?.excerpt, image: images.seasons, meta: "Guide" };
                  return (
                    <ListingCard
                      key={href}
                      href={href}
                      image={entry.image}
                      title={entry.title}
                      excerpt={entry.excerpt}
                      meta={[entry.meta]}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
