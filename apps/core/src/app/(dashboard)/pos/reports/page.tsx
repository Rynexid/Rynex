import { BarChart3, DollarSign, TrendingUp, Users } from "lucide-react";

import { GlassPanel } from "@/components/pos/glass-panel";

const stats = [
  {
    label: "Total Revenue",
    value: "$84,200",
    change: "+18.2%",
    icon: DollarSign,
    color: "text-[#adc6ff]",
    positive: true,
  },
  {
    label: "Active Projects",
    value: "18",
    change: "+12.5%",
    icon: TrendingUp,
    color: "text-[#4ae176]",
    positive: true,
  },
  {
    label: "Client Retention",
    value: "94%",
    change: "+3.1%",
    icon: Users,
    color: "text-[#ffb95f]",
    positive: true,
  },
  {
    label: "Avg. Project Value",
    value: "$4,678",
    change: "-2.4%",
    icon: BarChart3,
    color: "text-[#ffb4ab]",
    positive: false,
  },
];

const monthlyData = [
  { month: "May", revenue: 18400, expenses: 12200 },
  { month: "Jun", revenue: 22100, expenses: 14800 },
  { month: "Jul", revenue: 16800, expenses: 11000 },
  { month: "Aug", revenue: 25300, expenses: 16500 },
  { month: "Sep", revenue: 21000, expenses: 13900 },
  { month: "Oct", revenue: 28600, expenses: 17800 },
];

export default function ReportsPage() {
  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue));

  return (
    <div className="flex-1 space-y-6 p-6 lg:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl font-semibold text-[#e5e1e4]">
            Reports
          </h1>
          <p className="mt-1 text-sm text-[#c2c6d6]">
            Performance analytics and insights
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select className="rounded-lg border border-[#27272A] bg-[#1c1b1d] px-3 py-2 text-sm text-[#c2c6d6] outline-none">
            <option>Last 6 Months</option>
            <option>Last 30 Days</option>
            <option>This Year</option>
          </select>
          <button className="rounded-lg bg-[#adc6ff] px-4 py-2 text-sm font-bold text-[#002e6a] hover:opacity-90">
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {stats.map((s) => (
          <GlassPanel key={s.label}>
            <div className="flex items-center justify-between">
              <p className="mb-2 text-sm text-[#c2c6d6]">{s.label}</p>
              <s.icon className={`h-4 w-4 ${s.color}`} />
            </div>
            <p className="text-2xl font-semibold text-[#e5e1e4]">{s.value}</p>
            <p
              className={`mt-1 text-xs ${s.positive ? "text-[#4ae176]" : "text-[#ffb4ab]"}`}
            >
              {s.change} vs last month
            </p>
          </GlassPanel>
        ))}
      </div>

      <GlassPanel>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#e5e1e4]">
            Revenue vs Expenses
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-[#adc6ff]" />
              <span className="text-xs text-[#c2c6d6]">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-[#353437]" />
              <span className="text-xs text-[#c2c6d6]">Expenses</span>
            </div>
          </div>
        </div>
        <div className="flex items-end justify-between gap-4">
          {monthlyData.map((d) => (
            <div
              key={d.month}
              className="flex flex-1 flex-col items-center gap-2"
            >
              <div
                className="flex w-full flex-col items-center gap-0.5"
                style={{ height: "160px" }}
              >
                <div
                  className="w-full rounded-t bg-[#adc6ff]"
                  style={{ height: `${(d.revenue / maxRevenue) * 140}px` }}
                />
                <div
                  className="w-full rounded-t bg-[#353437]"
                  style={{ height: `${(d.expenses / maxRevenue) * 100}px` }}
                />
              </div>
              <span className="text-xs text-[#c2c6d6]">{d.month}</span>
            </div>
          ))}
        </div>
      </GlassPanel>

      <div className="grid grid-cols-2 gap-6">
        <GlassPanel>
          <h2 className="mb-4 text-lg font-semibold text-[#e5e1e4]">
            Top Services
          </h2>
          <div className="space-y-3">
            {[
              { name: "Web Development", revenue: "$28,400", percentage: 34 },
              { name: "UI/UX Design", revenue: "$21,200", percentage: 25 },
              { name: "Mobile Apps", revenue: "$16,800", percentage: 20 },
              { name: "Brand Identity", revenue: "$9,600", percentage: 11 },
            ].map((s) => (
              <div key={s.name}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm text-[#e5e1e4]">{s.name}</span>
                  <span className="text-sm font-medium text-[#c2c6d6]">
                    {s.revenue}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#353437]">
                  <div
                    className="h-full rounded-full bg-[#adc6ff]"
                    style={{ width: `${s.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel>
          <h2 className="mb-4 text-lg font-semibold text-[#e5e1e4]">
            Quick Insights
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "Best Month",
                value: "October",
                detail: "$28,600 revenue",
                color: "text-[#4ae176]",
              },
              {
                title: "Avg. Project Duration",
                value: "5.2 weeks",
                detail: "Across all services",
                color: "text-[#adc6ff]",
              },
              {
                title: "Top Client",
                value: "Nexus Cloud",
                detail: "$24,800 total revenue",
                color: "text-[#ffb95f]",
              },
              {
                title: "Payment Success Rate",
                value: "92%",
                detail: "Paid within terms",
                color: "text-[#4ae176]",
              },
            ].map((insight) => (
              <div
                key={insight.title}
                className="flex items-center justify-between border-b border-[#27272A]/50 pb-4 last:border-0 last:pb-0"
              >
                <div>
                  <p className="text-xs text-[#c2c6d6]">{insight.title}</p>
                  <p className={`text-sm font-semibold ${insight.color}`}>
                    {insight.value}
                  </p>
                </div>
                <span className="text-xs text-[#8c909f]">{insight.detail}</span>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
