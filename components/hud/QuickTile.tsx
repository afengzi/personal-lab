"use client";

import { useState } from "react";
import { Icon } from "./Icon";

/* Notched quick-access tile with hover glow. */
export function QuickTile({
  icon,
  label,
  tone = "var(--cyan)",
  onClick,
}: {
  icon: string;
  label: string;
  tone?: string;
  onClick?: () => void;
}) {
  const [h, setH] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "14px 6px",
        background: h ? `color-mix(in srgb, ${tone} 12%, var(--bg-deep))` : "var(--bg-deep)",
        border: `1px solid ${h ? tone : "var(--line-dim)"}`,
        color: h ? tone : "var(--text)",
        cursor: "pointer",
        transition: "all .2s var(--ease-hud)",
        boxShadow: h ? `0 0 16px -6px ${tone}` : "none",
        clipPath: "polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px)",
      }}
    >
      <Icon n={icon} size={19} color={h ? tone : "var(--text-mono)"} />
      <span
        style={{
          fontFamily: "var(--font-techno)",
          fontWeight: 600,
          fontSize: 9,
          letterSpacing: ".08em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </button>
  );
}
