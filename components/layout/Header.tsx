"use client";

/**
 * Sticky site header.
 * Desktop: logo · navigation · language selector · primary CTA.
 * Mobile: compact bar with a functional collapsible menu.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { LanguageSelector } from "@/components/navigation/LanguageSelector";
import { useLang } from "@/components/i18n/LanguageProvider";

const NAV_ITEMS = [
  { href: "/technology", key: "nav.technology" },
  { href: "/platform", key: "nav.platform" },
  { href: "/map", key: "nav.map" },
  { href: "/about", key: "nav.about" },
] as const;

export function Header() {
  const pathname = usePathname();
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  // Close on Escape for keyboard users.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/95 backdrop-blur-[6px]">
      <div className="container-page flex h-[76px] items-center justify-between gap-6">
        <Logo variant="dark" />

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`relative rounded-md px-3 py-2 text-[15px] font-semibold transition-colors duration-150 ${
                isActive(item.href)
                  ? "text-ink"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              {t(item.key)}
              <span
                aria-hidden="true"
                className={`absolute inset-x-3 -bottom-[1px] h-[2px] rounded-full transition-all duration-200 ${
                  isActive(item.href) ? "bg-amber" : "bg-transparent"
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LanguageSelector />
          </div>
          <Link
            href="/contact"
            className="btn btn-primary hidden md:inline-flex"
          >
            {t("cta.pilot")}
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line text-ink transition-colors hover:bg-canvas lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {open && (
        <div
          id="mobile-nav"
          className="border-t border-line bg-surface lg:hidden"
        >
          <nav
            aria-label="Mobile navigation"
            className="container-page flex flex-col gap-1 py-4"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rounded-lg px-3 py-3 text-[16px] font-semibold transition-colors ${
                  isActive(item.href)
                    ? "bg-amber/10 text-ink"
                    : "text-ink-soft hover:bg-canvas hover:text-ink"
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
            <Link
              href="/dashboard"
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 text-[16px] font-semibold text-ink-soft transition-colors hover:bg-canvas hover:text-ink"
            >
              {t("nav.dashboard")}
            </Link>
            <div className="mt-3 flex items-center justify-between gap-3 border-t border-line pt-4">
              <LanguageSelector />
              <Link href="/contact" onClick={closeMenu} className="btn btn-primary">
                {t("cta.pilot")}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
