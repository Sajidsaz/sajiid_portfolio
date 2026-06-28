"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, type Project } from "@/data/projects";

/** A device-framed screenshot with a graceful placeholder until the real image exists. */
function Shot({
  src,
  alt,
  placeholder,
  tall = false,
}: {
  src: string;
  alt: string;
  placeholder: string;
  tall?: boolean;
}) {
  const [err, setErr] = useState(false);
  return (
    <div className={tall ? "shot shot-tall" : "shot"}>
      {!err && <img src={src} alt={alt} onError={() => setErr(true)} />}
      <div className="ph">{placeholder}</div>
    </div>
  );
}

function Figure({ project }: { project: Project }) {
  if (project.frame === "phone") {
    return (
      <div className="project-figure">
        <div className="pframe">
          <Shot
            src={project.image}
            alt={project.imageAlt}
            placeholder={project.placeholder}
            tall
          />
        </div>
      </div>
    );
  }
  return (
    <div className="project-figure">
      <div className="bframe">
        <div className="bbar">
          <i />
          <i />
          <i />
          <span className="url">{project.frameLabel}</span>
        </div>
        <Shot
          src={project.image}
          alt={project.imageAlt}
          placeholder={project.placeholder}
        />
      </div>
    </div>
  );
}

export default function Work() {
  const workRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const modeRef = useRef<"native" | "gsap">("native");
  const stRef = useRef<ScrollTrigger | null>(null);

  const n = projects.length;
  const clamp = (i: number) => Math.max(0, Math.min(n - 1, i));
  const pad = (i: number) => String(i + 1).padStart(2, "0");

  function goTo(i: number) {
    i = clamp(i);
    const track = trackRef.current;
    if (!track) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const behavior: ScrollBehavior = reduce ? "auto" : "smooth";

    if (modeRef.current === "gsap" && stRef.current) {
      const st = stRef.current;
      const y = st.start + (st.end - st.start) * (i / (n - 1));
      window.scrollTo({ top: Math.round(y), behavior });
    } else {
      const panels = Array.from(
        track.querySelectorAll<HTMLElement>(".panel")
      );
      const p = panels[i];
      if (!p) return;
      const left = p.offsetLeft - (track.clientWidth - p.clientWidth) / 2;
      track.scrollTo({ left, behavior });
    }
  }

  useEffect(() => {
    const work = workRef.current;
    const track = trackRef.current;
    if (!work || !track) return;

    const panels = Array.from(track.querySelectorAll<HTMLElement>(".panel"));
    let raf = 0;

    // native (swipe) mode: keep the counter synced with scroll position
    const onScroll = () => {
      if (modeRef.current !== "native") return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const center = track.scrollLeft + track.clientWidth / 2;
        let best = 0;
        let bestD = Infinity;
        panels.forEach((p, i) => {
          const c = p.offsetLeft + p.clientWidth / 2;
          const d = Math.abs(c - center);
          if (d < bestD) {
            bestD = d;
            best = i;
          }
        });
        setIndex(best);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });

    // GSAP pin + horizontal scroll (desktop, motion allowed)
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 861px) and (prefers-reduced-motion: no-preference)",
      () => {
        modeRef.current = "gsap";
        work.classList.add("gsap-h");
        const distance = () => window.innerWidth * (n - 1);
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: work.querySelector(".pin-wrap") as Element,
            start: "top top",
            end: () => "+=" + distance(),
            pin: true,
            scrub: 0.6,
            snap: {
              snapTo: 1 / (n - 1),
              duration: { min: 0.15, max: 0.5 },
              ease: "power1.inOut",
            },
            invalidateOnRefresh: true,
            onUpdate: (self) => setIndex(Math.round(self.progress * (n - 1))),
          },
        });
        stRef.current = tween.scrollTrigger ?? null;

        return () => {
          // reverts cleanly below 861px
          modeRef.current = "native";
          work.classList.remove("gsap-h");
          stRef.current = null;
          gsap.set(track, { clearProps: "x" });
          track.scrollLeft = 0;
          setIndex(0);
        };
      }
    );

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());

    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
      mm.revert();
    };
  }, [n]);

  return (
    <section className="work" id="work" ref={workRef}>
      <div className="wrap work-head r">
        <div className="section-head" style={{ marginBottom: 0 }}>
          <h2>Selected work</h2>
          <span className="eyebrow">
            {projects.length === 3 ? "Three" : projects.length} projects · drag
            or scroll →
          </span>
        </div>
      </div>

      <div className="pin-wrap">
        <div className="track" ref={trackRef}>
          {projects.map((project) => (
            <article className="panel" key={project.title}>
              <div className="panel-inner project-split">
                <div className="project-text">
                  <span className="panel-index">{project.indexLabel}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-meta">
                    <span className="tag">{project.tag}</span>
                    {project.github && (
                      <a
                        className="chip"
                        href={project.github}
                        target="_blank"
                        rel="noopener"
                      >
                        GitHub <span className="arr" aria-hidden="true">↗</span>
                      </a>
                    )}
                    {project.live && (
                      <a
                        className="chip"
                        href={project.live}
                        target="_blank"
                        rel="noopener"
                      >
                        Live <span className="arr" aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                  <p className="project-desc">{project.desc}</p>
                  <ul className="project-points">
                    {project.points.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                  <div className="stack">
                    {project.stack.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>
                </div>
                <Figure project={project} />
              </div>
            </article>
          ))}
        </div>

        <div className="gallery-ui">
          <div className="gallery-progress">
            <span
              className="bar"
              style={{ width: `${((index + 1) / n) * 100}%` }}
            />
          </div>
          <div className="gallery-controls">
            <button
              className="gbtn"
              type="button"
              aria-label="Previous project"
              disabled={index === 0}
              onClick={() => goTo(index - 1)}
            >
              ←
            </button>
            <span className="gallery-count">
              <span>{pad(index)}</span> / {pad(n - 1)}
            </span>
            <button
              className="gbtn"
              type="button"
              aria-label="Next project"
              disabled={index === n - 1}
              onClick={() => goTo(index + 1)}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
