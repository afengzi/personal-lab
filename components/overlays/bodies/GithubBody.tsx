"use client";

import { useTranslations } from "next-intl";
import { Icon } from "@/components/hud/Icon";
import { StatusPill } from "@/components/hud/Indicators";
import { owner, activity } from "@/content/telemetry";
import type { GithubEvent, GithubProfile } from "@/lib/github";
import { SectionLabel } from "./SectionLabel";

export type GithubData = { profile: GithubProfile; events: GithubEvent[] } | null;

/* Live GitHub profile + activity, falling back to the curated identity when no
   live data is available (e.g. before env is configured). */
export function GithubBody({ data }: { data?: GithubData }) {
  const t = useTranslations();

  const profile = data?.profile;
  const handle = profile?.handle ?? owner.handle;
  const bio = profile?.bio ?? t("owner.tagline");
  const location = profile?.location ?? t("owner.location");
  const url = profile?.url ?? owner.url;
  const avatar = profile?.avatarUrl ?? "/logo-mark.svg";
  const repos = profile?.repos ?? owner.repos;
  const followers = profile?.followers ?? owner.followers;
  const following = profile?.following ?? owner.following;

  const events =
    data?.events ??
    activity.map((a) => ({ icon: a.icon, tone: a.tone, title: t(`activity.${a.titleKey}`), sub: t(`activity.${a.subKey}`), time: a.time }));

  return (
    <div>
      <div className="gh-profile">
        <div className="gh-avatar">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={avatar} alt={handle} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="gh-name">{handle}</div>
          <div className="gh-bio">{bio}</div>
          <div className="gh-meta">
            <span>
              <Icon n="map-pin" size={11} color="var(--text-dim)" />
              {location}
            </span>
            <span>
              <Icon n="link" size={11} color="var(--text-dim)" />
              {url}
            </span>
          </div>
        </div>
        <StatusPill tone="var(--green)" live>
          {t("github.live")}
        </StatusPill>
      </div>
      <div className="gh-stats">
        <div className="gh-stat">
          <div className="n">{repos}</div>
          <div className="l">{t("github.repos")}</div>
        </div>
        <div className="gh-stat">
          <div className="n">{followers}</div>
          <div className="l">{t("github.followers")}</div>
        </div>
        <div className="gh-stat">
          <div className="n">{following}</div>
          <div className="l">{t("github.following")}</div>
        </div>
        <div className="gh-stat">
          <div className="n">{owner.contributions}</div>
          <div className="l">{t("github.commits")}</div>
        </div>
      </div>
      <SectionLabel>{t("github.recentActivity")}</SectionLabel>
      {events.map((a, i) => (
        <div className="act-row" key={i}>
          <div className="act-ico">
            <Icon n={a.icon} size={12} color={a.tone} />
          </div>
          <div className="act-main">
            <div className="act-t">{a.title}</div>
            {a.sub && <div className="act-s">{a.sub}</div>}
          </div>
          <div className="act-time">{a.time}</div>
        </div>
      ))}
    </div>
  );
}
