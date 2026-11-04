import Link from "next/link";
import { images, site } from "@/data/site";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Terms of use",
  description: "The terms that apply when you use Visit Victoria Falls.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Terms"
        title="The ground rules."
        sub="A short, readable set of terms for using this site. Last updated October 2026."
        image={images.bridge}
        imageAlt="The Victoria Falls Bridge"
        crumbs={[{ label: "Terms", href: "/terms" }]}
      />

      <section className="section">
        <div className="shell--narrow">
          <div className="prose" style={{ maxWidth: "100%" }}>
            <h2 style={{ marginTop: 0 }}>What this site is</h2>
            <p>
              Visit Victoria Falls is an informational website and destination directory. It is not a
              travel agency, booking platform or financial service. We do not process payments, hold
              reservations or act as an agent for any provider.
            </p>

            <h2>Information is a starting point</h2>
            <p>
              We aim to be accurate and to date our pages, but destination information changes. Opening
              hours, prices, availability, access rules, border requirements and conditions can change
              without notice. You are responsible for confirming the details that matter with the
              relevant provider, authority or official source before you travel or pay.
            </p>

            <h2>No booking contract</h2>
            <p>
              Nothing on this site creates a contract between you and Visit Victoria Falls for travel
              services. If you book with a provider, your agreement is with that provider, and their
              terms, cancellation policy and liability arrangements apply.
            </p>

            <h2>Third-party links</h2>
            <p>
              We link to external websites and providers for convenience. We do not control those sites
              and are not responsible for their content, availability, security or practices. A link is
              not an endorsement of every claim made on the destination site.
            </p>

            <h2>Acceptable use</h2>
            <ul>
              <li>Do not attempt to disrupt, scrape aggressively or gain unauthorised access to the site.</li>
              <li>Do not submit false, abusive or unlawful content through the forms.</li>
              <li>Do not use the site to send spam or to misrepresent your business.</li>
            </ul>

            <h2>Intellectual property</h2>
            <p>
              The editorial text, layout and original design of this site belong to Visit Victoria Falls.
              Third-party imagery remains the property of its respective owners and is used for
              destination representation. You may not reproduce substantial portions of the site for
              commercial use without permission.
            </p>

            <h2>Limitation of liability</h2>
            <p>
              To the extent permitted by applicable law, Visit Victoria Falls is not liable for loss or
              damage arising from reliance on information on this site, from travel arrangements made
              with third parties, or from interruptions to the site. Nothing in these terms limits rights
              you may have under consumer law that cannot be excluded.
            </p>

            <h2>Changes</h2>
            <p>
              We may update these terms as the site develops. The date at the top of the page shows the
              current version.
            </p>

            <div className="callout">
              <h3>Questions</h3>
              <p>Contact us if anything here is unclear, or read the booking and referral disclosure.</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="/disclosure" className="btn btn--dark">Booking disclosure</Link>
                <Link href="/contact?topic=Other" className="btn btn--ghost">Contact {site.name}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
