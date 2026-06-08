"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TweaksPanel, STAR_COUNT, type Tweaks } from "@/components/tweaks/TweaksPanel";
import { Starfield } from "@/lib/cosmos/Starfield";
import { Field } from "@/lib/cosmos/Field";
import type { CardOrigin } from "@/lib/cosmos/IdeaCard";
import { NeonButton } from "@/components/hud/NeonButton";
import { Icon } from "@/components/hud/Icon";
import { HudBar } from "@/components/HudBar";
import { FlyCard } from "@/components/overlays/FlyCard";
import { ModuleDetail } from "@/components/overlays/ModuleDetail";
import { SubmitModal, type SubmitPayload } from "@/components/overlays/SubmitModal";
import type { GithubData } from "@/components/overlays/bodies/GithubBody";
import type { VisitorItem } from "@/components/overlays/bodies/VisitorBody";
import { ideas } from "@/content/ideas";
import { modules } from "@/content/modules";

/* Home cosmos screen: starfield + 3D field + center wordmark + HUD bar + submit.
   Detail overlays (idea fly-card, module panels) and the submit modal are wired
   in later tasks via the `sel` / `submitOpen` state held here. */
export function CosmosScreen({ github = null, visitorIdeas = [] }: { github?: GithubData; visitorIdeas?: VisitorItem[] }) {
  const t = useTranslations();
  const router = useRouter();
  const [sel, setSel] = useState<{ id: string; origin: CardOrigin } | null>(null);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [tw, setTw] = useState<Tweaks>({ accent: "#2ee6f6", stars: "medium", drift: true, scanlines: true });
  const patchTweaks = (p: Partial<Tweaks>) => setTw((v) => ({ ...v, ...p }));

  useEffect(() => {
    document.documentElement.style.setProperty("--lab-accent", tw.accent);
    return () => {
      document.documentElement.style.removeProperty("--lab-accent");
    };
  }, [tw.accent]);

  const detailOpen = !!sel;
  const onSelect = (id: string, origin: CardOrigin) => setSel({ id, origin });
  const close = () => setSel(null);
  const ideaNode = sel ? ideas.find((n) => n.id === sel.id) : undefined;
  const moduleNode = sel ? modules.find((m) => m.id === sel.id) : undefined;

  const onNav = (id: string) => {
    setSel(null);
    if (id === "roadmap") {
      router.push("/roadmap");
      return;
    }
    toast(t("common.moduleComingOnline", { label: t(`quick.${id}`) }));
  };
  const openSubmit = () => {
    setSel(null);
    setSubmitOpen(true);
  };
  const onSubmitIdea = async (p: SubmitPayload) => {
    setSubmitOpen(false);
    try {
      const res = await fetch("/api/ideas", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(p),
      });
      if (res.ok) toast.success(t("submit.launched", { title: p.title }));
      else toast.error(t("submit.error"));
    } catch {
      toast.error(t("submit.error"));
    }
  };
  const onVote = (id: string) => {
    void fetch(`/api/ideas/${id}/vote`, { method: "POST" }).catch(() => {});
  };

  return (
    <div className="fz-lab">
      <Starfield count={STAR_COUNT[tw.stars]} />
      <main className="fz-lab-stage">
        <Field nodes={ideas} modules={modules} selectedId={sel?.id ?? null} onSelect={onSelect} drift={tw.drift} />
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

      {ideaNode && <FlyCard node={ideaNode} origin={sel?.origin ?? null} onClose={close} />}
      {moduleNode && (
        <ModuleDetail
          node={moduleNode}
          onClose={close}
          onNav={onNav}
          onOpenSubmit={openSubmit}
          github={github}
          visitorItems={visitorIdeas}
          onVote={onVote}
        />
      )}
      {submitOpen && <SubmitModal onClose={() => setSubmitOpen(false)} onSubmit={onSubmitIdea} />}

      {tw.scanlines && <div className="fz-scanlines" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 80 }} />}
      <TweaksPanel value={tw} onChange={patchTweaks} />
    </div>
  );
}
