"use server";

import { eq } from "drizzle-orm";

import { db, schema } from "@rynex/db";

export interface Review {
  id: number;
  userId: string | null;
  authorName: string;
  authorRole: string | null;
  authorImage: string | null;
  rating: number;
  content: string;
  service: string | null;
  status: string;
  createdAt: Date;
}

export async function getApprovedReviews(): Promise<Review[]> {
  const rows = await db
    .select()
    .from(schema.reviews)
    .where(eq(schema.reviews.status, "approved"));

  return rows as Review[];
}

export async function getAllReviews(): Promise<Review[]> {
  const rows = await db.select().from(schema.reviews);
  return rows as Review[];
}

export async function submitReview(data: {
  authorName: string;
  authorRole?: string;
  rating: number;
  content: string;
  service?: string;
  userId?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    if (!data.authorName || !data.content) {
      return { success: false, error: "Nama dan pesan wajib diisi." };
    }
    if (data.rating < 1 || data.rating > 5) {
      return { success: false, error: "Rating harus antara 1-5." };
    }

    await db.insert(schema.reviews).values({
      userId: data.userId ?? null,
      authorName: data.authorName,
      authorRole: data.authorRole ?? null,
      authorImage: null,
      rating: data.rating,
      content: data.content,
      service: data.service ?? null,
      status: "approved",
    });

    return { success: true };
  } catch {
    return { success: false, error: "Gagal mengirim review. Coba lagi." };
  }
}
