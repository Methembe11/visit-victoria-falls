import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { partnerProspects } from "@/lib/partner-referrals";
import { images } from "@/data/site";
import styles from "./partners.module.css";

export const metadata = {
  title: "Operator partnership programme",
  description: "A proposed referral partnership model for tourism operators in Victoria Falls, Zimbabwe.",
};

const steps = [
  { number: "01", title: "Be discovered", text: "Your business receives a dedicated profile with approved descriptions, images, services and contact details." },
  { number: "02", title: "Receive referrals", text: "Visitors follow a clear booking link from Visit Victoria Falls to your own website or booking platform." },
  { number: "03", title: "Track interest", text: "We record outbound referral clicks and share agreed reporting. A click is not treated as a confirmed booking." },
  { number: "04", title: "Agree the terms", text: "Any commission, tracking method and reporting arrangement is discussed and approved with you before activation." },
];

export default function PartnersPage() {
  const categories = [...new Set(partnerProspects.flatMap((item) => item.categories))];
  return (
    <>
      <PageHero
        eyebrow="For Victoria Falls operators"
        title="More ways to be found."
        sub="A proposed local discovery and referral platform connecting visitors with the businesses that make Victoria Falls worth experiencing."
        image={images.hero}
        imageAlt="Victoria Falls and the surrounding landscape"
        crumbs={[{ label: "For operators", href: "/partners" }]}
      />
      <section className={`section ${styles.intro}`}>
        <div className="shell">
          <Reveal className={styles.introGrid}>
            <div><span className="eyebrow">The idea</span><h2 className="h2">Your experience. A clearer path to the guest.</h2></div>
            <div>
              <p className={styles.lead}>Visit Victoria Falls is being developed as a destination-focused place to discover activities, tours, stays and local services.</p>
              <p>Rather than taking over your booking process, the platform is designed to introduce visitors to your business and send them to your own approved booking channel. You remain in control of your prices, availability, terms and customer booking.</p>
              <p className={styles.note}>This is a pre-launch partnership proposal. No operator shown on this page has been presented as a confirmed partner.</p>
            </div>
          </Reveal>
        </div>
      </section>
      <section className={`section ${styles.process}`}>
        <div className="shell">
          <div className="section-head"><div><span className="eyebrow">How it could work</span><h2 className="h2">A referral, not another booking system.</h2></div><p className="section-head__aside">Visitors discover your offering here, then complete their booking directly with you.</p></div>
          <div className={styles.steps}>
            {steps.map((step) => <article className={styles.step} key={step.number}><span className={styles.stepNumber}>{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}
          </div>
          <div className={styles.flow} aria-label="Referral journey"><span>Visitor discovers your listing</span><i aria-hidden="true">→</i><span>Clicks your approved booking link</span><i aria-hidden="true">→</i><span>Books directly with your business</span></div>
        </div>
      </section>
      <section className={`section ${styles.prospects}`}>
        <div className="shell">
          <div className={styles.directoryHead}><div><span className="eyebrow">Pre-launch outreach</span><h2 className="h2">Operators we would like to speak with.</h2></div><p>These businesses are included as prospective outreach contacts to illustrate the type of local operator the platform hopes to work with. Inclusion is not an endorsement or evidence of a relationship.</p></div>
          <div className={styles.categoryList}>
            {categories.map((category) => {
              const items = partnerProspects.filter((item) => item.categories.includes(category));
              return <div className={styles.category} key={category}>
                <div className={styles.categoryTitle}><h3>{category}</h3><span>{String(items.length).padStart(2, "0")}</span></div>
                <div className={styles.operatorGrid}>
                  {items.map((item) => <a className={styles.operator} key={item.id} href={item.website} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${item.name} official website (opens in a new tab)`}>
                    <div className={styles.operatorImage}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.imageAlt || item.name} loading="lazy" />
                      <span className={styles.status}>Prospective</span>
                      <span className={styles.visitLabel}>Visit website ↗</span>
                    </div>
                    <div className={styles.operatorBody}>
                      <h4>{item.name}</h4><p>Potential listing and referral partner</p>
                    </div>
                  </a>)}
                </div>
              </div>;
            })}
          </div>
          <p className={styles.disclaimer}>Prospective operators are listed for discussion only. No partnership, booking integration, commission rate or commercial arrangement is implied. Listings and links will only be activated with the operator’s approval.</p>
        </div>
      </section>
      <section className={`section ${styles.terms}`}>
        <div className="shell"><div className={styles.termsGrid}>
          <div><span className="eyebrow">Commercial approach</span><h2 className="h2">Clear terms. No surprises.</h2></div>
          <div><p>We would discuss the arrangement with each operator individually. If a referral commission is appropriate, its rate, attribution window, payment process and reporting would be agreed in writing before any booking link is activated.</p>
            <ul><li>Your business controls its own booking and payment process.</li><li>We do not claim that a referral click is a completed booking.</li><li>Only approved descriptions, images and booking links are published.</li><li>You can request corrections or removal of your listing.</li></ul>
            <Link href="/contact" className="btn btn--dark">Start a conversation</Link>
          </div>
        </div></div>
      </section>
    </>
  );
}
