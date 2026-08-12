"use client";

import { Bell } from "lucide-react";

import { SidebarTrigger } from "@rynex/ui/sidebar";

export function TopNavbar() {
  return (
    <header className="border-border bg-background/80 flex h-16 shrink-0 items-center gap-2 border-b px-4 backdrop-blur-xl transition-[width,height] ease-linear md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        <button
          className="text-muted-foreground hover:text-foreground relative flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/5"
          aria-label="Notifikasi"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-2 h-1.5 w-1.5 rounded-full bg-red-500" />
        </button>
      </div>
    </header>
  );
}
