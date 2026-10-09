/**
 * Shared validation for the pilot request form.
 * Used both client-side (instant feedback) and server-side (authoritative).
 */

import type { OrganizationType, PilotRequest } from "@/types/contact";
import { ORGANIZATION_TYPES } from "@/types/contact";

export interface PilotFormValues {
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  region: string;
  organizationType: string;
  message: string;
  consent: boolean;
  /** Honeypot — must stay empty. */
  website: string;
}

export const EMPTY_PILOT_FORM: PilotFormValues = {
  fullName: "",
  organization: "",
  email: "",
  phone: "",
  region: "",
  organizationType: "",
  message: "",
  consent: false,
  website: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s()-]{7,20}$/;

export function validatePilotRequest(values: PilotFormValues): Record<string, string> {
  const errors: Record<string, string> = {};

  const fullName = values.fullName.trim();
  if (!fullName) errors.fullName = "Full name is required.";
  else if (fullName.length < 2) errors.fullName = "Please enter your full name.";
  else if (fullName.length > 120) errors.fullName = "Name is too long.";

  const organization = values.organization.trim();
  if (!organization) errors.organization = "Organization is required.";
  else if (organization.length > 160) errors.organization = "Organization name is too long.";

  const email = values.email.trim();
  if (!email) errors.email = "Work email is required.";
  else if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";
  else if (email.length > 160) errors.email = "Email is too long.";

  const phone = values.phone.trim();
  if (phone && !PHONE_RE.test(phone)) errors.phone = "Enter a valid phone number.";

  const region = values.region.trim();
  if (!region) errors.region = "Region is required.";
  else if (region.length > 120) errors.region = "Region name is too long.";

  if (!values.organizationType) {
    errors.organizationType = "Select an organization type.";
  } else if (!ORGANIZATION_TYPES.includes(values.organizationType as OrganizationType)) {
    errors.organizationType = "Unknown organization type.";
  }

  const message = values.message.trim();
  if (!message) errors.message = "Please describe your interest in a pilot.";
  else if (message.length < 20) errors.message = "Please provide a little more detail (20+ characters).";
  else if (message.length > 4000) errors.message = "Message is too long (max 4000 characters).";

  if (!values.consent) errors.consent = "Consent is required to process your request.";

  return errors;
}

/** Converts form values to the typed PilotRequest payload. */
export function toPilotRequest(values: PilotFormValues): PilotRequest {
  return {
    fullName: values.fullName.trim(),
    organization: values.organization.trim(),
    email: values.email.trim(),
    phone: values.phone.trim() || undefined,
    region: values.region.trim(),
    organizationType: values.organizationType as OrganizationType,
    message: values.message.trim(),
    consent: values.consent,
  };
}
