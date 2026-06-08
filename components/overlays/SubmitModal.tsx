"use client";

import { useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { FzDialog } from "./FzDialog";
import { Icon } from "@/components/hud/Icon";
import { NeonButton } from "@/components/hud/NeonButton";

const CATEGORY_TONES: Record<string, string> = {
  aiDev: "var(--purple)",
  tools: "var(--green)",
  content: "var(--magenta)",
  analytics: "var(--cyan)",
  platform: "var(--amber)",
};
const CATEGORIES = ["aiDev", "tools", "content", "analytics", "platform"] as const;

export type SubmitPayload = { title: string; desc: string; category: string };

export function SubmitModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (p: SubmitPayload) => void }) {
  const t = useTranslations();
  const reduce = useReducedMotion();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState<string>("aiDev");
  const [busy, setBusy] = useState(false);

  const submit = () => {
    if (!title.trim() || busy) return;
    setBusy(true);
    onSubmit({ title: title.trim(), desc: desc.trim(), category });
  };

  return (
    <FzDialog open onClose={onClose} title={t("submit.title")}>
      <motion.div
        className="fz-fly-card"
        style={{ width: "min(520px, 92vw)", "--frame": "color-mix(in srgb, var(--green) 55%, var(--line))" } as CSSProperties}
        initial={reduce ? false : { scale: 0.86, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="fz-fly-glow"
          style={{ background: "radial-gradient(120% 150% at 8% 0%, color-mix(in srgb, var(--green) 22%, transparent), transparent 58%)" }}
        />
        <div className="fz-fly-edge" style={{ background: "var(--green)", boxShadow: "0 0 16px 1px var(--green)" }} />
        <button type="button" className="fz-fly-close" onClick={onClose} aria-label="Close">
          <Icon n="x" size={16} />
        </button>
        <div style={{ position: "relative", padding: "30px 32px 28px" }}>
          <div
            style={{
              fontFamily: "var(--font-techno)",
              fontWeight: 600,
              fontSize: 10,
              letterSpacing: ".2em",
              textTransform: "uppercase",
              color: "var(--green)",
            }}
          >
            {t("submit.newSubmission")}
          </div>
          <div
            style={{
              fontFamily: "var(--font-techno)",
              fontWeight: 700,
              fontSize: 30,
              color: "#fff",
              textShadow: "0 0 16px var(--green)",
              lineHeight: 1.05,
              margin: "6px 0 4px",
            }}
          >
            {t("submit.title")}
          </div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color: "var(--text-dim)", margin: "0 0 20px" }}>
            {t("submit.prompt")}
          </p>

          <div className="field">
            <label htmlFor="idea-title">{t("submit.ideaTitle")}</label>
            <input
              id="idea-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("submit.ideaTitlePlaceholder")}
              maxLength={120}
              autoFocus
            />
          </div>
          <div className="field">
            <label htmlFor="idea-desc">{t("submit.whatShouldItDo")}</label>
            <textarea
              id="idea-desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder={t("submit.descPlaceholder")}
              maxLength={400}
            />
          </div>
          <div className="field">
            <label>{t("submit.category")}</label>
            <div className="chiprow">
              {CATEGORIES.map((c) => {
                const on = category === c;
                const tone = CATEGORY_TONES[c];
                return (
                  <button
                    type="button"
                    key={c}
                    className={"chip" + (on ? " on" : "")}
                    onClick={() => setCategory(c)}
                    style={on ? { background: tone, borderColor: tone } : undefined}
                  >
                    {t(`categories.${c}`)}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            <NeonButton variant="solid" tone="var(--green)" iconRight={<Icon n="arrow-right" size={15} />} onClick={submit}>
              {t("submit.submitBtn")}
            </NeonButton>
            <NeonButton variant="ghost" onClick={onClose}>
              {t("submit.cancel")}
            </NeonButton>
          </div>
        </div>
      </motion.div>
    </FzDialog>
  );
}
