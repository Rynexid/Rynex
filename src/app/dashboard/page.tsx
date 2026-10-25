"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [data, setData] = useState<{ totalRevenue: number; totalOrders: number; totalLicenses: number; activeLicenses: number; totalProducts: number; totalUsers: number; failedVerifications: number; pendingActivations: number } | null>(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  return (
    <div className="flex-1 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#e5e1e4]">Dashboard</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Overview sistem dan metrik bisnis RYNEX
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard title="Total Pendapatan" value={data ? `Rp ${data.totalRevenue.toLocaleString("id-ID")}` : "Rp 12.430.000"} />
        <DashboardCard title="Pesanan Aktif" value={data ? data.totalOrders.toString() : "24"} />
        <DashboardCard title="Total Lisensi" value={data ? data.totalLicenses.toString() : "18"} />
        <DashboardCard title="Gagal Verifikasi" value={data ? data.failedVerifications.toString() : "3"} />
      </div>

      {data && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardCard title="Produk" value={data.totalProducts.toString()} />
          <DashboardCard title="Pengguna" value={data.totalUsers.toString()} />
          <DashboardCard title="Lisensi Aktif" value={data.activeLicenses.toString()} />
          <DashboardCard title="Pending Aktivasi" value={data.pendingActivations.toString()} />
        </div>
      )}
    </div>
  );
}

function DashboardCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <p className="text-muted-foreground text-xs uppercase tracking-wider">{title}</p>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
