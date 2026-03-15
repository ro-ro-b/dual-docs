"use client";

import { useEffect, useRef } from "react";

interface ProseContentProps {
  html: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function ProseContent({ html, className, style }: ProseContentProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const pres = ref.current.querySelectorAll("pre");
    pres.forEach((pre) => {
      // Skip if already has a copy button
      if (pre.querySelector(".copy-btn")) return;

      pre.style.position = "relative";

      const btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
      btn.title = "Copy code";
      Object.assign(btn.style, {
        position: "absolute",
        top: "8px",
        right: "8px",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "6px",
        padding: "6px",
        cursor: "pointer",
        opacity: "0",
        transition: "opacity 0.15s",
        color: "var(--text-muted)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      });

      pre.addEventListener("mouseenter", () => { btn.style.opacity = "1"; });
      pre.addEventListener("mouseleave", () => { btn.style.opacity = "0"; });

      btn.addEventListener("click", async () => {
        const code = pre.querySelector("code")?.textContent || pre.textContent || "";
        await navigator.clipboard.writeText(code);
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#15b8a7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
        setTimeout(() => {
          btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
        }, 1500);
      });

      pre.appendChild(btn);
    });
  }, [html]);

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
