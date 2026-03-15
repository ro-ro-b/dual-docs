import React from "react";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata = { title: "AI Tools & Claude Plugins — DUAL Docs" };

/* ── Plugin data ── */

interface PluginInfo {
  id: string;
  name: string;
  tagline: string;
  audience: string;
  downloadPath: string;
  fileSize: string;
  commands: { name: string; desc: string }[];
}

const plugins: PluginInfo[] = [
  {
    id: "token-manager",
    name: "Token Manager",
    tagline: "Manage tokens through conversation",
    audience: "End Users",
    downloadPath: "/downloads/dual-token-manager.plugin",
    fileSize: "20 KB",
    commands: [
      { name: "/my-tokens", desc: "View your object collection" },
      { name: "/transfer", desc: "Transfer tokens between wallets" },
      { name: "/mint", desc: "Create new tokens from templates" },
    ],
  },
  {
    id: "developer-kit",
    name: "Developer Kit",
    tagline: "Build on DUAL faster",
    audience: "Developers",
    downloadPath: "/downloads/dual-developer-kit.plugin",
    fileSize: "28 KB",
    commands: [
      { name: "/api-lookup", desc: "Search any DUAL API endpoint" },
      { name: "/scaffold-template", desc: "Generate template boilerplate" },
      { name: "/generate-webhook", desc: "Create webhook handlers" },
    ],
  },
  {
    id: "ai-toolkit",
    name: "AI Toolkit",
    tagline: "Wire up AI to DUAL",
    audience: "AI Engineers",
    downloadPath: "/downloads/dual-ai-toolkit.plugin",
    fileSize: "44 KB",
    commands: [
      { name: "/setup-classifier", desc: "Scaffold a classification pipeline" },
      { name: "/setup-chatbot", desc: "Scaffold a conversational assistant" },
      { name: "/setup-guardrails", desc: "Generate AI safety middleware" },
    ],
  },
];

const audienceColors: Record<string, string> = {
  "End Users": "bg-emerald-500/10 text-emerald-600",
  Developers: "bg-blue-500/10 text-blue-600",
  "AI Engineers": "bg-purple-500/10 text-purple-600",
};

/* ── Icons ── */

function McpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#15b8a7" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 0 1 4 4v1h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2V6a4 4 0 0 1 4-4z" />
      <circle cx="12" cy="14" r="2" />
      <path d="M12 16v2" />
    </svg>
  );
}

function PlugIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#15b8a7" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22v-5" />
      <path d="M9 8V2" />
      <path d="M15 8V2" />
      <path d="M18 8v5a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

/* ── Page ── */

