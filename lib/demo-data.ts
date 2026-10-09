/**
 * QORGAU demo dataset.
 *
 * ⚠ EVERY record in this module is simulated sample data produced for the
 * prototype website. None of it describes real accidents, real crash sites or
 * live camera feeds. Real GPS reports will replace this module through the same
 * TypeScript interfaces when a backend exists.
 *
 * The dataset is intentionally kept in one place (no UI component invents
 * data) so a real API can be swapped in at `lib/api.ts` later.
 */

import type {
  AnimalCategory,
  DetectionEvent,
  EventSource,
  EventStatus,
  RoadLocation,
} from "@/types/event";
import type { DeviceStatus } from "@/types/device";

/** Fixed "now" for the simulated clock so demo data stays coherent. */
export const DEMO_NOW = new Date("2026-10-08T18:40:00Z");

/** Monitored road segments (candidate pilot sites — demo). */
export const ROAD_LOCATIONS: RoadLocation[] = [
  {
    id: "LOC-01",
    name: "Astana–Karaganda highway, km 148",
    roadName: "M-36",
    region: "Akmola Region",
    lat: 50.42,
    lng: 72.31,
    riskLevel: "elevated",
    description:
      "Open steppe crossing with poor night lighting and seasonal livestock movement between pastures.",
    isDemo: true,
  },
  {
    id: "LOC-02",
    name: "Turkistan bypass, southern approach",
    roadName: "A-2",
    region: "Turkistan Region",
    lat: 43.24,
    lng: 68.19,
    riskLevel: "elevated",
    description:
      "Agricultural area where herds routinely cross towards water sources in the evening.",
    isDemo: true,
  },
  {
    id: "LOC-03",
    name: "Karaganda southern ring, km 12",
    roadName: "M-36",
    region: "Karaganda Region",
    lat: 49.72,
    lng: 73.05,
    riskLevel: "moderate",
    description:
      "Ring-road section adjacent to private plots with irregular fencing.",
    isDemo: true,
  },
  {
    id: "LOC-04",
    name: "Semey – Oskemen road, km 63",
    roadName: "A-3",
    region: "East Kazakhstan Region",
    lat: 50.18,
    lng: 81.88,
    riskLevel: "elevated",
    description:
      "Long straight section with high approach speeds and limited visibility at dawn.",
    isDemo: true,
  },
  {
    id: "LOC-05",
    name: "Shymkent – Kyzylorda road, km 40",
    roadName: "M-32",
    region: "Turkistan Region",
    lat: 42.71,
    lng: 68.62,
    riskLevel: "moderate",
    description:
      "Transit corridor passing several villages with free-roaming cattle.",
    isDemo: true,
  },
  {
    id: "LOC-06",
    name: "Balkhash – Aktau road, km 210",
    roadName: "M-32",
    region: "Almaty Region",
    lat: 46.12,
    lng: 75.31,
    riskLevel: "candidate",
    description:
      "Remote desert-steppe section selected as a candidate low-power sensor site.",
    isDemo: true,
  },
  {
    id: "LOC-07",
    name: "Taraz – Merke road, km 27",
    roadName: "A-2",
    region: "Jambyl Region",
    lat: 42.91,
    lng: 71.55,
    riskLevel: "moderate",
    description:
      "Valley road with frequent horse crossings near settlements.",
    isDemo: true,
  },
  {
    id: "LOC-08",
    name: "Kostanay northern road, km 35",
    roadName: "A-34",
    region: "Kostanay Region",
    lat: 53.41,
    lng: 63.62,
    riskLevel: "candidate",
    description:
      "Grain transport route crossing winter pasture areas — candidate site.",
    isDemo: true,
  },
];

const ANIMALS: AnimalCategory[] = ["cow", "horse", "sheep", "camel", "goat"];

const SOURCES: EventSource[] = [
  "demo-detection",
  "demo-detection",
  "demo-detection",
  "user-report",
  "operator-verified",
];

const STATUS_BY_SOURCE: Record<EventSource, EventStatus> = {
  "demo-detection": "simulated-warning",
  "user-report": "under-review",
  "operator-verified": "verified",
};

/** Deterministic pseudo-random generator so the dataset is stable between
 * renders and page navigations. */
function makeRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function pad(n: number, len = 2) {
  return String(n).padStart(len, "0");
}

