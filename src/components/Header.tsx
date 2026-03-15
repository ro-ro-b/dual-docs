"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

/* ── Basics dropdown data (3-column mega menu) ── */
const basicsColumns = [
  {
    title: "GETTING STARTED",
    items: [
      { label: "Overview", href: "/docs/getting-started/overview" },
      { label: "Authentication", href: "/docs/getting-started/authentication" },
      { label: "Quick Start", href: "/docs/getting-started/quickstart" },
    ],
  },
  {
    title: "CORE CONCEPTS",
    items: [
      { label: "Organizations", href: "/docs/concepts/organizations" },
      { label: "Wallets", href: "/docs/concepts/wallets" },
      { label: "Templates", href: "/docs/concepts/templates" },
      { label: "Objects", href: "/docs/concepts/objects" },
      { label: "Actions", href: "/docs/concepts/actions" },
      { label: "Faces", href: "/docs/concepts/faces" },
    ],
  },
  {
    title: "INFRASTRUCTURE",
    items: [
      { label: "Sequencer", href: "/docs/infrastructure/sequencer" },
      { label: "ZK Rollup", href: "/docs/infrastructure/zk-rollup" },
      { label: "Smart Contracts", href: "/docs/infrastructure/smart-contracts" },
    ],
  },
];

/* ── API dropdown data (2-section mega menu) ── */
const apiOverviewItems = [
  { label: "Overview", href: "/docs/getting-started/overview" },
  { label: "Authentication", href: "/docs/getting-started/authentication" },
];

const apiReferenceItems = [
  { label: "API Keys", href: "/docs/api/apikeys" },
  { label: "Event Bus", href: "/docs/api/ebus" },
  { label: "Faces", href: "/docs/api/faces" },
  { label: "Notifications", href: "/docs/api/notifications" },
  { label: "Objects", href: "/docs/api/objects" },
  { label: "Organizations", href: "/docs/api/organizations" },
  { label: "Payments", href: "/docs/api/payments" },
  { label: "Public API", href: "/docs/api/indexer" },
  { label: "Sequencer", href: "/docs/api/sequencer" },
  { label: "Storage", href: "/docs/api/storage" },
  { label: "Support", href: "/docs/api/support" },
  { label: "Templates", href: "/docs/api/templates" },
  { label: "Wallets", href: "/docs/api/wallets" },
  { label: "Webhooks", href: "/docs/api/webhooks" },
];

