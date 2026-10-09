import Link from "next/link";
import type { ReactNode } from "react";
import type { EventSource, EventStatus } from "@/types/event";
import type { DeviceState } from "@/types/device";

/* ---------- Demo data marker ---------- */

export function DemoBadge({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border border-amber/45 bg-amber/12 font-semibold uppercase tracking-[0.1em] text-[#8a5c07] ${
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-[11px]"
      } ${className}`}
    >
      <span className="status-dot bg-amber" />
      Demo data
    </span>
  );
}

/* ---------- Status badges ---------- */

const SOURCE_META: Record<
  EventSource,
  { label: string; className: string }
> = {
  "demo-detection": {
    label: "Detected in demo",
    className: "bg-amber/12 text-[#8a5c07] border-amber/40",
  },
  "user-report": {
    label: "Reported by user",
    className: "bg-[#eef2f7] text-ink-soft border-line",
  },
  "operator-verified": {
    label: "Verified by operator",
    className: "bg-success/10 text-success border-success/35",
  },
};

export function SourceBadge({ source }: { source: EventSource }) {
  const meta = SOURCE_META[source];
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-md border px-2 py-0.5 text-[11px] font-semibold ${meta.className}`}
    >
      {meta.label}
    </span>
  );
}

const STATUS_META: Record<EventStatus, { label: string; dot: string; text: string }> = {
  "simulated-warning": { label: "Simulated warning", dot: "bg-amber", text: "text-[#8a5c07]" },
  "under-review": { label: "Under review", dot: "bg-steel", text: "text-ink-soft" },
  verified: { label: "Verified", dot: "bg-success", text: "text-success" },
  dismissed: { label: "Dismissed", dot: "bg-danger", text: "text-danger" },
};

export function StatusBadge({ status }: { status: EventStatus }) {
  const meta = STATUS_META[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap text-[12px] font-semibold ${meta.text}`}
    >
      <span className={`status-dot ${meta.dot}`} />
      {meta.label}
    </span>
  );
}

const DEVICE_META: Record<DeviceState, { label: string; dot: string; text: string }> = {
  online: { label: "Online — demo", dot: "bg-success", text: "text-success" },
  offline: { label: "Offline — demo", dot: "bg-danger", text: "text-danger" },
  maintenance: { label: "Maintenance — demo", dot: "bg-amber", text: "text-[#8a5c07]" },
  planned: { label: "Planned", dot: "bg-steel", text: "text-ink-soft" },
};

export function DeviceStateBadge({ state }: { state: DeviceState }) {
  const meta = DEVICE_META[state];
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap text-[12px] font-semibold ${meta.text}`}
    >
      <span className={`status-dot ${meta.dot}`} />
      {meta.label}
    </span>
  );
}

/* ---------- Module lifecycle badge ---------- */

export function LifecycleBadge({
  label,
  tone,
}: {
  label: string;
  tone: "prototype" | "development" | "planned";
}) {
  const tones = {
    prototype: "bg-success/10 text-success border-success/35",
    development: "bg-amber/12 text-[#8a5c07] border-amber/40",
    planned: "bg-[#eef2f7] text-ink-soft border-line",
  } as const;
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-md border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] ${tones[tone]}`}
    >
      {label}
    </span>
  );
}

/* ---------- Section heading ---------- */

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  children?: ReactNode;
}) {
  return (
    <div
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <p
          className={`text-eyebrow mb-3 ${dark ? "text-amber" : "text-ink-soft"}`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-section ${dark ? "text-white" : "text-ink"}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-[16px] leading-relaxed ${
            dark ? "text-steel" : "text-ink-soft"
          }`}
        >
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

/* ---------- Inline CTA link ---------- */

export function TextLink({
  href,
  children,
  dark = false,
}: {
  href: string;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 text-[15px] font-semibold transition-colors ${
        dark ? "text-amber hover:text-amber-hover" : "text-ink hover:text-amber-hover"
      }`}
    >
      {children}
      <span aria-hidden="true">→</span>
    </Link>
  );
}
