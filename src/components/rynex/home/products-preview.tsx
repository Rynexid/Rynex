import { ArrowRight, Package } from "lucide-react";
import Link from "next/link";

export function ProductsPreview() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-primary mb-2 font-mono text-xs tracking-widest uppercase">
              Digital Products
            </p>
            <h2 className="text-2xl font-semibold tracking-tight md:text-4xl">
              Products built to be useful
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl text-sm md:text-base">
              Digital products developed by Rynex, designed to solve practical
              problems and create value beyond individual projects.
            </p>
          </div>
          <Link
            href="/products"
            className="text-primary inline-flex items-center gap-2 text-sm font-medium"
          >
            Explore All Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="border-border/60 relative overflow-hidden rounded-xl border p-6 md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.06),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.1),transparent_60%)]" />
          <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                <Package className="text-primary h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-medium">
                  Practical tools for real needs
                </h3>
                <p className="text-muted-foreground mt-1 max-w-xl text-sm leading-relaxed">
                  Browse the catalog of products built and owned by Rynex.
                </p>
              </div>
            </div>
            <Link
              href="/products"
              className="bg-background text-foreground border-border/60 hover:bg-accent inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm shadow-sm"
            >
              View Catalog
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
