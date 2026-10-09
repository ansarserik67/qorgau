import type { Metadata } from "next";
import {
  History,
  Router,
  MapPinned,
  Tags,
  Clock,
  Percent,
  Siren,
  Search,
  ShieldAlert,
  Database,
  CloudOff,
} from "lucide-react";

import { PageHeader } from "@/components/ui/PageHeader";
import { PlatformPreview } from "@/components/platform/PlatformPreview";
import { SourceBadge } from "@/components/ui/Badge";
import { PilotCtaBlock } from "@/components/ui/PilotCtaBlock";

export const metadata: Metadata = {
  title: "The monitoring platform",
  description:
    "QORGAU Control: event history, device status, hazard locations, livestock categories, timestamps, confidence scores, warning states and search — demonstrated with clearly labelled demo data.",
  alternates: { canonical: "/platform" },
};

const FEATURES = [
  { icon: History, title: "Event history", body: "Every detection, report and review decision is stored as a record you can search and audit later." },
  { icon: Router, title: "Device status", body: "Heartbeat, firmware version and power source for each roadside unit, with online / offline / maintenance states." },
  { icon: MapPinned, title: "Hazard locations", body: "Candidate and observed hazard sites on a map, with road name, region and site notes." },
  { icon: Tags, title: "Livestock category", body: "Records carry the detected animal class so patterns by species and season can emerge over time." },
  { icon: Clock, title: "Event timestamps", body: "Full timestamps with timezone-safe storage — when a hazard happened matters as much as where." },
  { icon: Percent, title: "Detection confidence", body: "Model confidence is shown with every detection so operators can judge reliability instead of trusting blindly." },
  { icon: Siren, title: "Warning state", body: "Each record states whether a roadside signal would have been activated, and why." },
  { icon: Search, title: "Search & filtering", body: "Filter by animal, source, status, date range or road; sort any column; open full event details." },
];

const SOURCES = [
  {
    source: "user-report" as const,
    title: "Reported by user",
    body: "A person submits a sighting through the pilot reporting form. Useful for coverage beyond camera zones, but needs review.",
  },
  {
    source: "demo-detection" as const,
    title: "Detected in demo",
    body: "Produced by the simulated detection pipeline in this prototype. In a field deployment this label would read 'detected by device'.",
  },
  {
    source: "operator-verified" as const,
    title: "Verified by operator",
    body: "A human reviewer confirmed the record. Verification is the only path to statistics worth acting on.",
  },
];

export default function PlatformPage() {
  return (
    <>
      <PageHeader
        eyebrow="Platform"
        titleKey="page.platform.title"
        lead="QORGAU Control is the operational half of the product: where events land, how devices are watched, and how a hazard report becomes something a road authority can act on."
      >
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-lg border border-amber/35 bg-amber/10 px-3 py-1.5 text-[13px] font-semibold text-[#8a5c07]">
            <span className="status-dot bg-amber" />
            All figures below are demo data
          </span>
          <a href="/dashboard" className="btn btn-primary">
            Open the demo dashboard
          </a>
        </div>
      </PageHeader>

      {/* Preview */}
      <section className="py-16" aria-labelledby="preview-title">
        <div className="container-page">
          <h2 id="preview-title" className="text-section">
            Interface preview
          </h2>
          <p className="mt-3 max-w-2xl text-[16px] text-ink-soft">
            A live render of the demo dashboard layout — KPI cards, event table
            and device states — produced from the same simulated dataset the{" "}
            <a href="/dashboard" className="font-semibold text-ink underline-offset-2 hover:underline">
              full dashboard
            </a>{" "}
            uses.
          </p>
          <div className="mt-8">
            <PlatformPreview />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-canvas py-16" aria-labelledby="features-title">
        <div className="container-page">
          <h2 id="features-title" className="text-section">
            What the platform provides
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {FEATURES.map(({ icon: Icon, title, body }) => (
              <li key={title} className="card card-hover p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-canvas text-navy">
                  <Icon size={18} />
                </span>
                <h3 className="mt-4 font-display text-[16px] font-bold text-ink">{title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sources */}
      <section className="py-16" aria-labelledby="sources-title">
        <div className="container-page">
          <h2 id="sources-title" className="text-section">
            Where an event comes from matters
          </h2>
          <p className="mt-3 max-w-2xl text-[16px] text-ink-soft">
            Every record carries a source label, and the platform never mixes
            them silently. This is how demo data stays separable from
            observations — today and after a real backend arrives.
          </p>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {SOURCES.map(({ source, title, body }) => (
              <li key={title} className="card p-6">
                <SourceBadge source={source} />
                <h3 className="text-card mt-4">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Boundaries */}
      <section className="bg-canvas py-16" aria-labelledby="boundaries-title">
        <div className="container-page grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="boundaries-title" className="text-section">
              What the platform does not do
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
              Trust in this industry is built by stating limits clearly. QORGAU
              today is a prototype with simulated data — here is exactly where
              the boundary sits.
            </p>
          </div>
          <ul className="grid gap-4 lg:col-span-7">
            {[
              { icon: Database, text: "No access to government or insurance databases. Nothing on this site is sourced from official crash records." },
              { icon: CloudOff, text: "No live connection to highway cameras. All detections shown are produced by the local demo pipeline." },
              { icon: ShieldAlert, text: "No safety certification. Deployment on public roads would require proper review and approval processes." },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-4 rounded-xl border border-line bg-surface p-5">
                <span className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-canvas text-ink-soft">
                  <Icon size={17} />
                </span>
                <p className="text-[15px] leading-relaxed text-ink-soft">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PilotCtaBlock />
    </>
  );
}
