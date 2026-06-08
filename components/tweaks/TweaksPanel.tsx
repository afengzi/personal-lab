"use client";

import { useState, type CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/hud/Icon";

export const ACCENTS = [
  { key: "Cyan", hex: "#2ee6f6" },
  { key: "Magenta", hex: "#ff2d9b" },
  { key: "Purple", hex: "#b06bff" },
  { key: "Green", hex: "#2bff88" },
] as const;

export type StarDensity = "sparse" | "medium" | "dense";
export const STAR_COUNT: Record<StarDensity, number> = { sparse: 130, medium: 240, dense: 380 };

export type Tweaks = {
  accent: string; // hex
  stars: StarDensity;
  drift: boolean;
  scanlines: boolean;
};

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" className={`twk-toggle${on ? " on" : ""}`} role="switch" aria-checked={on} onClick={() => onChange(!on)}>
      <i />
    </button>
  );
}

export function TweaksPanel({ value, onChange }: { value: Tweaks; onChange: (patch: Partial<Tweaks>) => void }) {
  const t = useTranslations("tweaks");
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className={`twk-fab${open ? " on" : ""}`} aria-label={t("title")} onClick={() => setOpen((o) => !o)}>
        <Icon n={open ? "x" : "sliders-horizontal"} size={18} />
      </button>

      {open && (
        <div className="fz-panel twk-card" style={{ ["--frame" as string]: "color-mix(in srgb, var(--lab-accent) 50%, var(--line))" }}>
          <div className="twk-card-title">{t("title")}</div>

          <div className="twk-row">
            <span className="twk-label">{t("accent")}</span>
            <div className="twk-swatches">
              {ACCENTS.map((a) => (
                <button
                  key={a.key}
                  type="button"
                  aria-label={a.key}
                  className={`twk-swatch${value.accent === a.hex ? " on" : ""}`}
                  style={{ background: a.hex, color: a.hex } as CSSProperties}
                  onClick={() => onChange({ accent: a.hex })}
                />
              ))}
            </div>
          </div>

          <div className="twk-row">
            <span className="twk-label">{t("starField")}</span>
            <div className="twk-seg">
              {(["sparse", "medium", "dense"] as StarDensity[]).map((s) => (
                <button key={s} type="button" className={value.stars === s ? "on" : ""} onClick={() => onChange({ stars: s })}>
                  {t(s)}
                </button>
              ))}
            </div>
          </div>

          <div className="twk-row">
            <span className="twk-label">{t("idleDrift")}</span>
            <Toggle on={value.drift} onChange={(v) => onChange({ drift: v })} />
          </div>

          <div className="twk-row">
            <span className="twk-label">{t("scanlines")}</span>
            <Toggle on={value.scanlines} onChange={(v) => onChange({ scanlines: v })} />
          </div>
        </div>
      )}
    </>
  );
}
