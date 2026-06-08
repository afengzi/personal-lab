/* Circular progress gauge with neon stroke + centered value. */
export function RadialGauge({
  value = 0,
  max = 100,
  size = 150,
  stroke = 9,
  tone = "var(--green)",
  label,
}: {
  value?: number;
  max?: number;
  size?: number;
  stroke?: number;
  tone?: string;
  label?: string;
}) {
  const pct = Math.max(0, Math.min(1, value / max));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--bg-deep)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={tone}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
          style={{ filter: `drop-shadow(0 0 6px ${tone})`, transition: "stroke-dashoffset 1s var(--ease-hud)" }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: size * 0.3,
            color: tone,
            textShadow: `0 0 12px ${tone}`,
            lineHeight: 1,
          }}
        >
          {value}
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)", marginTop: 2 }}>
          {label || `/${max}`}
        </span>
      </div>
    </div>
  );
}
