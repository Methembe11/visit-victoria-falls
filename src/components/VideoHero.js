"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./VideoHero.module.css";

export default function VideoHero() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 700px)");
    const updatePreferences = () => {
      setReducedMotion(motionQuery.matches);
      setMobile(mobileQuery.matches);
    };
    updatePreferences();
    motionQuery.addEventListener("change", updatePreferences);
    mobileQuery.addEventListener("change", updatePreferences);
    return () => {
      motionQuery.removeEventListener("change", updatePreferences);
      mobileQuery.removeEventListener("change", updatePreferences);
    };
  }, []);

  return (
    <section className={`${styles.scrollSection} homepage-hero`} aria-label="Discover Victoria Falls">
      <div className={styles.stickyFrame}>
        {!reducedMotion && (
          <video
            className={styles.video}
            src="https://ik.imagekit.io/mkhize/Beneath%20Final%20Hero%20Video.mp4?updatedAt=1792481574354"
            muted
            playsInline
            autoPlay
            loop
            preload="auto"
            aria-hidden="true"
          />
        )}
        <div className={styles.content}>
          <p className={styles.eyebrow}>Zimbabwe - Africa</p>
          <h1 className={styles.title}>
            Where the world<br />
            <em>comes to feel</em><br />
            something.
          </h1>
          <p className={styles.description}>
            Discover the wonder of Victoria Falls - from the rainforest and the river
            to unforgettable experiences on either side of the gorge.
          </p>
          <form className={styles.search} action="/search" method="get" role="search">
            <label className={styles.searchLabel} htmlFor="hero-destination-search">Find your Victoria Falls</label>
            <div className={styles.searchControls}>
              <input
                id="hero-destination-search"
                type="search"
                name="q"
                placeholder="Try helicopter flights, lodges, sunset cruises..."
                autoComplete="off"
              />
              <button type="submit" aria-label="Search Victoria Falls">Search <span aria-hidden="true">↗</span></button>
            </div>
          </form>
          <div className={styles.actions}>
            <Link href="/things-to-do" className={styles.primary}>Explore experiences <span aria-hidden="true">↗</span></Link>
            <Link href="/places-to-stay" className={styles.secondary}>Find a place to stay</Link>
          </div>
        </div>

        <aside className={styles.weatherCard} aria-label="Victoria Falls weather">
          <p className={styles.weatherLocation}>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M13 6.7c0 3.6-5 7.3-5 7.3S3 10.3 3 6.7a5 5 0 1 1 10 0Z" />
              <circle cx="8" cy="6.5" r="1.6" />
            </svg>
            <span>Victoria Falls, Zimbabwe</span>
          </p>
          <div className={styles.weatherCurrent}>
            <span className={styles.weatherTemperature}>28°</span>
            <div className={styles.weatherCondition}>
              <span>Partly cloudy</span>
              <small>Feels like 30°</small>
            </div>
          </div>
          <div className={styles.weatherDetails}>
            <div className={styles.weatherMetric}>
              <span>High / Low</span>
              <strong>31° / 20°</strong>
            </div>
            <div className={styles.weatherMetric}>
              <span>Humidity</span>
              <strong>62%</strong>
            </div>
            <div className={styles.weatherMetric}>
              <span>Wind</span>
              <strong>12 km/h</strong>
            </div>
          </div>
        </aside>

        <div className={styles.bottomLine}>
          <span>17 55 S&nbsp;&nbsp; 25 51 E</span>
          <span className={styles.scrollCue}><i /> {mobile || reducedMotion ? "Explore below" : "Scroll to discover"}</span>
          <span>Victoria Falls - Zimbabwe</span>
        </div>
      </div>
    </section>
  );
}
