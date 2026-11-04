"use client";

import * as React from "react";
import styles from "./polaroid-line-carousel.module.css";

export default function PolaroidLineCarousel({
  slides = [],
  height = "540px",
  className,
  style,
  ariaLabel = "Image carousel",
}) {
  const trackRef = React.useRef(null);
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  const goTo = React.useCallback((index) => {
    if (!slides.length || !trackRef.current) return;
    const next = (index + slides.length) % slides.length;
    const track = trackRef.current;
    const card = track.children[next];
    if (!card) return;

    track.scrollTo({
      left: card.offsetLeft - track.offsetLeft - 8,
      behavior: "smooth",
    });
    setActive(next);
  }, [slides.length]);

  React.useEffect(() => {
    if (paused || slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActive((current) => {
        const next = (current + 1) % slides.length;
        const track = trackRef.current;
        const card = track?.children[next];

        if (track && card) {
          track.scrollTo({
            left: card.offsetLeft - track.offsetLeft - 8,
            behavior: "smooth",
          });
        }
        return next;
      });
    }, 3800);

    return () => window.clearInterval(timer);
  }, [paused, slides.length]);

  const pauseForInteraction = () => setPaused(true);
  const resumeAutoplay = () => setPaused(false);

  return (
    <div
      className={["pl-root", styles.root, className].filter(Boolean).join(" ")}
      style={{ height, ...style }}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onMouseEnter={pauseForInteraction}
      onMouseLeave={resumeAutoplay}
      onFocusCapture={pauseForInteraction}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) resumeAutoplay();
      }}
      onTouchStart={pauseForInteraction}
      onTouchEnd={() => {
        window.setTimeout(resumeAutoplay, 5000);
      }}
    >
      <div className="pl-rope" aria-hidden="true" />
      <div className={`pl-track ${styles.track}`} ref={trackRef}>
        {slides.map((slide, index) => (
          <a
            key={slide.title || index}
            href={slide.href || "#"}
            className={`pl-card ${styles.card} pl-card-${index % 6} ${active === index ? `is-active ${styles.cardActive}` : ""}`}
            aria-label={`Explore ${slide.title}`}
            onClick={() => setActive(index)}
          >
            <span className={`pl-peg ${styles.peg}`} aria-hidden="true"><i /></span>
            <span className={`pl-photo ${styles.photo}`}>
              {slide.image ? <img src={slide.image} alt={slide.alt || slide.title || ""} /> : null}
            </span>
            <span className={`pl-caption ${styles.caption}`}>
              <span className={`pl-card-title ${styles.cardTitle}`}>{slide.title}</span>
              <span className={`pl-card-caption ${styles.cardCaption}`}>{slide.caption}</span>
            </span>
          </a>
        ))}
      </div>

      <div className={`pl-controls ${styles.controls}`} aria-label="Carousel controls">
        <div className={`pl-glass-controls ${styles.glassControls}`}>
          <button type="button" className={`pl-arrow ${styles.arrow}`} onClick={() => goTo(active - 1)} aria-label="Previous category">←</button>
          <span className={`pl-progress ${styles.progress}`}>{String(active + 1).padStart(2, "0")} <i /> {String(slides.length).padStart(2, "0")}</span>
          <button type="button" className={`pl-arrow ${styles.arrow}`} onClick={() => goTo(active + 1)} aria-label="Next category">→</button>
        </div>
      </div>
    </div>
  );
}
