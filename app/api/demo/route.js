import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const clean = (v, max = 500) => String(v ?? "").trim().slice(0, max);

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — a real browser never fills this.
  if (clean(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const entry = {
    name: clean(body.name, 120),
    email: clean(body.email, 200),
    company: clean(body.company, 160),
    title: clean(body.title, 160),
    size: clean(body.size, 60),
    message: clean(body.message, 2000),
    page: clean(body.page, 200),
    submittedAt: new Date().toISOString(),
  };

  if (!entry.name || !entry.email || !entry.company) {
    return NextResponse.json(
      { error: "Name, work email and company are required." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(entry.email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const endpoint = process.env.SHEET_WEBHOOK_URL;
  if (!endpoint) {
    // Never lose a lead to a config mistake — surface it in the logs.
    console.error("SHEET_WEBHOOK_URL is not set. Submission received:", entry);
    return NextResponse.json(
      { error: "The form isn't connected yet." },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      // text/plain keeps Apps Script from rejecting a CORS preflight.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...entry, token: process.env.SHEET_TOKEN || "" }),
      redirect: "follow",
    });
    if (!res.ok) throw new Error(`Sheet responded ${res.status}`);
  } catch (err) {
    console.error("Failed to record demo request:", err, entry);
    return NextResponse.json(
      { error: "We couldn't save your request." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
