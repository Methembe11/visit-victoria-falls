import Link from "next/link";
import { images } from "@/data/site";
import PageHero from "@/components/PageHero";
import EnquiryForm from "@/components/EnquiryForm";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "List your business",
  description:
    "Submit a lodge, restaurant, experience or local business for consideration in the Visit Victoria Falls directory.",
};

export default function ListYourBusinessPage() {
  return (
    <>
      <PageHero
        eyebrow="For businesses"
        title="Put your business on the map."
        sub="We are building a directory that local operators can correct and maintain. Inclusion is editorial, not paid."
        image={images.restaurantBeachHouse}
        imageAlt="A hospitality business in Victoria Falls"
        crumbs={[{ label: "List your business", href: "/list-your-business" }]}
      />

      <section className="section">
        <div className="shell contact-grid">
          <Reveal className="contact-grid__aside">
            <span className="eyebrow">What we look for</span>
            <h2>A useful listing, not a brochure.</h2>
            <p>
              We want to describe what you actually offer, who it suits and what a guest should confirm
              before booking. Accurate, specific information performs better than marketing language.
            </p>
            <ul className="split__list">
              <li>Business name, category and location</li>
              <li>A short, factual description of what you offer</li>
              <li>Who the experience or property suits</li>
              <li>Any seasonal or access limitations</li>
              <li>A public website or booking page we can check</li>
            </ul>
            <p>
              We do not guarantee inclusion. We do not publish unverifiable claims, star ratings or
              prices we cannot confirm. Community and cultural listings are free.
            </p>
            <div className="callout">
              <h3>Already listed?</h3>
              <p>
                Use the same form to request a correction. Include the page URL and the specific change.
                We will review it against a source we can check.
              </p>
              <Link href="/businesses" className="link-arrow">See the current directory</Link>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="planner__panel">
              <div className="panel__head">
                <h3>Business enquiry</h3>
                <span>Reviewed manually</span>
              </div>
              <EnquiryForm defaultTopic="List my business" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
