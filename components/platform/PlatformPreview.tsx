import { DEMO_EVENTS, DEMO_DEVICES, getDemoStats } from "@/lib/demo-data";
import { DemoBadge, SourceBadge, StatusBadge } from "@/components/ui/Badge";
import { formatTime } from "@/lib/api";

const ANIMAL_LABEL: Record<string, string> = {
  cow: "Cow",
  horse: "Horse",
  sheep: "Sheep",
  goat: "Goat",
  camel: "Camel",
  unknown: "Unknown",
};

/**
 * Static interface preview of the monitoring platform, rendered from the demo
 * dataset (server-side) — labelled as a preview, not a screenshot of a live
 * production system.
 */
export function PlatformPreview() {
  const stats = getDemoStats();
  const rows = DEMO_EVENTS.slice(0, 6);

  const kpis = [
    { label: "Demo events", value: stats.totalEvents },
    { label: "Confirmed detections", value: stats.confirmedDetections },
    { label: "Simulated devices online", value: `${stats.activeDevices}/${stats.totalDevices}` },
    { label: "Warnings in simulation", value: stats.warningsTriggered },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_24px_48px_-32px_rgba(16,28,44,0.35)]">
      {/* Window chrome */}
      <div className="flex items-center justify-between border-b border-line bg-navy px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber" />
          <span className="ml-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-steel">
            QORGAU Control · demo environment
          </span>
        </div>
        <span className="hidden rounded-md border border-amber/40 bg-amber/12 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-amber sm:inline">
          Demo data
        </span>
      </div>

      <div className="grid gap-4 bg-canvas p-4 md:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-line bg-surface p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-soft">
              {kpi.label}
            </p>
            <p className="mt-1 font-display text-[26px] font-extrabold text-ink">
              {kpi.value}
            </p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto border-t border-line">
        <table className="w-full min-w-[640px] border-collapse text-left text-[13px]">
          <thead>
            <tr className="border-b border-line bg-surface">
              <th scope="col" className="px-4 py-2.5 font-semibold text-ink-soft">Event</th>
              <th scope="col" className="px-4 py-2.5 font-semibold text-ink-soft">Time</th>
              <th scope="col" className="px-4 py-2.5 font-semibold text-ink-soft">Animal</th>
              <th scope="col" className="px-4 py-2.5 font-semibold text-ink-soft">Location</th>
              <th scope="col" className="px-4 py-2.5 font-semibold text-ink-soft">Confidence</th>
              <th scope="col" className="px-4 py-2.5 font-semibold text-ink-soft">Source</th>
              <th scope="col" className="px-4 py-2.5 font-semibold text-ink-soft">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((e) => (
              <tr key={e.id} className="border-b border-line last:border-0 bg-surface hover:bg-canvas">
                <td className="px-4 py-3 font-mono text-[12px] text-ink-soft">{e.id}</td>
                <td className="px-4 py-3 whitespace-nowrap text-ink-soft">{formatTime(e.timestamp)}</td>
                <td className="px-4 py-3 font-semibold text-ink">{ANIMAL_LABEL[e.animal]}</td>
                <td className="px-4 py-3 text-ink-soft">{e.roadName} · {e.region}</td>
                <td className="px-4 py-3 font-semibold text-ink">{Math.round(e.confidence * 100)}%</td>
                <td className="px-4 py-3"><SourceBadge source={e.source} /></td>
                <td className="px-4 py-3"><StatusBadge status={e.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Device strip */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line bg-surface px-4 py-3 text-[12px] text-ink-soft">
        <DemoBadge size="sm" />
        {DEMO_DEVICES.slice(0, 5).map((d) => (
          <span key={d.id} className="inline-flex items-center gap-1.5">
            <span
              className={`status-dot ${
                d.state === "online"
                  ? "bg-success"
                  : d.state === "offline"
                    ? "bg-danger"
                    : "bg-amber"
              }`}
            />
            {d.id} · {d.state}
          </span>
        ))}
      </div>
    </div>
  );
}
