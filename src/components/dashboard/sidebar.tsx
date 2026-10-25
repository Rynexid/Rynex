"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@rynex/ui/button";

const navItems = [
  { title: "Dashboard", href: "/dashboard", icon: "📊" },
  { title: "Lifecycle", href: "/dashboard/lifecycle", icon: "🔄" },
  { title: "Analytics", href: "/dashboard/analytics", icon: "📈" },
  { title: "Products", href: "/dashboard/products", icon: "📦" },
  { title: "Projects", href: "/dashboard/projects", icon: "📁" },
  { title: "Team", href: "/dashboard/team", icon: "👥" },
  { title: "Documents", href: "/dashboard/documents", icon: "📄" },
  { title: "Data Library", href: "/dashboard/data-library", icon: "🗂️" },
  { title: "Reports", href: "/dashboard/reports", icon: "📋" },
  { title: "Word Assistant", href: "/dashboard/word-assistant", icon: "🤖" },
  { title: "Settings", href: "/dashboard/settings", icon: "⚙️" },
  { title: "Search", href: "/dashboard/search", icon: "🔍" },
];

export function AppSidebar({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  const router = useRouter();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-20 flex flex-col border-r border-white/10 bg-black/40 backdrop-blur-xl transition-all duration-200 ${
        open ? "w-64" : "w-0 overflow-hidden"
      }`}
    >
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
        <span className="font-mono text-lg font-bold tracking-wider">RYNEX</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8"
        >
          ✕
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navItems.map((item) => (
          <a
            key={item.title}
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              router.push(item.href);
            }}
            className="flex items-center gap-2 mb-1 block rounded-md px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <span>{item.icon}</span>
            {item.title}
          </a>
        ))}
      </nav>

      <div className="border-t border-white/10 p-3">
        <button
          onClick={async () => {
            await fetch("/api/admin/auth/logout", { method: "POST" });
            router.push("/login");
          }}
          className="w-full rounded-md border border-white/10 px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}
