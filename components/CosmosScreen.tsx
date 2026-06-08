"use client";

import { useState, type CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { Starfield } from "@/lib/cosmos/Starfield";
import { Field } from "@/lib/cosmos/Field";
import type { CardOrigin } from "@/lib/cosmos/IdeaCard";
import { NeonButton } from "@/components/hud/NeonButton";
import { Icon } from "@/components/hud/Icon";
import { HudBar } from "@/components/HudBar";
import { ideas } from "@/content/ideas";
import { modules } from "@/content/modules";

/* Home cosmos screen: starfield + 3D field + center wordmark + HUD bar + submit.
   Detail overlays (idea fly-card, module panels) and the submit modal are wired
   in later tasks via the `sel` / `submitOpen` state held here. */
export function CosmosScreen({ starCount = 240, drift = true }: { starCount?: number; drift?: boolean }) {
  const t = useTranslations();
  const [sel, setSel] = useState<{ id: string; origin: CardOrigin } | null>(null);
  const [, setSubmitOpen] = useState(false);

  const detailOpen = !!sel;
  const onSelect = (id: string, origin: CardOrigin) => setSel({ id, origin });

  return (
    <div className="fz-lab">
      <Starfield count={starCount} />
      <main className="fz-lab-stage">
        <Field nodes={ideas} modules={modules} selectedId={sel?.id ?? null} onSelect={onSelect} drift={drift} />
      </main>

      <div className="fz-center-id">
        <div className="fz-center-wm">FENGZIAAA</div>
        <div className="fz-center-dm">{t("brand.domain")}</div>
      </div>

      <div className="fz-map-hint">
        <Icon n="move-3d" size={13} /> {t("hud.mapHint")}
      </div>

      <HudBar ideasCount={ideas.length} modulesCount={modules.length} hidden={detailOpen} />

      <div className="hud-submit" style={{ visibility: detailOpen ? "hidden" : "visible" } as CSSProperties}>
        <NeonButton
          variant="outline"
          tone="var(--green)"
          size="md"
          icon={<Icon n="plus" size={14} />}
          iconRight={<Icon n="arrow-right" size={14} />}
          onClick={() => setSubmitOpen(true)}
        >
          {t("submit.cta")}
        </NeonButton>
      </div>
    </div>
  );
}
