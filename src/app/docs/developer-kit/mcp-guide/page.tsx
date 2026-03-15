import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata = { title: "MCP Setup Guide — DUAL Docs" };

interface StepProps {
  number: number;
  title: string;
  children: React.ReactNode;
}

function Step({ number, title, children }: StepProps) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-3">
        <span className="shrink-0 w-8 h-8 rounded-full bg-[#15b8a7] text-white flex items-center justify-center text-sm font-bold">
          {number}
        </span>
        <h3
          className="text-lg font-bold"
          style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}
        >
          {title}
        </h3>
      </div>
      <div className="ml-11">{children}</div>
    </div>
  );
}

function CodeBlock({ children, title }: { children: string; title?: string }) {
  return (
    <div className="mb-4">
      {title && (
        <div
          className="text-[10px] font-bold tracking-wider px-4 py-1.5 rounded-t-lg border border-b-0"
          style={{ backgroundColor: "rgba(21,184,167,0.08)", borderColor: "var(--border)", fontFamily: "var(--font-dm-mono)", color: "var(--text-muted)" }}
        >
          {title}
        </div>
      )}
      <div className={`rounded-${title ? "b" : ""}lg p-4 overflow-x-auto`} style={{ backgroundColor: "var(--code-bg)" }}>
        <pre className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--code-text)" }}>
          {children}
        </pre>
      </div>
    </div>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex gap-3 p-4 rounded-xl border-l-2 mb-4"
      style={{ backgroundColor: "rgba(21,184,167,0.06)", borderColor: "#15b8a7" }}
    >
      <span className="shrink-0 text-[#15b8a7]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4m0-4h.01" />
        </svg>
      </span>
      <div className="text-sm" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
        {children}
      </div>
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-xl font-bold mb-4 mt-12 pb-2 border-b"
      style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)", borderColor: "var(--border)" }}
    >
      {children}
    </h2>
  );
}

