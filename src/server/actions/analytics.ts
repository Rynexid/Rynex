"use server";

import { eq, desc, and, or, ilike, count, sum, sql } from "drizzle-orm";

import { db } from "@lib/db";
import {
  products,
  orders,
  licenses,
  activations,
  teamMembers,
  customerProfiles,
  supportTickets,
  lifecycleStages,
  leads,
  inquiries,
  services,
  content,
} from "@lib/db";

export interface AnalyticsResult {
  success: boolean;
  data?: any;
  error?: string;
}

export async function getOverviewStats(): Promise<AnalyticsResult> {
  try {
    const [
      totalProducts,
      totalOrders,
      totalRevenue,
      totalLicenses,
      activeLicenses,
      totalActivations,
      totalTeamMembers,
      totalCustomers,
      openTickets,
      totalLifecycleStages,
      totalLeads,
      openInquiries,
    ] = await Promise.all([
      db.select({ count: count() }).from(products),
      db.select({ count: count() }).from(orders),
      db.select({ sum: sum(orders.amount) }).from(orders),
      db.select({ count: count() }).from(licenses),
      db
        .select({ count: count() })
        .from(licenses)
        .where(eq(licenses.status, "active")),
      db.select({ count: count() }).from(activations),
      db.select({ count: count() }).from(teamMembers),
      db.select({ count: count() }).from(customerProfiles),
      db
        .select({ count: count() })
        .from(supportTickets)
        .where(eq(supportTickets.status, "open")),
      db.select({ count: count() }).from(lifecycleStages),
      db.select({ count: count() }).from(leads),
      db
        .select({ count: count() })
        .from(inquiries)
        .where(eq(inquiries.status, "open")),
    ]);

    return {
      success: true,
      data: {
        totalProducts: totalProducts[0]?.count || 0,
        totalOrders: totalOrders[0]?.count || 0,
        totalRevenue: totalRevenue[0]?.sum || 0,
        totalLicenses: totalLicenses[0]?.count || 0,
        activeLicenses: activeLicenses[0]?.count || 0,
        totalActivations: totalActivations[0]?.count || 0,
        totalTeamMembers: totalTeamMembers[0]?.count || 0,
        totalCustomers: totalCustomers[0]?.count || 0,
        openTickets: openTickets[0]?.count || 0,
        totalLifecycleStages: totalLifecycleStages[0]?.count || 0,
        totalLeads: totalLeads[0]?.count || 0,
        openInquiries: openInquiries[0]?.count || 0,
      },
    };
  } catch (error) {
    console.error("Error fetching overview stats:", error);
    return { success: false, error: "Failed to fetch overview stats" };
  }
}

export async function getRevenueChartData(
  months = 12,
): Promise<AnalyticsResult> {
  try {
    const data = await db.execute(sql`
      SELECT 
        to_char(date_trunc('month', "purchased_at"), 'Mon YYYY') as month,
        COALESCE(SUM("amount"), 0) as revenue
      FROM cores.orders
      WHERE "purchased_at" >= NOW() - (INTERVAL '1 month' * ${months})
      GROUP BY date_trunc('month', "purchased_at")
      ORDER BY date_trunc('month', "purchased_at")
    `);
    return { success: true, data: data.rows };
  } catch (error) {
    console.error("Error fetching revenue chart data:", error);
    return { success: false, error: "Failed to fetch revenue chart data" };
  }
}

export async function getOrdersChartData(
  months = 12,
): Promise<AnalyticsResult> {
  try {
    const data = await db.execute(sql`
      SELECT 
        to_char(date_trunc('month', "purchased_at"), 'Mon YYYY') as month,
        COUNT(*) as orders
      FROM cores.orders
      WHERE "purchased_at" >= NOW() - (INTERVAL '1 month' * ${months})
      GROUP BY date_trunc('month', "purchased_at")
      ORDER BY date_trunc('month', "purchased_at")
    `);
    return { success: true, data: data.rows };
  } catch (error) {
    console.error("Error fetching orders chart data:", error);
    return { success: false, error: "Failed to fetch orders chart data" };
  }
}

