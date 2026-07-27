import { count, eq, sql, sum } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@rynex/db";
import { licenses, orders, products, users } from "@rynex/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [licenseRows, orderRows, productRows, userRows] = await Promise.all([
      db.select().from(licenses),
      db.select().from(orders),
      db.select().from(products),
      db.select({ value: count() }).from(users),
    ]);

    const allOrders = orderRows;
    const allLicenses = licenseRows;
    const totalUsers = userRows[0]?.value ?? 0;
    const totalProducts = productRows.length;

    const totalRevenue = allOrders
      .filter((o) => o.paymentStatus === "paid")
      .reduce((sum_, o) => sum_ + o.amount, 0);

    const activeLicenses = allLicenses.filter(
      (l) => l.status === "active",
    ).length;
    const pendingActivations = allLicenses.filter(
      (l) => l.status === "inactive",
    ).length;
    const failedVerifications = allLicenses.filter(
      (l) => l.status === "suspended" || l.status === "revoked",
    ).length;

    // Revenue by month (last 6 months)
    const now = new Date();
    const revenueByMonth: { month: string; revenue: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthStr = d.toLocaleString("en-US", {
        month: "short",
        year: "2-digit",
      });
      const monthPaidOrders = allOrders.filter((o) => {
        if (o.paymentStatus !== "paid" || !o.purchasedAt) return false;
        const od = new Date(o.purchasedAt);
        return (
          od.getMonth() === d.getMonth() && od.getFullYear() === d.getFullYear()
        );
      });
      revenueByMonth.push({
        month: monthStr,
        revenue: monthPaidOrders.reduce((s, o) => s + o.amount, 0),
      });
    }

    // License by status
    const statusMap = new Map<string, number>();
    for (const l of allLicenses) {
      const s = l.status || "unknown";
      statusMap.set(s, (statusMap.get(s) || 0) + 1);
    }
    const licenseByStatus = Array.from(statusMap.entries()).map(
      ([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
      }),
    );
    if (licenseByStatus.length === 0) {
      licenseByStatus.push({ name: "No data", value: 0 });
    }

    // Top products by order count
    const productOrderMap = new Map<
      number,
      { name: string; orders: number; revenue: number }
    >();
    for (const o of allOrders) {
      if (!o.productId) continue;
      const entry = productOrderMap.get(o.productId) || {
        name: `Product #${o.productId}`,
        orders: 0,
        revenue: 0,
      };
      entry.orders += 1;
      if (o.paymentStatus === "paid") entry.revenue += o.amount;
      productOrderMap.set(o.productId, entry);
    }
    // Merge product names
    for (const p of productRows) {
      const entry = productOrderMap.get(p.id);
      if (entry) entry.name = p.name;
    }
    const topProducts = Array.from(productOrderMap.values())
      .sort((a, b) => b.orders - a.orders)
      .slice(0, 5);

    // Recent orders
    const recentOrders = allOrders
      .sort((a, b) => {
        if (!a.purchasedAt || !b.purchasedAt) return 0;
        return (
          new Date(b.purchasedAt).getTime() - new Date(a.purchasedAt).getTime()
        );
      })
      .slice(0, 5)
      .map((o) => {
        const prod = productRows.find((p) => p.id === o.productId);
        return {
          id: o.id,
          customer: o.customerEmail,
          product: prod?.name || `Product #${o.productId}`,
          amount: o.amount,
          status: o.paymentStatus,
          date: o.purchasedAt
            ? new Date(o.purchasedAt).toLocaleDateString("id-ID")
            : "-",
        };
      });

    return NextResponse.json({
      totalRevenue,
      totalOrders: allOrders.length,
      totalLicenses: allLicenses.length,
      activeLicenses,
      totalProducts,
      totalUsers,
      failedVerifications,
      pendingActivations,
      revenueByMonth,
      licenseByStatus,
      topProducts,
      recentOrders,
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json(
      { error: "Gagal memuat data dashboard" },
      { status: 500 },
    );
  }
}
