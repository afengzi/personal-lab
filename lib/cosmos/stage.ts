/* Map build progress → mission stage key (shared by card chip + fly-card). */
export type StageKey = "backlog" | "exploring" | "building" | "shipped";

export function stageKeyOf(progress: number): StageKey {
  if (progress >= 100) return "shipped";
  if (progress >= 50) return "building";
  if (progress > 0) return "exploring";
  return "backlog";
}

export const STAGE_TONE: Record<StageKey, string> = {
  backlog: "var(--cyan)",
  exploring: "var(--purple)",
  building: "var(--amber)",
  shipped: "var(--green)",
};
