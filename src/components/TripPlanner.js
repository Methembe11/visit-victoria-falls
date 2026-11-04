"use client";

import { useState } from "react";
import Link from "next/link";

const interestOptions = [
  "Adventure",
  "Wildlife",
  "Nature",
  "Culture",
  "Food",
  "Family",
  "Relaxation",
  "Luxury",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function TripPlanner() {
  const [interests, setInterests] = useState(["Nature", "Wildlife"]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [plan, setPlan] = useState(null);

  function toggleInterest(value) {
    setInterests((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    );
  }

  async function onSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      month: form.get("month"),
      days: Number(form.get("days")),
      budget: form.get("budget"),
      group: form.get("group"),
      interests,
    };

    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setPlan(data.plan);
      setStatus("done");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "done" && plan) {
    return (
      <div className="plan-result" aria-live="polite">
        <div className="panel__head">
          <h3>{plan.title}</h3>
          <span>{plan.days.length} days</span>
        </div>
        <p className="small muted" style={{ marginTop: -8 }}>{plan.summary}</p>

        {plan.days.map((day) => (
          <div className="plan-day" key={day.day}>
            <div className="plan-day__label">
              <span>Day</span>
              <strong>{String(day.day).padStart(2, "0")}</strong>
            </div>
            <div className="plan-day__body">
              <h4>{day.title}</h4>
              <ul>
                {day.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        <p className="plan-note">
          {plan.notes} This itinerary is a suggestion, not a confirmed booking. Check prices, availability,
          access and safety requirements with each provider before you commit.
        </p>

        <div className="form__actions">
          <button type="button" className="btn btn--solid" onClick={() => { setStatus("idle"); setPlan(null); }}>
            Plan another trip
          </button>
          <Link href="/things-to-do" className="btn btn--ghost">Browse experiences</Link>
        </div>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} aria-describedby="planner-note">
      <div className="form__row">
        <div className="field">
          <label htmlFor="planner-month">When are you visiting?</label>
          <select id="planner-month" name="month" defaultValue="September">
            {months.map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="planner-days">How long will you stay?</label>
          <select id="planner-days" name="days" defaultValue="3">
            {[1, 2, 3, 4, 5, 6, 7, 10].map((days) => (
              <option key={days} value={days}>
                {days} {days === 1 ? "day" : "days"}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form__row">
        <div className="field">
          <label htmlFor="planner-budget">Approximate budget</label>
          <select id="planner-budget" name="budget" defaultValue="Mid-range">
            <option>Budget</option>
            <option>Mid-range</option>
            <option>Comfort</option>
            <option>Luxury</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="planner-group">Who are you travelling with?</label>
          <select id="planner-group" name="group" defaultValue="Couple">
            <option>Solo</option>
            <option>Couple</option>
            <option>Family</option>
            <option>Friends</option>
          </select>
        </div>
      </div>

      <fieldset className="field" style={{ border: 0 }}>
        <legend style={{ marginBottom: 10, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, color: "var(--muted-strong)" }}>
          What would you most like to experience?
        </legend>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {interestOptions.map((interest) => {
            const active = interests.includes(interest);
            return (
              <button
                type="button"
                key={interest}
                className="chip"
                aria-pressed={active}
                onClick={() => toggleInterest(interest)}
              >
                {interest}
              </button>
            );
          })}
        </div>
      </fieldset>

      <p className="form__note" id="planner-note">
        AI-generated itineraries are suggestions, not confirmed bookings. We do not check live availability or
        prices. Check important details with the relevant providers.
      </p>

      {status === "error" && (
        <p className="field__error" role="alert">{error}</p>
      )}

      <div className="form__actions">
        <button type="submit" className="btn btn--solid" disabled={status === "loading"} data-track="plan_submit">
          {status === "loading" ? (
            <>
              <span className="spinner" aria-hidden="true" /> Building your itinerary
            </>
          ) : (
            "Create my itinerary"
          )}
        </button>
        <span className="form__note" aria-live="polite">
          {status === "loading" ? "This usually takes a few seconds." : "No account needed."}
        </span>
      </div>
    </form>
  );
}
