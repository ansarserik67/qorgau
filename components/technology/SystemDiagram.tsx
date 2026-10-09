import { Cpu, Video, GitBranch, Microchip, Siren, Server, Monitor } from "lucide-react";
import { ArrowRight, ArrowDown } from "lucide-react";

import { LifecycleBadge } from "@/components/ui/Badge";

/**
 * System architecture diagram (markup + styles only, no client JS).
 *
 *   Camera → Computer Vision → Hazard Logic → ESP32 Controller → Warning Signal
 *                                    └→ Backend → QORGAU Dashboard
 */

const MAIN_NODES = [
  {
    icon: Video,
    name: "Camera",
    detail: "Fixed unit aimed at the monitoring zone",
    badge: { label: "Prototype", tone: "prototype" as const },
  },
  {
    icon: Cpu,
    name: "Computer Vision",
    detail: "Detection model classifies animals in frames",
    badge: { label: "Prototype", tone: "prototype" as const },
  },
  {
    icon: GitBranch,
    name: "Hazard Logic",
    detail: "Decides whether a detection meets warning criteria",
    badge: { label: "Prototype", tone: "prototype" as const },
  },
  {
    icon: Microchip,
    name: "ESP32 Controller",
    detail: "Receives the decision and drives the signal hardware",
    badge: { label: "In development", tone: "development" as const },
  },
  {
    icon: Siren,
    name: "Warning Signal",
    detail: "Amber beacon / roadside warning sign",
    badge: { label: "In development", tone: "development" as const },
  },
];

const DATA_NODES = [
  {
    icon: Server,
    name: "Backend API",
    detail: "Stores events, device states and reports",
    badge: { label: "Prototype", tone: "prototype" as const },
  },
  {
    icon: Monitor,
    name: "QORGAU Dashboard",
    detail: "Event review, device status, hazard map",
    badge: { label: "Prototype", tone: "prototype" as const },
  },
];

function Node({ node }: { node: (typeof MAIN_NODES)[number] }) {
  return (
    <li className="card flex min-w-[190px] flex-1 flex-col p-4">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy text-amber">
        <node.icon size={18} />
      </span>
      <p className="mt-3 font-display text-[15px] font-bold text-ink">{node.name}</p>
      <p className="mt-1 flex-1 text-[13px] leading-relaxed text-ink-soft">
        {node.detail}
      </p>
      <span className="mt-3">
        <LifecycleBadge {...node.badge} />
      </span>
    </li>
  );
}

function Arrow({ vertical = false }: { vertical?: boolean }) {
  const Icon = vertical ? ArrowDown : ArrowRight;
  return (
    <li
      aria-hidden="true"
      className="flex shrink-0 items-center justify-center text-amber"
    >
      <Icon size={vertical ? 20 : 22} />
    </li>
  );
}

export function SystemDiagram() {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5 md:p-7">
      {/* Signal chain */}
      <p className="text-eyebrow text-ink-soft">Signal chain</p>
      <ol className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-stretch lg:gap-2">
        {MAIN_NODES.flatMap((node, i) => [
          <Node key={node.name} node={node} />,
          ...(i < MAIN_NODES.length - 1
            ? [<Arrow key={`arrow-${node.name}`} vertical />]
            : []),
        ])}
      </ol>

      {/* Data path */}
      <p className="text-eyebrow mt-8 text-ink-soft">Data path</p>
      <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-stretch lg:gap-2">
        <p className="flex items-center rounded-xl border border-dashed border-line bg-canvas px-4 py-3 text-[13px] text-ink-soft lg:max-w-[240px]">
          Hazard logic also emits an event record (timestamp, classification,
          confidence, warning state).
        </p>
        <Arrow vertical />
        <ol className="flex flex-1 flex-col gap-3 lg:flex-row lg:items-stretch lg:gap-2">
          {DATA_NODES.flatMap((node, i) => [
            <Node key={node.name} node={node} />,
            ...(i < DATA_NODES.length - 1
              ? [<Arrow key={`arrow-${node.name}`} vertical />]
              : []),
          ])}
        </ol>
      </div>

      <p className="mt-6 border-t border-line pt-4 text-[13px] text-ink-soft">
        Integration with existing road infrastructure (regional traffic
        management systems, variable message signs, patrol dispatch) is a{" "}
        <span className="font-semibold text-ink">planned</span> step and is not
        implemented in the prototype.
      </p>
    </div>
  );
}
