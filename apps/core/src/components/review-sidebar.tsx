"use client";

import {
  GalleryVerticalEnd,
  LifeBuoy,
  Package,
  Send,
  Settings2,
  Star,
  User,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@rynex/ui/sidebar";

const data = {
  user: {
    name: "Budi Santoso",
    email: "budi@techcorp.com",
    avatar: "",
  },
  teams: [
    {
      name: "Rynex Member",
      logo: GalleryVerticalEnd,
      plan: "Personal",
    },
    {
      name: "TechCorp",
      logo: Package,
      plan: "Business",
    },
  ],
  navMain: [
    {
      title: "Profil",
      url: "/member",
      icon: User,
      isActive: true,
    },
    {
      title: "Review Saya",
      url: "/member#reviews",
      icon: Star,
      items: [
        {
          title: "Semua Review",
          url: "/member#reviews",
        },
        {
          title: "Tulis Review",
          url: "/reviews",
        },
      ],
    },
    {
      title: "Proyek",
      url: "/member#projects",
      icon: Package,
    },
    {
      title: "Pengaturan",
      url: "/member#settings",
      icon: Settings2,
      items: [
        {
          title: "Akun",
          url: "/member#settings",
        },
        {
          title: "Keamanan",
          url: "/member#settings",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Bantuan",
      url: "/contact",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "/reviews",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Website Perusahaan",
      url: "/member#projects",
      icon: Package,
    },
    {
      name: "Dashboard Internal",
      url: "/member#projects",
      icon: Star,
    },
    {
      name: "Landing Page",
      url: "/member#projects",
      icon: User,
    },
  ],
};

export function ReviewSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
