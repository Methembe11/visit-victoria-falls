import Link from "next/link";
import { site } from "@/data/site";

const columns = [
  {
    title: "Explore",
    links: [
      ["Things to do", "/things-to-do"],
      ["Accommodation", "/places-to-stay"],
      ["Restaurants", "/restaurants"],
      ["Local businesses", "/businesses"],
      ["Places & attractions", "/landmarks"],
    ],
  },
  {
    title: "Plan",
    links: [
      ["Travel guides", "/guides"],
      ["Getting here", "/travel#getting-here"],
      ["Getting around", "/travel#getting-around"],
      ["Itineraries", "/itineraries"],
      ["AI trip planner", "/plan"],
      ["Frequently asked questions", "/faq"],
    ],
  },
  {
    title: "For businesses",
    links: [
      ["Enquire about being listed", "/list-your-business"],
      ["Partnership enquiries", "/contact?topic=Partnership"],
      ["Contact us", "/contact"],
    ],
  },
  {
    title: "Information",
    links: [
      ["About us", "/about"],
      ["Privacy policy", "/privacy"],
      ["Terms of use", "/terms"],
      ["Booking & referral disclosure", "/disclosure"],
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer__top">
          <div className="footer__brand">
            <Link href="/" className="wordmark">
              Visit Victoria Falls
              <small>Zimbabwe · Africa</small>
            </Link>
            <p>
              A destination-focused guide to experiences, places to stay, local businesses and travel
              information for Victoria Falls, Zimbabwe.
            </p>
            <a className="footer__email" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </div>

          {columns.map((column) => (
            <div className="footer__col" key={column.title}>
              <h3 className="footer__col-title">{column.title}</h3>
              <ul>
                {column.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer__word" aria-hidden="true">
          Victoria Falls
        </div>

        <div className="footer__bottom">
          <p>
            <strong>How this platform works.</strong> Visit Victoria Falls is a destination discovery and
            booking referral platform. We do not process payments or hold bookings. Some links may earn us a
            commission if you make a qualifying booking, where applicable; this does not increase your price.
            Booking terms, availability and final prices are determined by the relevant provider or booking
            platform.
          </p>
          <p>
            Imagery is used for demonstration and destination representation, sourced from Visit Zimbabwe and
            partner listings. Copyright remains with the respective owners. Information is reviewed periodically;
            confirm prices, availability and access details directly with the provider. Last site review:{" "}
            {site.lastReviewed}.
          </p>
          <div className="footer__legal">
            <span>© {new Date().getFullYear()} Visit Victoria Falls. All rights reserved.</span>
            <span>
              <Link href="/contact">Contact</Link> · <Link href="/disclosure">Disclosure</Link> ·{" "}
              <Link href="/privacy">Privacy</Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
