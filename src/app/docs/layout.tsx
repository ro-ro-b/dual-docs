"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import SearchModal from "@/components/SearchModal";
import Footer from "@/components/Footer";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <SearchModal />
      <div className="flex flex-1">
        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <>
            <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setSidebarOpen(false)} />
            <div className="fixed inset-y-0 left-0 z-50 w-[280px] lg:hidden overflow-y-auto" style={{ backgroundColor: "var(--surface)", top: "72px" }}>
              <Sidebar onNavigate={() => setSidebarOpen(false)} />
            </div>
          </>
        )}
        <main className="flex-1 min-w-0 flex flex-col">
          <div className="flex-1">{children}</div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
