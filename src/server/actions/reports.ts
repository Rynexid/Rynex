"use server";

import { eq, desc, and, or, ilike, count } from "drizzle-orm";

import { db } from "@lib/db";
import { reports } from "@lib/db";

export interface ReportResult {
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

export async function getReports(
  page = 1,
  pageSize = 10,
  search = "",
  typeFilter = "all",
  statusFilter = "all",
  userId?: string,
): Promise<ReportResult> {
  try {
    const conditions = [];

    if (userId) {
      conditions.push(eq(reports.userId, userId));
    }

    if (search) {
      conditions.push(
        or(
          ilike(reports.title, `%${search}%`),
          ilike(reports.description || "", `%${search}%`),
        ),
      );
    }

    if (typeFilter !== "all") {
      conditions.push(eq(reports.type, typeFilter));
    }

    if (statusFilter !== "all") {
      conditions.push(eq(reports.status, statusFilter));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [allReports, totalResult] = await Promise.all([
      db
        .select()
        .from(reports)
        .where(whereClause)
        .orderBy(desc(reports.createdAt))
        .limit(pageSize)
        .offset((page - 1) * pageSize),
      db.select({ count: count() }).from(reports).where(whereClause),
    ]);

    const total = totalResult[0]?.count || 0;
    const totalPages = Math.ceil(total / pageSize);

    return {
      success: true,
      data: allReports,
      pagination: { page, pageSize, total, totalPages },
    };
  } catch (error) {
    console.error("Error fetching reports:", error);
    return { success: false, error: "Failed to fetch reports" };
  }
}

export async function getReportById(id: number): Promise<ReportResult> {
  try {
    const report = await db
      .select()
      .from(reports)
      .where(eq(reports.id, id))
      .limit(1);
    if (!report[0]) {
      return { success: false, error: "Report not found" };
    }
    return { success: true, data: [report[0]] };
  } catch (error) {
    console.error("Error fetching report:", error);
    return { success: false, error: "Failed to fetch report" };
  }
}

export async function createReport(data: {
  userId: string;
  title: string;
  description?: string;
  type: string;
  config?: any;
  filters?: any;
  dateFrom?: Date;
  dateTo?: Date;
  format?: string;
}): Promise<ReportResult> {
  try {
    const newReport = await db
      .insert(reports)
      .values({
        userId: data.userId,
        title: data.title,
        description: data.description || null,
        type: data.type,
        config: data.config || {},
        filters: data.filters || {},
        dateFrom: data.dateFrom || null,
        dateTo: data.dateTo || null,
        format: data.format || "json",
        status: "draft",
      })
      .returning();
    return { success: true, data: newReport };
  } catch (error) {
    console.error("Error creating report:", error);
    return { success: false, error: "Failed to create report" };
  }
}

export async function updateReport(
  id: number,
  data: Partial<{
    title: string;
    description: string;
    type: string;
    config: any;
    filters: any;
    dateFrom: Date;
    dateTo: Date;
    format: string;
    status: string;
    resultPath: string;
    generatedAt: Date;
  }>,
): Promise<ReportResult> {
  try {
    const updatedReport = await db
      .update(reports)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(reports.id, id))
      .returning();
    return { success: true, data: updatedReport };
  } catch (error) {
    console.error("Error updating report:", error);
    return { success: false, error: "Failed to update report" };
  }
}

export async function deleteReport(id: number): Promise<ReportResult> {
  try {
    await db.delete(reports).where(eq(reports.id, id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting report:", error);
    return { success: false, error: "Failed to delete report" };
  }
}

export async function getReportTypes(): Promise<{
  success: boolean;
  data?: string[];
  error?: string;
}> {
  try {
    const types = [
      "sales",
      "revenue",
      "customers",
      "products",
      "licenses",
      "activations",
      "custom",
    ];
    return { success: true, data: types };
  } catch (error) {
    console.error("Error fetching report types:", error);
    return { success: false, error: "Failed to fetch report types" };
  }
}
