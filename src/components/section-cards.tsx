import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  trend: "up" | "down";
  description: string;
}

function StatCard({ title, value, change, trend, description }: StatCardProps) {
  const TrendIcon = trend === "up" ? IconTrendingUp : IconTrendingDown;
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {value}
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            <TrendIcon />
            {change}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {description} <TrendIcon className="size-4" />
        </div>
      </CardFooter>
    </Card>
  );
}

export function SectionCards({
  stats = [
    {
      title: "Total Revenue",
      value: "$1,250.00",
      change: "+12.5%",
      trend: "up" as const,
      description: "Trending up this month",
    },
    {
      title: "New Customers",
      value: "1,234",
      change: "-20%",
      trend: "down" as const,
      description: "Down 20% this period",
    },
    {
      title: "Active Accounts",
      value: "45,678",
      change: "+12.5%",
      trend: "up" as const,
      description: "Strong user retention",
    },
    {
      title: "Growth Rate",
      value: "4.5%",
      change: "+4.5%",
      trend: "up" as const,
      description: "Steady performance increase",
    },
  ],
}: { stats?: StatCardProps[] } = {}) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
