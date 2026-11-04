import Image from "next/image";
import Link from "next/link";
import {
  site,
  experiences,
  stays,
  restaurants,
  guides,
  interests,
  itineraries,
  images,
} from "@/data/site";
import VideoHero from "@/components/VideoHero";
import PolaroidLineCarousel from "@/components/ui/polaroid-line-carousel";
import Reveal from "@/components/Reveal";
import styles from "./home.module.css";

const pickExperience = (slug) => experiences.find((item) => item.slug === slug);
const pickStay = (slug) => stays.find((item) => item.slug === slug);
const pickGuide = (slug) => guides.find((item) => item.slug === slug);
const pickInterest = (slug) => interests.find((item) => item.slug === slug);

const popular = [
  "helicopter-flights",
  "zambezi-sunset-cruise",
  "rainforest-walk",
  "game-drive",
]
  .map(pickExperience)
  .filter(Boolean);

const exploreSlides = [
  {
    title: "Adventure",
    caption: "Flights, bungee and the gorge.",
    image: "https://visitzimbabwe.b-cdn.net/theme/theme-adventure.jpg",
    alt: "Adventure experiences in Victoria Falls",
    href: "/interests/adventure",
  },
  {
    title: "Nature & wildlife",
    caption: "Rainforest, river and the national park.",
    image: "https://visitzimbabwe.b-cdn.net/theme/theme-nature.jpg",
    alt: "Nature and wildlife in Victoria Falls",
    href: "/interests/wildlife",
  },
  {
    title: "Zambezi River",
    caption: "Cruises, sunsets and time on the water.",
    image: "https://visitzimbabwe.b-cdn.net/guides/victoria-falls/sunset-cruise-zambezi-victoria-falls-boats-1767724537282.jpg",
    alt: "Zambezi River in Victoria Falls",
    href: "/things-to-do?category=River",
  },
  {
    title: "Culture & heritage",
    caption: "Local life, history and the bridge.",
    image: "https://visitzimbabwe.b-cdn.net/theme/theme-culture.jpg",
    alt: "Culture and heritage in Victoria Falls",
    href: "/interests/culture",
  },
  {
    title: "Relaxation",
    caption: "Quiet lodges and unhurried days.",
    image: "https://visitzimbabwe.b-cdn.net/theme/theme-wellness.jpg",
    alt: "Relaxation in Victoria Falls",
    href: "/interests/relaxation",
  },
  {
    title: "The Falls",
    caption: "Rainforest paths, viewpoints and the thunder of the gorge.",
    image: images.hero,
    alt: "Victoria Falls cascading into the Batoka Gorge",
    href: "/landmarks",
  },
];

const featuredStays = [
  "victoria-falls-river-lodge",
  "parrot-lodge",
  "the-victorian-manor",
  "the-gray-luxury-apartments",
]
  .map(pickStay)
  .filter(Boolean);

const moreFeature = pickExperience("chobe-day-trip");
const moreExperiences = [
  "devils-pool",
  "community-safari",
  "dinner-cruise",
  "bridge-walk",
]
  .map(pickExperience)
  .filter(Boolean);

const featuredGuides = [
  "complete-guide-to-victoria-falls",
  "when-to-visit",
  "helicopter-tours",
]
  .map(pickGuide)
  .filter(Boolean);

const businessGroups = [
  {
    title: "Places to stay",
    count: stays.length,
    href: "/places-to-stay",
    text: "Lodges, guesthouses, boutique properties and apartments.",
    items: featuredStays.slice(0, 3).map((stay) => stay.name),
  },
  {
    title: "Restaurants & cafÃ©s",
    count: restaurants.length,
    href: "/restaurants",
    text: "From gorge-side lunches to informal town grills.",
    items: restaurants.slice(0, 3).map((restaurant) => restaurant.name),
  },
  {
    title: "Experiences & operators",
    count: experiences.length,
    href: "/things-to-do",
    text: "Flights, cruises, guided walks, safaris and transfers.",
    items: popular.slice(0, 3).map((experience) => experience.title),
  },
];

const visitorLinks = [
  { label: "Getting here", href: "/travel#getting-here" },
  { label: "Airport transfers", href: "/travel#transfers" },
  { label: "Visa & border", href: "/travel#border" },
  { label: "Getting around", href: "/travel#getting-around" },
  { label: "When to visit", href: "/guides/when-to-visit" },
  { label: "Frequently asked questions", href: "/faq" },
];

