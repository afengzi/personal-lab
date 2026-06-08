"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { LOCALE_COOKIE, type Locale } from "@/i18n/config";

/* Top-right zh/en switch. Writes the locale cookie and refreshes server
   components so messages reload — no URL change (immersive app). */
export function LocaleToggle() {
  const locale = useLocale();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const next: Locale = locale === "zh" ? "en" : "zh";

  const toggle = () => {
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    startTransition(() => router.refresh());
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch language"
      data-pending={pending ? "1" : undefined}
      className="locale-toggle"
    >
      {locale === "zh" ? "EN" : "中"}
    </button>
  );
}
