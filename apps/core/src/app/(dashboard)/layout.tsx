"use client";

import { useEffect } from "react";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { TopNavbar } from "@/components/dashboard/top-navbar";
import { SidebarInset, SidebarProvider } from "@rynex/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const checkLicense = async () => {
      try {
        const res = await fetch("/api/admin/auth/session");
        const data = await res.json();
        if (!data?.user) {
          window.location.href = "/register";
          return;
        }
        if (!data.user.licenseVerified) {
          window.location.href = "/onboarding";
        }
      } catch {
        window.location.href = "/register";
      }
    };

    checkLicense();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <TopNavbar />
        <main className="flex-1">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
