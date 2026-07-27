import { NextResponse } from "next/server";

// Must run on every request. Without this Next prerenders the route at build
// time and the cron would hit a cached response, never reaching Supabase.
export const dynamic = "force-dynamic";

// Supabase pauses free-tier projects after ~7 days without activity, which
// would make a demo request fail at exactly the wrong moment. A daily read
// keeps the project awake. Wired to Vercel Cron via vercel.json.
export async function GET() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;

  if (!url || !key) {
    return NextResponse.json({ ok: false, error: "not configured" }, { status: 500 });
  }

  try {
    const res = await fetch(`${url}/rest/v1/demo_requests?select=id&limit=1`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Supabase responded ${res.status}`);
  } catch (err) {
    console.error("Keep-alive ping failed:", err);
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  return NextResponse.json({ ok: true, at: new Date().toISOString() });
}
