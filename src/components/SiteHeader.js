"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { nav } from "@/data/site";

function Icon({ name }) {
  if (name === "search") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.34-4.34" />
      </svg>
    );
  }
  if (name === "mail") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m22 7-8.99 5.73a2 2 0 0 1-2.01 0L2 7" />
        <rect x="2" y="4" width="20" height="16" rx="2" />
      </svg>
    );
  }
  if (name === "chevron") {
    return (
      <svg className="nav__chev" viewBox="0 0 24 24" aria-hidden="true">
        <path d="m6 9 6 6 6-6" />
      </svg>
    );
  }
  if (name === "close") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export default function SiteHeader() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef(null);
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);

  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpenMenu(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    let frame = 0;

    function update() {
      frame = 0;
      setScrolled(window.scrollY > 24);
    }

    function onScroll() {
      if (frame) return;
      frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const previouslyFocused = document.activeElement;
    closeRef.current?.focus();

    function onKey(event) {
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [mobileOpen]);

  useEffect(() => {
    function onKey(event) {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function open(i) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(i);
  }

  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 160);
  }

  const active = openMenu === null ? null : nav[openMenu];

  return (
    <>
      <header
        className={`site-header${scrolled ? " is-scrolled" : ""}`}
        onMouseLeave={scheduleClose}
      >
        <div className="shell header__bar">
          <Link href="/" className="wordmark" aria-label="Visit Victoria Falls — home">
            <Image
              src="/visit-victoria-falls-logo.png"
              alt="Visit Victoria Falls"
              width={150}
              height={100}
              priority
              style={{ width: 156, height: 72, objectFit: "contain" }}
            />
          </Link>

          <nav
            className="nav"
            aria-label="Primary"
            onMouseEnter={() => closeTimer.current && clearTimeout(closeTimer.current)}
          >
            {nav.map((item, i) => (
              <div
                key={item.label}
                className={`nav__item${openMenu === i ? " is-open" : ""}`}
                onMouseEnter={() => (item.plain ? setOpenMenu(null) : open(i))}
                onFocus={() => (item.plain ? setOpenMenu(null) : open(i))}
              >
                <Link
                  href={item.href}
                  className="nav__link"
                  aria-expanded={item.plain ? undefined : openMenu === i}
                  aria-controls={item.plain ? undefined : "mega-menu"}
                  aria-haspopup={item.plain ? undefined : "true"}
                >
                  {item.label}
                  {!item.plain && <Icon name="chevron" />}
                </Link>
              </div>
            ))}
          </nav>

          <div className="header__actions">
            <Link href="/plan" className="header__cta">
              Plan your trip
            </Link>
            <Link href="/search" className="header__search" aria-label="Search">
              <Icon name="search" />
              <span className="header__search-label">Search</span>
            </Link>
            <button
              type="button"
              className="menu-toggle"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <span>Menu</span>
              <Icon name="menu" />
            </button>
          </div>
        </div>

        {active && (
          <div className="mega" id="mega-menu" onMouseEnter={() => open(openMenu)}>
            <div className="shell mega__grid">
              <div className="mega__intro">
                <span className="eyebrow">{active.feature.eyebrow}</span>
                <h3 style={{ marginTop: 14 }}>{active.feature.title}</h3>
                <p>{active.feature.text}</p>
                <Link href={active.feature.href} className="link-arrow">
                  Read the guide
                </Link>
              </div>

              <div>
                <div className="mega__label">{active.label}</div>
                <div
                  className="mega__links"
                  style={active.links.length > 5 ? { gridTemplateColumns: "1fr" } : undefined}
                >
                  {active.links.map((link) => (
                    <Link key={link.label} href={link.href} onClick={() => setOpenMenu(null)}>
                      <span>{link.label}</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  ))}
                  <Link href={active.href} onClick={() => setOpenMenu(null)}>
                    <span>View all {active.label.toLowerCase()}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>

              <Link
                href={active.feature.href}
                className="mega__feature"
                onClick={() => setOpenMenu(null)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={active.feature.image} alt="" loading="lazy" />
                <div className="mega__feature-caption">
                  <strong>{active.feature.title}</strong>
                  <span>{active.feature.eyebrow}</span>
                </div>
              </Link>
            </div>
          </div>
        )}
      </header>

      {mobileOpen && (
        <div className="mobile-panel" role="dialog" aria-modal="true" aria-label="Menu" ref={panelRef}>
          <div className="mobile-panel__top">
            <Link href="/" className="wordmark" aria-label="Visit Victoria Falls — home" onClick={() => setMobileOpen(false)}>
              <Image
                src="/visit-victoria-falls-logo.png"
                alt="Visit Victoria Falls"
                width={150}
                height={100}
                priority
                style={{ width: 156, height: 72, objectFit: "contain" }}
              />
            </Link>
            <button
              ref={closeRef}
              type="button"
              className="icon-btn"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >
              <Icon name="close" />
            </button>
          </div>

          <div className="mobile-panel__scroll">
            {nav.map((item, i) => {
              const expandable = !item.plain;
              const expanded = mobileGroup === i && expandable;
              return (
                <div className="mobile-group" key={item.label}>
                  {expandable ? (
                    <button
                      type="button"
                      className="mobile-group__toggle"
                      aria-expanded={expanded}
                      onClick={() => setMobileGroup(expanded ? -1 : i)}
                    >
                      {item.label}
                      <span aria-hidden="true" style={{ fontSize: 16, fontWeight: 300 }}>
                        {expanded ? "−" : "+"}
                      </span>
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="mobile-group__toggle"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                      <span aria-hidden="true">→</span>
                    </Link>
                  )}
                  {expanded && (
                    <div className="mobile-group__links">
                      <Link href={item.href} onClick={() => setMobileOpen(false)}>
                        All {item.label.toLowerCase()}
                      </Link>
                      {item.links.map((link) => (
                        <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)}>
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="mobile-panel__cta">
              <Link href="/plan" className="btn btn--solid" onClick={() => setMobileOpen(false)}>
                Plan my trip
              </Link>
              <Link href="/contact" className="btn btn--ghost" onClick={() => setMobileOpen(false)}>
                Contact us
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
