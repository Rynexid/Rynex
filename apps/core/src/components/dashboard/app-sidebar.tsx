"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@rynex/ui/sidebar";
import { NavMain } from "@/components/dashboard/nav-main";
import { NavSecondary } from "@/components/dashboard/nav-secondary";
import { NavUser } from "@/components/dashboard/nav-user";

const navMain = [
  {
    title: "Dashboard",
    url: "/dashboard",
    isActive: true,
  },
  {
    title: "General",
    url: "#",
    isActive: true,
    items: [
      {
        title: "Lisensi",
        url: "/dashboard/licenses",
      },
      {
        title: "Produk",
        url: "/dashboard/products",
      },
      {
        title: "Analitik",
        url: "/dashboard/analytics",
      },
      {
        title: "Konten",
        url: "/dashboard/content",
      },
    ],
  },
  {
    title: "POS",
    url: "#",
    items: [
      {
        title: "Transactions",
        url: "/pos/transactions",
      },
      {
        title: "Pesanan",
        url: "/pos/orders",
      },
      {
        title: "Pelanggan",
        url: "/pos/clients",
      },
      {
        title: "Services",
        url: "/pos/services",
      },
      {
        title: "Expenses",
        url: "/pos/expenses",
      },
      {
        title: "Invoices",
        url: "/pos/invoices",
      },
      {
        title: "Payments",
        url: "/pos/payments",
      },
      {
        title: "Projects",
        url: "/pos/projects",
      },
      {
        title: "Reports",
        url: "/pos/reports",
      },
      {
        title: "Calendar",
        url: "/pos/calendar",
      },
    ],
  },
  {
    title: "Showcase",
    url: "/dashboard/showcase",
    items: [
      {
        title: "Ocupite",
        url: "/dashboard/showcase/ocupite",
      },
      {
        title: "Dealstack",
        url: "/dashboard/showcase/dealstack",
      },
      {
        title: "Codename",
        url: "/dashboard/showcase/codename",
      },
      {
        title: "Confidency OS",
        url: "/dashboard/showcase/confidencyos",
      },
      {
        title: "Ecomiq",
        url: "/dashboard/showcase/ecomiq",
      },
      {
        title: "Sublime",
        url: "/dashboard/showcase/sublime",
      },
      {
        title: "Belo.Fur",
        url: "/dashboard/showcase/belo-fur",
      },
      {
        title: "Ovalen",
        url: "/dashboard/showcase/ovalen",
      },
      {
        title: "Piccollo",
        url: "/dashboard/showcase/piccollo",
      },
      {
        title: "CozyPaws",
        url: "/dashboard/showcase/cozypaws",
      },
    ],
  },
];

const navSecondary = [
  {
    title: "Support",
    url: "https://wa.me/628950888317",
  },
  {
    title: "Feedback",
    url: "https://wa.me/628950888317",
  },
];

export function AppSidebar() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/auth/session")
      .then((r) => r.json())
      .then((data) => {
        if (data?.user) {
          setUser({
            name: data.user.name || "Admin",
            email: data.user.email,
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">RYNEX</span>
                  <span className="truncate text-xs">Dashboard</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {user && <NavUser user={user} />}
      </SidebarFooter>
    </Sidebar>
  );
}
