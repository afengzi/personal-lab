"use client";

import { useTranslations } from "next-intl";
import type { CSSProperties, MouseEvent } from "react";
import { Icon } from "@/components/hud/Icon";

/* A sub-link chip clustered around its parent idea card. */
export function SubChip({
  pid,
  subKey,
  href,
  hex,
  onHover,
  onGuardClick,
}: {
  pid: string;
  subKey: string;
  href: string;
  hex: string;
  onHover: (id: string | null) => void;
  onGuardClick: (e: MouseEvent<HTMLAnchorElement>) => void;
}) {
  const t = useTranslations("ideas");
  return (
    <a
      className="fz-sub"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ "--hex": hex, borderColor: `color-mix(in srgb, ${hex} 55%, transparent)` } as CSSProperties}
      onMouseEnter={() => onHover(pid)}
      onMouseLeave={() => onHover(null)}
      onClick={onGuardClick}
    >
      <span className="fz-sub-dot" style={{ background: hex, boxShadow: `0 0 7px -1px ${hex}` }} />
      {t(`${pid}.sub.${subKey}`)}
      <Icon n="arrow-up-right" size={9} style={{ width: 9, height: 9, opacity: 0.7 }} />
    </a>
  );
}
