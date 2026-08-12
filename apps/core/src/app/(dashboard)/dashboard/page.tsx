"use client";

import { AlertTriangle, DollarSign, Key, Package, ShoppingCart, Users } from "lucide-react";
import { useEffect, useState } from "react";

import {
  LicenseStatusChart,
  ProductsBarChart,
  RevenueChart,
} from "@/components/dashboard/charts";
import { StatCard } from "@/components/dashboard/stat-card";
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

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#e5e1e4]">Dashboard</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Overview sistem dan metrik bisnis RYNEX
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Pendapatan"
          value={
            data ? `Rp ${data.totalRevenue.toLocaleString("id-ID")}` : "Rp 12.430.000"
          }
          icon={DollarSign}
          trend={{ value: "+8.2%", positive: true }}
        />
        <StatCard
          title="Pesanan Aktif"
          value={data ? data.totalOrders.toString() : "24"}
          icon={ShoppingCart}
          trend={{ value: "+3.1%", positive: true }}
          iconColor="text-[#4ae176]"
        />
        <StatCard
          title="Total Lisensi"
          value={data ? data.totalLicenses.toString() : "18"}
          icon={Key}
          trend={{ value: "+12.5%", positive: true }}
          iconColor="text-[#ffb95f]"
        />
        <StatCard
          title="Gagal Verifikasi"
          value={data ? data.failedVerifications.toString() : "3"}
          icon={AlertTriangle}
          trend={{ value: "-2.4%", positive: false }}
          iconColor="text-[#ffb4ab]"
        />
      </div>

      {data && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Produk"
            value={data.totalProducts.toString()}
            icon={Package}
            iconColor="#60a5fa"
          />
          <StatCard
            title="Pengguna"
            value={data.totalUsers.toString()}
            icon={Users}
            iconColor="#f59e0b"
          />
          <StatCard
            title="Lisensi Aktif"
            value={data.activeLicenses.toString()}
            icon={Key}
            iconColor="#4ae176"
          />
          <StatCard
            title="Pending Aktivasi"
            value={data.pendingActivations.toString()}
            icon={AlertTriangle}
            iconColor="#ffb95f"
          />
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="border-border/50 bg-[#111113] lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-[#e5e1e4]">
              Ringkasan Bisnis
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data && (
              <div className="h-64 w-full">
                <RevenueChart data={data.revenueByMonth} />
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-[#111113]">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-[#e5e1e4]">
              Status Lisensi
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data && (
              <div className="h-64 w-full">
                <LicenseStatusChart data={data.licenseByStatus} />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="border-border/50 bg-[#111113] lg:col-span-2">
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-sm font-semibold text-[#e5e1e4]">
              Transaksi Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-x-auto">
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
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${tx.status === "paid" ? "bg-[rgba(74,225,118,0.1)] text-[#4ae176]" : tx.status === "pending" ? "bg-[rgba(255,185,95,0.1)] text-[#ffb95f]" : "bg-[rgba(255,180,171,0.1)] text-[#ffb4ab]"}`}
                        >
                          {tx.status}
                        </span>
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
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border-border/50 bg-[#111113]">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-[#e5e1e4]">
                Produk Terpopuler
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data && data.topProducts.length > 0 ? (
                <div className="h-64 w-full">
                  <ProductsBarChart data={data.topProducts} />
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">Belum ada data</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

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
    </div>
  );
}
