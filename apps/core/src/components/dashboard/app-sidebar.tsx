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
  LayoutDashboard,
  Package,
  Receipt,
  Settings,
  ShoppingCart,
  Sparkles,
  Users,
  Wrench,
} from "lucide-react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@rynex/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@rynex/ui/sidebar";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

const generalNavItems = [
  { href: "/dashboard/licenses", label: "Lisensi", icon: Key },
  { href: "/dashboard/products", label: "Produk", icon: Package },
  { href: "/dashboard/analytics", label: "Analitik", icon: BarChart3 },
  { href: "/dashboard/content", label: "Konten", icon: FileEdit },
];

const posNavItems = [
  { href: "/pos/transactions", label: "Transactions", icon: ArrowLeftRight },
  { href: "/pos/orders", label: "Pesanan", icon: ShoppingCart },
  { href: "/pos/clients", label: "Pelanggan", icon: Users },
  { href: "/pos/services", label: "Services", icon: Wrench },
  { href: "/pos/expenses", label: "Expenses", icon: Receipt },
  { href: "/pos/invoices", label: "Invoices", icon: FileText },
  { href: "/pos/payments", label: "Payments", icon: CreditCard },
  { href: "/pos/projects", label: "Projects", icon: Kanban },
  { href: "/pos/reports", label: "Reports", icon: Briefcase },
  { href: "/pos/calendar", label: "Calendar", icon: Calendar },
];

const showcaseNavItems = [
  { href: "/dashboard/showcase", label: "Showcase", icon: Sparkles },
  { href: "/dashboard/showcase/ocupite", label: "Ocupite", icon: Gem },
  { href: "/dashboard/showcase/dealstack", label: "Dealstack", icon: Gem },
  { href: "/dashboard/showcase/codename", label: "Codename", icon: Gem },
  { href: "/dashboard/showcase/confidencyos", label: "Confidency OS", icon: Gem },
  { href: "/dashboard/showcase/ecomiq", label: "Ecomiq", icon: Gem },
  { href: "/dashboard/showcase/sublime", label: "Sublime", icon: Gem },
  { href: "/dashboard/showcase/belo-fur", label: "Belo.Fur", icon: Gem },
  { href: "/dashboard/showcase/ovalen", label: "Ovalen", icon: Gem },
  { href: "/dashboard/showcase/piccollo", label: "Piccollo", icon: Gem },
  { href: "/dashboard/showcase/cozypaws", label: "CozyPaws", icon: Gem },
];

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <Sidebar collapsible="icon">
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
                  <span className="truncate font-semibold">RYNEX</span>
                  <span className="text-muted-foreground truncate text-[11px]">
                    Dashboard
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    tooltip={item.label}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                General
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {generalNavItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive(item.href)}
                        tooltip={item.label}
                      >
                        <Link href={item.href}>
                          <item.icon />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                POS
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {posNavItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive(item.href)}
                        tooltip={item.label}
                      >
                        <Link href={item.href}>
                          <item.icon />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Showcase
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {showcaseNavItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive(item.href)}
                        tooltip={item.label}
                      >
                        <Link href={item.href}>
                          <item.icon />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/dashboard/settings")}
              tooltip="Pengaturan"
            >
              <Link href="/dashboard/settings">
                <Settings />
                <span>Pengaturan</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
