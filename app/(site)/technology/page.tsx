import type { Metadata } from "next";

import { PageHeader } from "@/components/ui/PageHeader";
import { SystemDiagram } from "@/components/technology/SystemDiagram";
import { LifecycleBadge, DemoBadge } from "@/components/ui/Badge";
import { PilotCtaBlock } from "@/components/ui/PilotCtaBlock";

export const metadata: Metadata = {
  title: "How the technology works",
  description:
    "The QORGAU detection pipeline: camera monitoring zone, computer vision classification, hazard-zone logic, ESP32 warning signal activation and event logging. Honest status of each stage and configurable technical specifications.",
  alternates: { canonical: "/technology" },
};

const STAGES = [
  {
    n: "1",
    title: "Camera and monitoring zone",
    body: "A fixed camera is aimed at a defined section of road plus its shoulder and the adjacent ground. The zone is chosen together with road specialists: sight distance, approach speed and known crossing points determine where a camera is useful at all.",
    status: { label: "Prototype", tone: "prototype" as const },
  },
  {
    n: "2",
    title: "Livestock detection using computer vision",
    body: "Frames from the camera are passed to an object detection model. The prototype uses a general-purpose detector fine-tuned on publicly available livestock imagery; a Kazakhstan-specific dataset is a planned next step.",
    status: { label: "Prototype", tone: "prototype" as const },
  },
  {
    n: "3",
    title: "Hazard-zone logic",
    body: "Not every animal is a hazard. The logic layer combines classification confidence with the animal's position inside the monitored zone and how long it persists, so a single misclassified frame does not trigger a warning.",
    status: { label: "Prototype", tone: "prototype" as const },
  },
  {
    n: "4",
    title: "Warning signal activation",
    body: "When the criteria are met, a command is sent to an ESP32-class controller that switches an amber beacon or warning sign. Dwell time, reset behaviour and night-time dimming are configurable parameters.",
    status: { label: "In development", tone: "development" as const },
  },
  {
    n: "5",
    title: "Event logging and monitoring",
    body: "Every decision — detection, warning, dismissal — is written as an event record with a timestamp, classification, confidence and source label. These records feed the dashboard and the hazard map.",
    status: { label: "Prototype", tone: "prototype" as const },
  },
  {
    n: "6",
    title: "Future integration with road infrastructure",
    body: "Longer term, events could feed regional traffic management systems, variable message signs or patrol dispatch. This requires agreements and certification that do not exist yet — it is a planned direction, not a current capability.",
    status: { label: "Planned", tone: "planned" as const },
  },
];

const SPECS: { field: string; value: string; status: string }[] = [
  {
    field: "Detection model",
    value: "General-purpose object detector (YOLO-class), fine-tuned on public livestock imagery. Model card and versioning to be published with pilot results.",
    status: "Not yet validated",
  },
  {
    field: "Camera type",
    value: "1080p USB / IP camera used on the lab bench. Field unit selection (low-light sensitivity, housing) is in progress.",
    status: "Lab bench only",
  },
  {
    field: "Processing device",
    value: "Edge computer prototype (Raspberry Pi / Jetson class) for inference; ESP32 for signal control.",
    status: "Prototype",
  },
  {
    field: "Communication method",
    value: "Wi-Fi and 4G router in the lab setup. Low-power radio (LoRa-class) link for roadside deployment is being evaluated.",
    status: "Not yet validated",
  },
  {
    field: "Power supply",
    value: "Mains power in the lab. Intended field configuration is solar panel plus battery; sizing depends on the chosen enclosure and camera.",
    status: "Not yet validated",
  },
  {
    field: "Environmental operating conditions",
    value: "Enclosure design and thermal budget are open. No IP rating, dust, moisture or temperature claims are made — nothing has been certified.",
    status: "Not yet validated",
  },
];

export default function TechnologyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Technology"
        titleKey="page.technology.title"
        lead="A road safety system is only as good as its weakest link. Here is the full chain QORGAU is building — and, honestly, where each link stands today."
      />

      {/* Architecture diagram */}
      <section className="py-16" aria-labelledby="diagram-title">
        <div className="container-page">
          <h2 id="diagram-title" className="text-section">
            System architecture
          </h2>
          <p className="mt-3 max-w-2xl text-[16px] text-ink-soft">
            From photons to warning light: how a frame becomes a decision, and
            how that decision becomes a record someone can review later.
          </p>
          <div className="mt-8">
            <SystemDiagram />
          </div>
        </div>
      </section>

      {/* Workflow stages */}
      <section className="bg-canvas py-16" aria-labelledby="stages-title">
        <div className="container-page">
          <h2 id="stages-title" className="text-section">
            The workflow, stage by stage
          </h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-2">
            {STAGES.map((s) => (
              <li key={s.n} className="card flex gap-5 p-6">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-line bg-canvas font-display text-[15px] font-bold text-navy">
                  {s.n}
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-card">{s.title}</h3>
                    <LifecycleBadge {...s.status} />
                  </div>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-16" aria-labelledby="specs-title">
        <div className="container-page">
          <div className="flex flex-wrap items-center gap-4">
            <h2 id="specs-title" className="text-section">
              Technical specifications
            </h2>
            <DemoBadge />
          </div>
          <p className="mt-3 max-w-2xl text-[16px] text-ink-soft">
            These fields are configurable and will be published with test
            results. Where a value has not been verified in the field, we say
            so instead of estimating.
          </p>

          <div className="card mt-8 overflow-hidden">
            <table className="w-full border-collapse text-left text-[15px]">
              <thead>
                <tr className="border-b border-line bg-canvas">
                  <th scope="col" className="px-5 py-3.5 font-semibold">Parameter</th>
                  <th scope="col" className="px-5 py-3.5 font-semibold">Configuration</th>
                  <th scope="col" className="px-5 py-3.5 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {SPECS.map((spec) => (
                  <tr key={spec.field} className="border-b border-line last:border-0">
                    <td className="px-5 py-4 font-semibold text-ink align-top">
                      {spec.field}
                    </td>
                    <td className="px-5 py-4 text-ink-soft align-top">
                      {spec.value}
                    </td>
                    <td className="px-5 py-4 align-top">
                      <span
                        className={`inline-flex whitespace-nowrap rounded-md border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.06em] ${
                          spec.status === "Not yet validated"
                            ? "border-line bg-canvas text-ink-soft"
                            : "border-amber/40 bg-amber/12 text-[#8a5c07]"
                        }`}
                      >
                        {spec.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 max-w-3xl rounded-xl border border-line bg-surface p-5 text-[14px] leading-relaxed text-ink-soft">
            <span className="font-semibold text-ink">We deliberately publish no numbers</span>{" "}
            for detection range, response time, accuracy, weather resistance or
            battery life. Those require field measurements we have not performed
            yet. Any figure you see on this site is demo interface content, not
            a specification.
          </p>
        </div>
      </section>

      <PilotCtaBlock />
    </>
  );
}
