"use client";

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------
   Hero Dual-Loop flow: the conversation orbits the Sales
   Enablement loop, insight orbits the Adaptive Learning loop,
   and they meet at the call.
------------------------------------------------------------ */

const LEFT_TEXT =
  "LIVE CALL · OBJECTION ANTICIPATED · RATE CARD RETRIEVED · PITCH UPDATED · NEXT STEP LOGGED · ";
const RIGHT_TEXT =
  "SIGNAL SCORED · GAP CLASSIFIED · 2-MIN DRILL QUEUED · REP LEVELLED UP · ";
const COPIES = 4;

const CHIPS = [
  { text: "objection · 0.91", color: "#d9534a" },
  { text: "hesitation · 0.78", color: "#c9a227" },
  { text: "rate card retrieved · verified", color: "#21a566" },
  { text: "product_gap → 2-min drill queued", color: "#7a5af8" },
  { text: "hinglish signal · yeh rate thoda zyada hai", color: "#d98e2b" },
];

function DualLoopFlow() {
  const stageRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);
  const [chipIndex, setChipIndex] = useState(0);
  const [chipOn, setChipOn] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setChipOn(true);
      return;
    }

    let running = false;
    let rafId = 0;
    let leftCopy = 0, rightCopy = 0;
    const t0 = performance.now();

    const measure = () => {
      try {
        leftCopy = leftTextRef.current.getComputedTextLength() / COPIES;
        rightCopy = rightTextRef.current.getComputedTextLength() / COPIES;
      } catch {
        /* not rendered yet */
      }
    };

    const tick = (now) => {
      if (!running) return;
      const t = (now - t0) / 1000;
      if (leftCopy > 0) {
        const offL = ((t * 46) % leftCopy) - leftCopy;
        leftTextRef.current.setAttribute("startOffset", offL.toFixed(1));
      }
      if (rightCopy > 0) {
        const offR = -(((t * 52) % rightCopy)) - rightCopy;
        rightTextRef.current.setAttribute("startOffset", offR.toFixed(1));
      }
      rafId = requestAnimationFrame(tick);
    };

    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    let io;
    fontsReady.then(() => {
      measure();
      io = new IntersectionObserver(([e]) => {
        const was = running;
        running = e.isIntersecting;
        if (running && !was) rafId = requestAnimationFrame(tick);
      });
      if (stageRef.current) io.observe(stageRef.current);
    });

    // cycling signal chip
    let idx = 0;
    setChipOn(true);
    const cycle = setInterval(() => {
      setChipOn(false);
      setTimeout(() => {
        idx = (idx + 1) % CHIPS.length;
        setChipIndex(idx);
        setChipOn(true);
      }, 450);
    }, 3000);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      clearInterval(cycle);
      if (io) io.disconnect();
    };
  }, []);

  const chip = CHIPS[chipIndex];

  return (
    <div className="loopflow" ref={stageRef} aria-hidden="true">
      <svg className="loopflow-svg" viewBox="0 0 1000 420">
        <defs>
          <path
            id="lfLeft"
            d="M 500 210 C 470 92, 362 56, 266 56 C 142 56, 76 132, 76 210 C 76 288, 142 364, 266 364 C 362 364, 470 328, 500 210 Z"
          />
          <path
            id="lfRight"
            d="M 500 210 C 530 92, 638 56, 734 56 C 858 56, 924 132, 924 210 C 924 288, 858 364, 734 364 C 638 364, 530 328, 500 210 Z"
          />
        </defs>

        <use href="#lfLeft" className="lf-path" />
        <use href="#lfRight" className="lf-path" />

        <text className="lf-text">
          <textPath ref={leftTextRef} href="#lfLeft">
            {LEFT_TEXT.repeat(COPIES)}
          </textPath>
        </text>
        <text className="lf-text lf-text-b">
          <textPath ref={rightTextRef} href="#lfRight">
            {RIGHT_TEXT.repeat(COPIES)}
          </textPath>
        </text>
      </svg>

      <span className={`lf-chip ${chipOn ? "on" : ""}`}>
        <span className="sdot" style={{ background: chip.color }} />
        {chip.text}
      </span>

      <span className="lf-node">
        <span className="dot dot-live" />
        THE CALL
      </span>

      <span className="lf-caption lf-caption-a">SALES ENABLEMENT LOOP</span>
      <span className="lf-caption lf-caption-b">ADAPTIVE LEARNING LOOP</span>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container">
        <p className="overline hero-overline">
          The AI-enabled sales assistant for media organizations
        </p>
        <h1 className="hero-title">
          <span className="line-mask">
            <span className="line-slide">Don&apos;t sell blind,</span>
          </span>
          <span className="line-mask">
            <span className="line-slide d">
              sell in the <span className="accent-word">loop.</span>
            </span>
          </span>
        </h1>
        <p className="hero-sub">
          PulseLoop bridges real-time sales execution and personalised corporate
          training. Smarter decisions in live client meetings, behavioural data
          flowing into adaptive learning pathways.
        </p>
        <div className="hero-ctas">
          <a href="#demo" className="btn btn-accent">Request a demo</a>
          <a href="#dual-loop" className="btn btn-ghost">Explore the Dual-Loop Architecture</a>
        </div>
      </div>

      <DualLoopFlow />
    </section>
  );
}
