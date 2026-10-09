"use client";

/**
 * Pilot program section (navy) — invites qualified partners to discuss
 * evaluating the prototype.
 */

import Link from "next/link";
import { HardHat, Building2, Truck, Beef } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { useLang } from "@/components/i18n/LanguageProvider";

const AUDIENCES = [
  { icon: HardHat, label: "Road safety professionals" },
  { icon: Building2, label: "Regional administrations" },
  { icon: Truck, label: "Transport companies" },
  { icon: Beef, label: "Livestock owners" },
];

export function PilotSection() {
  const { t } = useLang();

  return (
    <section className="bg-navy py-20 text-white md:py-24" aria-labelledby="pilot-title">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="text-eyebrow mb-3 text-amber">Pilot program</p>
            <h2 id="pilot-title" className="text-section text-white">
              {t("home.pilot.title")}
            </h2>
            <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-steel">
              {t("home.pilot.text")}
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {AUDIENCES.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[14px] font-semibold text-white/90"
                >
                  <Icon size={17} className="text-amber" />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={110} className="lg:col-span-5">
            <div className="rounded-2xl border border-white/10 bg-navy-2 p-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-amber/40 bg-amber/10 text-amber">
                <span className="status-dot bg-amber pulse-amber" style={{ width: 12, height: 12 }} />
              </div>
              <p className="mt-5 text-[15px] leading-relaxed text-steel">
                A pilot starts with a conversation: which road section, which
                season, and what would count as a useful result for your team.
              </p>
              <Link href="/contact" className="btn btn-primary mt-6 w-full">
                {t("cta.discuss")}
              </Link>
              <p className="mt-4 text-[12px] text-steel">
                No commitment required — we are at the evaluation stage.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
