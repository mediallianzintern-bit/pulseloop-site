"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SIZES = [
  "1–50 employees",
  "51–200 employees",
  "201–1,000 employees",
  "1,001–5,000 employees",
  "5,000+ employees",
];

const EMPTY = {
  name: "",
  email: "",
  company: "",
  title: "",
  size: "",
  message: "",
};

// Rejects the obvious junk without bouncing unusual but valid addresses.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function DemoModal() {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [serverError, setServerError] = useState("");

  const panelRef = useRef(null);
  const firstFieldRef = useRef(null);
  const restoreFocusRef = useRef(null);
  // Honeypot: bots fill every field they find, humans never see this one.
  const trapRef = useRef(null);

  const close = useCallback(() => {
    setOpen(false);
    restoreFocusRef.current?.focus?.();
  }, []);

  // Every "Request a demo" link on the page already points at #demo, so we
  // intercept those clicks rather than rewiring each component.
  useEffect(() => {
    const onClick = (e) => {
      const trigger = e.target.closest?.('a[href="#demo"]');
      if (!trigger) return;
      e.preventDefault();
      restoreFocusRef.current = trigger;
      setStatus("idle");
      setServerError("");
      setErrors({});
      setOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Let a shared /#demo link open the form straight away.
  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === "#demo") setOpen(true);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  // Lock the page behind the modal without letting it jump to the top.
  useEffect(() => {
    if (!open) return;
    const { overflow, paddingRight } = document.body.style;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [open]);

  useEffect(() => {
    if (open) firstFieldRef.current?.focus();
  }, [open]);

  // Esc to dismiss, Tab cycles inside the dialog.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = panelRef.current?.querySelectorAll(
        'button, input, select, textarea, a[href]'
      );
      if (!focusables?.length) return;
      const list = Array.from(focusables).filter((el) => !el.disabled && el.tabIndex !== -1);
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  const setField = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.email.trim()) next.email = "Please enter your work email.";
    else if (!EMAIL_RE.test(values.email.trim())) next.email = "That doesn't look like a valid email.";
    if (!values.company.trim()) next.company = "Please enter your company.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    if (trapRef.current?.value) return; // bot
    if (!validate()) return;

    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          page: window.location.pathname,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("done");
      setValues(EMPTY);
    } catch (err) {
      setStatus("error");
      setServerError(err.message || "Something went wrong.");
    }
  };

  if (!open) return null;

  return (
    <div
      className="dm-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        className="dm-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dm-title"
        ref={panelRef}
      >
        <button className="dm-close" onClick={close} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {status === "done" ? (
          <div className="dm-done">
            <div className="dm-tick" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="m20 6-11 11-5-5" />
              </svg>
            </div>
            <h2 className="dm-title" id="dm-title">Request received</h2>
            <p className="dm-sub">
              Thanks — someone from the PulseLoop team will be in touch within one
              business day to arrange your demo.
            </p>
            <button className="btn btn-accent" onClick={close}>Close</button>
          </div>
        ) : (
          <>
            <h2 className="dm-title" id="dm-title">Request a demo</h2>
            <p className="dm-sub">
              See the Dual-Loop platform on your own sales scenarios. Tell us a
              little about your team and we&apos;ll set it up.
            </p>

            <form className="dm-form" onSubmit={onSubmit} noValidate>
              <input
                ref={trapRef}
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="dm-trap"
              />

              <div className="dm-row">
                <Field
                  label="Full name" required id="dm-name" error={errors.name}
                  value={values.name} onChange={setField("name")}
                  inputRef={firstFieldRef} autoComplete="name"
                />
                <Field
                  label="Work email" required id="dm-email" type="email" error={errors.email}
                  value={values.email} onChange={setField("email")} autoComplete="email"
                />
              </div>

              <div className="dm-row">
                <Field
                  label="Company" required id="dm-company" error={errors.company}
                  value={values.company} onChange={setField("company")} autoComplete="organization"
                />
                <Field
                  label="Job title" id="dm-title-field"
                  value={values.title} onChange={setField("title")} autoComplete="organization-title"
                />
              </div>

              <div className="dm-field">
                <label htmlFor="dm-size">Company size</label>
                <select id="dm-size" value={values.size} onChange={setField("size")}>
                  <option value="">Select…</option>
                  {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="dm-field">
                <label htmlFor="dm-message">Anything specific you want to see?</label>
                <textarea
                  id="dm-message" rows={3} value={values.message}
                  onChange={setField("message")}
                  placeholder="e.g. live objection handling in Hinglish, manager dashboards…"
                />
              </div>

              {status === "error" && (
                <p className="dm-error-banner" role="alert">
                  {serverError} Please try again, or email us directly.
                </p>
              )}

              <button
                type="submit"
                className="btn btn-accent btn-block"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : "Request a demo"}
              </button>
              <p className="dm-fine">
                We&apos;ll only use these details to contact you about PulseLoop.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Field({ label, id, error, required, type = "text", value, onChange, inputRef, autoComplete }) {
  return (
    <div className="dm-field">
      <label htmlFor={id}>
        {label}{required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        ref={inputRef}
        autoComplete={autoComplete}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        className={error ? "has-error" : undefined}
      />
      {error && <span className="dm-err" id={`${id}-err`}>{error}</span>}
    </div>
  );
}
