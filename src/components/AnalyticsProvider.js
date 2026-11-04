"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function send(payload) {
  const body = JSON.stringify(payload);
  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
      return;
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

export default function AnalyticsProvider() {
  const pathname = usePathname();

  useEffect(() => {
    send({ type: "page_view", path: pathname || "/" });
  }, [pathname]);

  useEffect(() => {
    function onClick(event) {
      const target = event.target instanceof Element ? event.target.closest("[data-track]") : null;
      if (!target) return;
      send({
        type: target.getAttribute("data-track"),
        label: target.getAttribute("data-track-label") || "",
        href: target.getAttribute("href") || "",
        path: window.location.pathname,
      });
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
