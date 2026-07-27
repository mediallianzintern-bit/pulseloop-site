/* ============================================================
   PulseLoop — interactions & animations (Wispr-style)
   ============================================================ */

(() => {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------------------------------------
     1. Nav — scrolled state + mobile menu
  ---------------------------------------------------------- */
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 24);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const burger = document.getElementById("navBurger");
  const mobileMenu = document.getElementById("mobileMenu");
  if (burger) {
    burger.addEventListener("click", () => {
      const open = document.body.classList.toggle("menu-open");
      burger.setAttribute("aria-expanded", String(open));
    });
    mobileMenu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        document.body.classList.remove("menu-open");
        burger.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ----------------------------------------------------------
     2. Scroll reveal (IntersectionObserver)
  ---------------------------------------------------------- */
  const revealEls = document.querySelectorAll(".reveal, .cap-grid");
  const revealIO = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          revealIO.unobserve(e.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );
  revealEls.forEach((el) => revealIO.observe(el));

  /* ----------------------------------------------------------
     3. Word-rise entrances (hero + marked elements)
        Splits text nodes into word spans; skips inline SVGs.
  ---------------------------------------------------------- */
  const splitWords = (root, baseDelay, step) => {
    let i = 0;
    const walk = (node) => {
      for (const child of [...node.childNodes]) {
        if (child.nodeType === Node.TEXT_NODE) {
          if (!child.textContent.trim()) continue;
          const frag = document.createDocumentFragment();
          const parts = child.textContent.split(/(\s+)/);
          for (const part of parts) {
            if (!part) continue;
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(part));
            } else {
              const w = document.createElement("span");
              w.className = "wordup-word";
              w.style.animationDelay = prefersReduced ? "0ms" : `${baseDelay + i * step}ms`;
              w.textContent = part;
              frag.appendChild(w);
              i++;
            }
          }
          child.replaceWith(frag);
        } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName.toLowerCase() !== "svg") {
          walk(child);
        }
      }
    };
    walk(root);
    return i;
  };

  document.querySelectorAll("[data-wordup]").forEach((el) => {
    const base = parseInt(el.dataset.wordupDelay || "0", 10);
    const isLong = el.textContent.trim().split(/\s+/).length > 12;
    splitWords(el, base, isLong ? 18 : 90);
  });

  /* ----------------------------------------------------------
     4. Squiggle underlines — draw when visible
  ---------------------------------------------------------- */
  const squiggles = document.querySelectorAll(".squiggle");
  const squiggleIO = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        squiggleIO.unobserve(e.target);
        const inHero = !!e.target.closest("#heroTitle");
        setTimeout(() => e.target.classList.add("draw"), inHero ? 1150 : 100);
      }
    },
    { threshold: 0.4 }
  );
  squiggles.forEach((s) => squiggleIO.observe(s));

  /* ----------------------------------------------------------
     4b. Hero flowing ribbons — text travels along SVG paths:
         messy question in → PulseLoop pill → clear answer out
  ---------------------------------------------------------- */
  const flowStage = document.getElementById("flowStage");
  if (flowStage) {
    const DEFS = [
      { id: "inFlow", speed: 62 },
      { id: "outFlow", speed: 132 },
      { id: "loopFlow", speed: 40 },
    ];
    let flows = [];
    let flowRunning = false;

    const initFlows = () => {
      flows = [];
      for (const d of DEFS) {
        const node = document.getElementById(d.id);
        if (!node) continue;
        const copies = parseInt(node.dataset.copies || "4", 10);
        let copyLen = 0;
        try { copyLen = node.getComputedTextLength() / copies; } catch (e) { /* not rendered yet */ }
        if (copyLen > 0) flows.push({ node, speed: d.speed, copyLen });
      }
    };

    const t0 = performance.now();
    const flowTick = (now) => {
      if (!flowRunning) return;
      const t = (now - t0) / 1000;
      for (const f of flows) {
        const off = ((t * f.speed) % f.copyLen) - f.copyLen;
        f.node.setAttribute("startOffset", off.toFixed(1));
      }
      requestAnimationFrame(flowTick);
    };

    if (!prefersReduced) {
      const ready = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
      ready.then(() => {
        initFlows();
        const flowIO = new IntersectionObserver(([e]) => {
          const was = flowRunning;
          flowRunning = e.isIntersecting;
          if (flowRunning && !was) requestAnimationFrame(flowTick);
        });
        flowIO.observe(flowStage);
      });
    }

    // gap-detection chip pops in on a loop
    const chip = document.getElementById("gapChip");
    if (chip) {
      if (prefersReduced) {
        chip.classList.add("on");
      } else {
        const popChip = () => {
          chip.classList.add("on");
          setTimeout(() => chip.classList.remove("on"), 3400);
        };
        setTimeout(popChip, 1600);
        setInterval(popChip, 5600);
      }
    }
  }

  /* ----------------------------------------------------------
     5. Count-up metrics
  ---------------------------------------------------------- */
  const fmt = (v, format) => {
    if (format === "pct") return v.toFixed(1) + "%";
    if (format === "sec") return v.toFixed(1) + "s";
    return Math.round(v).toLocaleString("en-US");
  };

  const countIO = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        countIO.unobserve(e.target);
        const el = e.target;
        const target = parseFloat(el.dataset.count);
        const format = el.dataset.format;
        if (prefersReduced) { el.textContent = fmt(target, format); continue; }
        const t0c = performance.now();
        const DUR = 1900;
        const tick = (now) => {
          const p = Math.min((now - t0c) / DUR, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = fmt(target * eased, format);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    },
    { threshold: 0.5 }
  );
  document.querySelectorAll("[data-count]").forEach((el) => countIO.observe(el));

  /* ----------------------------------------------------------
     6. Live clock
  ---------------------------------------------------------- */
  const clock = document.getElementById("liveClock");
  if (clock) {
    const tickClock = () => {
      const d = new Date();
      clock.textContent = [d.getHours(), d.getMinutes(), d.getSeconds()]
        .map((n) => String(n).padStart(2, "0"))
        .join(":");
    };
    tickClock();
    setInterval(tickClock, 1000);
  }

  /* ----------------------------------------------------------
     7. Live-call simulation (typewriter + signal chips)
  ---------------------------------------------------------- */
  const simBody = document.getElementById("callSimBody");
  const simStatus = document.getElementById("callSimStatus");
  if (simBody) {
    const SCRIPT = [
      { type: "line", speaker: "PROSPECT", text: "We're already evaluating Spotify for our audio spend…" },
      { type: "signal", name: "competitor_mention", conf: "0.84", color: "#f3c14b" },
      { type: "line", speaker: "PROSPECT", text: "And honestly, yeh rate thoda zyada hai for Q2." },
      { type: "signal", name: "objection · hinglish", conf: "0.91", color: "#f28b8b" },
      { type: "line", speaker: "REP", text: "Umm, I think the CTV CPM is, like, around…" },
      { type: "signal", name: "hesitation", conf: "0.78", color: "#f3c14b" },
      { type: "signal", name: "filler_words", conf: "0.72", color: "#f0954f" },
      { type: "sys", text: "→ rate card retrieved · verified Q2 CTV CPMs" },
      { type: "line", speaker: "REP", text: "—here it is: Q2 CTV rates, with the mCanvas bundle option." },
      { type: "signal", name: "product_gap", conf: "drill queued", color: "#b895f5" },
      { type: "done", text: "✓ call scored — 2-min drill sent to the learning loop" },
    ];

    let simStarted = false;

    const typeLine = (item) =>
      new Promise((resolve) => {
        const line = document.createElement("span");
        line.className = item.type === "sys" ? "sim-line on sim-sys" : "sim-line on";
        if (item.speaker) {
          const speaker = document.createElement("span");
          speaker.className = "sim-speaker";
          speaker.textContent = item.speaker + ": ";
          line.appendChild(speaker);
        }
        const txt = document.createElement("span");
        txt.className = "txt";
        const caret = document.createElement("span");
        caret.className = "type-caret";
        line.append(txt, caret);
        simBody.appendChild(line);

        if (prefersReduced) {
          txt.textContent = item.text;
          caret.remove();
          return resolve();
        }
        let i = 0;
        const step = () => {
          txt.textContent = item.text.slice(0, ++i);
          simBody.scrollTop = simBody.scrollHeight;
          if (i < item.text.length) setTimeout(step, 22 + Math.random() * 26);
          else { caret.remove(); setTimeout(resolve, 260); }
        };
        step();
      });

    const showSignal = (item) =>
      new Promise((resolve) => {
        const chip = document.createElement("span");
        chip.className = "sim-signal";
        chip.innerHTML = `<span class="sdot" style="background:${item.color}"></span>${item.name}<span class="sval">· ${item.conf}</span>`;
        simBody.appendChild(chip);
        simBody.appendChild(document.createTextNode(" "));
        requestAnimationFrame(() => chip.classList.add("on"));
        simBody.scrollTop = simBody.scrollHeight;
        setTimeout(resolve, prefersReduced ? 0 : 420);
      });

    const runSim = async () => {
      simBody.innerHTML = "";
      simStatus.textContent = "listening · EN + Hinglish";
      for (const item of SCRIPT) {
        if (item.type === "line" || item.type === "sys") await typeLine(item);
        else if (item.type === "signal") await showSignal(item);
        else {
          const done = document.createElement("span");
          done.className = "sim-line on sim-done";
          done.textContent = item.text;
          simBody.appendChild(done);
          simStatus.textContent = "scored · gap analysis complete";
        }
      }
      if (!prefersReduced) setTimeout(runSim, 6000);
    };

    const simIO = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !simStarted) {
        simStarted = true;
        simIO.disconnect();
        setTimeout(runSim, 500);
      }
    }, { threshold: 0.35 });
    simIO.observe(simBody);
  }

  /* ----------------------------------------------------------
     8. Implementation terminal — tabs + typewriter
  ---------------------------------------------------------- */
  const devTerminal = document.getElementById("devTerminal");
  const devTabs = document.getElementById("devTabs");
  if (devTerminal && devTabs) {
    const TABS = {
      connect: [
        { cls: "cmt", text: "# plug into your systems of record" },
        { cls: "", prompt: true, text: "pulseloop connect --crm --lms" },
        { cls: "dev-banner", text: "→ connected · nothing replaced" },
      ],
      ingest: [
        { cls: "cmt", text: "# playbooks, rate cards, market reports" },
        { cls: "", prompt: true, text: "pulseloop ingest ./playbooks ./rate-cards" },
        { cls: "cmt", text: "# + comscore, dentsu-e4m, madison pmar" },
        { cls: "dev-banner", text: "→ 28 documents indexed · firewall lists loaded" },
      ],
      golive: [
        { cls: "", prompt: true, text: "pulseloop pilot --team west-sales-pod" },
        { cls: "cmt", text: "# baseline captured · success criteria set" },
        { cls: "dev-banner", text: "╔══════════════════════════════════╗" },
        { cls: "dev-banner", text: "║  Pilot is live                   ║" },
        { cls: "dev-banner", text: "║  Signals on from the next call   ║" },
        { cls: "dev-banner", text: "╚══════════════════════════════════╝" },
      ],
    };

    let typeToken = 0;

    const typeDevLines = async (lines) => {
      const token = ++typeToken;
      devTerminal.innerHTML = "";
      for (const l of lines) {
        if (token !== typeToken) return;
        const line = document.createElement("span");
        line.className = "dev-line " + l.cls;
        devTerminal.appendChild(line);
        if (prefersReduced) {
          line.textContent = (l.prompt ? "$ " : "") + l.text;
          continue;
        }
        if (l.prompt) {
          const p = document.createElement("span");
          p.className = "prompt";
          p.textContent = "$ ";
          line.appendChild(p);
        }
        const txt = document.createElement("span");
        line.appendChild(txt);
        for (let i = 0; i <= l.text.length; i++) {
          if (token !== typeToken) return;
          txt.textContent = l.text.slice(0, i);
          await new Promise((r) => setTimeout(r, l.cls === "dev-banner" ? 4 : 14));
        }
      }
    };

    devTabs.querySelectorAll(".t-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        devTabs.querySelectorAll(".t-tab").forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        typeDevLines(TABS[tab.dataset.tab]);
      });
    });

    let devStarted = false;
    const devIO = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !devStarted) {
        devStarted = true;
        devIO.disconnect();
        typeDevLines(TABS.connect);
      }
    }, { threshold: 0.35 });
    devIO.observe(devTerminal);
  }

  /* ----------------------------------------------------------
     9. Who-we-serve — selector pills + auto carousel
  ---------------------------------------------------------- */
  const stage = document.getElementById("rolesStage");
  const pillsWrap = document.getElementById("rolesPills");
  if (stage && pillsWrap) {
    const slides = [...stage.querySelectorAll(".role-slide")];
    const pills = [...pillsWrap.querySelectorAll(".role-pill")];
    const indexEl = document.getElementById("rolesIndex");
    let current = 0;
    let timer;

    const go = (next) => {
      const prev = current;
      current = (next + slides.length) % slides.length;
      if (prev === current) return;
      slides[prev].classList.remove("active");
      slides[prev].classList.add("exit-left");
      setTimeout(() => slides[prev].classList.remove("exit-left"), 700);
      slides[current].classList.add("active");
      pills.forEach((p, i) => p.classList.toggle("active", i === current));
      indexEl.textContent =
        String(current + 1).padStart(2, "0") + " / " + String(slides.length).padStart(2, "0");
    };

    const restartTimer = () => {
      clearInterval(timer);
      if (!prefersReduced) timer = setInterval(() => go(current + 1), 6000);
    };

    pills.forEach((pill) => {
      pill.addEventListener("click", () => {
        go(parseInt(pill.dataset.slide, 10));
        restartTimer();
      });
    });
    restartTimer();
  }

  /* ----------------------------------------------------------
     10. Pricing toggle (monthly / annual)
  ---------------------------------------------------------- */
  const toggle = document.getElementById("priceToggle");
  if (toggle) {
    toggle.querySelectorAll(".pt-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.classList.contains("active")) return;
        toggle.querySelectorAll(".pt-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const period = btn.dataset.period;
        document.querySelectorAll(".price-value[data-monthly]").forEach((el) => {
          el.classList.add("swapping");
          setTimeout(() => {
            el.textContent = el.dataset[period];
            el.classList.remove("swapping");
          }, 250);
        });
      });
    });
  }

  /* ----------------------------------------------------------
     11. Footer year
  ---------------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
