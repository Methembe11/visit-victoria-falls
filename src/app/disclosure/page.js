import Link from "next/link";
import { images } from "@/data/site";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Booking & referral disclosure",
  description:
    "How Visit Victoria Falls handles bookings, referrals, commissions and editorial independence.",
};

export default function DisclosurePage() {
  return (
    <>
      <PageHero
        eyebrow="Disclosure"
        title="How the commercial side works."
        sub="We are transparent about referrals, commissions and what we do not control. No small print required."
        image={images.sunsetGuide}
        imageAlt="A boat on the Zambezi at sunset"
        crumbs={[{ label: "Disclosure", href: "/disclosure" }]}
      />

      <section className="section">
        <div className="shell--narrow">
          <div className="prose" style={{ maxWidth: "100%" }}>
            <h2 style={{ marginTop: 0 }}>We do not take bookings or payments</h2>
            <p>
              Visit Victoria Falls is a discovery and referral platform. We do not process payments, hold
              availability, issue tickets or act as an agent. When you book with a provider, your contract
              is with that provider and their terms apply.
            </p>

            <h2>Referral links</h2>
            <p>
              Some links to providers or booking platforms may be referral links. If you click one and
              make a qualifying booking, we may earn a commission. This does not increase the price you
              pay, and it does not determine how we describe an experience.
            </p>
            <p>
              Where a link is a referral link, the destination site&rsquo;s own terms and privacy policy
              apply once you leave this site.
            </p>

            <h2>Editorial independence</h2>
            <ul>
              <li>Businesses cannot buy a better position in a listing or a more favourable description.</li>
              <li>We do not publish star ratings or review scores we cannot substantiate.</li>
              <li>We do not accept payment for a positive mention.</li>
              <li>If we introduce paid placements in future, they will be clearly labelled.</li>
            </ul>

            <h2>What we do not verify</h2>
            <p>
              We do not inspect every property, test every activity or audit every operator. Listings are
              editorial summaries based on information available to us. We do not guarantee safety,
              quality, availability or suitability for your circumstances. Follow the provider&rsquo;s
              safety instructions and satisfy yourself before booking.
            </p>

            <h2>Prices and availability</h2>
            <p>
              Prices and availability are set by providers and change frequently. We do not publish live
              prices. Always confirm the total cost, inclusions, cancellation terms and any park, border
              or service fees directly with the provider before paying.
            </p>

            <h2>Imagery</h2>
            <p>
              Destination and listing imagery is sourced from Visit Zimbabwe and partner listings and is
              used for destination representation. Copyright remains with the respective owners. If you
              believe an image is used incorrectly, contact us and we will review it.
            </p>

            <h2>Questions</h2>
            <p>
              If you want to know whether a specific link is a referral link, ask us before you book.
              We would rather answer the question than have you guess.
            </p>

            <div className="callout">
              <h3>Related pages</h3>
              <p>Read how we handle data, and the terms that apply to the site.</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="/privacy" className="btn btn--dark">Privacy policy</Link>
                <Link href="/terms" className="btn btn--ghost">Terms of use</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
