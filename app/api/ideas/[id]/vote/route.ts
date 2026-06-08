import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomUUID } from "node:crypto";
import { addVote } from "@/lib/ideas/repo";
import { voterKey } from "@/lib/ideas/voterKey";
import { isSupabaseConfigured } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "not_configured" }, { status: 503 });
  const { id } = await params;

  const store = await cookies();
  let anon = store.get("anon")?.value;
  let setAnon = false;
  if (!anon) {
    anon = randomUUID();
    setAnon = true;
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "0.0.0.0";
  const ua = req.headers.get("user-agent") ?? "";
  const key = voterKey({ ip, ua, anon });

  try {
    const votes = await addVote(id, key);
    const res = NextResponse.json({ votes });
    if (setAnon) res.cookies.set("anon", anon, { httpOnly: true, sameSite: "lax", maxAge: 31536000, path: "/" });
    return res;
  } catch {
    return NextResponse.json({ error: "vote_failed" }, { status: 500 });
  }
}
