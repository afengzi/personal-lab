import type { CSSProperties, ReactNode } from "react";

/* Notched HUD panel with optional tracked-uppercase header + live dot + right slot. */
export type NeonPanelProps = {
  label?: ReactNode;
  accent?: string;
  dot?: boolean;
  live?: boolean;
  right?: ReactNode;
  notch?: string;
  pad?: string;
  style?: CSSProperties;
  bodyStyle?: CSSProperties;
  className?: string;
  children?: ReactNode;
};

export function NeonPanel({
  label,
  accent = "var(--cyan)",
  dot,
  live,
  right,
  notch = "var(--notch)",
  pad = "var(--panel-pad)",
  style,
  bodyStyle,
  className,
  children,
}: NeonPanelProps) {
  const frame = accent ? `color-mix(in srgb, ${accent} 55%, var(--line))` : undefined;
  return (
    <div
      className={`fz-panel${className ? ` ${className}` : ""}`}
      style={{ ["--notch-size" as string]: notch, ["--frame" as string]: frame, ...style }}
    >
      {label != null && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            padding: "9px 14px",
            borderBottom: "1px solid var(--line-dim)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {dot && (
              <span
                className={live ? "fz-dot is-live" : "fz-dot"}
                style={{ background: accent, color: accent, width: 6, height: 6 }}
              />
            )}
            <span
              style={{
                fontFamily: "var(--font-techno)",
                fontWeight: 600,
                fontSize: 10,
                letterSpacing: ".24em",
                textTransform: "uppercase",
                color: "var(--text-dim)",
              }}
            >
              {label}
            </span>
          </div>
          {right != null && (
            <span
              style={{
                fontFamily: "var(--font-techno)",
                fontWeight: 600,
                fontSize: 10,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: accent,
              }}
            >
              {right}
            </span>
          )}
        </div>
      )}
      <div style={{ padding: pad, ...bodyStyle }}>{children}</div>
    </div>
  );
}
