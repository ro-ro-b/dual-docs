"use client";

import Link from "next/link";
import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";

const installCode = `npm install @dual/sdk`;

const quickStart = `import { DualClient } from '@dual/sdk';

const client = new DualClient({
  token: 'your-jwt-token',
  baseUrl: 'https://blockv-labs.io'
});

// Get current wallet
const wallet = await client.wallets.getCurrentWallet();

// List templates with pagination
const templates = await client.templates.listTemplates({ limit: 20 });

// Create an object from a template
const obj = await client.objects.createObject({
  templateId: 'tmpl_abc123',
  metadata: { name: 'My First Object' }
});`;

const errorHandling = `import { DualClient, DualError } from '@dual/sdk';

const client = new DualClient({ token: 'your-jwt' });

try {
  const wallet = await client.wallets.getCurrentWallet();
} catch (err) {
  if (err instanceof DualError) {
    console.error(\`API Error [\${err.status}]: \${err.code}\`);
    console.error('Details:', err.body);
  }
}`;

const retryConfig = `const client = new DualClient({
  token: 'your-jwt',
  timeout: 10000,        // 10 second timeout
  retry: {
    maxAttempts: 3,       // retry up to 3 times
    backoffMs: 1000       // 1 second backoff between retries
  }
});`;

const modules = [
  { name: "wallets", methods: "10 methods", desc: "Login, registration, profile, token refresh" },
  { name: "templates", methods: "7 methods", desc: "CRUD operations, search, variations" },
  { name: "objects", methods: "9 methods", desc: "Create, list, transfer, state management" },
  { name: "payments", methods: "6 methods", desc: "Payment intents, subscription, refunds" },
  { name: "organizations", methods: "10 methods", desc: "Org management, members, invitations" },
  { name: "storage", methods: "6 methods", desc: "File upload, download, presigned URLs" },
  { name: "webhooks", methods: "7 methods", desc: "CRUD, delivery logs, test endpoint" },
  { name: "notifications", methods: "5 methods", desc: "Push tokens, send, preferences" },
  { name: "eventBus", methods: "8 methods", desc: "Actions, event types, subscriptions" },
  { name: "faces", methods: "5 methods", desc: "Face registration, rendering" },
  { name: "sequencer", methods: "5 methods", desc: "Batch submission, checkpoints" },
  { name: "indexer", methods: "5 methods", desc: "Public API, stats, search" },
  { name: "apiKeys", methods: "5 methods", desc: "Create, rotate, revoke keys" },
  { name: "support", methods: "4 methods", desc: "Ticket management" },
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

export default function SDKPage() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-12">
      <Breadcrumb items={[{ label: "Docs", href: "/docs" }, { label: "Developer Kit", href: "/docs/developer-kit" }, { label: "TypeScript SDK" }]} />

      <div className="flex items-center gap-3 mb-3">
        <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>
          TypeScript SDK
        </h1>
        <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#15b8a7]/10 text-[#15b8a7]" style={{ fontFamily: "var(--font-dm-mono)" }}>
          v3.0.0
        </span>
      </div>
      <p className="mb-8 leading-relaxed max-w-xl" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
        Fully-typed TypeScript client library with 102 methods covering every DUAL API endpoint. Includes automatic retry, error handling, and a modular architecture.
      </p>

      {/* Install */}
      <h2 className="text-lg font-bold mb-3" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>Installation</h2>
      <CodeBlock code={installCode} />

      {/* Quick Start */}
      <h2 className="text-lg font-bold mt-8 mb-3" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>Quick Start</h2>
      <CodeBlock code={quickStart} title="example.ts" />

      {/* Configuration */}
      <h2 className="text-lg font-bold mt-8 mb-3" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>Configuration</h2>
      <p className="text-sm mb-4 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
        The SDK supports custom timeouts, retry policies, and base URL configuration for different environments.
      </p>
      <CodeBlock code={retryConfig} title="config.ts" />

      {/* Error Handling */}
      <h2 className="text-lg font-bold mt-8 mb-3" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>Error Handling</h2>
      <p className="text-sm mb-4 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
        All API errors are thrown as <code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: "var(--code-bg)", fontFamily: "var(--font-dm-mono)", color: "var(--code-text)" }}>DualError</code> instances with typed status codes, error codes, and response bodies.
      </p>
      <CodeBlock code={errorHandling} title="error-handling.ts" />

      {/* Modules */}
      <h2 className="text-lg font-bold mt-8 mb-3" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>Modules</h2>
      <p className="text-sm mb-4 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
        The SDK is organized into 14 modules, each covering a domain of the DUAL API. Access them via <code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: "var(--code-bg)", fontFamily: "var(--font-dm-mono)", color: "var(--code-text)" }}>client.moduleName</code>.
      </p>
      <div className="border rounded-lg overflow-hidden" style={{ borderColor: "var(--border)" }}>
        <table className="w-full text-sm" style={{ fontFamily: "var(--font-satoshi)" }}>
          <thead>
            <tr style={{ backgroundColor: "var(--surface)" }}>
              <th className="text-left px-4 py-2.5 font-semibold border-b" style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>Module</th>
              <th className="text-left px-4 py-2.5 font-semibold border-b" style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>Coverage</th>
              <th className="text-left px-4 py-2.5 font-semibold border-b" style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((m, i) => (
              <tr key={m.name} className={i % 2 === 0 ? "" : ""} style={{ backgroundColor: i % 2 === 1 ? "var(--surface)" : "transparent" }}>
                <td className="px-4 py-2 border-b" style={{ borderColor: "var(--border)" }}>
                  <code className="text-xs font-medium text-[#15b8a7]" style={{ fontFamily: "var(--font-dm-mono)" }}>
                    .{m.name}
                  </code>
                </td>
                <td className="px-4 py-2 border-b" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>{m.methods}</td>
                <td className="px-4 py-2 border-b" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>{m.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Source */}
      <div className="mt-8 p-4 rounded-lg border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
        <p className="text-sm" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
          View the full source on{" "}
          <a href="https://github.com/ro-ro-b/dual-sdk" target="_blank" rel="noopener noreferrer" className="text-[#15b8a7] hover:underline">
            GitHub
          </a>
          {" "}· 799 lines · 14 modules · 102 methods
        </p>
      </div>
    </div>
  );
}
