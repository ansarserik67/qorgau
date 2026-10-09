"use client";

/**
 * Full hazard map explorer: search, animal / source / date filters, clickable
 * markers with popups, legend and a synchronised event list.
 *
 * The entire dataset behind it is the clearly labelled demo dataset.
 */

import { useMemo, useState } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";

import { HazardMap } from "@/components/maps/HazardMap";
import { MapLegend } from "@/components/maps/MapLegend";
import { DemoBadge, SourceBadge, StatusBadge } from "@/components/ui/Badge";
import { DEMO_EVENTS, ROAD_LOCATIONS } from "@/lib/demo-data";
import { formatDateTime } from "@/lib/api";
import type { AnimalCategory, DetectionEvent, EventSource } from "@/types/event";

const ANIMALS: { value: AnimalCategory; label: string }[] = [
  { value: "cow", label: "Cow" },
  { value: "horse", label: "Horse" },
  { value: "sheep", label: "Sheep" },
  { value: "goat", label: "Goat" },
  { value: "camel", label: "Camel" },
];

const SOURCES: { value: EventSource; label: string }[] = [
  { value: "demo-detection", label: "Detected in demo" },
  { value: "user-report", label: "Reported by user" },
  { value: "operator-verified", label: "Verified by operator" },
];

const REGIONS = [...new Set(ROAD_LOCATIONS.map((l) => l.region))].sort();

