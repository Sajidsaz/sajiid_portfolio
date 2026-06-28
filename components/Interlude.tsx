"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Band from "./Band";
import Skills from "./Skills";

/**
 * Cinematic interlude: Band and Skills become full-height stacked scenes.
 * Band pins; Skills rises from the bottom and overlaps it; Band recedes
 * (scale + dim + blur), scrubbed to Skills' rise. Then the pin releases and
 * About flows up normally.
 *
 * Desktop + motion only — on mobile / reduced-motion the CSS keeps both as
 * normal stacked sections and no GSAP runs.
 */
export default function Interlude() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 861px) and (prefers-reduced-motion: no-preference)",
      () => {
        const stages = gsap.utils.toArray<HTMLElement>(".istage", root);
        const bandInner = stages[0]?.querySelector(".istage-inner");
        const skills = stages[1];
        if (!bandInner || !skills) return;

        gsap.fromTo(
          bandInner,
          { scale: 1, opacity: 1, filter: "blur(0px) brightness(1)" },
          {
            scale: 0.9,
            opacity: 0.5,
            filter: "blur(6px) brightness(0.5)",
            ease: "none",
            scrollTrigger: {
              trigger: skills,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          }
        );
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <div className="interlude" ref={ref}>
      <div className="istage" style={{ zIndex: 1 }}>
        <div className="istage-inner">
          <Band />
        </div>
      </div>
      <div className="istage" style={{ zIndex: 2 }}>
        <div className="istage-inner">
          <Skills />
        </div>
      </div>
    </div>
  );
}
