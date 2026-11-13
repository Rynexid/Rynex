"use server";

import { eq, desc, and, or, ilike, count } from "drizzle-orm";

import { db } from "@lib/db";
import { datasets } from "@lib/db";

export interface DatasetResult {
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

export async function getDatasets(
  page = 1,
  pageSize = 10,
  search = "",
  statusFilter = "all",
  userId?: string,
): Promise<DatasetResult> {
  try {
    const conditions = [];

    if (userId) {
      conditions.push(eq(datasets.userId, userId));
    }

    if (search) {
      conditions.push(
        or(
          ilike(datasets.name, `%${search}%`),
          ilike(datasets.description || "", `%${search}%`),
          ilike(datasets.slug, `%${search}%`),
        ),
      );
    }

    if (statusFilter !== "all") {
      conditions.push(eq(datasets.status, statusFilter));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [allDatasets, totalResult] = await Promise.all([
      db
        .select()
        .from(datasets)
        .where(whereClause)
        .orderBy(desc(datasets.createdAt))
        .limit(pageSize)
        .offset((page - 1) * pageSize),
      db.select({ count: count() }).from(datasets).where(whereClause),
    ]);

    const total = totalResult[0]?.count || 0;
    const totalPages = Math.ceil(total / pageSize);

    return {
      success: true,
      data: allDatasets,
      pagination: { page, pageSize, total, totalPages },
    };
  } catch (error) {
    console.error("Error fetching datasets:", error);
    return { success: false, error: "Failed to fetch datasets" };
  }
}

export async function getDatasetById(id: number): Promise<DatasetResult> {
  try {
    const dataset = await db
      .select()
      .from(datasets)
      .where(eq(datasets.id, id))
      .limit(1);
    if (!dataset[0]) {
      return { success: false, error: "Dataset not found" };
    }
    return { success: true, data: [dataset[0]] };
  } catch (error) {
    console.error("Error fetching dataset:", error);
    return { success: false, error: "Failed to fetch dataset" };
  }
}

export async function createDataset(data: {
  userId: string;
  name: string;
  slug: string;
  description?: string;
  source?: string;
  rowCount: number;
  columnCount: number;
  fileSize: number;
  mimeType: string;
  storagePath: string;
  schema?: any;
  previewData?: any[];
}): Promise<DatasetResult> {
  try {
    const newDataset = await db
      .insert(datasets)
      .values({
        userId: data.userId,
        name: data.name,
        slug: data.slug,
        description: data.description || null,
        source: data.source || null,
        rowCount: data.rowCount,
        columnCount: data.columnCount,
        fileSize: data.fileSize,
        mimeType: data.mimeType,
        storagePath: data.storagePath,
        schema: data.schema || {},
        previewData: data.previewData || [],
      })
      .returning();
    return { success: true, data: newDataset };
  } catch (error) {
    console.error("Error creating dataset:", error);
    return { success: false, error: "Failed to create dataset" };
  }
}

export async function updateDataset(
  id: number,
  data: Partial<{
    name: string;
    description: string;
    source: string;
    schema: any;
    previewData: any[];
    status: string;
  }>,
): Promise<DatasetResult> {
  try {
    const updatedDataset = await db
      .update(datasets)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(datasets.id, id))
      .returning();
    return { success: true, data: updatedDataset };
  } catch (error) {
    console.error("Error updating dataset:", error);
    return { success: false, error: "Failed to update dataset" };
  }
}

export async function deleteDataset(id: number): Promise<DatasetResult> {
  try {
    await db.delete(datasets).where(eq(datasets.id, id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting dataset:", error);
    return { success: false, error: "Failed to delete dataset" };
  }
}
