"use client";

/**
 * Landing hero: navy surface, headline, CTAs, feature labels and an
 * illustrative rendering of a rural Kazakh highway at dusk.
 */

import Link from "next/link";
import Image from "next/image";
import { Camera, Siren, MapPinned } from "lucide-react";

import { useLang } from "@/components/i18n/LanguageProvider";

export function Hero() {
  const { t } = useLang();

  return (
    <section className="relative overflow-hidden bg-navy text-white">
      {/* Restrained background: faint technical grid + amber glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(142,165,190,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(142,165,190,0.07) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(120% 90% at 70% 20%, black 30%, transparent 75%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 h-[420px] w-[420px] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, #F5A623 0%, transparent 65%)" }}
      />

      <div className="container-page relative grid items-center gap-12 py-16 md:py-20 lg:grid-cols-12 lg:gap-10 lg:py-24">
        {/* Copy */}
        <div className="lg:col-span-6">
          <p className="text-eyebrow flex items-center gap-2.5 text-amber">
            <span className="status-dot bg-amber pulse-amber" />
            {t("hero.eyebrow")}
          </p>

          <h1 className="text-display mt-5 text-white">{t("hero.title")}</h1>

          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-steel">
            {t("hero.desc")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/technology" className="btn btn-primary">
              {t("cta.explore")}
            </Link>
            <Link href="/contact" className="btn btn-on-dark">
              {t("cta.pilot")}
            </Link>
          </div>

          {/* Compact factual feature labels */}
          <ul className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6">
            {[
              { icon: Camera, label: t("hero.feature1") },
              { icon: Siren, label: t("hero.feature2") },
              { icon: MapPinned, label: t("hero.feature3") },
            ].map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2.5 text-[14px] font-semibold text-white/90"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/12 bg-white/5 text-amber">
                  <Icon size={16} />
                </span>
                {label}
              </li>
            ))}
          </ul>

          <p className="mt-6 inline-flex items-center gap-2 rounded-lg border border-amber/35 bg-amber/10 px-3 py-1.5 text-[13px] font-semibold text-amber">
            <span className="status-dot bg-amber pulse-amber" />
            {t("hero.status")}
          </p>
        </div>

        {/* Illustration */}
        <figure className="lg:col-span-6">
          <div className="overflow-hidden rounded-2xl border border-white/12 bg-panel shadow-[0_32px_64px_-32px_rgba(0,0,0,0.7)]">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-steel">
                QORGAU Vision · monitoring zone
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-amber/40 bg-amber/12 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-amber">
                <span className="status-dot bg-amber" />
                Simulated
              </span>
            </div>
            <Image
              src="/images/hero-scene.svg"
              alt="Illustrative rendering of a rural Kazakh highway at dusk with cattle near the roadside and an amber electronic warning sign"
              width={1200}
              height={860}
              unoptimized
              priority
              className="block h-auto w-full"
            />
          </div>
          <figcaption className="mt-3 text-[12px] text-steel">
            {t("hero.simulated")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
