"use client";

import { type LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@rynex/ui/card";

type StatCardProps = {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: { value: string; positive: boolean };
  iconColor?: string;
};

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  iconColor = "text-[#adc6ff]",
}: StatCardProps) {
  return (
    <Card className="border-border/50 bg-[#111113] transition-all hover:border-[#27272A]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-[11px] font-medium tracking-wider text-[#8c909f] uppercase">
          {title}
        </CardTitle>
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${iconColor}15` }}
        >
          <Icon className="h-4 w-4" color={iconColor} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-lg font-bold text-[#e5e1e4]">{value}</div>
        {trend && (
          <p
            className={`text-xs ${
              trend.positive ? "text-[#4ae176]" : "text-[#ffb4ab]"
            }`}
          >
            {trend.value} dari bulan lalu
          </p>
        )}
      </CardContent>
    </Card>
  );
}
