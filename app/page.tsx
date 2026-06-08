import CosmosHome from "@/components/CosmosHome";
import type { VisitorItem } from "@/components/overlays/bodies/VisitorBody";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import { listApproved } from "@/lib/ideas/repo";
import { fetchGithub } from "@/lib/github";

function relativeTime(iso: string): string {
  const m = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (m < 1) return "now";
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}

async function loadVisitorIdeas(): Promise<VisitorItem[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const ideas = await listApproved();
    return ideas.map((i) => ({
      id: i.id,
      title: i.title,
      handle: i.handle ?? "@anon",
      time: relativeTime(i.createdAt),
      votes: i.votes,
    }));
  } catch {
    return [];
  }
}

export default async function Home() {
  const [visitorIdeas, github] = await Promise.all([loadVisitorIdeas(), fetchGithub()]);
  return <CosmosHome github={github} visitorIdeas={visitorIdeas} />;
}
