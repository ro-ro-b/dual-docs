"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { allEndpoints } from "@/data/api-endpoints";
import { docsNavigation } from "@/data/navigation";
import { tutorials } from "@/data/tutorials";

interface SearchResult {
  title: string;
  description: string;
  href: string;
  category: string;
  method?: string;
}

function buildSearchIndex(): SearchResult[] {
  const items: SearchResult[] = [];
  for (const section of docsNavigation) {
    for (const item of section.items) {
      items.push({ title: item.title, description: `${section.title} — ${item.title}`, href: item.href, category: section.title });
    }
  }
  for (const tut of tutorials) {
    items.push({ title: tut.title, description: tut.description, href: `/docs/tutorials/${tut.slug}`, category: "TUTORIAL" });
  }
  for (const ep of allEndpoints) {
    items.push({ title: `${ep.method} ${ep.path}`, description: ep.summary, href: `/docs/api/${ep.tag}`, category: "API", method: ep.method });
  }
  return items;
}

const searchIndex = buildSearchIndex();

function fuzzyMatch(query: string, text: string): boolean {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (t.includes(q)) return true;
  let qi = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) qi++;
  }
  return qi === q.length;
}

function scoreMatch(query: string, item: SearchResult): number {
  const q = query.toLowerCase();
  const title = item.title.toLowerCase();
  const desc = item.description.toLowerCase();
  let score = 0;
  if (title === q) score += 100;
  if (title.startsWith(q)) score += 50;
  if (title.includes(q)) score += 30;
  if (desc.includes(q)) score += 10;
  if (fuzzyMatch(q, title)) score += 5;
  return score;
}

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = query.length > 0
    ? searchIndex.map(item => ({ item, score: scoreMatch(query, item) })).filter(({ score }) => score > 0).sort((a, b) => b.score - a.score).slice(0, 12).map(({ item }) => item)
    : [];

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setOpen(prev => !prev); }
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => { if (open) { setQuery(""); setSelectedIndex(0); setTimeout(() => inputRef.current?.focus(), 50); } }, [open]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIndex(prev => Math.min(prev + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIndex(prev => Math.max(prev - 1, 0)); }
    else if (e.key === "Enter" && results[selectedIndex]) { e.preventDefault(); router.push(results[selectedIndex].href); setOpen(false); }
  }, [results, selectedIndex, router]);

  useEffect(() => { setSelectedIndex(0); }, [query]);

  const methodColors: Record<string, string> = { GET: "text-emerald-500", POST: "text-blue-500", PUT: "text-amber-500", PATCH: "text-orange-500", DELETE: "text-red-500" };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-xl rounded-xl shadow-2xl border overflow-hidden" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0" style={{ color: "var(--text-muted)" }}>
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <input ref={inputRef} type="text" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown}
            placeholder="Search docs, API endpoints, concepts..." className="flex-1 text-sm outline-none bg-transparent"
            style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-primary)" }} />
          <kbd className="text-xs px-1.5 py-0.5 rounded border" style={{ color: "var(--text-muted)", backgroundColor: "var(--background)", borderColor: "var(--border)" }}>ESC</kbd>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {query.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>Start typing to search...</div>
          ) : results.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>No results for &ldquo;{query}&rdquo;</div>
          ) : (
            <ul className="py-2">
              {results.map((result, i) => (
                <li key={`${result.href}-${result.title}-${i}`}>
                  <button type="button" onClick={() => { router.push(result.href); setOpen(false); }} onMouseEnter={() => setSelectedIndex(i)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left cursor-pointer transition-colors"
                    style={{ backgroundColor: i === selectedIndex ? "rgba(21, 184, 167, 0.08)" : "transparent" }}>
                    {result.method ? (
                      <span className={`shrink-0 text-[10px] font-bold ${methodColors[result.method] || ""}`} style={{ fontFamily: "var(--font-dm-mono)", width: "42px" }}>{result.method}</span>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0" style={{ color: "var(--text-muted)" }}>
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
                      </svg>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium truncate" style={{ fontFamily: result.method ? "var(--font-dm-mono)" : "var(--font-satoshi)", color: "var(--text-primary)" }}>{result.title}</div>
                      <div className="text-xs truncate" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>{result.description}</div>
                    </div>
                    <span className="shrink-0 text-[10px] uppercase tracking-wider" style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>{result.category}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex items-center gap-4 px-4 py-2 text-[10px]" style={{ borderTop: "1px solid var(--border)", fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}>
          <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded border" style={{ backgroundColor: "var(--background)", borderColor: "var(--border)" }}>↑↓</kbd> Navigate</span>
          <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded border" style={{ backgroundColor: "var(--background)", borderColor: "var(--border)" }}>↵</kbd> Select</span>
          <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded border" style={{ backgroundColor: "var(--background)", borderColor: "var(--border)" }}>esc</kbd> Close</span>
        </div>
      </div>
    </div>
  );
}
