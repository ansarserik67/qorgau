import { BatteryCharging, Wifi, Wrench } from "lucide-react";

import { DEMO_DEVICES } from "@/lib/demo-data";
import { DeviceStateBadge } from "@/components/ui/Badge";
import { formatDateTime } from "@/lib/api";
import type { DeviceStatus } from "@/types/device";

const POWER_LABEL: Record<DeviceStatus["powerSource"], string> = {
  "solar-battery": "Solar + battery (planned)",
  mains: "Mains (lab setup)",
  "not-specified": "Not specified",
};

/** Device status panel — simulated states, clearly labelled. */
export function DevicePanel({ limit }: { limit?: number }) {
  const devices = limit ? DEMO_DEVICES.slice(0, limit) : DEMO_DEVICES;

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <h3 className="font-display text-[15px] font-bold text-ink">
          Device status
        </h3>
        <span className="rounded-md border border-amber/40 bg-amber/12 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#8a5c07]">
          Simulated
        </span>
      </div>

      <ul className="divide-y divide-line">
        {devices.map((d) => (
          <li key={d.id} className="px-5 py-3.5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-[14px] font-semibold text-ink">
                  {d.id}
                  <span className="ml-2 font-normal text-ink-soft">
                    {d.name}
                  </span>
                </p>
                <p className="mt-0.5 truncate text-[12px] text-ink-soft">
                  {d.locationName}
                </p>
              </div>
              <DeviceStateBadge state={d.state} />
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11.5px] text-ink-soft">
              <span className="inline-flex items-center gap-1.5">
                <Wifi size={12} />
                Heartbeat {formatDateTime(d.lastHeartbeat)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <BatteryCharging size={12} />
                {POWER_LABEL[d.powerSource]}
              </span>
              {d.state === "maintenance" && (
                <span className="inline-flex items-center gap-1.5 text-[#8a5c07]">
                  <Wrench size={12} />
                  Service window (demo)
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>

      <p className="border-t border-line bg-canvas px-5 py-3 text-[12px] leading-relaxed text-ink-soft">
        Device states are generated for this demonstration. QORGAU hardware is
        not yet deployed on public roads.
      </p>
    </div>
  );
}
