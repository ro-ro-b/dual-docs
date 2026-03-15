import Link from "next/link";

export const metadata = { title: "Support — DUAL Docs" };

const channels = [
  {
    icon: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
    title: "Community Discord",
    desc: "Join 4,000+ developers building on DUAL. Get real-time help, share projects, and connect with the core team.",
    action: "Join Discord",
    href: "https://discord.gg/dual",
    color: "bg-indigo-50 border-indigo-100",
    iconColor: "#6366f1",
  },
  {
    icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
    title: "Email Support",
    desc: "For account issues, billing questions, or enterprise inquiries. We respond within one business day.",
    action: "support@dual.xyz",
    href: "mailto:support@dual.xyz",
    color: "bg-emerald-50 border-emerald-100",
    iconColor: "#15b8a7",
  },
  {
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z",
    title: "GitHub Issues",
    desc: "Report bugs, request features, or browse existing issues on our open-source repositories.",
    action: "Open GitHub",
    href: "https://github.com/ro-ro-b/dual-sdk",
    color: "bg-gray-50 border-gray-100",
    iconColor: "#374151",
  },
  {
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    title: "Status Page",
    desc: "Real-time monitoring of DUAL API, sequencer, and infrastructure services. Subscribe for incident alerts.",
    action: "View Status",
    href: "https://status.dual.xyz",
    color: "bg-amber-50 border-amber-100",
    iconColor: "#d97706",
  },
];

const faq = [
  {
    q: "How do I get an API key?",
    a: "Create an organization through the dashboard, then navigate to Settings → API Keys. You can generate both test and production keys.",
  },
  {
    q: "What are the API rate limits?",
    a: "Free tier: 100 requests/minute. Growth plan: 1,000 requests/minute. Enterprise: custom limits. All plans include burst allowances of 2x the base limit for 10-second windows.",
  },
  {
    q: "Do you support WebSocket connections?",
    a: "Yes. The Event Bus supports real-time WebSocket subscriptions for object state changes, action completions, and webhook delivery notifications.",
  },
  {
    q: "Is there a sandbox environment?",
    a: "Yes. All test-mode API keys point to a separate sandbox that mirrors production. Data in sandbox resets weekly. Use the x-dual-environment: test header to explicitly target sandbox.",
  },
  {
    q: "How do I handle authentication token expiry?",
    a: "Access tokens expire after 1 hour. Use the refresh token flow (POST /auth/token/refresh) to obtain new tokens without requiring the user to log in again.",
  },
  {
    q: "What happens if the sequencer goes down?",
    a: "Actions are queued in a durable message buffer. Once the sequencer recovers, all pending actions are processed in order. The ZK-rollup checkpoint system ensures no data loss.",
  },
];

export default function SupportPage() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-12">
      {/* Breadcrumb */}
      <nav
        className="flex items-center gap-2 text-sm text-[#140e1c]/40 mb-6"
        style={{ fontFamily: "var(--font-satoshi)" }}
      >
        <Link href="/docs" className="hover:text-[#140e1c]/70 transition-colors">Docs</Link>
        <span>›</span>
        <span className="text-[#140e1c]/70">Support</span>
      </nav>

      <h1
        className="text-3xl font-bold text-[#140e1c] mb-3"
        style={{ fontFamily: "var(--font-rajdhani)" }}
      >
        Support
      </h1>
      <p className="text-[#140e1c]/50 mb-10 leading-relaxed max-w-xl" style={{ fontFamily: "var(--font-satoshi)" }}>
        Get help with the DUAL platform. Whether you&apos;re stuck on integration, found a bug, or need
        enterprise-level assistance — we&apos;re here to help.
      </p>

      {/* Contact channels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {channels.map((ch) => (
          <a
            key={ch.title}
            href={ch.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group block border rounded-lg p-5 hover:shadow-md transition-all bg-white ${ch.color}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ch.iconColor} strokeWidth="1.5" className="mb-3">
              <path d={ch.icon} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h3 className="text-base font-semibold text-[#140e1c] mb-1" style={{ fontFamily: "var(--font-satoshi)" }}>
              {ch.title}
            </h3>
            <p className="text-sm text-[#140e1c]/50 mb-3 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
              {ch.desc}
            </p>
            <span
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#15b8a7] group-hover:gap-2 transition-all"
              style={{ fontFamily: "var(--font-satoshi)" }}
            >
              {ch.action}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        ))}
      </div>

      {/* SLA info */}
      <div className="mb-12 p-5 rounded-lg border border-[#15b8a7]/20 bg-[#15b8a7]/[0.02]">
        <h2 className="text-lg font-bold text-[#140e1c] mb-3" style={{ fontFamily: "var(--font-rajdhani)" }}>
          Response Times
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { plan: "Free", time: "48 hours", note: "Community + email" },
            { plan: "Growth", time: "12 hours", note: "Priority email" },
            { plan: "Enterprise", time: "1 hour", note: "Dedicated Slack channel" },
          ].map((sla) => (
            <div key={sla.plan} className="text-center">
              <span className="block text-xs font-bold tracking-wider text-[#140e1c]/40 uppercase mb-1" style={{ fontFamily: "var(--font-satoshi)" }}>
                {sla.plan}
              </span>
              <span className="block text-xl font-bold text-[#15b8a7]" style={{ fontFamily: "var(--font-rajdhani)" }}>
                {sla.time}
              </span>
              <span className="block text-xs text-[#140e1c]/40 mt-0.5" style={{ fontFamily: "var(--font-satoshi)" }}>
                {sla.note}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <h2 className="text-lg font-bold text-[#140e1c] mb-4" style={{ fontFamily: "var(--font-rajdhani)" }}>
        Frequently Asked Questions
      </h2>
      <div className="space-y-3 mb-8">
        {faq.map((item) => (
          <details
            key={item.q}
            className="group border border-black/[0.06] rounded-lg bg-white overflow-hidden"
          >
            <summary
              className="flex items-center justify-between px-5 py-3.5 cursor-pointer text-sm font-medium text-[#140e1c] hover:bg-black/[0.01] transition-colors list-none"
              style={{ fontFamily: "var(--font-satoshi)" }}
            >
              {item.q}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="shrink-0 text-[#140e1c]/30 transition-transform group-open:rotate-180"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </summary>
            <div className="px-5 pb-4 text-sm text-[#140e1c]/60 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
