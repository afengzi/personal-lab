/* Server-side GitHub presence: public profile, repo count, and recent public
   events. Cached via Next fetch revalidation; token optional (raises rate limit)
   and never reaches the client. Returns null on failure so callers can fall back. */

export type GithubProfile = {
  handle: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  url: string;
  avatarUrl: string;
  repos: number;
  followers: string;
  following: number;
};

export type GithubEvent = {
  icon: string;
  tone: string;
  title: string;
  sub: string;
  time: string;
};

const REVALIDATE = 1800; // 30 min

function authHeaders(): HeadersInit {
  const h: Record<string, string> = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
}

function compact(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : String(n);
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "now";
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}

const EVENT_META: Record<string, { icon: string; tone: string }> = {
  PushEvent: { icon: "git-commit-horizontal", tone: "var(--green)" },
  PullRequestEvent: { icon: "git-pull-request", tone: "var(--cyan)" },
  IssuesEvent: { icon: "circle-dot", tone: "var(--amber)" },
  WatchEvent: { icon: "star", tone: "var(--amber)" },
  CreateEvent: { icon: "git-branch", tone: "var(--purple)" },
  ForkEvent: { icon: "git-merge", tone: "var(--purple)" },
};

export async function fetchGithub(): Promise<{ profile: GithubProfile; events: GithubEvent[] } | null> {
  const handle = process.env.GITHUB_HANDLE || "afengzi";
  try {
    const [userRes, eventsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${handle}`, { headers: authHeaders(), next: { revalidate: REVALIDATE } }),
      fetch(`https://api.github.com/users/${handle}/events/public?per_page=8`, {
        headers: authHeaders(),
        next: { revalidate: REVALIDATE },
      }),
    ]);
    if (!userRes.ok) return null;
    const u = await userRes.json();
    const profile: GithubProfile = {
      handle: u.login,
      name: u.name ?? null,
      bio: u.bio ?? null,
      location: u.location ?? null,
      url: u.html_url?.replace(/^https?:\/\//, "") ?? `github.com/${handle}`,
      avatarUrl: u.avatar_url,
      repos: u.public_repos ?? 0,
      followers: compact(u.followers ?? 0),
      following: u.following ?? 0,
    };

    const events: GithubEvent[] = [];
    if (eventsRes.ok) {
      const raw = (await eventsRes.json()) as Array<{ type: string; repo?: { name: string }; created_at: string }>;
      for (const e of raw.slice(0, 5)) {
        const meta = EVENT_META[e.type] ?? { icon: "activity", tone: "var(--text-mono)" };
        events.push({
          icon: meta.icon,
          tone: meta.tone,
          title: `${e.type.replace(/Event$/, "")} · ${e.repo?.name ?? handle}`,
          sub: e.repo?.name ?? "",
          time: relativeTime(e.created_at),
        });
      }
    }
    return { profile, events };
  } catch {
    return null;
  }
}
