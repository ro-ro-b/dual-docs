import Link from "next/link";

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-1.5 text-sm mb-4" style={{ color: "var(--text-muted)" }}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span style={{ color: "var(--border)" }}>›</span>}
          {item.href ? (
            <Link href={item.href} className="hover:opacity-80 transition-colors" style={{ color: "var(--text-muted)" }}>
              {item.label}
            </Link>
          ) : (
            <span className="font-medium" style={{ color: "var(--text-secondary)" }}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
