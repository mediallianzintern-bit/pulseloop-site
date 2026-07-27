"use client";

import { useEffect, useRef } from "react";

const SCRIPT = [
  { type: "line", speaker: "PROSPECT", text: "We're already evaluating Spotify for our audio spend…" },
  { type: "signal", name: "competitor_mention", conf: "0.84", color: "#c9a227" },
  { type: "line", speaker: "PROSPECT", text: "And honestly, yeh rate thoda zyada hai for Q2." },
  { type: "signal", name: "objection · hinglish", conf: "0.91", color: "#d9534a" },
  { type: "line", speaker: "REP", text: "Umm, I think the CTV CPM is, like, around…" },
  { type: "signal", name: "hesitation", conf: "0.78", color: "#c9a227" },
  { type: "signal", name: "filler_words", conf: "0.72", color: "#d98e2b" },
  { type: "sys", text: "→ rate card retrieved · verified Q2 CTV CPMs" },
  { type: "line", speaker: "REP", text: "Okay, here it is: Q2 CTV rates, with the mCanvas bundle option." },
  { type: "signal", name: "product_gap", conf: "drill queued", color: "#7a5af8" },
  { type: "done", text: "✓ call scored · 2-min drill sent to the learning loop" },
];

export default function CallSim() {
  const bodyRef = useRef(null);
  const statusRef = useRef(null);

  useEffect(() => {
    const body = bodyRef.current;
    const status = statusRef.current;
    if (!body) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let alive = true;
    let started = false;

    const delay = (ms) => new Promise((r) => setTimeout(r, ms));

    const typeLine = async (item) => {
      const line = document.createElement("span");
      line.className = item.type === "sys" ? "sim-line on sim-sys" : "sim-line on";
      if (item.speaker) {
        const sp = document.createElement("span");
        sp.className = "sim-speaker";
        sp.textContent = item.speaker + ": ";
        line.appendChild(sp);
      }
      const txt = document.createElement("span");
      txt.className = "txt";
      const caret = document.createElement("span");
      caret.className = "type-caret";
      line.append(txt, caret);
      body.appendChild(line);

      if (reduced) {
        txt.textContent = item.text;
        caret.remove();
        return;
      }
      for (let i = 1; i <= item.text.length; i++) {
        if (!alive) return;
        txt.textContent = item.text.slice(0, i);
        body.scrollTop = body.scrollHeight;
        await delay(22 + Math.random() * 26);
      }
      caret.remove();
      await delay(260);
    };

    const showSignal = async (item) => {
      const chip = document.createElement("span");
      chip.className = "sim-signal";
      chip.innerHTML = `<span class="sdot" style="background:${item.color}"></span>${item.name}<span class="sval">· ${item.conf}</span>`;
      body.appendChild(chip);
      body.appendChild(document.createTextNode(" "));
      requestAnimationFrame(() => chip.classList.add("on"));
      body.scrollTop = body.scrollHeight;
      await delay(reduced ? 0 : 420);
    };

    const run = async () => {
      while (alive) {
        body.innerHTML = "";
        if (status) status.textContent = "listening · EN + Hinglish";
        for (const item of SCRIPT) {
          if (!alive) return;
          if (item.type === "line" || item.type === "sys") await typeLine(item);
          else if (item.type === "signal") await showSignal(item);
          else {
            const done = document.createElement("span");
            done.className = "sim-line on sim-done";
            done.textContent = item.text;
            body.appendChild(done);
            if (status) status.textContent = "scored · gap analysis complete";
          }
        }
        if (reduced) return;
        await delay(6000);
      }
    };

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        started = true;
        io.disconnect();
        setTimeout(() => { if (alive) run(); }, 400);
      }
    }, { threshold: 0.3 });
    io.observe(body);

    return () => {
      alive = false;
      io.disconnect();
    };
  }, []);

  return (
    <div className="terminal">
      <div className="terminal-head">
        <span className="t-dots"><i /><i /><i /></span>
        <span className="mono t-title">live-call.log</span>
        <span className="mono t-rec"><span className="dot dot-rec" />REC</span>
      </div>
      <div className="terminal-body mono" ref={bodyRef} />
      <div className="terminal-foot mono">
        <span className="dot dot-live" />
        <span ref={statusRef}>listening · EN + Hinglish</span>
      </div>
    </div>
  );
}
