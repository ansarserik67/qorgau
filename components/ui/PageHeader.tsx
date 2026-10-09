"use client";

/**
 * Shared page header for public pages: eyebrow, translated title, lead text.
 */

import type { ReactNode } from "react";

import { useLang } from "@/components/i18n/LanguageProvider";
import type { TranslationKey } from "@/lib/i18n";

export function PageHeader({
  eyebrow,
  titleKey,
  fallbackTitle,
  lead,
  children,
  dark = true,
}: {
  eyebrow: string;
  titleKey?: TranslationKey;
  fallbackTitle?: string;
  lead?: ReactNode;
  children?: ReactNode;
  dark?: boolean;
}) {
  const { t } = useLang();
  const title = titleKey ? t(titleKey) : fallbackTitle ?? "";

  return (
    <section
      className={`${dark ? "bg-navy text-white" : "bg-canvas"} py-14 md:py-16`}
    >
      <div className="container-page">
        <p className={`text-eyebrow ${dark ? "text-amber" : "text-ink-soft"}`}>
          {eyebrow}
        </p>
        <h1 className={`text-page mt-3 max-w-3xl ${dark ? "text-white" : ""}`}>
          {title}
        </h1>
        {lead && (
          <p
            className={`mt-5 max-w-3xl text-[17px] leading-relaxed ${
              dark ? "text-steel" : "text-ink-soft"
            }`}
          >
            {lead}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
