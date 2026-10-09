/**
 * POST /api/pilot-request
 *
 * Server-side validation for the pilot request form.
 *
 * Storage modes (chosen automatically from environment variables):
 *   1. "stored" — SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are configured and
 *      the row is inserted into the `pilot_requests` table via Supabase REST.
 *      The service-role key stays on the server and is never exposed to the
 *      browser.
 *   2. "demo"  — no backend configured. The request is validated and answered
 *      honestly as NOT persisted, so the UI never lies about success.
 *
 * Spam protection (practical, no third parties):
 *   - honeypot field must be empty;
 *   - minimum completion time between page mount and submission;
 *   - per-IP in-memory rate limit (best effort, per server isolate);
 *   - body size cap.
 */

import { NextResponse } from "next/server";

import { validatePilotRequest } from "@/lib/validation";
import type { PilotRequestResponse } from "@/types/contact";

const MAX_BODY_BYTES = 32 * 1024;
const MIN_FILL_MS = 2500;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

/** Best-effort in-memory rate limiter (resets per server restart/isolate). */
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (list.length >= RATE_LIMIT_MAX) {
    hits.set(ip, list);
    return true;
  }
  list.push(now);
  hits.set(ip, list);
  return false;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json<PilotRequestResponse>(
      {
        ok: false,
        mode: "demo",
        message:
          "Too many requests from this address. Please wait a few minutes and try again.",
      },
      { status: 429 },
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json<PilotRequestResponse>(
      { ok: false, mode: "demo", message: "Request body too large." },
      { status: 413 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json<PilotRequestResponse>(
      { ok: false, mode: "demo", message: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  // Honeypot: real users never fill this field.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json<PilotRequestResponse>({
      ok: true,
      mode: "demo",
      message: "Thank you — your request has been received.",
    });
  }

  // Timing check: form was submitted faster than a human could fill it.
  const elapsedMs = typeof body.elapsedMs === "number" ? body.elapsedMs : 0;
  if (elapsedMs > 0 && elapsedMs < MIN_FILL_MS) {
    return NextResponse.json<PilotRequestResponse>({
      ok: true,
      mode: "demo",
      message: "Thank you — your request has been received.",
    });
  }

  const values = {
    fullName: String(body.fullName ?? ""),
    organization: String(body.organization ?? ""),
    email: String(body.email ?? ""),
    phone: String(body.phone ?? ""),
    region: String(body.region ?? ""),
    organizationType: String(body.organizationType ?? ""),
    message: String(body.message ?? ""),
    consent: body.consent === true,
    website: "",
  };

  const errors = validatePilotRequest({ ...values, website: "" });
  if (Object.keys(errors).length > 0) {
    return NextResponse.json<PilotRequestResponse>(
      {
        ok: false,
        mode: "demo",
        message: "Please correct the highlighted fields and try again.",
        errors,
      },
      { status: 400 },
    );
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    // Honest demo mode: nothing is stored anywhere.
    return NextResponse.json<PilotRequestResponse>({
      ok: true,
      mode: "demo",
      message:
        "Your request passed validation, but this deployment has no storage backend configured, so it was not saved or forwarded.",
    });
  }

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/pilot_requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        full_name: values.fullName,
        organization: values.organization,
        email: values.email,
        phone: values.phone || null,
        region: values.region,
        organization_type: values.organizationType,
        message: values.message,
        consent: true,
        created_at: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      console.error("Supabase insert failed:", res.status, await res.text());
      return NextResponse.json<PilotRequestResponse>(
        {
          ok: false,
          mode: "demo",
          message:
            "We could not save your request right now. Please try again later.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json<PilotRequestResponse>({
      ok: true,
      mode: "stored",
      message:
        "Your pilot request has been saved. We will contact you at the email you provided.",
    });
  } catch (err) {
    console.error("Pilot request storage error:", err);
    return NextResponse.json<PilotRequestResponse>(
      {
        ok: false,
        mode: "demo",
        message:
          "A storage error occurred while submitting your request. Please try again.",
      },
      { status: 502 },
    );
  }
}
