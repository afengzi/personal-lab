import { useTranslations } from "next-intl";
import { LocaleToggle } from "@/components/LocaleToggle";

export default function Home() {
  const t = useTranslations();
  return (
    <div style={{ position: "fixed", inset: 0, display: "grid", placeItems: "center" }}>
      <div style={{ position: "fixed", top: 24, right: 24 }}>
        <LocaleToggle />
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <span className="fz-wordmark" style={{ fontSize: 58 }}>
          FENGZIAAA
        </span>
        <div
          className="fz-panel"
          style={
            {
              "--frame": "color-mix(in srgb, var(--cyan) 55%, var(--line))",
              padding: "20px 28px",
              width: 320,
            } as React.CSSProperties
          }
        >
          <div className="fz-label">{t("nav.cockpit")} · {t("nav.roadmap")}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
            <span className="fz-dot is-live" />
            <span style={{ fontFamily: "var(--font-mono)", color: "var(--text)" }}>
              {t("console.ok")}
            </span>
          </div>
        </div>
        <span style={{ fontFamily: "var(--font-mono)", color: "var(--magenta)", textShadow: "var(--glow-magenta)" }}>
          {t("submit.cta")}
        </span>
      </div>
    </div>
  );
}
