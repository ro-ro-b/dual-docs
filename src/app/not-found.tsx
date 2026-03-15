import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#15b8a7]/10 mb-8">
          <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke="#15B8A7" strokeWidth="2.5" />
            <path d="M10 16h12M16 10v12" stroke="#15B8A7" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
        <h1
          className="text-5xl font-bold mb-3"
          style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}
        >
          404
        </h1>
        <p
          className="text-lg mb-2"
          style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text-primary)" }}
        >
          Page not found
        </p>
        <p
          className="text-sm mb-8"
          style={{ fontFamily: "var(--font-satoshi)", color: "var(--text-muted)" }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-lg bg-[#15b8a7] text-white hover:bg-[#15b8a7]/90 transition-colors"
            style={{ fontFamily: "var(--font-satoshi)" }}
          >
            Go to Docs
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-lg border transition-colors"
            style={{ fontFamily: "var(--font-satoshi)", borderColor: "var(--border)", color: "var(--text-muted)" }}
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
