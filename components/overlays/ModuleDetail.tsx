"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { FzDialog } from "./FzDialog";
import { Icon } from "@/components/hud/Icon";
import type { ModuleNode } from "@/content/types";
import { GithubBody } from "./bodies/GithubBody";
import { ConsoleBody } from "./bodies/ConsoleBody";
import { MissionBody } from "./bodies/MissionBody";
import { VisitorBody } from "./bodies/VisitorBody";
import { QuickBody } from "./bodies/QuickBody";
import { TelemetryBody } from "./bodies/TelemetryBody";

const MOD_WIDTH: Record<string, number> = {
  github: 530,
  console: 560,
  mission: 600,
  visitor: 530,
  quick: 560,
  telemetry: 600,
};

/* A system module's panel flying to the front. One shell, a body per id. */
export function ModuleDetail({
  node,
  onClose,
  onNav,
  onOpenSubmit,
}: {
  node: ModuleNode;
  onClose: () => void;
  onNav: (id: string) => void;
  onOpenSubmit: () => void;
}) {
  const t = useTranslations();
  const reduce = useReducedMotion();
  const w = MOD_WIDTH[node.id] ?? 540;

  let body: React.ReactNode = null;
  if (node.id === "github") body = <GithubBody />;
  else if (node.id === "console") body = <ConsoleBody />;
  else if (node.id === "mission") body = <MissionBody />;
  else if (node.id === "visitor") body = <VisitorBody onOpenSubmit={onOpenSubmit} />;
  else if (node.id === "quick") body = <QuickBody onNav={onNav} />;
  else if (node.id === "telemetry") body = <TelemetryBody />;

  return (
    <FzDialog open onClose={onClose} title={t(`modules.${node.id}.title`)}>
      <motion.div
        className="fz-fly-card"
        style={
          { width: `min(${w}px, 94vw)`, "--hex": node.hex, "--frame": `color-mix(in srgb, ${node.tone} 60%, var(--line))` } as CSSProperties
        }
        initial={reduce ? false : { scale: 0.82, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="fz-fly-glow"
          style={{
            background: `radial-gradient(120% 150% at 8% 0%, color-mix(in srgb, ${node.tone} 26%, transparent), transparent 58%)`,
          }}
        />
        <div className="fz-fly-edge" style={{ background: node.hex, boxShadow: `0 0 16px 1px ${node.hex}` }} />
        <button type="button" className="fz-fly-close" onClick={onClose} aria-label="Close">
          <Icon n="x" size={16} />
        </button>
        <div style={{ position: "relative", padding: "28px 30px 28px" }}>
          <div className="mod-detail-head">
            <div className="mod-detail-ic" style={{ ["--hex" as string]: node.hex }}>
              <Icon n={node.icon} size={24} color={node.hex} />
            </div>
            <div>
              <div className="mod-detail-cat">{t("modules.label")}</div>
              <div className="mod-detail-title" style={{ textShadow: `0 0 16px ${node.hex}` }}>
                {t(`modules.${node.id}.title`)}
              </div>
            </div>
          </div>
          <div className="mod-body fz-scroll">{body}</div>
        </div>
      </motion.div>
    </FzDialog>
  );
}
