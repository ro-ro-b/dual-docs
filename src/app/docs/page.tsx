import Link from "next/link";

const quickLinks = [
  {
    title: "Quick Start",
    desc: "Set up your first project in under 5 minutes",
    href: "/docs/getting-started/quickstart",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    title: "API Reference",
    desc: "Explore all endpoints with interactive examples",
    href: "/docs/api/objects",
    icon: "M20 14.66V20a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h5.34",
  },
  {
    title: "Tutorials",
    desc: "Step-by-step guides from beginner to advanced",
    href: "/docs/tutorials",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
  {
    title: "AI Tools",
    desc: "Connect AI models and Claude plugins to DUAL",
    href: "/docs/ai-tools",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  },
];

const coreConceptCards = [
  { title: "Organizations", desc: "Multi-tenant workspaces with role-based access", href: "/docs/concepts/organizations" },
  { title: "Wallets", desc: "Identity primitives for authentication and ownership", href: "/docs/concepts/wallets" },
  { title: "Templates", desc: "Define structure and properties of tokenized objects", href: "/docs/concepts/templates" },
  { title: "Objects", desc: "Instances representing real-world or digital assets", href: "/docs/concepts/objects" },
  { title: "Actions", desc: "Operations executed via the Event Bus", href: "/docs/concepts/actions" },
  { title: "Faces", desc: "Visual representations attached to templates", href: "/docs/concepts/faces" },
];

export default function DocsHome() {
  return (
    <div className="max-w-5xl px-12 py-16">
      {/* Hero */}
      <div className="mb-16">
        <h1
          className="text-5xl font-semibold leading-[1.15] mb-5 tracking-tight"
          style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}
        >
          Welcome to DUAL
          <br />
          Developer Playground
        </h1>
        <p
          className="text-lg mb-8 max-w-xl leading-relaxed"
          style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}
        >
          DUAL provides modular blockchain infrastructure for secure digital
          interactions. Sign up for a free developer account and start building
          scalable authentication, identity, and token-based applications.
        </p>
        <div className="flex items-center gap-5">
          <Link
            href="/docs/getting-started/quickstart"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-[#15b8a7] text-white text-sm font-medium rounded-lg hover:bg-[#13a596] transition-all duration-200 uppercase tracking-wider shadow-sm hover:shadow-md"
          >
            Get Started
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-200 group-hover:translate-x-0.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/docs/ai-tools"
            className="text-sm font-medium uppercase tracking-wider transition-colors duration-200"
            style={{ color: "var(--text-muted)" }}
          >
            Explore AI Tools
          </Link>
        </div>
      </div>

      {/* Quick links grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-start gap-4 p-5 rounded-xl border transition-all duration-200 hover:border-[#15b8a7]/30 hover:shadow-sm"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
          >
            <div className="shrink-0 w-10 h-10 rounded-lg bg-[#15b8a7]/10 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#15b8a7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={link.icon} />
              </svg>
            </div>
            <div className="min-w-0">
              <h3
                className="text-sm font-semibold mb-1 group-hover:text-[#15b8a7] transition-colors"
                style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-primary)" }}
              >
                {link.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
                {link.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Core Concepts */}
      <div className="mb-16">
        <h2
          className="text-xs font-bold tracking-wider uppercase mb-4"
          style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}
        >
          Core Concepts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {coreConceptCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group p-4 rounded-lg border transition-all duration-200 hover:border-[#15b8a7]/30"
              style={{ borderColor: "var(--border)" }}
            >
              <h3
                className="text-sm font-medium mb-1 group-hover:text-[#15b8a7] transition-colors"
                style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-primary)" }}
              >
                {card.title}
              </h3>
              <p className="text-xs" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
                {card.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Learn DUAL banner */}
      <Link
        href="/docs/learn"
        className="group flex items-center gap-5 p-6 rounded-xl border transition-all duration-200 hover:border-[#15b8a7]/30 hover:shadow-sm"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
      >
        <div className="shrink-0 w-12 h-12 rounded-xl bg-[#15b8a7]/10 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#15b8a7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3
              className="text-sm font-semibold group-hover:text-[#15b8a7] transition-colors"
              style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-primary)" }}
            >
              Learn DUAL
            </h3>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#15b8a7] text-white uppercase tracking-wider">
              AI-Powered
            </span>
          </div>
          <p className="text-xs leading-relaxed" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
            Explore DUAL through AI-generated audio overviews, video explainers, mind maps, and flashcards — powered by Google NotebookLM.
          </p>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 transition-transform group-hover:translate-x-0.5" style={{ color: "var(--text-muted)" }}>
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}
