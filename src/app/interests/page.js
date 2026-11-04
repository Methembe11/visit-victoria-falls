import Link from "next/link";
import { interests, images } from "@/data/site";
import PageHero from "@/components/PageHero";
import ListingCard from "@/components/ListingCard";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Interests",
  description:
    "Travel your way in Victoria Falls — adventure, wildlife, nature, culture, food, family, relaxation and luxury.",
};

export default function InterestsPage() {
  return (
    <>
      <PageHero
        eyebrow="Travel your way"
        title="Start with what you love."
        sub="Some people come for the adrenaline. Others come for the river, the birds, the food or a quiet week. Both are valid Victoria Falls trips."
        image={images.themeNature}
        imageAlt="Nature around Victoria Falls"
        crumbs={[{ label: "Interests", href: "/interests" }]}
      />

      <section className="section">
        <div className="shell">
          <Reveal className="page-intro" style={{ paddingTop: 0 }}>
            <div>
              <span className="eyebrow">Choose a lens</span>
              <h2 className="h2" style={{ marginTop: 14 }}>The same destination, eight different trips.</h2>
            </div>
            <div className="page-intro__aside">
              <p>
                Each interest page collects the experiences, stays and guides that fit that style of
                travel. Nothing here is ranked by commission, and nothing is described as something it
                is not.
              </p>
            </div>
          </Reveal>

          <div className="grid grid--3">
            {interests.map((interest) => (
              <ListingCard
                key={interest.slug}
                href={`/interests/${interest.slug}`}
                image={interest.image}
                title={interest.name}
                excerpt={interest.blurb}
                meta={["Collection"]}
                cta="Explore"
                ratio="4x5"
              />
            ))}
          </div>

          <Reveal className="callout" style={{ marginTop: 56 }}>
            <h3>Not sure which fits?</h3>
            <p>
              The trip planner asks about your interests directly and builds a suggested outline around
              them. It is a faster way to start than reading every page.
            </p>
            <Link href="/plan" className="btn btn--dark">Open the planner</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
