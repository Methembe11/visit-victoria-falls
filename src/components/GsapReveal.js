"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GsapReveal() {
  useEffect(() => {
    document.querySelectorAll(".reveal").forEach((node) => {
      const delay = parseFloat(node.style.getPropertyValue("--reveal-delay") || 0) / 1000;
      gsap.fromTo(
        node,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: node,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
    document.querySelectorAll('[data-animate]').forEach((node) => {
      const delay = parseFloat(node.getAttribute("data-delay") || 0) / 1000;
      gsap.fromTo(
        node,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: node,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay,
        }
      );
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);
  return null;
}
