"use client";

import { useEffect, useRef, useState } from "react";

const LINES = [
  "$ sajidh --stack",
  "{",
  '  "languages":      ["java","python","html","css","javascript","php"],',
  '  "ai_data":        ["numpy","pandas","matplotlib","scipy","statistics"],',
  '  "webframeworks":  ["react","node.js","django"],',
  '  "mobile":         ["flutter","dart"],',
  '  "design":         ["figma","ui/ux","system-design","prototyping"],',
  '  "databases":      ["mysql","postgresql","mongodb","firebase"],',
  '  "version_control":["docker","git","github",]',
  "}",
];

const wrapCmd = (t: string) =>
  t.replace(/^\$ sajidh --stack/, '<span class="cmd">$ sajidh --stack</span>');

export default function Skills() {
  const preRef = useRef<HTMLPreElement>(null);
  const [html, setHtml] = useState('<span class="caret"></span>');

  useEffect(() => {
    const pre = preRef.current;
    if (!pre) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const full = () =>
      setHtml(wrapCmd(LINES.join("\n")) + '<span class="caret"></span>');

    let started = false;
    let timer: ReturnType<typeof setTimeout>;

    function run() {
      if (started) return;
      started = true;
      if (reduce) {
        full();
        return;
      }
      let li = 0;
      let ci = 0;
      const step = () => {
        if (li >= LINES.length) {
          full();
          return;
        }
        const line = LINES[li];
        if (ci <= line.length) {
          const text =
            LINES.slice(0, li).join("\n") +
            (li > 0 ? "\n" : "") +
            line.slice(0, ci);
          setHtml(wrapCmd(text) + '<span class="caret"></span>');
          ci++;
          timer = setTimeout(step, line === "" ? 50 : 11);
        } else {
          li++;
          ci = 0;
          timer = setTimeout(step, 38);
        }
      };
      step();
    }

    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            run();
            io.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(pre);

    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="section" id="stack">
      <div className="wrap">
        <div className="section-head r">
          <h2>Skills</h2>
          <span className="eyebrow">What I build with</span>
        </div>
        <div className="terminal r">
          <div className="terminal-bar">
            <i />
            <i />
            <i />
            <span className="fname">skills.json</span>
          </div>
          <pre ref={preRef} dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </section>
  );
}
