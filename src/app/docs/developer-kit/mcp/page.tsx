import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata = { title: "MCP Server — DUAL Docs" };

const modules = [
  { name: "Wallets", tools: 10, desc: "Authentication, registration, profile management" },
  { name: "Organizations", tools: 10, desc: "Multi-tenant workspaces, members, roles" },
  { name: "Templates", tools: 7, desc: "Token template CRUD, variations" },
  { name: "Objects", tools: 8, desc: "Tokenized asset instances, search, hierarchy" },
  { name: "Actions", tools: 7, desc: "Execute actions, batch operations, action types" },
  { name: "Faces", tools: 6, desc: "Visual representations (image, 3D, web)" },
  { name: "Storage", tools: 4, desc: "File upload, asset management" },
  { name: "Webhooks", tools: 6, desc: "Real-time event subscriptions" },
  { name: "Notifications", tools: 5, desc: "Message sending, templates" },
  { name: "Sequencer", tools: 4, desc: "Batch and ZK-rollup checkpoint queries" },
  { name: "API Keys", tools: 3, desc: "Programmatic access management" },
  { name: "Payments", tools: 2, desc: "Payment config, deposit history" },
  { name: "Support", tools: 3, desc: "Feature access requests, support messages" },
  { name: "Public API", tools: 5, desc: "Read-only public endpoints (no auth)" },
];

const totalTools = modules.reduce((sum, m) => sum + m.tools, 0);