export default function Header({ onMenuToggle }: { onMenuToggle?: () => void } = {}) {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const { theme, toggle } = useTheme();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setOpenDropdown(null);
  }, [pathname]);

  const toggleDropdown = (e: React.MouseEvent, name: string) => {
    e.stopPropagation();
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full backdrop-blur-xl"
      style={{ backgroundColor: "var(--header-wrap)" }}
    >
      <div className="mx-4 mt-3 mb-2 flex h-14 items-center px-5 rounded-2xl border shadow-[0_1px_3px_rgba(0,0,0,0.04)]" style={{ backgroundColor: "var(--header-bg)", borderColor: "var(--border)" }}>
        {/* Back arrow + Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="hover:opacity-70 transition-opacity" style={{ color: "var(--text-primary)" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <Link href="/docs" className="flex items-center gap-2">
            <div className="flex items-center">
              {/* Official DUAL logo from dual-website.vercel.app */}
              <svg width="105" height="27" viewBox="0 0 104.593 26.998" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: "var(--text-primary)" }}>
                <g>
                  <g>
                    <path d="M99.6752 22.7535C98.6353 22.7535 97.7188 22.5244 96.9256 22.0661C96.1501 21.5902 95.5421 20.9557 95.1015 20.1626C94.6785 19.3695 94.4669 18.4882 94.4669 17.5188V4.24712H97.6395V17.9154C97.6395 18.4794 97.8245 18.9641 98.1947 19.3695C98.5824 19.7748 99.0759 19.9775 99.6752 19.9775H104.593V22.7535H99.6752Z" fill="currentColor"/>
                    <path d="M75.4022 22.7524L81.5622 6.14949C81.8618 5.39161 82.2936 4.83642 82.8576 4.48392C83.4216 4.11379 84.0649 3.92873 84.7875 3.92873C85.5278 3.92873 86.1799 4.10498 86.7439 4.45748C87.3256 4.80998 87.7574 5.36517 88.0394 6.12305L94.2258 22.7524H90.7625L89.3348 18.6545H80.1874L78.7069 22.7524H75.4022ZM81.1392 15.8521H88.3831L85.4221 7.207C85.3516 7.03075 85.2634 6.89856 85.1577 6.81043C85.0695 6.72231 84.955 6.67824 84.814 6.67824C84.673 6.67824 84.5584 6.73112 84.4703 6.83687C84.3822 6.925 84.3117 7.04837 84.2588 7.207L81.1392 15.8521Z" fill="currentColor"/>
                    <path d="M67.0747 23.0707C65.6119 23.0707 64.3164 22.7711 63.1884 22.1718C62.0604 21.555 61.1703 20.6825 60.5182 19.5545C59.8837 18.4265 59.5664 17.0782 59.5664 15.5095V4.24709H62.7125V15.7739C62.7125 16.5847 62.8888 17.3337 63.2413 18.0211C63.6114 18.7085 64.1225 19.2637 64.7747 19.6867C65.4268 20.0921 66.2023 20.2948 67.1012 20.2948C68.0001 20.2948 68.7667 20.0921 69.4012 19.6867C70.0534 19.2637 70.5557 18.7085 70.9082 18.0211C71.2607 17.3337 71.4369 16.5847 71.4369 15.7739V4.24709H74.6095V15.5095C74.6095 17.0782 74.2834 18.4265 73.6313 19.5545C72.9791 20.6825 72.0891 21.555 70.9611 22.1718C69.8331 22.7711 68.5376 23.0707 67.0747 23.0707Z" fill="currentColor"/>
                    <path d="M42.086 22.7535V4.24712H48.1666C50.1406 4.24712 51.8503 4.64368 53.2955 5.43681C54.7408 6.22995 55.86 7.3227 56.6531 8.71509C57.4462 10.1075 57.8428 11.7025 57.8428 13.5003C57.8428 15.2981 57.4462 16.8931 56.6531 18.2855C55.86 19.6779 54.7408 20.7707 53.2955 21.5638C51.8503 22.3569 50.1406 22.7535 48.1666 22.7535H42.086ZM45.2321 19.9775H48.1931C49.4445 19.9775 50.5548 19.722 51.5242 19.2108C52.5112 18.6821 53.2867 17.933 53.8507 16.9636C54.4147 15.9766 54.6967 14.8222 54.6967 13.5003C54.6967 12.1608 54.4147 11.0064 53.8507 10.037C53.2867 9.06759 52.5112 8.32733 51.5242 7.81621C50.5548 7.28745 49.4445 7.02307 48.1931 7.02307H45.2321V19.9775Z" fill="currentColor"/>
                  </g>
                  <path d="M13.7578 18.8984C13.7578 22.2766 16.2986 25.0592 19.5732 25.4443V26.998H9.78613C4.38136 26.9978 1.03082e-06 22.6158 0 17.2109C0.000158086 11.8062 4.38146 7.42503 9.78613 7.4248H13.7578V18.8984ZM23.5947 0C28.9994 0.000204823 33.3806 4.38148 33.3809 9.78613C33.3809 15.191 28.9995 19.573 23.5947 19.5732H19.625V8.09961C19.625 4.7208 17.0832 1.93796 13.8076 1.55371V0H23.5947Z" fill="currentColor"/>
                </g>
              </svg>
            </div>
            <span className="text-xs font-medium bg-[#15b8a7] text-white px-2 py-0.5 rounded">
              Docs
            </span>
          </Link>
        </div>

        {/* Mobile hamburger */}
        {onMenuToggle && (
          <button
            type="button"
            onClick={onMenuToggle}
            className="lg:hidden ml-4 p-2 rounded-lg transition-colors cursor-pointer"
            style={{ color: "var(--text-muted)" }}
            aria-label="Toggle sidebar"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        )}

        {/* Nav links */}
        <nav className="ml-10 hidden lg:flex items-center gap-6">
          {/* Basics dropdown */}
          <button
            type="button"
            onClick={(e) => toggleDropdown(e, "basics")}
            className="text-sm font-medium transition-colors flex items-center gap-1 cursor-pointer"
            style={{
              fontFamily: "var(--font-satoshi)",
              color: openDropdown === "basics" || pathname.startsWith("/docs/getting-started") || pathname.startsWith("/docs/concepts") || pathname.startsWith("/docs/infrastructure")
                ? "var(--text-primary)"
                : "var(--text-muted)",
            }}
          >
            Basics
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`transition-transform ${openDropdown === "basics" ? "rotate-180" : ""}`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {/* API dropdown */}
          <button
            type="button"
            onClick={(e) => toggleDropdown(e, "api")}
            className="text-sm font-medium transition-colors flex items-center gap-1 cursor-pointer"
            style={{
              fontFamily: "var(--font-satoshi)",
              color: openDropdown === "api" || pathname.startsWith("/docs/api")
                ? "var(--text-primary)"
                : "var(--text-muted)",
            }}
          >
            API
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`transition-transform ${openDropdown === "api" ? "rotate-180" : ""}`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {/* Static links */}
          {[
            { label: "Developer Kit", href: "/docs/developer-kit" },
            { label: "AI Tools", href: "/docs/ai-tools" },
            { label: "Tutorials", href: "/docs/tutorials" },
            { label: "Learn", href: "/docs/learn" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium transition-colors"
              style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-4">
          {/* Dark mode toggle */}
          <button
            type="button"
            onClick={toggle}
            className="p-2 rounded-lg border transition-colors cursor-pointer"
            style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          <button
            onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm transition-colors cursor-pointer"
            style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <span className="hidden sm:inline">Search</span>
            <kbd className="ml-2 text-xs px-1.5 py-0.5 rounded hidden sm:inline" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}>⌘K</kbd>
          </button>
          <Link
            href="#"
            className="hidden sm:inline-flex px-4 py-1.5 text-sm font-medium rounded-lg transition-colors"
            style={{ border: "1px solid var(--text-primary)", color: "var(--text-primary)" }}
          >
            LOGIN
          </Link>
        </div>
      </div>

      {/* ── Basics Mega Menu ── */}
      {openDropdown === "basics" && (
        <div className="absolute left-0 right-0 top-full mt-1 backdrop-blur-lg border-b shadow-lg z-50 rounded-b-xl" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="max-w-5xl mx-auto px-8 py-6">
            <div className="grid grid-cols-3 gap-8">
              {basicsColumns.map((col) => (
                <div key={col.title}>
                  <h3
                    className="text-xs font-bold tracking-wider mb-3 pb-2"
                    style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}
                  >
                    {col.title}
                  </h3>
                  <ul className="space-y-2">
                    {col.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-sm transition-colors block"
                          style={{
                            fontFamily: "var(--font-satoshi)",
                            color: pathname === item.href ? "#15b8a7" : "var(--text-muted)",
                            fontWeight: pathname === item.href ? 500 : 400,
                          }}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── API Mega Menu ── */}
      {openDropdown === "api" && (
        <div className="absolute left-0 right-0 top-full mt-1 backdrop-blur-lg border-b shadow-lg z-50 rounded-b-xl" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="max-w-5xl mx-auto px-8 py-6">
            <div className="grid grid-cols-[200px_1fr] gap-8">
              {/* Left column: API overview */}
              <div>
                <h3
                  className="text-xs font-bold tracking-wider mb-3 pb-2"
                  style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}
                >
                  DUAL API
                </h3>
                <ul className="space-y-2">
                  {apiOverviewItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm transition-colors block"
                        style={{
                          fontFamily: "var(--font-satoshi)",
                          color: pathname === item.href ? "#15b8a7" : "var(--text-muted)",
                          fontWeight: pathname === item.href ? 500 : 400,
                        }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right column: Reference grid (2 sub-columns) */}
              <div>
                <h3
                  className="text-xs font-bold tracking-wider mb-3 pb-2"
                  style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}
                >
                  REFERENCE
                </h3>
                <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
                  {apiReferenceItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm transition-colors block"
                        style={{
                          fontFamily: "var(--font-satoshi)",
                          color: pathname === item.href ? "#15b8a7" : "var(--text-muted)",
                          fontWeight: pathname === item.href ? 500 : 400,
                        }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
