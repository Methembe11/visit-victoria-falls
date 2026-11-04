import Link from "next/link";

const steps = [
  { number: "01", label: "Plan your arrival", title: "Travel", text: "Flights, transfers, borders and getting around.", href: "/travel", action: "Plan your journey" },
  { number: "02", label: "Choose your base", title: "Stay", text: "Compare places to stay and contact the property.", href: "/places-to-stay", action: "Find accommodation" },
  { number: "03", label: "Shape your days", title: "Experiences", text: "Explore activities, tours, nature and culture.", href: "/things-to-do", action: "Find things to do" },
  { number: "04", label: "Find a table", title: "Eat", text: "Discover cafés, local favourites and dining.", href: "/restaurants", action: "Explore restaurants" },
  { number: "05", label: "Follow your interests", title: "Your style", text: "Build a trip around what you enjoy.", href: "/interests", action: "Explore interests" },
  { number: "06", label: "Bring it together", title: "Trip planner", text: "Turn your ideas into a suggested itinerary.", href: "/plan", action: "Plan your trip" },
];

export default function JourneyPathways({ current }) {
  return (
    <section className="section section--sage" aria-labelledby="journey-pathways-title">
      <div className="shell">
        <div className="section-head">
          <div><span className="eyebrow">Your Victoria Falls trip</span><h2 id="journey-pathways-title" className="section-head__title">Everything connects from here.</h2></div>
          <div className="section-head__aside"><p>Start wherever you are. Move between travel, stays, experiences and dining, then bring your choices together in the trip planner.</p></div>
        </div>
        <div className="grid grid--3">
          {steps.filter((step) => step.title !== current).map((step) => (
            <Link className="card" href={step.href} key={step.number} style={{ borderTop: "1px solid var(--hairline)", paddingTop: 20 }}>
              <div className="card__body">
                <div className="card__meta"><span>{step.number} · {step.label}</span></div>
                <h3 className="card__title">{step.title}</h3>
                <p className="card__excerpt">{step.text}</p>
                <div className="card__foot"><span>{step.action}</span><span className="arrow-circle" aria-hidden="true">↗</span></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
