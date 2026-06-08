import type { ModuleNode, QuickTileDef } from "./types";

/* System modules — also nodes wired to the hub. Text under `modules.<id>`. */
export const modules: ModuleNode[] = [
  { id: "github", icon: "git-branch", tone: "var(--cyan)", hex: "#2ee6f6" },
  { id: "console", icon: "terminal", tone: "var(--green)", hex: "#2bff88" },
  { id: "mission", icon: "target", tone: "var(--green)", hex: "#2bff88" },
  { id: "visitor", icon: "lightbulb", tone: "var(--amber)", hex: "#ffae3a" },
  { id: "quick", icon: "layout-grid", tone: "var(--purple)", hex: "#b06bff" },
  { id: "telemetry", icon: "activity", tone: "var(--magenta)", hex: "#ff2d9b" },
];

/* Quick-access tiles. Labels under `quick.<id>`. `roadmap` routes to the board. */
export const quickTiles: QuickTileDef[] = [
  { id: "notes", icon: "notebook-pen", tone: "var(--cyan)" },
  { id: "snippets", icon: "code-xml", tone: "var(--purple)" },
  { id: "play", icon: "gamepad-2", tone: "var(--magenta)" },
  { id: "roadmap", icon: "map", tone: "var(--green)" },
  { id: "achieve", icon: "trophy", tone: "var(--amber)" },
  { id: "stack", icon: "database", tone: "var(--cyan)" },
  { id: "settings", icon: "settings", tone: "var(--purple)" },
  { id: "contact", icon: "mail", tone: "var(--magenta)" },
];
