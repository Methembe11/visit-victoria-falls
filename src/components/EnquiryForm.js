"use client";

import { useState } from "react";

const topics = [
  "Trip planning",
  "Things to do",
  "Accommodation",
  "Restaurant",
  "Partnership",
  "List my business",
  "Website feedback",
  "Other",
];

export default function EnquiryForm({ defaultTopic = "Trip planning", listing = "" }) {
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      topic: data.get("topic"),
      message: data.get("message"),
      consent: data.get("consent") === "on",
      listing: data.get("listing") || "",
      website: data.get("website") || "",
    };

    setStatus("loading");
    setErrors({});
    setFormError("");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) {
        setErrors(result.errors || {});
        setFormError(result.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("done");
      form.reset();
    } catch {
      setFormError("We could not reach the server. Please try again or email us directly.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="enquiry-success" role="status">
        <span className="eyebrow">Enquiry received</span>
        <h3 style={{ marginTop: 16 }}>Thank you — your message is with us.</h3>
        <p className="muted">
          We read every enquiry and reply to genuine trip-planning questions where we can. We cannot confirm
          availability, hold bookings, or quote provider prices. For anything time-sensitive, contact the
          provider or booking platform directly.
        </p>
        <button type="button" className="btn btn--ghost" onClick={() => setStatus("idle")} style={{ marginTop: 24 }}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <input type="hidden" name="listing" value={listing} />
      <div className="field" aria-hidden="true" style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }}>
        <label htmlFor="enquiry-website">Website</label>
        <input id="enquiry-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form__row">
        <div className="field">
          <label htmlFor="enquiry-name">Your name</label>
          <input
            id="enquiry-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "enquiry-name-error" : undefined}
          />
          {errors.name && <p className="field__error" id="enquiry-name-error">{errors.name}</p>}
        </div>
        <div className="field">
          <label htmlFor="enquiry-email">Email address</label>
          <input
            id="enquiry-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "enquiry-email-error" : undefined}
          />
          {errors.email && <p className="field__error" id="enquiry-email-error">{errors.email}</p>}
        </div>
      </div>

      <div className="field">
        <label htmlFor="enquiry-topic">What is this about?</label>
        <select id="enquiry-topic" name="topic" defaultValue={defaultTopic}>
          {topics.map((topic) => (
            <option key={topic} value={topic}>{topic}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="enquiry-message">Your message</label>
        <textarea
          id="enquiry-message"
          name="message"
          rows={6}
          required
          placeholder="Share your dates, who is travelling, and what you would like help with."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "enquiry-message-error" : "enquiry-message-help"}
        />
        <p className="form__note" id="enquiry-message-help">
          Please do not include card details or other sensitive information.
        </p>
        {errors.message && <p className="field__error" id="enquiry-message-error">{errors.message}</p>}
      </div>

      <div className="field">
        <label htmlFor="enquiry-consent" style={{ display: "flex", gap: 10, alignItems: "flex-start", textTransform: "none", letterSpacing: 0, fontSize: 14 }}>
          <input id="enquiry-consent" name="consent" type="checkbox" style={{ width: 16, height: 16, marginTop: 3 }} />
          <span>I agree that Visit Victoria Falls may reply to this enquiry by email.</span>
        </label>
        {errors.consent && <p className="field__error">{errors.consent}</p>}
      </div>

      {formError && <p className="field__error" role="alert">{formError}</p>}

      <div className="form__actions">
        <button type="submit" className="btn btn--solid" disabled={status === "loading"} data-track="enquiry_submit">
          {status === "loading" ? (
            <>
              <span className="spinner" aria-hidden="true" /> Sending
            </>
          ) : (
            "Send enquiry"
          )}
        </button>
        <span className="form__note">We reply to genuine enquiries where we can. We cannot confirm bookings.</span>
      </div>
    </form>
  );
}
