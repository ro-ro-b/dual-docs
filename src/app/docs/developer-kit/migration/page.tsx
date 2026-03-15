"use client";

import Link from "next/link";
import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";

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

const changes = [
  { area: "Base URL", v2: "https://api.dual.io", v3: "https://blockv-labs.io" },
  { area: "Authentication", v2: "App-Id + App-Secret headers", v3: "Bearer JWT token" },
  { area: "Error Format", v2: "{message: string}", v3: "{code: string, status: number, body: object}" },
  { area: "Pagination", v2: "Offset-based (offset/limit)", v3: "Cursor-based (cursor)" },
  { area: "User Endpoints", v2: "/user/*", v3: "/wallets/*" },
  { area: "Digital Assets", v2: "/vatoms/*", v3: "/objects/*" },
  { area: "Asset Actions", v2: "/vatoms/:id/actions", v3: "/ebus/actions" },
];

const authV2 = `curl https://api.dual.io/user/profile \\
  -H "App-Id: YOUR_APP_ID" \\
  -H "App-Secret: YOUR_APP_SECRET"`;

const authV3 = `# Login to get a token
curl -X POST https://blockv-labs.io/wallets/login \\
  -H "Content-Type: application/json" \\
  -d '{"email": "user@example.com", "password": "password"}'

# Use the token in subsequent requests
curl https://blockv-labs.io/wallets/me \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..."`;

const errorV2 = `// v2 error response
{
  "message": "Not found"
}`;

const errorV3 = `// v3 error response
{
  "code": "RESOURCE_NOT_FOUND",
  "status": 404,
  "body": {
    "message": "Object obj_123 not found",
    "resource": "object",
    "id": "obj_123"
  }
}`;

const paginationV2 = `// v2: Offset pagination
GET /vatoms?offset=20&limit=10

// Response
{
  "items": [...],
  "total": 150,
  "offset": 20,
  "limit": 10
}`;

const paginationV3 = `// v3: Cursor pagination
GET /objects?limit=10&cursor=eyJpZCI6Im9ial8xMjMifQ

// Response
{
  "items": [...],
  "cursor": "eyJpZCI6Im9ial8xMzMifQ",
  "has_more": true
}`;

const endpointRenames = [
  { v2: "GET /user/profile", v3: "GET /wallets/me" },
  { v2: "POST /user/login", v3: "POST /wallets/login" },
  { v2: "POST /user/register", v3: "POST /wallets/register" },
  { v2: "GET /vatoms", v3: "GET /objects" },
  { v2: "GET /vatoms/:id", v3: "GET /objects/:id" },
  { v2: "POST /vatoms/:id/actions", v3: "POST /ebus/actions" },
  { v2: "GET /templates", v3: "GET /templates" },
  { v2: "POST /user/token/refresh", v3: "POST /wallets/token/refresh" },
  { v2: "GET /activity", v3: "GET /ebus/events" },
  { v2: "POST /vatoms/:id/transfer", v3: "POST /objects/:id/transfer" },
];

const codemod = `#!/bin/bash
# Run from your project root
find src -name "*.ts" -o -name "*.js" | xargs sed -i '' \\
  -e 's|api.dual.io|blockv-labs.io|g' \\
  -e 's|/user/profile|/wallets/me|g' \\
  -e 's|/user/login|/wallets/login|g' \\
  -e 's|/user/register|/wallets/register|g' \\
  -e 's|/vatoms|/objects|g' \\
  -e 's|App-Id|Authorization|g' \\
  -e 's|/activity|/ebus/events|g' \\
  -e 's|/user/token/refresh|/wallets/token/refresh|g'
echo "Migration complete — review changes with: git diff"`;

