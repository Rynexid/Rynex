"use client";

import { Menu } from "lucide-react";

import { Button } from "@rynex/ui/button";

export function TopNavbar({
  onToggleSidebar,
}: {
  onToggleSidebar: () => void;
}) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-black/20 px-4 backdrop-blur-xl md:px-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="h-8 w-8"
          aria-label="Toggle Sidebar"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-xs">
          Admin Dashboard
        </span>
      </div>
    </header>
  );
}
