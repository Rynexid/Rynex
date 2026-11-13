"use server";

import { eq, desc, and, or, ilike, count } from "drizzle-orm";

import { db } from "@lib/db";
import { portfolio } from "@lib/db";

export interface PortfolioResult {
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

export async function getPortfolio(
  page = 1,
  pageSize = 10,
  search = "",
  categoryFilter = "all",
  featuredFilter = "all",
): Promise<PortfolioResult> {
  try {
    const conditions = [];

    if (search) {
      conditions.push(
        or(
          ilike(portfolio.title, `%${search}%`),
          ilike(portfolio.description || "", `%${search}%`),
          ilike(portfolio.tags || "", `%${search}%`),
        ),
      );
    }

    if (categoryFilter !== "all") {
      conditions.push(eq(portfolio.category, categoryFilter));
    }

    if (featuredFilter !== "all") {
      conditions.push(eq(portfolio.featured, featuredFilter === "true"));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [allItems, totalResult] = await Promise.all([
      db
        .select()
        .from(portfolio)
        .where(whereClause)
        .orderBy(desc(portfolio.createdAt))
        .limit(pageSize)
        .offset((page - 1) * pageSize),
      db.select({ count: count() }).from(portfolio).where(whereClause),
    ]);

    const total = totalResult[0]?.count || 0;
    const totalPages = Math.ceil(total / pageSize);

    return {
      success: true,
      data: allItems,
      pagination: { page, pageSize, total, totalPages },
    };
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return { success: false, error: "Failed to fetch portfolio" };
  }
}

export async function getPortfolioById(id: number): Promise<PortfolioResult> {
  try {
    const item = await db
      .select()
      .from(portfolio)
      .where(eq(portfolio.id, id))
      .limit(1);
    if (!item[0]) {
      return { success: false, error: "Portfolio item not found" };
    }
    return { success: true, data: [item[0]] };
  } catch (error) {
    console.error("Error fetching portfolio item:", error);
    return { success: false, error: "Failed to fetch portfolio item" };
  }
}

export async function createPortfolioItem(data: {
  title: string;
  slug: string;
  category?: string;
  description?: string;
  client?: string;
  challenge?: string;
  solution?: string;
  outcome?: string;
  tags?: string[];
  cover?: string;
  images?: string[];
  demo?: string;
  featured?: boolean;
  order?: number;
}): Promise<PortfolioResult> {
  try {
    const newItem = await db
      .insert(portfolio)
      .values({
        title: data.title,
        slug: data.slug,
        category: data.category || null,
        description: data.description || null,
        client: data.client || null,
        challenge: data.challenge || null,
        solution: data.solution || null,
        outcome: data.outcome || null,
        tags: data.tags || [],
        cover: data.cover || null,
        images: data.images || [],
        demo: data.demo || null,
        featured: data.featured || false,
        order: data.order || 0,
      } as any)
      .returning();
    return { success: true, data: newItem };
  } catch (error) {
    console.error("Error creating portfolio item:", error);
    return { success: false, error: "Failed to create portfolio item" };
  }
}

export async function updatePortfolioItem(
  id: number,
  data: Partial<{
    title: string;
    slug: string;
    category: string;
    description: string;
    client: string;
    challenge: string;
    solution: string;
    outcome: string;
    tags: string[];
    cover: string;
    images: string[];
    demo: string;
    featured: boolean;
    order: number;
  }>,
): Promise<PortfolioResult> {
  try {
    const updatedItem = await db
      .update(portfolio)
      .set(data)
      .where(eq(portfolio.id, id))
      .returning();
    return { success: true, data: updatedItem };
  } catch (error) {
    console.error("Error updating portfolio item:", error);
    return { success: false, error: "Failed to update portfolio item" };
  }
}

export async function deletePortfolioItem(
  id: number,
): Promise<PortfolioResult> {
  try {
    await db.delete(portfolio).where(eq(portfolio.id, id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting portfolio item:", error);
    return { success: false, error: "Failed to delete portfolio item" };
  }
}

export async function getPortfolioCategories(): Promise<{
  success: boolean;
  data?: string[];
  error?: string;
}> {
  try {
    const result = await db
      .select({ category: portfolio.category })
      .from(portfolio);
    const categories = [
      ...new Set(result.map((r) => r.category).filter(Boolean)),
    ] as string[];
    return { success: true, data: categories };
  } catch (error) {
    console.error("Error fetching portfolio categories:", error);
    return { success: false, error: "Failed to fetch categories" };
  }
}
