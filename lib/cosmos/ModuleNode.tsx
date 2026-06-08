"use client";

import { useTranslations } from "next-intl";
import type { CSSProperties, MouseEvent } from "react";
import { Icon } from "@/components/hud/Icon";
import type { ModuleNode as ModuleNodeData } from "@/content/types";
import type { CardOrigin } from "./IdeaCard";

/* A system-module chip floating in the cosmos. */
export function ModuleNode({
  node,
  selected,
  onHover,
  onOpen,
}: {
  node: ModuleNodeData;
  selected: boolean;
  onHover: (id: string | null) => void;
  onOpen: (id: string, origin: CardOrigin) => void;
}) {
  const t = useTranslations("modules");

  const click = (e: MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    onOpen(node.id, { cx: r.left + r.width / 2, cy: r.top + r.height / 2 });
  };

  return (
    <button
      type="button"
      className={`fz-mod${selected ? " is-sel" : ""}`}
      style={
        {
          "--hex": node.hex,
          "--frame": `color-mix(in srgb, ${node.tone} 50%, var(--line))`,
        } as CSSProperties
      }
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      onClick={click}
    >
      <span className="fz-mod-ic">
        <Icon n={node.icon} size={17} />
      </span>
      <span className="fz-mod-tx">
        <span className="fz-mod-t">{t(`${node.id}.title`)}</span>
        <span className="fz-mod-d">{t(`${node.id}.desc`)}</span>
      </span>
      <Icon n="maximize-2" size={11} className="fz-mod-open" style={{ width: 11, height: 11 }} />
    </button>
  );
}
