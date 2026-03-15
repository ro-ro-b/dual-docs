import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import EndpointCard from "@/components/EndpointCard";
import TableOfContents from "@/components/TableOfContents";
import { endpointGroups, generateGroupMarkdown } from "@/data/api-endpoints";
import { conceptPages } from "@/data/concept-pages";
import { docsNavigation } from "@/data/navigation";
import CopyMarkdownButton from "@/components/CopyMarkdownButton";
import ProseContent from "@/components/ProseContent";

interface PageProps {
  params: Promise<{ section: string; slug: string }>;
}

/* ── Build flat ordered page list from navigation ── */
function getOrderedPages() {
  const pages: { title: string; href: string }[] = [];
  for (const section of docsNavigation) {
    for (const item of section.items) {
      // Only include pages that resolve to [section]/[slug] pattern
      const match = item.href.match(/^\/docs\/([^/]+)\/([^/]+)$/);
      if (match) {
        const key = `${match[1]}/${match[2]}`;
        if (conceptPages[key] || endpointGroups.find((g) => match[1] === "api" && g.tag === match[2])) {
          pages.push({ title: item.title, href: item.href });
        }
      }
    }
  }
  return pages;
}

/* ── Parse h2/h3 headings from HTML for TOC ── */
function parseHeadings(html: string) {
  const headings: { id: string; label: string; level: number }[] = [];
  const regex = /<h([23])[^>]*>([^<]+)<\/h[23]>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1]);
    const text = match[2].trim();
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    headings.push({ id, label: text, level });
  }
  return headings;
}

/* ── Inject IDs into h2/h3 tags so TOC links work ── */
function injectHeadingIds(html: string) {
  return html.replace(/<h([23])([^>]*)>([^<]+)<\/h[23]>/gi, (_match, level, attrs, text) => {
    const id = text.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return `<h${level}${attrs} id="${id}">${text}</h${level}>`;
  });
}

