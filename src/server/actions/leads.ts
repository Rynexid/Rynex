"use server";

import { eq, desc, and, or, ilike, count } from "drizzle-orm";

import { db } from "@lib/db";
import { leads } from "@lib/db";

export interface LeadResult {
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

export async function getLeads(
  page = 1,
  pageSize = 10,
  search = "",
  statusFilter = "all",
  sourceFilter = "all",
): Promise<LeadResult> {
  try {
    const conditions = [];

    if (search) {
      conditions.push(
        or(
          ilike(leads.name, `%${search}%`),
          ilike(leads.email, `%${search}%`),
          ilike(leads.company || "", `%${search}%`),
        ),
      );
    }

    if (statusFilter !== "all") {
      conditions.push(eq(leads.status, statusFilter));
    }

    if (sourceFilter !== "all") {
      conditions.push(eq(leads.source, sourceFilter));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [allLeads, totalResult] = await Promise.all([
      db
        .select()
        .from(leads)
        .where(whereClause)
        .orderBy(desc(leads.createdAt))
        .limit(pageSize)
        .offset((page - 1) * pageSize),
      db.select({ count: count() }).from(leads).where(whereClause),
    ]);

    const total = totalResult[0]?.count || 0;
    const totalPages = Math.ceil(total / pageSize);

    return {
      success: true,
      data: allLeads,
      pagination: { page, pageSize, total, totalPages },
    };
  } catch (error) {
    console.error("Error fetching leads:", error);
    return { success: false, error: "Failed to fetch leads" };
  }
}

export async function getLeadById(id: number): Promise<LeadResult> {
  try {
    const lead = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
    if (!lead[0]) {
      return { success: false, error: "Lead not found" };
    }
    return { success: true, data: [lead[0]] };
  } catch (error) {
    console.error("Error fetching lead:", error);
    return { success: false, error: "Failed to fetch lead" };
  }
}

export async function createLead(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source?: string;
  status?: string;
  value?: number;
  assignedTo?: string;
  notes?: string;
}): Promise<LeadResult> {
  try {
    const newLead = await db
      .insert(leads)
      .values({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        source: data.source || "website",
        status: data.status || "new",
        value: data.value || 0,
        assignedTo: data.assignedTo || null,
        notes: data.notes || null,
      })
      .returning();
    return { success: true, data: newLead };
  } catch (error) {
    console.error("Error creating lead:", error);
    return { success: false, error: "Failed to create lead" };
  }
}

export async function updateLead(
  id: number,
  data: Partial<{
    name: string;
    email: string;
    phone: string;
    company: string;
    source: string;
    status: string;
    value: number;
    assignedTo: string;
    notes: string;
  }>,
): Promise<LeadResult> {
  try {
    const updatedLead = await db
      .update(leads)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(leads.id, id))
      .returning();
    return { success: true, data: updatedLead };
  } catch (error) {
    console.error("Error updating lead:", error);
    return { success: false, error: "Failed to update lead" };
  }
}

export async function deleteLead(id: number): Promise<LeadResult> {
  try {
    await db.delete(leads).where(eq(leads.id, id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting lead:", error);
    return { success: false, error: "Failed to delete lead" };
  }
}
