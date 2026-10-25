"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  IconDashboard,
  IconListDetails,
  IconChartBar,
  IconFolder,
  IconUsers,
  IconDatabase,
  IconReport,
  IconFileWord,
  IconSettings,
  IconHelp,
  IconSearch,
  IconInnerShadowTop,
} from "@tabler/icons-react"

import { Button } from "@rynex/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const navItems = [
  { title: "Dashboard", href: "/dashboard", icon: IconDashboard },
  { title: "Lifecycle", href: "/dashboard/lifecycle", icon: IconListDetails },
  { title: "Analytics", href: "/dashboard/analytics", icon: IconChartBar },
  { title: "Products", href: "/dashboard/products", icon: "📦" },
  { title: "Projects", href: "/dashboard/projects", icon: "📁" },
  { title: "Team", href: "/dashboard/team", icon: "👥" },
  { title: "Documents", href: "/dashboard/documents", icon: "📄" },
  { title: "Data Library", href: "/dashboard/data-library", icon: "🗂️" },
  { title: "Reports", href: "/dashboard/reports", icon: "📋" },
  { title: "Word Assistant", href: "/dashboard/word-assistant", icon: "🤖" },
  { title: "Settings", href: "/dashboard/settings", icon: "⚙️" },
  { title: "Search", href: "/dashboard/search", icon: "🔍" },
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
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              onClick={onToggle}
              className="h-16 justify-between px-4"
            >
              <a href="#" className="flex items-center gap-2">
                <span className="size-5">⚡</span>
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                onClick={() => router.push(item.href)}
                className="gap-2"
              >
                <a href={item.href} onClick={(e) => { e.preventDefault(); router.push(item.href); }}>
                  {typeof item.icon === "string" ? (
                    <span className="size-5">{item.icon}</span>
                  ) : (
                    <item.icon className="size-5" />
                  )}
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <button
          onClick={async () => {
            await fetch("/api/admin/auth/logout", { method: "POST" })
            window.location.href = "/login"
          }}
          className="w-full rounded-md border border-white/10 px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
        >
          Log out
        </button>
      </SidebarFooter>
    </Sidebar>
  )
}
