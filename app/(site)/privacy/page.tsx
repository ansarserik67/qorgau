import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How the QORGAU prototype website handles information: what little data it collects and what it deliberately does not.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        fallbackTitle="Privacy Policy"
        dark={false}
        lead="This policy describes the QORGAU prototype website. It is written to reflect what the site actually does today."
      />

      <section className="py-14">
        <div className="container-page max-w-3xl space-y-8 text-[15.5px] leading-relaxed text-ink-soft">
          <div className="rounded-xl border border-line bg-surface p-5 text-[14px]">
            <span className="font-semibold text-ink">Status of this document:</span>{" "}
            an honest draft for an early-stage prototype, not a legally reviewed
            filing. It will be updated as the product matures.
          </div>

          <div>
            <h2 className="text-card">1. What this site is</h2>
            <p className="mt-2">
              QORGAU is an early-stage road safety technology prototype. The
              public website, hazard map and monitoring dashboard run entirely
              on simulated demonstration data generated locally — no live
              cameras, sensors or third-party data feeds are involved.
            </p>
          </div>

          <div>
            <h2 className="text-card">2. What data we collect</h2>
            <p className="mt-2">
              If you submit a pilot request through the{" "}
              <Link href="/contact" className="font-semibold text-ink underline-offset-2 hover:underline">contact form</Link>,
              we receive the information you type: name, organization, email,
              optional phone number, region, organization type and your message.
              We use it only to respond to your enquiry.
            </p>
            <p className="mt-2">
              When no storage backend is configured, the form runs in demo mode:
              your input is validated in the browser and on the server, but{" "}
              <span className="font-semibold text-ink">nothing is stored or forwarded</span> —
              the confirmation screen says so explicitly.
            </p>
          </div>

          <div>
            <h2 className="text-card">3. What we deliberately do not collect</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>No accounts, passwords or identity verification.</li>
              <li>No analytics, advertising or tracking cookies.</li>
              <li>No precise location data from visitors.</li>
              <li>No third-party chat widgets or session replay tools.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-card">4. Where submissions are stored</h2>
            <p className="mt-2">
              If the team configures a storage backend (Supabase), pilot
              requests are stored in a database table accessible only to the
              project team, protected by service-role credentials that never
              reach the browser. Server-side validation, honeypot fields,
              completion-time checks and rate limiting are applied to every
              submission.
            </p>
          </div>

          <div>
            <h2 className="text-card">5. Map and third-party services</h2>
            <p className="mt-2">
              The hazard map loads map tiles from OpenStreetMap. Your browser
              connects directly to their servers, which receive standard
              technical request information (IP address, requested tiles). See
              the{" "}
              <a
                href="https://www.openstreetmap.org/copyright"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-ink underline-offset-2 hover:underline"
              >
                OpenStreetMap copyright page
              </a>{" "}
              for their attribution and privacy details.
            </p>
          </div>

          <div>
            <h2 className="text-card">6. Retention and your choices</h2>
            <p className="mt-2">
              Stored pilot requests are kept only as long as needed to handle
              the enquiry and any resulting pilot discussion. You may ask the
              team to delete your submission at any time through the contact
              form. Language preference is kept locally in your browser and can
              be cleared with your site data.
            </p>
          </div>

          <div>
            <h2 className="text-card">7. Contact</h2>
            <p className="mt-2">
              Questions about this policy go through the{" "}
              <Link href="/contact" className="font-semibold text-ink underline-offset-2 hover:underline">contact form</Link>.
              Direct contact details will be published once confirmed by the
              team.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
