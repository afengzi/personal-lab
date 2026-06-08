import type { CSSProperties, ReactNode } from "react";

/* Small presentational HUD bits: status pill, tag, progress bar, stat item. */

export function StatusPill({
  children,
  tone = "var(--green)",
  live,
  dot = true,
}: {
  children: ReactNode;
  tone?: string;
  live?: boolean;
  dot?: boolean;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "3px 9px",
        borderRadius: 999,
        background: `color-mix(in srgb, ${tone} 12%, transparent)`,
        border: `1px solid color-mix(in srgb, ${tone} 45%, transparent)`,
        fontFamily: "var(--font-techno)",
        fontWeight: 600,
        fontSize: 9,
        letterSpacing: ".16em",
        textTransform: "uppercase",
        color: tone,
      }}
    >
      {dot && (
        <span
          className={live ? "fz-dot is-live" : "fz-dot"}
          style={{ background: tone, color: tone, width: 6, height: 6 }}
        />
      )}
      {children}
    </span>
  );
}

export function Tag({ children, tone = "var(--cyan)", solid }: { children: ReactNode; tone?: string; solid?: boolean }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "2px 7px",
        borderRadius: 2,
        background: solid ? tone : `color-mix(in srgb, ${tone} 10%, transparent)`,
        border: `1px solid color-mix(in srgb, ${tone} 40%, transparent)`,
        fontFamily: "var(--font-techno)",
        fontWeight: 600,
        fontSize: 9,
        letterSpacing: ".08em",
        textTransform: "uppercase",
        color: solid ? "var(--text-on-neon)" : tone,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

export function ProgressBar({
  value = 0,
  tone = "var(--green)",
  height = 5,
  showValue,
}: {
  value?: number;
  tone?: string;
  height?: number;
  showValue?: boolean;
}) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div
        style={{
          flex: 1,
          height,
          background: "var(--bg-deep)",
          borderRadius: 999,
          overflow: "hidden",
          boxShadow: "inset 0 0 0 1px var(--line-faint)",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: tone,
            borderRadius: 999,
            boxShadow: `0 0 10px -1px ${tone}`,
            transition: "width .5s var(--ease-hud)",
          }}
        />
      </div>
      {showValue && (
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: tone, minWidth: 32, textAlign: "right" }}>
          {pct}%
        </span>
      )}
    </div>
  );
}

export function StatItem({
  label,
  value,
  tone = "var(--text-bright)",
  glow,
  align = "left",
}: {
  label: ReactNode;
  value: ReactNode;
  tone?: string;
  glow?: boolean;
  align?: "left" | "right";
}) {
  const style: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    alignItems: align === "right" ? "flex-end" : "flex-start",
  };
  return (
    <div style={style}>
      <span
        style={{
          fontFamily: "var(--font-techno)",
          fontWeight: 600,
          fontSize: 9,
          letterSpacing: ".2em",
          textTransform: "uppercase",
          color: "var(--text-dim)",
        }}
      >
        {label}
      </span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 15, color: tone, textShadow: glow ? `0 0 10px ${tone}` : "none" }}>
        {value}
      </span>
    </div>
  );
}
