"use server";

import { asc } from "drizzle-orm";

import { db, schema } from "@rynex/db";

export interface PortfolioProject {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  client: string | null;
  challenge: string | null;
  solution: string | null;
  outcome: string | null;
  tags: string[];
  cover: string;
  images: string[];
  demo: string | null;
  featured: boolean;
  order: number;
  createdAt: Date;
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  const rows = await db
    .select()
    .from(schema.portfolio)
    .orderBy(asc(schema.portfolio.order));

  return rows.map((row) => ({
    ...row,
    tags: row.tags as string[],
    images: row.images as string[],
  }));
}
