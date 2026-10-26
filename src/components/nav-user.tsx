"use client"

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";

export function TopNavbar({
  onToggleSidebar,
}: {
  onToggleSidebar: () => void;
}) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-black/20 px-4 backdrop-blur-xl md:px-6">
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleSidebar}
          className="flex h-8 w-8 items-center justify-center rounded-md bg-black/20 text-muted-foreground hover:bg-black/30"
          aria-label="Toggle Sidebar"
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
