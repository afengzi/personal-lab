"use client";

import { useDroppable } from "@dnd-kit/core";
import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { Icon } from "@/components/hud/Icon";
import { BoardCard } from "./BoardCard";
import type { Stage } from "./columns";
import type { BoardSeed } from "@/content/types";

/* A droppable kanban column. */
export function BoardColumn({
  id,
  tone,
  icon,
  cards,
  onAdvance,
}: {
  id: Stage;
  tone: string;
  icon: string;
  cards: BoardSeed[];
  onAdvance: (id: string) => void;
}) {
  const t = useTranslations();
  const { setNodeRef, isOver } = useDroppable({ id });

  const style: CSSProperties = {
    ["--notch-size" as string]: "12px",
    ["--frame" as string]: isOver ? tone : `color-mix(in srgb, ${tone} 38%, var(--line))`,
    boxShadow: isOver ? `inset 0 0 0 1px ${tone}, 0 0 30px -8px ${tone}` : undefined,
  };

  return (
    <div ref={setNodeRef} className="fz-panel board-col" style={style}>
      <div className="board-col-head">
        <span className="board-col-title" style={{ color: tone }}>
          <Icon n={icon} size={15} color={tone} />
          {t(`board.columns.${id}`)}
        </span>
        <span className="board-col-count">{cards.length}</span>
      </div>
      <div className="board-col-body fz-scroll">
        {cards.map((c) => (
          <BoardCard key={c.id} card={c} onAdvance={onAdvance} />
        ))}
        {cards.length === 0 && <div className="board-empty">{t("board.dropHere")}</div>}
      </div>
    </div>
  );
}
