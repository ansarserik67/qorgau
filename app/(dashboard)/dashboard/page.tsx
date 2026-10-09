import type { Metadata } from "next";

import { DashboardApp } from "@/components/dashboard/DashboardApp";

export const metadata: Metadata = {
  title: "Monitoring dashboard (demo)",
  description:
    "QORGAU Control demonstration dashboard: KPIs, event history, hazard map, device status and detection activity — all generated from clearly labelled demo data.",
  alternates: { canonical: "/dashboard" },
};

export default function DashboardPage() {
  return <DashboardApp />;
}
