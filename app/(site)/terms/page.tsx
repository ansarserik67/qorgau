import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms for using the QORGAU prototype website, including the status of all demonstration data shown.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        fallbackTitle="Terms of Use"
        dark={false}
        lead="Plain-language terms for a prototype website. The key point is in section 1."
      />

      <section className="py-14">
        <div className="container-page max-w-3xl space-y-8 text-[15.5px] leading-relaxed text-ink-soft">
          <div>
            <h2 className="text-card">1. Prototype status and demonstration data</h2>
            <p className="mt-2">
              QORGAU is an early-stage prototype. Every event, device, hazard
              marker, confidence score, warning state and chart shown on this
              website is <span className="font-semibold text-ink">simulated demonstration data</span>.
              Nothing presented here describes real traffic incidents, real
              measurements or an operational deployment. Do not treat any figure
              on this site as an accident statistic or a product specification.
            </p>
          </div>

          <div>
            <h2 className="text-card">2. Not a safety system</h2>
            <p className="mt-2">
              QORGAU is not certified for use on public roads and must not be
              relied upon for traffic control, hazard warning or any safety
              function. Drivers should always follow posted signs and drive for
              conditions.
            </p>
          </div>

          <div>
            <h2 className="text-card">3. Acceptable use</h2>
            <p className="mt-2">
              You may browse the site, explore the demo dashboard and map, and
              share links for evaluation purposes. You may not attempt to
              disrupt the service, probe its infrastructure, or present its
              demonstration content as your own data or as verified road safety
              statistics.
            </p>
          </div>

          <div>
            <h2 className="text-card">4. Intellectual property</h2>
            <p className="mt-2">
              The QORGAU name, logo, website design and written content belong
              to the project team. Map data © OpenStreetMap contributors,
              available under the Open Database License.
            </p>
          </div>

          <div>
            <h2 className="text-card">5. No warranties</h2>
            <p className="mt-2">
              The website is provided &quot;as is&quot; for demonstration and discussion
              purposes. We aim for it to be accurate and available, but make no
              warranties about completeness, availability or fitness for a
              particular purpose.
            </p>
          </div>

          <div>
            <h2 className="text-card">6. Pilot engagements</h2>
            <p className="mt-2">
              Submitting the{" "}
              <Link href="/contact" className="font-semibold text-ink underline-offset-2 hover:underline">contact form</Link>{" "}
              is an expression of interest, not a contract. Any pilot
              arrangement is agreed separately and in writing.
            </p>
          </div>

          <div>
            <h2 className="text-card">7. Changes</h2>
            <p className="mt-2">
              These terms may be updated as the prototype develops. The date of
              the latest revision is shown below.
            </p>
            <p className="mt-3 text-[13px]">Last revised: 8 October 2026.</p>
          </div>
        </div>
      </section>
    </>
  );
}
