"use server";

import { eq, desc, and, or, ilike, count, sql } from "drizzle-orm";

import { db } from "@lib/db";
import {
  products,
  licenses,
  orders,
  customerProfiles,
  supportTickets,
  lifecycleStages,
  leads,
  inquiries,
  services,
  content,
} from "@lib/db";

export interface SearchResult {
  success: boolean;
  data?: any[];
  error?: string;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export async function globalSearch(
  query: string,
  page = 1,
  pageSize = 10,
  types: string[] = ["all"],
): Promise<SearchResult> {
  try {
    if (!query.trim()) {
      return {
        success: true,
        data: [],
        pagination: { page, pageSize, total: 0, totalPages: 0 },
      };
    }

    const searchTerm = `%${query}%`;
    const results: any[] = [];

    // Search products
    if (types.includes("all") || types.includes("products")) {
      const prodResults = await db
        .select({
          id: products.id,
          title: products.name,
          description: products.description,
          type: sql<string>`'product'`.as("type"),
          createdAt: products.createdAt,
          url: sql<string>`'/dashboard/products'`.as("url"),
        })
        .from(products)
        .where(
          or(
            ilike(products.name, searchTerm),
            ilike(products.description || "", searchTerm),
          ),
        )
        .limit(pageSize);
      results.push(...prodResults);
    }

    // Search licenses
    if (types.includes("all") || types.includes("licenses")) {
      const licResults = await db
        .select({
          id: licenses.id,
          title: sql<string>`'License: ' || ${licenses.licenseKey}`.as("title"),
          description: licenses.status,
          type: sql<string>`'license'`.as("type"),
          createdAt: licenses.createdAt,
          url: sql<string>`'/dashboard/licenses'`.as("url"),
        })
        .from(licenses)
        .where(ilike(licenses.licenseKey, searchTerm))
        .limit(pageSize);
      results.push(...licResults);
    }

    // Search orders
    if (types.includes("all") || types.includes("orders")) {
      const ordResults = await db
        .select({
          id: orders.id,
          title: sql<string>`'Order #' || ${orders.id}`.as("title"),
          description: sql<string>`'Total: $' || ${orders.amount}`.as(
            "description",
          ),
          type: sql<string>`'order'`.as("type"),
          createdAt: orders.purchasedAt,
          url: sql<string>`'/dashboard/orders'`.as("url"),
        })
        .from(orders)
        .where(sql`CAST(${orders.id} AS TEXT) LIKE ${searchTerm}`)
        .limit(pageSize);
      results.push(...ordResults);
    }

    // Search customers
    if (types.includes("all") || types.includes("customers")) {
      const custResults = await db
        .select({
          id: customerProfiles.id,
          title: customerProfiles.company,
          description: customerProfiles.company,
          type: sql<string>`'customer'`.as("type"),
          createdAt: customerProfiles.createdAt,
          url: sql<string>`'/dashboard/team'`.as("url"),
        })
        .from(customerProfiles)
        .where(or(ilike(customerProfiles.company, searchTerm)))
        .limit(pageSize);
      results.push(...custResults);
    }

    // Search support tickets
    if (types.includes("all") || types.includes("tickets")) {
      const ticketResults = await db
        .select({
          id: supportTickets.id,
          title: supportTickets.subject,
          description: supportTickets.message,
          type: sql<string>`'ticket'`.as("type"),
          createdAt: supportTickets.createdAt,
          url: sql<string>`'/dashboard/get-help'`.as("url"),
        })
        .from(supportTickets)
        .where(
          or(
            ilike(supportTickets.subject, searchTerm),
            ilike(supportTickets.message, searchTerm),
          ),
        )
        .limit(pageSize);
      results.push(...ticketResults);
    }

    // Search lifecycle stages
    if (types.includes("all") || types.includes("lifecycle")) {
      const lifecycleResults = await db
        .select({
          id: lifecycleStages.id,
          title: lifecycleStages.name,
          description: lifecycleStages.description,
          type: sql<string>`'lifecycle'`.as("type"),
          createdAt: lifecycleStages.createdAt,
          url: sql<string>`'/dashboard/lifecycle'`.as("url"),
        })
        .from(lifecycleStages)
        .where(
          or(
            ilike(lifecycleStages.name, searchTerm),
            ilike(lifecycleStages.description || "", searchTerm),
          ),
        )
        .limit(pageSize);
      results.push(...lifecycleResults);
    }

    // Search leads
    if (types.includes("all") || types.includes("leads")) {
      const leadResults = await db
        .select({
          id: leads.id,
          title: leads.name,
          description: leads.company,
          type: sql<string>`'lead'`.as("type"),
          createdAt: leads.createdAt,
          url: sql<string>`'/dashboard/leads'`.as("url"),
        })
        .from(leads)
        .where(
          or(
            ilike(leads.name, searchTerm),
            ilike(leads.company || "", searchTerm),
            ilike(leads.email, searchTerm),
          ),
        )
        .limit(pageSize);
      results.push(...leadResults);
    }

    // Search inquiries
    if (types.includes("all") || types.includes("inquiries")) {
      const inquiryResults = await db
        .select({
          id: inquiries.id,
          title: inquiries.subject,
          description: inquiries.message,
          type: sql<string>`'inquiry'`.as("type"),
          createdAt: inquiries.createdAt,
          url: sql<string>`'/dashboard/inquiries'`.as("url"),
        })
        .from(inquiries)
        .where(
          or(
            ilike(inquiries.subject, searchTerm),
            ilike(inquiries.message, searchTerm),
            ilike(inquiries.email, searchTerm),
          ),
        )
        .limit(pageSize);
      results.push(...inquiryResults);
    }

    // Search services
    if (types.includes("all") || types.includes("services")) {
      const serviceResults = await db
        .select({
          id: services.id,
          title: services.name,
          description: services.shortDescription,
          type: sql<string>`'service'`.as("type"),
          createdAt: services.createdAt,
          url: sql<string>`'/dashboard/services'`.as("url"),
        })
        .from(services)
        .where(
          or(
            ilike(services.name, searchTerm),
            ilike(services.shortDescription || "", searchTerm),
          ),
        )
        .limit(pageSize);
      results.push(...serviceResults);
    }

    // Search content
    if (types.includes("all") || types.includes("content")) {
      const contentResults = await db
        .select({
          id: content.id,
          title: content.title,
          description: content.description,
          type: sql<string>`'content'`.as("type"),
          createdAt: content.createdAt,
          url: sql<string>`'/dashboard/content'`.as("url"),
        })
        .from(content)
        .where(
          or(
            ilike(content.title, searchTerm),
            ilike(content.description || "", searchTerm),
          ),
        )
        .limit(pageSize);
      results.push(...contentResults);
    }

    // Sort by createdAt descending
    results.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    // Paginate
    const total = results.length;
    const totalPages = Math.ceil(total / pageSize);
    const paginatedResults = results.slice(
      (page - 1) * pageSize,
      page * pageSize,
    );

    return {
      success: true,
      data: paginatedResults,
      pagination: { page, pageSize, total, totalPages },
    };
  } catch (error) {
    console.error("Error performing global search:", error);
    return { success: false, error: "Failed to perform search" };
  }
}

export async function getSearchSuggestions(
  query: string,
): Promise<{ success: boolean; data?: string[]; error?: string }> {
  try {
    if (!query.trim() || query.length < 2) {
      return { success: true, data: [] };
    }

    const searchTerm = `%${query}%`;
    const suggestions: string[] = [];

    const [
      productNames,
      licenseKeys,
      ticketSubjects,
      lifecycleNames,
      leadNames,
      inquirySubjects,
      serviceNames,
      contentTitles,
    ] = await Promise.all([
      db
        .select({ name: products.name })
        .from(products)
        .where(ilike(products.name, searchTerm))
        .limit(3),
      db
        .select({ key: licenses.licenseKey })
        .from(licenses)
        .where(ilike(licenses.licenseKey, searchTerm))
        .limit(3),
      db
        .select({ subject: supportTickets.subject })
        .from(supportTickets)
        .where(ilike(supportTickets.subject, searchTerm))
        .limit(3),
      db
        .select({ name: lifecycleStages.name })
        .from(lifecycleStages)
        .where(ilike(lifecycleStages.name, searchTerm))
        .limit(3),
      db
        .select({ name: leads.name })
        .from(leads)
        .where(ilike(leads.name, searchTerm))
        .limit(3),
      db
        .select({ subject: inquiries.subject })
        .from(inquiries)
        .where(ilike(inquiries.subject, searchTerm))
        .limit(3),
      db
        .select({ name: services.name })
        .from(services)
        .where(ilike(services.name, searchTerm))
        .limit(3),
      db
        .select({ title: content.title })
        .from(content)
        .where(ilike(content.title, searchTerm))
        .limit(3),
    ]);

    suggestions.push(...productNames.map((p) => p.name));
    suggestions.push(...licenseKeys.map((l) => l.key));
    suggestions.push(...ticketSubjects.map((t) => t.subject));
    suggestions.push(...lifecycleNames.map((l) => l.name));
    suggestions.push(...leadNames.map((l) => l.name));
    suggestions.push(...inquirySubjects.map((i) => i.subject));
    suggestions.push(...serviceNames.map((s) => s.name));
    suggestions.push(...contentTitles.map((c) => c.title));

    return { success: true, data: [...new Set(suggestions)].slice(0, 10) };
  } catch (error) {
    console.error("Error fetching search suggestions:", error);
    return { success: false, error: "Failed to fetch suggestions" };
  }
}
