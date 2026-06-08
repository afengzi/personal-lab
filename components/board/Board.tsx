"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { Icon } from "@/components/hud/Icon";
import { StatItem } from "@/components/hud/Indicators";
import { NeonButton } from "@/components/hud/NeonButton";
import { LocaleToggle } from "@/components/LocaleToggle";
import { SubmitModal, type SubmitPayload } from "@/components/overlays/SubmitModal";
import { boardSeed } from "@/content/telemetry";
import type { BoardSeed } from "@/content/types";
import { BoardColumn } from "./BoardColumn";
import { BOARD_COLUMNS, STAGE_ORDER, type Stage } from "./columns";

export function Board() {
  const t = useTranslations();
  const [cards, setCards] = useState<BoardSeed[]>(boardSeed);
  const [submitOpen, setSubmitOpen] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const move = (id: string, stage: Stage) =>
    setCards((cs) => cs.map((c) => (c.id === id ? { ...c, stage, progress: stage === "shipped" ? 100 : c.progress } : c)));

  const onDragEnd = (e: DragEndEvent) => {
    const overId = e.over?.id;
    if (!overId) return;
    if (STAGE_ORDER.includes(overId as Stage)) move(String(e.active.id), overId as Stage);
  };

  const onAdvance = (id: string) =>
    setCards((cs) =>
      cs.map((c) => {
        if (c.id !== id) return c;
        const next = STAGE_ORDER[Math.min(STAGE_ORDER.length - 1, STAGE_ORDER.indexOf(c.stage) + 1)];
        return { ...c, stage: next, progress: next === "shipped" ? 100 : c.progress };
      }),
    );

  const shipped = cards.filter((c) => c.stage === "shipped").length;
  const onSubmitIdea = (p: SubmitPayload) => {
    setSubmitOpen(false);
    toast.success(t("submit.launched", { title: p.title }));
  };

  return (
    <div className="roadmap">
      <div className="appnav" style={{ top: 20, left: 20 } as CSSProperties}>
        <Link href="/" className="nav-btn">
          <Icon n="orbit" size={13} /> {t("nav.cockpit")}
        </Link>
        <span className="nav-btn active">
          <Icon n="map" size={13} /> {t("nav.roadmap")}
        </span>
      </div>
      <div style={{ position: "fixed", top: 24, right: 24, zIndex: 70 }}>
        <LocaleToggle />
      </div>

      <div className="board-head">
        <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.svg" alt="fz" style={{ width: 42, height: 42, filter: "drop-shadow(0 0 10px rgba(46,230,246,.45))" }} />
          <div>
            <div className="fz-wordmark" style={{ fontSize: 27, letterSpacing: ".14em" }}>
              {t("board.title")}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text-dim)", marginTop: 2 }}>
              {t("board.subtitle")}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 30, flexWrap: "wrap" }}>
          <StatItem label={t("board.totalIdeas")} value={cards.length} tone="var(--cyan)" glow align="right" />
          <StatItem label={t("board.shipped")} value={shipped} tone="var(--green)" glow align="right" />
          <StatItem label={t("board.mission")} value="63 / 100" tone="var(--magenta)" glow align="right" />
          <NeonButton variant="outline" tone="var(--green)" icon={<Icon n="plus" size={15} />} onClick={() => setSubmitOpen(true)}>
            {t("board.newIdea")}
          </NeonButton>
        </div>
      </div>

      <DndContext sensors={sensors} onDragEnd={onDragEnd}>
        <div className="board-cols">
          {BOARD_COLUMNS.map((col) => (
            <BoardColumn
              key={col.id}
              id={col.id}
              tone={col.tone}
              icon={col.icon}
              cards={cards.filter((c) => c.stage === col.id)}
              onAdvance={onAdvance}
            />
          ))}
        </div>
      </DndContext>

      {submitOpen && <SubmitModal onClose={() => setSubmitOpen(false)} onSubmit={onSubmitIdea} />}
    </div>
  );
}
