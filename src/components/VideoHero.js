"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./VideoHero.module.css";

export default function VideoHero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const frameRef = useRef(0);
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

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || reducedMotion || mobile) {
      section?.style.setProperty("--hero-progress", "0");
      return undefined;
    }

    let lastProgress = -1;
    const updateFrame = () => {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        const distance = section.offsetHeight - window.innerHeight;
        const progress = distance > 0
          ? Math.min(1, Math.max(0, -section.getBoundingClientRect().top / distance))
          : 0;
        section.style.setProperty("--hero-progress", String(progress));

        if (video && Number.isFinite(video.duration) && video.duration > 0 && Math.abs(progress - lastProgress) > 0.002) {
          lastProgress = progress;
          try {
            const targetTime = progress * video.duration;
            if (Math.abs(video.currentTime - targetTime) > 0.08) video.currentTime = targetTime;
          } catch {
            // Seeking is not available until the browser has loaded video metadata.
          }
        }
      });
    };

    window.addEventListener("scroll", updateFrame, { passive: true });
    window.addEventListener("resize", updateFrame);
    video?.addEventListener("loadedmetadata", updateFrame);
    updateFrame();
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("scroll", updateFrame);
      window.removeEventListener("resize", updateFrame);
      video?.removeEventListener("loadedmetadata", updateFrame);
    };
  }, [reducedMotion, mobile]);

  return (
    <section ref={sectionRef} className={styles.scrollSection} aria-label="Discover Victoria Falls">
      <div className={styles.stickyFrame}>
        {!reducedMotion && (
          <video
            ref={videoRef}
            className={styles.video}
            src="/hero-video.mp4"
            poster="/hero-poster.jpg"
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        )}
        <div className={styles.scrim} />
        <div className={styles.content}>
          <p className={styles.eyebrow}>Zimbabwe · Africa</p>
          <h1 className={styles.title}>
            Where the world<br />
            <em>comes to feel</em><br />
            something.
          </h1>
          <p className={styles.description}>
            Discover the wonder of Victoria Falls — from the rainforest and the river
            to unforgettable experiences on either side of the gorge.
          </p>
          <form className={styles.search} action="/search" method="get" role="search">
            <label className={styles.searchLabel} htmlFor="hero-destination-search">Find your Victoria Falls</label>
            <div className={styles.searchControls}>
              <input
                id="hero-destination-search"
                type="search"
                name="q"
                placeholder="Try helicopter flights, lodges, sunset cruises…"
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
        <div className={styles.bottomLine}>
          <span>17°55′ S&nbsp;&nbsp; 25°51′ E</span>
          <span className={styles.scrollCue}><i /> {mobile || reducedMotion ? "Explore below" : "Scroll to discover"}</span>
          <span>Victoria Falls · Zimbabwe</span>
        </div>
      </div>
    </section>
  );
}
