import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Reveal from "../components/Reveal";
import DualLoop from "../components/DualLoop";
import CallSim from "../components/CallSim";
import RoleDashboards from "../components/RoleDashboards";
import CountUp from "../components/CountUp";
import Clock from "../components/Clock";
import Who from "../components/Who";
import Pricing from "../components/Pricing";

const STATS = [
  { value: "15–20", unit: "min", label: "lost per rep, per day, to searching" },
  { value: "600+", unit: "hrs", label: "lost monthly per 100-rep team" },
  { value: "2", unit: "loops", label: "enablement + adaptive learning" },
  { value: "2", unit: "langs", label: "detected live in English + Hinglish" },
  { value: "2", unit: "min", label: "practice drills, triggered by real calls" },
];

const PROBLEMS = [
  {
    num: "01",
    title: "The Search Tax",
    body: "Sales reps waste 15–20 minutes every day hunting for rate cards and case studies, costing a 100-person team more than 600 hours every single month.",
    foot: "15–20 MIN · REP · DAY",
  },
  {
    num: "02",
    title: "Inconsistent Deal-Making",
    body: "Relying on individual experience over shared intelligence leads to inconsistent discounting and packaging, reducing yield and distorting revenue forecasts.",
    foot: "YIELD ↓ · FORECASTS DISTORTED",
  },
  {
    num: "03",
    title: "Static, Generic Training",
    body: "Traditional training happens away from the desk. It never corrects the real-time performance gaps or subtle hesitations that cost reps the deal.",
    foot: "0 REAL-TIME CORRECTION",
  },
];

const STEPS = [
  {
    num: "I",
    title: "The Sales Enablement Loop",
    body: "PulseLoop operates quietly in the background of live client interactions, anticipating objections, retrieving exact rate cards, and delivering contextual recommendations that keep deals moving forward.",
  },
  {
    num: "II",
    title: "The Adaptive Learning Loop",
    body: "As reps sell, the AI listens. It spots where a rep hesitates, leans on filler words, or struggles with product knowledge, then translates those signals into structured, personalised micro-learning for your L&D team.",
  },
  {
    num: "III",
    title: "The loops reinforce each other",
    body: "Every call sharpens the training. Every drill sharpens the next call. Business performance and personal development, finally on the same flywheel.",
  },
];

const FEATURES = [
  {
    num: "01",
    title: "Contextual Pitch Generation",
    body: "Instantly generate professional, data-backed client pitch documents, fusing your internal playbooks, market intelligence like Comscore and dentsu, and industry case studies into targeted proposals.",
    spec: <>SOURCES · PLAYBOOKS + COMSCORE + DENTSU</>,
  },
  {
    num: "02",
    title: "Hinglish & Regional Signal Detection",
    body: "Custom-built for the Indian media landscape. Hesitations, objections, filler words, competitor mentions, and churn risks, detected in English and Hinglish alike.",
    spec: <>NLP · &quot;YEH RATE THODA ZYADA HAI…&quot; → S-01</>,
  },
  {
    num: "03",
    title: (
      <>
        Competitor Firewall <span className="feat-sub">(Block D)</span>
      </>
    ),
    body: "Every generated pitch is scanned before it reaches a client. Unauthorised competitor names and unverified metrics are blocked from client-facing materials automatically.",
    spec: (
      <>
        BLOCKED · <s>SPOTIFY</s> <s>AMAZON ADS</s> · UNVERIFIED METRICS
      </>
    ),
  },
  {
    num: "04",
    title: "Automated Performance Scoring",
    body: "Eliminate subjective call reviews. Objective metrics from live transcripts: Hesitation, Objection Handling, Filler Word, and Product Knowledge scores for every rep.",
    spec: <>SCORES · HES / OBJ / FILL / KNOW</>,
  },
  {
    num: "05",
    title: "Gap Analysis & Microlearning",
    body: "A continuous pattern analyser sorts rep struggles into Product, Objection, or Confidence gaps, then triggers targeted two-minute practice drills.",
    spec: <>GAP → DRILL · 2 MIN · AUTO-ASSIGNED</>,
  },
  {
    num: "06",
    title: "Non-Intrusive Enterprise Integration",
    body: "An orchestration layer over your existing CRM and LMS. It never replaces your systems of record, so adoption stays secure, compliant, and friction-free.",
    spec: <>ORCHESTRATES · YOUR CRM + YOUR LMS</>,
  },
];

