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
    title: clean(body.title, 160) || null,
    company_size: clean(body.size, 60) || null,
    message: clean(body.message, 2000) || null,
    interest: clean(body.interest, 120) || null,
    page: clean(body.page, 200) || null,
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

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;

  if (!url || !key) {
    // Never lose a lead to a config mistake — surface it in the logs.
    console.error("Supabase env vars missing. Submission received:", entry);
    return NextResponse.json({ error: "The form isn't connected yet." }, { status: 500 });
  }

  try {
    const res = await fetch(`${url}/rest/v1/demo_requests`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(entry),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(`Supabase responded ${res.status}: ${detail}`);
    }
  } catch (err) {
    // Logged in full so a failed write can still be recovered from Vercel logs.
    console.error("Failed to record demo request:", err, entry);
    return NextResponse.json({ error: "We couldn't save your request." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
