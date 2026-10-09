"use client";

/**
 * Events table: search, sorting, filtering, pagination, detail trigger,
 * plus loading / empty / error states.
 */

import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Search, RotateCcw, Inbox } from "lucide-react";

import { SourceBadge, StatusBadge } from "@/components/ui/Badge";
import { formatDateTime } from "@/lib/api";
import type { DetectionEvent, EventSource, EventStatus } from "@/types/event";

const ANIMAL_LABEL: Record<DetectionEvent["animal"], string> = {
  cow: "Cow",
  horse: "Horse",
  sheep: "Sheep",
  goat: "Goat",
  camel: "Camel",
  unknown: "Unknown",
};

type SortKey = "timestamp" | "animal" | "confidence" | "location";
type SortDir = "asc" | "desc";

const PAGE_SIZE = 10;

export function EventsTable({
  events,
  loading = false,
  error = false,
  onRetry,
  onSelect,
  compact = false,
}: {
  events: DetectionEvent[];
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
  onSelect: (event: DetectionEvent) => void;
  compact?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [source, setSource] = useState<EventSource | "all">("all");
  const [status, setStatus] = useState<EventStatus | "all">("all");
  const [animal, setAnimal] = useState<string>("all");
  const [sortKey, setSortKey] = useState<SortKey>("timestamp");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = events.filter((e) => {
      if (source !== "all" && e.source !== source) return false;
      if (status !== "all" && e.status !== status) return false;
      if (animal !== "all" && e.animal !== animal) return false;
      if (q) {
        const hay = `${e.id} ${e.locationName} ${e.roadName} ${e.region} ${e.animal}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    const dir = sortDir === "asc" ? 1 : -1;
    return rows.sort((a, b) => {
      switch (sortKey) {
        case "timestamp":
          return a.timestamp.localeCompare(b.timestamp) * dir;
        case "animal":
          return a.animal.localeCompare(b.animal) * dir;
        case "confidence":
          return (a.confidence - b.confidence) * dir;
        case "location":
          return a.locationName.localeCompare(b.locationName) * dir;
      }
    });
  }, [events, query, source, status, animal, sortKey, sortDir]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const rows = compact
    ? filtered.slice(0, 8)
    : filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("desc");
    }
    setPage(1);
  };

  const resetFilters = () => {
    setQuery("");
    setSource("all");
    setStatus("all");
    setAnimal("all");
    setPage(1);
  };

  const filtersActive =
    query.trim() !== "" || source !== "all" || status !== "all" || animal !== "all";

  /* ---------- states ---------- */

  if (error) {
    return (
      <div className="card px-6 py-14 text-center">
        <p className="font-display text-[16px] font-bold text-ink">
          Could not load demo events
        </p>
        <p className="mx-auto mt-2 max-w-md text-[14px] text-ink-soft">
          The demo data module failed to respond. This should not happen in a
          normal build — please retry.
        </p>
        {onRetry && (
          <button type="button" onClick={onRetry} className="btn btn-primary mx-auto mt-5">
            <RotateCcw size={15} />
            Retry
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      {/* Controls */}
      {!compact && (
        <div className="flex flex-wrap items-center gap-3 border-b border-line bg-surface px-4 py-3">
          <div className="relative min-w-[220px] flex-1">
            <Search
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft"
            />
            <label htmlFor="events-search" className="sr-only">
              Search events
            </label>
            <input
              id="events-search"
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search ID, road, region…"
              className="field-input pl-9"
            />
          </div>

          <label htmlFor="events-animal" className="sr-only">Animal</label>
          <select
            id="events-animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              setPage(1);
            }}
            className="field-input w-auto"
          >
            <option value="all">All animals</option>
            {Object.entries(ANIMAL_LABEL).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>

          <label htmlFor="events-source" className="sr-only">Source</label>
          <select
            id="events-source"
            value={source}
            onChange={(e) => {
              setSource(e.target.value as EventSource | "all");
              setPage(1);
            }}
            className="field-input w-auto"
          >
            <option value="all">All sources</option>
            <option value="demo-detection">Detected in demo</option>
            <option value="user-report">Reported by user</option>
            <option value="operator-verified">Verified by operator</option>
          </select>

          <label htmlFor="events-status" className="sr-only">Status</label>
          <select
            id="events-status"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value as EventStatus | "all");
              setPage(1);
            }}
            className="field-input w-auto"
          >
            <option value="all">All statuses</option>
            <option value="simulated-warning">Simulated warning</option>
            <option value="under-review">Under review</option>
            <option value="verified">Verified</option>
            <option value="dismissed">Dismissed</option>
          </select>

          {filtersActive && (
            <button type="button" onClick={resetFilters} className="btn btn-secondary">
              <RotateCcw size={14} />
              Reset
            </button>
          )}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left text-[13.5px]">
          <thead>
            <tr className="border-b border-line bg-canvas">
              <Th>Event ID</Th>
              <Th sortKey={sortKey} dir={sortDir} column="timestamp" onSort={toggleSort}>
                Time
              </Th>
              <Th sortKey={sortKey} dir={sortDir} column="animal" onSort={toggleSort}>
                Animal
              </Th>
              <Th sortKey={sortKey} dir={sortDir} column="location" onSort={toggleSort}>
                Location
              </Th>
              <Th sortKey={sortKey} dir={sortDir} column="confidence" onSort={toggleSort}>
                Confidence
              </Th>
              <Th>Source</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: compact ? 5 : 8 }).map((_, i) => (
                  <tr key={`skeleton-${i}`} className="border-b border-line">
                    {Array.from({ length: 7 }).map((__, j) => (
                      <td key={j} className="px-4 py-3.5">
                        <span
                          className="block h-3.5 animate-pulse rounded bg-line"
                          style={{ width: j === 3 ? "80%" : "60%" }}
                        />
                      </td>
                    ))}
                  </tr>
                ))
              : rows.map((e) => (
                  <tr
                    key={e.id}
                    tabIndex={0}
                    role="button"
                    aria-label={`Open details for event ${e.id}`}
                    onClick={() => onSelect(e)}
                    onKeyDown={(ev) => {
                      if (ev.key === "Enter" || ev.key === " ") {
                        ev.preventDefault();
                        onSelect(e);
                      }
                    }}
                    className="cursor-pointer border-b border-line transition-colors last:border-0 hover:bg-canvas focus-visible:bg-canvas"
                  >
                    <td className="px-4 py-3 font-mono text-[12px] text-ink-soft">{e.id}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-ink-soft">
                      {formatDateTime(e.timestamp)}
                    </td>
                    <td className="px-4 py-3 font-semibold text-ink">
                      {ANIMAL_LABEL[e.animal]}
                    </td>
                    <td className="px-4 py-3 text-ink-soft">
                      <span className="block font-medium text-ink">{e.roadName}</span>
                      <span className="block text-[12px]">{e.locationName}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-ink">
                          {Math.round(e.confidence * 100)}%
                        </span>
                        <span className="h-1.5 w-14 overflow-hidden rounded-full bg-line">
                          <span
                            className="block h-full rounded-full bg-amber"
                            style={{ width: `${Math.round(e.confidence * 100)}%` }}
                          />
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><SourceBadge source={e.source} /></td>
                    <td className="px-4 py-3"><StatusBadge status={e.status} /></td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {!loading && filtered.length === 0 && (
        <div className="px-6 py-14 text-center">
          <Inbox size={28} className="mx-auto text-ink-soft" />
          <p className="mt-3 font-display text-[15px] font-bold text-ink">
            No events match the current filters
          </p>
          <p className="mt-1.5 text-[13px] text-ink-soft">
            The demo dataset contains {events.length} records — try a broader search.
          </p>
          <button type="button" onClick={resetFilters} className="btn btn-secondary mx-auto mt-5">
            Clear filters
          </button>
        </div>
      )}

      {/* Footer / pagination */}
      {!compact && !loading && filtered.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-surface px-4 py-3">
          <p className="text-[12px] text-ink-soft">
            Showing {rows.length} of {filtered.length} matching demo records
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="btn btn-secondary px-3 py-1.5 text-[13px]"
            >
              Previous
            </button>
            <span className="text-[12px] text-ink-soft">
              Page {currentPage} of {pageCount}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              disabled={currentPage >= pageCount}
              className="btn btn-secondary px-3 py-1.5 text-[13px]"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Th({
  children,
  column,
  sortKey,
  dir,
  onSort,
}: {
  children: React.ReactNode;
  column?: SortKey;
  sortKey?: SortKey;
  dir?: SortDir;
  onSort?: (key: SortKey) => void;
}) {
  const sortable = Boolean(column && onSort);
  const active = column === sortKey;

  return (
    <th scope="col" className="px-4 py-3 font-semibold text-ink-soft">
      {sortable ? (
        <button
          type="button"
          onClick={() => onSort!(column!)}
          className={`inline-flex items-center gap-1 transition-colors hover:text-ink ${
            active ? "text-ink" : ""
          }`}
        >
          {children}
          {active ? (
            dir === "asc" ? (
              <ChevronUp size={13} />
            ) : (
              <ChevronDown size={13} />
            )
          ) : (
            <ChevronDown size={13} className="opacity-35" />
          )}
        </button>
      ) : (
        children
      )}
    </th>
  );
}
