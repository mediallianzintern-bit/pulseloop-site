# PulseLoop — Marketing Website

A **Next.js + React** one-page site for PulseLoop — the AI-enabled sales
assistant for media organizations (Dual-Loop Architecture: sales enablement +
adaptive learning).

Minimal aesthetic: porcelain white, graphite ink, calm indigo accent
(`#4c5bd4`), Inter + JetBrains Mono.

## Stack

- Next.js 14 (App Router, static export) + React 18
- No CSS framework — design system lives in `app/globals.css`
- Fonts via `next/font` (Inter, JetBrains Mono)

```
app/
  layout.jsx      # fonts + metadata
  page.jsx        # all sections (content lives here)
  globals.css     # design system + keyframes
  icon.svg        # favicon
components/
  Nav.jsx         # fixed nav + mobile menu
  Hero.jsx        # headline + CTAs
  DualLoop.jsx    # signature animation — see below
  CallSim.jsx     # live-call.log typewriter with signal chips
  RoleDashboards.jsx  # Rep / Manager / L&D login previews (Role-based section)
  CountUp.jsx     # scoring numbers
  Clock.jsx       # live clock
  Who.jsx         # who-we-serve tab carousel
  Pricing.jsx     # $29 / $49 / Custom + monthly-annual toggle
  Reveal.jsx      # IntersectionObserver reveal wrapper
legacy-static/    # previous static (Wispr-style) version, kept for reference
```

## The Dual-Loop animations

Two SVG infinity loops with text flowing along both lobes (`textPath` offsets
driven by `requestAnimationFrame`); both pause off-screen and respect
`prefers-reduced-motion`.

**Hero** (`components/Hero.jsx` → `DualLoopFlow`): the architecture at a
glance — enablement events orbit the left lobe, learning events (indigo) orbit
the right, "THE CALL" node sits at the intersection with a cycling signal chip.

**Dual-Loop section** (`components/DualLoop.jsx`, below the live-call terminal,
before Capabilities): the product told as a sequenced story where the loop PATH
draws in step with each beat —

1. **The rep asks** (Q card, left) → the **left lobe draws** into the PULSELOOP
   pill (accent overlay, `strokeDashoffset` → 0.5)
2. **PulseLoop answers** (A card, indigo, right) → the **right lobe fills**
   (→ 0.8)
3. **Gap detected** popup → path pushes to **90%** (→ 0.9)
4. **Drill assigned** popup → the **loop closes to 100%** with a glow (→ 0)

Card text stays upright/readable; a faint dashed figure-8 is the guide and two
dots orbit it. The accent draw uses a single continuous figure-8 `<path>` with
`pathLength={1}`, offset driven by phase.

## Develop

```bash
npm install
npm run dev        # http://localhost:4173
```

## Build & deploy

```bash
npm run build      # static export in out/
```

Deploys anywhere: **Vercel** (`npx vercel` — zero config), Netlify, or any
static host serving `out/`.

## Editing content

- **Section copy, stats, features, pricing plans** — data arrays at the top of
  `app/page.jsx` and `components/Pricing.jsx`
- **Loop texts + popup stages** — constants in `components/DualLoop.jsx`
- **Call transcript** — `SCRIPT` in `components/CallSim.jsx`
- **Colors & type** — CSS variables at the top of `app/globals.css`

Placeholder links (`href="#"`): Sign in, CTA buttons, Company/Legal footer
links, socials — replace when the destinations exist.
