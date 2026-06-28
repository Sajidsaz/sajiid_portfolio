"use client";

import { useEffect } from "react";

/**
 * Global, non-visual effects ported from the original single-file build:
 *  - adds `reveal-on` to <body> so the hero name reveal animation can play
 *  - scroll-reveals every element with the `.r` class (adds `.in` once in view)
 */
export default function RevealEffects() {
  useEffect(() => {
    document.body.classList.add("reveal-on");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    document.querySelectorAll(".r").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
