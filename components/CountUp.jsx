"use client";

import { useEffect, useRef } from "react";

const fmt = (v, format) =>
  format === "pct" ? v.toFixed(1) + "%" : Math.round(v).toLocaleString("en-US");

export default function CountUp({ to, format = "int", className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rafId = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        if (reduced) {
          el.textContent = fmt(to, format);
          return;
        }
        const t0 = performance.now();
        const DUR = 1700;
        const tick = (now) => {
          const p = Math.min((now - t0) / DUR, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = fmt(to * eased, format);
          if (p < 1) rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [to, format]);

  return (
    <span ref={ref} className={className}>
      {format === "pct" ? "0%" : "0"}
    </span>
  );
}
