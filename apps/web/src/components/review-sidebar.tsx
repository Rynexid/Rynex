"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@rynex/ui/sidebar";
import { Star, User, Package, Settings, MessageSquare } from "lucide-react";
import Link from "next/link";

const menuItems = [
  { title: "Profil", icon: User, href: "/member" },
  { title: "Review Saya", icon: Star, href: "/member#reviews" },
  { title: "Proyek", icon: Package, href: "/member#projects" },
  { title: "Dukungan", icon: MessageSquare, href: "/support" },
  { title: "Pengaturan", icon: Settings, href: "/settings" },
];

export function ReviewSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-2 py-2">
          <p className="gradient-text text-lg font-bold">RYNEX</p>
          <p className="text-muted-foreground text-xs">Member Area</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild>
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
