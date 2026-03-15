import Link from "next/link";

const footerLinks = [
  { label: "Quick Start", href: "/docs/getting-started/quickstart" },
  { label: "API Reference", href: "/docs/api/objects" },
  { label: "Tutorials", href: "/docs/tutorials" },
  { label: "AI Tools", href: "/docs/ai-tools" },
  { label: "Support", href: "/docs/support" },
  { label: "Updates", href: "/docs/updates" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t py-8 px-12" style={{ borderColor: "var(--border)" }}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke="#15B8A7" strokeWidth="2.5" />
            <path d="M10 16h12M16 10v12" stroke="#15B8A7" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <span className="text-xs" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
            &copy; {new Date().getFullYear()} DUAL. All rights reserved.
          </span>
        </div>
        <nav className="flex flex-wrap items-center gap-4">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs transition-colors hover:text-[#15b8a7]"
              style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
