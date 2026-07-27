"use client";

import { useEffect, useRef, useState } from "react";

const SLIDES = [
  {
    tab: "Publishers & Broadcasters",
    quote:
      "Transitioning from legacy broadcast models to digital-first, data-driven platforms, with every rep fluent across TV, print, digital, and OTT.",
    tag: "MEDIA PUBLISHERS & BROADCASTERS",
    result: "One assistant across every format",
  },
  {
    tab: "Telecom & Enterprise B2B",
    quote:
      "Managing complex, multi-format product portfolios like JioAds, JioFiber, and Jio Platforms, where no rep can memorise everything, and no client will wait.",
    tag: "ENTERPRISE B2B & TELECOM TEAMS",
    result: "CTV, DSP, Video + mCanvas, mapped",
  },
  {
    tab: "L&D Leaders",
    quote:
      "Shifting from generic, periodic training modules to adaptive, real-time upskilling that directly impacts win rates, with evidence, not intuition.",
    tag: "L&D & ENABLEMENT LEADERS",
    result: "2-minute drills, triggered by real calls",
  },
];

export default function Who() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const restart = () => {
    clearInterval(timerRef.current);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) {
      timerRef.current = setInterval(
        () => setCurrent((c) => (c + 1) % SLIDES.length),
        6000
      );
    }
  };

  useEffect(() => {
    restart();
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const go = (i) => {
    setCurrent(i);
    restart();
  };

  return (
    <>
      <div className="who-tabs">
        {SLIDES.map((s, i) => (
          <button
            key={s.tab}
            className={`who-tab ${current === i ? "active" : ""}`}
            onClick={() => go(i)}
          >
            {s.tab}
          </button>
        ))}
        <span className="who-index">
          {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </span>
      </div>

      <div className="roles-stage">
        {SLIDES.map((s, i) => (
          <article key={s.tag} className={`role-slide ${current === i ? "active" : ""}`}>
            <p className="role-quote">{s.quote}</p>
            <div className="role-meta">
              <span className="role-tag">{s.tag}</span>
              <span className="role-result">{s.result}</span>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
