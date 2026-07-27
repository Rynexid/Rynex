import type { ReactNode } from "react";

import { cn } from "@rynex/utils";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
}

export function GlassPanel({ children, className }: GlassPanelProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[#27272A] bg-[rgba(17,17,19,0.8)] p-6 backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}
