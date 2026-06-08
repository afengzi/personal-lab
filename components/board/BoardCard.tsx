"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { Icon } from "@/components/hud/Icon";
import { Tag, ProgressBar } from "@/components/hud/Indicators";
import type { BoardSeed } from "@/content/types";

/* A draggable kanban card. */
export function BoardCard({ card, onAdvance }: { card: BoardSeed; onAdvance: (id: string) => void }) {
  const t = useTranslations();
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: card.id });
  const title = card.id === "cockpit" ? t("board.cockpitTitle") : t(`ideas.${card.id}.title`);

  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    ["--notch-size" as string]: "9px",
    ["--frame" as string]: `color-mix(in srgb, ${card.tone} 50%, var(--line))`,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`fz-panel board-card${isDragging ? " dragging" : ""}`}
      {...listeners}
      {...attributes}
    >
      <div className="board-card-head">
        <span className="fz-orb" style={{ width: 12, height: 12, background: card.hex, boxShadow: `0 0 10px -1px ${card.hex}` }} />
        <span className="board-card-title">{title}</span>
        <Tag tone={card.tone}>{t(`categories.${card.tagKey}`)}</Tag>
      </div>
      <div className="board-card-note">{t(`board.notes.${card.id}`)}</div>
      {card.progress > 0 && (
        <div style={{ marginBottom: 11 }}>
          <ProgressBar value={card.progress} tone={card.hex} height={5} showValue />
        </div>
      )}
      <div className="board-card-foot">
        <span className="board-votes">
          <Icon n="chevron-up" size={13} color="var(--green)" />
          {card.votes}
        </span>
        {card.stage !== "shipped" && (
          <button
            type="button"
            className="board-advance"
            onClick={() => onAdvance(card.id)}
            onPointerDown={(e) => e.stopPropagation()}
          >
            {t("board.advance")} <Icon n="arrow-right" size={11} color="currentColor" />
          </button>
        )}
      </div>
    </div>
  );
}
