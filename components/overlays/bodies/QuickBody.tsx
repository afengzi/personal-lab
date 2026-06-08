"use client";

import { useTranslations } from "next-intl";
import { QuickTile } from "@/components/hud/QuickTile";
import { quickTiles } from "@/content/modules";
import { SectionLabel } from "./SectionLabel";

export function QuickBody({ onNav }: { onNav: (id: string) => void }) {
  const t = useTranslations();
  return (
    <div>
      <SectionLabel>{t("quick.jumpTo")}</SectionLabel>
      <div className="quick-grid">
        {quickTiles.map((q) => (
          <QuickTile key={q.id} icon={q.icon} label={t(`quick.${q.id}`)} tone={q.tone} onClick={() => onNav(q.id)} />
        ))}
      </div>
    </div>
  );
}
