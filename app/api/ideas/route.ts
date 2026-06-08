import { NextRequest, NextResponse } from "next/server";
import { listApproved, insertPending } from "@/lib/ideas/repo";
import { isSupabaseConfigured } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const CATEGORIES = new Set(["aiDev", "tools", "content", "analytics", "platform"]);

// Simple in-memory sliding-window rate limit (per server instance).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((ts) => now - ts < WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > MAX_PER_WINDOW;
}

function clientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "0.0.0.0";
}

export async function GET() {
  if (!isSupabaseConfigured()) return NextResponse.json({ ideas: [] });
  try {
    return NextResponse.json({ ideas: await listApproved() });
  } catch {
    return NextResponse.json({ ideas: [] });
  }
}

export async function POST(req: NextRequest) {
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "not_configured" }, { status: 503 });
  if (rateLimited(clientIp(req))) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  const title = String(body.title ?? "").trim();
  if (!title || title.length > 120) return NextResponse.json({ error: "invalid_title" }, { status: 400 });
  const description = String(body.desc ?? body.description ?? "").trim().slice(0, 400);
  const cat = body.category;
  const category = typeof cat === "string" && CATEGORIES.has(cat) ? cat : undefined;

  try {
    await insertPending({ title, description: description || undefined, category });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "insert_failed" }, { status: 500 });
  }
}
