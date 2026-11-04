"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const starters = [
  "What should I do in Victoria Falls?",
  "Help me plan a 3-day visit",
  "Where can I stay?",
];

export default function AiConcierge() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello, welcome to Victoria Falls. I can help you discover experiences, places to stay, restaurants and practical travel information. What would you like to know?" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      inputRef.current?.focus();
    }
  }, [open, messages, loading]);

  async function send(text = message) {
    const clean = text.trim();
    if (!clean || loading) return;
    const next = [...messages, { role: "user", content: clean }];
    setMessages(next);
    setMessage("");
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: clean, history: next.slice(0, -1).slice(-10) }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "I couldn't answer just now. Please try again.");
      setMessages((current) => [...current, {
        role: "assistant",
        content: data.reply,
        recommendations: data.recommendations || [],
        citations: data.citations || [],
        generatedBy: data.generatedBy || "openai-web",
      }]);
    } catch (err) {
      setError(err.message || "Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="ai-concierge">
      {open && (
        <section className="ai-concierge__panel" aria-label="AI travel concierge">
          <header className="ai-concierge__header">
            <div className="ai-concierge__identity">
              <span className="ai-concierge__orb" aria-hidden="true">✳</span>
              <div><strong>Victoria Falls Concierge</strong><small>Your local travel companion</small></div>
            </div>
            <button type="button" className="ai-concierge__close" onClick={() => setOpen(false)} aria-label="Close concierge">×</button>
          </header>
          <div className="ai-concierge__messages" aria-live="polite">
            {messages.map((item, index) => (
              <div className={`ai-concierge__message ai-concierge__message--${item.role}`} key={index}>
                <p>{item.content}</p>
                {item.role === "assistant" && item.generatedBy === "local-knowledge" && (
                  <small className="ai-concierge__answer-source">From the Visit Victoria Falls destination guide</small>
                )}
                {item.role === "assistant" && item.generatedBy === "local-fallback" && (
                  <small className="ai-concierge__answer-source">Local guidance · live AI research temporarily unavailable</small>
                )}
                {item.role === "assistant" && item.generatedBy === "openai-web" && (
                  <small className="ai-concierge__answer-source">AI-assisted response</small>
                )}
                {item.citations?.length > 0 && (
                  <div className="ai-concierge__citations">
                    <small>Sources</small>
                    {item.citations.map((source) => (
                      <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.title} ↗</a>
                    ))}
                  </div>
                )}
                {item.recommendations?.length > 0 && (
                  <div className="ai-concierge__recommendations">
                    {item.recommendations.map((rec) => (
                      <Link key={rec.href} href={rec.href} onClick={() => setOpen(false)}>
                        <span>{rec.title}</span><span aria-hidden="true">↗</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {messages.length === 1 && (
              <div className="ai-concierge__starters">
                {starters.map((starter) => <button key={starter} type="button" onClick={() => send(starter)}>{starter}</button>)}
              </div>
            )}
            {loading && <div className="ai-concierge__typing">Finding a helpful answer…</div>}
            {error && <p className="ai-concierge__error" role="alert">{error}</p>}
            <div ref={endRef} />
          </div>
          <form className="ai-concierge__composer" onSubmit={(event) => { event.preventDefault(); send(); }}>
            <label className="visually-hidden" htmlFor="concierge-message">Ask the concierge</label>
            <input id="concierge-message" ref={inputRef} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Ask about Victoria Falls…" maxLength={1200} />
            <button type="submit" disabled={loading || !message.trim()} aria-label="Send message">↑</button>
          </form>
          <p className="ai-concierge__disclaimer">AI guidance, not a booking service. Confirm details with providers.</p>
        </section>
      )}
      <button className={`ai-concierge__launcher${open ? " is-open" : ""}`} type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? "Close travel concierge" : "Open travel concierge"}>
        <span aria-hidden="true">{open ? "×" : "✳"}</span>
        {!open && <span className="ai-concierge__launcher-label">Ask our concierge</span>}
      </button>
    </div>
  );
}
