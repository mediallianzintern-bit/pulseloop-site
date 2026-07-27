"use client";

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------
   The Dual-Loop figure: a clear, sequenced story where the
   loop PATH itself draws as the cycle advances:
     01 rep asks    → left lobe draws into PulseLoop
     02 answers     → right lobe fills
     03 gap detected→ path pushes to 90%
        drill assign→ loop closes to 100% (glows)
   All card text stays upright and readable.
------------------------------------------------------------ */

const LEFT_D =
  "M 500 210 C 470 92, 362 56, 266 56 C 142 56, 76 132, 76 210 C 76 288, 142 364, 266 364 C 362 364, 470 328, 500 210";
const RIGHT_D =
  "M 500 210 C 530 92, 638 56, 734 56 C 858 56, 924 132, 924 210 C 924 288, 858 364, 734 364 C 638 364, 530 328, 500 210";
/* one continuous figure-8: left lobe then right lobe */
const FULL_D = `${LEFT_D} C 530 92, 638 56, 734 56 C 858 56, 924 132, 924 210 C 924 288, 858 364, 734 364 C 638 364, 530 328, 500 210`;

const PAIRS = [
  { q: "What's the Q2 CTV rate?", a: "CTV Q2 CPM ₹340 · verified from your rate card", gap: "PRODUCT KNOWLEDGE" },
  { q: "How do I counter Spotify?", a: "Counter: mCanvas bundle · +22% reach", gap: "OBJECTION HANDLING" },
  { q: "Kya discount possible hai?", a: "Approved discount band: 8–12%", gap: "PRICING CONFIDENCE" },
  { q: "Where's the mCanvas case study?", a: "Case study attached to your pitch", gap: "PRODUCT KNOWLEDGE" },
];

/* how far the loop is drawn at each phase (0–1 of the figure-8) */
const PHASE_PROGRESS = {
  rest: 0,
  question: 0.5, // left lobe complete → connected into PulseLoop
  process: 0.5,
  answer: 0.8, // right lobe fills as PulseLoop answers
  gap: 0.9, // gap detected → 90%
  assigned: 1, // drill assigned → loop closes
};

const Q_ON = ["question", "process", "answer", "gap", "assigned"];
const A_ON = ["answer", "gap", "assigned"];

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export default function DualLoop() {
  const stageRef = useRef(null);
  const [pairIdx, setPairIdx] = useState(0);
  const [phase, setPhase] = useState("rest");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPhase("assigned");
      return;
    }

    let alive = true;

    (async () => {
      let idx = 0;
      while (alive) {
        setPairIdx(idx);
        setPhase("question");
        await wait(2000);
        if (!alive) break;
        setPhase("process");
        await wait(750);
        if (!alive) break;
        setPhase("answer");
        await wait(2200);
        if (!alive) break;
        setPhase("gap");
        await wait(1700);
        if (!alive) break;
        setPhase("assigned");
        await wait(2300);
        if (!alive) break;
        setPhase("rest");
        await wait(700);
        idx = (idx + 1) % PAIRS.length;
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const pair = PAIRS[pairIdx];
  const progress = PHASE_PROGRESS[phase] ?? 0;

  return (
    <div className="loopflow" ref={stageRef} aria-hidden="true">
      <svg className="loopflow-svg" viewBox="0 0 1000 420">
        {/* faint dashed guide (both lobes) */}
        <path d={LEFT_D} className="lf-path lf-path-dashed" />
        <path d={RIGHT_D} className="lf-path lf-path-dashed" />

        {/* accent overlay that draws as the cycle completes */}
        <path
          d={FULL_D}
          pathLength={1}
          className={`lf-progress ${phase === "rest" ? "rest" : ""} ${
            phase === "assigned" ? "done" : ""
          }`}
          style={{ strokeDashoffset: 1 - progress }}
        />
      </svg>

      {/* 01 - the rep asks */}
      <div className={`dl-card dl-q ${Q_ON.includes(phase) ? "show" : ""}`}>
        <span className="dl-badge">Q</span>
        <span className="dl-card-text" key={`q${pairIdx}`}>{pair.q}</span>
      </div>

      {/* 02 - PulseLoop answers */}
      <div className={`dl-card dl-a ${A_ON.includes(phase) ? "show" : ""}`}>
        <span className="dl-badge dl-badge-a">A</span>
        <span className="dl-card-text" key={`a${pairIdx}`}>{pair.a}</span>
      </div>

      {/* the platform at the intersection */}
      <span className={`lf-node ${phase === "process" ? "busy" : ""}`}>
        <span className="dot dot-live" />
        PULSELOOP
      </span>

      {/* 03 - gap detected, drill assigned */}
      <span
        className={`lf-pop ${phase === "gap" ? "lf-pop-gap" : "lf-pop-assigned"} ${
          phase === "gap" || phase === "assigned" ? "show" : ""
        }`}
      >
        <span className="lf-pop-inner" key={phase + pairIdx}>
          {phase === "gap" ? (
            <>
              <span className="sdot" style={{ background: "#7a5af8" }} />
              GAP DETECTED · {pair.gap}
            </>
          ) : (
            <>
              <span className="sdot" style={{ background: "#21a566" }} />✓ 2-MIN DRILL
              ASSIGNED TO REP
            </>
          )}
        </span>
      </span>

      <span className="lf-caption lf-caption-a">01 · THE REP ASKS</span>
      <span className="lf-caption lf-caption-c">03 · GAP → 2-MIN DRILL</span>
      <span className="lf-caption lf-caption-b">02 · DUAL LOOP ANSWERS</span>
    </div>
  );
}
