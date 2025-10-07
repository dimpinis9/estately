"use client";

import { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-black/50"
          onClick={() => setSidebarOpen(false)}
        >
          <DashboardSidebar className="fixed left-0 top-0 h-full w-64 lg:hidden" />
        </div>
      )}

      {/* Main content */}
      <main className="flex-1">
        <DashboardHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        {children}
      </main>
    </div>
  );
}
