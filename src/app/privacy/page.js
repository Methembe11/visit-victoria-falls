import Link from "next/link";
import { images, site } from "@/data/site";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Privacy policy",
  description:
    "How Visit Victoria Falls handles enquiry data, analytics events and your privacy.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="What we collect, and why."
        sub="A plain-language summary of the data this site handles. Last updated October 2026."
        image={images.fallsCity}
        imageAlt="Victoria Falls town"
        crumbs={[{ label: "Privacy", href: "/privacy" }]}
      />

      <section className="section">
        <div className="shell--narrow">
          <div className="prose" style={{ maxWidth: "100%" }}>
            <h2 style={{ marginTop: 0 }}>The short version</h2>
            <p>
              We collect the information you choose to send us through the enquiry form, and basic
              interaction events that help us understand which pages and listings are useful. We do not
              sell personal data. We do not require an account to use the site or the trip planner.
            </p>

            <h2>Information you provide</h2>
            <p>
              When you submit the contact form, we store your name, email address, topic, message and the
              listing you were viewing, if applicable. We also record the time of submission and a
              truncated browser user-agent string for abuse prevention.
            </p>
            <p>
              Please do not send passport numbers, card details, medical information or other sensitive
              personal data through the form.
            </p>

            <h2>Analytics events</h2>
            <p>
              We record simple events such as page views and clicks on listing links. These events
              include the page path, an optional label, a link target and a timestamp. They are not
              linked to your name or email address, and we do not use advertising cookies or third-party
              tracking pixels.
            </p>

            <h2>How we use it</h2>
            <ul>
              <li>To reply to genuine enquiries where we can.</li>
              <li>To understand which pages and listings visitors find useful.</li>
              <li>To detect spam, abuse and technical problems.</li>
              <li>To maintain and improve the directory.</li>
            </ul>

            <h2>Storage and retention</h2>
            <p>
              Enquiries and analytics events are stored in files on the server that runs this site. Access
              is limited to the people who operate the site. We keep enquiries for as long as needed to
              handle the conversation, then delete or anonymise them. Analytics events are retained in
              aggregate for a limited period.
            </p>

            <h2>Sharing</h2>
            <p>
              We do not sell your data. We may share information if required by law, or with service
              providers who help us host and operate the site, under appropriate confidentiality
              arrangements. We do not send your enquiry details to the AI model used by the trip planner;
              only the planning preferences you enter are used.
            </p>

            <h2>Your choices</h2>
            <p>
              You can ask us to access, correct or delete the enquiry information we hold about you. Use
              the contact form and describe your request. We may need to verify that the request is
              genuine before acting on it.
            </p>

            <h2>Children</h2>
            <p>
              This site is intended for people planning travel. We do not knowingly collect personal
              information from children. If you believe a child has submitted information, contact us and
              we will remove it.
            </p>

            <h2>Changes</h2>
            <p>
              If this policy changes materially, we will update the date at the top of the page. The
              current version always applies to the site as it operates at the time.
            </p>

            <div className="callout">
              <h3>Questions about privacy</h3>
              <p>
                Email {site.email} or use the contact form. For general information about how the site
                works, see the about page.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="/contact?topic=Other" className="btn btn--dark">Contact us</Link>
                <Link href="/terms" className="btn btn--ghost">Terms of use</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