export default function MigrationPage() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-12">
      <Breadcrumb items={[{ label: "Docs", href: "/docs" }, { label: "Developer Kit", href: "/docs/developer-kit" }, { label: "Migration Guide" }]} />

      <div className="flex items-center gap-3 mb-3">
        <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>
          v2 → v3 Migration Guide
        </h1>
        <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-50 text-red-700" style={{ fontFamily: "var(--font-dm-mono)" }}>
          Breaking
        </span>
      </div>
      <p className="mb-8 leading-relaxed max-w-xl" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
        Step-by-step guide for migrating from DUAL API v2 to v3. Covers authentication, endpoint renames, pagination, and error handling changes with before/after code examples.
      </p>

      {/* Timeline notice */}
      <div className="p-4 mb-8 rounded-lg border-l-4 border-l-amber-400" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
        <p className="text-sm font-medium mb-1" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-primary)" }}>
          Deprecation Timeline
        </p>
        <p className="text-sm" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
          v2 endpoints return 301 redirects to their v3 equivalents. This compatibility layer will be removed in June 2026. Migrate before then to avoid breaking changes.
        </p>
      </div>

      {/* Summary Table */}
      <h2 className="text-lg font-bold mb-4" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>Changes at a Glance</h2>
      <div className="border rounded-lg overflow-hidden mb-10" style={{ borderColor: "var(--border)" }}>
        <table className="w-full text-sm" style={{ fontFamily: "var(--font-satoshi)" }}>
          <thead>
            <tr style={{ backgroundColor: "var(--surface)" }}>
              <th className="text-left px-4 py-2.5 font-semibold border-b" style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>Area</th>
              <th className="text-left px-4 py-2.5 font-semibold border-b" style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>v2</th>
              <th className="text-left px-4 py-2.5 font-semibold border-b" style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>v3</th>
            </tr>
          </thead>
          <tbody>
            {changes.map((c, i) => (
              <tr key={c.area} style={{ backgroundColor: i % 2 === 1 ? "var(--surface)" : "transparent" }}>
                <td className="px-4 py-2 border-b font-medium" style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>{c.area}</td>
                <td className="px-4 py-2 border-b" style={{ borderColor: "var(--border)" }}>
                  <code className="text-xs line-through opacity-60" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--text-muted)" }}>{c.v2}</code>
                </td>
                <td className="px-4 py-2 border-b" style={{ borderColor: "var(--border)" }}>
                  <code className="text-xs text-[#15b8a7]" style={{ fontFamily: "var(--font-dm-mono)" }}>{c.v3}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Auth Migration */}
      <h2 className="text-lg font-bold mb-3" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>1. Authentication</h2>
      <p className="text-sm mb-4 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
        v2 used static App-Id and App-Secret headers. v3 uses JWT bearer tokens obtained through the login endpoint, with automatic refresh support.
      </p>
      <div className="grid grid-cols-1 gap-3 mb-8">
        <CodeBlock code={authV2} title="v2 — App-Id / App-Secret" />
        <CodeBlock code={authV3} title="v3 — Bearer JWT" />
      </div>

      {/* Error Handling */}
      <h2 className="text-lg font-bold mb-3" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>2. Error Handling</h2>
      <p className="text-sm mb-4 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
        v3 errors include a machine-readable error code, HTTP status, and a detailed body with context about the failure.
      </p>
      <div className="grid grid-cols-2 gap-3 mb-8">
        <CodeBlock code={errorV2} title="v2 Error" />
        <CodeBlock code={errorV3} title="v3 Error" />
      </div>

      {/* Pagination */}
      <h2 className="text-lg font-bold mb-3" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>3. Pagination</h2>
      <p className="text-sm mb-4 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
        v3 uses cursor-based pagination for consistent results. Offset pagination is deprecated and will be removed in v4.
      </p>
      <div className="grid grid-cols-2 gap-3 mb-8">
        <CodeBlock code={paginationV2} title="v2 Offset" />
        <CodeBlock code={paginationV3} title="v3 Cursor" />
      </div>

      {/* Endpoint Renames */}
      <h2 className="text-lg font-bold mb-4" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>4. Endpoint Renames</h2>
      <div className="border rounded-lg overflow-hidden mb-8" style={{ borderColor: "var(--border)" }}>
        <table className="w-full text-sm" style={{ fontFamily: "var(--font-satoshi)" }}>
          <thead>
            <tr style={{ backgroundColor: "var(--surface)" }}>
              <th className="text-left px-4 py-2.5 font-semibold border-b" style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>v2 Endpoint</th>
              <th className="text-center px-4 py-2.5 border-b" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>→</th>
              <th className="text-left px-4 py-2.5 font-semibold border-b" style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>v3 Endpoint</th>
            </tr>
          </thead>
          <tbody>
            {endpointRenames.map((r, i) => (
              <tr key={i} style={{ backgroundColor: i % 2 === 1 ? "var(--surface)" : "transparent" }}>
                <td className="px-4 py-2 border-b" style={{ borderColor: "var(--border)" }}>
                  <code className="text-xs line-through opacity-60" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--text-muted)" }}>{r.v2}</code>
                </td>
                <td className="px-4 py-2 border-b text-center" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>→</td>
                <td className="px-4 py-2 border-b" style={{ borderColor: "var(--border)" }}>
                  <code className="text-xs text-[#15b8a7]" style={{ fontFamily: "var(--font-dm-mono)" }}>{r.v3}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Codemod */}
      <h2 className="text-lg font-bold mb-3" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>5. Automated Codemod</h2>
      <p className="text-sm mb-4 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
        Run this bash script from your project root to automatically rename endpoints and update headers. Always review the diff before committing.
      </p>
      <CodeBlock code={codemod} title="migrate-v2-to-v3.sh" />

      {/* Help */}
      <div className="mt-8 p-4 rounded-lg border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
        <p className="text-sm" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
          Need help migrating? Open a{" "}
          <Link href="/docs/support" className="text-[#15b8a7] hover:underline">support ticket</Link>
          {" "}or ask in the{" "}
          <a href="https://discord.gg/dual" target="_blank" rel="noopener noreferrer" className="text-[#15b8a7] hover:underline">Discord</a>.
        </p>
      </div>
    </div>
  );
}
