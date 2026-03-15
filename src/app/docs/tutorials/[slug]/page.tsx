"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { tutorials } from "@/data/tutorials";
import CodeBlock from "@/components/CodeBlock";

function renderContent(html: string) {
  // Split on code blocks and render them with CodeBlock component
  const parts = html.split(/<div class="code-block" data-lang="(\w+)">([\s\S]*?)<\/div>/g);
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < parts.length; i++) {
    if (i % 3 === 0) {
      // Regular HTML content
      if (parts[i].trim()) {
        elements.push(
          <div
            key={`html-${i}`}
            className="tutorial-prose"
            dangerouslySetInnerHTML={{ __html: parts[i] }}
          />
        );
      }
    } else if (i % 3 === 1) {
      // Language identifier — next part is the code
      const lang = parts[i];
      const code = parts[i + 1]?.trim() || "";
      elements.push(
        <div key={`code-${i}`} className="my-4">
          <CodeBlock code={code} language={lang} />
        </div>
      );
      i++; // skip the code part since we consumed it
    }
  }

  return elements;
}

export default function TutorialPage() {
  const params = useParams();
  const slug = params.slug as string;
  const tutorial = tutorials.find((t) => t.slug === slug);

  if (!tutorial) {
    return (
      <div className="max-w-3xl mx-auto px-8 py-20 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#15b8a7]/10 mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#15b8a7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}>
          Tutorial Not Found
        </h1>
        <p className="mb-6 text-sm" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
          The tutorial you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/docs/tutorials"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg bg-[#15b8a7] text-white hover:bg-[#15b8a7]/90 transition-colors"
            style={{ fontFamily: "var(--font-satoshi)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Browse Tutorials
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg border transition-colors"
            style={{ fontFamily: "var(--font-satoshi)", borderColor: "var(--border)", color: "var(--text-muted)" }}
          >
            Go to Docs
          </Link>
        </div>
      </div>
    );
  }

  // Find prev/next
  const idx = tutorials.findIndex((t) => t.slug === slug);
  const prev = idx > 0 ? tutorials[idx - 1] : null;
  const next = idx < tutorials.length - 1 ? tutorials[idx + 1] : null;

  const difficultyColors: Record<string, string> = {
    Beginner: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800",
    Intermediate: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800",
    Advanced: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800",
  };
  const difficultyColor = difficultyColors[tutorial.difficulty];

  return (
    <div className="max-w-3xl mx-auto px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-6" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
        <Link href="/docs" className="hover:opacity-70 transition-colors">Docs</Link>
        <span>›</span>
        <Link href="/docs/tutorials" className="hover:opacity-70 transition-colors">Tutorials</Link>
        <span>›</span>
        <span style={{ color: "var(--text-secondary)" }}>{tutorial.title}</span>
      </nav>

      {/* Header */}
      <h1
        className="text-3xl font-bold mb-3"
        style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}
      >
        {tutorial.title}
      </h1>
      <p className="mb-5 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
        {tutorial.description}
      </p>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <span
          className="text-xs font-medium px-2 py-0.5 rounded bg-[#15b8a7]/10 text-[#15b8a7]"
          style={{ fontFamily: "var(--font-dm-mono)" }}
        >
          {tutorial.time}
        </span>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded border ${difficultyColor}`}
          style={{ fontFamily: "var(--font-dm-mono)" }}
        >
          {tutorial.difficulty}
        </span>
      </div>

      {/* Prerequisites */}
      <div
        className="mb-8 p-4 rounded-lg border"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
      >
        <h3
          className="text-xs font-bold tracking-wider uppercase mb-2"
          style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}
        >
          Prerequisites
        </h3>
        <ul className="space-y-1">
          {tutorial.prerequisites.map((p) => (
            <li key={p} className="flex items-start gap-2 text-sm" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#15b8a7" strokeWidth="2" className="shrink-0 mt-0.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              {p}
            </li>
          ))}
        </ul>
      </div>

      {/* Tutorial Content */}
      <div
        className="tutorial-content prose prose-neutral max-w-none [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-medium [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:leading-relaxed [&_p]:mb-4 [&_code]:text-[#15b8a7] [&_code]:bg-[#15b8a7]/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:mb-1 [&_a]:text-[#15b8a7] [&_a]:underline"
        style={{ color: "var(--text-muted)" }}
      >
        {renderContent(tutorial.content)}
      </div>

      {/* Prev / Next navigation */}
      <div
        className="mt-12 pt-8 flex items-center justify-between"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        {prev ? (
          <Link
            href={`/docs/tutorials/${prev.slug}`}
            className="group flex items-center gap-2 text-sm hover:text-[#15b8a7] transition-colors"
            style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:-translate-x-0.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {prev.title}
          </Link>
        ) : <div />}
        {next ? (
          <Link
            href={`/docs/tutorials/${next.slug}`}
            className="group flex items-center gap-2 text-sm hover:text-[#15b8a7] transition-colors"
            style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}
          >
            {next.title}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-0.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}
