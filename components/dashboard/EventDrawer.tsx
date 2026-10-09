"use client";

/**
 * Event details drawer: slides in from the right, closes on Escape or
 * backdrop click, traps nothing (lightweight, accessible close button).
 */

import { useEffect, useRef } from "react";
import { X, MapPin, TriangleAlert } from "lucide-react";

import { DemoBadge, SourceBadge, StatusBadge } from "@/components/ui/Badge";
import { formatDateTime } from "@/lib/api";
import type { DetectionEvent } from "@/types/event";

const ANIMAL_LABEL: Record<DetectionEvent["animal"], string> = {
  cow: "Cow",
  horse: "Horse",
  sheep: "Sheep",
  goat: "Goat",
  camel: "Camel",
  unknown: "Unknown",
};

export function EventDrawer({
  event,
  onClose,
  onViewOnMap,
}: {
  event: DetectionEvent | null;
  onClose: () => void;
  onViewOnMap?: (event: DetectionEvent) => void;
}) {
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!event) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [event, onClose]);

  if (!event) return null;

  const rows: [string, React.ReactNode][] = [
    ["Event ID", <span key="id" className="font-mono">{event.id}</span>],
    ["Timestamp", formatDateTime(event.timestamp)],
    ["Classification", `${ANIMAL_LABEL[event.animal]} (demo inference)`],
    [
      "Confidence",
      `${Math.round(event.confidence * 100)}% — demo inference, not a measured value`,
    ],
    ["Location", `${event.locationName} · ${event.region}`],
    ["Road", event.roadName],
    ["Coordinates", `${event.lat.toFixed(4)}, ${event.lng.toFixed(4)} (demo)`],
    ["Device", event.deviceId],
    [
      "Warning signal",
      event.warningTriggered
        ? "Activated (simulated)"
        : "Not activated (simulated)",
    ],
    ["Source", <SourceBadge key="src" source={event.source} />],
    ["Status", <StatusBadge key="st" status={event.status} />],
  ];

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label={`Event details ${event.id}`}>
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close event details"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-navy/45 backdrop-blur-[2px]"
      />

      {/* Panel */}
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col border-l border-line bg-surface shadow-2xl">
        <header className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="font-display text-[18px] font-bold text-ink">
                Event details
              </h2>
              <DemoBadge size="sm" />
            </div>
            <p className="mt-0.5 text-[13px] text-ink-soft">
              {formatDateTime(event.timestamp)}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-line text-ink-soft transition-colors hover:bg-canvas hover:text-ink"
          >
            <X size={17} />
          </button>
        </header>

        <div className="thin-scroll flex-1 overflow-y-auto px-5 py-4">
          <dl className="divide-y divide-line">
            {rows.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6 py-3 text-[13.5px]">
                <dt className="flex-none text-ink-soft">{k}</dt>
                <dd className="text-right font-semibold text-ink">{v}</dd>
              </div>
            ))}
          </dl>

          {event.notes && (
            <p className="mt-4 rounded-xl border border-line bg-canvas p-4 text-[13px] leading-relaxed text-ink-soft">
              <span className="font-semibold text-ink">Operator note: </span>
              {event.notes}
            </p>
          )}

          <p className="mt-4 flex items-start gap-2.5 rounded-xl border border-amber/30 bg-amber/8 p-4 text-[13px] leading-relaxed text-ink-soft">
            <TriangleAlert size={16} className="mt-0.5 flex-none text-amber-hover" />
            <span>
              This record is simulated demonstration data from the QORGAU
              prototype. It does not describe a real traffic incident.
            </span>
          </p>
        </div>

        <footer className="flex gap-3 border-t border-line px-5 py-4">
          {onViewOnMap && (
            <button
              type="button"
              onClick={() => onViewOnMap(event)}
              className="btn btn-primary flex-1"
            >
              <MapPin size={15} />
              View on map
            </button>
          )}
          <button type="button" onClick={onClose} className="btn btn-secondary flex-1">
            Close
          </button>
        </footer>
      </aside>
    </div>
  );
}