export default function AIToolsPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <Breadcrumb items={[{ label: "Docs", href: "/docs" }, { label: "AI Tools" }]} />

      <h1
        className="text-3xl font-bold mb-3"
        style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}
      >
        AI Tools
      </h1>
      <p
        className="mb-8 leading-relaxed max-w-2xl"
        style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}
      >
        Everything you need to integrate AI with the DUAL platform — MCP server for AI agents
        and Claude plugins that let you manage tokens and wire up AI through conversation.
      </p>

      {/* Jump links */}
      <div className="flex flex-wrap gap-2 mb-12">
        <a
          href="#mcp"
          className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border transition-all hover:border-[#15b8a7]/40 hover:text-[#15b8a7]"
          style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)", borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
        >
          <McpIcon /> MCP Server
        </a>
        <a
          href="#plugins"
          className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border transition-all hover:border-[#15b8a7]/40 hover:text-[#15b8a7]"
          style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)", borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
        >
          <PlugIcon /> Claude Plugins
        </a>
      </div>

      {/* ════════════════════════════════════════════ */}
      {/* MCP SERVER SECTION                          */}
      {/* ════════════════════════════════════════════ */}

      <section id="mcp" className="mb-16">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg" style={{ backgroundColor: "rgba(21, 184, 167, 0.1)" }}>
            <McpIcon />
          </div>
          <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>
            MCP Server
          </h2>
          <span className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full" style={{ fontFamily: "var(--font-dm-mono)", backgroundColor: "#15b8a7", color: "white" }}>
            AI-NATIVE
          </span>
        </div>
        <p className="text-sm leading-relaxed mb-6" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)", marginLeft: "2.75rem" }}>
          Let AI agents interact with the DUAL platform as first-class users via Model Context Protocol.
        </p>

        <div className="h-px mb-6" style={{ backgroundColor: "var(--border)", marginLeft: "2.75rem" }} />

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/docs/developer-kit/mcp"
            className="group block rounded-xl p-6 border transition-all hover:border-[#15b8a7]/30 hover:shadow-md"
            style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#15b8a7]/10 flex items-center justify-center text-[#15b8a7]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a4 4 0 0 1 4 4v1h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2V6a4 4 0 0 1 4-4z" />
                  <circle cx="12" cy="14" r="2" />
                  <path d="M12 16v2" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold group-hover:text-[#15b8a7] transition-colors" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-primary)" }}>
                  MCP Server Reference
                </h3>
                <p className="text-xs" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--text-muted)" }}>
                  80 tools · 14 modules
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-3" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
              Full reference for the DUAL MCP server — every tool, module, and capability across Payments, Templates, Objects, Wallets, and more.
            </p>
            <span className="text-xs font-medium text-[#15b8a7] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1" style={{ fontFamily: "var(--font-satoshi)" }}>
              View reference <ArrowIcon />
            </span>
          </Link>

          <Link
            href="/docs/developer-kit/mcp-guide"
            className="group block rounded-xl p-6 border transition-all hover:border-[#15b8a7]/30 hover:shadow-md"
            style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#15b8a7]/10 flex items-center justify-center text-[#15b8a7]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold group-hover:text-[#15b8a7] transition-colors" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-primary)" }}>
                  MCP Setup Guide
                </h3>
                <p className="text-xs" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--text-muted)" }}>
                  Step-by-step
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-3" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
              Install and configure the DUAL MCP server in Claude Desktop, VS Code, or any MCP-compatible client in under 5 minutes.
            </p>
            <span className="text-xs font-medium text-[#15b8a7] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1" style={{ fontFamily: "var(--font-satoshi)" }}>
              Start setup <ArrowIcon />
            </span>
          </Link>
        </div>
      </section>

      {/* ════════════════════════════════════════════ */}
      {/* CLAUDE PLUGINS SECTION                      */}
      {/* ════════════════════════════════════════════ */}

      <section id="plugins">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg" style={{ backgroundColor: "rgba(21, 184, 167, 0.1)" }}>
            <PlugIcon />
          </div>
          <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>
            Claude Plugins
          </h2>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ fontFamily: "var(--font-dm-mono)", color: "#15b8a7", backgroundColor: "rgba(21, 184, 167, 0.1)" }}>
            {plugins.length}
          </span>
        </div>
        <p className="text-sm leading-relaxed mb-6" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)", marginLeft: "2.75rem" }}>
          Install DUAL plugins into Claude to manage tokens, build integrations, and wire up AI — all through natural conversation.
        </p>

        <div className="h-px mb-6" style={{ backgroundColor: "var(--border)", marginLeft: "2.75rem" }} />

        {/* Prerequisites */}
        <div className="mb-8 p-5 rounded-xl border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#15b8a7]/10 flex items-center justify-center text-[#15b8a7]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <span className="text-sm font-semibold" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-primary)" }}>
              Before You Start
            </span>
          </div>
          <p className="text-sm leading-relaxed mb-3" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
            All plugins require two environment variables:
          </p>
          <div className="rounded-lg p-4 space-y-1" style={{ backgroundColor: "var(--code-bg)" }}>
            <code className="block text-sm" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--code-text)" }}>
              export DUAL_API_URL=&quot;https://your-dual-api-endpoint&quot;
            </code>
            <code className="block text-sm" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--code-text)" }}>
              export DUAL_TOKEN=&quot;your_authentication_token&quot;
            </code>
          </div>
        </div>

        {/* Plugin cards */}
        <div className="space-y-6">
          {plugins.map((plugin) => (
            <div
              key={plugin.id}
              id={plugin.id}
              className="rounded-xl border overflow-hidden"
              style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
            >
              {/* Header */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>
                        {plugin.name}
                      </h3>
                      <span
                        className={`text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full ${audienceColors[plugin.audience] || ""}`}
                        style={{ fontFamily: "var(--font-dm-mono)" }}
                      >
                        {plugin.audience}
                      </span>
                    </div>
                    <p className="text-sm" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
                      {plugin.tagline}
                    </p>
                  </div>
                  <a
                    href={plugin.downloadPath}
                    download
                    className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90"
                    style={{ fontFamily: "var(--font-satoshi)", backgroundColor: "#15b8a7", color: "#fff" }}
                  >
                    <DownloadIcon />
                    Download
                    <span className="text-xs opacity-70">({plugin.fileSize})</span>
                  </a>
                </div>

                {/* Commands */}
                <div className="space-y-2">
                  {plugin.commands.map((cmd) => (
                    <div key={cmd.name} className="flex items-center gap-3">
                      <code
                        className="shrink-0 text-xs font-bold px-2 py-1 rounded"
                        style={{ fontFamily: "var(--font-dm-mono)", backgroundColor: "var(--code-bg)", color: "#15b8a7" }}
                      >
                        {cmd.name}
                      </code>
                      <p className="text-sm" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
                        {cmd.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full details link */}
        <div className="mt-6 text-center">
          <Link
            href="/docs/plugins"
            className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-lg border transition-all hover:border-[#15b8a7]/40 hover:text-[#15b8a7]"
            style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)", borderColor: "var(--border)" }}
          >
            View full plugin documentation
            <ArrowIcon />
          </Link>
        </div>

        {/* Install steps */}
        <div className="mt-10">
          <h3 className="text-base font-bold mb-4" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>
            How to Install
          </h3>
          <div className="space-y-3">
            {[
              "Download the .plugin file from any card above.",
              "Open Claude desktop → Settings → Plugins.",
              "Drag the file into the plugins panel.",
              "Set your environment variables and restart Claude.",
              "Test with a slash command (e.g. /my-tokens).",
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-3">
                <span
                  className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: "rgba(21,184,167,0.1)", color: "#15b8a7", fontFamily: "var(--font-dm-mono)" }}
                >
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
