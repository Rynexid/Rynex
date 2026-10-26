"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

const navMain = [
  { title: "Dashboard", href: "/dashboard", icon: "📊" },
  { title: "Lifecycle", href: "/dashboard/lifecycle", icon: "🔄" },
  { title: "Analytics", href: "/dashboard/analytics", icon: "📈" },
  { title: "Products", href: "/dashboard/products", icon: "📦" },
  { title: "Projects", href: "/dashboard/projects", icon: "📁" },
  { title: "Team", href: "/dashboard/team", icon: "👥" },
]

const navDocuments = [
  { name: "Data Library", href: "/dashboard/data-library", icon: "🗂️" },
  { name: "Reports", href: "/dashboard/reports", icon: "📋" },
  { name: "Word Assistant", href: "/dashboard/word-assistant", icon: "🤖" },
]

const navSecondary = [
  { title: "Settings", href: "/dashboard/settings", icon: "⚙️" },
  { title: "Get Help", href: "/dashboard/get-help", icon: "❓" },
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
    <div className={`fixed inset-y-0 left-0 z-20 flex flex-col border-r border-white/10 bg-black/40 backdrop-blur-xl transition-all duration-200 ${open ? "w-64" : "w-0 overflow-hidden"}`}>
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
        <span className="font-mono text-lg font-bold tracking-wider">RYNEX</span>
        <button onClick={onToggle} className="h-8 w-8">✕</button>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        <div className="flex items-center gap-2 mb-2">
          <button
            className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground flex items-center gap-2 px-2 py-1 rounded"
            onClick={() => router.push("/dashboard/products")}
          >
            <span>➕</span>
            <span>Quick Create</span>
          </button>
        </div>

        <div className="space-y-1">
          {[
            { title: "Dashboard", href: "/dashboard", icon: "📊" },
            { title: "Lifecycle", href: "/dashboard/lifecycle", icon: "🔄" },
            { title: "Analytics", href: "/dashboard/analytics", icon: "📈" },
            { title: "Products", href: "/dashboard/products", icon: "📦" },
            { title: "Projects", href: "/dashboard/projects", icon: "📁" },
            { title: "Team", href: "/dashboard/team", icon: "👥" },
          ].map((item) => (
            <a
              key={item.title}
              href={item.href}
              onClick={(e) => { e.preventDefault(); router.push(item.href); }}
              className="flex items-center gap-2 mb-1 block rounded-md px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <span className="size-5">{item.icon}</span>
              {item.title}
            </a>
          ))}
        </div>

        <div className="pt-4 pb-2 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Documents</div>
        <div className="space-y-1">
          {[
            { name: "Data Library", href: "/dashboard/data-library", icon: "🗂️" },
            { name: "Reports", href: "/dashboard/reports", icon: "📋" },
            { name: "Word Assistant", href: "/dashboard/word-assistant", icon: "🤖" },
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => { e.preventDefault(); router.push(item.href); }}
              className="flex items-center gap-2 mb-1 block rounded-md px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <span className="size-5">{item.icon}</span>
              {item.name}
            </a>
          ))}
        </div>

        <div className="pt-4 pb-2 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">More</div>
        <div className="space-y-1">
          {[
            { title: "Settings", href: "/dashboard/settings", icon: "⚙️" },
            { title: "Get Help", href: "/dashboard/get-help", icon: "❓" },
            { title: "Search", href: "/dashboard/search", icon: "🔍" },
          ].map((item) => (
            <a
              key={item.title}
              href={item.href}
              onClick={(e) => { e.preventDefault(); router.push(item.href); }}
              className="flex items-center gap-2 mb-1 block rounded-md px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <span className="size-5">{item.icon}</span>
              {item.title}
            </a>
          ))}
        </div>
      </nav>

      <div className="border-t border-white/10 p-3">
        <button
          onClick={async () => {
            await fetch("/api/admin/auth/logout", { method: "POST" });
            window.location.href = "/login";
          }}
          className="w-full rounded-md border border-white/10 px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
        >
          Log out
        </button>
      </div>
    </div>
  )
}
