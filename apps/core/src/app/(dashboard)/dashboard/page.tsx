"use client";

import {
  AlertTriangle,
  DollarSign,
  Key,
  type LucideIcon,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  LicenseStatusChart,
  ProductsBarChart,
  RevenueChart,
} from "@/components/dashboard/charts";
import { GlassPanel } from "@/components/pos/glass-panel";
import { StatCard } from "@/components/pos/stat-card";
import { StatusBadge } from "@/components/pos/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@rynex/ui/card";

type DashboardData = {
  totalRevenue: number;
  totalOrders: number;
  totalLicenses: number;
  activeLicenses: number;
  totalProducts: number;
  totalUsers: number;
  failedVerifications: number;
  pendingActivations: number;
  revenueByMonth: { month: string; revenue: number }[];
  licenseByStatus: { name: string; value: number }[];
  topProducts: { name: string; orders: number; revenue: number }[];
  recentOrders: {
    id: number;
    customer: string;
    product: string;
    amount: number;
    status: string;
    date: string;
  }[];
};

const transactions = [
  {
    id: "INV-001",
    client: "Lumina Tech",
    service: "UI/UX Design",
    status: "paid" as const,
    amount: "$2,400",
    date: "Today",
    avatar: "LT",
  },
  {
    id: "INV-002",
    client: "Nexus Cloud",
    service: "Web Development",
    status: "pending" as const,
    amount: "$4,200",
    date: "Yesterday",
    avatar: "NC",
  },
  {
    id: "INV-003",
    client: "BioTech Org",
    service: "Brand Identity",
    status: "paid" as const,
    amount: "$1,800",
    date: "2 days ago",
    avatar: "BO",
  },
  {
    id: "INV-004",
    client: "Vanguard Cap",
    service: "App Development",
    status: "overdue" as const,
    amount: "$6,300",
    date: "3 days ago",
    avatar: "VC",
  },
  {
    id: "INV-005",
    client: "GreenLeaf Co",
    service: "SEO Optimization",
    status: "paid" as const,
    amount: "$960",
    date: "5 days ago",
    avatar: "GC",
  },
];

const deadlines = [
  {
    title: "Lumina SaaS Brand Identity",
    client: "Lumina Tech",
    priority: "high" as const,
    date: "Oct 24",
  },
  {
    title: "Vanguard Dashboard Redesign",
    client: "Vanguard Capital",
    priority: "medium" as const,
    date: "Nov 12",
  },
  {
    title: "Payment Gateway Integration",
    client: "Nexus Cloud",
    priority: "low" as const,
    date: "Nov 18",
  },
];

const activities = [
  {
    action: "New project created",
    detail: "BioTech Landing Page",
    time: "2 hours ago",
    color: "bg-[#adc6ff]",
  },
  {
    action: "Invoice paid",
    detail: "INV-001 — $2,400",
    time: "4 hours ago",
    color: "bg-[#4ae176]",
  },
  {
    action: "Project milestone reached",
    detail: "Lumina Brand — 65% complete",
    time: "6 hours ago",
    color: "bg-[#ffb95f]",
  },
  {
    action: "New client onboarded",
    detail: "Vanguard Capital",
    time: "Yesterday",
    color: "bg-[#adc6ff]",
  },
];

const popularServices = [
  { name: "Web Development", orders: 28, growth: "+12%", positive: true },
  { name: "UI/UX Design", orders: 22, growth: "+8%", positive: true },
  { name: "Mobile Apps", orders: 15, growth: "-3%", positive: false },
  { name: "Brand Identity", orders: 12, growth: "+15%", positive: true },
];

