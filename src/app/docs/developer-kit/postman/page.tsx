import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata = { title: "Postman Collection — DUAL Docs" };

const folders = [
  { name: "Wallets", count: 10, desc: "Login, registration, profile, token management" },
  { name: "Templates", count: 7, desc: "CRUD, search, variations, listing" },
  { name: "Objects", count: 9, desc: "Create, list, transfer, state transitions" },
  { name: "Payments", count: 6, desc: "Payment intents, subscriptions, refunds" },
  { name: "Organizations", count: 10, desc: "Org management, members, invites, roles" },
  { name: "Storage", count: 6, desc: "Upload, download, delete, presigned URLs" },
  { name: "Webhooks", count: 7, desc: "CRUD, delivery logs, test endpoint" },
  { name: "Notifications", count: 5, desc: "Push tokens, send, preferences" },
  { name: "Event Bus", count: 8, desc: "Actions, event types, subscriptions" },
  { name: "Faces", count: 5, desc: "Face registration, rendering, config" },
  { name: "Sequencer", count: 5, desc: "Batch submissions, checkpoints, status" },
  { name: "Public API", count: 5, desc: "Indexer queries, stats, public search" },
  { name: "API Keys", count: 5, desc: "Create, rotate, revoke, list" },
  { name: "Support", count: 4, desc: "Ticket creation, listing, status" },
];

const envVars = [
  { name: "base_url", value: "https://blockv-labs.io", desc: "API base URL" },
  { name: "access_token", value: "", desc: "JWT access token (set after login)" },
  { name: "refresh_token", value: "", desc: "JWT refresh token" },
  { name: "api_key", value: "", desc: "API key for key-based auth" },
  { name: "org_id", value: "", desc: "Default organization ID" },
  { name: "template_id", value: "", desc: "Default template ID" },
  { name: "object_id", value: "", desc: "Default object ID" },
  { name: "wallet_id", value: "", desc: "Default wallet ID" },
];

export default function PostmanPage() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-12">
      <Breadcrumb items={[{ label: "Docs", href: "/docs" }, { label: "Developer Kit", href: "/docs/developer-kit" }, { label: "Postman Collection" }]} />

      <h1 className="text-3xl font-bold mb-3" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>
        Postman Collection
      </h1>
      <p className="mb-8 leading-relaxed max-w-xl" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
        100 pre-built requests organized into 14 folders. Import into Postman and start testing the DUAL API with zero setup.
      </p>

      {/* Download buttons */}
      <div className="flex flex-wrap gap-3 mb-10">
        <a
          href="/downloads/dual-api.postman_collection.json"
          download
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-[#15b8a7] hover:bg-[#129e90] transition-colors"
          style={{ fontFamily: "var(--font-satoshi)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download Collection
        </a>
        <a
          href="/downloads/dual-api.postman_environment.json"
          download
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border transition-colors"
          style={{ fontFamily: "var(--font-satoshi)", borderColor: "var(--border)", color: "var(--text-primary)", backgroundColor: "var(--surface)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download Environment
        </a>
      </div>

      {/* Setup Steps */}
      <h2 className="text-lg font-bold mb-4" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>Setup</h2>
      <div className="space-y-3 mb-10">
        {[
          "Open Postman and click Import in the top-left corner",
          "Drag or select dual-api.postman_collection.json",
          "Import dual-api.postman_environment.json the same way",
          "Select \"DUAL API\" from the environment dropdown (top-right)",
          "Set your access_token variable after logging in via the Wallets → Login request",
        ].map((step, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-lg border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
            <span className="shrink-0 w-6 h-6 rounded-full bg-[#15b8a7]/10 text-[#15b8a7] flex items-center justify-center text-xs font-bold" style={{ fontFamily: "var(--font-dm-mono)" }}>
              {i + 1}
            </span>
            <span className="text-sm" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-secondary)" }}>
              {step}
            </span>
          </div>
        ))}
      </div>

      {/* Folders */}
      <h2 className="text-lg font-bold mb-4" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>Collection Structure</h2>
      <p className="text-sm mb-4 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
        The collection is organized into 14 folders matching the API reference sections. Each request includes pre-filled URLs, headers, and example request bodies.
      </p>
      <div className="border rounded-lg overflow-hidden" style={{ borderColor: "var(--border)" }}>
        <table className="w-full text-sm" style={{ fontFamily: "var(--font-satoshi)" }}>
          <thead>
            <tr style={{ backgroundColor: "var(--surface)" }}>
              <th className="text-left px-4 py-2.5 font-semibold border-b" style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>Folder</th>
              <th className="text-center px-4 py-2.5 font-semibold border-b" style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>Requests</th>
              <th className="text-left px-4 py-2.5 font-semibold border-b" style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>Endpoints</th>
            </tr>
          </thead>
          <tbody>
            {folders.map((f, i) => (
              <tr key={f.name} style={{ backgroundColor: i % 2 === 1 ? "var(--surface)" : "transparent" }}>
                <td className="px-4 py-2 border-b font-medium" style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>{f.name}</td>
                <td className="px-4 py-2 border-b text-center" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>{f.count}</td>
                <td className="px-4 py-2 border-b" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>{f.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Environment Variables */}
      <h2 className="text-lg font-bold mt-8 mb-4" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>Environment Variables</h2>
      <div className="border rounded-lg overflow-hidden" style={{ borderColor: "var(--border)" }}>
        <table className="w-full text-sm" style={{ fontFamily: "var(--font-satoshi)" }}>
          <thead>
            <tr style={{ backgroundColor: "var(--surface)" }}>
              <th className="text-left px-4 py-2.5 font-semibold border-b" style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>Variable</th>
              <th className="text-left px-4 py-2.5 font-semibold border-b" style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>Default</th>
              <th className="text-left px-4 py-2.5 font-semibold border-b" style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {envVars.map((v, i) => (
              <tr key={v.name} style={{ backgroundColor: i % 2 === 1 ? "var(--surface)" : "transparent" }}>
                <td className="px-4 py-2 border-b" style={{ borderColor: "var(--border)" }}>
                  <code className="text-xs text-[#15b8a7]" style={{ fontFamily: "var(--font-dm-mono)" }}>{`{{${v.name}}}`}</code>
                </td>
                <td className="px-4 py-2 border-b" style={{ borderColor: "var(--border)" }}>
                  <code className="text-xs" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--text-muted)" }}>
                    {v.value || "—"}
                  </code>
                </td>
                <td className="px-4 py-2 border-b" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>{v.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
