import { MARKER_COLORS } from "@/lib/map-config";

/** Marker legend shared by the landing preview, map page and dashboard. */
export function MapLegend({ compact = false }: { compact?: boolean }) {
  const items = [
    { color: MARKER_COLORS["demo-detection"], label: "Detected in demo (simulated)" },
    { color: MARKER_COLORS["user-report"], label: "Reported by user (sample)" },
    { color: MARKER_COLORS["operator-verified"], label: "Verified by operator (sample)" },
  ];

  return (
    <div
      className={`flex flex-wrap items-center gap-x-5 gap-y-2 ${compact ? "text-[11px]" : "text-[13px]"}`}
    >
      {items.map((item) => (
        <span key={item.label} className="inline-flex items-center gap-2 text-ink-soft">
          <span
            className="inline-block h-3 w-3 rounded-full border-2 border-surface shadow-[0_0_0_1px_rgba(220,227,235,0.9)]"
            style={{ backgroundColor: item.color }}
          />
          {item.label}
        </span>
      ))}
      <span className="inline-flex items-center gap-1.5 font-semibold text-[#8a5c07]">
        All markers: demo data
      </span>
    </div>
  );
}
