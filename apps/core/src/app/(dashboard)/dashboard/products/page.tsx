import { db } from "@rynex/db";
import { products } from "@rynex/db";

import { ProductsClient } from "@/components/dashboard/products-client";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const allProducts = await db
    .select()
    .from(products)
    .orderBy(products.createdAt);

  const serializedProducts = allProducts.map((p) => ({
    ...p,
    createdAt: p.createdAt ? p.createdAt.toISOString() : null,
  }));

  return <ProductsClient products={serializedProducts as never} />;
}
