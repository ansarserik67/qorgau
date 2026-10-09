import type { Metadata } from "next";
import { ClipboardCheck, Handshake, ShieldCheck } from "lucide-react";

import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/forms/ContactForm";
import { ORGANIZATION_TYPES, type OrganizationType } from "@/types/contact";

export const metadata: Metadata = {
  title: "Contact & pilot requests",
  description:
    "Discuss a QORGAU pilot with the team: road authorities, regional administrations, transport companies and livestock owners are invited to evaluate the prototype.",
  alternates: { canonical: "/contact" },
};

const ORG_LABELS: Record<OrganizationType, string> = {
  "road-authority": "Road authority",
  "regional-administration": "Regional administration",
  "transport-company": "Transport company",
  "livestock-owner": "Livestock owner",
  research: "Research or educational institution",
  other: "Other",
};

const STEPS = [
  {
    icon: ClipboardCheck,
    title: "We read every enquiry",
    body: "A real person reviews your request — no ticket queues, no automated replies.",
  },
  {
    icon: Handshake,
    title: "A scoping conversation",
    body: "We discuss the road section, the season, what hardware would be involved and what counts as a useful result.",
  },
  {
    icon: ShieldCheck,
    title: "A written pilot outline",
    body: "Scope, responsibilities, data handling and success criteria are agreed in writing before anything is installed.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        titleKey="page.contact.title"
        lead="Tell us about your roads, your fleet or your herds. We are at the stage where pilot partners shape the product more than any feature list does."
      />

      <section className="py-14 md:py-16" aria-label="Pilot request form">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          {/* Form */}
          <div className="lg:col-span-7">
            <h2 className="text-section">Request a pilot</h2>
            <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-ink-soft">
              Fields marked <span className="font-semibold text-ink">*</span> are
              required. We only ask for what is needed to reply to you
              meaningfully.
            </p>
            <div className="relative mt-6">
              <ContactForm />
            </div>
          </div>

          {/* Side info */}
          <aside className="lg:col-span-5">
            <div className="card p-6">
              <h3 className="font-display text-[17px] font-bold text-ink">
                What happens next
              </h3>
              <ol className="mt-5 space-y-5">
                {STEPS.map(({ icon: Icon, title, body }, i) => (
                  <li key={title} className="flex gap-4">
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-line bg-canvas text-navy">
                      <Icon size={18} />
                    </span>
                    <div>
                      <p className="text-[15px] font-semibold text-ink">
                        <span className="mr-2 text-amber-hover">0{i + 1}</span>
                        {title}
                      </p>
                      <p className="mt-1 text-[14px] leading-relaxed text-ink-soft">
                        {body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="card mt-5 p-6">
              <h3 className="font-display text-[17px] font-bold text-ink">
                Who should reach out
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {ORGANIZATION_TYPES.map((type) => (
                  <li
                    key={type}
                    className="rounded-lg border border-line bg-canvas px-3 py-1.5 text-[13px] font-semibold text-ink-soft"
                  >
                    {ORG_LABELS[type]}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[14px] leading-relaxed text-ink-soft">
                Individuals are welcome too — if you drive a route where cattle
                regularly cross, your experience is exactly the kind of input
                this prototype needs.
              </p>
            </div>

            <div className="mt-5 rounded-xl border border-amber/35 bg-amber/8 p-5">
              <p className="text-[13.5px] leading-relaxed text-ink-soft">
                <span className="font-semibold text-ink">Honest note:</span> a
                direct email and phone line will be published here once the team
                confirms them. Until then, this form is the primary contact
                channel — and in demo mode it validates your input without
                storing it, which the confirmation screen states plainly.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
