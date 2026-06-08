import { supabaseAdmin } from "@/lib/supabase/admin";

export type IdeaStatus = "pending" | "approved" | "rejected";

export type IdeaRow = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  author_handle: string | null;
  status: IdeaStatus;
  created_at: string;
};

export type PublicIdea = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  handle: string | null;
  votes: number;
  createdAt: string;
};

async function voteCounts(ideaIds: string[]): Promise<Map<string, number>> {
  const counts = new Map<string, number>();
  if (ideaIds.length === 0) return counts;
  const sb = supabaseAdmin();
  const { data } = await sb.from("lab_votes").select("idea_id").in("idea_id", ideaIds);
  for (const row of (data ?? []) as { idea_id: string }[]) {
    counts.set(row.idea_id, (counts.get(row.idea_id) ?? 0) + 1);
  }
  return counts;
}

/** Approved ideas with vote counts, most-voted first. */
export async function listApproved(): Promise<PublicIdea[]> {
  const sb = supabaseAdmin();
  const { data, error } = await sb.from("lab_ideas").select("*").eq("status", "approved");
  if (error) throw error;
  const rows = (data ?? []) as IdeaRow[];
  const counts = await voteCounts(rows.map((r) => r.id));
  return rows
    .map((r) => ({
      id: r.id,
      title: r.title,
      description: r.description,
      category: r.category,
      handle: r.author_handle,
      votes: counts.get(r.id) ?? 0,
      createdAt: r.created_at,
    }))
    .sort((a, b) => b.votes - a.votes || (a.createdAt < b.createdAt ? 1 : -1));
}

export type NewIdea = { title: string; description?: string; category?: string; authorHandle?: string };

/** Insert a submission as pending (awaiting moderation). */
export async function insertPending(input: NewIdea): Promise<void> {
  const sb = supabaseAdmin();
  const { error } = await sb.from("lab_ideas").insert({
    title: input.title,
    description: input.description ?? null,
    category: input.category ?? null,
    author_handle: input.authorHandle ?? null,
    status: "pending",
  });
  if (error) throw error;
}

/** Record a vote (idempotent via unique constraint) and return the new count. */
export async function addVote(ideaId: string, key: string): Promise<number> {
  const sb = supabaseAdmin();
  await sb.from("lab_votes").upsert({ idea_id: ideaId, voter_key: key }, { onConflict: "idea_id,voter_key", ignoreDuplicates: true });
  const { count } = await sb.from("lab_votes").select("*", { count: "exact", head: true }).eq("idea_id", ideaId);
  return count ?? 0;
}

/* ---- moderation ---- */
export async function listPending(): Promise<IdeaRow[]> {
  const sb = supabaseAdmin();
  const { data, error } = await sb.from("lab_ideas").select("*").eq("status", "pending").order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as IdeaRow[];
}

export async function setStatus(id: string, status: IdeaStatus): Promise<void> {
  const sb = supabaseAdmin();
  const { error } = await sb.from("lab_ideas").update({ status }).eq("id", id);
  if (error) throw error;
}
