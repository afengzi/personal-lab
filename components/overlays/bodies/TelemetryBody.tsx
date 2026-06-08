"use client";

import { useTranslations } from "next-intl";
import { Waveform, Equalizer } from "@/components/hud/Waveform";

function FootPanel({ k, value, valueColor, children }: { k: string; value: string; valueColor: string; children: React.ReactNode }) {
  return (
    <div className="fz-panel" style={{ ["--notch-size" as string]: "8px", padding: 0 }}>
      <div className="foot-panel" style={{ height: 66 }}>
        <div className="foot-l">
          <span className="foot-k">{k}</span>
          <span className="foot-v" style={{ color: valueColor }}>
            {value}
          </span>
        </div>
        <div className="foot-wave">{children}</div>
      </div>
    </div>
  );
}

export function TelemetryBody() {
  const t = useTranslations();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <FootPanel k={t("telemetry.dataIntake")} value="▲ 42.7 MB/s" valueColor="var(--green)">
        <Waveform bars={46} tone="var(--green)" height={30} animated />
      </FootPanel>
      <FootPanel k={t("telemetry.labSignal")} value={t("telemetry.strong")} valueColor="var(--cyan)">
        <Equalizer tone="var(--cyan)" n={32} />
      </FootPanel>
      <FootPanel k={t("telemetry.vibeLevel")} value={t("telemetry.high")} valueColor="var(--magenta)">
        <Waveform bars={46} tone="var(--magenta)" height={30} seed={19} animated />
      </FootPanel>
    </div>
  );
}
