"use client";

import { useTranslations } from "next-intl";
import type { CSSProperties, MouseEvent } from "react";
import { Icon } from "@/components/hud/Icon";
import type { IdeaNode } from "@/content/types";
import { stageKeyOf } from "./stage";

export type CardOrigin = { cx: number; cy: number };

/* The floating idea card (billboarded by its .fz-cardpos wrapper). */
export function IdeaCard({
  node,
  onHover,
  onOpen,
}: {
  node: IdeaNode;
  onHover: (id: string | null) => void;
  onOpen: (id: string, origin: CardOrigin) => void;
}) {
  const t = useTranslations("ideas");
  const tStage = useTranslations("fly.stages");
  const stage = stageKeyOf(node.progress);

  const click = (e: MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    onOpen(node.id, { cx: r.left + r.width / 2, cy: r.top + r.height / 2 });
  };

  const stat = (icon: string, val: string | number, color: string) => (
    <span className="fz-card-m">
      <Icon n={icon} size={10} color={color} style={{ width: 10, height: 10 }} />
      {val}
    </span>
  );

  return (
    <button
      type="button"
      className="fz-card"
      style={
        {
          "--c": node.tone,
          "--hex": node.hex,
          "--frame": `color-mix(in srgb, ${node.tone} 46%, var(--line))`,
        } as CSSProperties
      }
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      onClick={click}
    >
      <span className="fz-card-edge" />
      <span className="fz-card-head">
        <span className="fz-card-cat">{t(`${node.id}.cat`)}</span>
        <span
          className="fz-card-stage"
          style={{ color: node.hex, borderColor: `color-mix(in srgb, ${node.hex} 45%, transparent)` }}
        >
          {tStage(stage)}
        </span>
      </span>
      <span className="fz-card-title">{t(`${node.id}.title`)}</span>
      <span className="fz-card-desc">{t(`${node.id}.desc`)}</span>
      <span className="fz-card-meta">
        {stat("circle", node.lang, node.hex)}
        {stat("git-commit-horizontal", node.commits, "var(--text-mono)")}
        {stat("star", node.stars, "var(--amber)")}
        {stat("circle-dot", node.issues, "var(--text-dim)")}
      </span>
      <span className="fz-card-bar">
        <span style={{ width: `${node.progress}%`, background: node.hex, boxShadow: `0 0 8px -1px ${node.hex}` }} />
      </span>
      <span className="fz-card-foot">
        <span className="fz-card-pct" style={{ color: node.hex }}>
          {node.progress}%
        </span>
        <span className="fz-card-open">
          <Icon n="maximize-2" size={10} style={{ width: 10, height: 10 }} />
        </span>
      </span>
    </button>
  );
}
