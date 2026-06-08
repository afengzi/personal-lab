"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { ConsoleLog, type LogLine } from "@/components/hud/ConsoleLog";
import { consoleSeed, consoleStream } from "@/content/telemetry";
import { useConsoleStream, useClock } from "@/lib/cosmos/console-hooks";
import { SectionLabel } from "./SectionLabel";

export function ConsoleBody() {
  const t = useTranslations();
  const seed = useMemo<LogLine[]>(
    () => consoleSeed.map((l) => ({ time: l.time, tag: l.tag, msg: t(`console.${l.msgKey}`) })),
    [t],
  );
  const stream = useMemo(() => consoleStream.map((s) => ({ tag: s.tag, msg: t(`console.${s.msgKey}`) })), [t]);
  const lines = useConsoleStream(seed, stream);
  const date = useClock();
  return (
    <div>
      <SectionLabel>
        {t("console.logStream")} · {date}
      </SectionLabel>
      <div className="fz-panel" style={{ ["--notch-size" as string]: "8px", padding: "14px 16px", background: "var(--bg-deep)" }}>
        <ConsoleLog lines={lines} prompt={t("console.vibeMode")} />
      </div>
    </div>
  );
}
