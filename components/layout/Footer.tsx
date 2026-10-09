"use client";

/**
 * Site footer: brand, navigation, contact placeholder, market note,
 * legal links and the mandatory prototype disclaimer.
 */

import Link from "next/link";
import { useEffect, useState } from "react";

import { Logo } from "@/components/brand/Logo";
import { useLang } from "@/components/i18n/LanguageProvider";

const PRODUCT_LINKS = [
  { href: "/technology", key: "nav.technology" as const },
  { href: "/platform", key: "nav.platform" as const },
  { href: "/map", key: "nav.map" as const },
  { href: "/dashboard", key: "nav.dashboard" as const },
];

const COMPANY_LINKS = [
  { href: "/about", key: "nav.about" as const },
  { href: "/contact", key: "nav.contact" as const },
  { href: "/privacy", key: "footer.privacy" as const },
  { href: "/terms", key: "footer.terms" as const },
];

export function Footer() {
  const { t } = useLang();

  // Client-only clock (cacheComponents forbids new Date() during prerender).
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <footer className="bg-navy text-white">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Logo variant="light" />
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-steel">
              {t("footer.tagline")}
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/5 px-3 py-1.5 text-[12px] font-semibold text-steel">
              <span className="status-dot bg-amber" />
              {t("footer.market")}
            </p>
          </div>

          {/* Product */}
          <nav aria-label="Product" className="md:col-span-3">
            <h3 className="text-eyebrow mb-4 text-amber">{t("footer.navigation")}</h3>
            <ul className="space-y-2.5">
              {PRODUCT_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[15px] text-steel transition-colors hover:text-white"
                  >
                    {t(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company" className="md:col-span-2">
            <h3 className="text-eyebrow mb-4 text-amber">Company</h3>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[15px] text-steel transition-colors hover:text-white"
                  >
                    {t(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="md:col-span-2">
            <h3 className="text-eyebrow mb-4 text-amber">{t("footer.contact")}</h3>
            <p className="text-[14px] leading-relaxed text-steel">
              {t("footer.contactNote")}
            </p>
            <Link
              href="/contact"
              className="mt-3 inline-flex text-[15px] font-semibold text-amber transition-colors hover:text-amber-hover"
            >
              {t("cta.pilot")} →
            </Link>
          </div>
        </div>

        {/* Prototype disclaimer */}
        <p className="mt-12 rounded-xl border border-white/10 bg-white/5 p-4 text-[13px] leading-relaxed text-steel">
          <span className="font-semibold uppercase tracking-[0.1em] text-amber">
            Prototype notice · {t("demo.badge")}
          </span>
          <br />
          {t("footer.disclaimer")}
        </p>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-[13px] text-steel sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} QORGAU — road safety technology prototype.</p>
          <p>
            <Link href="/privacy" className="transition-colors hover:text-white">
              {t("footer.privacy")}
            </Link>
            <span className="mx-2 text-white/25">·</span>
            <Link href="/terms" className="transition-colors hover:text-white">
              {t("footer.terms")}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
