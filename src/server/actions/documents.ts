"use server";

import { eq, desc, and, or, ilike, count } from "drizzle-orm";

import { db } from "@lib/db";
import { documents } from "@lib/db";

export interface DocumentResult {
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

export async function getDocuments(
  page = 1,
  pageSize = 10,
  search = "",
  categoryFilter = "all",
  statusFilter = "all",
  userId?: string,
): Promise<DocumentResult> {
  try {
    const conditions = [];

    if (userId) {
      conditions.push(eq(documents.userId, userId));
    }

    if (search) {
      conditions.push(
        or(
          ilike(documents.title, `%${search}%`),
          ilike(documents.description || "", `%${search}%`),
          ilike(documents.fileName, `%${search}%`),
        ),
      );
    }

    if (categoryFilter !== "all") {
      conditions.push(eq(documents.category, categoryFilter));
    }

    if (statusFilter !== "all") {
      conditions.push(eq(documents.status, statusFilter));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [allDocuments, totalResult] = await Promise.all([
      db
        .select()
        .from(documents)
        .where(whereClause)
        .orderBy(desc(documents.createdAt))
        .limit(pageSize)
        .offset((page - 1) * pageSize),
      db.select({ count: count() }).from(documents).where(whereClause),
    ]);

    const total = totalResult[0]?.count || 0;
    const totalPages = Math.ceil(total / pageSize);

    return {
      success: true,
      data: allDocuments,
      pagination: { page, pageSize, total, totalPages },
    };
  } catch (error) {
    console.error("Error fetching documents:", error);
    return { success: false, error: "Failed to fetch documents" };
  }
}

export async function getDocumentById(id: number): Promise<DocumentResult> {
  try {
    const document = await db
      .select()
      .from(documents)
      .where(eq(documents.id, id))
      .limit(1);
    if (!document[0]) {
      return { success: false, error: "Document not found" };
    }
    return { success: true, data: [document[0]] };
  } catch (error) {
    console.error("Error fetching document:", error);
    return { success: false, error: "Failed to fetch document" };
  }
}

export async function createDocument(data: {
  userId: string;
  title: string;
  description?: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  storagePath: string;
  category?: string;
  tags?: string[];
}): Promise<DocumentResult> {
  try {
    const newDocument = await db
      .insert(documents)
      .values({
        userId: data.userId,
        title: data.title,
        description: data.description || null,
        fileName: data.fileName,
        fileSize: data.fileSize,
        mimeType: data.mimeType,
        storagePath: data.storagePath,
        category: data.category || null,
        tags: data.tags || [],
      })
      .returning();
    return { success: true, data: newDocument };
  } catch (error) {
    console.error("Error creating document:", error);
    return { success: false, error: "Failed to create document" };
  }
}

export async function updateDocument(
  id: number,
  data: Partial<{
    title: string;
    description: string;
    category: string;
    tags: string[];
    status: string;
  }>,
): Promise<DocumentResult> {
  try {
    const updatedDocument = await db
      .update(documents)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(documents.id, id))
      .returning();
    return { success: true, data: updatedDocument };
  } catch (error) {
    console.error("Error updating document:", error);
    return { success: false, error: "Failed to update document" };
  }
}

export async function deleteDocument(id: number): Promise<DocumentResult> {
  try {
    await db.delete(documents).where(eq(documents.id, id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting document:", error);
    return { success: false, error: "Failed to delete document" };
  }
}

export async function getDocumentCategories(): Promise<{
  success: boolean;
  data?: string[];
  error?: string;
}> {
  try {
    const result = await db
      .select({ category: documents.category })
      .from(documents)
      .where(eq(documents.status, "active"));
    const categories = [
      ...new Set(result.map((r) => r.category).filter(Boolean)),
    ] as string[];
    return { success: true, data: categories };
  } catch (error) {
    console.error("Error fetching document categories:", error);
    return { success: false, error: "Failed to fetch categories" };
  }
}