export function MapExplorer() {
  const [query, setQuery] = useState("");
  const [animal, setAnimal] = useState<AnimalCategory | "all">("all");
  const [source, setSource] = useState<EventSource | "all">("all");
  const [region, setRegion] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [focus, setFocus] = useState<{
    lat: number;
    lng: number;
    zoom: number;
    token: number;
  } | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DEMO_EVENTS.filter((e) => {
      if (animal !== "all" && e.animal !== animal) return false;
      if (source !== "all" && e.source !== source) return false;
      if (region !== "all" && e.region !== region) return false;
      if (dateFrom && e.timestamp.slice(0, 10) < dateFrom) return false;
      if (dateTo && e.timestamp.slice(0, 10) > dateTo) return false;
      if (q) {
        const haystack = `${e.locationName} ${e.roadName} ${e.region} ${e.id}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [query, animal, source, region, dateFrom, dateTo]);

  const selected: DetectionEvent | undefined = useMemo(
    () => filtered.find((e) => e.id === selectedId),
    [filtered, selectedId],
  );

  const filtersActive =
    animal !== "all" ||
    source !== "all" ||
    region !== "all" ||
    dateFrom !== "" ||
    dateTo !== "" ||
    query.trim() !== "";

  const resetFilters = () => {
    setAnimal("all");
    setSource("all");
    setRegion("all");
    setDateFrom("");
    setDateTo("");
    setQuery("");
    setSelectedId(null);
  };

  const jumpToRegion = (r: string) => {
    setRegion(r);
    const loc = ROAD_LOCATIONS.find((l) => l.region === r);
    if (loc) {
      setFocus({ lat: loc.lat, lng: loc.lng, zoom: 8, token: Date.now() });
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* Control panel */}
      <aside className="lg:col-span-4">
        <div className="card p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-[17px] font-bold text-ink">
              Search & filter
            </h2>
            <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-ink-soft">
              <SlidersHorizontal size={14} />
              {filtered.length} / {DEMO_EVENTS.length} records
            </span>
          </div>

          {/* Search */}
          <div className="relative mt-4">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft"
            />
            <label htmlFor="map-search" className="sr-only">
              Search by location, road or event ID
            </label>
            <input
              id="map-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Location, road name or event ID"
              className="field-input pl-9"
            />
          </div>

          {/* Animal filter */}
          <fieldset className="mt-5">
            <legend className="field-label">Animal type</legend>
            <div className="flex flex-wrap gap-2">
              <FilterChip active={animal === "all"} onClick={() => setAnimal("all")}>
                All
              </FilterChip>
              {ANIMALS.map((a) => (
                <FilterChip
                  key={a.value}
                  active={animal === a.value}
                  onClick={() => setAnimal(a.value)}
                >
                  {a.label}
                </FilterChip>
              ))}
            </div>
          </fieldset>

          {/* Source filter */}
          <fieldset className="mt-5">
            <legend className="field-label">Event source</legend>
            <div className="flex flex-col gap-2">
              <label className="flex cursor-pointer items-center gap-2.5 text-[14px] text-ink-soft">
                <input
                  type="radio"
                  name="source"
                  checked={source === "all"}
                  onChange={() => setSource("all")}
                  className="h-4 w-4 accent-[#101C2C]"
                />
                All sources
              </label>
              {SOURCES.map((s) => (
                <label
                  key={s.value}
                  className="flex cursor-pointer items-center gap-2.5 text-[14px] text-ink-soft"
                >
                  <input
                    type="radio"
                    name="source"
                    checked={source === s.value}
                    onChange={() => setSource(s.value)}
                    className="h-4 w-4 accent-[#101C2C]"
                  />
                  {s.label}
                </label>
              ))}
            </div>
          </fieldset>

          {/* Region */}
          <div className="mt-5">
            <label htmlFor="map-region" className="field-label">
              Region
            </label>
            <select
              id="map-region"
              value={region}
              onChange={(e) => jumpToRegion(e.target.value)}
              className="field-input"
            >
              <option value="all">All regions</option>
              {REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Date range */}
          <fieldset className="mt-5">
            <legend className="field-label">Date range (demo clock)</legend>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="date-from" className="sr-only">From</label>
                <input
                  id="date-from"
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="field-input"
                />
              </div>
              <div>
                <label htmlFor="date-to" className="sr-only">To</label>
                <input
                  id="date-to"
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="field-input"
                />
              </div>
            </div>
          </fieldset>

          <button
            type="button"
            onClick={resetFilters}
            disabled={!filtersActive}
            className="btn btn-secondary mt-5 w-full"
          >
            <X size={15} />
            Reset filters
          </button>
        </div>

        {/* Event list */}
        <div className="card mt-5 flex max-h-[420px] flex-col overflow-hidden">
          <div className="flex items-center justify-between border-b border-line px-5 py-3">
            <h3 className="font-display text-[15px] font-bold text-ink">
              Events
            </h3>
            <DemoBadge size="sm" />
          </div>

          {filtered.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="font-display text-[15px] font-bold text-ink">
                No events match these filters
              </p>
              <p className="mt-1.5 text-[13px] text-ink-soft">
                Try widening the date range or clearing the animal filter.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="btn btn-secondary mt-4"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <ul className="thin-scroll divide-y divide-line overflow-y-auto">
              {filtered.slice(0, 60).map((e) => (
                <li key={e.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(e.id)}
                    aria-pressed={selectedId === e.id}
                    className={`w-full px-5 py-3 text-left transition-colors ${
                      selectedId === e.id ? "bg-amber/8" : "hover:bg-canvas"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[11px] text-ink-soft">
                        {e.id}
                      </span>
                      <span className="text-[11px] text-ink-soft">
                        {formatDateTime(e.timestamp)}
                      </span>
                    </div>
                    <p className="mt-1 text-[14px] font-semibold capitalize text-ink">
                      {e.animal} · {e.roadName}
                    </p>
                    <p className="truncate text-[12px] text-ink-soft">
                      {e.locationName}
                    </p>
                    <div className="mt-1.5 flex items-center gap-3">
                      <SourceBadge source={e.source} />
                      <span className="text-[11px] font-semibold text-ink-soft">
                        {Math.round(e.confidence * 100)}%
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>

      {/* Map + detail */}
      <div className="lg:col-span-8">
        <div className="card overflow-hidden">
          <HazardMap
            events={filtered}
            height={560}
            selectedEventId={selectedId}
            focusPoint={focus}
            onSelectEvent={(e) => setSelectedId(e.id)}
            className="border-b border-line"
          />

          {/* Selected event detail strip */}
          {selected ? (
            <div className="flex flex-wrap items-start justify-between gap-4 px-5 py-4">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-[16px] font-bold text-ink">
                    {selected.animal.charAt(0).toUpperCase() + selected.animal.slice(1)} ·{" "}
                    {selected.roadName}
                  </h3>
                  <StatusBadge status={selected.status} />
                  <SourceBadge source={selected.source} />
                </div>
                <p className="mt-1 text-[14px] text-ink-soft">
                  {selected.locationName} — {selected.region}
                </p>
                <p className="mt-1 text-[13px] text-ink-soft">
                  {formatDateTime(selected.timestamp)} · confidence{" "}
                  <span className="font-semibold text-ink">
                    {Math.round(selected.confidence * 100)}%
                  </span>{" "}
                  (demo inference) · signal{" "}
                  <span className="font-semibold text-ink">
                    {selected.warningTriggered ? "activated" : "not activated"}
                  </span>{" "}
                  (simulated)
                </p>
              </div>
              <span className="rounded-md border border-amber/40 bg-amber/12 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#8a5c07]">
                Demo record
              </span>
            </div>
          ) : (
            <div className="px-5 py-4 text-[13px] text-ink-soft">
              Select a marker or an event from the list to see its details.
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-3 rounded-xl border border-line bg-surface px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <MapLegend />
        </div>

        <p className="mt-4 rounded-xl border border-line bg-canvas p-4 text-[13px] leading-relaxed text-ink-soft">
          <span className="font-semibold text-ink">About this map:</span> every
          marker is generated sample data for the QORGAU prototype. These are not
          recorded crash sites and no live sensor feeds this map. When real GPS
          reports are introduced, submissions will be validated server-side and
          duplicate reports for the same location and time window will be merged.
        </p>
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-lg border px-3 py-1.5 text-[13px] font-semibold transition-colors duration-150 ${
        active
          ? "border-navy bg-navy text-white"
          : "border-line bg-surface text-ink-soft hover:border-ink-soft hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
