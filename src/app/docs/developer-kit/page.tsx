import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata = { title: "Developer Kit — DUAL Docs" };

const tools = [
  {
    title: "TypeScript SDK",
    desc: "Fully-typed client library with 102 methods covering every endpoint. Includes retry logic, error handling, and modular architecture.",
    href: "/docs/developer-kit/sdk",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    badge: "npm install @dual/sdk",
  },
  {
    title: "Postman Collection",
    desc: "100 pre-built requests organized into 14 folders. Import into Postman and start testing with zero configuration.",
    href: "/docs/developer-kit/postman",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
    badge: "Download .json",
  },
  {
    title: "OpenAPI Spec",
    desc: "Complete OpenAPI 3.1.0 specification with 70 paths and 100 operations. Import into any API tool or code generator.",
    href: "/docs/developer-kit/api-reference",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    badge: "OpenAPI 3.1.0",
  },
  {
    title: "CLI Tool",
    desc: "Zero-dependency command-line interface for quick API testing. 11 commands covering auth, wallets, templates, objects, and more.",
    href: "/docs/developer-kit/cli",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
    badge: "npx dual-cli",
  },
  {
    title: "Migration Guide",
    desc: "Step-by-step migration from API v2 to v3. Covers auth, endpoints, pagination, error handling with before/after examples.",
    href: "/docs/developer-kit/migration",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    badge: "v2 → v3",
  },
];

export default function DeveloperKitPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <Breadcrumb items={[{ label: "Docs", href: "/docs" }, { label: "Developer Kit" }]} />

      <h1
        className="text-3xl font-bold mb-3"
        style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}
      >
        Developer Kit
      </h1>
      <p className="mb-10 leading-relaxed max-w-2xl" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
        Everything you need to build on DUAL — an SDK, CLI, Postman collection, OpenAPI spec, and migration tooling. All artifacts are generated from the same endpoint definitions that power this documentation.
      </p>

      {/* Quick Install Banner */}
      <div
        className="mb-10 p-5 rounded-xl border"
        style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-[#15b8a7]/10 flex items-center justify-center text-[#15b8a7]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <span className="text-sm font-semibold" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-primary)" }}>
            Quick Start
          </span>
        </div>
        <div className="rounded-lg p-4" style={{ backgroundColor: "var(--code-bg)" }}>
          <code className="text-sm" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--code-text)" }}>
            npm install @dual/sdk
          </code>
        </div>
        <p className="text-xs mt-3" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
          Or clone the full kit:{" "}
          <code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: "var(--code-bg)", fontFamily: "var(--font-dm-mono)", color: "var(--code-text)" }}>
            git clone https://github.com/ro-ro-b/dual-developer-kit
          </code>
        </p>
      </div>

      {/* Tool cards */}
      <div className="grid gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.title}
            href={tool.href}
            className="group flex items-start gap-5 p-5 rounded-xl border transition-all hover:shadow-md"
            style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
          >
            <div
              className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-colors group-hover:bg-[#15b8a7]/15 group-hover:text-[#15b8a7]"
              style={{ backgroundColor: "rgba(21,184,167,0.08)", color: "var(--text-muted)" }}
            >
              {tool.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-base font-semibold" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-primary)" }}>
                  {tool.title}
                </span>
                <span
                  className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded"
                  style={{ fontFamily: "var(--font-dm-mono)", backgroundColor: "rgba(21,184,167,0.1)", color: "var(--text-muted)" }}
                >
                  {tool.badge}
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
                {tool.desc}
              </p>
            </div>
            <div className="shrink-0 self-center transition-transform group-hover:translate-x-1" style={{ color: "var(--text-muted)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
