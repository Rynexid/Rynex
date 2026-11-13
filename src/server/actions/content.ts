"use server";

import { eq, desc, and, or, ilike, count } from "drizzle-orm";

import { db } from "@lib/db";
import { content } from "@lib/db";

export interface ContentResult {
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

export async function getContent(
  page = 1,
  pageSize = 10,
  search = "",
  typeFilter = "all",
  statusFilter = "all",
  categoryFilter = "all",
  authorId?: string,
): Promise<ContentResult> {
  try {
    const conditions = [];

    if (authorId) {
      conditions.push(eq(content.authorId, authorId));
    }

    if (search) {
      conditions.push(
        or(
          ilike(content.title, `%${search}%`),
          ilike(content.description || "", `%${search}%`),
          ilike(content.body || "", `%${search}%`),
        ),
      );
    }

    if (typeFilter !== "all") {
      conditions.push(eq(content.type, typeFilter));
    }

    if (statusFilter !== "all") {
      conditions.push(eq(content.status, statusFilter));
    }

    if (categoryFilter !== "all") {
      conditions.push(eq(content.category, categoryFilter));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [allContent, totalResult] = await Promise.all([
      db
        .select()
        .from(content)
        .where(whereClause)
        .orderBy(desc(content.createdAt))
        .limit(pageSize)
        .offset((page - 1) * pageSize),
      db.select({ count: count() }).from(content).where(whereClause),
    ]);

    const total = totalResult[0]?.count || 0;
    const totalPages = Math.ceil(total / pageSize);

    return {
      success: true,
      data: allContent,
      pagination: { page, pageSize, total, totalPages },
    };
  } catch (error) {
    console.error("Error fetching content:", error);
    return { success: false, error: "Failed to fetch content" };
  }
}

export async function getContentById(id: number): Promise<ContentResult> {
  try {
    const item = await db
      .select()
      .from(content)
      .where(eq(content.id, id))
      .limit(1);
    if (!item[0]) {
      return { success: false, error: "Content not found" };
    }
    return { success: true, data: [item[0]] };
  } catch (error) {
    console.error("Error fetching content:", error);
    return { success: false, error: "Failed to fetch content" };
  }
}

export async function getContentBySlug(slug: string): Promise<ContentResult> {
  try {
    const item = await db
      .select()
      .from(content)
      .where(eq(content.slug, slug))
      .limit(1);
    if (!item[0]) {
      return { success: false, error: "Content not found" };
    }
    return { success: true, data: [item[0]] };
  } catch (error) {
    console.error("Error fetching content:", error);
    return { success: false, error: "Failed to fetch content" };
  }
}

export async function createContent(data: {
  title: string;
  slug: string;
  description?: string;
  body?: string;
  type?: string;
  category?: string;
  tags?: string[];
  cover?: string;
  status?: string;
  authorId?: string;
  publishedAt?: Date;
}): Promise<ContentResult> {
  try {
    const newContent = await db
      .insert(content)
      .values({
        title: data.title,
        slug: data.slug,
        description: data.description || null,
        body: data.body || null,
        type: data.type || "page",
        category: data.category || null,
        tags: data.tags || [],
        cover: data.cover || null,
        status: data.status || "draft",
        authorId: data.authorId || null,
        publishedAt: data.publishedAt || null,
      })
      .returning();
    return { success: true, data: newContent };
  } catch (error) {
    console.error("Error creating content:", error);
    return { success: false, error: "Failed to create content" };
  }
}

export async function updateContent(
  id: number,
  data: Partial<{
    title: string;
    slug: string;
    description: string;
    body: string;
    type: string;
    category: string;
    tags: string[];
    cover: string;
    status: string;
    authorId: string;
    publishedAt: Date;
  }>,
): Promise<ContentResult> {
  try {
    const updatedContent = await db
      .update(content)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(content.id, id))
      .returning();
    return { success: true, data: updatedContent };
  } catch (error) {
    console.error("Error updating content:", error);
    return { success: false, error: "Failed to update content" };
  }
}

export async function deleteContent(id: number): Promise<ContentResult> {
  try {
    await db.delete(content).where(eq(content.id, id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting content:", error);
    return { success: false, error: "Failed to delete content" };
  }
}

export async function getContentCategories(): Promise<{
  success: boolean;
  data?: string[];
  error?: string;
}> {
  try {
    const result = await db
      .select({ category: content.category })
      .from(content)
      .where(eq(content.status, "published"));
    const categories = [
      ...new Set(result.map((r) => r.category).filter(Boolean)),
    ] as string[];
    return { success: true, data: categories };
  } catch (error) {
    console.error("Error fetching content categories:", error);
    return { success: false, error: "Failed to fetch categories" };
  }
}

export async function getContentTypes(): Promise<{
  success: boolean;
  data?: string[];
  error?: string;
}> {
  try {
    const types = [
      "page",
      "blog",
      "documentation",
      "guide",
      "announcement",
      "custom",
    ];
    return { success: true, data: types };
  } catch (error) {
    console.error("Error fetching content types:", error);
    return { success: false, error: "Failed to fetch types" };
  }
}
