# QORGAU — Road Safety Technology Website

"Detect earlier. Warn sooner. Make roads safer."

QORGAU is an early-stage Kazakhstan road safety technology startup developing
livestock detection, roadside warning signals and a hazard monitoring platform
for rural roads. **This repository contains the prototype website and its
demonstration dashboard.**

> **Prototype notice** — everything shown on this site (events, devices, map
> markers, confidence scores, warning states) is **simulated demonstration
> data**. QORGAU has no production deployment, no live camera connections and
> no safety certification. The interface labels this consistently.

## Run it locally

Requirements: Node.js 20.9+ (tested on Node 24), npm 11.

```bash
npm install
npm run dev        # development server → http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

Other scripts:

```bash
npm run lint       # ESLint (0 errors expected; a few justified warnings)
npx tsc --noEmit   # strict TypeScript check
```

Environment configuration: copy `.env.example` to `.env.local`. The site runs
fully without any environment variables.

## Pages

| Route         | Purpose                                                            |
| ------------- | ------------------------------------------------------------------ |
| `/`           | Landing page: hero, problem, solution, architecture, showcase, map preview, pilot CTA |
| `/technology` | Pipeline stages, system architecture diagram, technical specifications |
| `/platform`   | Monitoring platform overview, interface preview, source labelling   |
| `/map`        | Interactive hazard map with search, filters, popups, legend         |
| `/dashboard`  | Interactive demo dashboard: KPIs, events table, chart, devices, map |
| `/about`      | Mission, roadmap, transparency statement                            |
| `/contact`    | Pilot request form with validation and honest submission outcomes   |
| `/privacy`    | Privacy policy                                                      |
| `/terms`      | Terms of use                                                        |

Languages: EN / RU / KZ selector (navigation, hero, CTAs, key headings,
footer, dashboard labels). Preference persists in `localStorage`.

## Architecture

```
app/                  Next.js App Router (route groups: (site) public pages, (dashboard))
  (site)/             public pages with shared Header/Footer layout
  (dashboard)/        ops-style dashboard route
  api/pilot-request/  server-side validated contact endpoint
components/
  brand/              SVG logo (shield + converging roads + amber point)
  dashboard/          KPI cards, events table, chart, device panel, drawer
  forms/              pilot request form
  i18n/               language context provider
  landing/            landing page sections
  layout/             header, footer
  maps/               Leaflet hazard map, legend, explorer with filters
  navigation/         language selector
  ui/                 badges, headings, reveal wrapper, page header
lib/
  demo-data.ts        THE demo dataset (64 events, 8 locations, 8 devices)
  validation.ts       shared client/server form validation
  api.ts              data-access layer + date formatting
  map-config.ts       Leaflet/OSM configuration, marker colours
  i18n.ts             EN/RU/KZ dictionary
types/                DetectionEvent, RoadLocation, DeviceStatus, PilotRequest
public/images/        local SVG illustrations (hero scene, detection frame)
```

**Data layer separation:** UI components never invent data — they import from
`lib/demo-data.ts` through `lib/api.ts`. Replacing demo data with a real
backend means changing `lib/api.ts` and `app/api/*` only; the TypeScript
interfaces in `types/` stay stable.

## Contact form storage (optional Supabase)

Without configuration the form runs in **honest demo mode**: submissions are
validated (client and server) but **not stored**, and the confirmation screen
says exactly that.

To enable real storage:

1. Create a Supabase project and table (DDL in `.env.example`).
2. Set in `.env.local`:

```bash
SUPABASE_URL=https://<project>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service-role key>   # server-side only, never NEXT_PUBLIC_
```

Spam protection built in: honeypot field, minimum completion time, per-IP rate
limiting, body size cap. Server-side validation always re-checks input.

## Demo data honesty rules

- Every demo record carries `isDemo: true` in the data model.
- Map popups, tables, drawers and the footer repeat that data is simulated.
- The detection showcase is labelled "SIMULATED DEMONSTRATION — NOT A LIVE ROAD FEED".
- No invented accident statistics, deployments, partnerships, certifications or contact details.
- Technical specifications that were never field-tested say "Not yet validated".

## Maps

Leaflet + OpenStreetMap public tiles (no API key). Offline, markers and popups
still work and the UI explains that tiles could not be loaded. Review OSM tile
usage policy before production traffic, or swap in a commercial tile provider
in `lib/map-config.ts`.

## Design system

Defined in `app/globals.css` (Tailwind v4 `@theme`): navy surfaces
(`#101C2C` / `#17283F` / `#0B1421`), safety amber (`#F5A623`), light canvas
(`#F5F7FA`), success green and warning red reserved for real states. Manrope
for headings, Inter for body, loaded via `next/font/google` with Cyrillic
subsets. `prefers-reduced-motion` is respected throughout.
