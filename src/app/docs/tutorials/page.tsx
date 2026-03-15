import React from "react";
import Link from "next/link";
import { tutorials } from "@/data/tutorials";

export const metadata = { title: "Tutorials — DUAL Docs" };

const difficultyColor: Record<string, { bg: string; text: string; border: string }> = {
  Beginner: { bg: "bg-emerald-50 dark:bg-emerald-950/40", text: "text-emerald-700 dark:text-emerald-400", border: "border-emerald-200 dark:border-emerald-800" },
  Intermediate: { bg: "bg-amber-50 dark:bg-amber-950/40", text: "text-amber-700 dark:text-amber-400", border: "border-amber-200 dark:border-amber-800" },
  Advanced: { bg: "bg-red-50 dark:bg-red-950/40", text: "text-red-700 dark:text-red-400", border: "border-red-200 dark:border-red-800" },
};

/* ── SVG icons for each section ── */

function RocketIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#15b8a7" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#15b8a7" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#15b8a7" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
      <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
      <path d="M6 18a4 4 0 0 1-1.967-.516" />
      <path d="M19.967 17.484A4 4 0 0 1 18 18" />
    </svg>
  );
}

const sectionIcons: Record<string, () => React.ReactElement> = {
  "getting-started": RocketIcon,
  "platform-features": GearIcon,
  "ai-integrations": BrainIcon,
};

interface TutorialSection {
  id: string;
  title: string;
  description: string;
  slugs: string[];
}

const sections: TutorialSection[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Learn the fundamentals — create templates, mint objects, and build your first visual face.",
    slugs: ["create-first-template", "mint-transfer-objects", "build-web-face"],
  },
  {
    id: "platform-features",
    title: "Platform Features",
    description: "Go deeper with webhooks, payments, batch operations, permissions, and search.",
    slugs: ["setup-webhooks", "integrate-payments", "batch-actions", "org-roles-permissions", "search-filter-objects", "public-api-indexer"],
  },
  {
    id: "ai-integrations",
    title: "AI Integrations",
    description: "Connect AI models to the DUAL platform — agents, classifiers, chatbots, semantic search, and safety layers.",
    slugs: ["ai-agent-mcp", "ai-token-classifier", "ai-chatbot-integration", "ai-webhook-responder", "ai-semantic-search", "ai-guardrails"],
  },
];

function TutorialCard({ tutorial, index }: { tutorial: (typeof tutorials)[number]; index: number }) {
  const dc = difficultyColor[tutorial.difficulty] || difficultyColor.Beginner;
  return (
    <Link
      key={tutorial.slug}
      href={`/docs/tutorials/${tutorial.slug}`}
      className="group block rounded-lg p-5 hover:border-[#15b8a7]/30 hover:shadow-sm transition-all border"
      style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="text-xs font-medium"
              style={{ fontFamily: "var(--font-dm-mono)", color: "var(--text-muted)", opacity: 0.6 }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3
              className="text-base font-semibold group-hover:text-[#15b8a7] transition-colors truncate"
              style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-primary)" }}
            >
              {tutorial.title}
            </h3>
          </div>
          <p
            className="text-sm leading-relaxed"
            style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}
          >
            {tutorial.description}
          </p>
        </div>
        <div className="shrink-0 flex flex-col items-end gap-2">
          <span
            className="text-xs font-medium px-2 py-0.5 rounded bg-[#15b8a7]/10 text-[#15b8a7]"
            style={{ fontFamily: "var(--font-dm-mono)" }}
          >
            {tutorial.time}
          </span>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded border ${dc.bg} ${dc.text} ${dc.border}`}
            style={{ fontFamily: "var(--font-dm-mono)" }}
          >
            {tutorial.difficulty}
          </span>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1.5 text-xs text-[#15b8a7] font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontFamily: "var(--font-satoshi)" }}>
        Start tutorial
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}

export default function TutorialsPage() {
  let globalIndex = 0;

  return (
    <div className="max-w-3xl mx-auto px-8 py-12">
      {/* Breadcrumb */}
      <nav
        className="flex items-center gap-2 text-sm mb-6"
        style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}
      >
        <Link href="/docs" className="hover:opacity-70 transition-colors">Docs</Link>
        <span>›</span>
        <span style={{ color: "var(--text-secondary)" }}>Tutorials</span>
      </nav>

      <h1
        className="text-3xl font-bold mb-3"
        style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}
      >
        Tutorials
      </h1>
      <p
        className="mb-10 leading-relaxed max-w-xl"
        style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}
      >
        Step-by-step guides to help you build on the DUAL platform. Start with
        the basics and work your way up.
      </p>

      {/* Jump links */}
      <div className="flex flex-wrap gap-2 mb-10">
        {sections.map((section) => {
          const Icon = sectionIcons[section.id];
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border transition-all hover:border-[#15b8a7]/40 hover:text-[#15b8a7]"
              style={{
                fontFamily: "var(--font-satoshi)",
                color: "var(--text-muted)",
                borderColor: "var(--border)",
                backgroundColor: "var(--surface)",
              }}
            >
              <Icon />
              {section.title}
            </a>
          );
        })}
      </div>

      {/* Sections */}
      <div className="space-y-14">
        {sections.map((section) => {
          const Icon = sectionIcons[section.id];
          const sectionTutorials = section.slugs
            .map((slug) => tutorials.find((t) => t.slug === slug))
            .filter(Boolean) as (typeof tutorials)[number][];

          return (
            <section key={section.id} id={section.id}>
              {/* Section header */}
              <div className="mb-5">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="flex items-center justify-center w-8 h-8 rounded-lg"
                    style={{ backgroundColor: "rgba(21, 184, 167, 0.1)" }}
                  >
                    <Icon />
                  </div>
                  <h2
                    className="text-xl font-bold"
                    style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}
                  >
                    {section.title}
                  </h2>
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{
                      fontFamily: "var(--font-dm-mono)",
                      color: "#15b8a7",
                      backgroundColor: "rgba(21, 184, 167, 0.1)",
                    }}
                  >
                    {sectionTutorials.length}
                  </span>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)", marginLeft: "2.75rem" }}
                >
                  {section.description}
                </p>
              </div>

              {/* Section divider */}
              <div
                className="h-px mb-5"
                style={{ backgroundColor: "var(--border)", marginLeft: "2.75rem" }}
              />

              {/* Tutorial cards */}
              <div className="space-y-4">
                {sectionTutorials.map((tutorial) => {
                  const idx = globalIndex++;
                  return <TutorialCard key={tutorial.slug} tutorial={tutorial} index={idx} />;
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