const revenueBarData = [
  { month: "May", value: 40 },
  { month: "Jun", value: 55 },
  { month: "Jul", value: 35 },
  { month: "Aug", value: 70 },
  { month: "Sep", value: 50 },
  { month: "Oct", value: 85, active: true },
];

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [todos, setTodos] = useState([
    { id: 1, task: "Review Lumina Brand Identity draft", done: false },
    { id: 2, task: "Send invoice to Nexus Cloud", done: false },
    { id: 3, task: "Schedule team standup meeting", done: true },
    { id: 4, task: "Update project timeline for BioTech", done: false },
  ]);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  return (
    <div className="flex-1 space-y-6 p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#e5e1e4]">Dashboard</h1>
          <p className="mt-1 text-sm text-[#c2c6d6]">
            Track your agency performance and metrics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded-lg border border-[#27272A] px-4 py-2 text-sm font-medium text-[#c2c6d6] transition-all hover:bg-[#1c1b1d]">
            Past 30 Days
          </button>
          <button className="rounded-lg bg-[#adc6ff] px-4 py-2 text-sm font-bold text-[#002e6a] transition-all hover:opacity-90">
            Export Report
          </button>
        </div>
      </div>

      {/* Top stat cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Today's Revenue"
          value={
            data ? `Rp ${data.totalRevenue.toLocaleString("id-ID")}` : "$12,430"
          }
          icon={DollarSign}
          trend={{ value: "+8.2%", positive: true }}
        />
        <StatCard
          title="Active Orders"
          value={data ? data.totalOrders.toString() : "24"}
          icon={ShoppingCart}
          trend={{ value: "+3.1%", positive: true }}
          iconColor="text-[#4ae176]"
        />
        <StatCard
          title="Total Licenses"
          value={data ? data.totalLicenses.toString() : "18"}
          icon={Key}
          trend={{ value: "+12.5%", positive: true }}
          iconColor="text-[#ffb95f]"
        />
        <StatCard
          title="Bermasalah"
          value={data ? data.failedVerifications.toString() : "$8,240"}
          icon={AlertTriangle}
          trend={{ value: "-2.4%", positive: false }}
          iconColor="text-[#ffb4ab]"
        />
      </div>

      {/* System stats row */}
      {data && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SystemStat
            icon={Package}
            label="Produk"
            value={data.totalProducts.toString()}
            color="#60a5fa"
          />
          <SystemStat
            icon={Users}
            label="Pengguna"
            value={data.totalUsers.toString()}
            color="#f59e0b"
          />
          <SystemStat
            icon={Key}
            label="Lisensi Aktif"
            value={`${data.activeLicenses}`}
            color="#4ae176"
          />
          <SystemStat
            icon={AlertTriangle}
            label="Pending Aktivasi"
            value={data.pendingActivations.toString()}
            color="#ffb95f"
          />
        </div>
      )}

      {/* Charts */}
      {data && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RevenueChart data={data.revenueByMonth} />
          </div>
          <LicenseStatusChart data={data.licenseByStatus} />
        </div>
      )}

      {/* Transactions + Deadlines + Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <GlassPanel className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#e5e1e4]">
              Recent Transactions
            </h2>
            <button className="text-sm font-medium text-[#adc6ff] transition-all hover:opacity-80">
              View All
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#27272A]">
                {[
                  "Invoice",
                  "Client",
                  "Service",
                  "Status",
                  "Amount",
                  "Date",
                ].map((h) => (
                  <th
                    key={h}
                    className={`px-3 py-3 text-left text-xs font-semibold tracking-wider text-[#c2c6d6] uppercase ${h === "Amount" || h === "Date" ? "text-right" : ""}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272A]/50">
              {transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="transition-colors hover:bg-[rgba(32,31,34,0.3)]"
                >
                  <td className="px-3 py-4 text-sm font-medium text-[#adc6ff]">
                    {tx.id}
                  </td>
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#353437] text-xs font-bold text-[#e5e1e4]">
                        {tx.avatar}
                      </div>
                      <span className="text-sm text-[#e5e1e4]">
                        {tx.client}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-sm text-[#c2c6d6]">
                    {tx.service}
                  </td>
                  <td className="px-3 py-4">
                    <StatusBadge variant={tx.status} />
                  </td>
                  <td className="px-3 py-4 text-right text-sm font-semibold text-[#e5e1e4]">
                    {tx.amount}
                  </td>
                  <td className="px-3 py-4 text-right text-sm text-[#c2c6d6]">
                    {tx.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassPanel>

        <div className="space-y-6">
          <GlassPanel>
            <h2 className="mb-4 text-lg font-semibold text-[#e5e1e4]">
              Upcoming Deadlines
            </h2>
            <div className="space-y-3">
              {deadlines.map((item, i) => (
                <div
                  key={i}
                  className={`rounded-lg border-l-4 bg-[#1c1b1d] p-4 ${item.priority === "high" ? "border-l-[#ffb4ab]" : item.priority === "medium" ? "border-l-[#ffb95f]" : "border-l-[#adc6ff]"}`}
                >
                  <div className="mb-1 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-[#e5e1e4]">
                      {item.title}
                    </h3>
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${item.priority === "high" ? "bg-[rgba(255,180,171,0.1)] text-[#ffb4ab]" : item.priority === "medium" ? "bg-[rgba(255,185,95,0.1)] text-[#ffb95f]" : "bg-[rgba(173,198,255,0.1)] text-[#adc6ff]"}`}
                    >
                      {item.priority}
                    </span>
                  </div>
                  <p className="text-xs text-[#c2c6d6]">{item.client}</p>
                  <p className="mt-1 text-xs font-medium text-[#adc6ff]">
                    {item.date}
                  </p>
                </div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel>
            <h2 className="mb-4 text-lg font-semibold text-[#e5e1e4]">
              Activity Feed
            </h2>
            <div className="space-y-4">
              {activities.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="relative flex flex-col items-center">
                    <div
                      className={`mt-1.5 h-2.5 w-2.5 rounded-full ${item.color}`}
                    />
                    {i < activities.length - 1 && (
                      <div className="mt-1 h-full w-px bg-[#27272A]" />
                    )}
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-medium text-[#e5e1e4]">
                      {item.action}
                    </p>
                    <p className="text-xs text-[#c2c6d6]">{item.detail}</p>
                    <p className="mt-0.5 text-[10px] text-[#8c909f]">
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </div>

      {/* Revenue Analytics + Popular Services + Top Products */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <GlassPanel className="lg:col-span-2">
          <h2 className="mb-6 text-lg font-semibold text-[#e5e1e4]">
            Revenue Analytics
          </h2>
          <div className="flex items-end justify-between gap-3">
            {revenueBarData.map((item) => (
              <div
                key={item.month}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <span className="text-xs text-[#c2c6d6]">{item.value}%</span>
                <div
                  className={`w-full rounded ${item.active ? "bg-[#adc6ff]" : "bg-[#353437]"}`}
                  style={{ height: `${item.value * 2}px` }}
                />
                <span className="text-xs text-[#c2c6d6]">{item.month}</span>
              </div>
            ))}
          </div>
        </GlassPanel>

        <div className="space-y-6">
          <GlassPanel>
            <h2 className="mb-4 text-lg font-semibold text-[#e5e1e4]">
              Popular Services
            </h2>
            <div className="space-y-4">
              {popularServices.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b border-[#27272A]/50 pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="text-sm font-medium text-[#e5e1e4]">
                      {item.name}
                    </p>
                    <p className="text-xs text-[#c2c6d6]">
                      {item.orders} orders
                    </p>
                  </div>
                  <span
                    className={`text-xs font-medium ${item.positive ? "text-[#4ae176]" : "text-[#ffb4ab]"}`}
                  >
                    {item.growth}
                  </span>
                </div>
              ))}
            </div>
          </GlassPanel>

          {data && data.topProducts.length > 0 && (
            <ProductsBarChart data={data.topProducts} />
          )}
        </div>
      </div>

      {/* Recent Orders (from DB) */}
      {data && data.recentOrders.length > 0 && (
        <Card className="border-border/50 bg-[#111113]">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-[#e5e1e4]">
              Pesanan Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data.recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="border-border/30 flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[#e5e1e4]">
                      {order.product}
                    </p>
                    <p className="text-xs text-[#8c909f]">{order.customer}</p>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-sm font-semibold text-[#e5e1e4]">
                      Rp {order.amount.toLocaleString("id-ID")}
                    </p>
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${order.status === "paid" ? "bg-[rgba(74,225,118,0.1)] text-[#4ae176]" : order.status === "pending" ? "bg-[rgba(255,185,95,0.1)] text-[#ffb95f]" : "bg-[rgba(255,180,171,0.1)] text-[#ffb4ab]"}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* To-do List */}
      <GlassPanel>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#e5e1e4]">To-Do</h2>
          <span className="text-xs text-[#8c909f]">
            {todos.filter((t) => t.done).length}/{todos.length} done
          </span>
        </div>
        <div className="space-y-2">
          {todos.map((todo) => (
            <button
              key={todo.id}
              onClick={() =>
                setTodos((prev) =>
                  prev.map((t) =>
                    t.id === todo.id ? { ...t, done: !t.done } : t,
                  ),
                )
              }
              className="flex w-full items-center gap-3 rounded-lg border border-[#27272A] px-4 py-3 text-left transition-all hover:border-[#353437]"
            >
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${todo.done ? "border-[#4ae176] bg-[#4ae176]" : "border-[#353437]"}`}
              >
                {todo.done && (
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#09090B"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m5 12 5 5 9-9" />
                  </svg>
                )}
              </div>
              <span
                className={`text-sm transition-all ${todo.done ? "text-[#8c909f] line-through" : "text-[#e5e1e4]"}`}
              >
                {todo.task}
              </span>
            </button>
          ))}
        </div>
      </GlassPanel>

      {/* New Clients */}
      <GlassPanel>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#e5e1e4]">New Clients</h2>
          <button className="text-sm font-medium text-[#adc6ff] transition-all hover:opacity-80">
            View All
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {[
            { name: "Lumina Tech", initials: "LT", projects: 3 },
            { name: "Nexus Cloud", initials: "NC", projects: 2 },
            { name: "BioTech Org", initials: "BO", projects: 5 },
            { name: "Vanguard Cap", initials: "VC", projects: 1 },
            { name: "GreenLeaf Co", initials: "GC", projects: 4 },
          ].map((client) => (
            <div
              key={client.initials}
              className="flex shrink-0 flex-col items-center gap-2 rounded-xl border border-[#27272A] bg-[#111113] p-4"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#353437] text-lg font-bold text-[#adc6ff]">
                {client.initials}
              </div>
              <p className="text-sm font-medium text-[#e5e1e4]">
                {client.name}
              </p>
              <span className="rounded-full bg-[rgba(173,198,255,0.1)] px-2 py-0.5 text-[10px] font-bold text-[#adc6ff]">
                {client.projects} Projects
              </span>
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}

function SystemStat({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <Card className="border-border/50 bg-[#111113] transition-all hover:border-[#27272A]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-[11px] font-medium tracking-wider text-[#8c909f] uppercase">
          {label}
        </CardTitle>
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon className="h-4 w-4" color={color} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-lg font-bold text-[#e5e1e4]">{value}</div>
      </CardContent>
    </Card>
  );
}
