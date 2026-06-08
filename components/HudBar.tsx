"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { Icon } from "@/components/hud/Icon";
import { LocaleToggle } from "./LocaleToggle";

/* Top-right status + nav (Cockpit/Roadmap) + language toggle. Hidden when a
   detail overlay is open. */
export function HudBar({
  ideasCount,
  modulesCount,
  hidden,
}: {
  ideasCount: number;
  modulesCount: number;
  hidden?: boolean;
}) {
  const t = useTranslations();
  return (
    <div className="hud-top" style={{ visibility: hidden ? "hidden" : "visible" } as CSSProperties}>
      <span className="hud-status">
        <span className="fz-dot is-live" style={{ background: "var(--green)", color: "var(--green)" }} />
        {t("hud.status", { ideas: ideasCount, modules: modulesCount })}
      </span>
      <button type="button" className="nav-btn active">
        <Icon n="orbit" size={13} /> {t("nav.cockpit")}
      </button>
      <Link href="/roadmap" className="nav-btn">
        <Icon n="map" size={13} /> {t("nav.roadmap")}
      </Link>
      <LocaleToggle />
    </div>
  );
}
