"use client";

/**
 * Product architecture: four QORGAU modules with honest lifecycle labels.
 */

import { Video, Lightbulb, MonitorCog, Map } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { LifecycleBadge, SectionHeading, TextLink } from "@/components/ui/Badge";
import { useLang } from "@/components/i18n/LanguageProvider";

const MODULES = [
  {
    icon: Video,
    name: "QORGAU Vision",
    tagline: "Camera & computer vision",
    body: "A roadside camera captures a monitored zone; the detection model classifies animals and estimates hazard proximity. Bench-tested in the lab, not yet validated on a live road.",
    badge: { label: "Prototype", tone: "prototype" as const },
  },
  {
    icon: Lightbulb,
    name: "QORGAU Signal",
    tagline: "Roadside warning signals",
    body: "An amber warning light or sign, driven by an ESP32-class controller, activated when hazard conditions are met. Firmware and enclosure design are being prepared for field trials.",
    badge: { label: "In development", tone: "development" as const },
  },
  {
    icon: MonitorCog,
    name: "QORGAU Control",
    tagline: "Device management & event monitoring",
    body: "A web platform for device status, event history and review workflows. The demonstration dashboard on this site runs on simulated data produced by this module's intended logic.",
    badge: { label: "Prototype", tone: "prototype" as const },
  },
  {
    icon: Map,
    name: "QORGAU Map",
    tagline: "Hazard locations",
    body: "A shared view of reported and detected hazard locations, designed to help plan fencing, signage and patrol priorities. Data integration with regional systems is a planned step.",
    badge: { label: "Planned", tone: "planned" as const },
  },
];

export function ArchitectureSection() {
  const { t } = useLang();

  return (
    <section className="bg-canvas py-20 md:py-24" aria-labelledby="architecture-title">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Product architecture"
            title={<span id="architecture-title">{t("home.architecture.title")}</span>}
            description="Four modules that can be deployed together or evaluated one at a time. Each carries an honest label of where it stands today."
          />
        </Reveal>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {MODULES.map((m, i) => (
            <Reveal as="li" key={m.name} delay={i * 80}>
              <article className="card card-hover flex h-full flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-amber">
                    <m.icon size={20} />
                  </span>
                  <LifecycleBadge {...m.badge} />
                </div>
                <h3 className="text-card mt-5">{m.name}</h3>
                <p className="mt-1 text-[13px] font-semibold text-amber-hover">
                  {m.tagline}
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
                  {m.body}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={100}>
          <div className="mt-10">
            <TextLink href="/technology">{t("nav.technology")}</TextLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
