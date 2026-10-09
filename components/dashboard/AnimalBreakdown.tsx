import { getEventsByAnimal } from "@/lib/demo-data";

const LABEL: Record<string, string> = {
  cow: "Cow",
  horse: "Horse",
  sheep: "Sheep",
  goat: "Goat",
  camel: "Camel",
  unknown: "Unknown",
};

/** Horizontal bar breakdown of demo events by animal category. */
export function AnimalBreakdown() {
  const data = getEventsByAnimal();
  const max = Math.max(...data.map((d) => d.count), 1);
  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-[15px] font-bold text-ink">
          Events by animal
        </h3>
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-soft">
          Demo data
        </span>
      </div>

      <ul className="mt-4 space-y-3.5">
        {data.map((d) => (
          <li key={d.animal}>
            <div className="flex items-center justify-between text-[13px]">
              <span className="font-medium text-ink">{LABEL[d.animal] ?? d.animal}</span>
              <span className="text-ink-soft">
                {d.count}{" "}
                <span className="text-[11px]">
                  ({Math.round((d.count / total) * 100)}%)
                </span>
              </span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full bg-navy"
                style={{ width: `${(d.count / max) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-4 border-t border-line pt-3 text-[12px] text-ink-soft">
        Distribution of the simulated dataset — not observed field statistics.
      </p>
    </div>
  );
}
