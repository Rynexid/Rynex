"use client";

import { useState } from "react";

import { AppSidebar } from "@/components/dashboard/sidebar";
import { TopNavbar } from "@/components/dashboard/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      <AppSidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className={`flex flex-1 flex-col transition-all duration-200 ${sidebarOpen ? "ml-64" : "ml-0"}`}>
        <TopNavbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
