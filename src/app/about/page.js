import Link from "next/link";
import { images } from "@/data/site";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "About",
  description:
    "How Visit Victoria Falls works — an independent destination guide, what we do and do not do, and how we handle listings, imagery and AI.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A guide, not a booking engine."
        sub="Visit Victoria Falls exists to help you understand the destination, choose well and ask better questions before you pay anyone."
        image={images.community}
        imageAlt="Community and wildlife experience near Victoria Falls"
        crumbs={[{ label: "About", href: "/about" }]}
      />

      <section className="section">
        <div className="shell article">
          <aside className="article__aside">
            <div>
              <h2>On this page</h2>
              <nav className="toc" aria-label="On this page">
                <a href="#why">Why this exists</a>
                <a href="#editorial">Editorial approach</a>
                <a href="#bookings">Bookings & referrals</a>
                <a href="#imagery">Imagery</a>
                <a href="#ai">AI use</a>
                <a href="#contact">Contact</a>
              </nav>
            </div>
            <div className="aside-card">
              <span className="eyebrow">Something inaccurate?</span>
              <h3>Tell us.</h3>
              <p>
                If a listing is wrong, out of date or unfair to a business, we want to know. Corrections
                are reviewed and applied where we can verify them.
              </p>
              <Link href="/contact?topic=Website%20feedback" className="btn btn--solid">Send a correction</Link>
            </div>
          </aside>

          <article>
            <div className="article__meta">
              <span>About</span>
              <span>Reviewed October 2026</span>
            </div>

            <div className="prose">
              <p className="lede" style={{ fontSize: "1.15rem" }}>
                Victoria Falls is easy to market and harder to explain. The waterfall is extraordinary,
                but a good visit depends on season, timing, transfers and a handful of practical details
                that rarely make it into promotional copy. This site is an attempt to be useful about
                those details.
              </p>

              <section id="why">
                <h2>Why this exists</h2>
                <div className="prose" style={{ marginTop: 14 }}>
                  <p>
                    Most travel content about Victoria Falls falls into two camps: breathless marketing
                    or thin listicles. Neither helps you decide whether to stay two nights or four,
                    whether to cross the border, or which activity is worth the money.
                  </p>
                  <p>
                    We write for the person doing the planning — the one comparing lodges at 11pm,
                    checking whether Devil&apos;s Pool is open, and trying to work out how long the
                    rainforest walk actually takes.
                  </p>
                </div>
              </section>

              <section id="editorial">
                <h2>Editorial approach</h2>
                <div className="prose" style={{ marginTop: 14 }}>
                  <p>
                    Listings are grouped by what they are, not by who pays. We do not publish star
                    ratings, review scores or &quot;best of&quot; claims we cannot support. Where we do not
                    know something — a current rate, an opening time, whether a road is passable — we say
                    so and ask you to confirm.
                  </p>
                  <ul>
                    <li>Pages carry a review date.</li>
                    <li>Descriptions separate what is known from what should be checked.</li>
                    <li>Corrections from businesses and readers are welcome.</li>
                    <li>Paid placements, if introduced, will be labelled.</li>
                  </ul>
                </div>
              </section>

              <section id="bookings">
                <h2>Bookings & referrals</h2>
                <div className="prose" style={{ marginTop: 14 }}>
                  <p>
                    We do not process payments, hold reservations or act as an agent. When you choose a
                    provider, your contract is with them. Some outbound links may earn a commission if
                    you make a qualifying booking; this does not increase the price you pay. Read the
                    full disclosure for details.
                  </p>
                  <Link href="/disclosure" className="link-arrow">Booking & referral disclosure</Link>
                </div>
              </section>

              <section id="imagery">
                <h2>Imagery</h2>
                <div className="prose" style={{ marginTop: 14 }}>
                  <p>
                    Destination and listing imagery is sourced from Visit Zimbabwe and partner listings,
                    and is used here for destination representation and demonstration. Copyright remains
                    with the respective owners. If you own an image and believe it is used incorrectly,
                    contact us and we will review or remove it.
                  </p>
                </div>
              </section>

              <section id="ai">
                <h2>AI use</h2>
                <div className="prose" style={{ marginTop: 14 }}>
                  <p>
                    The trip planner can use an AI model to suggest an itinerary, with a deterministic
                    fallback if the model is unavailable. AI output is labelled as a suggestion. It is
                    not a booking, a price quote or a guarantee of availability. We do not send personal
                    data to the model beyond the planning preferences you enter.
                  </p>
                  <p>
                    Editorial pages are written and reviewed by a human. Where AI assistance is used in
                    drafting, the published copy is checked before it goes live.
                  </p>
                </div>
              </section>

              <section id="contact">
                <h2>Contact</h2>
                <div className="prose" style={{ marginTop: 14 }}>
                  <p>
                    For corrections, partnership questions, listing requests or trip-planning questions,
                    use the contact form. We read every genuine message, though we cannot always reply to
                    everything.
                  </p>
                  <Link href="/contact" className="btn btn--dark">Contact us</Link>
                </div>
              </section>
            </div>
          </article>
        </div>
      </section>

      <section className="section section--ivory-deep">
        <div className="shell">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow">Keep reading</span>
              <h2 className="section-head__title">The pages that explain the rest.</h2>
            </div>
            <div className="section-head__aside">
              <p>Transparency is only useful if it is easy to find.</p>
            </div>
          </Reveal>
          <div className="grid grid--3">
            <Link href="/privacy" className="stack-links"><span>Privacy policy</span><span className="muted">Data</span></Link>
            <Link href="/terms" className="stack-links"><span>Terms of use</span><span className="muted">Legal</span></Link>
            <Link href="/disclosure" className="stack-links"><span>Booking disclosure</span><span className="muted">Commercial</span></Link>
          </div>
        </div>
      </section>
    </>
  );
}
