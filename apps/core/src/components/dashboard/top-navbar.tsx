"use client";

import { Bell, Home, LogOut, User, UserCircle } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

import { ThemeToggle } from "@/components/shared/themeToggle";
import { Separator } from "@rynex/ui/separator";
import { SidebarTrigger } from "@rynex/ui/sidebar";

export function TopNavbar() {
  const [profileOpen, setProfileOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <header className="border-border bg-background/80 flex h-16 shrink-0 items-center gap-2 border-b px-4 backdrop-blur-xl transition-[width,height] ease-linear md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
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
        <ThemeToggle />
        <div ref={ref} className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="border-border flex h-8 w-8 items-center justify-center rounded-full border transition-colors hover:border-white/20"
            aria-label="Profil"
          >
            <User className="text-muted-foreground h-4 w-4" />
          </button>
          {profileOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setProfileOpen(false)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setProfileOpen(false);
                }}
                role="presentation"
              />
              <div className="border-border bg-background/95 absolute top-10 right-0 z-50 w-48 rounded-xl border p-2 shadow-xl backdrop-blur-xl">
                <div className="mb-1 border-b border-white/5 pb-2">
                  <p className="px-3 text-sm font-medium text-[#e5e1e4]">
                    Akun
                  </p>
                  <p className="px-3 text-xs text-[#8c909f]">admin@rynex.com</p>
                </div>
                <Link
                  href="/profile"
                  onClick={() => setProfileOpen(false)}
                  className="text-muted-foreground hover:text-foreground flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/5"
                >
                  <UserCircle className="h-4 w-4" />
                  Detail Profil
                </Link>
                <Link
                  href="/"
                  onClick={() => setProfileOpen(false)}
                  className="text-muted-foreground hover:text-foreground flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/5"
                >
                  <Home className="h-4 w-4" />
                  Kembali ke Home
                </Link>
                <button
                  onClick={() => setProfileOpen(false)}
                  className="text-muted-foreground hover:text-foreground flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/5"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
