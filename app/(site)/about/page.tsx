import type { Metadata } from "next";
import Link from "next/link";
import { Target, Wrench, Route, Users, Eye } from "lucide-react";

import { PageHeader } from "@/components/ui/PageHeader";
import { LifecycleBadge, SectionHeading } from "@/components/ui/Badge";
import { PilotCtaBlock } from "@/components/ui/PilotCtaBlock";

export const metadata: Metadata = {
  title: "About QORGAU",
  description:
    "QORGAU is an early-stage road safety initiative exploring practical ways to detect livestock hazards and improve driver awareness on rural roads in Kazakhstan.",
  alternates: { canonical: "/about" },
};

const PILLARS = [
  {
    icon: Target,
    title: "The problem",
    body: "Livestock on rural roads is a familiar hazard in Kazakhstan, but the warning infrastructure on those roads is minimal. Drivers typically discover the risk at the moment they meet it.",
  },
  {
    icon: Wrench,
    title: "The technical approach",
    body: "Off-the-shelf cameras, an object detection model, a small controller and a bright amber signal. We deliberately choose components that can be manufactured and maintained locally at modest cost.",
  },
  {
    icon: Route,
    title: "The prototype roadmap",
    body: "Bench-tested detection pipeline today; a field pilot on one agreed road section next; regional scale only after real measurements — and real agreements — exist.",
  },
  {
    icon: Users,
    title: "The search for pilot partners",
    body: "We are looking for road authorities, regional administrations, transport companies and livestock owners willing to test an early system and give blunt feedback.",
  },
];

const ROADMAP = [
  {
    phase: "Phase 1",
    title: "Lab prototype",
    state: "In progress",
    tone: "development" as const,
    items: [
      "Detection pipeline on bench hardware",
      "Simulated warning logic and event logging",
      "This website and demonstration dashboard",
    ],
  },
  {
    phase: "Phase 2",
    title: "Field pilot",
    state: "Planned",
    tone: "planned" as const,
    items: [
      "One agreed road section, one season of data",
      "Weatherised enclosure and power setup",
      "Measured detection and warning performance",
    ],
  },
  {
    phase: "Phase 3",
    title: "Regional evaluation",
    state: "Planned",
    tone: "planned" as const,
    items: [
      "Several sites across different regions",
      "Joint review with road safety specialists",
      "Decision on wider deployment — only with evidence",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        titleKey="page.about.title"
        lead="QORGAU is an early-stage road safety initiative exploring practical ways to detect livestock hazards and improve driver awareness on rural roads in Kazakhstan."
      />

      {/* Pillars */}
      <section className="py-16" aria-labelledby="mission-title">
        <div className="container-page">
          <SectionHeading
            eyebrow="Mission"
            title={
              <span id="mission-title">
                Detect earlier. Warn sooner. Make roads safer.
              </span>
            }
            description="A warning light on a dangerous curve is simple technology that has saved lives for decades. QORGAU asks whether the same simplicity can be applied to a hazard that moves: an animal on the road."
          />
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {PILLARS.map(({ icon: Icon, title, body }) => (
              <li key={title} className="card card-hover p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-amber">
                  <Icon size={20} />
                </span>
                <h3 className="text-card mt-5">{title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Roadmap */}
      <section className="bg-canvas py-16" aria-labelledby="roadmap-title">
        <div className="container-page">
          <h2 id="roadmap-title" className="text-section">
            Prototype roadmap
          </h2>
          <p className="mt-3 max-w-2xl text-[16px] text-ink-soft">
            We publish our stages honestly: nothing below is presented as
            achieved until it is measured.
          </p>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {ROADMAP.map((p) => (
              <li key={p.phase} className="card p-6">
                <div className="flex items-center justify-between">
                  <span className="text-eyebrow text-ink-soft">{p.phase}</span>
                  <LifecycleBadge label={p.state} tone={p.tone} />
                </div>
                <h3 className="text-card mt-3">{p.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[14px] text-ink-soft">
                      <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-amber" />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Transparency */}
      <section className="py-16" aria-labelledby="transparency-title">
        <div className="container-page grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Transparency"
              title={<span id="transparency-title">Where we are, honestly.</span>}
            />
          </div>
          <div className="lg:col-span-7">
            <div className="card p-6">
              <span className="inline-flex items-center gap-2 rounded-lg border border-amber/35 bg-amber/10 px-3 py-1.5 text-[13px] font-semibold text-[#8a5c07]">
                <Eye size={15} />
                Current development stage
              </span>
              <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-ink-soft">
                <p>
                  QORGAU is an early-stage startup prototype. There is no
                  production deployment, no certified hardware, and no live
                  connection to highway infrastructure. Every event, device and
                  map marker shown on this website is clearly labelled demo
                  data produced by our local simulation.
                </p>
                <p>
                  We do not publish founder biographies, investor lists,
                  customer logos or partnership claims that have not been
                  confirmed. Team and contact information will appear here once
                  the people behind the project approve it.
                </p>
                <p>
                  If you are evaluating QORGAU for a road authority, a transport
                  company or a research collaboration, we would rather show you
                  a working bench demo and an honest list of unknowns than a
                  polished deck.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3 border-t border-line pt-6">
                <Link href="/technology" className="btn btn-secondary">
                  Review the technology
                </Link>
                <Link href="/contact" className="btn btn-primary">
                  Discuss a pilot
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PilotCtaBlock
        title="Building something adjacent to QORGAU?"
        text="Researchers, hardware makers and road safety practitioners — we are open to collaboration discussions."
      />
    </>
  );
}