export async function getLicenseStatusDistribution(): Promise<AnalyticsResult> {
  try {
    const data = await db.execute(sql`
      SELECT status, COUNT(*) as count
      FROM cores.licenses
      GROUP BY status
    `);
    return { success: true, data: data.rows };
  } catch (error) {
    console.error("Error fetching license status distribution:", error);
    return {
      success: false,
      error: "Failed to fetch license status distribution",
    };
  }
}

export async function getLifecycleStageDistribution(): Promise<AnalyticsResult> {
  try {
    const data = await db.execute(sql`
      SELECT stage, COUNT(*) as count
      FROM cores.lifecycle_stages
      GROUP BY stage
    `);
    return { success: true, data: data.rows };
  } catch (error) {
    console.error("Error fetching lifecycle stage distribution:", error);
    return {
      success: false,
      error: "Failed to fetch lifecycle stage distribution",
    };
  }
}

export async function getLeadSourceDistribution(): Promise<AnalyticsResult> {
  try {
    const data = await db.execute(sql`
      SELECT source, COUNT(*) as count
      FROM cores.leads
      GROUP BY source
    `);
    return { success: true, data: data.rows };
  } catch (error) {
    console.error("Error fetching lead source distribution:", error);
    return {
      success: false,
      error: "Failed to fetch lead source distribution",
    };
  }
}

export async function getTopProducts(limit = 10): Promise<AnalyticsResult> {
  try {
    const data = await db.execute(sql`
      SELECT p.name, COUNT(o.id) as order_count, COALESCE(SUM(o.amount), 0) as revenue
      FROM cores.products p
      LEFT JOIN cores.orders o ON o."product_id" = p.id
      GROUP BY p.id, p.name
      ORDER BY order_count DESC
      LIMIT ${limit}
    `);
    return { success: true, data: data.rows };
  } catch (error) {
    console.error("Error fetching top products:", error);
    return { success: false, error: "Failed to fetch top products" };
  }
}

export async function getRecentActivity(limit = 10): Promise<AnalyticsResult> {
  try {
    const [
      recentOrders,
      recentLicenses,
      recentTickets,
      recentLeads,
      recentInquiries,
    ] = await Promise.all([
      db
        .select({
          id: orders.id,
          type: sql<string>`'order'`.as("type"),
          title: sql<string>`'New Order: ' || ${orders.id}`.as("title"),
          createdAt: orders.purchasedAt,
        })
        .from(orders)
        .orderBy(desc(orders.purchasedAt))
        .limit(limit),
      db
        .select({
          id: licenses.id,
          type: sql<string>`'license'`.as("type"),
          title: sql<string>`'New License: ' || ${licenses.licenseKey}`.as(
            "title",
          ),
          createdAt: licenses.createdAt,
        })
        .from(licenses)
        .orderBy(desc(licenses.createdAt))
        .limit(limit),
      db
        .select({
          id: supportTickets.id,
          type: sql<string>`'ticket'`.as("type"),
          title: sql<string>`'New Ticket: ' || ${supportTickets.subject}`.as(
            "title",
          ),
          createdAt: supportTickets.createdAt,
        })
        .from(supportTickets)
        .orderBy(desc(supportTickets.createdAt))
        .limit(limit),
      db
        .select({
          id: leads.id,
          type: sql<string>`'lead'`.as("type"),
          title: sql<string>`'New Lead: ' || ${leads.name}`.as("title"),
          createdAt: leads.createdAt,
        })
        .from(leads)
        .orderBy(desc(leads.createdAt))
        .limit(limit),
      db
        .select({
          id: inquiries.id,
          type: sql<string>`'inquiry'`.as("type"),
          title: sql<string>`'New Inquiry: ' || ${inquiries.subject}`.as(
            "title",
          ),
          createdAt: inquiries.createdAt,
        })
        .from(inquiries)
        .orderBy(desc(inquiries.createdAt))
        .limit(limit),
    ]);

    const allActivity = [
      ...recentOrders,
      ...recentLicenses,
      ...recentTickets,
      ...recentLeads,
      ...recentInquiries,
    ]
      .filter((item) => item.createdAt)
      .sort(
        (a, b) =>
          new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime(),
      )
      .slice(0, limit);

    return { success: true, data: allActivity };
  } catch (error) {
    console.error("Error fetching recent activity:", error);
    return { success: false, error: "Failed to fetch recent activity" };
  }
}