export default function McpPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <Breadcrumb items={[{ label: "Docs", href: "/docs" }, { label: "AI Tools", href: "/docs/ai-tools" }, { label: "MCP Server" }]} />

      <div className="flex items-center gap-3 mb-3">
        <h1
          className="text-3xl font-bold"
          style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}
        >
          MCP Server
        </h1>
        <span
          className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full"
          style={{ backgroundColor: "#15b8a7", color: "white" }}
        >
          AI-NATIVE
        </span>
      </div>
      <p className="mb-10 leading-relaxed max-w-2xl" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
        AI-native integration with the DUAL tokenization platform via the Model Context Protocol. {totalTools} tools across 14 API modules — enabling AI agents to mint tokens, manage templates, execute actions, and query blockchain infrastructure as first-class users of the system.
      </p>

      {/* Quick Start */}
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
        <div className="rounded-lg p-4 mb-3" style={{ backgroundColor: "var(--code-bg)" }}>
          <code className="text-sm" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--code-text)" }}>
            git clone https://github.com/ro-ro-b/dual-mcp-server && cd dual-mcp-server && npm install && npm run build
          </code>
        </div>
        <p className="text-xs mb-3" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
          Then configure your MCP client (Claude Desktop, Cursor, etc.) to point at{" "}
          <code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: "var(--code-bg)", fontFamily: "var(--font-dm-mono)", color: "var(--code-text)" }}>
            dist/index.js
          </code>
        </p>
        <Link
          href="/docs/developer-kit/mcp-guide"
          className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80"
          style={{ fontFamily: "var(--font-satoshi)", color: "#15b8a7" }}
        >
          Full setup guide →
        </Link>
      </div>

      {/* Claude Desktop Config */}
      <h2
        className="text-xl font-bold mb-2"
        style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}
      >
        Claude Desktop Configuration
      </h2>
      <p className="text-sm mb-4" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
        Add to your <code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: "var(--code-bg)", fontFamily: "var(--font-dm-mono)", color: "var(--code-text)" }}>claude_desktop_config.json</code>:
      </p>
      <div className="rounded-lg p-4 mb-10 overflow-x-auto" style={{ backgroundColor: "var(--code-bg)" }}>
        <pre className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--code-text)" }}>
{`{
  "mcpServers": {
    "dual": {
      "command": "node",
      "args": ["/path/to/dual-mcp-server/dist/index.js"],
      "env": {
        "DUAL_API_KEY": "your-api-key"
      }
    }
  }
}`}
        </pre>
      </div>

      {/* What is MCP */}
      <div
        className="mb-10 p-6 rounded-xl border"
        style={{
          background: "linear-gradient(135deg, rgba(21,184,167,0.06) 0%, rgba(99,102,241,0.06) 100%)",
          borderColor: "var(--border)",
        }}
      >
        <h3
          className="text-base font-bold mb-2"
          style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}
        >
          What is MCP?
        </h3>
        <p className="text-sm leading-relaxed mb-3" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
          The Model Context Protocol is an open standard that enables AI models to interact with external tools and services through a structured interface. Instead of screen scraping or brittle API wrappers, MCP provides native, typed integration — the AI agent becomes a first-class user of the platform.
        </p>
        <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
          With DUAL&apos;s MCP server, you can describe a tokenization use case in plain language and have an AI agent configure and deploy it. The agent uses the same proven API modules that power the DUAL platform — not potentially vulnerable generated code.
        </p>
      </div>

      {/* Example */}
      <h2
        className="text-xl font-bold mb-2"
        style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}
      >
        Example: Natural Language → Token Deployment
      </h2>
      <div
        className="mb-4 p-4 rounded-xl border-l-2"
        style={{ backgroundColor: "rgba(21,184,167,0.06)", borderColor: "#15b8a7" }}
      >
        <p className="text-sm italic" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
          &ldquo;Create a redeemable reward token for my brand with 1 million supply, set up a rule that expires after 12 months, and mint it on Base.&rdquo;
        </p>
      </div>
      <div className="mb-10 space-y-2">
        {[
          { tool: "dual_create_template", desc: "Define the reward token structure with properties" },
          { tool: "dual_create_action_type", desc: 'Register "Redeem" and "Expire" action types' },
          { tool: "dual_execute_action", desc: "Mint the initial 1M supply" },
          { tool: "dual_create_webhook", desc: "Set up expiry monitoring" },
        ].map((step, i) => (
          <div key={step.tool} className="flex items-start gap-3 text-sm" style={{ fontFamily: "var(--font-satoshi)" }}>
            <span className="shrink-0 w-6 h-6 rounded-full bg-[#15b8a7]/10 text-[#15b8a7] flex items-center justify-center text-xs font-bold">
              {i + 1}
            </span>
            <div>
              <code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: "rgba(21,184,167,0.1)", fontFamily: "var(--font-dm-mono)", color: "var(--text-muted)" }}>
                {step.tool}
              </code>
              <span className="ml-2" style={{ color: "var(--text-muted)" }}>{step.desc}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Module Table */}
      <h2
        className="text-xl font-bold mb-4"
        style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}
      >
        API Modules ({totalTools} Tools)
      </h2>
      <div className="rounded-xl border overflow-hidden mb-10" style={{ borderColor: "var(--border)" }}>
        <table className="w-full text-sm" style={{ fontFamily: "var(--font-satoshi)" }}>
          <thead>
            <tr style={{ backgroundColor: "rgba(21,184,167,0.06)" }}>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "var(--text-primary)" }}>Module</th>
              <th className="text-center px-4 py-3 font-semibold" style={{ color: "var(--text-primary)" }}>Tools</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "var(--text-primary)" }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((m, i) => (
              <tr
                key={m.name}
                className="border-t"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: i % 2 === 0 ? "var(--surface)" : "transparent",
                }}
              >
                <td className="px-4 py-2.5 font-medium" style={{ color: "var(--text-primary)" }}>{m.name}</td>
                <td className="px-4 py-2.5 text-center">
                  <span
                    className="inline-block px-2 py-0.5 rounded text-xs font-bold"
                    style={{ backgroundColor: "rgba(21,184,167,0.1)", color: "#15b8a7", fontFamily: "var(--font-dm-mono)" }}
                  >
                    {m.tools}
                  </span>
                </td>
                <td className="px-4 py-2.5" style={{ color: "var(--text-muted)" }}>{m.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Setup Guide CTA */}
      <Link
        href="/docs/developer-kit/mcp-guide"
        className="group flex items-center gap-4 p-5 rounded-xl border transition-all hover:shadow-md mb-4"
        style={{ backgroundColor: "rgba(21,184,167,0.06)", borderColor: "#15b8a7" }}
      >
        <div className="w-10 h-10 rounded-lg bg-[#15b8a7]/15 flex items-center justify-center text-[#15b8a7]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
        </div>
        <div className="flex-1">
          <span className="text-sm font-semibold block" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-primary)" }}>
            MCP Setup Guide
          </span>
          <span className="text-xs" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
            Step-by-step installation, authentication options, client configuration, and usage examples.
          </span>
        </div>
        <div className="shrink-0 transition-transform group-hover:translate-x-1" style={{ color: "#15b8a7" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </Link>

      {/* GitHub Link */}
      <a
        href="https://github.com/ro-ro-b/dual-mcp-server"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-3 px-5 py-3 rounded-xl border transition-all hover:shadow-md"
        style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--text-primary)" }}>
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        <div>
          <span className="text-sm font-semibold block" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-primary)" }}>
            View on GitHub
          </span>
          <span className="text-xs" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--text-muted)" }}>
            ro-ro-b/dual-mcp-server
          </span>
        </div>
        <div className="shrink-0 transition-transform group-hover:translate-x-1" style={{ color: "var(--text-muted)" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </div>
      </a>
    </div>
  );
}
