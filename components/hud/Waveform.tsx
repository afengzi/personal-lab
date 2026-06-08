"use client";

import { useMemo } from "react";

/* Seeded pseudo-random bar waveform with a staggered pulse animation. */
export function Waveform({
  bars = 40,
  tone = "var(--green)",
  height = 30,
  seed = 7,
  animated = true,
}: {
  bars?: number;
  tone?: string;
  height?: number;
  seed?: number;
  animated?: boolean;
}) {
  const heights = useMemo(() => {
    let s = seed;
    const rnd = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    return Array.from({ length: bars }, () => 0.22 + rnd() * 0.78);
  }, [bars, seed]);

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height }}>
      {heights.map((h, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: `${h * 100}%`,
            background: tone,
            borderRadius: 1,
            opacity: 0.85,
            boxShadow: `0 0 6px -2px ${tone}`,
            transformOrigin: "bottom",
            animation: animated ? `fz-pulse ${1 + (i % 5) * 0.18}s ease-in-out ${i * 0.03}s infinite` : "none",
          }}
        />
      ))}
    </div>
  );
}

/* Equalizer bars (vertical scale pulse) — used in telemetry signal panels. */
export function Equalizer({ tone = "var(--cyan)", n = 30 }: { tone?: string; n?: number }) {
  return (
    <div className="eq">
      {Array.from({ length: n }).map((_, i) => (
        <span
          key={i}
          style={{
            height: "100%",
            background: tone,
            opacity: 0.85,
            boxShadow: `0 0 6px -2px ${tone}`,
            animation: `eqbar ${0.7 + (i % 6) * 0.13}s ease-in-out ${i * 0.04}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}
