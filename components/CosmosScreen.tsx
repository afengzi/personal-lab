"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Starfield } from "@/lib/cosmos/Starfield";
import { Field } from "@/lib/cosmos/Field";
import type { CardOrigin } from "@/lib/cosmos/IdeaCard";
import { ideas } from "@/content/ideas";
import { modules } from "@/content/modules";

/* Home cosmos screen. (Overlays, HUD bar and submit flow are added in later tasks.) */
export function CosmosScreen({ starCount = 240, drift = true }: { starCount?: number; drift?: boolean }) {
  const t = useTranslations();
  const [sel, setSel] = useState<string | null>(null);

  const onSelect = (id: string, _origin: CardOrigin) => {
    void _origin;
    setSel(id);
  };

  return (
    <div className="fz-lab">
      <Starfield count={starCount} />
      <main className="fz-lab-stage">
        <Field nodes={ideas} modules={modules} selectedId={sel} onSelect={onSelect} drift={drift} />
      </main>
      <div className="fz-center-id">
        <div className="fz-center-wm">FENGZIAAA</div>
        <div className="fz-center-dm">{t("brand.domain")}</div>
      </div>
      <div className="fz-map-hint">{t("hud.mapHint")}</div>
    </div>
  );
}