const exampleItinerary = itineraries.find((item) => item.slug === "four-days") ?? itineraries[0];

export default function HomePage() {
  const [feature, ...popularRows] = popular;

  return (
    <div className={styles.page}>
      {/* 01 â€” Cinematic scroll-locked video hero */}
      <VideoHero />

      {/* 02 â€” Popular experiences */}
      <section className={styles.section} aria-labelledby="popular-heading">
        <div className="shell">
          <Reveal className={styles.sectionHead}>
            <div className={styles.sectionHeadCopy}>
              <span className={styles.kicker}>Popular experiences</span>
              <h2 id="popular-heading" className={styles.title}>
                Start with the ones people come for.
              </h2>
            </div>
            <p className={styles.sectionHeadText}>
              Four ways into the destination â€” from the air, on the water, on foot and in the bush.
              Each listing explains what to expect and what to confirm before you book.
            </p>
          </Reveal>

          <div className={styles.popularStack}>
            {popular.map((experience, index) => (
              <Link
                key={experience.slug}
                href={`/things-to-do/${experience.slug}`}
                className={styles.stackCard}
                data-track="listing_click"
                data-track-label={experience.title}
              >
                <Image
                  src={experience.image}
                  alt={experience.title}
                  fill
                  sizes="(max-width: 700px) 78vw, 42vw"
                  className={styles.stackCardMedia}
                />
                <span className={styles.stackCardShade} />
                <span className={styles.stackCardIndex}>0{index + 1}</span>
                <span className={styles.stackCardCaption}>
                  <span className={styles.stackCardMeta}>{experience.category} · {experience.duration}</span>
                  <span className={styles.stackCardTitle}>{experience.title}</span>
                  <span className={styles.stackCardArrow} aria-hidden="true">↗</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — Explore Victoria Falls */}      <section className={`${styles.section} ${styles.sectionSage}`} aria-labelledby="explore-heading">
        <div className="shell">
          <Reveal className={styles.sectionHead}>
            <div className={styles.sectionHeadCopy}>
              <span className={styles.kicker}>Explore Victoria Falls</span>
              <h2 id="explore-heading" className={styles.title}>
                Or follow your own idea of a good day.
              </h2>
            </div>
            <p className={styles.sectionHeadText}>
              Six ways into the destination, from the sound of the gorge to a quiet afternoon
              on the river. Choose the one that sounds like your trip.
            </p>
          </Reveal>

          <PolaroidLineCarousel
            slides={exploreSlides}
            height="600px"
            ariaLabel="Explore curated experiences in Victoria Falls"
          />
        </div>
      </section>

      {/* 04 â€” Places to stay */}
      <section className={styles.section} aria-labelledby="stay-heading">
        <div className="shell">
          <div className={styles.stayLayout}>
            <Reveal className={styles.stayIntro}>
              <span className={styles.kicker}>Places to stay</span>
              <h2 id="stay-heading" className={styles.title}>
                A base for the kind of trip you are taking.
              </h2>
              <p className={styles.stayIntroCopy}>
                Riverside lodges trade convenience for quiet. Town guesthouses put restaurants and
                transfers within walking distance. We list both, with what each is good for.
              </p>
              <div className={styles.stayFilters} aria-label="Filter places to stay by type">
                {["Lodge", "Guesthouse", "Boutique", "Apartment"].map((type) => (
                  <Link
                    key={type}
                    href={`/places-to-stay?type=${type}`}
                    className={styles.stayFilter}
                  >
                    {type}
                  </Link>
                ))}
              </div>
              <p className={styles.note}>
                Rates, availability and inclusions are set by each property.
              </p>
              <Link href="/places-to-stay" className={styles.textLink}>
                All {stays.length} places to stay <span aria-hidden="true">â†’</span>
              </Link>
            </Reveal>

            <div className={styles.stayGrid}>
              {featuredStays.map((stay) => (
                <Link
                  key={stay.slug}
                  href={`/places-to-stay/${stay.slug}`}
                  className={styles.stayCard}
                  data-track="listing_click"
                  data-track-label={stay.name}
                >
                  <span className={styles.stayMedia}>
                    <Image
                      src={stay.image}
                      alt={stay.name}
                      fill
                      sizes="(max-width: 720px) 192px, (max-width: 960px) 50vw, 26vw"
                    />
                  </span>
                  <span className={styles.stayBody}>
                    <span className={styles.stayMeta}>
                      {stay.type} Â· {stay.area}
                    </span>
                    <span className={styles.stayName}>{stay.name}</span>
                    <span className={styles.stayText}>{stay.blurb}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 05 â€” More things to do */}
      <section className={`${styles.section} ${styles.sectionSand}`} aria-labelledby="more-heading">
        <div className="shell">
          <Reveal className={styles.sectionHead}>
            <div className={styles.sectionHeadCopy}>
              <span className={styles.kicker}>More things to do</span>
              <h2 id="more-heading" className={styles.title}>
                Beyond the headline experiences.
              </h2>
            </div>
            <p className={styles.sectionHeadText}>
              A day trip across the border, a morning with a community guide, dinner on the river,
              or a walk along the bridge. The trip gets better when you look past the first page.
            </p>
          </Reveal>

          <div className={styles.moreLayout}>
            {moreFeature && (
              <Link
                href={`/things-to-do/${moreFeature.slug}`}
                className={styles.moreFeature}
                data-track="listing_click"
                data-track-label={moreFeature.title}
              >
                <Image
                  src={moreFeature.image}
                  alt={moreFeature.title}
                  fill
                  sizes="(max-width: 960px) 100vw, 55vw"
                  className={styles.moreFeatureMedia}
                />
                <span className={styles.moreFeatureBody}>
                  <span className={styles.cardKicker}>
                    {moreFeature.category} Â· {moreFeature.duration}
                  </span>
                  <span className={styles.moreFeatureTitle}>{moreFeature.title}</span>
                  <span className={styles.moreFeatureText}>{moreFeature.blurb}</span>
                </span>
              </Link>
            )}

            <div>
              <div className={styles.moreList}>
                {moreExperiences.map((experience, index) => (
                  <Link
                    key={experience.slug}
                    href={`/things-to-do/${experience.slug}`}
                    className={styles.moreRow}
                    data-track="listing_click"
                    data-track-label={experience.title}
                  >
                    <span className={styles.moreIndex}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className={styles.moreRowTitle}>{experience.title}</span>
                      <span className={styles.moreRowMeta}>
                        {experience.category} Â· {experience.duration}
                      </span>
                    </span>
                    <span className={styles.moreArrow} aria-hidden="true">
                      â†’
                    </span>
                  </Link>
                ))}
              </div>
              <div className={styles.moreFooter}>
                <Link href="/things-to-do" className={styles.textLink}>
                  Browse all {experiences.length} experiences <span aria-hidden="true">â†’</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06 â€” AI trip planner */}
      <section
        className={`${styles.section} ${styles.sectionDark}`}
        aria-labelledby="planner-heading"
      >
        <div className="shell">
          <div className={styles.plannerLayout}>
            <Reveal className={styles.plannerCopy}>
              <span className={`${styles.kicker} ${styles.kickerLight}`}>AI trip planner</span>
              <h2 id="planner-heading" className={`${styles.title} ${styles.titleLight}`}>
                Tell us the shape of your trip.
              </h2>
              <p className={styles.plannerCopyText}>
                A suggested outline built from the destination information on this site â€” your
                month, pace, budget and interests. Use it as a starting point, then confirm the
                details with the providers you choose.
              </p>
              <div className={styles.plannerActions}>
                <Link href="/plan" className={`btn ${styles.plannerPrimary}`}>
                  Open the trip planner
                </Link>
                <Link href="/itineraries" className={`${styles.textLink} ${styles.textLinkLight}`}>
                  Browse itineraries <span aria-hidden="true">â†’</span>
                </Link>
              </div>
              <p className={styles.plannerNote}>
                A planning aid, not a booking. Prices, availability and terms are set by providers.
              </p>
            </Reveal>

            {exampleItinerary && (
              <div className={styles.plannerPanel}>
                <div className={styles.plannerPanelHead}>
                  <span>Example outline</span>
                  <span>{exampleItinerary.duration}</span>
                </div>
                <h3 className={styles.plannerPanelTitle}>{exampleItinerary.name}</h3>
                <p className={styles.plannerPanelText}>{exampleItinerary.summary}</p>
                <ol className={styles.plannerDays}>
                  {exampleItinerary.days.map((day) => (
                    <li key={day.day}>
                      <span className={styles.plannerDay}>Day {day.day}</span>
                      <span>
                        <span className={styles.plannerDayTitle}>{day.title}</span>
                        <span className={styles.plannerDayItems}>{day.items.join(" Â· ")}</span>
                      </span>
                    </li>
                  ))}
                </ol>
                <p className={styles.plannerPanelNote}>
                  Example only. The planner builds a fresh outline from your input.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 07 â€” Travel guides */}
      <section className={styles.section} aria-labelledby="guides-heading">
        <div className="shell">
          <Reveal className={styles.sectionHead}>
            <div className={styles.sectionHeadCopy}>
              <span className={styles.kicker}>Travel guides</span>
              <h2 id="guides-heading" className={styles.title}>
                Read before you book the flights.
              </h2>
            </div>
            <Link href="/guides" className={styles.textLink}>
              All {guides.length} guides <span aria-hidden="true">â†’</span>
            </Link>
          </Reveal>

          <div className={styles.guidesGrid}>
            {featuredGuides.map((guide) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`} className={styles.guideCard}>
                <span className={styles.guideMedia}>
                  <Image
                    src={guide.image}
                    alt={guide.title}
                    fill
                    sizes="(max-width: 720px) 176px, (max-width: 960px) 50vw, 33vw"
                  />
                </span>
                <span className={styles.guideBody}>
                  <span className={styles.guideMeta}>
                    {guide.category} Â· {guide.readTime}
                  </span>
                  <span className={styles.guideTitle}>{guide.title}</span>
                  <span className={styles.guideText}>{guide.excerpt}</span>
                </span>
              </Link>
            ))}
          </div>

          <div className={styles.guideFoot}>
            <span className={styles.guideFootText}>
              Arriving, visas, transfers and what to pack.
            </span>
            <Link href="/travel" className={styles.textLink}>
              Practical travel information <span aria-hidden="true">â†’</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 08 â€” Local businesses */}
      <section className={styles.section} aria-labelledby="business-heading">
        <div className="shell">
          <div className={styles.bizHead}>
            <div className={styles.bizHeadCopy}>
              <span className={styles.kicker}>Local businesses</span>
              <h2 id="business-heading" className={styles.title}>
                The people who make the place work.
              </h2>
            </div>
            <p className={styles.sectionHeadText}>
              A directory of stays, kitchens and operators. Listings are grouped by what they are â€”
              not ranked by who paid.
            </p>
          </div>

          <div className={styles.bizGrid}>
            {businessGroups.map((group) => (
              <div key={group.href} className={styles.bizCard}>
                <span className={styles.bizCount}>{String(group.count).padStart(2, "0")}</span>
                <h3 className={styles.bizTitle}>{group.title}</h3>
                <p className={styles.bizText}>{group.text}</p>
                <ul className={styles.bizList}>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link href={group.href} className={styles.bizLink}>
                  View the listings â†’
                </Link>
              </div>
            ))}
          </div>

          <div className={styles.bizFoot}>
            <span className={styles.bizFootText}>
              The directory covers stays, kitchens and operators across Victoria Falls.
            </span>
            <Link href="/businesses" className={styles.textLink}>
              The full directory <span aria-hidden="true">â†’</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 09 â€” Visitor information */}
      <section
        className={`${styles.section} ${styles.sectionSage}`}
        aria-labelledby="visitor-heading"
      >
        <div className="shell">
          <div className={styles.visitorLayout}>
            <Reveal className={styles.visitorCopy}>
              <span className={styles.kicker}>Visitor information</span>
              <h2 id="visitor-heading" className={styles.title}>
                The practical bits, in one place.
              </h2>
              <p className={styles.visitorText}>
                Airport transfers, border formalities, getting around and the questions worth
                answering before you travel.
              </p>
              <a href={`mailto:${site.email}`} className={styles.visitorEmail}>
                {site.email}
              </a>
              <p className={styles.visitorReview}>
                Reviewed {site.lastReviewed} Â· {site.location}
              </p>
            </Reveal>

            <div className={styles.visitorLinks}>
              {visitorLinks.map((link) => (
                <Link key={link.href} href={link.href} className={styles.visitorLink}>
                  <span>{link.label}</span>
                  <span aria-hidden="true">â†—</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

