import Link from "next/link";

export const metadata = { title: "Updates — DUAL Docs" };

type ChangeKind = "added" | "improved" | "fixed" | "breaking" | "deprecated";

interface Release {
  version: string;
  date: string;
  summary: string;
  changes: { kind: ChangeKind; text: string }[];
}

const kindBadge: Record<ChangeKind, { bg: string; text: string; label: string }> = {
  added:      { bg: "bg-emerald-50", text: "text-emerald-700", label: "New" },
  improved:   { bg: "bg-blue-50",    text: "text-blue-700",    label: "Improved" },
  fixed:      { bg: "bg-amber-50",   text: "text-amber-700",   label: "Fixed" },
  breaking:   { bg: "bg-red-50",     text: "text-red-700",     label: "Breaking" },
  deprecated: { bg: "bg-gray-100",   text: "text-gray-600",    label: "Deprecated" },
};

const releases: Release[] = [
  {
    version: "v3.2.0",
    date: "March 10, 2026",
    summary: "Batch actions, webhook testing, and template variations — this release focuses on developer productivity and throughput.",
    changes: [
      { kind: "added", text: "Batch action execution endpoint (POST /actions/batch) — submit up to 100 actions in a single request for 10x throughput." },
      { kind: "added", text: "Webhook test endpoint (POST /webhooks/{id}/test) — validate connectivity and inspect payload format without triggering real events." },
      { kind: "added", text: "Template variations — create derived templates that inherit base fields while overriding specific properties." },
      { kind: "added", text: "Public stats endpoint (GET /indexer/stats) — platform-wide metrics including total objects, active templates, and sequencer throughput." },
      { kind: "improved", text: "Action queue throughput increased from 500 to 2,000 actions/second per organization." },
      { kind: "fixed", text: "Fixed race condition in concurrent object state transitions that could cause stale reads for 200ms after a write." },
    ],
  },
  {
    version: "v3.1.0",
    date: "February 15, 2026",
    summary: "SDK improvements, new indexer filters, and batch action enhancements.",
    changes: [
      { kind: "added", text: "TypeScript SDK v2.0 with full type coverage for all 102 endpoints." },
      { kind: "added", text: "Geo-radius search filter for objects with location properties." },
      { kind: "improved", text: "Batch action endpoint now supports up to 500 actions per request (previously 100)." },
      { kind: "improved", text: "Webhook retry logic with exponential backoff — failed deliveries retry up to 5 times." },
      { kind: "fixed", text: "Object transfer events now correctly fire webhooks for both sender and receiver orgs." },
      { kind: "deprecated", text: "Legacy /v2/objects endpoint will be removed in v4.0. Use /objects with API version header instead." },
    ],
  },
  {
    version: "v3.0.0",
    date: "January 8, 2026",
    summary: "Major release: new authentication model, template versioning, and Event Bus redesign.",
    changes: [
      { kind: "added", text: "EIP-712 typed data signatures for all mutation requests." },
      { kind: "added", text: "Template versioning — templates now support semver naming (e.g., my-org::asset::v2)." },
      { kind: "added", text: "Sequencer checkpoints with on-chain anchoring every 15 minutes." },
      { kind: "added", text: "Role-based access control with custom permission sets per organization." },
      { kind: "breaking", text: "Auth header changed from X-Api-Key to standard Authorization: Bearer format. Migration: Replace all X-Api-Key headers with Authorization: Bearer <token>. API keys are now passed as Bearer tokens." },
      { kind: "breaking", text: "Template properties field renamed from 'attrs' to 'properties'. Migration: Update all template creation and update payloads. Existing templates are auto-migrated, but client code must use the new field name." },
      { kind: "breaking", text: "Event Bus endpoint moved from /actions to /ebus/actions. Migration: Update all action execution calls. The old /actions endpoint returns 301 redirects for 90 days." },
      { kind: "breaking", text: "Object response shape changed — 'vAtom' wrapper removed, properties now at top level. Migration: Remove .vAtom accessor from response parsing. SDK v2.0+ handles this automatically." },
      { kind: "fixed", text: "Race condition in concurrent object transfers resolved with optimistic locking." },
      { kind: "improved", text: "API response times reduced by 40% through query optimisation and connection pooling." },
    ],
  },
  {
    version: "v2.4.1",
    date: "December 12, 2025",
    summary: "Security patch and minor improvements before the v3 migration.",
    changes: [
      { kind: "fixed", text: "Patched JWT validation to reject tokens with algorithm: none — CVE-2025-DUAL-001." },
      { kind: "fixed", text: "Storage upload endpoint now enforces Content-Length limits before buffering the full body." },
      { kind: "improved", text: "Rate limiter now returns Retry-After header with the exact reset timestamp." },
    ],
  },
  {
    version: "v2.4.0",
    date: "November 20, 2025",
    summary: "Webhooks v2, improved search, and notification channels.",
    changes: [
      { kind: "added", text: "Webhooks v2 with HMAC-SHA256 signature verification — every delivery includes an X-Dual-Signature header." },
      { kind: "added", text: "Notification channels — route alerts to email, webhook, or in-app based on event type and severity." },
      { kind: "improved", text: "Object search now supports full-text queries across metadata fields with relevance scoring." },
      { kind: "improved", text: "Dashboard API key management — rotate keys with zero-downtime grace period (old key valid for 5 minutes after rotation)." },
    ],
  },
];