const SIGNALS = [
  { name: "Hesitation", id: "S-01", color: "#c9a227" },
  { name: "Objection", id: "S-02", color: "#d9534a" },
  { name: "Filler words", id: "S-03", color: "#d98e2b" },
  { name: "Competitor mention", id: "S-04", color: "#c9a227" },
  { name: "Churn risk", id: "S-05", color: "#d9534a" },
  { name: "Product gap", id: "G-01", color: "#7a5af8" },
  { name: "Objection gap", id: "G-02", color: "#d98e2b" },
  { name: "Confidence gap", id: "G-03", color: "#4c8df6" },
];

const ORCH_ROWS = [
  ["crm", "Your system of record", "synced"],
  ["lms", "Your learning delivery", "synced"],
  ["playbooks", "Internal product playbooks", "28 docs"],
  ["rate-cards", "Every format, always current", "live"],
  ["reports", "Comscore · dentsu · Madison", "indexed"],
  ["firewall", "Block D competitor lists", "loaded"],
  ["scoring", "Performance score engine", "on"],
];

const METRICS = [
  { to: 92, format: "int", w: "92%", label: "Objection Handling Score" },
  { to: 88, format: "int", w: "88%", label: "Product Knowledge Score" },
  { to: 81, format: "int", w: "81%", label: "Hesitation Score" },
  { to: 5.2, format: "pct", w: "5.2%", label: "Filler-word rate" },
];

const ECO = [
  ["Connected TV", "CTV"],
  ["Programmatic", "DSP"],
  ["Video", "INSTREAM"],
  ["mCanvas", "RICH MEDIA"],
  ["Display", "BANNERS"],
  ["OTT", "STREAMING"],
  ["Television", "BROADCAST"],
  ["Print", "PUBLISHING"],
  ["Your CRM", "SYSTEM OF RECORD"],
  ["Your LMS", "LEARNING DELIVERY"],
  ["Comscore", "MARKET INTEL"],
  ["dentsu-e4m", "MARKET REPORTS"],
  ["Madison PMAR", "MARKET REPORTS"],
  ["Google Meet", "LIVE CALLS"],
  ["Zoom", "LIVE CALLS"],
  ["Microsoft Teams", "LIVE CALLS"],
];

const GOVERNANCE = [
  {
    title: "Competitor firewall: Block D safeguard",
    body: "Every generated pitch is scanned before it reaches a client. Unauthorised competitor names and unverified metrics are blocked automatically.",
  },
  {
    title: "Your systems of record stay yours",
    body: "PulseLoop orchestrates over your CRM and LMS. It never replaces them, so adoption is secure, compliant, and friction-free.",
  },
  {
    title: "Verified data only",
    body: "Pitches are built from your playbooks and verified market reports (Comscore, dentsu-e4m, Madison), never from invented numbers.",
  },
  {
    title: "Role-based access",
    body: "Reps, managers, and L&D each see exactly what they need: signals for the field, patterns for the classroom.",
  },
];

