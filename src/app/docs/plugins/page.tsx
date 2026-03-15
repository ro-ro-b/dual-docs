import Link from "next/link";

export const metadata = { title: "Claude Plugins — DUAL Docs" };

/* ── Plugin data ── */

interface PluginInfo {
  id: string;
  name: string;
  tagline: string;
  audience: string;
  description: string;
  downloadPath: string;
  fileSize: string;
  commands: { name: string; desc: string }[];
  skill: { name: string; desc: string; triggers: string[] };
  envVars: { name: string; required: boolean; desc: string }[];
  usageExamples: { prompt: string; response: string }[];
  links?: { label: string; href: string }[];
}

const plugins: PluginInfo[] = [
  {
    id: "token-manager",
    name: "DUAL Token Manager",
    tagline: "Manage your tokens through conversation",
    audience: "End Users",
    description:
      "View your token collection, transfer objects to other wallets, mint new tokens from templates, and explore the DUAL network — all through natural language. No API knowledge required.",
    downloadPath: "/downloads/dual-token-manager.plugin",
    fileSize: "20 KB",
    commands: [
      { name: "/my-tokens", desc: "View your complete object collection with metadata, grouped by template. Filter by status, template, or ownership." },
      { name: "/transfer", desc: "Transfer a token to another wallet. Includes ownership verification, confirmation dialog, and clear success/failure messaging." },
      { name: "/mint", desc: "Create new tokens from a template. Browse available templates, fill in required properties, and batch-create up to 100 objects at once." },
    ],
    skill: {
      name: "dual-token-guide",
      desc: "Comprehensive guide to DUAL concepts — objects, templates, properties, actions, faces, wallets, and organizations.",
      triggers: [
        "How do DUAL tokens work?",
        "What is a template?",
        "Explain objects and properties",
        "How do I transfer tokens?",
        "What can I do with my tokens?",
      ],
    },
    envVars: [
      { name: "DUAL_API_URL", required: true, desc: "Your DUAL network API endpoint" },
      { name: "DUAL_TOKEN", required: true, desc: "Authentication token for your wallet" },
    ],
    usageExamples: [
      {
        prompt: "Show me my tokens",
        response: "Fetches your objects grouped by template with name, properties, and status.",
      },
      {
        prompt: "Transfer my fire dragon to bob@wallet.address",
        response: "Shows confirmation dialog with object details, source, and destination. Waits for explicit 'confirm' before executing.",
      },
      {
        prompt: "Mint 10 legendary cards from the Collectible template",
        response: "Lists property requirements, lets you set values for all 10, then mints with a single confirmation.",
      },
    ],
  },
  {
    id: "developer-kit",
    name: "DUAL Developer Kit",
    tagline: "Build on DUAL faster",
    audience: "Developers",
    description:
      "API reference lookups, template scaffolding, and webhook code generation. Covers all 14 API categories with full parameter documentation, SDK patterns, and production-ready boilerplate.",
    downloadPath: "/downloads/dual-developer-kit.plugin",
    fileSize: "28 KB",
    commands: [
      { name: "/api-lookup", desc: "Search any DUAL API endpoint by natural language. Returns method, path, parameters, request/response schemas, and authentication requirements." },
      { name: "/scaffold-template", desc: "Generate boilerplate for creating a new DUAL template — cURL command, TypeScript SDK code, and JSON schema, with your custom properties baked in." },
      { name: "/generate-webhook", desc: "Create production-ready Express.js webhook handlers with signature verification, event routing, idempotency, and error handling." },
    ],
    skill: {
      name: "dual-api-guide",
      desc: "Complete API guide covering authentication methods, RESTful conventions, pagination, error handling, and all 14 API categories.",
      triggers: [
        "How does DUAL authentication work?",
        "What API endpoints are available?",
        "DUAL SDK patterns",
        "Webhook integration guide",
        "API rate limiting",
      ],
    },
    envVars: [
      { name: "DUAL_API_URL", required: true, desc: "Your DUAL network API endpoint" },
      { name: "DUAL_TOKEN", required: true, desc: "API key or JWT token" },
      { name: "DUAL_SIGNING_SECRET", required: false, desc: "Webhook signature verification secret" },
    ],
    usageExamples: [
      {
        prompt: "How do I create a template in DUAL?",
        response: "Returns POST /templates endpoint with required parameters, optional fields, example request/response, and auth requirements.",
      },
      {
        prompt: "Scaffold a collectible NFT template with rarity and artist properties",
        response: "Generates complete cURL command, TypeScript SDK code, and JSON schema with your custom properties pre-filled.",
      },
      {
        prompt: "Generate webhooks for object.created and object.transferred events",
        response: "Creates Express.js endpoint with signature verification, typed event handlers, monitoring, and error recovery.",
      },
    ],
    links: [
      { label: "Full API Reference", href: "/docs/developer-kit/api-reference" },
      { label: "TypeScript SDK", href: "/docs/developer-kit/sdk" },
      { label: "MCP Server", href: "/docs/developer-kit/mcp" },
    ],
  },
  {
    id: "ai-toolkit",
    name: "DUAL AI Toolkit",
    tagline: "Wire up AI to the DUAL platform",
    audience: "AI / ML Engineers",
    description:
      "Five production-ready patterns for integrating language models with DUAL — token classification, conversational assistants, webhook automation, semantic search, and safety guardrails. Includes scaffold commands, detailed reference guides, and links to companion GitHub repos.",
    downloadPath: "/downloads/dual-ai-toolkit.plugin",
    fileSize: "44 KB",
    commands: [
      { name: "/setup-classifier", desc: "Scaffold an AI token classification pipeline. Choose categories, LLM provider (OpenAI or Anthropic), and output format. Generates batch-capable classifier with structured output." },
      { name: "/setup-chatbot", desc: "Scaffold a tool-calling conversational assistant. Pick capabilities (query, transfer, search, wallet info) and generate a complete chatbot with safety confirmations." },
      { name: "/setup-guardrails", desc: "Generate AI safety middleware — permission tiers, rate limiting, human-in-the-loop approval queues, and audit logging." },
    ],
    skill: {
      name: "dual-ai-patterns",
      desc: "Master guide covering all five AI integration patterns with architecture, code examples, cost estimates, and best practices.",
      triggers: [
        "AI integration with DUAL",
        "Classify tokens with AI",
        "Build a token chatbot",
        "AI webhook handler",
        "Semantic search over tokens",
        "AI guardrails for token operations",
      ],
    },
    envVars: [
      { name: "DUAL_API_URL", required: true, desc: "Your DUAL network API endpoint" },
      { name: "DUAL_TOKEN", required: true, desc: "API key or JWT token" },
      { name: "OPENAI_API_KEY", required: false, desc: "For classification and embeddings" },
      { name: "ANTHROPIC_API_KEY", required: false, desc: "For chatbot and webhook AI" },
      { name: "PINECONE_API_KEY", required: false, desc: "For large-scale semantic search" },
    ],
    usageExamples: [
      {
        prompt: "/setup-classifier for rarity, type, and sentiment categories using OpenAI",
        response: "Generates a complete classification pipeline with batch processing, structured JSON output, and property write-back to DUAL.",
      },
      {
        prompt: "Build me a chatbot that can query and transfer tokens",
        response: "Scaffolds a Claude tool-calling assistant with DUAL API tools, conversation loop, and transfer confirmation flow.",
      },
      {
        prompt: "/setup-guardrails with approval required for transfers over 100 tokens",
        response: "Creates permission tiers, rate limiter, async approval queue with configurable thresholds, and audit dashboard endpoint.",
      },
    ],
    links: [
      { label: "AI Tutorials", href: "/docs/tutorials#ai-integrations" },
      { label: "dual-ai-classifier repo", href: "https://github.com/ro-ro-b/dual-ai-classifier" },
      { label: "dual-ai-chatbot repo", href: "https://github.com/ro-ro-b/dual-ai-chatbot" },
      { label: "dual-ai-webhooks repo", href: "https://github.com/ro-ro-b/dual-ai-webhooks" },
      { label: "dual-ai-semantic-search repo", href: "https://github.com/ro-ro-b/dual-ai-semantic-search" },
      { label: "dual-ai-guardrails repo", href: "https://github.com/ro-ro-b/dual-ai-guardrails" },
    ],
  },
];

