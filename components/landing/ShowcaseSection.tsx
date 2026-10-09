"use client";

/**
 * Technology showcase: a clearly labelled simulated detection frame with a
 * bounding box, demo confidence score, timestamp and warning state.
 *
 * Everything on screen is interface simulation on top of a local illustrative
 * image — no live inference, no live road feed.
 */

import Image from "next/image";
import { AlertTriangle, Radio } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/Badge";

const SAMPLE = {
  id: "EVT-2026-0064",
  timestamp: "2026-10-08 18:12 (simulated clock)",
  location: "M-36 · Astana–Karaganda highway, km 148",
  animal: "Cow",
  confidence: "91%",
  warning: "Signal activated (simulated)",
};

export function ShowcaseSection() {
  return (
    <section className="bg-panel py-20 md:py-24" aria-labelledby="showcase-title">
      <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-7">
          <SectionHeading
            dark
            eyebrow="Technology showcase"
            title={<span id="showcase-title">A closer look at detection.</span>}
            description="A frame from our local demonstration video, overlaid with the interface the operator would see: a bounding box, a demo inference score, and the warning decision."
          />

          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-navy">
            {/* Viewer header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-4 py-2.5">
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-steel">
                <Radio size={13} className="text-amber" />
                Camera CAM-01 · zone A
              </span>
              <span className="rounded-md border border-danger/50 bg-danger/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#ff9c9c]">
                Simulated demonstration — not a live road feed
              </span>
            </div>

            {/* Frame with overlays */}
            <div className="relative">
              <Image
                src="/images/detection-frame.svg"
                alt="Simulated camera view showing a cow near the lane at dusk with a detection bounding box overlay"
                width={960}
                height={600}
                unoptimized
                loading="lazy"
                className="block h-auto w-full"
              />

              {/* Bounding box (demo inference) */}
              <div
                className="absolute border-2 border-amber"
                style={{ left: "36.5%", top: "52%", width: "27%", height: "30%" }}
              >
                <span className="absolute -top-7 left-0 whitespace-nowrap rounded-t-md bg-amber px-2 py-1 text-[11px] font-bold text-navy">
                  {SAMPLE.animal} · {SAMPLE.confidence}
                </span>
                <span className="absolute -bottom-6 left-0 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.1em] text-amber">
                  Demo inference
                </span>
                {/* Corner accents */}
                <span className="absolute -left-[3px] -top-[3px] h-3 w-3 border-l-2 border-t-2 border-amber" />
                <span className="absolute -right-[3px] -top-[3px] h-3 w-3 border-r-2 border-t-2 border-amber" />
                <span className="absolute -bottom-[3px] -left-[3px] h-3 w-3 border-b-2 border-l-2 border-amber" />
                <span className="absolute -bottom-[3px] -right-[3px] h-3 w-3 border-b-2 border-r-2 border-amber" />
              </div>

              {/* Timestamp chip */}
              <div className="absolute left-4 top-4 rounded-md border border-white/15 bg-panel/80 px-2.5 py-1 font-mono text-[11px] text-steel">
                2026-10-08 18:12:44 (sim)
              </div>

              {/* Warning state chip */}
              <div className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-md border border-amber/50 bg-panel/85 px-3 py-1.5 text-[12px] font-semibold text-amber">
                <span className="status-dot bg-amber pulse-amber" />
                Warning triggered
              </div>
            </div>
          </div>
        </Reveal>

        {/* Event readout */}
        <Reveal delay={120} className="lg:col-span-5">
          <div className="rounded-2xl border border-white/10 bg-navy p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-[18px] font-bold text-white">
                Event readout
              </h3>
              <span className="rounded-md border border-amber/40 bg-amber/12 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-amber">
                Demo data
              </span>
            </div>

            <dl className="mt-5 divide-y divide-white/8 text-[14px]">
              {[
                ["Event ID", SAMPLE.id],
                ["Timestamp", SAMPLE.timestamp],
                ["Location", SAMPLE.location],
                ["Classification", `${SAMPLE.animal} (demo inference)`],
                ["Confidence", `${SAMPLE.confidence} — demo inference, not a measured value`],
                ["Warning state", SAMPLE.warning],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 py-3">
                  <dt className="text-steel">{k}</dt>
                  <dd className="text-right font-semibold text-white">{v}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-5 flex items-start gap-2.5 rounded-xl border border-amber/25 bg-amber/8 p-3.5 text-[13px] leading-relaxed text-steel">
              <AlertTriangle size={16} className="mt-0.5 flex-none text-amber" />
              <span>
                This is an interface demonstration built on a local illustrative
                image. QORGAU is not connected to live highway cameras, and these
                values are not measurements from installed hardware.
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
