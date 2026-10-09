import type { LucideIcon } from "lucide-react";

/** KPI card used across dashboard views. Always paired with a DEMO DATA label
 * at the view level — values come from the simulated dataset. */
export function KpiCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  hint: string;
}) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-soft">
          {label}
        </p>
        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-line bg-canvas text-navy">
          <Icon size={16} />
        </span>
      </div>
      <p className="mt-2 font-display text-[30px] font-extrabold leading-none text-ink">
        {value}
      </p>
      <p className="mt-2 text-[12px] text-ink-soft">{hint}</p>
    </div>
  );
}
