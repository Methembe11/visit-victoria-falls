import Link from "next/link";
import { images } from "@/data/site";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Places & attractions",
  description:
    "The Falls, the rainforest, the Victoria Falls Bridge, the gorge, the Zambezi and the national park — what each place is and how to visit responsibly.",
};

const places = [
  {
    name: "Victoria Falls & the rainforest",
    image: images.hero,
    area: "Victoria Falls National Park, Zimbabwe",
    text: "A sequence of viewpoints along the Zimbabwe face of the Falls, connected by rainforest kept green by spray. Allow two to three hours and expect wet paths.",
    href: "/things-to-do/rainforest-walk",
    link: "Rainforest walk",
  },
  {
    name: "The Victoria Falls Bridge",
    image: images.bridge,
    area: "Zimbabwe–Zambia border",
    text: "Completed in 1905 as part of the Cape-to-Cairo railway vision. It is both a viewpoint and a working border crossing; carry identification.",
    href: "/guides/bridge-walk-guide",
    link: "Bridge guide",
  },
  {
    name: "The Zambezi River",
    image: images.sunsetCruise,
    area: "Upstream of the Falls",
    text: "Above the Falls the river is wide and calm, with wildlife along the banks. Sunset cruises and river safaris use different stretches and vessels.",
    href: "/things-to-do/zambezi-sunset-cruise",
    link: "Sunset cruise",
  },
  {
    name: "The Batoka Gorge",
    image: images.bungee,
    area: "Below the Falls",
    text: "The gorge downstream records the Falls' earlier positions. It is the setting for the bridge, bungee and gorge activities — all operator-led.",
    href: "/things-to-do/bungee-jump",
    link: "Bungee jump",
  },
  {
    name: "Zambezi National Park",
    image: images.zambeziSafari,
    area: "Upstream, Zimbabwe side",
    text: "A national park along the river above the Falls, visited on guided game drives and river safaris. Wildlife sightings are never guaranteed.",
    href: "/things-to-do/zambezi-safari",
    link: "Zambezi safari",
  },
  {
    name: "Livingstone Island & Devil's Pool",
    image: images.devilsPool,
    area: "Zambian side",
    text: "A seasonal, guided experience reached by boat from the Zambian side. Access depends on river levels and is decided by the operator on the day.",
    href: "/guides/devils-pool-safety",
    link: "Safety guide",
  },
];

export default function LandmarksPage() {
  return (
    <>
      <PageHero
        eyebrow="Places & attractions"
        title="The landscape around the Falls."
        sub="Six places that explain most of what there is to see — and the practical things to know before you visit each one."
        image={images.bridge}
        imageAlt="The Victoria Falls Bridge over the gorge"
        crumbs={[{ label: "Explore", href: "/explore" }, { label: "Places & attractions", href: "/landmarks" }]}
      />

      <section className="section">
        <div className="shell">
          <Reveal className="page-intro" style={{ paddingTop: 0 }}>
            <div>
              <span className="eyebrow">The short list</span>
              <h2 className="h2" style={{ marginTop: 14 }}>Start with the Falls. Then look up, down and upstream.</h2>
            </div>
            <div className="page-intro__aside">
              <p>
                Most of the landscape is connected by the river. Once you understand the gorge, the
                rainforest and the calm water above the Falls, the rest of the experiences make sense.
              </p>
            </div>
          </Reveal>

          <div className="grid grid--2">
            {places.map((place) => (
              <Reveal key={place.name}>
                <article className="card">
                  <div className="card__media card__media--3x2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={place.image} alt={place.name} loading="lazy" />
                  </div>
                  <div className="card__body">
                    <div className="card__meta"><span>{place.area}</span></div>
                    <h3 className="card__title">{place.name}</h3>
                    <p className="card__excerpt">{place.text}</p>
                    <div className="card__foot">
                      <Link href={place.href} className="link-arrow">{place.link}</Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="callout" style={{ marginTop: 56 }}>
            <h3>Visit with care</h3>
            <p>
              The rainforest paths, the gorge edge and the river are not theme-park environments. Stay
              behind barriers, follow guide instructions, supervise children and never enter the water
              outside an authorised activity.
            </p>
            <Link href="/travel#practical" className="link-arrow">Practical travel information</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
