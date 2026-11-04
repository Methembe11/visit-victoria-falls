import Link from "next/link";
import { faqs, images } from "@/data/site";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Frequently asked questions",
  description:
    "Answers to common questions about visiting Victoria Falls — bookings, prices, seasons, safety, borders and how this site works.",
};

export default function FaqPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHero
        eyebrow="Questions"
        title="The things people ask."
        sub="Bookings, prices, seasons, safety and how this site works. If your question is not here, ask us directly."
        image={images.themeNature}
        imageAlt="Nature around Victoria Falls"
        crumbs={[{ label: "FAQ", href: "/faq" }]}
      />

      <section className="section">
        <div className="shell article" style={{ gridTemplateColumns: "minmax(0, 0.3fr) minmax(0, 0.7fr)" }}>
          <aside className="article__aside">
            <div>
              <h2>Short answers</h2>
              <p className="micro" style={{ marginTop: 12, lineHeight: 1.7 }}>
                Last reviewed October 2026. If an answer changes materially, we update it.
              </p>
            </div>
            <div className="aside-card">
              <span className="eyebrow">Still unsure?</span>
              <h3>Ask us.</h3>
              <p>Send a genuine planning question and we will answer if we can.</p>
              <Link href="/contact?topic=Trip%20planning" className="btn btn--solid">Contact us</Link>
            </div>
          </aside>

          <div>
            <Reveal className="faq">
              {faqs.map((faq, index) => (
                <details key={faq.q} open={index === 0}>
                  <summary>{faq.q}</summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </Reveal>

            <Reveal className="callout" style={{ marginTop: 48 }}>
              <h3>About prices</h3>
              <p>
                We do not publish prices we cannot verify. Where a rate matters to your decision,
                contact the provider directly and ask for the total cost, what it includes and the
                cancellation policy.
              </p>
              <Link href="/disclosure" className="link-arrow">Read the booking disclosure</Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
