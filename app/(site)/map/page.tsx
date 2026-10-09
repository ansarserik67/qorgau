import type { Metadata } from "next";

import { PageHeader } from "@/components/ui/PageHeader";
import { MapExplorer } from "@/components/maps/MapExplorer";
import { PilotCtaBlock } from "@/components/ui/PilotCtaBlock";

export const metadata: Metadata = {
  title: "Road hazard map",
  description:
    "Interactive map of QORGAU hazard records: livestock detections, user reports and operator reviews across Kazakhstan road sections. All markers are clearly labelled demo data.",
  alternates: { canonical: "/map" },
};

export default function MapPage() {
  return (
    <>
      <PageHeader
        eyebrow="Hazard map"
        titleKey="page.map.title"
        lead="One map for every kind of hazard record: simulated detections, user reports and operator reviews. Search it, filter it, and see exactly where each record comes from."
      />

      <section className="py-10 md:py-12" aria-label="Interactive hazard map">
        <div className="container-page">
          <MapExplorer />
        </div>
      </section>

      <PilotCtaBlock
        title="Know a dangerous crossing we should model?"
        text="Tell us about a road section where livestock regularly meets traffic — it helps us plan pilot sites."
      />
    </>
  );
}
