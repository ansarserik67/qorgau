import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/technology", "/platform", "/map", "/dashboard", "/about", "/contact", "/privacy", "/terms"];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date("2026-10-08"),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : route === "/contact" ? 0.8 : 0.7,
  }));
}