/* ── Icons ── */

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function TerminalIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function KeyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  );
}

/* ── Audience badge colors ── */
const audienceColors: Record<string, string> = {
  "End Users": "bg-emerald-500/10 text-emerald-600",
  Developers: "bg-blue-500/10 text-blue-600",
  "AI / ML Engineers": "bg-purple-500/10 text-purple-600",
};

/* ── Page ── */

export default function PluginsPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      {/* Breadcrumb */}
      <nav
        className="flex items-center gap-2 text-sm mb-6"
        style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}
      >
        <Link href="/docs" className="hover:opacity-70 transition-colors">Docs</Link>
        <span>›</span>
        <span style={{ color: "var(--text-secondary)" }}>Claude Plugins</span>
      </nav>

      <h1
        className="text-3xl font-bold mb-3"
        style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}
      >
        Claude Plugins
      </h1>
      <p
        className="mb-6 leading-relaxed max-w-2xl"
        style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}
      >
        Install DUAL plugins into Claude to manage tokens, build integrations, and wire up AI — all
        through natural conversation. Each plugin bundles slash commands, knowledge skills, and an
        MCP server connection to the DUAL platform.
      </p>

      {/* Prerequisites banner */}
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
            Before You Start
          </span>
        </div>
        <p className="text-sm leading-relaxed mb-3" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
          All plugins require two environment variables. Set these in your shell profile before installing:
        </p>
        <div className="rounded-lg p-4 space-y-1" style={{ backgroundColor: "var(--code-bg)" }}>
          <code className="block text-sm" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--code-text)" }}>
            export DUAL_API_URL=&quot;https://your-dual-api-endpoint&quot;
          </code>
          <code className="block text-sm" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--code-text)" }}>
            export DUAL_TOKEN=&quot;your_authentication_token&quot;
          </code>
        </div>
        <p className="text-xs mt-3" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
          The API URL will be provided when the network launches.{" "}
          Get your token by authenticating with the{" "}
          <code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: "var(--code-bg)", fontFamily: "var(--font-dm-mono)", color: "var(--code-text)" }}>
            POST /wallets/login
          </code>{" "}
          endpoint.
        </p>
      </div>

      {/* How to install */}
      <div className="mb-12">
        <h2
          className="text-lg font-bold mb-4"
          style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}
        >
          How to Install a Plugin
        </h2>
        <div className="space-y-3">
          {[
            { step: "1", text: "Download the .plugin file using the button on any plugin card below." },
            { step: "2", text: "Open the Claude desktop app and go to Settings → Plugins." },
            { step: "3", text: "Drag the .plugin file into the plugins panel, or click \"Add Plugin\" and select the file." },
            { step: "4", text: "Set the required environment variables in your shell profile and restart Claude." },
            { step: "5", text: "Test by running one of the plugin's slash commands (e.g. /my-tokens)." },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-3">
              <span
                className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: "rgba(21,184,167,0.1)", color: "#15b8a7", fontFamily: "var(--font-dm-mono)" }}
              >
                {item.step}
              </span>
              <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Plugin cards */}
      <div className="space-y-10">
        {plugins.map((plugin) => (
          <div
            key={plugin.id}
            id={plugin.id}
            className="rounded-xl border overflow-hidden"
            style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
          >
            {/* Header */}
            <div className="p-6 border-b" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-1.5">
                    <h2
                      className="text-xl font-bold"
                      style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}
                    >
                      {plugin.name}
                    </h2>
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
                  style={{
                    fontFamily: "var(--font-satoshi)",
                    backgroundColor: "#15b8a7",
                    color: "#fff",
                  }}
                >
                  <DownloadIcon />
                  Download
                  <span className="text-xs opacity-70">({plugin.fileSize})</span>
                </a>
              </div>
              <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
                {plugin.description}
              </p>
            </div>

            {/* Commands */}
            <div className="p-6 border-b" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="text-[#15b8a7]"><TerminalIcon /></div>
                <h3 className="text-sm font-semibold" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-primary)" }}>
                  Commands
                </h3>
              </div>
              <div className="space-y-3">
                {plugin.commands.map((cmd) => (
                  <div key={cmd.name} className="flex items-start gap-3">
                    <code
                      className="shrink-0 text-xs font-bold px-2 py-1 rounded"
                      style={{
                        fontFamily: "var(--font-dm-mono)",
                        backgroundColor: "var(--code-bg)",
                        color: "#15b8a7",
                      }}
                    >
                      {cmd.name}
                    </code>
                    <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
                      {cmd.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill */}
            <div className="p-6 border-b" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="text-[#15b8a7]"><BookIcon /></div>
                <h3 className="text-sm font-semibold" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-primary)" }}>
                  Knowledge Skill
                </h3>
              </div>
              <p className="text-sm leading-relaxed mb-3" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
                <strong style={{ color: "var(--text-primary)" }}>{plugin.skill.name}</strong> — {plugin.skill.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {plugin.skill.triggers.map((trigger) => (
                  <span
                    key={trigger}
                    className="text-xs px-2.5 py-1 rounded-full border"
                    style={{
                      fontFamily: "var(--font-satoshi)",
                      color: "var(--text-muted)",
                      borderColor: "var(--border)",
                      backgroundColor: "var(--background)",
                    }}
                  >
                    &ldquo;{trigger}&rdquo;
                  </span>
                ))}
              </div>
            </div>

            {/* Usage Examples */}
            <div className="p-6 border-b" style={{ borderColor: "var(--border)" }}>
              <h3 className="text-sm font-semibold mb-4" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-primary)" }}>
                Usage Examples
              </h3>
              <div className="space-y-4">
                {plugin.usageExamples.map((ex, i) => (
                  <div key={i} className="rounded-lg p-4" style={{ backgroundColor: "var(--code-bg)" }}>
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-[#15b8a7]/10 text-[#15b8a7]" style={{ fontFamily: "var(--font-dm-mono)" }}>
                        You
                      </span>
                      <p className="text-sm font-medium" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-primary)" }}>
                        {ex.prompt}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{ fontFamily: "var(--font-dm-mono)", backgroundColor: "rgba(21,184,167,0.15)", color: "#15b8a7" }}>
                        Claude
                      </span>
                      <p className="text-sm" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
                        {ex.response}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Environment Variables */}
            <div className="p-6 border-b" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="text-[#15b8a7]"><KeyIcon /></div>
                <h3 className="text-sm font-semibold" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-primary)" }}>
                  Environment Variables
                </h3>
              </div>
              <div className="space-y-2">
                {plugin.envVars.map((v) => (
                  <div key={v.name} className="flex items-start gap-3">
                    <code
                      className="shrink-0 text-xs px-2 py-1 rounded"
                      style={{ fontFamily: "var(--font-dm-mono)", backgroundColor: "var(--code-bg)", color: "var(--code-text)" }}
                    >
                      {v.name}
                    </code>
                    <span
                      className={`shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded ${v.required ? "bg-red-500/10 text-red-500" : "bg-gray-500/10 text-gray-500"}`}
                      style={{ fontFamily: "var(--font-dm-mono)" }}
                    >
                      {v.required ? "required" : "optional"}
                    </span>
                    <p className="text-sm" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
                      {v.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Links */}
            {plugin.links && plugin.links.length > 0 && (
              <div className="p-6">
                <h3 className="text-sm font-semibold mb-3" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-primary)" }}>
                  Related Resources
                </h3>
                <div className="flex flex-wrap gap-2">
                  {plugin.links.map((link) => {
                    const isExternal = link.href.startsWith("http");
                    const Comp = isExternal ? "a" : Link;
                    const extraProps = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};
                    return (
                      <Comp
                        key={link.href}
                        href={link.href}
                        className="text-xs font-medium px-3 py-1.5 rounded-full border transition-all hover:border-[#15b8a7]/40 hover:text-[#15b8a7]"
                        style={{
                          fontFamily: "var(--font-satoshi)",
                          color: "var(--text-muted)",
                          borderColor: "var(--border)",
                        }}
                        {...extraProps}
                      >
                        {link.label}
                        {isExternal && (
                          <svg className="inline ml-1 -mt-0.5" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                          </svg>
                        )}
                      </Comp>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* MCP Server note */}
      <div
        className="mt-12 p-6 rounded-xl border"
        style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
      >
        <h3 className="text-base font-bold mb-2" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>
          About the MCP Server
        </h3>
        <p className="text-sm leading-relaxed mb-3" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
          All three plugins connect to the DUAL platform through an MCP (Model Context Protocol) server. This runs locally on
          your machine — your API credentials never leave your computer. The server provides Claude with direct access to the
          DUAL API so it can fetch tokens, execute actions, and manage resources on your behalf.
        </p>
        <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
          For more details, see the{" "}
          <Link href="/docs/developer-kit/mcp" className="text-[#15b8a7] hover:underline">MCP Server documentation</Link>{" "}
          and{" "}
          <Link href="/docs/developer-kit/mcp-guide" className="text-[#15b8a7] hover:underline">Setup Guide</Link>.
        </p>
      </div>

      {/* Troubleshooting */}
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>
          Troubleshooting
        </h2>
        <div className="space-y-4">
          {[
            { q: "\"Cannot connect to DUAL_API_URL\"", a: "Check that DUAL_API_URL is set and the URL is accessible. Test with: curl $DUAL_API_URL/healthz" },
            { q: "\"Invalid token\" or \"Unauthorized\"", a: "Verify DUAL_TOKEN is set and hasn't expired. Regenerate by calling POST /wallets/login." },
            { q: "\"MCP server failed to start\"", a: "Ensure Node.js is installed (node --version) and the MCP package is available in the plugin directory." },
            { q: "Plugin not showing in Claude", a: "Restart Claude after installing. Check that the .plugin file was accepted in Settings → Plugins." },
          ].map((item) => (
            <div key={item.q} className="rounded-lg p-4 border" style={{ borderColor: "var(--border)" }}>
              <p className="text-sm font-semibold mb-1" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-primary)" }}>
                {item.q}
              </p>
              <p className="text-sm" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
