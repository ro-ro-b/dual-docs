"use client";

import Link from "next/link";
import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";

const installCode = `npm install -g @dual/cli`;

const loginExample = `# Login with email/password
dual login user@example.com mypassword

# Check authentication status
dual whoami`;

const walletsExample = `# Get current wallet profile
dual wallets me

# Get wallet by ID
dual wallets get wal_abc123

# List recent wallets
dual wallets list --limit 5`;

const templatesExample = `# List all templates
dual templates list

# Get template details
dual templates get tmpl_abc123

# Search templates
dual templates search "loyalty"`;

const objectsExample = `# List objects
dual objects list --limit 10

# Get object by ID
dual objects get obj_abc123

# Search objects by template
dual objects list --template tmpl_abc123`;

const rawExample = `# Make a raw API call
dual raw GET /storage/files
dual raw POST /ebus/actions '{"type":"transfer","objectId":"obj_123"}'`;

const commands = [
  { cmd: "login", args: "<email> <password>", desc: "Authenticate and store JWT token" },
  { cmd: "refresh", args: "", desc: "Refresh the stored access token" },
  { cmd: "whoami", args: "", desc: "Display current authenticated user" },
  { cmd: "wallets", args: "<action> [id]", desc: "Wallet operations (me, get, list)" },
  { cmd: "templates", args: "<action> [id]", desc: "Template operations (list, get, search)" },
  { cmd: "objects", args: "<action> [id]", desc: "Object operations (list, get, search)" },
  { cmd: "actions", args: "<action> [data]", desc: "Event Bus action execution" },
  { cmd: "orgs", args: "<action> [id]", desc: "Organization management" },
  { cmd: "webhooks", args: "<action> [id]", desc: "Webhook management" },
  { cmd: "raw", args: "<method> <path> [body]", desc: "Make any raw API call" },
  { cmd: "help", args: "", desc: "Show available commands" },
];

function CodeBlock({ code, title }: { code: string; title?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="rounded-lg overflow-hidden border" style={{ borderColor: "var(--border)" }}>
      {title && (
        <div className="px-4 py-2 border-b text-xs font-medium" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
          {title}
        </div>
      )}
      <div className="relative">
        <pre className="p-4 overflow-x-auto text-sm leading-relaxed" style={{ backgroundColor: "var(--code-bg)", color: "var(--code-text)", fontFamily: "var(--font-dm-mono)" }}>
          {code}
        </pre>
        <button
          onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="absolute top-3 right-3 px-2 py-1 rounded text-xs border transition-colors cursor-pointer"
          style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text-muted)" }}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}

export default function CLIPage() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-12">
      <Breadcrumb items={[{ label: "Docs", href: "/docs" }, { label: "Developer Kit", href: "/docs/developer-kit" }, { label: "CLI Tool" }]} />

      <div className="flex items-center gap-3 mb-3">
        <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>
          CLI Tool
        </h1>
        <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#15b8a7]/10 text-[#15b8a7]" style={{ fontFamily: "var(--font-dm-mono)" }}>
          v1.0.0
        </span>
      </div>
      <p className="mb-8 leading-relaxed max-w-xl" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
        Zero-dependency command-line interface for the DUAL Platform API. Perfect for quick testing, scripting, and CI/CD integration.
      </p>

      {/* Install */}
      <h2 className="text-lg font-bold mb-3" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>Installation</h2>
      <CodeBlock code={installCode} />

      {/* Auth */}
      <h2 className="text-lg font-bold mt-8 mb-3" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>Authentication</h2>
      <p className="text-sm mb-4 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
        Tokens are stored in <code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: "var(--code-bg)", fontFamily: "var(--font-dm-mono)", color: "var(--code-text)" }}>~/.dual-cli.json</code> and automatically attached to all subsequent requests.
      </p>
      <CodeBlock code={loginExample} title="Terminal" />

      {/* Commands Reference */}
      <h2 className="text-lg font-bold mt-8 mb-3" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>Commands</h2>
      <div className="border rounded-lg overflow-hidden" style={{ borderColor: "var(--border)" }}>
        <table className="w-full text-sm" style={{ fontFamily: "var(--font-satoshi)" }}>
          <thead>
            <tr style={{ backgroundColor: "var(--surface)" }}>
              <th className="text-left px-4 py-2.5 font-semibold border-b" style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>Command</th>
              <th className="text-left px-4 py-2.5 font-semibold border-b" style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>Arguments</th>
              <th className="text-left px-4 py-2.5 font-semibold border-b" style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {commands.map((c, i) => (
              <tr key={c.cmd} style={{ backgroundColor: i % 2 === 1 ? "var(--surface)" : "transparent" }}>
                <td className="px-4 py-2 border-b" style={{ borderColor: "var(--border)" }}>
                  <code className="text-xs font-medium text-[#15b8a7]" style={{ fontFamily: "var(--font-dm-mono)" }}>
                    dual {c.cmd}
                  </code>
                </td>
                <td className="px-4 py-2 border-b" style={{ borderColor: "var(--border)" }}>
                  <code className="text-xs" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--text-muted)" }}>
                    {c.args || "—"}
                  </code>
                </td>
                <td className="px-4 py-2 border-b" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>{c.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Examples */}
      <h2 className="text-lg font-bold mt-8 mb-3" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>Examples</h2>

      <h3 className="text-sm font-semibold mt-6 mb-2" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-primary)" }}>Wallets</h3>
      <CodeBlock code={walletsExample} title="Terminal" />

      <h3 className="text-sm font-semibold mt-6 mb-2" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-primary)" }}>Templates</h3>
      <CodeBlock code={templatesExample} title="Terminal" />

      <h3 className="text-sm font-semibold mt-6 mb-2" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-primary)" }}>Objects</h3>
      <CodeBlock code={objectsExample} title="Terminal" />

      <h3 className="text-sm font-semibold mt-6 mb-2" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-primary)" }}>Raw API Calls</h3>
      <CodeBlock code={rawExample} title="Terminal" />

      {/* Source */}
      <div className="mt-8 p-4 rounded-lg border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
        <p className="text-sm" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
          View the source on{" "}
          <a href="https://github.com/ro-ro-b/dual-sdk" target="_blank" rel="noopener noreferrer" className="text-[#15b8a7] hover:underline">
            GitHub
          </a>
          {" "}· 327 lines · Zero dependencies · Node.js 18+
        </p>
      </div>
    </div>
  );
}
