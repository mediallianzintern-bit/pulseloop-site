"use client";

import { useState } from "react";

/* ------------------------------------------------------------
   Role-based product preview: what each seat sees on login.
   Replaces the old deploy terminal. Three tabs: Rep / Manager /
   L&D, each a compact mock of their dashboard. Shared across all
   three: the Assistant + the notification bell.
------------------------------------------------------------ */

const ROLES = {
  rep: {
    label: "Rep",
    who: "Maya Rep",
    nav: ["Dashboard", "Calls", "Training", "Practice", "Assistant"],
    active: "Dashboard",
    unique: "Practice",
    kpis: [
      ["86", "Objection Score"],
      ["142", "Total Signals"],
      ["1", "Active Calls"],
    ],
    panelTitle: "Top recurring weaknesses",
    rows: [
      ["Pricing objection", "gap"],
      ["Filler density", "gap"],
      ["Competitor rebuttal", "gap"],
    ],
    note: "Sees only their own calls · training auto-assigned to them",
  },
  manager: {
    label: "Manager",
    who: "Team view",
    nav: ["Dashboard", "Calls", "Accounts", "Analytics", "Training", "Assistant"],
    active: "Dashboard",
    unique: "Analytics",
    kpis: [
      ["3", "Active Calls Now"],
      ["28", "Calls Today"],
      ["81", "Team Score · 30d"],
    ],
    panelTitle: "Reps needing attention · 7d",
    rows: [
      ["A. Rao", "62"],
      ["M. Shah", "68"],
      ["K. Nair", "70"],
    ],
    note: "Sees all reps' calls & scores · assigns training to the team",
  },
  ld: {
    label: "L&D",
    who: "Training ops",
    nav: ["Dashboard", "Skill Gaps", "Training", "Progress", "Assistant"],
    active: "Dashboard",
    unique: "Skill Gaps",
    kpis: [
      ["6", "Active Modules"],
      ["12", "Reps w/ Gaps"],
      ["74%", "Avg Completion"],
    ],
    panelTitle: "Training modules",
    rows: [
      ["Objection Handling", "live"],
      ["Pricing Confidence", "live"],
      ["Product Knowledge", "live"],
    ],
    note: "Builds modules & videos · org-wide skill gaps + progress",
  },
};

const KEYS = ["rep", "manager", "ld"];

export default function RoleDashboards() {
  const [active, setActive] = useState("rep");
  const r = ROLES[active];

  return (
    <div className="app-preview">
      <div className="app-head">
        <span className="app-dots"><i /><i /><i /></span>
        <span className="app-url mono">app.pulseloop.ai / {r.who}</span>
        <span className="app-bell" title="Training assigned">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="bell-badge">1</span>
        </span>
      </div>

      <div className="app-tabs">
        {KEYS.map((k) => (
          <button
            key={k}
            className={`app-tab ${active === k ? "active" : ""}`}
            onClick={() => setActive(k)}
          >
            {ROLES[k].label}
          </button>
        ))}
      </div>

      <div className="app-body" key={active}>
        <aside className="app-side">
          {r.nav.map((item) => {
            const isActive = item === r.active;
            const isUnique = item === r.unique;
            const isAssistant = item === "Assistant";
            return (
              <span
                key={item}
                className={`app-nav ${isActive ? "active" : ""} ${isUnique ? "unique" : ""}`}
              >
                {item}
                {isUnique && <span className="app-badge">ONLY {r.label.toUpperCase()}</span>}
                {isAssistant && <span className="app-badge app-badge-shared">SHARED</span>}
              </span>
            );
          })}
        </aside>

        <div className="app-main">
          <div className="app-kpis">
            {r.kpis.map(([v, l]) => (
              <div key={l} className="app-kpi">
                <span className="app-kpi-val">{v}</span>
                <span className="app-kpi-lab">{l}</span>
              </div>
            ))}
          </div>

          <div className="app-panel2">
            <h5>{r.panelTitle}</h5>
            {r.rows.map(([name, tag]) => (
              <div key={name} className="app-prow">
                <span>{name}</span>
                <span className={`app-tag app-tag-${tag === "live" ? "live" : tag === "gap" ? "gap" : "num"}`}>
                  {tag === "live" ? "LIVE" : tag === "gap" ? "GAP" : tag}
                </span>
              </div>
            ))}
          </div>

          <p className="app-note">{r.note}</p>
        </div>
      </div>
    </div>
  );
}
