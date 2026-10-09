/**
 * Map configuration for Leaflet + OpenStreetMap.
 *
 * Tiles are public OpenStreetMap tiles (https://www.openstreetmap.org/copyright).
 * No API key is required for this demo usage; production deployments should
 * review OSM tile usage policy and consider a commercial tile provider.
 */

export const MAP_CENTER: { lat: number; lng: number } = {
  lat: 48.6,
  lng: 70.4,
};

export const MAP_DEFAULT_ZOOM = 5;
export const MAP_MIN_ZOOM = 4;
export const MAP_MAX_ZOOM = 17;

export const OSM_TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
export const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

/** Marker colours — amber = demo detection, blue = user report, green = verified. */
export const MARKER_COLORS = {
  "demo-detection": "#F5A623",
  "user-report": "#8EA5BE",
  "operator-verified": "#237A57",
} as const;