export default function McpGuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <Breadcrumb items={[{ label: "Docs", href: "/docs" }, { label: "AI Tools", href: "/docs/ai-tools" }, { label: "MCP Server", href: "/docs/developer-kit/mcp" }, { label: "Setup Guide" }]} />

      <h1
        className="text-3xl font-bold mb-3"
        style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}
      >
        MCP Server Setup Guide
      </h1>
      <P>
        A step-by-step guide to installing, configuring, and using the DUAL MCP Server with your AI assistant. By the end of this guide, you&apos;ll have an AI agent that can mint tokens, manage templates, execute actions, and interact with the full DUAL platform through natural language.
      </P>

      {/* Prerequisites */}
      <SectionHeading>Prerequisites</SectionHeading>
      <div
        className="p-5 rounded-xl border mb-6"
        style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { label: "Node.js 18+", desc: "Required runtime" },
            { label: "npm or yarn", desc: "Package manager" },
            { label: "DUAL account", desc: "For API access" },
            { label: "MCP client", desc: "Claude Desktop, Cursor, or any MCP-compatible tool" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="shrink-0 w-5 h-5 rounded bg-[#15b8a7]/10 text-[#15b8a7] flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <div>
                <span className="text-sm font-medium" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-primary)" }}>{item.label}</span>
                <span className="text-xs ml-2" style={{ color: "var(--text-muted)" }}>— {item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Installation */}
      <SectionHeading>Installation</SectionHeading>

      <Step number={1} title="Clone the Repository">
        <CodeBlock>{`git clone https://github.com/ro-ro-b/dual-mcp-server.git
cd dual-mcp-server`}</CodeBlock>
      </Step>

      <Step number={2} title="Install Dependencies">
        <CodeBlock>{`npm install`}</CodeBlock>
        <P>This installs the MCP SDK, Zod for input validation, Axios for HTTP requests, and TypeScript tooling.</P>
      </Step>

      <Step number={3} title="Build the Server">
        <CodeBlock>{`npm run build`}</CodeBlock>
        <P>Compiles TypeScript to JavaScript in the <code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: "var(--code-bg)", fontFamily: "var(--font-dm-mono)", color: "var(--code-text)" }}>dist/</code> directory. The entry point is <code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: "var(--code-bg)", fontFamily: "var(--font-dm-mono)", color: "var(--code-text)" }}>dist/index.js</code>.</P>
      </Step>

      {/* Authentication */}
      <SectionHeading>Authentication</SectionHeading>
      <P>
        The MCP server needs credentials to interact with the DUAL API. You have three options — choose the one that fits your workflow.
      </P>

      <Step number={4} title="Option A: API Key (Recommended)">
        <P>Best for server-to-server integrations. Create an API key in the DUAL dashboard, then set the environment variable:</P>
        <CodeBlock title="ENVIRONMENT VARIABLE">{`export DUAL_API_KEY=your-api-key-here`}</CodeBlock>
        <Tip>API keys persist across sessions and don&apos;t expire like JWT tokens. This is the recommended approach for production use.</Tip>
      </Step>

      <Step number={5} title="Option B: JWT Access Token">
        <P>If you already have a JWT token from a login flow:</P>
        <CodeBlock title="ENVIRONMENT VARIABLE">{`export DUAL_ACCESS_TOKEN=your-jwt-token
export DUAL_REFRESH_TOKEN=your-refresh-token  # optional`}</CodeBlock>
        <P>JWT tokens expire, so you may need to use <code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: "var(--code-bg)", fontFamily: "var(--font-dm-mono)", color: "var(--code-text)" }}>dual_refresh_token</code> periodically.</P>
      </Step>

      <Step number={6} title="Option C: Interactive Login">
        <P>No pre-configured credentials? The AI agent can log in interactively using the <code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: "var(--code-bg)", fontFamily: "var(--font-dm-mono)", color: "var(--code-text)" }}>dual_login</code> tool. Just tell the agent &ldquo;log in to DUAL&rdquo; and provide your email and password when prompted.</P>
        <Tip>Interactive login sets the auth token for the current session only. It won&apos;t persist after the server restarts.</Tip>
      </Step>

      {/* Client Configuration */}
      <SectionHeading>Client Configuration</SectionHeading>

      <Step number={7} title="Claude Desktop">
        <P>Add the following to your Claude Desktop configuration file:</P>
        <div className="text-xs mb-2" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
          <strong>macOS:</strong> <code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: "var(--code-bg)", fontFamily: "var(--font-dm-mono)", color: "var(--code-text)" }}>~/Library/Application Support/Claude/claude_desktop_config.json</code>
        </div>
        <div className="text-xs mb-3" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
          <strong>Windows:</strong> <code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: "var(--code-bg)", fontFamily: "var(--font-dm-mono)", color: "var(--code-text)" }}>%APPDATA%\Claude\claude_desktop_config.json</code>
        </div>
        <CodeBlock title="claude_desktop_config.json">{`{
  "mcpServers": {
    "dual": {
      "command": "node",
      "args": ["/absolute/path/to/dual-mcp-server/dist/index.js"],
      "env": {
        "DUAL_API_KEY": "your-api-key"
      }
    }
  }
}`}</CodeBlock>
        <P>Restart Claude Desktop after saving. You should see DUAL tools available in the tool picker.</P>
      </Step>

      <Step number={8} title="Cursor">
        <P>Add to your Cursor MCP settings (<code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: "var(--code-bg)", fontFamily: "var(--font-dm-mono)", color: "var(--code-text)" }}>.cursor/mcp.json</code> in your project or global config):</P>
        <CodeBlock title=".cursor/mcp.json">{`{
  "mcpServers": {
    "dual": {
      "command": "node",
      "args": ["./dual-mcp-server/dist/index.js"],
      "env": {
        "DUAL_API_KEY": "your-api-key"
      }
    }
  }
}`}</CodeBlock>
      </Step>

      <Step number={9} title="Claude Code (CLI)">
        <P>Add via the Claude Code CLI:</P>
        <CodeBlock>{`claude mcp add dual node /path/to/dual-mcp-server/dist/index.js`}</CodeBlock>
        <P>Then set the API key in your shell environment before running Claude Code.</P>
      </Step>

      <Step number={10} title="HTTP Transport (Remote)">
        <P>For remote deployment or multi-client scenarios, run the server in HTTP mode:</P>
        <CodeBlock>{`TRANSPORT=http PORT=3100 DUAL_API_KEY=your-key node dist/index.js`}</CodeBlock>
        <P>The MCP endpoint is available at <code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: "var(--code-bg)", fontFamily: "var(--font-dm-mono)", color: "var(--code-text)" }}>http://localhost:3100/mcp</code> and a health check at <code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: "var(--code-bg)", fontFamily: "var(--font-dm-mono)", color: "var(--code-text)" }}>/health</code>.</P>
      </Step>

      {/* Usage Examples */}
      <SectionHeading>Usage Examples</SectionHeading>
      <P>Once configured, you can interact with the DUAL platform through natural language. Here are real-world examples of what your AI agent can do.</P>

      {/* Example 1 */}
      <div
        className="mb-6 p-5 rounded-xl border"
        style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
      >
        <h4 className="text-sm font-bold mb-3" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>
          Create a Reward Token
        </h4>
        <div
          className="p-3 rounded-lg border-l-2 mb-4"
          style={{ backgroundColor: "rgba(21,184,167,0.04)", borderColor: "#15b8a7" }}
        >
          <p className="text-sm italic" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
            &ldquo;Create a redeemable reward token called BrandPoints with a 1 million supply. Add an expiry property that defaults to 12 months from mint date.&rdquo;
          </p>
        </div>
        <div className="space-y-2">
          {[
            { tool: "dual_create_template", what: "Creates the BrandPoints template with points, expiry_date, and redeemable properties" },
            { tool: "dual_create_action_type", what: "Registers 'Redeem' and 'Expire' actions with payload schemas" },
            { tool: "dual_create_face", what: "Attaches a visual representation to the template" },
            { tool: "dual_execute_action", what: "Mints the initial supply of 1M tokens" },
          ].map((s, i) => (
            <div key={s.tool} className="flex items-start gap-2 text-xs">
              <span className="shrink-0 w-5 h-5 rounded-full bg-[#15b8a7]/10 text-[#15b8a7] flex items-center justify-center text-[10px] font-bold mt-0.5">{i + 1}</span>
              <div>
                <code className="px-1 py-0.5 rounded" style={{ backgroundColor: "rgba(21,184,167,0.1)", fontFamily: "var(--font-dm-mono)", color: "var(--text-muted)" }}>{s.tool}</code>
                <span className="ml-1.5" style={{ color: "var(--text-muted)", fontFamily: "var(--font-satoshi)" }}> — {s.what}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Example 2 */}
      <div
        className="mb-6 p-5 rounded-xl border"
        style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
      >
        <h4 className="text-sm font-bold mb-3" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>
          Monitor Platform Activity
        </h4>
        <div
          className="p-3 rounded-lg border-l-2 mb-4"
          style={{ backgroundColor: "rgba(21,184,167,0.04)", borderColor: "#15b8a7" }}
        >
          <p className="text-sm italic" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
            &ldquo;How many objects are on the platform? Show me the latest sequencer batch and any recent checkpoints.&rdquo;
          </p>
        </div>
        <div className="space-y-2">
          {[
            { tool: "dual_public_get_stats", what: "Fetches total objects, templates, and wallets" },
            { tool: "dual_list_batches", what: "Gets the latest sequencer batch with transactions" },
            { tool: "dual_list_checkpoints", what: "Shows recent ZK-rollup checkpoints with state roots" },
          ].map((s, i) => (
            <div key={s.tool} className="flex items-start gap-2 text-xs">
              <span className="shrink-0 w-5 h-5 rounded-full bg-[#15b8a7]/10 text-[#15b8a7] flex items-center justify-center text-[10px] font-bold mt-0.5">{i + 1}</span>
              <div>
                <code className="px-1 py-0.5 rounded" style={{ backgroundColor: "rgba(21,184,167,0.1)", fontFamily: "var(--font-dm-mono)", color: "var(--text-muted)" }}>{s.tool}</code>
                <span className="ml-1.5" style={{ color: "var(--text-muted)", fontFamily: "var(--font-satoshi)" }}> — {s.what}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Example 3 */}
      <div
        className="mb-6 p-5 rounded-xl border"
        style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
      >
        <h4 className="text-sm font-bold mb-3" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>
          Set Up Webhooks for Real-Time Events
        </h4>
        <div
          className="p-3 rounded-lg border-l-2 mb-4"
          style={{ backgroundColor: "rgba(21,184,167,0.04)", borderColor: "#15b8a7" }}
        >
          <p className="text-sm italic" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
            &ldquo;Set up a webhook to notify my server whenever a token is transferred. Send test payloads to make sure it works.&rdquo;
          </p>
        </div>
        <div className="space-y-2">
          {[
            { tool: "dual_create_webhook", what: "Registers an HTTPS endpoint for transfer events" },
            { tool: "dual_test_webhook", what: "Sends a test payload to verify the endpoint responds" },
            { tool: "dual_list_webhooks", what: "Confirms the webhook is active and correctly scoped" },
          ].map((s, i) => (
            <div key={s.tool} className="flex items-start gap-2 text-xs">
              <span className="shrink-0 w-5 h-5 rounded-full bg-[#15b8a7]/10 text-[#15b8a7] flex items-center justify-center text-[10px] font-bold mt-0.5">{i + 1}</span>
              <div>
                <code className="px-1 py-0.5 rounded" style={{ backgroundColor: "rgba(21,184,167,0.1)", fontFamily: "var(--font-dm-mono)", color: "var(--text-muted)" }}>{s.tool}</code>
                <span className="ml-1.5" style={{ color: "var(--text-muted)", fontFamily: "var(--font-satoshi)" }}> — {s.what}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Example 4 */}
      <div
        className="mb-6 p-5 rounded-xl border"
        style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
      >
        <h4 className="text-sm font-bold mb-3" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>
          Manage Organizations and Members
        </h4>
        <div
          className="p-3 rounded-lg border-l-2 mb-4"
          style={{ backgroundColor: "rgba(21,184,167,0.04)", borderColor: "#15b8a7" }}
        >
          <p className="text-sm italic" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
            &ldquo;Create an organization called Acme Corp, set up an admin role and a viewer role, then add my team member.&rdquo;
          </p>
        </div>
        <div className="space-y-2">
          {[
            { tool: "dual_create_organization", what: "Creates the Acme Corp workspace" },
            { tool: "dual_create_org_role", what: "Creates 'Admin' role with full permissions" },
            { tool: "dual_create_org_role", what: "Creates 'Viewer' role with read-only permissions" },
            { tool: "dual_add_org_member", what: "Adds the team member with the appropriate role" },
          ].map((s, i) => (
            <div key={s.tool + i} className="flex items-start gap-2 text-xs">
              <span className="shrink-0 w-5 h-5 rounded-full bg-[#15b8a7]/10 text-[#15b8a7] flex items-center justify-center text-[10px] font-bold mt-0.5">{i + 1}</span>
              <div>
                <code className="px-1 py-0.5 rounded" style={{ backgroundColor: "rgba(21,184,167,0.1)", fontFamily: "var(--font-dm-mono)", color: "var(--text-muted)" }}>{s.tool}</code>
                <span className="ml-1.5" style={{ color: "var(--text-muted)", fontFamily: "var(--font-satoshi)" }}> — {s.what}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Example 5 */}
      <div
        className="mb-10 p-5 rounded-xl border"
        style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
      >
        <h4 className="text-sm font-bold mb-3" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>
          Batch Operations (Atomic)
        </h4>
        <div
          className="p-3 rounded-lg border-l-2 mb-4"
          style={{ backgroundColor: "rgba(21,184,167,0.04)", borderColor: "#15b8a7" }}
        >
          <p className="text-sm italic" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
            &ldquo;Transfer 100 tokens to three different wallets and update the status to distributed — all in one atomic batch.&rdquo;
          </p>
        </div>
        <div className="space-y-2">
          {[
            { tool: "dual_batch_actions", what: "Executes all 4 actions atomically — 3 transfers + 1 status update. If any fails, all roll back." },
          ].map((s, i) => (
            <div key={s.tool} className="flex items-start gap-2 text-xs">
              <span className="shrink-0 w-5 h-5 rounded-full bg-[#15b8a7]/10 text-[#15b8a7] flex items-center justify-center text-[10px] font-bold mt-0.5">{i + 1}</span>
              <div>
                <code className="px-1 py-0.5 rounded" style={{ backgroundColor: "rgba(21,184,167,0.1)", fontFamily: "var(--font-dm-mono)", color: "var(--text-muted)" }}>{s.tool}</code>
                <span className="ml-1.5" style={{ color: "var(--text-muted)", fontFamily: "var(--font-satoshi)" }}> — {s.what}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Environment Variables */}
      <SectionHeading>Environment Variables Reference</SectionHeading>
      <div className="rounded-xl border overflow-hidden mb-10" style={{ borderColor: "var(--border)" }}>
        <table className="w-full text-sm" style={{ fontFamily: "var(--font-satoshi)" }}>
          <thead>
            <tr style={{ backgroundColor: "rgba(21,184,167,0.06)" }}>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "var(--text-primary)" }}>Variable</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "var(--text-primary)" }}>Description</th>
              <th className="text-center px-4 py-3 font-semibold" style={{ color: "var(--text-primary)" }}>Required</th>
            </tr>
          </thead>
          <tbody>
            {[
              { var: "DUAL_API_KEY", desc: "API key for authentication", req: "One of these" },
              { var: "DUAL_ACCESS_TOKEN", desc: "JWT access token", req: "One of these" },
              { var: "DUAL_REFRESH_TOKEN", desc: "JWT refresh token", req: "No" },
              { var: "DUAL_API_URL", desc: "API base URL (default: https://api.blockv-labs.io/v3)", req: "No" },
              { var: "TRANSPORT", desc: "stdio (default) or http", req: "No" },
              { var: "PORT", desc: "HTTP port (default: 3100)", req: "No" },
            ].map((row, i) => (
              <tr
                key={row.var}
                className="border-t"
                style={{ borderColor: "var(--border)", backgroundColor: i % 2 === 0 ? "var(--surface)" : "transparent" }}
              >
                <td className="px-4 py-2.5">
                  <code className="text-xs" style={{ fontFamily: "var(--font-dm-mono)", color: "#15b8a7" }}>{row.var}</code>
                </td>
                <td className="px-4 py-2.5" style={{ color: "var(--text-muted)" }}>{row.desc}</td>
                <td className="px-4 py-2.5 text-center text-xs" style={{ color: "var(--text-muted)" }}>{row.req}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Troubleshooting */}
      <SectionHeading>Troubleshooting</SectionHeading>

      {[
        {
          q: "\"Error: Authentication required\"",
          a: "No credentials configured. Set DUAL_API_KEY or DUAL_ACCESS_TOKEN environment variable, or use the dual_login tool to authenticate interactively.",
        },
        {
          q: "\"Error: Cannot reach DUAL API\"",
          a: "Check your network connection and verify DUAL_API_URL is correct. The default URL is https://api.blockv-labs.io/v3.",
        },
        {
          q: "Tools not showing in Claude Desktop",
          a: "Make sure the path in claude_desktop_config.json is absolute (not relative). Restart Claude Desktop after editing the config.",
        },
        {
          q: "\"Error: Rate limit exceeded\"",
          a: "You're making too many requests. Wait a moment and try again. For high-volume operations, use dual_batch_actions to group multiple actions.",
        },
        {
          q: "JWT token expired",
          a: "Use dual_refresh_token with your refresh token, or set up an API key which doesn't expire.",
        },
      ].map((item) => (
        <div
          key={item.q}
          className="mb-4 p-4 rounded-xl border"
          style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
        >
          <p className="text-sm font-medium mb-1" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--text-primary)" }}>
            {item.q}
          </p>
          <p className="text-sm" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
            {item.a}
          </p>
        </div>
      ))}

      {/* Next Steps */}
      <SectionHeading>Next Steps</SectionHeading>
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { title: "MCP Server Reference", href: "/docs/developer-kit/mcp", desc: "Full tool list and API module reference" },
          { title: "TypeScript SDK", href: "/docs/developer-kit/sdk", desc: "Use the SDK directly for custom integrations" },
          { title: "API Reference", href: "/docs/developer-kit/api-reference", desc: "OpenAPI 3.1 spec with 70 paths" },
          { title: "Learn DUAL", href: "/docs/learn", desc: "AI-generated learning resources via Google NotebookLM" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-center gap-3 p-4 rounded-xl border transition-all hover:shadow-md"
            style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
          >
            <div className="flex-1">
              <span className="text-sm font-semibold block" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-primary)" }}>
                {link.title}
              </span>
              <span className="text-xs" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
                {link.desc}
              </span>
            </div>
            <div className="shrink-0 transition-transform group-hover:translate-x-1" style={{ color: "var(--text-muted)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
