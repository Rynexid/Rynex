import { db, products } from "@rynex/db";
import { eq } from "drizzle-orm";
import { Code } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function ProductsPage() {
  const publishedProducts = await db
    .select()
    .from(products)
    .where(eq(products.status, "published"))
    .orderBy(products.createdAt);

  return (
    <main className="bg-background min-h-screen">
      <section className="spacious-section section-divider">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-3xl font-bold md:text-5xl md:text-6xl">
              Template <span className="gradient-text">Premium</span>
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
              Pilih template portfolio dan dashboard siap pakai dengan lisensi
              terintegrasi.
            </p>
          </div>

          {publishedProducts.length === 0 ? (
            <div className="text-center py-12">
              <Code className="text-muted-foreground mx-auto h-16 w-16 mb-4" />
              <h2 className="text-xl font-semibold">No products published yet</h2>
              <p className="text-muted-foreground mt-2">
                Products will appear here once published from the dashboard.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {publishedProducts.map((product) => (
                <Card
                  key={product.id}
                  className="glass border-border hover:border-primary/50 overflow-hidden rounded-2xl transition-colors"
                >
                  <div className="bg-muted flex aspect-video items-center justify-center">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Code className="text-muted-foreground h-16 w-16" />
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{product.name}</CardTitle>
                      <Badge variant="default">Published</Badge>
                    </div>
                    <CardDescription>
                      {product.description || "No description available."}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 flex items-center justify-between">
                      <span className="gradient-text text-2xl font-bold">
                        Rp {product.price.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        {product.type}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1" asChild>
                        <Link href={`/products/${product.slug}`}>View Details</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href={`/demo/${product.slug}`}>Demo</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
