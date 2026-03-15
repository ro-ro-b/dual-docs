import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata = { title: "Learn — DUAL Docs" };

const notebookUrl = "https://notebooklm.google.com/notebook/d7d51911-deda-4fd0-82a9-afeff6ff5b89";

/* ── Icon components ─────────────────────────────────────────────── */

const AudioIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);
const VideoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);
const MindMapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v4m0 12v4M2 12h4m12 0h4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
  </svg>
);
const InfographicIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18" />
    <path d="M9 21V9" />
  </svg>
);
const DocIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);
const BookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);
const BulbIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
const BoltIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);
const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const CodeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);
const BarChartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);
const LayersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);
const TargetIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);
const ToolboxIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);
const RocketIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);
const BriefcaseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);
const CpuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="14" x2="23" y2="14" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="14" x2="4" y2="14" />
  </svg>
);
const GlobeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

/* ── Resource data ───────────────────────────────────────────────── */

type Resource = {
  title: string;
  desc: string;
  type: string;
  duration: string;
  icon: React.ReactNode;
};

const multimedia: Resource[] = [
  {
    title: "Audio Deep Dive",
    desc: "DUAL Modular Infrastructure for AI Agents — a conversational podcast-style breakdown covering the platform's architecture, developer tools, and AI-native integration layer.",
    type: "Audio",
    duration: "Podcast",
    icon: <AudioIcon />,
  },
  {
    title: "Video Explainer",
    desc: "An animated visual walkthrough of DUAL — from wallets and templates to ZK rollups, smart contracts, and the MCP integration layer.",
    type: "Video",
    duration: "Animated",
    icon: <VideoIcon />,
  },
  {
    title: "Mind Map",
    desc: "Architectural Blueprint for the DUAL Developer Playground — a visual map showing how the SDK, CLI, API modules, MCP server, and infrastructure components connect.",
    type: "Interactive",
    duration: "Explore",
    icon: <MindMapIcon />,
  },
  {
    title: "Infographic",
    desc: "Modular Blockchain Infrastructure — a visual overview of DUAL's architecture, service layers, and how the components fit together at a glance.",
    type: "Visual",
    duration: "One-pager",
    icon: <InfographicIcon />,
  },
];

const foundationReports: Resource[] = [
  {
    title: "Executive Platform Overview",
    desc: "DUAL Modular Blockchain Infrastructure — a C-suite and investor briefing covering the value proposition, capabilities, and strategic positioning.",
    type: "Report",
    duration: "Executive Brief",
    icon: <BriefcaseIcon />,
  },
  {
    title: "Developer Onboarding Journey",
    desc: "The DUAL Odyssey: From Zero to On-Chain Mastery — a milestone-by-milestone guide following a developer from first API call to production deployment.",
    type: "Report",
    duration: "Journey Map",
    icon: <RocketIcon />,
  },
  {
    title: "Conceptual Framework",
    desc: "Demystifying DUAL: A Foundation for Modular Blockchain Development — break down DUAL's core concepts, primitives, and design philosophy for newcomers.",
    type: "Report",
    duration: "Guide",
    icon: <BulbIcon />,
  },
  {
    title: "Workflow Narrative",
    desc: "The Life of a Digital Asset: A Narrative Journey through DUAL — follow a token from creation to transfer, exploring every service it touches along the way.",
    type: "Report",
    duration: "Story",
    icon: <BookIcon />,
  },
];

const technicalReports: Resource[] = [
  {
    title: "AI Integration Deep Dive",
    desc: "Bridging the Frontier of AI and Blockchain Infrastructure — covering the MCP Server, Claude plugins, AI-powered automation, and the convergence of AI + blockchain.",
    type: "Report",
    duration: "Deep Dive",
    icon: <CpuIcon />,
  },
  {
    title: "Security & Identity Architecture",
    desc: "Enterprise-grade security analysis covering authentication, wallet-based identity, workspace isolation, ZK rollup privacy, and the cryptographic trust model.",
    type: "Report",
    duration: "Architecture",
    icon: <ShieldIcon />,
  },
  {
    title: "API Technical Reference Guide",
    desc: "The definitive companion document — every API module from authentication to webhooks, with request/response patterns, pagination, error handling, and best practices.",
    type: "Report",
    duration: "Reference",
    icon: <CodeIcon />,
  },
  {
    title: "Infrastructure & Scalability",
    desc: "A technical deep dive into the Sequencer, ZK Rollup layer, smart contracts, and how DUAL's modular design enables independent horizontal scaling.",
    type: "Report",
    duration: "Deep Dive",
    icon: <LayersIcon />,
  },
];

