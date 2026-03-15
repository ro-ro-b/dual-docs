"use client";

interface TocItem {
  id: string;
  label: string;
}

export default function TableOfContents({ items }: { items: TocItem[] }) {
  return (
    <nav className="w-[220px] shrink-0 hidden xl:block sticky top-20 h-fit py-6 pl-6">
      <ul className="space-y-2 pl-4" style={{ borderLeft: "1px solid var(--border)" }}>
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-sm block transition-colors hover:opacity-80"
              style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-secondary)" }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
