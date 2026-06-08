import { useTranslations } from "next-intl";
import { LocaleToggle } from "@/components/LocaleToggle";
import {
  NeonPanel,
  NeonButton,
  RadialGauge,
  Waveform,
  Equalizer,
  StatusPill,
  Tag,
  ProgressBar,
  ConsoleLog,
  QuickTile,
  Icon,
} from "@/components/hud";

export default function Home() {
  const t = useTranslations();
  return (
    <div style={{ position: "fixed", inset: 0, overflow: "auto", padding: 32 }}>
      <div style={{ position: "fixed", top: 24, right: 24, zIndex: 10 }}>
        <LocaleToggle />
      </div>
      <span className="fz-wordmark" style={{ fontSize: 40 }}>
        FENGZIAAA
      </span>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 24, maxWidth: 1100 }}>
        <NeonPanel label={t("modules.mission.title")} accent="var(--green)" dot live right="63 / 100">
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <RadialGauge value={63} tone="var(--green)" size={120} stroke={9} />
            <ProgressBar value={63} tone="var(--green)" showValue />
          </div>
        </NeonPanel>
        <NeonPanel label={t("telemetry.labSignal")} accent="var(--cyan)">
          <Equalizer tone="var(--cyan)" n={28} />
          <div style={{ marginTop: 12 }}>
            <Waveform bars={40} tone="var(--magenta)" height={34} />
          </div>
        </NeonPanel>
        <NeonPanel label={t("console.logStream")} accent="var(--purple)">
          <ConsoleLog
            lines={[
              { time: "22:47:55", tag: "INFO", msg: t("console.init") },
              { time: "22:47:56", tag: "OK", msg: t("console.ok") },
              { time: "22:47:57", tag: "DATA", msg: t("console.ghConnected") },
            ]}
            prompt={t("console.vibeMode")}
          />
        </NeonPanel>
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 20 }}>
        <NeonButton variant="solid" tone="var(--green)" iconRight={<Icon n="arrow-right" size={14} />}>
          {t("submit.submitBtn")}
        </NeonButton>
        <NeonButton variant="outline" tone="var(--cyan)" icon={<Icon n="orbit" size={14} />}>
          {t("nav.cockpit")}
        </NeonButton>
        <StatusPill tone="var(--green)" live>
          {t("github.live")}
        </StatusPill>
        <Tag tone="var(--purple)">{t("categories.aiDev")}</Tag>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 100px)", gap: 10, marginTop: 20 }}>
        <QuickTile icon="notebook-pen" label={t("quick.notes")} tone="var(--cyan)" />
        <QuickTile icon="map" label={t("quick.roadmap")} tone="var(--green)" />
        <QuickTile icon="trophy" label={t("quick.achieve")} tone="var(--amber)" />
        <QuickTile icon="mail" label={t("quick.contact")} tone="var(--magenta)" />
      </div>
    </div>
  );
}
