import { type LucideIcon } from "lucide-react";

import { cn } from "@rynex/utils";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: { value: string; positive: boolean };
  iconColor?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  iconColor = "text-primary",
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-[#27272A] bg-[#111113] p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium text-[#c2c6d6]">{title}</span>
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg",
            iconColor === "text-primary" && "bg-[rgba(173,198,255,0.1)]",
            iconColor === "text-[#4ae176]" && "bg-[rgba(74,225,118,0.1)]",
            iconColor === "text-[#ffb95f]" && "bg-[rgba(255,185,95,0.1)]",
            iconColor === "text-[#ffb4ab]" && "bg-[rgba(255,180,171,0.1)]",
          )}
        >
          <Icon className={cn("h-5 w-5", iconColor)} />
        </div>
      </div>
      <div className="text-2xl font-semibold text-[#e5e1e4]">{value}</div>
      {trend && (
        <div className="mt-2 flex items-center gap-1">
          <svg
            className={cn(
              "h-4 w-4",
              trend.positive ? "text-[#4ae176]" : "text-[#ffb4ab]",
            )}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {trend.positive ? (
              <path d="m5 12 7-7 7 7" />
            ) : (
              <path d="m5 12 7 7 7-7" />
            )}
          </svg>
          <span
            className={cn(
              "text-xs font-medium",
              trend.positive ? "text-[#4ae176]" : "text-[#ffb4ab]",
            )}
          >
            {trend.value}
          </span>
        </div>
      )}
    </div>
  );
}
