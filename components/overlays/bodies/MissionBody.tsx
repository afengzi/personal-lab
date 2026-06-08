"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { RadialGauge } from "@/components/hud/RadialGauge";
import { Waveform } from "@/components/hud/Waveform";
import { mission } from "@/content/telemetry";

export function MissionBody() {
  const t = useTranslations();
  const [g, setG] = useState(0);
  useEffect(() => {
    const id = setTimeout(() => setG(mission.value), 250);
    return () => clearTimeout(id);
  }, []);
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 24, alignItems: "center" }}>
        <RadialGauge value={g} max={100} size={150} stroke={11} tone="var(--green)" label="/100" />
        <div className="mission-stats">
          <div className="ms-row">
            <span className="ms-k">{t("mission.missionProgress")}</span>
            <span className="ms-v" style={{ color: "var(--green)" }}>
              {mission.value}%
            </span>
          </div>
          <div className="ms-row">
            <span className="ms-k">{t("mission.ideasReceived")}</span>
            <span className="ms-v">{mission.received}</span>
          </div>
          <div className="ms-row">
            <span className="ms-k">{t("mission.ideasCompleted")}</span>
            <span className="ms-v" style={{ color: "var(--green)" }}>
              {mission.completed}
            </span>
          </div>
          <div className="ms-row">
            <span className="ms-k">{t("mission.inProgress")}</span>
            <span className="ms-v" style={{ color: "var(--amber)" }}>
              {mission.inProgress}
            </span>
          </div>
        </div>
      </div>
      <div style={{ margin: "18px 0 6px" }}>
        <Waveform bars={40} tone="var(--green)" height={34} animated />
      </div>
      <div className="mission-foot">{t("mission.foot")}</div>
    </div>
  );
}
