"use client";

/**
 * Solution section: horizontal DETECT → ANALYZE → WARN process diagram.
 * Stacks vertically on mobile; thin connecting line with amber highlights.
 */

import { Camera, Cpu, Siren } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/Badge";
import { useLang } from "@/components/i18n/LanguageProvider";
import type { TranslationKey } from "@/lib/i18n";

const STEPS = [
  {
    number: "01",
    icon: Camera,
    key: "home.solution.detect" as TranslationKey,
    body: "A roadside camera continuously monitors a defined zone of the carriageway and its shoulder.",
    techNote: "Fixed camera · defined monitoring zone",
  },
  {
    number: "02",
    icon: Cpu,
    key: "home.solution.analyze" as TranslationKey,
    body: "Computer vision examines each frame and flags objects classified as potential livestock hazards.",
    techNote: "Detection model · edge inference prototype",
  },
  {
    number: "03",
    icon: Siren,
    key: "home.solution.warn" as TranslationKey,
    body: "When predefined conditions are met, the system activates an amber roadside warning signal for approaching drivers.",
    techNote: "Controller · amber beacon / warning sign",
  },
] as const;

export function SolutionSection() {
  const { t } = useLang();

  return (
    <section className="bg-surface py-20 md:py-24" aria-labelledby="solution-title">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="The solution"
            title={<span id="solution-title">{t("home.solution.title")}</span>}
            description="QORGAU turns a passive stretch of road into an aware one: detect the hazard, decide whether it matters, and warn in time."
          />
        </Reveal>

        <div className="relative mt-14">
          {/* Connecting line (desktop only) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[16%] right-[16%] top-[26px] hidden h-px bg-gradient-to-r from-line via-amber/60 to-line lg:block"
          />

          <ol className="grid gap-10 lg:grid-cols-3">
            {STEPS.map((step, i) => (
              <Reveal as="li" key={step.number} delay={i * 110}>
                <div className="relative">
                  <div className="flex items-center gap-4">
                    <span className="relative z-10 flex h-[52px] w-[52px] items-center justify-center rounded-2xl border border-line bg-surface text-navy shadow-[0_1px_2px_rgba(16,28,44,0.06)]">
                      <step.icon size={22} />
                    </span>
                    <span className="text-eyebrow text-amber">{step.number}</span>
                  </div>

                  <h3 className="text-card mt-6">{t(step.key)}</h3>
                  <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-ink-soft">
                    {step.body}
                  </p>
                  <p className="mt-4 inline-block rounded-md border border-line bg-canvas px-2.5 py-1 text-[12px] font-medium text-ink-soft">
                    {step.techNote}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
