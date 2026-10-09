import type { Metadata } from "next";

import { Hero } from "@/components/landing/Hero";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { ArchitectureSection } from "@/components/landing/ArchitectureSection";
import { ShowcaseSection } from "@/components/landing/ShowcaseSection";
import { MapPreviewSection } from "@/components/landing/MapPreviewSection";
import { PilotSection } from "@/components/landing/PilotSection";

export const metadata: Metadata = {
  title: { absolute: "QORGAU — Safer roads start with earlier detection" },
  description:
    "QORGAU develops livestock detection, roadside warning signals and a hazard monitoring platform for rural roads in Kazakhstan. Early-stage prototype — all data shown is simulated demonstration data.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <ArchitectureSection />
      <ShowcaseSection />
      <MapPreviewSection />
      <PilotSection />
    </>
  );
}
