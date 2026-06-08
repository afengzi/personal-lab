"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/hud/Icon";
import { NeonButton } from "@/components/hud/NeonButton";
import { visitorSeed } from "@/content/telemetry";
import { SectionLabel } from "./SectionLabel";

export type VisitorItem = { id: string; title: string; handle: string; time: string; votes: number };

/* Upvotable list of visitor submissions. (Task 19 passes live items + a server
   vote handler; here it falls back to the curated seed with local voting.) */
export function VisitorBody({
  items,
  onOpenSubmit,
  onVote,
}: {
  items?: VisitorItem[];
  onOpenSubmit: () => void;
  onVote?: (id: string) => void;
}) {
  const t = useTranslations();
  const resolved: VisitorItem[] =
    items ?? visitorSeed.map((v) => ({ id: v.id, title: t(`visitor.${v.titleKey}`), handle: v.handle, time: v.time, votes: v.votes }));
  const [votes, setVotes] = useState<Record<string, { n: number; on: boolean }>>(() =>
    Object.fromEntries(resolved.map((v) => [v.id, { n: v.votes, on: false }])),
  );

  const vote = (id: string) => {
    setVotes((v) => {
      const c = v[id] ?? { n: 0, on: false };
      return { ...v, [id]: { n: c.on ? c.n - 1 : c.n + 1, on: !c.on } };
    });
    onVote?.(id);
  };

  return (
    <div>
      <SectionLabel>{t("visitor.submissions", { n: resolved.length })}</SectionLabel>
      {resolved.length === 0 && <div className="act-s" style={{ padding: "10px 0" }}>{t("visitor.empty")}</div>}
      {resolved.map((v) => (
        <div className="vi-row" key={v.id}>
          <div className="vi-ico">
            <Icon n="lightbulb" size={14} color="var(--amber)" />
          </div>
          <div className="vi-main">
            <div className="vi-title">{v.title}</div>
            <div className="vi-handle">{v.handle}</div>
          </div>
          <div className="vi-time">{v.time}</div>
          <button type="button" className={"vote-btn" + (votes[v.id]?.on ? " voted" : "")} onClick={() => vote(v.id)}>
            <Icon n="chevron-up" size={13} color="var(--green)" />
            <span>{votes[v.id]?.n ?? v.votes}</span>
          </button>
        </div>
      ))}
      <div style={{ marginTop: 16 }}>
        <NeonButton variant="outline" tone="var(--green)" icon={<Icon n="plus" size={14} />} onClick={onOpenSubmit}>
          {t("visitor.submitYourIdea")}
        </NeonButton>
      </div>
    </div>
  );
}
