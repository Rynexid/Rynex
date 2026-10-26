"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard,
  RefreshCw,
  BarChart2,
  Package,
  FolderOpen,
  Users,
  Database,
  FileText,
  Bot,
  Settings,
  HelpCircle,
  Search,
  Mail,
  Plus,
  X,
  Menu,
  ChevronLeft,
  ChevronRight,
  RefreshCw as RefreshCwIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const navMain = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Lifecycle", href: "/dashboard/lifecycle", icon: RefreshCwIcon },
  { title: "Analytics", href: "/dashboard/analytics", icon: BarChart2 },
  { title: "Products", href: "/dashboard/products", icon: Package },
  { title: "Projects", href: "/dashboard/projects", icon: FolderOpen },
  { title: "Team", href: "/dashboard/team", icon: Users },
]

const navDocuments = [
  { name: "Data Library", href: "/dashboard/data-library", icon: Database },
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
  { name: "Word Assistant", href: "/dashboard/word-assistant", icon: Bot },
]

const navSecondary = [
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
  { title: "Get Help", href: "/dashboard/get-help", icon: HelpCircle },
  { title: "Search", href: "/dashboard/search", icon: Search },
]

export function AppSidebar({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  const router = useRouter()

  return (
    <Sidebar collapsible="offcanvas" className="w-64">
      <SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              <SidebarMenuItem className="flex items-center gap-2">
                <SidebarMenuButton
                  tooltip="Quick Create"
                  className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
                >
                  <Plus className="size-5" />
                  <span>Quick Create</span>
                </SidebarMenuButton>
                <Button
                  size="icon"
                  className="size-8 group-data-[collapsible=icon]:opacity-0"
                  variant="outline"
                >
                  <Mail className="size-5" />
                  <span className="sr-only">Inbox</span>
                </Button>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu>
              {navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.href} onClick={(e) => { e.preventDefault(); router.push(item.href); }}>
                      <item.icon className="size-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Documents</SidebarGroupLabel>
          <SidebarMenu>
            {navDocuments.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild>
                  <a href={item.href} onClick={(e) => { e.preventDefault(); router.push(item.href); }}>
                    <item.icon className="size-5" />
                    <span>{item.name}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem>
              <SidebarMenuButton className="text-sidebar-foreground/70">
                <span className="size-5">⋯</span>
                <span>More</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navSecondary.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.href} onClick={(e) => { e.preventDefault(); router.push(item.href); }}>
                      <item.icon className="size-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <button
          onClick={async () => {
            await fetch("/api/admin/auth/logout", { method: "POST" });
            window.location.href = "/login";
          }}
          className="w-full rounded-md border border-white/10 px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
        >
          Log out
        </button>
      </SidebarFooter>
    </Sidebar>
  )
}
