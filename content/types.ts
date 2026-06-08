/* Curated content types. Human-facing text lives in messages/{zh,en}.json;
   these structures hold only non-text fields + stable i18n key fragments. */

export type SubLink = { key: string; href: string };

/** A project idea floating in the cosmos. Text keyed under `ideas.<id>`. */
export type IdeaNode = {
  id: string;
  tone: string; // css var, e.g. var(--node-ai)
  hex: string; // raw hex mirror of tone
  progress: number;
  stars: string;
  updated: string;
  lang: string;
  commits: number;
  issues: number;
  sub: SubLink[];
};

/** A system module node. Text keyed under `modules.<id>`. */
export type ModuleNode = {
  id: string;
  icon: string; // lucide name
  tone: string;
  hex: string;
};

/** Quick-access tile. Label keyed under `quick.<id>`. */
export type QuickTileDef = {
  id: string;
  icon: string;
  tone: string;
};

/** Seed card for the Roadmap kanban. Text keyed under `ideas.<idKey>` reused
    where possible, plus a kanban-only `note` under `board.notes.<id>`. */
export type BoardSeed = {
  id: string;
  tagKey: string; // category key under `categories.<tagKey>`
  tone: string;
  hex: string;
  progress: number;
  stage: "backlog" | "explore" | "build" | "shipped";
  votes: number;
};

export type ActivityItem = {
  icon: string;
  tone: string;
  titleKey: string;
  subKey: string;
  time: string;
};

export type ConsoleLine = { time: string; tag: string; msgKey: string };
export type ConsoleStreamItem = { tag: string; msgKey: string };

export type VisitorSeed = {
  id: string;
  titleKey: string;
  handle: string;
  time: string;
  votes: number;
};
