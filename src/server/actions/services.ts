"use server";

import { eq, desc, and, or, ilike, count } from "drizzle-orm";

import { db } from "@lib/db";
import { services } from "@lib/db";

export interface ServiceResult {
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

export async function getServices(
  page = 1,
  pageSize = 10,
  search = "",
  categoryFilter = "all",
  featuredFilter = "all",
): Promise<ServiceResult> {
  try {
    const conditions = [];

    if (search) {
      conditions.push(
        or(
          ilike(services.name, `%${search}%`),
          ilike(services.description || "", `%${search}%`),
          ilike(services.shortDescription || "", `%${search}%`),
        ),
      );
    }

    if (categoryFilter !== "all") {
      conditions.push(eq(services.category, categoryFilter));
    }

    if (featuredFilter !== "all") {
      conditions.push(eq(services.featured, featuredFilter === "true"));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [allServices, totalResult] = await Promise.all([
      db
        .select()
        .from(services)
        .where(whereClause)
        .orderBy(services.order, desc(services.createdAt))
        .limit(pageSize)
        .offset((page - 1) * pageSize),
      db.select({ count: count() }).from(services).where(whereClause),
    ]);

    const total = totalResult[0]?.count || 0;
    const totalPages = Math.ceil(total / pageSize);

    return {
      success: true,
      data: allServices,
      pagination: { page, pageSize, total, totalPages },
    };
  } catch (error) {
    console.error("Error fetching services:", error);
    return { success: false, error: "Failed to fetch services" };
  }
}

export async function getServiceById(id: number): Promise<ServiceResult> {
  try {
    const service = await db
      .select()
      .from(services)
      .where(eq(services.id, id))
      .limit(1);
    if (!service[0]) {
      return { success: false, error: "Service not found" };
    }
    return { success: true, data: [service[0]] };
  } catch (error) {
    console.error("Error fetching service:", error);
    return { success: false, error: "Failed to fetch service" };
  }
}

export async function getServiceBySlug(slug: string): Promise<ServiceResult> {
  try {
    const service = await db
      .select()
      .from(services)
      .where(eq(services.slug, slug))
      .limit(1);
    if (!service[0]) {
      return { success: false, error: "Service not found" };
    }
    return { success: true, data: [service[0]] };
  } catch (error) {
    console.error("Error fetching service:", error);
    return { success: false, error: "Failed to fetch service" };
  }
}

export async function createService(data: {
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  icon?: string;
  category?: string;
  price?: number;
  featured?: boolean;
  order?: number;
}): Promise<ServiceResult> {
  try {
    const newService = await db
      .insert(services)
      .values({
        name: data.name,
        slug: data.slug,
        description: data.description || null,
        shortDescription: data.shortDescription || null,
        icon: data.icon || null,
        category: data.category || null,
        price: data.price || 0,
        featured: data.featured || false,
        order: data.order || 0,
      })
      .returning();
    return { success: true, data: newService };
  } catch (error) {
    console.error("Error creating service:", error);
    return { success: false, error: "Failed to create service" };
  }
}

export async function updateService(
  id: number,
  data: Partial<{
    name: string;
    slug: string;
    description: string;
    shortDescription: string;
    icon: string;
    category: string;
    price: number;
    featured: boolean;
    order: number;
  }>,
): Promise<ServiceResult> {
  try {
    const updatedService = await db
      .update(services)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(services.id, id))
      .returning();
    return { success: true, data: updatedService };
  } catch (error) {
    console.error("Error updating service:", error);
    return { success: false, error: "Failed to update service" };
  }
}

export async function deleteService(id: number): Promise<ServiceResult> {
  try {
    await db.delete(services).where(eq(services.id, id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting service:", error);
    return { success: false, error: "Failed to delete service" };
  }
}

export async function getServiceCategories(): Promise<{
  success: boolean;
  data?: string[];
  error?: string;
}> {
  try {
    const result = await db
      .select({ category: services.category })
      .from(services)
      .where(eq(services.featured, true));
    const categories = [
      ...new Set(result.map((r) => r.category).filter(Boolean)),
    ] as string[];
    return { success: true, data: categories };
  } catch (error) {
    console.error("Error fetching service categories:", error);
    return { success: false, error: "Failed to fetch categories" };
  }
}
