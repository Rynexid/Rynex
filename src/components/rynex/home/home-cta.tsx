import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function HomeCta() {
  return (
    <section className="pb-16 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="border-border/60 relative overflow-hidden rounded-xl border p-6 text-center md:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.08),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.12),transparent_60%)]" />
          <div className="relative">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Have something worth building?
            </h2>
            <p className="text-muted-foreground mx-auto mt-3 max-w-2xl leading-relaxed">
              Whether you need a digital solution or want to explore products
              built by Rynex, start with what you need.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="bg-background text-foreground border-border/60 hover:bg-accent inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm shadow-sm"
              >
                Discuss a Project
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/products"
                className="bg-background text-foreground border-border/60 hover:bg-accent inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm shadow-sm"
              >
                Explore Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