const strategyReports: Resource[] = [
  {
    title: "Enterprise Use Cases & ROI",
    desc: "Compelling real-world use cases across industries — digital identity, supply chain, loyalty programs, gaming assets, and more — with business value analysis.",
    type: "Report",
    duration: "Analysis",
    icon: <BarChartIcon />,
  },
  {
    title: "Competitive Landscape Analysis",
    desc: "Strategic differentiation analysis positioning DUAL against Ethereum, Alchemy, Moralis, and the broader Web3 infrastructure market.",
    type: "Report",
    duration: "Strategy",
    icon: <TargetIcon />,
  },
  {
    title: "Developer Ecosystem & Tooling",
    desc: "Full suite walkthrough — SDK, CLI, Postman, MCP Server, Claude plugins, and learning resources — with a tool selection matrix for every use case.",
    type: "Report",
    duration: "Ecosystem",
    icon: <ToolboxIcon />,
  },
  {
    title: "Future Roadmap & Vision",
    desc: "The Future of AI-Native Blockchain Infrastructure — a visionary document with phased roadmap covering deeper AI autonomy, cross-chain interoperability, and DID standards.",
    type: "Report",
    duration: "Vision",
    icon: <GlobeIcon />,
  },
];

const legacyReports: Resource[] = [
  {
    title: "Solution Architecture",
    desc: "AI-Enhanced Blockchain Infrastructure: The DUAL Solution Architecture — a comprehensive document covering system design, service boundaries, and integration patterns.",
    type: "Report",
    duration: "Deep read",
    icon: <DocIcon />,
  },
  {
    title: "Integration Proposal",
    desc: "Strategic Integration Proposal: DUAL Modular Infrastructure — a technical proposal document for evaluating and adopting DUAL within an existing stack.",
    type: "Report",
    duration: "Proposal",
    icon: <BoltIcon />,
  },
];

/* ── Section renderer ────────────────────────────────────────────── */

