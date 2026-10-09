"use client";

/**
 * Hazard map preview on the landing page: a compact interactive Leaflet map
 * with sample markers, a legend and a link to the full hazard map page.
 */

import { useMemo } from "react";

import { HazardMap } from "@/components/maps/HazardMap";
import { MapLegend } from "@/components/maps/MapLegend";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/Badge";
import { DEMO_EVENTS } from "@/lib/demo-data";
import { useLang } from "@/components/i18n/LanguageProvider";

export function MapPreviewSection() {
  const { t } = useLang();

  // Every other demo event keeps the preview readable.
  const previewEvents = useMemo(
    () => DEMO_EVENTS.filter((_, i) => i % 2 === 0).slice(0, 28),
    [],
  );

  return (
    <section className="bg-surface py-20 md:py-24" aria-labelledby="map-preview-title">
      <div className="container-page">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <SectionHeading
              eyebrow="Hazard map"
              title={<span id="map-preview-title">{t("home.mapPreview.title")}</span>}
              description="Every detection, report and review lands on one map — so authorities and transport companies can see where livestock crossings actually cluster, not just where signage happens to be."
            />
          </Reveal>
          <Reveal delay={90} className="lg:col-span-5 lg:text-right">
            <a href="/map" className="btn btn-secondary">
              {t("cta.viewMap")}
            </a>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="card mt-10 overflow-hidden">
            <HazardMap events={previewEvents} height={440} scrollWheelZoom={false} />
            <div className="flex flex-col gap-3 border-t border-line bg-surface px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <MapLegend compact />
              <span className="text-[12px] text-ink-soft">
                Showing {previewEvents.length} of {DEMO_EVENTS.length} demo records ·{" "}
                <a href="/dashboard" className="font-semibold text-ink underline-offset-2 hover:underline">
                  see them in the dashboard
                </a>
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
