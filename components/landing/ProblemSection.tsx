"use client";

/**
 * Problem section: three structured blocks describing why livestock on rural
 * roads is a genuine hazard — without inventing accident statistics.
 */

import { Moon, Fence, Gauge } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/Badge";
import { useLang } from "@/components/i18n/LanguageProvider";

const BLOCKS = [
  {
    icon: Fence,
    title: "Livestock can enter roads unexpectedly",
    body: "Cattle and horses move between pastures, villages and water sources. On unfenced rural sections, a herd can reach the carriageway within seconds.",
  },
  {
    icon: Moon,
    title: "Low visibility shrinks reaction time",
    body: "At dusk and during night hours, headlights reveal obstacles late. The faster a vehicle travels, the less distance a driver has to brake or manoeuvre safely.",
  },
  {
    icon: Gauge,
    title: "Warning infrastructure is sparse",
    body: "Many rural roads carry limited lighting and no hazard alerting of their own. Drivers typically learn about a risk only when they see it themselves.",
  },
] as const;

export function ProblemSection() {
  const { t } = useLang();

  return (
    <section className="bg-canvas py-20 md:py-24" aria-labelledby="problem-title">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="The problem"
            title={<span id="problem-title">{t("home.problem.title")}</span>}
            description="Livestock-related road incidents are a known risk on rural routes across Central Asia. QORGAU focuses on one practical question: how can a driver be told earlier that an animal is ahead?"
          />
        </Reveal>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {BLOCKS.map(({ icon: Icon, title, body }, i) => (
            <Reveal as="li" key={title} delay={i * 90}>
              <article className="card card-hover h-full p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-canvas text-navy">
                  <Icon size={20} />
                </span>
                <h3 className="text-card mt-5">{title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                  {body}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120}>
          <p className="mt-10 max-w-3xl rounded-xl border border-line bg-surface p-5 text-[15px] leading-relaxed text-ink-soft">
            <span className="font-semibold text-ink">Why it matters:</span>{" "}
            timely detection may give drivers an additional opportunity to
            react — an earlier warning, an earlier brake, a safer outcome. That
            small window of time is exactly what QORGAU aims to create.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
