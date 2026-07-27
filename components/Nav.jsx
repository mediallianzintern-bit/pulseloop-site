"use client";

import { useEffect, useState } from "react";

const LINKS = [
  ["#features", "Features"],
  ["#dual-loop", "Dual-Loop"],
  ["#pricing", "Engagement"],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <>
      <header className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="container nav-inner">
          <a href="#top" className="brand">
            <img
              src="/logo.png"
              alt="PulseLoop"
              className="brand-logo"
              width={452}
              height={96}
            />
          </a>
          <nav className="nav-links" aria-label="Primary">
            {LINKS.map(([href, label]) => (
              <a key={href} href={href}>{label}</a>
            ))}
          </nav>
          <div className="nav-actions">
            <a href="#" className="nav-signin">Sign in</a>
            <a href="#demo" data-demo="Nav — Request a demo" className="btn btn-accent btn-sm">Request a demo</a>
            <button
              className="nav-burger"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              <span /><span />
            </button>
          </div>
        </div>
      </header>

      <div className="mobile-menu">
        <nav aria-label="Mobile">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <a href="#" className="mm-signin" onClick={() => setOpen(false)}>Sign in</a>
          <a href="#demo" data-demo="Mobile menu — Request a demo" className="btn btn-accent" onClick={() => setOpen(false)}>
            Request a demo
          </a>
        </nav>
      </div>
    </>
  );
}
