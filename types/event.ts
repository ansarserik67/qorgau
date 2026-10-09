/**
 * Data models for road hazard events.
 *
 * Every record in the public demo dataset is simulated. The `isDemo` flag is
 * part of the model so a real backend can later introduce verified records
 * without changing the UI contract.
 */

export type AnimalCategory =
  | "cow"
  | "horse"
  | "sheep"
  | "goat"
  | "camel"
  | "unknown";

/** Where an event came from. All demo records use "demo-detection". */
export type EventSource =
  | "demo-detection"
  | "user-report"
  | "operator-verified";

/** Lifecycle of a hazard event inside the platform. */
export type EventStatus =
  | "simulated-warning"
  | "under-review"
  | "verified"
  | "dismissed";

export interface DetectionEvent {
  /** Stable identifier, e.g. "EVT-2026-0417". */
  id: string;
  /** ISO 8601 timestamp of the detection (simulated clock). */
  timestamp: string;
  animal: AnimalCategory;
  roadLocationId: string;
  locationName: string;
  roadName: string;
  region: string;
  lat: number;
  lng: number;
  /** Demo inference confidence, 0..1. Not a measured hardware value. */
  confidence: number;
  source: EventSource;
  status: EventStatus;
  /** Whether the simulated roadside signal would have been activated. */
  warningTriggered: boolean;
  deviceId: string;
  /** Optional operator note. */
  notes?: string;
  /** True for every record served by the demo dataset. */
  isDemo: boolean;
}

/** A monitored road segment / candidate installation site. */
export interface RoadLocation {
  id: string;
  name: string;
  roadName: string;
  region: string;
  lat: number;
  lng: number;
  /** Qualitative assessment for pilot planning — not an official rating. */
  riskLevel: "elevated" | "moderate" | "candidate";
  description: string;
  isDemo: boolean;
}
