import Link from "next/link";
import { getApprovedReferral, partnerProspects } from "@/lib/partner-referrals";

export default function ReferralPanel({ type, slug, name, enquiryHref, plannerHref }) {
  const partner = getApprovedReferral(type, slug);
  const prospects = type === "experience" ? partnerProspects.filter((item) => item.status === "prospect") : [];
  const isDining = type === "dining";
  return (
    <div className="callout" style={{ marginBottom: 18 }}>
      <span className="eyebrow">{partner ? "Provider booking" : "Booking with local providers"}</span>
      <h3>{partner ? "Continue with " + partner.providerName : isDining ? "Reserve directly with the restaurant." : "Find and book with the operator."}</h3>
      {partner ? (
        <>
          <p>You will complete your booking and payment directly with {partner.providerName}. Their prices, availability and booking terms apply.</p>
          <Link href={"/api/referral?type=" + type + "&slug=" + encodeURIComponent(slug)} className="btn btn--solid" target="_blank" rel="noopener noreferrer">Book with {partner.providerName}</Link>
        </>
      ) : (
        <>
          <p>{isDining ? "Choose the enquiry option to ask about a table. The restaurant will need to confirm its availability, booking process and any deposit directly with you. As venues approve online reservation links, those will appear here." : "We are preparing direct booking referrals with local providers. Once an operator has agreed to participate, their approved booking link will appear here."}</p>
          {prospects.length > 0 && (
            <div style={{ margin: "16px 0" }}>
              <span className="eyebrow">Operators we plan to approach</span>
              <ul style={{ margin: "10px 0 0", paddingLeft: 20 }}>
                {prospects.map((item) => <li key={item.id}>{item.name} <span className="micro">— prospective partner; not yet confirmed</span></li>)}
              </ul>
            </div>
          )}
          <Link href={enquiryHref} className="btn btn--solid">{isDining ? "Enquire about a table" : "Ask about " + name}</Link>
          {plannerHref && <Link href={plannerHref} className="btn btn--ghost">Add to your trip plan</Link>}
        </>
      )}
      <p className="micro" style={{ marginBottom: 0 }}>Visit Victoria Falls does not take payment or confirm reservations. Any booking is completed and confirmed by the venue or provider. We only earn a referral commission where a provider has agreed to the arrangement.</p>
    </div>
  );
}
