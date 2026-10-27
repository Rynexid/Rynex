import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { showcaseProjects } from "@/data/showcase";

export default function PortfolioPage() {
  const dashboards = showcaseProjects.filter((p) => p.category === "Dashboard");
  const storefronts = showcaseProjects.filter(
    (p) => p.category === "eCommerce Storefront",
  );

  const renderGrid = (items: typeof showcaseProjects) => (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((project) => (
        <Link
          key={project.slug}
          href={`/portfolio/${project.slug}`}
          className="group border-border/60 hover:border-primary/40 bg-card/40 flex h-full flex-col overflow-hidden rounded-xl border transition-all duration-200 hover:shadow-sm"
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={project.cover}
              alt={project.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.015]"
            />
          </div>
          <div className="flex flex-1 flex-col gap-2 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="group-hover:text-primary text-base font-medium transition-colors">
                  {project.name}
                </h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  {project.subcategory}
                </p>
              </div>
              <span className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
                {project.category === "Dashboard" ? "Dashboard" : "Storefront"}
              </span>
            </div>
            <p className="text-muted-foreground line-clamp-2 text-sm">
              {project.description}
            </p>
            <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
              {project.highlights.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="bg-muted/60 text-muted-foreground rounded-full px-2 py-0.5 text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );

  return (
    <main className="bg-background min-h-screen">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center md:mb-14">
            <p className="text-primary mb-2 font-mono text-xs tracking-widest uppercase">
              Portofolio
            </p>
            <h1 className="mb-3 text-3xl font-semibold tracking-tight md:text-5xl">
              Studi kasus proyek
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-sm md:text-base">
              Kumpulan proyek yang menunjukkan pendekatan, teknologi, dan solusi
              yang kami terapkan.
            </p>
          </div>

          <div className="mb-12">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <h2 className="text-xl font-semibold md:text-2xl">Dashboard</h2>
                <p className="text-muted-foreground mt-1 text-sm">
                  Analitik, CRM, SRM, dan antarmuka admin
                </p>
              </div>
            </div>
            {renderGrid(dashboards)}
          </div>

          <div className="mb-12">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <h2 className="text-xl font-semibold md:text-2xl">
                  eCommerce Storefront
                </h2>
                <p className="text-muted-foreground mt-1 text-sm">
                  Fashion, luxury, retail, dan produk hewan peliharaan
                </p>
              </div>
            </div>
            {renderGrid(storefronts)}
          </div>

          <div className="border-border/60 flex flex-col items-center gap-4 rounded-xl border px-6 py-10 text-center">
            <div>
              <h2 className="text-xl font-semibold md:text-2xl">
                Punya proyek serupa?
              </h2>
              <p className="text-muted-foreground mt-2 text-sm">
                Diskusikan kebutuhan Anda dan kami siap membantu.
              </p>
            </div>
            <Button asChild>
              <Link href="/contact">
                Mulai proyek
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
