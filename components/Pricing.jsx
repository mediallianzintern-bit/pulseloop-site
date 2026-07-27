"use client";

import { useState } from "react";

const PLANS = [
  {
    num: "01",
    name: "Pilot Deployment",
    tagline: "Prove it with one sales pod",
    monthly: "$29",
    annual: "$24",
    per: "/rep/month",
    features: [
      "4–6 week guided pilot",
      "Live signal detection + scoring",
      "Hinglish + English NLP engine",
      "Baseline vs. uplift report",
      "L&D gap dashboard",
      "Success criteria defined together",
    ],
    cta: "Start your pilot",
    ctaStyle: "btn-ghost",
  },
  {
    num: "02",
    name: "Enterprise Rollout",
    tagline: "Scale what the pilot proved",
    monthly: "$49",
    annual: "$41",
    per: "/rep/month",
    featured: true,
    features: [
      "Everything in Pilot",
      "CRM + LMS orchestration",
      "Custom competitor firewall lists",
      "Role-based dashboards: rep, manager, L&D",
      "Adaptive learning pathways",
      "Dedicated success manager",
    ],
    cta: "Request a demo",
    ctaStyle: "btn-accent",
  },
  {
    num: "03",
    name: "Strategic Partnership",
    tagline: "For ecosystem-scale portfolios",
    monthly: "Custom",
    annual: "Custom",
    per: "",
    features: [
      "Everything in Rollout",
      "Custom signal models + regional languages",
      "Portfolio-specific playbook engineering",
      "Co-developed learning pathways",
      "Quarterly business reviews",
    ],
    cta: "Speak to an expert",
    ctaStyle: "btn-ghost",
  },
];

export default function Pricing() {
  const [period, setPeriod] = useState("monthly");
  const [swapping, setSwapping] = useState(false);

  const switchTo = (next) => {
    if (next === period) return;
    setSwapping(true);
    setTimeout(() => {
      setPeriod(next);
      setSwapping(false);
    }, 250);
  };

  return (
    <>
      <div className="price-toggle">
        <button
          className={`pt-btn ${period === "monthly" ? "active" : ""}`}
          onClick={() => switchTo("monthly")}
        >
          Monthly
        </button>
        <button
          className={`pt-btn ${period === "annual" ? "active" : ""}`}
          onClick={() => switchTo("annual")}
        >
          Annual
        </button>
        <span className="pt-save">SAVE 17%</span>
      </div>

      <div className="price-grid">
        {PLANS.map((p) => (
          <article key={p.num} className={`price-card ${p.featured ? "price-featured" : ""}`}>
            {p.featured && <span className="price-pop">RECOMMENDED</span>}
            <span className="price-num">{p.num}</span>
            <h3>{p.name}</h3>
            <p className="price-for">{p.tagline}</p>
            <div className="price-line">
              <span className={`price-value ${swapping ? "swapping" : ""}`}>
                {period === "monthly" ? p.monthly : p.annual}
              </span>
              {p.per && <span className="price-per">{p.per}</span>}
            </div>
            <ul>
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <a href="#demo" className={`btn ${p.ctaStyle} btn-block`}>{p.cta}</a>
          </article>
        ))}
      </div>

      <p className="price-note">
        Prices in USD, billed per rep. Every plan includes the full signal engine,
        competitor firewall, and performance scoring, from day one of the pilot.
      </p>
    </>
  );
}
