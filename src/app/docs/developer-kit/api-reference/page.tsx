import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata = { title: "OpenAPI Reference — DUAL Docs" };

const stats = [
  { label: "Paths", value: "70" },
  { label: "Operations", value: "100" },
  { label: "Tags", value: "14" },
  { label: "Spec Version", value: "3.1.0" },
];

const tags = [
  { name: "Wallets", ops: 10, desc: "User authentication, registration, profile management" },
  { name: "Templates", ops: 7, desc: "Template CRUD, search, variations" },
  { name: "Objects", ops: 9, desc: "Digital object lifecycle management" },
  { name: "Payments", ops: 6, desc: "Payment processing and subscriptions" },
  { name: "Organizations", ops: 10, desc: "Multi-tenant organization management" },
  { name: "Storage", ops: 6, desc: "File upload, download, and management" },
  { name: "Webhooks", ops: 7, desc: "Event notification delivery" },
  { name: "Notifications", ops: 5, desc: "Push notification management" },
  { name: "Event Bus", ops: 8, desc: "Action execution and event streaming" },
  { name: "Faces", ops: 5, desc: "Visual face registration and rendering" },
  { name: "Sequencer", ops: 5, desc: "Transaction ordering and checkpointing" },
  { name: "Public API", ops: 5, desc: "Public indexer and statistics" },
  { name: "API Keys", ops: 5, desc: "Key management and rotation" },
  { name: "Support", ops: 4, desc: "Support ticket management" },
];

const codeGenExamples = [
  { lang: "TypeScript", cmd: "npx @openapitools/openapi-generator-cli generate -i openapi.json -g typescript-fetch -o ./sdk" },
  { lang: "Python", cmd: "npx @openapitools/openapi-generator-cli generate -i openapi.json -g python -o ./sdk-python" },
  { lang: "Go", cmd: "npx @openapitools/openapi-generator-cli generate -i openapi.json -g go -o ./sdk-go" },
  { lang: "Java", cmd: "npx @openapitools/openapi-generator-cli generate -i openapi.json -g java -o ./sdk-java" },
];

export default function ApiReferencePage() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-12">
      <Breadcrumb items={[{ label: "Docs", href: "/docs" }, { label: "Developer Kit", href: "/docs/developer-kit" }, { label: "OpenAPI Reference" }]} />

      <h1 className="text-3xl font-bold mb-3" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>
        OpenAPI Reference
      </h1>
      <p className="mb-8 leading-relaxed max-w-xl" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
        Complete OpenAPI 3.1.0 specification for the DUAL Platform API. Use it to generate client SDKs, explore endpoints interactively, or import into your favorite API tool.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="p-4 rounded-lg border text-center" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
            <div className="text-2xl font-bold text-[#15b8a7]" style={{ fontFamily: "var(--font-rajdhani)" }}>{s.value}</div>
            <div className="text-xs mt-1" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Download + Redoc */}
      <div className="flex flex-wrap gap-3 mb-10">
        <a
          href="/downloads/openapi.json"
          download
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-[#15b8a7] hover:bg-[#129e90] transition-colors"
          style={{ fontFamily: "var(--font-satoshi)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download OpenAPI Spec
        </a>
        <a
          href="https://redocly.github.io/redoc/?url=https://dual-docs.vercel.app/downloads/openapi.json"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border transition-colors"
          style={{ fontFamily: "var(--font-satoshi)", borderColor: "var(--border)", color: "var(--text-primary)", backgroundColor: "var(--surface)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          View in Redoc
        </a>
      </div>

      {/* Auth Schemes */}
      <h2 className="text-lg font-bold mb-4" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>Authentication Schemes</h2>
      <div className="grid grid-cols-2 gap-3 mb-10">
        <div className="p-4 rounded-lg border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#15b8a7]" />
            <span className="text-sm font-semibold" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-primary)" }}>BearerAuth</span>
          </div>
          <p className="text-xs" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
            JWT token in Authorization header. Used by most endpoints.
          </p>
          <code className="text-[10px] mt-2 block" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--text-muted)" }}>
            Authorization: Bearer &lt;token&gt;
          </code>
        </div>
        <div className="p-4 rounded-lg border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#15b8a7]" />
            <span className="text-sm font-semibold" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-primary)" }}>ApiKeyAuth</span>
          </div>
          <p className="text-xs" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
            API key in X-API-Key header. For server-to-server integrations.
          </p>
          <code className="text-[10px] mt-2 block" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--text-muted)" }}>
            X-API-Key: &lt;api-key&gt;
          </code>
        </div>
      </div>

      {/* Tags */}
      <h2 className="text-lg font-bold mb-4" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>API Tags</h2>
      <div className="border rounded-lg overflow-hidden" style={{ borderColor: "var(--border)" }}>
        <table className="w-full text-sm" style={{ fontFamily: "var(--font-satoshi)" }}>
          <thead>
            <tr style={{ backgroundColor: "var(--surface)" }}>
              <th className="text-left px-4 py-2.5 font-semibold border-b" style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>Tag</th>
              <th className="text-center px-4 py-2.5 font-semibold border-b" style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>Operations</th>
              <th className="text-left px-4 py-2.5 font-semibold border-b" style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {tags.map((t, i) => (
              <tr key={t.name} style={{ backgroundColor: i % 2 === 1 ? "var(--surface)" : "transparent" }}>
                <td className="px-4 py-2 border-b font-medium" style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>{t.name}</td>
                <td className="px-4 py-2 border-b text-center" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>{t.ops}</td>
                <td className="px-4 py-2 border-b" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>{t.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Gen */}
      <h2 className="text-lg font-bold mt-8 mb-3" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>Generate Client SDKs</h2>
      <p className="text-sm mb-4 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
        Use the OpenAPI spec with any code generator to create typed clients in your language of choice.
      </p>
      <div className="space-y-2">
        {codeGenExamples.map((ex) => (
          <div key={ex.lang} className="rounded-lg overflow-hidden border" style={{ borderColor: "var(--border)" }}>
            <div className="px-4 py-1.5 border-b text-xs font-medium" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
              {ex.lang}
            </div>
            <pre className="px-4 py-3 overflow-x-auto text-xs" style={{ backgroundColor: "var(--code-bg)", color: "var(--code-text)", fontFamily: "var(--font-dm-mono)" }}>
              {ex.cmd}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