export default async function DocPage({ params }: PageProps) {
  const { section, slug } = await params;
  const orderedPages = getOrderedPages();

  // API reference pages
  if (section === "api") {
    const group = endpointGroups.find((g) => g.tag === slug);
    if (!group) return notFound();

    const tocItems = group.endpoints.map((e) => ({
      id: `${e.method.toLowerCase()}-${e.path.replace(/[^a-z0-9]/gi, "-")}`,
      label: `${e.method} ${e.path}`,
    }));

    const markdown = generateGroupMarkdown(group);

    const currentHref = `/docs/api/${slug}`;
    const currentIdx = orderedPages.findIndex((p) => p.href === currentHref);
    const prev = currentIdx > 0 ? orderedPages[currentIdx - 1] : null;
    const next = currentIdx < orderedPages.length - 1 ? orderedPages[currentIdx + 1] : null;

    return (
      <div className="flex">
        <div className="flex-1 min-w-0 px-6 sm:px-12 py-8 max-w-4xl">
          <Breadcrumb
            items={[
              { label: "Docs", href: "/docs" },
              { label: "API Reference", href: "/docs/api/payments" },
              { label: group.label },
            ]}
          />
          <div className="flex items-center justify-between mb-2">
            <h1
              className="text-4xl font-semibold"
              style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}
            >
              {group.label}
            </h1>
            <CopyMarkdownButton content={markdown} />
          </div>
          <p className="mb-8 text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {group.description}
          </p>

          <div className="mb-6 p-4 rounded-lg border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
            <div className="flex items-center gap-2 text-sm">
              <span style={{ color: "var(--text-muted)" }}>Base URL:</span>
              <code
                className="text-sm text-[#15b8a7] bg-[#15b8a7]/10 px-2 py-0.5 rounded"
                style={{ fontFamily: "var(--font-dm-mono)" }}
              >
                https://blockv-labs.io
              </code>
            </div>
            <div className="flex items-center gap-2 text-sm mt-2">
              <span style={{ color: "var(--text-muted)" }}>Auth:</span>
              <code
                className="text-xs px-2 py-0.5 rounded"
                style={{ fontFamily: "var(--font-dm-mono)", backgroundColor: "var(--code-bg)", color: "var(--code-text)" }}
              >
                Bearer JWT
              </code>
              <code
                className="text-xs px-2 py-0.5 rounded"
                style={{ fontFamily: "var(--font-dm-mono)", backgroundColor: "var(--code-bg)", color: "var(--code-text)" }}
              >
                x-api-key
              </code>
            </div>
          </div>

          <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
            Endpoints ({group.endpoints.length})
          </h2>
          <div className="space-y-3">
            {group.endpoints.map((endpoint, i) => (
              <div
                key={i}
                id={`${endpoint.method.toLowerCase()}-${endpoint.path.replace(/[^a-z0-9]/gi, "-")}`}
              >
                <EndpointCard endpoint={endpoint} />
              </div>
            ))}
          </div>

          {/* Prev / Next navigation */}
          {(prev || next) && (
            <div className="flex justify-between items-center mt-12 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
              {prev ? (
                <Link href={prev.href} className="group flex items-center gap-2 text-sm transition-colors hover:opacity-80" style={{ color: "var(--text-secondary)" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:-translate-x-0.5"><path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <div className="text-right">
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>Previous</div>
                    <div style={{ color: "#15b8a7" }}>{prev.title}</div>
                  </div>
                </Link>
              ) : <div />}
              {next ? (
                <Link href={next.href} className="group flex items-center gap-2 text-sm transition-colors hover:opacity-80 ml-auto" style={{ color: "var(--text-secondary)" }}>
                  <div className="text-left">
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>Next</div>
                    <div style={{ color: "#15b8a7" }}>{next.title}</div>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-0.5"><path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              ) : <div />}
            </div>
          )}
        </div>
        <TableOfContents items={tocItems} />
      </div>
    );
  }

  // Concept / getting-started pages
  const pageKey = `${section}/${slug}`;
  const page = conceptPages[pageKey];
  if (!page) return notFound();

  // Parse headings for right-side TOC
  const headings = parseHeadings(page.content);
  const tocItems = headings.map((h) => ({ id: h.id, label: h.label }));
  const contentWithIds = injectHeadingIds(page.content);

  // Prev/next
  const currentHref = `/docs/${section}/${slug}`;
  const currentIdx = orderedPages.findIndex((p) => p.href === currentHref);
  const prev = currentIdx > 0 ? orderedPages[currentIdx - 1] : null;
  const next = currentIdx < orderedPages.length - 1 ? orderedPages[currentIdx + 1] : null;

  return (
    <div className="flex">
      <div className="flex-1 min-w-0 px-6 sm:px-12 py-8 max-w-4xl">
        <Breadcrumb
          items={[
            { label: "Docs", href: "/docs" },
            { label: page.sectionLabel, href: page.sectionHref },
            { label: page.title },
          ]}
        />
        <h1
          className="text-4xl font-semibold mb-4"
          style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}
        >
          {page.title}
        </h1>
        <p className="mb-8 text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {page.description}
        </p>
        <ProseContent
          html={contentWithIds}
          className="prose prose-neutral max-w-none [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-medium [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:leading-relaxed [&_p]:mb-4 [&_code]:text-[#15b8a7] [&_code]:bg-[#15b8a7]/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:mb-1 [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:overflow-x-auto [&_a]:text-[#15b8a7] [&_a]:underline"
          style={{ color: "var(--text-muted)" }}
        />

        {/* Prev / Next navigation */}
        {(prev || next) && (
          <div className="flex justify-between items-center mt-12 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
            {prev ? (
              <Link href={prev.href} className="group flex items-center gap-2 text-sm transition-colors hover:opacity-80" style={{ color: "var(--text-secondary)" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:-translate-x-0.5"><path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <div className="text-right">
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>Previous</div>
                  <div style={{ color: "#15b8a7" }}>{prev.title}</div>
                </div>
              </Link>
            ) : <div />}
            {next ? (
              <Link href={next.href} className="group flex items-center gap-2 text-sm transition-colors hover:opacity-80 ml-auto" style={{ color: "var(--text-secondary)" }}>
                <div className="text-left">
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>Next</div>
                  <div style={{ color: "#15b8a7" }}>{next.title}</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-0.5"><path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            ) : <div />}
          </div>
        )}
      </div>
      {tocItems.length > 0 && <TableOfContents items={tocItems} />}
    </div>
  );
}

export function generateStaticParams() {
  const apiParams = endpointGroups.map((g) => ({
    section: "api",
    slug: g.tag,
  }));

  const conceptParams = Object.keys(conceptPages).map((key) => {
    const [section, slug] = key.split("/");
    return { section, slug };
  });

  return [...apiParams, ...conceptParams];
}
