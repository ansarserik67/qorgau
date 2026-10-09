import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";

import "./globals.css";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "QORGAU — Road safety technology for livestock hazard detection",
    template: "%s · QORGAU",
  },
  description:
    "QORGAU is an early-stage Kazakhstan road safety technology startup developing livestock detection, roadside warning signals and a hazard monitoring platform. Prototype in development — demo data shown.",
  keywords: [
    "road safety",
    "livestock detection",
    "Kazakhstan",
    "computer vision",
    "intelligent transportation systems",
    "hazard monitoring",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "QORGAU",
    title: "QORGAU — Detect earlier. Warn sooner. Make roads safer.",
    description:
      "Early-stage road safety technology for detecting livestock near roads and warning drivers. Prototype in development; all data shown is simulated demonstration data.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary",
    title: "QORGAU — Road safety technology prototype",
    description:
      "Livestock detection and roadside warning technology for Kazakhstan roads. Prototype in development.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#101C2C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-canvas">
        <LanguageProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
          >
            Skip to content
          </a>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
