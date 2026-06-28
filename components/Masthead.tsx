"use client";

import { useEffect, useRef, useState } from "react";
import Clock from "./Clock";

const NAV = [
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Skills" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export default function Masthead() {
  const navRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [indicator, setIndicator] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });
  const [menuOpen, setMenuOpen] = useState(false);

  // sliding pill indicator follows the active link
  useEffect(() => {
    function move() {
      const nav = navRef.current;
      if (!nav) return;
      const links = nav.querySelectorAll<HTMLAnchorElement>("a");
      const el = links[active];
      if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    }
    move();
    window.addEventListener("resize", move);
    window.addEventListener("load", move);
    if (document.fonts?.ready) document.fonts.ready.then(move);
    return () => {
      window.removeEventListener("resize", move);
      window.removeEventListener("load", move);
    };
  }, [active]);

  // scrollspy: set active link from the section in view
  useEffect(() => {
    const sections = NAV.map((n) => document.querySelector(n.href)).filter(
      Boolean
    ) as Element[];
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = NAV.findIndex((n) => n.href === "#" + e.target.id);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => spy.observe(s));
    return () => spy.disconnect();
  }, []);

  // mobile menu: body scroll lock, escape to close, auto-close above breakpoint
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", onKey);
    const mq = window.matchMedia("(min-width: 681px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="masthead">
        <div className="wrap masthead-inner">
          <a href="#top" className="monogram" aria-label="Sajidh Ahamed — home">
            <span aria-hidden="true"></span>
          </a>

          <nav className="pillnav" aria-label="Primary" ref={navRef}>
            <span
              className="pill-indicator"
              aria-hidden="true"
              style={{ left: indicator.left, width: indicator.width }}
            />
            {NAV.map((n, i) => (
              <a
                key={n.href}
                href={n.href}
                className={i === active ? "active" : undefined}
              >
                {n.label}
              </a>
            ))}
          </nav>

          <Clock />

          <button
            className={`menu-toggle${menuOpen ? " open" : ""}`}
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobileMenu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="bar1" aria-hidden="true" />
            <span className="bar2" aria-hidden="true" />
          </button>
        </div>
      </header>

      <div
        className={`mobile-menu${menuOpen ? " open" : ""}`}
        id="mobileMenu"
        aria-hidden={!menuOpen}
      >
        <nav className="mobile-nav" aria-label="Mobile">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="mobile-menu-foot">
          <a className="mm-mail" href="mailto:sajidhwork@gmail.com">
            sajidhwork@gmail.com
          </a>
          <div className="mm-socials">
            <a
              href="https://github.com/Sajidsaz"
              target="_blank"
              rel="noopener"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/sajidh-ahamed-ba14aa267"
              target="_blank"
              rel="noopener"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
