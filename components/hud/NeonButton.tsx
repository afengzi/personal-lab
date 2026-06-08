"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

type Variant = "solid" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

export type NeonButtonProps = {
  children?: ReactNode;
  variant?: Variant;
  tone?: string;
  size?: Size;
  icon?: ReactNode;
  iconRight?: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  style?: CSSProperties;
};

export function NeonButton({
  children,
  variant = "outline",
  tone = "var(--cyan)",
  size = "md",
  icon,
  iconRight,
  onClick,
  type = "button",
  style,
}: NeonButtonProps) {
  const [h, setH] = useState(false);
  const pads: Record<Size, string> = { sm: "6px 12px", md: "11px 20px", lg: "15px 28px" };
  const fonts: Record<Size, number> = { sm: 9, md: 11, lg: 12 };
  const base: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: pads[size],
    fontFamily: "var(--font-techno)",
    fontWeight: 600,
    fontSize: fonts[size],
    letterSpacing: ".16em",
    textTransform: "uppercase",
    cursor: "pointer",
    borderRadius: 3,
    clipPath: "polygon(7px 0,100% 0,100% calc(100% - 7px),calc(100% - 7px) 100%,0 100%,0 7px)",
    transition: "all .2s var(--ease-hud)",
    whiteSpace: "nowrap",
  };
  const variants: Record<Variant, CSSProperties> = {
    solid: {
      background: tone,
      color: "var(--text-on-neon)",
      border: "none",
      boxShadow: h ? `0 0 24px -2px ${tone}` : `0 0 18px -3px ${tone}`,
    },
    outline: {
      background: h ? `color-mix(in srgb, ${tone} 18%, transparent)` : `color-mix(in srgb, ${tone} 8%, transparent)`,
      color: tone,
      border: `1px solid ${tone}`,
      boxShadow: `0 0 14px -4px ${tone}`,
      textShadow: `0 0 8px ${tone}`,
    },
    ghost: { background: "transparent", color: "var(--text-dim)", border: "1px solid transparent" },
  };
  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{ ...base, ...variants[variant], ...style }}
    >
      {icon}
      {children}
      {iconRight}
    </button>
  );
}
