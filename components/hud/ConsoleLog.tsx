/* Terminal-style log readout with tag colors + blinking prompt cursor. */
const LOG_COLORS: Record<string, string> = {
  INFO: "var(--cyan)",
  OK: "var(--green)",
  DATA: "var(--blue-bright)",
  SYNC: "var(--purple)",
  WARN: "var(--amber)",
  ERR: "var(--red)",
};

export type LogLine = { time: string; tag: string; msg: string };

export function ConsoleLog({ lines = [], prompt }: { lines?: LogLine[]; prompt?: string }) {
  return (
    <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, lineHeight: 1.85 }}>
      {lines.map((l, i) => (
        <div key={i} style={{ display: "flex", gap: 8 }}>
          <span style={{ color: "var(--text-faint)" }}>{l.time}</span>
          <span style={{ color: LOG_COLORS[l.tag] || "var(--text-mono)", minWidth: 46 }}>[{l.tag}]</span>
          <span style={{ color: "var(--text)" }}>{l.msg}</span>
        </div>
      ))}
      {prompt && (
        <div style={{ marginTop: 6, color: "var(--green)" }}>
          <span style={{ color: "var(--cyan)" }}>&gt;</span> {prompt}
          <span style={{ animation: "fz-blink 1s steps(1) infinite" }}>▋</span>
        </div>
      )}
    </div>
  );
}
