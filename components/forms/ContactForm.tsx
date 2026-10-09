"use client";

/**
 * Pilot request form.
 *
 * - Client-side validation for instant feedback (server re-validates).
 * - Honeypot field + minimum completion time as practical spam protection.
 * - Honest submission outcomes: the UI distinguishes "stored" from
 *   "validated but not persisted" (demo mode without a configured backend).
 */

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Send, TriangleAlert } from "lucide-react";

import { submitPilotRequest } from "@/lib/api";
import {
  EMPTY_PILOT_FORM,
  toPilotRequest,
  validatePilotRequest,
  type PilotFormValues,
} from "@/lib/validation";
import { ORGANIZATION_TYPES, type OrganizationType } from "@/types/contact";

const ORG_LABELS: Record<OrganizationType, string> = {
  "road-authority": "Road authority",
  "regional-administration": "Regional administration",
  "transport-company": "Transport company",
  "livestock-owner": "Livestock owner",
  research: "Research or educational institution",
  other: "Other",
};

type SubmitState =
  | { phase: "idle" }
  | { phase: "submitting" }
  | { phase: "success"; mode: "stored" | "demo"; message: string }
  | { phase: "error"; message: string };

export function ContactForm() {
  const [values, setValues] = useState<PilotFormValues>(EMPTY_PILOT_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitState, setSubmitState] = useState<SubmitState>({ phase: "idle" });
  // Set after mount; avoids unstable time values during prerender.
  const mountedAt = useRef<number>(0);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const set = <K extends keyof PilotFormValues>(key: K, value: PilotFormValues[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => {
      if (!e[key]) return e;
      const next = { ...e };
      delete next[key];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitState.phase === "submitting") return;

    const clientErrors = validatePilotRequest(values);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setSubmitState({
        phase: "error",
        message: "Please correct the highlighted fields and try again.",
      });
      // Move focus to the first invalid field.
      const firstKey = Object.keys(clientErrors)[0];
      document.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }

    setSubmitState({ phase: "submitting" });

    try {
      const response = await submitPilotRequest({
        ...toPilotRequest(values),
        website: values.website,
        elapsedMs: Date.now() - mountedAt.current,
      });

      if (!response.ok) {
        setSubmitState({ phase: "error", message: response.message });
        return;
      }

      setSubmitState({
        phase: "success",
        mode: response.mode,
        message: response.message,
      });
      setValues(EMPTY_PILOT_FORM);
    } catch {
      setSubmitState({
        phase: "error",
        message:
          "Network error while submitting your request. Please check your connection and try again.",
      });
    }
  };

  const field = (name: keyof PilotFormValues) => ({
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  if (submitState.phase === "success") {
    return (
      <div className="card p-8 text-center" role="status" aria-live="polite">
        <span
          className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${
            submitState.mode === "stored"
              ? "bg-success/10 text-success"
              : "bg-amber/12 text-amber-hover"
          }`}
        >
          {submitState.mode === "stored" ? (
            <CheckCircle2 size={26} />
          ) : (
            <TriangleAlert size={26} />
          )}
        </span>
        <h3 className="font-display text-[20px] font-bold text-ink">
          {submitState.mode === "stored"
            ? "Request received — thank you"
            : "Form validated successfully"}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft">
          {submitState.message}
        </p>
        {submitState.mode === "demo" && (
          <p className="mx-auto mt-4 max-w-md rounded-xl border border-line bg-canvas p-4 text-[13px] leading-relaxed text-ink-soft">
            <span className="font-semibold text-ink">Demo mode:</span> this
            website has no database configured (see .env.example). Your details
            were checked but <span className="font-semibold text-ink">not stored or sent anywhere</span>.
            Configure Supabase or another backend to enable real submissions.
          </p>
        )}
        <button
          type="button"
          onClick={() => setSubmitState({ phase: "idle" })}
          className="btn btn-secondary mx-auto mt-6"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Full name */}
        <div>
          <label htmlFor="fullName" className="field-label">
            Full name <span aria-hidden className="text-danger">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            className="field-input"
            placeholder="Aigerim Nurlanova"
            value={values.fullName}
            onChange={(e) => set("fullName", e.target.value)}
            {...field("fullName")}
          />
          {errors.fullName && (
            <span id="fullName-error" className="field-error">{errors.fullName}</span>
          )}
        </div>

        {/* Organization */}
        <div>
          <label htmlFor="organization" className="field-label">
            Organization <span aria-hidden className="text-danger">*</span>
          </label>
          <input
            id="organization"
            type="text"
            autoComplete="organization"
            className="field-input"
            placeholder="Regional road administration"
            value={values.organization}
            onChange={(e) => set("organization", e.target.value)}
            {...field("organization")}
          />
          {errors.organization && (
            <span id="organization-error" className="field-error">{errors.organization}</span>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="field-label">
            Work email <span aria-hidden className="text-danger">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="field-input"
            placeholder="name@organization.kz"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            {...field("email")}
          />
          {errors.email && (
            <span id="email-error" className="field-error">{errors.email}</span>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="field-label">
            Phone number <span className="text-ink-soft">(optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            className="field-input"
            placeholder="+7 (___) ___-__-__"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            {...field("phone")}
          />
          {errors.phone && (
            <span id="phone-error" className="field-error">{errors.phone}</span>
          )}
        </div>

        {/* Region */}
        <div>
          <label htmlFor="region" className="field-label">
            Region <span aria-hidden className="text-danger">*</span>
          </label>
          <input
            id="region"
            type="text"
            className="field-input"
            placeholder="e.g. Turkistan Region"
            value={values.region}
            onChange={(e) => set("region", e.target.value)}
            {...field("region")}
          />
          {errors.region && (
            <span id="region-error" className="field-error">{errors.region}</span>
          )}
        </div>

        {/* Organization type */}
        <div>
          <label htmlFor="organizationType" className="field-label">
            Organization type <span aria-hidden className="text-danger">*</span>
          </label>
          <select
            id="organizationType"
            className="field-input"
            value={values.organizationType}
            onChange={(e) => set("organizationType", e.target.value)}
            {...field("organizationType")}
          >
            <option value="">Select a type…</option>
            {ORGANIZATION_TYPES.map((type) => (
              <option key={type} value={type}>
                {ORG_LABELS[type]}
              </option>
            ))}
          </select>
          {errors.organizationType && (
            <span id="organizationType-error" className="field-error">
              {errors.organizationType}
            </span>
          )}
        </div>
      </div>

      {/* Message */}
      <div className="mt-5">
        <label htmlFor="message" className="field-label">
          Message <span aria-hidden className="text-danger">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          className="field-input resize-y"
          placeholder="Which road section interests you, what season matters most, and what would you want to evaluate?"
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          {...field("message")}
        />
        {errors.message && (
          <span id="message-error" className="field-error">{errors.message}</span>
        )}
      </div>

      {/* Consent */}
      <div className="mt-5">
        <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-relaxed text-ink-soft">
          <input
            type="checkbox"
            name="consent"
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            className="mt-1 h-4 w-4 flex-none accent-[#F5A623]"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          <span>
            I consent to QORGAU processing the information submitted here to
            respond to my pilot enquiry. <span aria-hidden className="text-danger">*</span>
          </span>
        </label>
        {errors.consent && (
          <span id="consent-error" className="field-error">{errors.consent}</span>
        )}
      </div>

      {/* Honeypot — hidden from humans */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => set("website", e.target.value)}
        />
      </div>

      {/* Submit error summary */}
      {submitState.phase === "error" && (
        <p
          role="alert"
          className="mt-5 flex items-start gap-2.5 rounded-xl border border-danger/35 bg-danger/8 p-4 text-[14px] text-danger"
        >
          <TriangleAlert size={16} className="mt-0.5 flex-none" />
          {submitState.message}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-line pt-6">
        <button
          type="submit"
          disabled={submitState.phase === "submitting"}
          className="btn btn-primary"
        >
          {submitState.phase === "submitting" ? (
            <>
              <span className="spinner" aria-hidden />
              Sending…
            </>
          ) : (
            <>
              <Send size={15} />
              Send pilot request
            </>
          )}
        </button>
        <p className="text-[13px] text-ink-soft">
          We reply to pilot enquiries personally — usually within a few working
          days.
        </p>
      </div>
    </form>
  );
}
