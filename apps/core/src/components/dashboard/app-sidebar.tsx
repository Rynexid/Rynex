"use client";

import {
  ArrowLeftRight,
  BarChart3,
  Briefcase,
  Calendar,
  CreditCard,
  FileEdit,
  FileText,
  Gem,
  Kanban,
  Key,
  Package,
  Receipt,
  Settings,
  ShoppingCart,
  Sparkles,
  Users,
  Wrench,
} from "lucide-react";
import Image from "next/image";
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
    icon: BarChart3,
    isActive: true,
  },
  {
    title: "General",
    url: "#",
    icon: Settings,
    isActive: true,
    items: [
      {
        title: "Lisensi",
        url: "/dashboard/licenses",
        icon: Key,
      },
      {
        title: "Produk",
        url: "/dashboard/products",
        icon: Package,
      },
      {
        title: "Analitik",
        url: "/dashboard/analytics",
        icon: BarChart3,
      },
      {
        title: "Konten",
        url: "/dashboard/content",
        icon: FileEdit,
      },
    ],
  },
  {
    title: "POS",
    url: "#",
    icon: CreditCard,
    items: [
      {
        title: "Transactions",
        url: "/pos/transactions",
        icon: ArrowLeftRight,
      },
      {
        title: "Pesanan",
        url: "/pos/orders",
        icon: ShoppingCart,
      },
      {
        title: "Pelanggan",
        url: "/pos/clients",
        icon: Users,
      },
      {
        title: "Services",
        url: "/pos/services",
        icon: Wrench,
      },
      {
        title: "Expenses",
        url: "/pos/expenses",
        icon: Receipt,
      },
      {
        title: "Invoices",
        url: "/pos/invoices",
        icon: FileText,
      },
      {
        title: "Payments",
        url: "/pos/payments",
        icon: CreditCard,
      },
      {
        title: "Projects",
        url: "/pos/projects",
        icon: Kanban,
      },
      {
        title: "Reports",
        url: "/pos/reports",
        icon: Briefcase,
      },
      {
        title: "Calendar",
        url: "/pos/calendar",
        icon: Calendar,
      },
    ],
  },
  {
    title: "Showcase",
    url: "/dashboard/showcase",
    icon: Sparkles,
    items: [
      {
        title: "Ocupite",
        url: "/dashboard/showcase/ocupite",
        icon: Gem,
      },
      {
        title: "Dealstack",
        url: "/dashboard/showcase/dealstack",
        icon: Gem,
      },
      {
        title: "Codename",
        url: "/dashboard/showcase/codename",
        icon: Gem,
      },
      {
        title: "Confidency OS",
        url: "/dashboard/showcase/confidencyos",
        icon: Gem,
      },
      {
        title: "Ecomiq",
        url: "/dashboard/showcase/ecomiq",
        icon: Gem,
      },
      {
        title: "Sublime",
        url: "/dashboard/showcase/sublime",
        icon: Gem,
      },
      {
        title: "Belo.Fur",
        url: "/dashboard/showcase/belo-fur",
        icon: Gem,
      },
      {
        title: "Ovalen",
        url: "/dashboard/showcase/ovalen",
        icon: Gem,
      },
      {
        title: "Piccollo",
        url: "/dashboard/showcase/piccollo",
        icon: Gem,
      },
      {
        title: "CozyPaws",
        url: "/dashboard/showcase/cozypaws",
        icon: Gem,
      },
    ],
  },
];

const navSecondary = [
  {
    title: "Support",
    url: "https://wa.me/628950888317",
    icon: Users,
  },
  {
    title: "Feedback",
    url: "https://wa.me/628950888317",
    icon: Users,
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
                <Image
                  src="/Rynex.png"
                  alt="RYNEX"
                  width={28}
                  height={28}
                  className="h-5 w-auto"
                  priority
                />
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
