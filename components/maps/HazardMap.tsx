"use client";

/**
 * Hazard map built on Leaflet + OpenStreetMap.
 *
 * Pure client component (Leaflet needs a real DOM). Markers are circle
 * markers — no external icon assets, nothing to 404. Popup content is built
 * with DOM APIs (no injected HTML). Every popup repeats that the record is
 * demo data.
 *
 * Falls back gracefully when tiles cannot be loaded (offline demo): markers
 * and popups keep working on a plain background.
 */

import { useEffect, useRef, useState } from "react";
import type { DetectionEvent } from "@/types/event";
import {
  MAP_CENTER,
  MAP_DEFAULT_ZOOM,
  MAP_MAX_ZOOM,
  MAP_MIN_ZOOM,
  MARKER_COLORS,
  OSM_ATTRIBUTION,
  OSM_TILE_URL,
} from "@/lib/map-config";
import { formatDateTime } from "@/lib/api";

const SOURCE_LABEL: Record<DetectionEvent["source"], string> = {
  "demo-detection": "Detected in demo",
  "user-report": "Reported by user",
  "operator-verified": "Verified by operator",
};

const ANIMAL_LABEL: Record<DetectionEvent["animal"], string> = {
  cow: "Cow",
  horse: "Horse",
  sheep: "Sheep",
  goat: "Goat",
  camel: "Camel",
  unknown: "Unknown animal",
};

export interface HazardMapProps {
  events: DetectionEvent[];
  /** CSS height for the map container. */
  height?: number;
  zoom?: number;
  /** Disable scroll-zoom on embedded previews (page still scrolls normally). */
  scrollWheelZoom?: boolean;
  className?: string;
  selectedEventId?: string | null;
  onSelectEvent?: (event: DetectionEvent) => void;
  /** When changed, the map recentres on this point (e.g. search results).
   * A number identity is used so identical coordinates do not re-trigger. */
  focusPoint?: { lat: number; lng: number; zoom: number; token: number } | null;
}

