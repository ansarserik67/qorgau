"use client";

/**
 * QORGAU Control — demonstration monitoring dashboard.
 *
 * Resembles professional transportation operations software, but every value
 * it shows comes from the labelled demo dataset in lib/demo-data.ts.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  CalendarDays,
  ChevronDown,
  LayoutDashboard,
  ListChecks,
  Map as MapIcon,
  Menu,
  RefreshCw,
  Router,
  Settings,
  TriangleAlert,
  X,
} from "lucide-react";

import { LogoMark } from "@/components/brand/Logo";
import { LanguageSelector } from "@/components/navigation/LanguageSelector";
import { HazardMap } from "@/components/maps/HazardMap";
import { MapLegend } from "@/components/maps/MapLegend";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { EventsTable } from "@/components/dashboard/EventsTable";
import { EventDrawer } from "@/components/dashboard/EventDrawer";
import { DevicePanel } from "@/components/dashboard/DevicePanel";
import { AnimalBreakdown } from "@/components/dashboard/AnimalBreakdown";
import { DemoBadge } from "@/components/ui/Badge";
import { fetchDemoEvents } from "@/lib/api";
import { DEMO_NOW, getDemoStats, getEventsPerDay } from "@/lib/demo-data";
import { useLang } from "@/components/i18n/LanguageProvider";
import { LOCALE_BY_LANG } from "@/lib/i18n";
import type { DetectionEvent } from "@/types/event";

type Tab = "overview" | "events" | "map" | "devices" | "settings";
type LoadState = "loading" | "ready" | "error";

const NAV: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "events", label: "Events", icon: ListChecks },
  { id: "map", label: "Map", icon: MapIcon },
  { id: "devices", label: "Devices", icon: Router },
  { id: "settings", label: "Settings", icon: Settings },
];

export function DashboardApp() {
  const { lang } = useLang();
  const [tab, setTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [events, setEvents] = useState<DetectionEvent[]>([]);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [selectedEvent, setSelectedEvent] = useState<DetectionEvent | null>(null);
  const [mapSelectedId, setMapSelectedId] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const data = await fetchDemoEvents();
      setEvents(data);
      setLoadState("ready");
    } catch {
      setLoadState("error");
    }
  }, []);

  const reload = useCallback(() => {
    setLoadState("loading");
    void load();
  }, [load]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    setSidebarOpen(false);
    setUserMenuOpen(false);
  }, [tab]);

  const stats = useMemo(() => getDemoStats(), []);
  const perDay = useMemo(() => getEventsPerDay(14), []);
  // Client-only clock (cacheComponents forbids new Date() during prerender).
  const [today, setToday] = useState("");
  useEffect(() => {
    setToday(
      new Intl.DateTimeFormat(LOCALE_BY_LANG[lang], {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date()),
    );
  }, [lang]);

  const openOnMap = (e: DetectionEvent) => {
    setMapSelectedId(e.id);
    setSelectedEvent(null);
    setTab("map");
  };

  return (
    <div className="flex min-h-screen bg-canvas">
      {/* Sidebar */}
      <aside
        id="dashboard-sidebar"
        className={`fixed inset-y-0 left-0 z-40 flex w-[248px] flex-col bg-panel text-white transition-transform duration-200 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/8 px-5">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <LogoMark variant="light" size={26} />
            <span className="font-display text-[15px] font-extrabold tracking-[0.14em]">
              QORGAU
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-steel hover:bg-white/8 hover:text-white lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <nav aria-label="Dashboard navigation" className="flex-1 px-3 py-4">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-steel">
            QORGAU Control
          </p>
          <ul className="space-y-1">
            {NAV.map((item) => {
              const active = tab === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setTab(item.id)}
                    aria-current={active ? "page" : undefined}
                    className={`relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[14px] font-semibold transition-colors duration-150 ${
                      active
                        ? "bg-white/8 text-white"
                        : "text-steel hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-y-2 left-0 w-[3px] rounded-full bg-amber"
                      />
                    )}
                    <item.icon size={17} className={active ? "text-amber" : ""} />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-white/8 px-5 py-4">
          <p className="flex items-center gap-2 text-[12px] font-semibold text-amber">
            <span className="status-dot bg-amber pulse-amber" />
            Demo environment
          </p>
          <p className="mt-1.5 text-[11.5px] leading-relaxed text-steel">
            Simulated data only. No live devices are connected.
          </p>
          <Link
            href="/about"
            className="mt-3 inline-block text-[12px] font-semibold text-steel underline-offset-2 hover:text-white hover:underline"
          >
            About the prototype →
          </Link>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-navy/40 lg:hidden"
        />
      )}

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-surface px-4 md:px-6">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
            aria-controls="dashboard-sidebar"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink lg:hidden"
          >
            <Menu size={19} />
          </button>

          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy">
              <LogoMark variant="light" size={22} />
            </span>
            <div className="leading-tight">
              <p className="font-display text-[14px] font-bold text-ink">
                QORGAU Control
              </p>
              <p className="text-[11px] text-ink-soft">Monitoring dashboard</p>
            </div>
          </div>

          <span className="ml-2 hidden items-center gap-2 rounded-lg border border-amber/40 bg-amber/12 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#8a5c07] sm:inline-flex">
            <span className="status-dot bg-amber" />
            Demo environment
          </span>

          <div className="ml-auto flex items-center gap-3">
            <span className="hidden items-center gap-2 text-[13px] text-ink-soft md:flex">
              <CalendarDays size={15} />
              {today}
            </span>

            {/* User menu placeholder */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserMenuOpen((v) => !v)}
                aria-expanded={userMenuOpen}
                aria-haspopup="menu"
                className="flex items-center gap-2 rounded-lg border border-line px-2 py-1.5 transition-colors hover:bg-canvas"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy text-[12px] font-bold text-white">
                  D
                </span>
                <span className="hidden text-[13px] font-semibold text-ink sm:block">
                  Demo operator
                </span>
                <ChevronDown size={14} className="text-ink-soft" />
              </button>

              {userMenuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-[calc(100%+8px)] w-56 rounded-xl border border-line bg-surface p-2 shadow-[0_16px_40px_-20px_rgba(16,28,44,0.45)]"
                >
                  <p className="px-3 py-2 text-[12px] text-ink-soft">
                    Authentication is a planned integration. This placeholder
                    represents a future operator account.
                  </p>
                  <button
                    type="button"
                    role="menuitem"
                    disabled
                    className="w-full rounded-lg px-3 py-2 text-left text-[13px] text-ink-soft opacity-60"
                  >
                    Profile (demo)
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    disabled
                    className="w-full rounded-lg px-3 py-2 text-left text-[13px] text-ink-soft opacity-60"
                  >
                    Sign out (demo)
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main id="main" className="flex-1 px-4 py-6 md:px-6 md:py-8">
          {tab === "overview" && (
            <OverviewView
              loadState={loadState}
              events={events}
              stats={stats}
              perDay={perDay}
              onRetry={reload}
              onSelect={setSelectedEvent}
              onOpenEvents={() => setTab("events")}
            />
          )}

          {tab === "events" && (
            <section aria-labelledby="events-title">
              <ViewHeader
                title="Events"
                subtitle="Every detection, report and review decision from the simulated pipeline."
                onRefresh={reload}
              />
              <EventsTable
                events={events}
                loading={loadState === "loading"}
                error={loadState === "error"}
                onRetry={reload}
                onSelect={setSelectedEvent}
              />
            </section>
          )}

          {tab === "map" && (
            <section aria-labelledby="map-view-title">
              <ViewHeader
                title="Hazard map"
                subtitle="Demo records plotted by coordinates from the sample dataset."
              />
              <div className="card overflow-hidden">
                <HazardMap
                  events={events}
                  height={560}
                  selectedEventId={mapSelectedId}
                  onSelectEvent={(e) => {
                    setMapSelectedId(e.id);
                    setSelectedEvent(e);
                  }}
                  className="border-b border-line"
                />
                <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                  <MapLegend />
                  <span className="text-[12px] text-ink-soft">
                    {events.length} demo records ·{" "}
                    <Link href="/map" className="font-semibold text-ink underline-offset-2 hover:underline">
                      open the full hazard map
                    </Link>
                  </span>
                </div>
              </div>
            </section>
          )}

          {tab === "devices" && (
            <section aria-labelledby="devices-title">
              <ViewHeader
                title="Devices"
                subtitle="Simulated roadside units and their intended lifecycle states."
                onRefresh={reload}
              />
              <DevicePanel />
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-line bg-surface p-5">
                <TriangleAlert size={18} className="mt-0.5 flex-none text-amber-hover" />
                <p className="text-[14px] leading-relaxed text-ink-soft">
                  QORGAU Signal hardware is at the bench-prototype stage. These
                  device records exist to demonstrate how the platform will
                  behave once real telemetry arrives — heartbeats, firmware
                  versions and power states are all generated locally.
                </p>
              </div>
            </section>
          )}

          {tab === "settings" && (
            <section aria-labelledby="settings-title">
              <ViewHeader
                title="Settings"
                subtitle="Environment information for this demonstration."
              />
              <div className="grid gap-5 lg:grid-cols-2">
                <div className="card p-5">
                  <h3 className="font-display text-[15px] font-bold text-ink">
                    Demo dataset
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">
                    Events are generated by a deterministic sample module
                    (lib/demo-data.ts) frozen at a demo clock of{" "}
                    {DEMO_NOW.toISOString().replace("T", " ").slice(0, 16)} UTC.
                    Reloading rebuilds the same dataset — nothing is random at
                    runtime.
                  </p>
                  <button type="button" onClick={load} className="btn btn-secondary mt-4">
                    <RefreshCw size={15} />
                    Reload demo data
                  </button>
                </div>

                <div className="card p-5">
                  <h3 className="font-display text-[15px] font-bold text-ink">
                    Interface language
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">
                    Applies to navigation, hero text, key headings and CTA
                    buttons across the site.
                  </p>
                  <div className="mt-4">
                    <LanguageSelector />
                  </div>
                </div>

                <div className="card p-5">
                  <h3 className="font-display text-[15px] font-bold text-ink">
                    Data & privacy
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">
                    This dashboard stores nothing about you. There is no
                    accounts system, no analytics and no server-side logging in
                    demo mode. Pilot requests are handled on the{" "}
                    <Link href="/contact" className="font-semibold text-ink underline-offset-2 hover:underline">
                      contact page
                    </Link>
                    .
                  </p>
                </div>

                <div className="card p-5">
                  <h3 className="font-display text-[15px] font-bold text-ink">
                    Road to production
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">
                    Real telemetry will replace the demo module through the same
                    TypeScript interfaces — the data layer is deliberately
                    separated from these UI components. See{" "}
                    <Link href="/technology" className="font-semibold text-ink underline-offset-2 hover:underline">
                      the technology page
                    </Link>{" "}
                    for what exists today.
                  </p>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>

      {/* Event details drawer */}
      <EventDrawer
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onViewOnMap={openOnMap}
      />
    </div>
  );
}

/* ---------- Overview ---------- */

function ViewHeader({
  title,
  subtitle,
  onRefresh,
}: {
  title: string;
  subtitle: string;
  onRefresh?: () => void;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <div className="flex items-center gap-3">
          <h1 id={`${title.toLowerCase().replace(/\s+/g, "-")}-title`} className="font-display text-[24px] font-extrabold text-ink">
            {title}
          </h1>
          <DemoBadge size="sm" />
        </div>
        <p className="mt-1 text-[14px] text-ink-soft">{subtitle}</p>
      </div>
      {onRefresh && (
        <button type="button" onClick={onRefresh} className="btn btn-secondary">
          <RefreshCw size={15} />
          Refresh demo data
        </button>
      )}
    </div>
  );
}

function OverviewView({
  loadState,
  events,
  stats,
  perDay,
  onRetry,
  onSelect,
  onOpenEvents,
}: {
  loadState: LoadState;
  events: DetectionEvent[];
  stats: ReturnType<typeof getDemoStats>;
  perDay: { date: string; count: number }[];
  onRetry: () => void;
  onSelect: (e: DetectionEvent) => void;
  onOpenEvents: () => void;
}) {
  if (loadState === "error") {
    return (
      <div className="card px-6 py-16 text-center">
        <p className="font-display text-[17px] font-bold text-ink">
          Demo data failed to load
        </p>
        <p className="mx-auto mt-2 max-w-md text-[14px] text-ink-soft">
          An unexpected error occurred while preparing the demonstration
          dataset. Retry, or report the issue through the contact page.
        </p>
        <button type="button" onClick={onRetry} className="btn btn-primary mx-auto mt-5">
          <RefreshCw size={15} />
          Try again
        </button>
      </div>
    );
  }

  const loading = loadState === "loading";

  return (
    <section aria-labelledby="overview-title">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-3">
            <h1 id="overview-title" className="font-display text-[24px] font-extrabold text-ink">
              Overview
            </h1>
            <DemoBadge size="sm" />
          </div>
          <p className="mt-1 text-[14px] text-ink-soft">
            Simulated detection activity across monitored demo road sections.
          </p>
        </div>
        <span className="text-[12px] text-ink-soft">
          Demo clock: {DEMO_NOW.toISOString().slice(0, 16).replace("T", " ")} UTC
        </span>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="card p-5">
              <span className="block h-3 w-24 animate-pulse rounded bg-line" />
              <span className="mt-4 block h-8 w-16 animate-pulse rounded bg-line" />
              <span className="mt-3 block h-3 w-32 animate-pulse rounded bg-line" />
            </div>
          ))
        ) : (
          <>
            <KpiCard
              icon={ListChecks}
              label="Total demo events"
              value={stats.totalEvents}
              hint={`Records in the simulated dataset (${stats.last7Days} in the last 7 demo days)`}
            />
            <KpiCard
              icon={Activity}
              label="Confirmed sample detections"
              value={stats.confirmedDetections}
              hint="Detections with ≥75% demo confidence"
            />
            <KpiCard
              icon={Router}
              label="Active simulated devices"
              value={`${stats.activeDevices}/${stats.totalDevices}`}
              hint="Devices in 'online' state (simulated)"
            />
            <KpiCard
              icon={TriangleAlert}
              label="Warnings triggered in simulation"
              value={stats.warningsTriggered}
              hint="Cases where the signal would have activated"
            />
          </>
        )}
      </div>

      {/* Chart + devices */}
      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <div className="card p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="font-display text-[15px] font-bold text-ink">
                  Detection activity
                </h2>
                <p className="text-[12px] text-ink-soft">
                  Demo events per day (last 14 simulated days)
                </p>
              </div>
              <span className="rounded-md border border-amber/40 bg-amber/12 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#8a5c07]">
                Demo data
              </span>
            </div>
            <div className="mt-4">
              {loading ? (
                <div className="flex h-[260px] items-end gap-2 px-4">
                  {[38, 55, 30, 64, 48, 72, 40, 58, 35, 66, 50, 44, 60, 32].map((h, i) => (
                    <span
                      key={i}
                      className="flex-1 animate-pulse rounded-t bg-line"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              ) : (
                <ActivityChart data={perDay} />
              )}
            </div>
          </div>

          <div className="mt-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-[15px] font-bold text-ink">
                Recent events
              </h2>
              <button
                type="button"
                onClick={onOpenEvents}
                className="text-[13px] font-semibold text-ink underline-offset-2 hover:underline"
              >
                View all events →
              </button>
            </div>
            <EventsTable
              events={events}
              loading={loading}
              onSelect={onSelect}
              compact
            />
          </div>
        </div>

        <div className="space-y-5">
          <DevicePanel limit={4} />
          <AnimalBreakdown />
        </div>
      </div>
    </section>
  );
}