function ResourceSection({ title, subtitle, items }: { title: string; subtitle: string; items: Resource[] }) {
  return (
    <div className="mb-10">
      <h2
        className="text-xl font-bold mb-1"
        style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}
      >
        {title}
      </h2>
      <p className="text-sm mb-5" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
        {subtitle}
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((r) => (
          <a
            key={r.title}
            href={notebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 p-5 rounded-xl border transition-all hover:shadow-md"
            style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
          >
            <div
              className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-colors group-hover:bg-[#15b8a7]/15 group-hover:text-[#15b8a7]"
              style={{ backgroundColor: "rgba(21,184,167,0.08)", color: "var(--text-muted)" }}
            >
              {r.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-primary)" }}>
                  {r.title}
                </span>
                <span
                  className="text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded"
                  style={{ fontFamily: "var(--font-dm-mono)", backgroundColor: "rgba(21,184,167,0.1)", color: "var(--text-muted)" }}
                >
                  {r.type}
                </span>
              </div>
              <p className="text-xs leading-relaxed mb-2" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
                {r.desc}
              </p>
              <span className="text-[10px] font-medium" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--text-muted)" }}>
                {r.duration}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────── */

export default function LearnPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <Breadcrumb items={[{ label: "Docs", href: "/docs" }, { label: "Learn" }]} />

      <h1
        className="text-3xl font-bold mb-3"
        style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}
      >
        Learn DUAL
      </h1>
      <p className="mb-10 leading-relaxed max-w-2xl" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
        Explore DUAL through AI-generated learning resources — audio overviews, video explainers, interactive mind maps, and 14 in-depth reports covering every angle from executive briefings to technical deep dives. Powered by Google NotebookLM.
      </p>

      {/* NotebookLM CTA Banner */}
      <a
        href={notebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group block mb-10 p-6 rounded-xl border transition-all hover:shadow-lg"
        style={{
          background: "linear-gradient(135deg, rgba(21,184,167,0.08) 0%, rgba(99,102,241,0.08) 100%)",
          borderColor: "var(--border)",
        }}
      >
        <div className="flex items-center gap-4">
          <div className="shrink-0 w-14 h-14 rounded-2xl bg-[#15b8a7]/15 flex items-center justify-center">
            <svg width="30" height="30" viewBox="0 0 48 48" fill="none">
              <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4z" fill="none"/>
              <path d="M33.2 18.6H26v-7.2c0-.99-.81-1.8-1.8-1.8h-.4c-.99 0-1.8.81-1.8 1.8v7.2h-7.2c-.99 0-1.8.81-1.8 1.8v.4c0 .99.81 1.8 1.8 1.8H22v7.2c0 .99.81 1.8 1.8 1.8h.4c.99 0 1.8-.81 1.8-1.8v-7.2h7.2c.99 0 1.8-.81 1.8-1.8v-.4c0-.99-.81-1.8-1.8-1.8z" fill="#15b8a7"/>
              <path d="M10 14l4-4 4 4M10 14v10" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M34 34l4-4-4-4" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 38l-4-4 4-4" stroke="#FBBC05" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M38 10l-4 4 4 4M38 10v10" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-lg font-semibold" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>
                Open in Google NotebookLM
              </span>
              <span
                className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full"
                style={{ backgroundColor: "#15b8a7", color: "white" }}
              >
                18 RESOURCES
              </span>
            </div>
            <p className="text-sm" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
              Chat with an AI that knows the entire DUAL documentation. Ask questions, explore concepts, and generate custom explanations in real-time.
            </p>
          </div>
          <div className="shrink-0 transition-transform group-hover:translate-x-1" style={{ color: "var(--text-muted)" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </div>
        </div>
      </a>

      {/* Multimedia */}
      <ResourceSection
        title="Multimedia"
        subtitle="Audio, video, and visual resources generated from the DUAL documentation."
        items={multimedia}
      />

      {/* Foundation & Onboarding */}
      <ResourceSection
        title="Foundation & Onboarding"
        subtitle="Start here — executive overviews, developer journeys, and core concept breakdowns."
        items={foundationReports}
      />

      {/* Technical Deep Dives */}
      <ResourceSection
        title="Technical Deep Dives"
        subtitle="Architecture, security, API reference, and infrastructure analysis for engineers."
        items={technicalReports}
      />

      {/* Strategy & Market Position */}
      <ResourceSection
        title="Strategy & Market Position"
        subtitle="Use cases, competitive analysis, ecosystem overview, and forward-looking vision."
        items={strategyReports}
      />

      {/* Original Reports */}
      <ResourceSection
        title="Architecture Documents"
        subtitle="Solution architecture and integration proposal from the original documentation analysis."
        items={legacyReports}
      />

      {/* What is NotebookLM section */}
      <div
        className="mt-2 p-6 rounded-xl border"
        style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-3 mb-3">
          <svg width="24" height="24" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59A14.5 14.5 0 0 1 9.5 24c0-1.59.28-3.14.76-4.59l-7.98-6.19A23.99 23.99 0 0 0 0 24c0 3.77.87 7.35 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          <h3
            className="text-base font-bold"
            style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}
          >
            What is Google NotebookLM?
          </h3>
        </div>
        <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
          Google NotebookLM is an AI-powered research and learning tool by Google. We&apos;ve loaded the complete DUAL documentation as a source, so the AI can answer questions, generate summaries, create audio/video overviews, build infographics, and more — all grounded in our actual docs. Think of it as a personal tutor for the DUAL platform.
        </p>
      </div>
    </div>
  );
}