export function HazardMap({
  events,
  height = 480,
  zoom = MAP_DEFAULT_ZOOM,
  scrollWheelZoom = true,
  className = "",
  selectedEventId = null,
  onSelectEvent,
  focusPoint = null,
}: HazardMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const layerRef = useRef<import("leaflet").LayerGroup | null>(null);
  const leafletRef = useRef<typeof import("leaflet") | null>(null);
  const onSelectRef = useRef(onSelectEvent);
  const prevEventsRef = useRef<DetectionEvent[] | null>(null);
  const [tilesFailed, setTilesFailed] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  // Keep the callback ref fresh without touching it during render.
  useEffect(() => {
    onSelectRef.current = onSelectEvent;
  }, [onSelectEvent]);

  // Initialize the map once.
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let leaflet: typeof import("leaflet") | null = null;
    let cancelled = false;
    let errorCount = 0;

    (async () => {
      leaflet = await import("leaflet");
      await import("leaflet/dist/leaflet.css");
      if (cancelled || !containerRef.current || mapRef.current) return;

      const map = leaflet.map(containerRef.current, {
        center: [MAP_CENTER.lat, MAP_CENTER.lng],
        zoom,
        minZoom: MAP_MIN_ZOOM,
        maxZoom: MAP_MAX_ZOOM,
        scrollWheelZoom,
        zoomControl: true,
        attributionControl: true,
      });

      const tiles = leaflet.tileLayer(OSM_TILE_URL, {
        attribution: OSM_ATTRIBUTION,
        maxZoom: MAP_MAX_ZOOM,
      });
      tiles.on("tileerror", () => {
        errorCount += 1;
        if (errorCount >= 4) setTilesFailed(true);
      });
      tiles.addTo(map);
      map.createPane("events");
      map.getPane("events")!.style.zIndex = "620";

      layerRef.current = leaflet.layerGroup().addTo(map);
      mapRef.current = map;
      leafletRef.current = leaflet;
      setMapReady(true);

      // Invalidate size after layout settles (avoids grey tiles in flex/grid).
      requestAnimationFrame(() => map.invalidateSize());
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      layerRef.current = null;
      leafletRef.current = null;
      setMapReady(false);
    };
  }, [zoom, scrollWheelZoom]);

  // (Re)draw markers when the dataset or selection changes.
  useEffect(() => {
    if (!mapReady || !leafletRef.current || !mapRef.current || !layerRef.current)
      return;
    const leaflet = leafletRef.current;
    const map = mapRef.current;
    const layer = layerRef.current;
    layer.clearLayers();

    // Only refit the view when the dataset itself changed, not on selection.
    const eventsChanged = prevEventsRef.current !== events;
    prevEventsRef.current = events;

    let bounds: import("leaflet").LatLngBounds | null = null;

    for (const event of events) {
      const selected = event.id === selectedEventId;
      const color = MARKER_COLORS[event.source];

      const marker = leaflet.circleMarker([event.lat, event.lng], {
        radius: selected ? 10 : 7,
        color: selected ? "#101C2C" : color,
        weight: selected ? 3 : 1.5,
        fillColor: color,
        fillOpacity: 0.85,
      });

      marker.bindPopup(buildPopupContent(event), {
        closeButton: true,
        maxWidth: 280,
      });

      marker.on("click", () => onSelectRef.current?.(event));
      marker.addTo(layer);

      bounds = bounds
        ? bounds.extend([event.lat, event.lng])
        : leaflet.latLngBounds([
            [event.lat, event.lng],
            [event.lat, event.lng],
          ]);
    }

    if (!eventsChanged) return;

    if (bounds && events.length > 1) {
      map.fitBounds(bounds.pad(0.18), { animate: false });
    } else if (events.length === 1) {
      map.setView([events[0].lat, events[0].lng], 11, { animate: false });
    }
  }, [events, selectedEventId, mapReady]);

  // Recentre when a list item is selected.
  useEffect(() => {
    if (!mapReady || !selectedEventId || !mapRef.current) return;
    const event = events.find((e) => e.id === selectedEventId);
    if (!event) return;
    mapRef.current.setView(
      [event.lat, event.lng],
      Math.max(mapRef.current.getZoom(), 10),
      { animate: true },
    );
  }, [selectedEventId, events, mapReady]);

  // Recentre on an explicit focus point (search / region jump).
  useEffect(() => {
    if (!mapReady || !focusPoint || !mapRef.current) return;
    mapRef.current.setView([focusPoint.lat, focusPoint.lng], focusPoint.zoom, {
      animate: true,
    });
  }, [focusPoint, mapReady]);

  return (
    <div className={`relative ${className}`} style={{ height }}>
      <div ref={containerRef} className="h-full w-full" aria-label="Hazard map" />

      {tilesFailed && (
        <div className="pointer-events-none absolute inset-x-3 bottom-3 z-[500] rounded-lg border border-line bg-surface/95 px-3 py-2 text-[12px] text-ink-soft shadow-sm">
          Map tiles could not be loaded (offline demo). Markers and popups still work.
        </div>
      )}
    </div>
  );
}

/** Builds popup content as real DOM nodes — no HTML injection. */
function buildPopupContent(event: DetectionEvent): HTMLElement {
  const wrap = document.createElement("div");

  const title = document.createElement("div");
  title.style.fontWeight = "700";
  title.style.fontSize = "13px";
  title.style.color = "#182230";
  title.textContent = `${ANIMAL_LABEL[event.animal]} · ${event.roadName}`;
  wrap.appendChild(title);

  const loc = document.createElement("div");
  loc.style.fontSize = "12px";
  loc.style.color = "#657386";
  loc.style.marginTop = "2px";
  loc.textContent = event.locationName;
  wrap.appendChild(loc);

  const rows: [string, string][] = [
    ["Time", formatDateTime(event.timestamp)],
    ["Source", SOURCE_LABEL[event.source]],
    ["Confidence", `${Math.round(event.confidence * 100)}% (demo inference)`],
  ];

  for (const [label, value] of rows) {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.justifyContent = "space-between";
    row.style.gap = "12px";
    row.style.fontSize = "12px";
    row.style.marginTop = "6px";
    const k = document.createElement("span");
    k.style.color = "#657386";
    k.textContent = label;
    const v = document.createElement("span");
    v.style.color = "#182230";
    v.style.fontWeight = "600";
    v.textContent = value;
    row.append(k, v);
    wrap.appendChild(row);
  }

  const demo = document.createElement("div");
  demo.style.marginTop = "10px";
  demo.style.paddingTop = "8px";
  demo.style.borderTop = "1px solid #DCE3EB";
  demo.style.fontSize = "11px";
  demo.style.fontWeight = "700";
  demo.style.letterSpacing = "0.08em";
  demo.style.color = "#8a5c07";
  demo.textContent = "DEMO RECORD — NOT A VERIFIED CRASH SITE";
  wrap.appendChild(demo);

  return wrap;
}
