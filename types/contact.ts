/**
 * Data models for pilot partnership requests.
 */

export type OrganizationType =
  | "road-authority"
  | "regional-administration"
  | "transport-company"
  | "livestock-owner"
  | "research"
  | "other";

export const ORGANIZATION_TYPES: OrganizationType[] = [
  "road-authority",
  "regional-administration",
  "transport-company",
  "livestock-owner",
  "research",
  "other",
];

export interface PilotRequest {
  fullName: string;
  organization: string;
  email: string;
  phone?: string;
  region: string;
  organizationType: OrganizationType;
  message: string;
  consent: boolean;
}

/** Server response for POST /api/pilot-request. */
export interface PilotRequestResponse {
  ok: boolean;
  /**
   * "stored" — request was written to the configured backend.
   * "demo"   — request was validated but NOT persisted (no backend configured).
   */
  mode: "stored" | "demo";
  message: string;
  errors?: Record<string, string>;
}
