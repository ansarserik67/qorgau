import Link from "next/link";

/** Closing CTA band reused on public pages. */
export function PilotCtaBlock({
  title = "Want to evaluate QORGAU on one of your road sections?",
  text = "We are looking for pilot partners to test the prototype in realistic conditions and tell us what actually helps drivers.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-navy py-14 text-white">
      <div className="container-page flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <h2 className="font-display text-[24px] font-bold md:text-[28px]">
            {title}
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-steel">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn btn-primary">
            Request a pilot
          </Link>
          <Link href="/dashboard" className="btn btn-on-dark">
            View demo dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}
