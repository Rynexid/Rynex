"use client";

import {
  IconApps,
  IconBriefcase,
  IconCalendarEvent,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconKey,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconShoppingCart,
  IconTrendingUp,
  IconUserCircle,
  IconUsers,
} from "@tabler/icons-react";
import * as React from "react";

import { NavDocuments } from "@components/nav-documents";
import { NavMain } from "@components/nav-main";
import { NavSecondary } from "@components/nav-secondary";
import { NavUser } from "@components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Products",
      url: "/dashboard/products",
      icon: IconApps,
    },
    {
      title: "Lifecycle",
      url: "/dashboard/lifecycle",
      icon: IconListDetails,
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: IconChartBar,
    },
    {
      title: "Projects",
      url: "/dashboard/projects",
      icon: IconFolder,
    },
    {
      title: "Team",
      url: "/dashboard/team",
      icon: IconUsers,
    },
    {
      title: "Documents",
      url: "/dashboard/documents",
      icon: IconFileDescription,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: IconSettings,
    },
    {
      title: "Search",
      url: "/dashboard/search",
      icon: IconSearch,
    },
    {
      title: "Get Help",
      url: "/dashboard/get-help",
      icon: IconHelp,
    },
  ],
  navSecondary: [],
  documents: [
    {
      name: "Data Library",
      url: "/dashboard/data-library",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "/dashboard/reports",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "/dashboard/word-assistant",
      icon: IconFileWord,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="/dashboard">
                <IconInnerShadowTop className="size-5!" />
                <span className="text-base font-semibold">Rynex</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        {data.navSecondary.length > 0 && (
          <NavSecondary items={data.navSecondary} className="mt-auto" />
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
