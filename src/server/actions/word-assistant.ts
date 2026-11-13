"use server";

import { eq, desc, and, or, ilike, count } from "drizzle-orm";

import { db } from "@lib/db";
import { wordAssistantDocs } from "@lib/db";

export interface WordAssistantDocResult {
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

export async function getWordAssistantDocs(
  page = 1,
  pageSize = 10,
  search = "",
  typeFilter = "all",
  statusFilter = "all",
  userId?: string,
): Promise<WordAssistantDocResult> {
  try {
    const conditions = [];

    if (userId) {
      conditions.push(eq(wordAssistantDocs.userId, userId));
    }

    if (search) {
      conditions.push(
        or(
          ilike(wordAssistantDocs.title, `%${search}%`),
          ilike(wordAssistantDocs.content, `%${search}%`),
        ),
      );
    }

    if (typeFilter !== "all") {
      conditions.push(eq(wordAssistantDocs.type, typeFilter));
    }

    if (statusFilter !== "all") {
      conditions.push(eq(wordAssistantDocs.status, statusFilter));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [allDocs, totalResult] = await Promise.all([
      db
        .select()
        .from(wordAssistantDocs)
        .where(whereClause)
        .orderBy(desc(wordAssistantDocs.createdAt))
        .limit(pageSize)
        .offset((page - 1) * pageSize),
      db.select({ count: count() }).from(wordAssistantDocs).where(whereClause),
    ]);

    const total = totalResult[0]?.count || 0;
    const totalPages = Math.ceil(total / pageSize);

    return {
      success: true,
      data: allDocs,
      pagination: { page, pageSize, total, totalPages },
    };
  } catch (error) {
    console.error("Error fetching word assistant docs:", error);
    return { success: false, error: "Failed to fetch word assistant docs" };
  }
}

export async function getWordAssistantDocById(
  id: number,
): Promise<WordAssistantDocResult> {
  try {
    const doc = await db
      .select()
      .from(wordAssistantDocs)
      .where(eq(wordAssistantDocs.id, id))
      .limit(1);
    if (!doc[0]) {
      return { success: false, error: "Document not found" };
    }
    return { success: true, data: [doc[0]] };
  } catch (error) {
    console.error("Error fetching word assistant doc:", error);
    return { success: false, error: "Failed to fetch word assistant doc" };
  }
}

export async function createWordAssistantDoc(data: {
  userId: string;
  title: string;
  content: string;
  type?: string;
  template?: string;
  meta?: any;
}): Promise<WordAssistantDocResult> {
  try {
    const newDoc = await db
      .insert(wordAssistantDocs)
      .values({
        userId: data.userId,
        title: data.title,
        content: data.content,
        type: data.type || "document",
        template: data.template || null,
        meta: data.meta || {},
      })
      .returning();
    return { success: true, data: newDoc };
  } catch (error) {
    console.error("Error creating word assistant doc:", error);
    return { success: false, error: "Failed to create word assistant doc" };
  }
}

export async function updateWordAssistantDoc(
  id: number,
  data: Partial<{
    title: string;
    content: string;
    type: string;
    template: string;
    meta: any;
    status: string;
  }>,
): Promise<WordAssistantDocResult> {
  try {
    const updatedDoc = await db
      .update(wordAssistantDocs)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(wordAssistantDocs.id, id))
      .returning();
    return { success: true, data: updatedDoc };
  } catch (error) {
    console.error("Error updating word assistant doc:", error);
    return { success: false, error: "Failed to update word assistant doc" };
  }
}

export async function deleteWordAssistantDoc(
  id: number,
): Promise<WordAssistantDocResult> {
  try {
    await db.delete(wordAssistantDocs).where(eq(wordAssistantDocs.id, id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting word assistant doc:", error);
    return { success: false, error: "Failed to delete word assistant doc" };
  }
}

export async function getWordAssistantTemplates(): Promise<{
  success: boolean;
  data?: string[];
  error?: string;
}> {
  try {
    const templates = [
      "proposal",
      "report",
      "email",
      "blog",
      "documentation",
      "meeting-notes",
      "custom",
    ];
    return { success: true, data: templates };
  } catch (error) {
    console.error("Error fetching templates:", error);
    return { success: false, error: "Failed to fetch templates" };
  }
}
