const MODELS = [
  {
    num: "01",
    name: "Pilot Deployment",
    tagline: "Controlled validation with one sales team",
    commercial: "Fixed pilot fee",
    basis: "Based on scope, number of users and integrations",
    features: [
      "4–6 week guided pilot",
      "Defined sales use case and success criteria",
      "Enterprise-content and playbook setup",
      "Controlled user group onboarding",
      "Baseline and pilot outcome report",
      "Governance and data-readiness review",
    ],
    cta: "Discuss a pilot",
    ctaStyle: "btn-ghost",
  },
  {
    num: "02",
    name: "Enterprise Rollout",
    tagline: "Scale the validated use case across teams",
    commercial: "Annual enterprise license",
    basis: "Priced by users, modules and integration scope",
    featured: true,
    features: [
      "Everything included in the pilot",
      "CRM and LMS integration",
      "Role-based dashboards for sales, managers and L&D",
      "Adaptive learning recommendations",
      "Media-specific playbooks and knowledge configuration",
      "Dedicated implementation and customer-success support",
    ],
    cta: "Request an enterprise proposal",
    ctaStyle: "btn-accent",
  },
  {
    num: "03",
    name: "Strategic Partnership",
    tagline: "For multi-business, multi-market or platform deployments",
    commercial: "Custom commercial agreement",
    features: [
      "Everything included in Enterprise Rollout",
      "Multiple teams, business units or markets",
      "Regional-language and custom signal models",
      "Portfolio-specific playbook development",
      "Co-developed learning pathways",
      "Enterprise governance and quarterly reviews",
    ],
    cta: "Speak with our team",
    ctaStyle: "btn-ghost",
  },
];

export default function Pricing() {
  return (
    <>
      <div className="price-grid">
        {MODELS.map((m) => (
          <article key={m.num} className={`price-card ${m.featured ? "price-featured" : ""}`}>
            {m.featured && <span className="price-pop">RECOMMENDED</span>}
            <span className="price-num">{m.num}</span>
            <h3>{m.name}</h3>
            <p className="price-for">{m.tagline}</p>
            <div className="price-commercial">
              <span className="price-model">{m.commercial}</span>
              {m.basis && <span className="price-basis">{m.basis}</span>}
            </div>
            <ul>
              {m.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <a
              href="#demo"
              data-demo={m.name}
              className={`btn ${m.ctaStyle} btn-block`}
            >
              {m.cta}
            </a>
          </article>
        ))}
      </div>

      <p className="price-note">
        Pricing is provided after a discovery and scope assessment. Commercials may
        include an implementation fee, annual platform licensing and optional
        integration or customization charges.
      </p>
    </>
  );
}
