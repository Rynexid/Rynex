"use server";

import { eq, desc, and, or, ilike, count } from "drizzle-orm";

import { db } from "@lib/db";
import { inquiries } from "@lib/db";

export interface InquiryResult {
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

export async function getInquiries(
  page = 1,
  pageSize = 10,
  search = "",
  statusFilter = "all",
  priorityFilter = "all",
  serviceFilter = "all",
): Promise<InquiryResult> {
  try {
    const conditions = [];

    if (search) {
      conditions.push(
        or(
          ilike(inquiries.name, `%${search}%`),
          ilike(inquiries.email, `%${search}%`),
          ilike(inquiries.subject, `%${search}%`),
        ),
      );
    }

    if (statusFilter !== "all") {
      conditions.push(eq(inquiries.status, statusFilter));
    }

    if (priorityFilter !== "all") {
      conditions.push(eq(inquiries.priority, priorityFilter));
    }

    if (serviceFilter !== "all") {
      conditions.push(eq(inquiries.service, serviceFilter));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [allInquiries, totalResult] = await Promise.all([
      db
        .select()
        .from(inquiries)
        .where(whereClause)
        .orderBy(desc(inquiries.createdAt))
        .limit(pageSize)
        .offset((page - 1) * pageSize),
      db.select({ count: count() }).from(inquiries).where(whereClause),
    ]);

    const total = totalResult[0]?.count || 0;
    const totalPages = Math.ceil(total / pageSize);

    return {
      success: true,
      data: allInquiries,
      pagination: { page, pageSize, total, totalPages },
    };
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return { success: false, error: "Failed to fetch inquiries" };
  }
}

export async function getInquiryById(id: number): Promise<InquiryResult> {
  try {
    const inquiry = await db
      .select()
      .from(inquiries)
      .where(eq(inquiries.id, id))
      .limit(1);
    if (!inquiry[0]) {
      return { success: false, error: "Inquiry not found" };
    }
    return { success: true, data: [inquiry[0]] };
  } catch (error) {
    console.error("Error fetching inquiry:", error);
    return { success: false, error: "Failed to fetch inquiry" };
  }
}

export async function createInquiry(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  service?: string;
  status?: string;
  priority?: string;
}): Promise<InquiryResult> {
  try {
    const newInquiry = await db
      .insert(inquiries)
      .values({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject,
        message: data.message,
        service: data.service || null,
        status: data.status || "open",
        priority: data.priority || "medium",
      })
      .returning();
    return { success: true, data: newInquiry };
  } catch (error) {
    console.error("Error creating inquiry:", error);
    return { success: false, error: "Failed to create inquiry" };
  }
}

export async function updateInquiry(
  id: number,
  data: Partial<{
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    service: string;
    status: string;
    priority: string;
    resolvedAt: Date;
  }>,
): Promise<InquiryResult> {
  try {
    const updatedInquiry = await db
      .update(inquiries)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(inquiries.id, id))
      .returning();
    return { success: true, data: updatedInquiry };
  } catch (error) {
    console.error("Error updating inquiry:", error);
    return { success: false, error: "Failed to update inquiry" };
  }
}

export async function deleteInquiry(id: number): Promise<InquiryResult> {
  try {
    await db.delete(inquiries).where(eq(inquiries.id, id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return { success: false, error: "Failed to delete inquiry" };
  }
}