/** Builds 64 simulated detection events over the 30 days before DEMO_NOW. */
function buildEvents(): DetectionEvent[] {
  const rng = makeRng(20261008);
  const events: DetectionEvent[] = [];
  const total = 64;

  for (let i = 0; i < total; i++) {
    const location = ROAD_LOCATIONS[Math.floor(rng() * ROAD_LOCATIONS.length)];
    const animal = ANIMALS[Math.floor(rng() * ANIMALS.length)];
    const source = SOURCES[Math.floor(rng() * SOURCES.length)];

    // Spread timestamps over 30 days, biased toward evening hours.
    const daysAgo = Math.floor(rng() * 30);
    const hour = rng() < 0.62 ? 18 + Math.floor(rng() * 5) : 5 + Math.floor(rng() * 13);
    const minute = Math.floor(rng() * 60);
    const ts = new Date(DEMO_NOW.getTime() - daysAgo * 86400_000);
    ts.setUTCHours(hour % 24, minute, 0, 0);

    const confidence = Math.round((0.62 + rng() * 0.36) * 100) / 100;
    const warningTriggered = source === "demo-detection" ? confidence >= 0.7 : rng() > 0.5;

    events.push({
      id: `EVT-2026-${pad(total - i, 4)}`,
      timestamp: ts.toISOString(),
      animal,
      roadLocationId: location.id,
      locationName: location.name,
      roadName: location.roadName,
      region: location.region,
      // ±0.01° jitter so markers are individually visible on the map.
      lat: location.lat + (rng() - 0.5) * 0.02,
      lng: location.lng + (rng() - 0.5) * 0.02,
      confidence,
      source,
      status: STATUS_BY_SOURCE[source],
      warningTriggered,
      deviceId: `QG-SIG-${pad((i % 8) + 1, 2)}`,
      notes:
        source === "user-report"
          ? "Sample of a crowd-sourced report submitted through the pilot mobile form."
          : source === "operator-verified"
            ? "Sample record marked as reviewed by a demo operator account."
            : undefined,
      isDemo: true,
    });
  }

  return events.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}

export const DEMO_EVENTS: DetectionEvent[] = buildEvents();

/** Simulated roadside devices — states are generated, not measured. */
export const DEMO_DEVICES: DeviceStatus[] = ROAD_LOCATIONS.map((loc, idx) => {
  const state: DeviceStatus["state"] = (["online", "online", "online", "maintenance", "offline", "online", "planned", "online"] as const)[idx];
  return {
    id: `QG-SIG-${pad(idx + 1, 2)}`,
    name: `QORGAU Signal prototype ${pad(idx + 1)}`,
    roadLocationId: loc.id,
    locationName: loc.name,
    region: loc.region,
    state,
    lastHeartbeat: new Date(
      DEMO_NOW.getTime() - (idx * 17 + 3) * 60_000,
    ).toISOString(),
    firmware: state === "planned" ? "—" : "0.4.2-prototype",
    powerSource: state === "planned" ? "not-specified" : idx % 2 === 0 ? "solar-battery" : "mains",
    isSimulated: true,
  };
});

/** Demo aggregates used by KPI cards and charts. All derived from DEMO_EVENTS. */
export function getDemoStats() {
  const now = DEMO_NOW.getTime();
  const last7 = DEMO_EVENTS.filter(
    (e) => now - new Date(e.timestamp).getTime() <= 7 * 86400_000,
  );
  return {
    totalEvents: DEMO_EVENTS.length,
    confirmedDetections: DEMO_EVENTS.filter((e) => e.confidence >= 0.75).length,
    warningsTriggered: DEMO_EVENTS.filter((e) => e.warningTriggered).length,
    userReports: DEMO_EVENTS.filter((e) => e.source === "user-report").length,
    activeDevices: DEMO_DEVICES.filter((d) => d.state === "online").length,
    totalDevices: DEMO_DEVICES.length,
    last7Days: last7.length,
  };
}

/** Events per day (ISO date → count) for the activity chart. */
export function getEventsPerDay(days = 14): { date: string; count: number }[] {
  const out: { date: string; count: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(DEMO_NOW.getTime() - i * 86400_000);
    const key = `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
    out.push({
      date: key,
      count: DEMO_EVENTS.filter((e) => e.timestamp.startsWith(key)).length,
    });
  }
  return out;
}

/** Events grouped by animal category for the dashboard breakdown. */
export function getEventsByAnimal(): { animal: AnimalCategory; count: number }[] {
  const map = new Map<AnimalCategory, number>();
  for (const e of DEMO_EVENTS) map.set(e.animal, (map.get(e.animal) ?? 0) + 1);
  return [...map.entries()]
    .map(([animal, count]) => ({ animal, count }))
    .sort((a, b) => b.count - a.count);
}

export function getLocationById(id: string): RoadLocation | undefined {
  return ROAD_LOCATIONS.find((l) => l.id === id);
}
