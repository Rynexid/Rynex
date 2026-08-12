"use client";

import {
  ArrowLeftRight,
  BarChart3,
  Briefcase,
  Calendar,
  ChevronDown,
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@rynex/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@rynex/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@rynex/ui/avatar";

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
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
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
                    <ChevronDown className="ml-auto h-4 w-4" />
                  </Link>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width)"
                align="start"
              >
                <DropdownMenuLabel>RYNEX</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Workspace</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  isActive={isActive("/dashboard/settings")}
                  tooltip="Pengaturan"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Admin</span>
                    <span className="text-muted-foreground truncate text-[11px]">
                      admin@rynex.id
                    </span>
                  </div>
                  <ChevronDown className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width)"
                side="top"
              >
                <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Pengaturan
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => {
                    fetch("/api/admin/auth/logout", { method: "POST" }).then(
                      () => {
                        window.location.href = "/login";
                      },
                    );
                  }}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
