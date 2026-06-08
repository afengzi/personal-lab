import type { BoardSeed } from "@/content/types";

export type Stage = BoardSeed["stage"];

export const BOARD_COLUMNS: { id: Stage; tone: string; icon: string }[] = [
  { id: "backlog", tone: "var(--cyan)", icon: "inbox" },
  { id: "explore", tone: "var(--purple)", icon: "compass" },
  { id: "build", tone: "var(--amber)", icon: "hammer" },
  { id: "shipped", tone: "var(--green)", icon: "rocket" },
];

export const STAGE_ORDER: Stage[] = ["backlog", "explore", "build", "shipped"];
