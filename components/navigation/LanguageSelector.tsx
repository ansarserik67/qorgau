"use client";

/**
 * Segmented EN / RU / KZ language selector.
 * Updates the global language context; visible translated text changes
 * immediately (nav, hero, CTAs, key headings).
 */

import { LANGUAGES } from "@/lib/i18n";
import { useLang } from "@/components/i18n/LanguageProvider";

export function LanguageSelector({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { lang, setLang } = useLang();

  return (
    <div
      role="group"
      aria-label="Select interface language"
      className={`inline-flex items-center rounded-lg border p-0.5 ${
        tone === "dark"
          ? "border-white/15 bg-white/5"
          : "border-line bg-canvas"
      }`}
    >
      {LANGUAGES.map((l) => {
        const active = l.code === lang;
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => setLang(l.code)}
            aria-pressed={active}
            title={l.name}
            className={`rounded-md px-2.5 py-1 text-[12px] font-semibold tracking-[0.06em] transition-colors duration-150 ${
              active
                ? "bg-navy text-white"
                : tone === "dark"
                  ? "text-steel hover:text-white"
                  : "text-ink-soft hover:text-ink"
            }`}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
