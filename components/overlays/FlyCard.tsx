"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { FzDialog } from "./FzDialog";
import { Icon } from "@/components/hud/Icon";
import { NeonButton } from "@/components/hud/NeonButton";
import { stageKeyOf, STAGE_TONE } from "@/lib/cosmos/stage";
import type { IdeaNode } from "@/content/types";
import type { CardOrigin } from "@/lib/cosmos/IdeaCard";

const techno = (size: number, color: string, extra?: CSSProperties): CSSProperties => ({
  fontFamily: "var(--font-techno)",
  fontWeight: 600,
  fontSize: size,
  letterSpacing: ".2em",
  textTransform: "uppercase",
  color,
  ...extra,
});

/* Idea detail that flies from the clicked card to the front. */
export function FlyCard({ node, origin, onClose }: { node: IdeaNode; origin: CardOrigin | null; onClose: () => void }) {
  const t = useTranslations("ideas");
  const tf = useTranslations("fly");
  const tStage = useTranslations("fly.stages");
  const reduce = useReducedMotion();
  const stage = stageKeyOf(node.progress);
  const stageTone = STAGE_TONE[stage];

  const ww = typeof window !== "undefined" ? window.innerWidth : 0;
  const wh = typeof window !== "undefined" ? window.innerHeight : 0;
  const dx = origin ? Math.round(origin.cx - ww / 2) : 0;
  const dy = origin ? Math.round(origin.cy - wh / 2) : 0;

  return (
    <FzDialog open onClose={onClose} title={t(`${node.id}.title`)}>
      <motion.div
        className="fz-fly-card"
        style={{ "--frame": `color-mix(in srgb, ${node.tone} 60%, var(--line))` } as CSSProperties}
        initial={reduce ? false : { x: dx, y: dy, scale: 0.16, opacity: 0.4 }}
        animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="fz-fly-glow"
          style={{
            background: `radial-gradient(120% 150% at 8% 0%, color-mix(in srgb, ${node.tone} 28%, transparent), transparent 58%)`,
          }}
        />
        <div className="fz-fly-edge" style={{ background: node.hex, boxShadow: `0 0 16px 1px ${node.hex}` }} />
        <button type="button" className="fz-fly-close" onClick={onClose} aria-label="Close">
          <Icon n="x" size={16} />
        </button>

        <div className="fz-fly-body">
          <div style={techno(10, node.tone)}>{t(`${node.id}.cat`)}</div>
          <div
            style={{
              fontFamily: "var(--font-techno)",
              fontWeight: 700,
              fontSize: 34,
              color: "#fff",
              textShadow: `0 0 18px ${node.hex}`,
              lineHeight: 1.05,
              margin: "6px 0 0",
            }}
          >
            {t(`${node.id}.title`)}
          </div>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 14.5,
              lineHeight: 1.65,
              color: "var(--text)",
              margin: "18px 0 22px",
              maxWidth: 480,
            }}
          >
            {t(`${node.id}.blurb`)}
          </p>

          <div className="fz-fly-stats">
            <div>
              <div className="k">{tf("stage")}</div>
              <div className="v" style={{ color: stageTone, textShadow: `0 0 10px ${stageTone}` }}>
                {tStage(stage)}
              </div>
            </div>
            <div>
              <div className="k">{tf("progress")}</div>
              <div className="v" style={{ color: node.hex }}>
                {node.progress}%
              </div>
            </div>
            <div>
              <div className="k">{tf("stars")}</div>
              <div className="v" style={{ color: "var(--amber)" }}>
                {node.stars}
              </div>
            </div>
            <div>
              <div className="k">{tf("updated")}</div>
              <div className="v" style={{ color: "var(--cyan)" }}>
                {tf("updatedAgo", { updated: node.updated })}
              </div>
            </div>
          </div>

          <div style={{ margin: "18px 0 22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
              <span style={techno(9, "var(--text-dim)", { letterSpacing: ".18em" })}>{tf("buildProgress")}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: node.tone }}>{node.progress}%</span>
            </div>
            <div
              style={{
                height: 6,
                borderRadius: 999,
                background: "var(--bg-deep)",
                overflow: "hidden",
                boxShadow: "inset 0 0 0 1px var(--line-faint)",
              }}
            >
              <div
                style={{
                  width: `${node.progress}%`,
                  height: "100%",
                  borderRadius: 999,
                  background: node.tone,
                  boxShadow: `0 0 12px -1px ${node.tone}`,
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: 9, flexWrap: "wrap", marginBottom: 18 }}>
            {node.sub.map((s) => (
              <a
                key={s.key}
                href={s.href}
                onClick={(e) => e.preventDefault()}
                className="fz-sub"
                style={
                  {
                    "--hex": node.hex,
                    borderColor: `color-mix(in srgb, ${node.hex} 55%, transparent)`,
                    fontSize: 11,
                    padding: "6px 11px",
                  } as CSSProperties
                }
              >
                <span className="fz-sub-dot" style={{ background: node.hex, boxShadow: `0 0 7px -1px ${node.hex}` }} />
                {t(`${node.id}.sub.${s.key}`)}
                <Icon n="arrow-up-right" size={11} style={{ width: 11, height: 11, opacity: 0.7 }} />
              </a>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <NeonButton variant="solid" tone={node.tone} iconRight={<Icon n="arrow-up-right" size={15} />}>
              {tf("openProject")}
            </NeonButton>
            <NeonButton variant="ghost" onClick={onClose} icon={<Icon n="arrow-left" size={14} />}>
              {tf("backToOrbit")}
            </NeonButton>
          </div>
        </div>
      </motion.div>
    </FzDialog>
  );
}
