"use client";

import { useTranslations } from "next-intl";
import { Icon } from "@/components/hud/Icon";
import { StatusPill } from "@/components/hud/Indicators";
import { owner, activity } from "@/content/telemetry";
import { SectionLabel } from "./SectionLabel";

/* Live GitHub profile + activity. (Task 20 will feed real data via props;
   for now it renders the curated fallback identity.) */
export function GithubBody() {
  const t = useTranslations();
  return (
    <div>
      <div className="gh-profile">
        <div className="gh-avatar">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.svg" alt="fz" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="gh-name">{owner.handle}</div>
          <div className="gh-bio">{t("owner.tagline")}</div>
          <div className="gh-meta">
            <span>
              <Icon n="map-pin" size={11} color="var(--text-dim)" />
              {t("owner.location")}
            </span>
            <span>
              <Icon n="link" size={11} color="var(--text-dim)" />
              {owner.url}
            </span>
          </div>
        </div>
        <StatusPill tone="var(--green)" live>
          {t("github.live")}
        </StatusPill>
      </div>
      <div className="gh-stats">
        <div className="gh-stat">
          <div className="n">{owner.repos}</div>
          <div className="l">{t("github.repos")}</div>
        </div>
        <div className="gh-stat">
          <div className="n">{owner.followers}</div>
          <div className="l">{t("github.followers")}</div>
        </div>
        <div className="gh-stat">
          <div className="n">{owner.following}</div>
          <div className="l">{t("github.following")}</div>
        </div>
        <div className="gh-stat">
          <div className="n">{owner.contributions}</div>
          <div className="l">{t("github.commits")}</div>
        </div>
      </div>
      <SectionLabel>{t("github.recentActivity")}</SectionLabel>
      {activity.map((a, i) => (
        <div className="act-row" key={i}>
          <div className="act-ico">
            <Icon n={a.icon} size={12} color={a.tone} />
          </div>
          <div className="act-main">
            <div className="act-t">{t(`activity.${a.titleKey}`)}</div>
            <div className="act-s">{t(`activity.${a.subKey}`)}</div>
          </div>
          <div className="act-time">{a.time}</div>
        </div>
      ))}
    </div>
  );
}
