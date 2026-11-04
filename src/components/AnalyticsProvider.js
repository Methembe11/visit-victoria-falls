"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function send(payload) {
  const body = JSON.stringify(payload);
  try {
    if (navigator.sendBeacon) {
      const queued = navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
      if (queued) return;
    }
  } catch {
    /* fall through to fetch */
  }
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

export function trackEvent(type, details = {}) {
  if (typeof window === "undefined") return;
  send({
    type,
    label: details.label || "",
    href: details.href || "",
    path: details.path || window.location.pathname,
  });
}

export default function AnalyticsProvider() {
  const pathname = usePathname();
  const lastTrackedPath = useRef("");

  useEffect(() => {
    const path = pathname || "/";
    // Avoid duplicate page_view events from React Strict Mode effect replay.
    if (lastTrackedPath.current === path) return;
    lastTrackedPath.current = path;
    trackEvent("page_view", { path });
  }, [pathname]);

  useEffect(() => {
    function onClick(event) {
      const target = event.target instanceof Element ? event.target.closest("[data-track]") : null;
      if (!target) return;
      trackEvent(target.getAttribute("data-track"), {
        label: target.getAttribute("data-track-label") || "",
        href: target.getAttribute("href") || "",
      });
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
