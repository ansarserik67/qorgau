/**
 * Thin data-access layer.
 *
 * Today it serves the local demo dataset and the pilot request endpoint.
 * When a real backend exists, only this module (and `app/api/*`) needs to
 * change — UI components import from here and never invent data themselves.
 */

import type { PilotRequest, PilotRequestResponse } from "@/types/contact";
import type { DetectionEvent } from "@/types/event";
import { DEMO_EVENTS, DEMO_DEVICES, ROAD_LOCATIONS } from "@/lib/demo-data";
import type { Lang } from "@/lib/i18n";
import { LOCALE_BY_LANG } from "@/lib/i18n";

export async function fetchDemoEvents(): Promise<DetectionEvent[]> {
  // Simulates network latency so loading states are exercised in the demo.
  await new Promise((r) => setTimeout(r, 350));
  return DEMO_EVENTS;
}

export async function submitPilotRequest(
  payload: PilotRequest & { website?: string; elapsedMs?: number },
): Promise<PilotRequestResponse> {
  const res = await fetch("/api/pilot-request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await res.json().catch(() => null)) as PilotRequestResponse | null;

  if (!res.ok || !data) {
    return {
      ok: false,
      mode: "demo",
      message:
        "Something went wrong while submitting your request. Please try again or check your connection.",
    };
  }
  return data;
}

export { DEMO_EVENTS, DEMO_DEVICES, ROAD_LOCATIONS };

/* ---------- formatting ---------- */

export function formatDateTime(iso: string, lang: Lang = "en"): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat(LOCALE_BY_LANG[lang], {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export function formatDate(iso: string, lang: Lang = "en"): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat(LOCALE_BY_LANG[lang], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}

export function formatTime(iso: string, lang: Lang = "en"): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat(LOCALE_BY_LANG[lang], {
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}
