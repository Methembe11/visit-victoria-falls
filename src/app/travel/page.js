import Link from "next/link";
import { images } from "@/data/site";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import JourneyPathways from "@/components/JourneyPathways";

export const metadata = {
  title: "Travel information",
  description:
    "Getting to Victoria Falls, airport transfers, getting around, border and visa considerations, and practical travel information.",
};

export default function TravelPage() {
  return (
    <>
      <PageHero
        eyebrow="Plan your journey"
        title="Arrive with fewer surprises."
        sub="Airports, transfers, borders and the small practical things that decide whether a short trip feels easy or rushed."
        image={images.transfers}
        imageAlt="Transfer vehicle in Victoria Falls"
        crumbs={[{ label: "Travel", href: "/travel" }]}
        meta={["Reviewed October 2026", "Confirm official requirements before travel"]}
      />

      <div className="shell article">
        <aside className="article__aside">
          <div>
            <h2>On this page</h2>
            <nav className="toc" aria-label="On this page">
              <a href="#getting-here">Getting here</a>
              <a href="#transfers">Airport transfers</a>
              <a href="#getting-around">Getting around</a>
              <a href="#border">Borders & visas</a>
              <a href="#practical">Practical information</a>
              <a href="#when">When to visit</a>
            </nav>
          </div>
          <div className="aside-card">
            <span className="eyebrow">Need a hand?</span>
            <h3>Ask a planning question.</h3>
            <p>
              We can help with the shape of a trip. We cannot confirm visas, flights, availability or
              prices — those need the relevant authority or provider.
            </p>
            <Link href="/contact?topic=Trip%20planning" className="btn btn--solid">Contact us</Link>
          </div>
        </aside>

        <article>
          <div className="article__meta">
            <span>Travel</span>
            <span>Reviewed October 2026</span>
          </div>

          <div className="prose">
            <p className="lede" style={{ fontSize: "1.15rem" }}>
              Victoria Falls is served by airports on both sides of the border, and by road from
              Botswana, Zambia and other parts of Zimbabwe. The right arrival point depends on where you
              are coming from and whether you want to cross a border at all.
            </p>

            <section id="getting-here">
              <h2>Getting here</h2>
              <div className="prose" style={{ marginTop: 14 }}>
                <p>
                  <strong>Victoria Falls Airport (VFA)</strong> is the Zimbabwe-side airport, south of
                  town. It handles scheduled regional flights and is the most direct option for a
                  Zimbabwe-based visit. Allow time for the transfer into town or to a riverside lodge.
                </p>
                <p>
                  <strong>Harry Mwanga Nkumbula International Airport (LVI)</strong> serves Livingstone
                  on the Zambian side. It is useful if your itinerary includes Zambia, but reaching
                  Victoria Falls town means crossing the border.
                </p>
                <p>
                  <strong>Kasane Airport (BBK)</strong> in Botswana is another regional option,
                  particularly for travellers combining Chobe with the Falls. Road transfers from Kasane
                  cross an international border, so build in time for immigration.
                </p>
                <p>
                  By road, Victoria Falls is reached from Bulawayo and Hwange in Zimbabwe, from
                  Livingstone via the Victoria Falls Bridge, and from Kasane via the Kazungula border.
                  Road conditions, border queues and transfer times vary; ask your operator for a
                  realistic estimate rather than a best-case one.
                </p>
              </div>
            </section>

            <section id="transfers">
              <h2>Airport transfers</h2>
              <div className="prose" style={{ marginTop: 14 }}>
                <p>
                  Most lodges arrange transfers for guests, sometimes included and sometimes charged
                  separately. Confirm whether your transfer is private or shared, whether it meets your
                  flight, and what happens if the flight is delayed.
                </p>
                <ul>
                  <li>Give the provider your flight number and arrival time in advance.</li>
                  <li>Confirm the meeting point and whether the driver holds a name board.</li>
                  <li>Ask whether the price is per vehicle or per person.</li>
                  <li>Check whether luggage and extra stops are included.</li>
                </ul>
                <p>
                  Independent taxis and transfer operators also serve the airport. Agree the fare before
                  you get in, and carry some local currency for smaller journeys.
                </p>
              </div>
            </section>

            <section id="getting-around">
              <h2>Getting around</h2>
              <div className="prose" style={{ marginTop: 14 }}>
                <p>
                  Central Victoria Falls is compact enough to walk in parts, but many lodges sit outside
                  the centre. If you are staying riverside or in a residential area, plan for a
                  transfer or taxi each time you want to reach town or the Falls entrance.
                </p>
                <p>
                  For activities, operators usually include pickup from major lodges or arrange a
                  meeting point. Ask at the time of booking rather than assuming. If you are moving
                  between Zimbabwe and Zambia, the bridge is a border crossing — not a casual walk.
                </p>
                <ul>
                  <li>Agree taxi fares before departure.</li>
                  <li>Keep your accommodation address and a contact number with you.</li>
                  <li>Allow extra time around sunrise and sunset, when activity traffic peaks.</li>
                  <li>Do not rely on ride-hailing apps being available everywhere.</li>
                </ul>
              </div>
            </section>

            <section id="border">
              <h2>Borders & visas</h2>
              <div className="prose" style={{ marginTop: 14 }}>
                <p>
                  Victoria Falls sits beside the Zimbabwe–Zambia border, and Botswana is a short drive
                  away. Visa rules depend on your nationality, your route and the length of your stay.
                  Check the official immigration or foreign affairs sources for your passport before you
                  travel, and carry printed confirmation of any e-visa.
                </p>
                <p>
                  The KAZA UniVisa is intended to make travel between Zambia and Zimbabwe easier for some
                  nationalities. Availability, cost and eligibility change — confirm at an official port
                  or embassy, not on a blog. A UniVisa does not cover every neighbouring country.
                </p>
                <ul>
                  <li>Carry your passport on any bridge or border activity.</li>
                  <li>Check whether you need a multiple-entry visa if you plan a day trip.</li>
                  <li>Keep copies of your passport and visa separate from the originals.</li>
                  <li>Ask your operator what happens if border queues are long.</li>
                </ul>
              </div>
            </section>

            <section id="practical">
              <h2>Practical information</h2>
              <div className="prose" style={{ marginTop: 14 }}>
                <p>
                  <strong>Money.</strong> Zimbabwe uses a multi-currency environment. US dollars are
                  widely accepted in tourism, and local currency may be used for smaller purchases.
                  Carry small notes, keep receipts, and confirm the currency and total before paying by
                  card.
                </p>
                <p>
                  <strong>Health.</strong> Victoria Falls is a malaria area. Speak to a travel health
                  professional about prophylaxis and vaccinations well before departure. Carry insect
                  repellent, sun protection and any prescription medication in original packaging.
                </p>
                <p>
                  <strong>Water and heat.</strong> Use sealed or filtered water, especially outside
                  established venues. The middle of the day can be very hot; plan outdoor activity for
                  the morning and late afternoon.
                </p>
                <p>
                  <strong>Connectivity.</strong> Mobile coverage is generally available in town, less so
                  in the bush. Buy a local SIM if you need data, or check your roaming package. Do not
                  rely on hotel Wi-Fi for urgent work.
                </p>
                <p>
                  <strong>Safety.</strong> Use reputable operators, keep valuables out of sight, and
                  follow local advice around wildlife and water. The river and gorge are genuinely
                  dangerous outside guided activities.
                </p>
              </div>
            </section>

            <section id="when">
              <h2>When to visit</h2>
              <div className="prose" style={{ marginTop: 14 }}>
                <p>
                  Water level, heat and wildlife change through the year. High water is dramatic but can
                  hide the Falls in spray; low water exposes the rock face and suits some activities
                  better. The shoulder months often balance flow and visibility.
                </p>
                <p>
                  Our guide to the seasons explains the trade-offs in more detail, including what happens
                  to river activities at different water levels.
                </p>
                <Link href="/guides/when-to-visit" className="link-arrow">Read when to visit</Link>
              </div>
            </section>

            <div className="callout">
              <h3>Information changes</h3>
              <p>
                Border rules, flight schedules, transfer prices and park fees are outside our control.
                This page is a planning aid, not an official source. Confirm the details that matter with
                the relevant authority or provider.
              </p>
            </div>
          </div>
        </article>
      </div>

      <section className="section section--ivory-deep">
        <div className="shell">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow">Next step</span>
              <h2 className="section-head__title">Put the journey into a plan.</h2>
            </div>
            <div className="section-head__aside">
              <p>Once you know how you are arriving, the planner can shape the days around it.</p>
              <Link href="/plan" className="link-arrow">Open the trip planner</Link>
            </div>
          </Reveal>
          <div className="grid grid--3">
            <Link href="/guides/complete-guide-to-victoria-falls" className="card">
              <div className="card__body">
                <span className="eyebrow">Guide</span>
                <h3 className="card__title" style={{ marginTop: 12 }}>The complete guide</h3>
                <p className="card__excerpt">The shape of a first visit, from the rainforest to border practicalities.</p>
              </div>
            </Link>
            <Link href="/places-to-stay" className="card">
              <div className="card__body">
                <span className="eyebrow">Stay</span>
                <h3 className="card__title" style={{ marginTop: 12 }}>Where to sleep</h3>
                <p className="card__excerpt">Riverside lodges, town guesthouses and longer-stay apartments.</p>
              </div>
            </Link>
            <Link href="/things-to-do" className="card">
              <div className="card__body">
                <span className="eyebrow">Do</span>
                <h3 className="card__title" style={{ marginTop: 12 }}>Experiences</h3>
                <p className="card__excerpt">Flights, cruises, the bridge, the rainforest and the bush.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
      <JourneyPathways current="Travel" />
    </>
  );
}
