"use server";

import { eq, desc, and, or, ilike, count } from "drizzle-orm";

import { db } from "@lib/db";
import { lifecycleStages, products } from "@lib/db";

export interface LifecycleResult {
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

export async function getLifecycleStages(
  page = 1,
  pageSize = 10,
  search = "",
  statusFilter = "all",
): Promise<LifecycleResult> {
  try {
    const conditions = [];

    if (search) {
      conditions.push(
        or(
          ilike(lifecycleStages.name, `%${search}%`),
          ilike(lifecycleStages.description || "", `%${search}%`),
          ilike(lifecycleStages.product, `%${search}%`),
        ),
      );
    }

    if (statusFilter !== "all") {
      conditions.push(eq(lifecycleStages.status, statusFilter));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [allStages, totalResult] = await Promise.all([
      db
        .select()
        .from(lifecycleStages)
        .where(whereClause)
        .orderBy(desc(lifecycleStages.createdAt))
        .limit(pageSize)
        .offset((page - 1) * pageSize),
      db.select({ count: count() }).from(lifecycleStages).where(whereClause),
    ]);

    const total = totalResult[0]?.count || 0;
    const totalPages = Math.ceil(total / pageSize);

    return {
      success: true,
      data: allStages,
      pagination: { page, pageSize, total, totalPages },
    };
  } catch (error) {
    console.error("Error fetching lifecycle stages:", error);
    return { success: false, error: "Failed to fetch lifecycle stages" };
  }
}

export async function getLifecycleStageById(
  id: number,
): Promise<LifecycleResult> {
  try {
    const stage = await db
      .select()
      .from(lifecycleStages)
      .where(eq(lifecycleStages.id, id))
      .limit(1);
    if (!stage[0]) {
      return { success: false, error: "Lifecycle stage not found" };
    }
    return { success: true, data: [stage[0]] };
  } catch (error) {
    console.error("Error fetching lifecycle stage:", error);
    return { success: false, error: "Failed to fetch lifecycle stage" };
  }
}

export async function createLifecycleStage(data: {
  name: string;
  description?: string;
  stage: string;
  progress?: number;
  product: string;
  status?: string;
  productId?: number;
}): Promise<LifecycleResult> {
  try {
    const newStage = await db
      .insert(lifecycleStages)
      .values({
        name: data.name,
        description: data.description || null,
        stage: data.stage,
        progress: data.progress || 0,
        product: data.product,
        status: data.status || "planning",
        productId: data.productId || null,
      })
      .returning();
    return { success: true, data: newStage };
  } catch (error) {
    console.error("Error creating lifecycle stage:", error);
    return { success: false, error: "Failed to create lifecycle stage" };
  }
}

export async function updateLifecycleStage(
  id: number,
  data: Partial<{
    name: string;
    description: string;
    stage: string;
    progress: number;
    product: string;
    status: string;
    productId: number;
  }>,
): Promise<LifecycleResult> {
  try {
    const updatedStage = await db
      .update(lifecycleStages)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(lifecycleStages.id, id))
      .returning();
    return { success: true, data: updatedStage };
  } catch (error) {
    console.error("Error updating lifecycle stage:", error);
    return { success: false, error: "Failed to update lifecycle stage" };
  }
}

export async function deleteLifecycleStage(
  id: number,
): Promise<LifecycleResult> {
  try {
    await db.delete(lifecycleStages).where(eq(lifecycleStages.id, id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting lifecycle stage:", error);
    return { success: false, error: "Failed to delete lifecycle stage" };
  }
}

export async function getProductsForLifecycle(): Promise<{
  success: boolean;
  data?: any[];
  error?: string;
}> {
  try {
    const allProducts = await db
      .select({ id: products.id, name: products.name })
      .from(products)
      .orderBy(products.name);
    return { success: true, data: allProducts };
  } catch (error) {
    console.error("Error fetching products for lifecycle:", error);
    return { success: false, error: "Failed to fetch products" };
  }
}
