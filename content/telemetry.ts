import type {
  ActivityItem,
  BoardSeed,
  ConsoleLine,
  ConsoleStreamItem,
  VisitorSeed,
} from "./types";

/* Owner identity (fallback; replaced by live GitHub data in the github module).
   Text fields (tagline/location) are keyed under `owner.*`. */
export const owner = {
  handle: "fengziaaa",
  domain: "fengziaaa.com",
  url: "github.com/fengziaaa",
  repos: 72,
  followers: "1.2k",
  following: 98,
  contributions: "3,641",
};

/* GitHub recent activity feed (fallback). Text under `activity.<key>`. */
export const activity: ActivityItem[] = [
  { icon: "git-commit-horizontal", tone: "var(--green)", titleKey: "push", subKey: "pushSub", time: "2m" },
  { icon: "git-pull-request", tone: "var(--cyan)", titleKey: "pr", subKey: "prSub", time: "18m" },
  { icon: "git-merge", tone: "var(--purple)", titleKey: "merge", subKey: "mergeSub", time: "1h" },
  { icon: "circle-dot", tone: "var(--amber)", titleKey: "issue", subKey: "issueSub", time: "2h" },
  { icon: "star", tone: "var(--amber)", titleKey: "star", subKey: "starSub", time: "3h" },
];

/* System console seed + stream. Messages under `console.<key>`. */
export const consoleSeed: ConsoleLine[] = [
  { time: "22:47:55", tag: "INFO", msgKey: "init" },
  { time: "22:47:55", tag: "OK", msgKey: "ok" },
  { time: "22:47:56", tag: "DATA", msgKey: "ghConnected" },
  { time: "22:47:56", tag: "DATA", msgKey: "ideasOnline" },
  { time: "22:47:57", tag: "SYNC", msgKey: "syncActive" },
  { time: "22:47:57", tag: "INFO", msgKey: "ready" },
];

export const consoleStream: ConsoleStreamItem[] = [
  { tag: "SYNC", msgKey: "polling" },
  { tag: "OK", msgKey: "pulled" },
  { tag: "DATA", msgKey: "ideaReceived" },
  { tag: "INFO", msgKey: "missionRecalc" },
  { tag: "DATA", msgKey: "throughput" },
  { tag: "SYNC", msgKey: "reindexed" },
  { tag: "OK", msgKey: "queueDrained" },
  { tag: "WARN", msgKey: "rateLimit" },
];

export const mission = { value: 63, max: 100, received: 142, completed: 23, inProgress: 5 };

/* Visitor-submitted seed (used as fallback before live data loads). */
export const visitorSeed: VisitorSeed[] = [
  { id: "v1", titleKey: "v1", handle: "@devdreamer", time: "2h", votes: 23 },
  { id: "v2", titleKey: "v2", handle: "@cloudnative", time: "5h", votes: 18 },
  { id: "v3", titleKey: "v3", handle: "@oldschooldev", time: "8h", votes: 15 },
  { id: "v4", titleKey: "v4", handle: "@bughunter", time: "12h", votes: 12 },
  { id: "v5", titleKey: "v5", handle: "@ossfan", time: "1d", votes: 9 },
];

/* Roadmap kanban seed. Card title reuses `ideas.<id>.title` where ids match;
   board-only notes under `board.notes.<id>`. */
export const boardSeed: BoardSeed[] = [
  { id: "ai", tagKey: "aiDev", tone: "var(--node-ai)", hex: "#b06bff", progress: 60, stage: "build", votes: 34 },
  { id: "flow", tagKey: "aiTools", tone: "var(--node-flow)", hex: "#2bff88", progress: 75, stage: "build", votes: 28 },
  { id: "radar", tagKey: "analytics", tone: "var(--node-radar)", hex: "#2ee6f6", progress: 40, stage: "explore", votes: 19 },
  { id: "blog", tagKey: "content", tone: "var(--node-blog)", hex: "#ff2d9b", progress: 80, stage: "build", votes: 22 },
  { id: "os", tagKey: "platform", tone: "var(--node-os)", hex: "#ffae3a", progress: 30, stage: "explore", votes: 15 },
  { id: "git3d", tagKey: "tooling", tone: "var(--cyan)", hex: "#2ee6f6", progress: 0, stage: "backlog", votes: 12 },
  { id: "prompt", tagKey: "aiTools", tone: "var(--purple)", hex: "#b06bff", progress: 0, stage: "backlog", votes: 9 },
  { id: "time", tagKey: "tooling", tone: "var(--magenta)", hex: "#ff2d9b", progress: 0, stage: "backlog", votes: 7 },
  { id: "stack", tagKey: "devops", tone: "var(--green)", hex: "#2bff88", progress: 100, stage: "shipped", votes: 41 },
  { id: "cockpit", tagKey: "web", tone: "var(--green)", hex: "#2bff88", progress: 100, stage: "shipped", votes: 16 },
];

/* Categories used by submit form + board tags. Text under `categories.<key>`. */
export const categoryKeys = ["aiDev", "tools", "content", "analytics", "platform"] as const;
