"use client";

import * as React from "react";

export default function PolaroidLineCarousel({
  slides = [],
  height = "80vh",
  className,
  style,
  ariaLabel = "Image carousel",
}) {
  const [active, setActive] = React.useState(0);
  return (
    <div
      className={["pl-root", className].filter(Boolean).join(" ")}
      style={{ height, ...style, position: "relative", overflow: "hidden", background: "#F5F1E8" }}
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
    >
      <div style={{ display: "flex", gap: 24, padding: "3rem 2rem", overflowX: "auto", alignItems: "flex-end", height: "100%" }}>
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={s.title || "Slide " + i}
            style={{
              flex: "0 0 300px",
              background: "#fbfaf7",
              padding: 10,
              border: i === active ? "2px solid #263F32" : "1px solid #D4C3A9",
              boxShadow: "0 18px 30px -16px rgba(0,0,0,.4)",
              textAlign: "left",
              cursor: "pointer",
              borderRadius: 2,
            }}
          >
            {s.image ? (
              <img src={s.image} alt={s.alt || s.title || ""} style={{ width: "100%", aspectRatio: 1, objectFit: "cover", display: "block" }} />
            ) : (
              <div style={{ width: "100%", aspectRatio: 1, background: "#e3c9a1" }} />
            )}
            <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 18, marginTop: 8, color: "#161513" }}>
              {s.title}
            </div>
            <div style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, color: "#263F32", marginTop: 4 }}>
              {s.caption}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