const ROLE_POINTS = [
  ["Reps", "Own calls, signals, and a Practice tab no other role has, with training auto-assigned."],
  ["Managers", "Whole-team calls and scores, plus Accounts and Analytics views."],
  ["L&D", "Builds the training modules, tracks skill gaps and completion org-wide."],
  ["Shared", "One Assistant and one notification bell across all three roles."],
];

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />

        {/* ---------- stats ---------- */}
        <div className="stats">
          <div className="container stats-row">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 60} className="stat">
                <span className="stat-value">
                  {s.value}
                  <span className="stat-unit">{s.unit}</span>
                </span>
                <span className="stat-label">{s.label}</span>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ---------- problem ---------- */}
        <section className="section" id="problem">
          <div className="container">
            <Reveal><p className="overline">The problem</p></Reveal>
            <Reveal delay={80}><h2 className="section-title">Why media sales teams struggle.</h2></Reveal>
            <Reveal delay={160}>
              <p className="section-sub">
                In today&apos;s fast-paced media environment, reps juggle TV, print,
                digital, and OTT formats, and three critical bottlenecks follow.
              </p>
            </Reveal>

            <Reveal delay={160}>
              <div className="cols-3">
                {PROBLEMS.map((p) => (
                  <article key={p.num} className="col-item">
                    <span className="col-num">{p.num}</span>
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                    <span className="col-foot">{p.foot}</span>
                  </article>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="cmp-stack">
                <div className="cmp-card cmp-slow">
                  <span className="cmp-label">Without PulseLoop</span>
                  <h3 className="cmp-title">15–20 minutes of searching</h3>
                  <div className="stream" aria-hidden="true">
                    <div className="stream-track" style={{ "--stream-dur": "70s" }}>
                      <span>
                        umm, one second… checking the shared drive… was it the Q2 folder?…
                        pinging my manager for the CTV rate card… scrolling last month&apos;s
                        email thread… opening another spreadsheet… the client has gone quiet…&nbsp;
                      </span>
                      <span>
                        umm, one second… checking the shared drive… was it the Q2 folder?…
                        pinging my manager for the CTV rate card… scrolling last month&apos;s
                        email thread… opening another spreadsheet… the client has gone quiet…&nbsp;
                      </span>
                    </div>
                  </div>
                  <span className="cmp-foot">THE SEARCH TAX · 600+ HOURS / MONTH / 100 REPS</span>
                </div>
                <div className="cmp-card cmp-fast">
                  <span className="cmp-label">With PulseLoop</span>
                  <h3 className="cmp-title">Answers in seconds</h3>
                  <div className="stream" aria-hidden="true">
                    <div className="stream-track" style={{ "--stream-dur": "14s" }}>
                      <span>
                        CTV Q2 rate card retrieved · mCanvas bundle suggested · Comscore
                        reach pulled · objection anticipated · Hinglish signal detected ·
                        case study attached · next step logged · pitch updated ·&nbsp;
                      </span>
                      <span>
                        CTV Q2 rate card retrieved · mCanvas bundle suggested · Comscore
                        reach pulled · objection anticipated · Hinglish signal detected ·
                        case study attached · next step logged · pitch updated ·&nbsp;
                      </span>
                    </div>
                  </div>
                  <span className="cmp-foot">RATE CARDS · CASE STUDIES · MARKET DATA · LIVE</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------- dual-loop ---------- */}
        <section className="section section-alt" id="dual-loop">
          <div className="container">
            <Reveal><p className="overline">The solution: Dual-Loop Architecture</p></Reveal>
            <Reveal delay={80}><h2 className="section-title">One platform. Two loops.</h2></Reveal>
            <Reveal delay={160}>
              <p className="section-sub">
                PulseLoop doesn&apos;t force you to choose between a sales tool and a
                training platform. Learning and performance constantly reinforce each other.
              </p>
            </Reveal>

            <div className="process-grid">
              <Reveal delay={120}>
                <div className="steps">
                  {STEPS.map((s) => (
                    <div key={s.num} className="step">
                      <span className="step-num">{s.num}</span>
                      <div>
                        <h3>{s.title}</h3>
                        <p>{s.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={220}>
                <CallSim />
              </Reveal>
            </div>

            <Reveal delay={120}>
              <DualLoop />
            </Reveal>
          </div>
        </section>

        {/* ---------- features ---------- */}
        <section className="section" id="features">
          <div className="container">
            <Reveal><p className="overline">Capabilities</p></Reveal>
            <Reveal delay={80}>
              <h2 className="section-title">
                Built for the complexities of
                <br />
                enterprise media sales.
              </h2>
            </Reveal>

            <Reveal delay={160}>
              <div className="feat-grid">
                {FEATURES.map((f) => (
                  <article key={f.num} className="feat">
                    <span className="feat-num">{f.num}</span>
                    <h3>{f.title}</h3>
                    <p>{f.body}</p>
                    <span className="feat-spec">{f.spec}</span>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------- signals ---------- */}
        <section className="section section-alt" id="signals">
          <div className="container">
            <Reveal><p className="overline">Signal detection</p></Reveal>
            <Reveal delay={80}><h2 className="section-title">Every signal, caught live.</h2></Reveal>

            <Reveal delay={140}>
              <div className="sig-panel">
                <div>
                  <h2 className="section-title" style={{ fontSize: "clamp(1.5rem, 2.6vw, 2rem)" }}>
                    Detected in English
                    <br />+ Hinglish, as it happens.
                  </h2>
                  <p className="sig-panel-sub">
                    Every hesitation, objection, and gap, caught the moment it
                    happens, scored, and fed into the learning loop.
                  </p>
                </div>
                <div className="sig-list">
                  {SIGNALS.map((s) => (
                    <div key={s.id} className="sig-row">
                      <span className="sdot" style={{ background: s.color }} />
                      {s.name}
                      <span className="sig-id">{s.id}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------- orchestration ---------- */}
        <section className="section" id="integration">
          <div className="container">
            <div className="split">
              <div>
                <Reveal><p className="overline">Enterprise integration</p></Reveal>
                <Reveal delay={80}>
                  <h2 className="section-title">An orchestration layer. Not another system.</h2>
                </Reveal>
                <Reveal delay={160}>
                  <p className="section-sub">
                    PulseLoop sits over the platforms you already run (CRM for deals,
                    LMS for learning) and quietly keeps both loops fed. Nothing gets
                    replaced. Nothing gets duplicated.
                  </p>
                </Reveal>
                <Reveal delay={240}>
                  <div className="mini-stats">
                    <div>
                      <span className="mini-value">0</span>
                      <span className="mini-label">systems of record replaced</span>
                    </div>
                    <div>
                      <span className="mini-value">2</span>
                      <span className="mini-label">loops fed from one platform</span>
                    </div>
                    <div>
                      <span className="mini-value">100%</span>
                      <span className="mini-label">of pitches firewall-scanned</span>
                    </div>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={160}>
                <div className="panel">
                  <div className="panel-head">
                    <span className="panel-title">ORCHESTRATION STATUS</span>
                    <span className="panel-ok">
                      <span className="dot dot-live" />ALL CONNECTIONS HEALTHY
                    </span>
                  </div>
                  <div>
                    {ORCH_ROWS.map(([name, desc, port]) => (
                      <div key={name} className="panel-row">
                        <span className="dot dot-live" />
                        <span className="pr-name">{name}</span>
                        <span className="pr-desc">{desc}</span>
                        <span className="pr-port">{port}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------- scoring ---------- */}
        <section className="section section-alt" id="scoring">
          <div className="container">
            <div className="metrics-head">
              <div>
                <Reveal><p className="overline">Automated performance scoring</p></Reveal>
                <Reveal delay={80}>
                  <h2 className="section-title">Every call, objectively scored.</h2>
                </Reveal>
              </div>
              <Reveal delay={160}>
                <div className="metrics-live">
                  <span className="dot dot-live" />LIVE<span className="sep">/</span>
                  <Clock />
                </div>
              </Reveal>
            </div>
            <Reveal delay={140}>
              <div className="metrics-grid">
                {METRICS.map((m) => (
                  <div key={m.label} className="metric">
                    <CountUp to={m.to} format={m.format} className="metric-value" />
                    <span className="metric-bar">
                      <span className="metric-fill" style={{ "--w": m.w }} />
                    </span>
                    <span className="metric-label">{m.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------- ecosystem ---------- */}
        <section className="section" id="ecosystem">
          <div className="container">
            <Reveal><p className="overline">Use cases</p></Reveal>
            <Reveal delay={80}>
              <h2 className="section-title">
                Engineered for high-velocity
                <br />
                media ecosystems.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="section-sub">
                Explicitly mapped for the vast product portfolios of enterprise media
                and telecom, and orchestrated over the systems you already run.
              </p>
            </Reveal>

            <Reveal delay={160}>
              <div className="eco-grid">
                {ECO.map(([name, cat]) => (
                  <div key={name} className="eco-cell">
                    <span className="eco-name">{name}</span>
                    <span className="eco-cat">{cat}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------- governance ---------- */}
        <section className="section section-alt" id="security">
          <div className="container">
            <div className="split">
              <div>
                <Reveal><p className="overline">Governance</p></Reveal>
                <Reveal delay={80}><h2 className="section-title">Trust is non-negotiable.</h2></Reveal>
                <Reveal delay={160}>
                  <p className="section-sub">
                    Client-facing AI has to be governed. PulseLoop is built so nothing
                    unverified ever reaches a pitch, and nothing you own gets displaced.
                  </p>
                </Reveal>
                <Reveal delay={240}>
                  <p className="gov-tags">
                    BLOCK D FIREWALL · ORCHESTRATION LAYER · VERIFIED SOURCES ·
                    ROLE-BASED · COMPLIANT
                  </p>
                </Reveal>
              </div>
              <Reveal delay={160}>
                <div className="sec-list">
                  {GOVERNANCE.map((g) => (
                    <div key={g.title} className="sec-item">
                      <h3>{g.title}</h3>
                      <p>{g.body}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------- role-based logins ---------- */}
        <section className="section" id="implementation">
          <div className="container">
            <div className="split">
              <div>
                <Reveal><p className="overline">Role-based by design</p></Reveal>
                <Reveal delay={80}>
                  <h2 className="section-title">One login for every seat.</h2>
                </Reveal>
                <Reveal delay={160}>
                  <p className="section-sub">
                    Rep, Manager, and L&amp;D each sign in to a workspace built for their
                    job, while sharing one Assistant and one notification bell, where
                    every detected gap becomes an assigned drill.
                  </p>
                </Reveal>
                <Reveal delay={240}>
                  <div className="dev-points">
                    {ROLE_POINTS.map(([title, body]) => (
                      <div key={title}>
                        <h4>{title}</h4>
                        <p>{body}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>

              <Reveal delay={160}>
                <RoleDashboards />
                <div className="dev-links">
                  <a href="#demo">REQUEST A DEMO</a>
                  <span className="sep">/</span>
                  <a href="#demo">SPEAK TO AN EXPERT</a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------- who we serve ---------- */}
        <section className="section section-alt" id="who">
          <div className="container">
            <Reveal><p className="overline">Who we serve</p></Reveal>
            <Reveal delay={80}>
              <h2 className="section-title">Built for every side of the desk.</h2>
            </Reveal>
            <Reveal delay={160}>
              <Who />
            </Reveal>
          </div>
        </section>

        {/* ---------- pricing ---------- */}
        <section className="section" id="pricing">
          <div className="container">
            <Reveal><p className="overline">Pricing</p></Reveal>
            <Reveal delay={80}>
              <h2 className="section-title">Start with a pilot. Scale with proof.</h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="section-sub">
                Simple per-rep pricing. Prove the impact with one pod, then roll out
                on evidence.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <Pricing />
            </Reveal>
          </div>
        </section>

        {/* ---------- cta ---------- */}
        <section className="cta-section" id="demo">
          <div className="container">
            <Reveal>
              <div className="cta-panel">
                <h2 className="cta-title">
                  Stop separating sales execution
                  <br />
                  from sales training.
                </h2>
                <p className="cta-sub">
                  Close the gap between what your salespeople do in the field and what
                  they learn in the classroom. Ready to transform your sales ecosystem?
                </p>
                <div className="cta-btns">
                  <a href="#" className="btn btn-accent">Start your pilot deployment</a>
                  <a href="#" className="btn btn-ghost">Speak to an AI enablement expert</a>
                </div>
                <p className="cta-note">
                  SALES ENABLEMENT + ADAPTIVE LEARNING · ONE PLATFORM
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ---------- footer ---------- */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#top" className="brand">
                <span className="brand-mark" aria-hidden="true" />
                PulseLoop
              </a>
              <p>
                The AI-enabled sales assistant for media organizations. Sales
                execution and corporate training, finally in one loop.
              </p>
              <div className="footer-social">
                <a
                  href="https://www.linkedin.com/in/digitalmarketingtrainer/"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125M7.119 20.452H3.555V9h3.564zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="footer-col">
              <h5>PRODUCT</h5>
              <a href="#problem">The problem</a>
              <a href="#dual-loop">Dual-Loop Architecture</a>
              <a href="#features">Features</a>
              <a href="#who">Who we serve</a>
            </div>
            <div className="footer-col">
              <h5>PLATFORM</h5>
              <a href="#ecosystem">Integrations</a>
              <a href="#scoring">Performance scoring</a>
              <a href="#security">Security &amp; firewall</a>
              <a href="#implementation">Roles &amp; logins</a>
            </div>
            <div className="footer-col">
              <h5>COMPANY</h5>
              <a href="#">About</a>
              <a href="#">Blog</a>
              <a href="#">Careers</a>
              <a href="#">Contact</a>
            </div>
            <div className="footer-col">
              <h5>LEGAL</h5>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#security">Security</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} PulseLoop. All rights reserved.</span>
            <span className="footer-status">
              <span className="dot dot-live" />BOTH LOOPS OPERATIONAL
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
