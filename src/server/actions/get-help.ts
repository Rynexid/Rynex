"use server";

import { eq, desc, and, or, ilike, count } from "drizzle-orm";

import { db } from "@lib/db";
import { supportTickets } from "@lib/db";
import { auth } from "@lib/auth";

export interface SupportTicketResult {
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

export async function getSupportTickets(
  page = 1,
  pageSize = 10,
  search = "",
  statusFilter = "all",
  priorityFilter = "all",
  userId?: string,
): Promise<SupportTicketResult> {
  try {
    const conditions = [];

    if (userId) {
      conditions.push(eq(supportTickets.userId, userId));
    }

    if (search) {
      conditions.push(
        or(
          ilike(supportTickets.subject, `%${search}%`),
          ilike(supportTickets.message, `%${search}%`),
        ),
      );
    }

    if (statusFilter !== "all") {
      conditions.push(eq(supportTickets.status, statusFilter));
    }

    if (priorityFilter !== "all") {
      conditions.push(eq(supportTickets.priority, priorityFilter));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [allTickets, totalResult] = await Promise.all([
      db
        .select()
        .from(supportTickets)
        .where(whereClause)
        .orderBy(desc(supportTickets.createdAt))
        .limit(pageSize)
        .offset((page - 1) * pageSize),
      db.select({ count: count() }).from(supportTickets).where(whereClause),
    ]);

    const total = totalResult[0]?.count || 0;
    const totalPages = Math.ceil(total / pageSize);

    return {
      success: true,
      data: allTickets,
      pagination: { page, pageSize, total, totalPages },
    };
  } catch (error) {
    console.error("Error fetching support tickets:", error);
    return { success: false, error: "Failed to fetch support tickets" };
  }
}

export async function getSupportTicketById(
  id: number,
): Promise<SupportTicketResult> {
  try {
    const ticket = await db
      .select()
      .from(supportTickets)
      .where(eq(supportTickets.id, id))
      .limit(1);
    if (!ticket[0]) {
      return { success: false, error: "Support ticket not found" };
    }
    return { success: true, data: [ticket[0]] };
  } catch (error) {
    console.error("Error fetching support ticket:", error);
    return { success: false, error: "Failed to fetch support ticket" };
  }
}

export async function createSupportTicket(data: {
  userId: string;
  subject: string;
  message: string;
  priority?: string;
}): Promise<SupportTicketResult> {
  try {
    const newTicket = await db
      .insert(supportTickets)
      .values({
        userId: data.userId,
        subject: data.subject,
        message: data.message,
        priority: data.priority || "medium",
        status: "open",
      })
      .returning();
    return { success: true, data: newTicket };
  } catch (error) {
    console.error("Error creating support ticket:", error);
    return { success: false, error: "Failed to create support ticket" };
  }
}

export async function updateSupportTicket(
  id: number,
  data: Partial<{
    subject: string;
    message: string;
    status: string;
    priority: string;
  }>,
): Promise<SupportTicketResult> {
  try {
    const updatedTicket = await db
      .update(supportTickets)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(supportTickets.id, id))
      .returning();
    return { success: true, data: updatedTicket };
  } catch (error) {
    console.error("Error updating support ticket:", error);
    return { success: false, error: "Failed to update support ticket" };
  }
}

export async function deleteSupportTicket(
  id: number,
): Promise<SupportTicketResult> {
  try {
    await db.delete(supportTickets).where(eq(supportTickets.id, id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting support ticket:", error);
    return { success: false, error: "Failed to delete support ticket" };
  }
}

export async function getUserSupportTickets(): Promise<SupportTicketResult> {
  try {
    const session = await auth.api.getSession();
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    return getSupportTickets(1, 20, "", "all", "all", session.user.id);
  } catch (error) {
    console.error("Error fetching user support tickets:", error);
    return { success: false, error: "Failed to fetch user support tickets" };
  }
}