export default function UpdatesPage() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-12">
      {/* Breadcrumb */}
      <nav
        className="flex items-center gap-2 text-sm text-[#140e1c]/40 mb-6"
        style={{ fontFamily: "var(--font-satoshi)" }}
      >
        <Link href="/docs" className="hover:text-[#140e1c]/70 transition-colors">Docs</Link>
        <span>›</span>
        <span className="text-[#140e1c]/70">Updates</span>
      </nav>

      <h1
        className="text-3xl font-bold text-[#140e1c] mb-3"
        style={{ fontFamily: "var(--font-rajdhani)" }}
      >
        Updates
      </h1>
      <p className="text-[#140e1c]/50 mb-10 leading-relaxed max-w-xl" style={{ fontFamily: "var(--font-satoshi)" }}>
        Changelog and release notes for the DUAL platform and API. Subscribe to the
        {" "}<a href="https://github.com/ro-ro-b/dual-sdk" target="_blank" rel="noopener noreferrer" className="text-[#15b8a7] hover:underline">GitHub repository</a>{" "}
        for real-time notifications.
      </p>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[11px] top-6 bottom-6 w-px bg-gradient-to-b from-[#15b8a7]/40 via-[#15b8a7]/20 to-transparent" />

        <div className="space-y-8">
          {releases.map((release, i) => (
            <div key={release.version} className="relative pl-10">
              {/* Dot */}
              <div className={`absolute left-0 top-[22px] w-[23px] h-[23px] rounded-full border-2 ${
                i === 0 ? "border-[#15b8a7] bg-[#15b8a7]/10" : "border-[#140e1c]/15 bg-white"
              } flex items-center justify-center`}>
                <div className={`w-2 h-2 rounded-full ${i === 0 ? "bg-[#15b8a7]" : "bg-[#140e1c]/20"}`} />
              </div>

              <div className="border border-black/[0.06] rounded-lg p-5 bg-white">
                {/* Header */}
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="text-sm font-bold text-[#15b8a7] px-2.5 py-0.5 bg-[#15b8a7]/10 rounded"
                    style={{ fontFamily: "var(--font-dm-mono)" }}
                  >
                    {release.version}
                  </span>
                  <span className="text-xs text-[#140e1c]/40" style={{ fontFamily: "var(--font-satoshi)" }}>
                    {release.date}
                  </span>
                  {i === 0 && (
                    <span className="text-[10px] font-bold tracking-wider uppercase text-white bg-[#15b8a7] px-2 py-0.5 rounded" style={{ fontFamily: "var(--font-satoshi)" }}>
                      Latest
                    </span>
                  )}
                </div>

                {/* Summary */}
                <p className="text-sm text-[#140e1c]/60 mb-4 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                  {release.summary}
                </p>

                {/* Changes */}
                <div className="space-y-3">
                  {release.changes.map((change, j) => {
                    const badge = kindBadge[change.kind];
                    const isBreakinngChange = change.kind === "breaking";
                    const migrationMatch = change.text.match(/Migration:\s*(.+?)(?=\s*$)/);

                    return (
                      <div key={j} className={`flex items-start gap-2.5 ${isBreakinngChange ? "p-3 rounded-md border border-red-200 bg-red-50/50" : ""}`}>
                        <span
                          className={`shrink-0 mt-0.5 text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded ${badge.bg} ${badge.text}`}
                          style={{ fontFamily: "var(--font-dm-mono)", minWidth: "56px", textAlign: "center" }}
                        >
                          {badge.label}
                        </span>
                        <div className="flex-1">
                          <span className="text-sm text-[#140e1c]/70 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                            {isBreakinngChange && migrationMatch ? change.text.split("Migration:")[0].trim() : change.text}
                          </span>
                          {migrationMatch && (
                            <div className="mt-2 pt-2 border-t border-red-200">
                              <p className="text-xs font-semibold text-red-700 mb-1" style={{ fontFamily: "var(--font-satoshi)" }}>
                                Migration Required:
                              </p>
                              <p className="text-xs text-red-600 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                                {migrationMatch[1]}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
