"use client";

import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = "bash" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-lg overflow-hidden border" style={{ borderColor: "var(--border)" }}>
      {/* Language label */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#1e1e2e] border-b border-white/10">
        <span className="text-xs font-medium text-white/40 uppercase" style={{ fontFamily: "var(--font-dm-mono)" }}>
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/80 transition-colors cursor-pointer"
          style={{ fontFamily: "var(--font-dm-mono)" }}
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      {/* Code content */}
      <pre className="bg-[#1e1e2e] p-4 overflow-x-auto text-sm leading-relaxed">
        <code className="text-[#cdd6f4]" style={{ fontFamily: "var(--font-dm-mono)" }}>
          {code}
        </code>
      </pre>
    </div>
  );
}
