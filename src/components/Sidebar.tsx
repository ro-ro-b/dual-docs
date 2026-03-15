"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { docsNavigation, type NavSection } from "@/data/navigation";

function SidebarSection({ section, onNavigate }: { section: NavSection; onNavigate?: () => void }) {
  const pathname = usePathname();
  const hasActive = section.items.some((item) => pathname === item.href);
  const [isOpen, setIsOpen] = useState(hasActive);
  const activeRef = useRef<HTMLAnchorElement>(null);

  // Auto-scroll active link into view on mount
  useEffect(() => {
    if (hasActive && activeRef.current) {
      activeRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [hasActive]);

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 w-full text-left text-xs font-bold tracking-wider mb-2 uppercase cursor-pointer"
        style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}
      >
        {section.title}
        <svg
          width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          className={`transition-transform duration-200 ${isOpen ? "rotate-0" : "-rotate-90"}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div className="overflow-hidden transition-all duration-200" style={{ maxHeight: isOpen ? "600px" : "0px", opacity: isOpen ? 1 : 0 }}>
        <ul className="space-y-0.5">
          {section.items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  ref={isActive ? activeRef : undefined}
                  href={item.href}
                  onClick={onNavigate}
                  className={`block px-3 py-1.5 text-sm rounded-md transition-all duration-150 border-l-2 ${
                    isActive ? "text-[#15b8a7] font-medium border-[#15b8a7]" : "border-transparent"
                  }`}
                  style={{
                    fontFamily: "var(--font-satoshi)",
                    color: isActive ? "#15b8a7" : "var(--text-muted)",
                    backgroundColor: isActive ? "rgba(21, 184, 167, 0.08)" : "transparent",
                  }}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <aside
      className="w-[260px] shrink-0 overflow-y-auto h-[calc(100vh-72px)] sticky top-[72px] py-6 px-4"
      style={{ borderRight: "1px solid var(--border)", backgroundColor: "var(--sidebar-bg, var(--surface))" }}
    >
      {docsNavigation.map((section) => (
        <SidebarSection key={section.title} section={section} onNavigate={onNavigate} />
      ))}
    </aside>
  );
}
