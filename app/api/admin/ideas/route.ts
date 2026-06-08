import { NextRequest, NextResponse } from "next/server";
import { listPending, setStatus } from "@/lib/ideas/repo";
import { isSupabaseConfigured } from "@/lib/supabase/admin";

export const runtime = "nodejs";

function authed(req: NextRequest): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  return req.headers.get("x-admin-secret") === secret || req.cookies.get("admin")?.value === secret;
}

export async function GET(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!isSupabaseConfigured()) return NextResponse.json({ ideas: [] });
  return NextResponse.json({ ideas: await listPending() });
}

export async function POST(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  const body = (await req.json().catch(() => null)) as { id?: string; action?: string } | null;
  const id = String(body?.id ?? "");
  const action = body?.action;
  if (!id || (action !== "approve" && action !== "reject")) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  await setStatus(id, action === "approve" ? "approved" : "rejected");
  return NextResponse.json({ ok: true });
}
