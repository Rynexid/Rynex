"use client";

import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

import { showcaseProjects } from "@/data/showcase";

export function PortfolioSection() {
  const projects = showcaseProjects.slice(0, 3);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-primary mb-2 font-mono text-xs tracking-widest uppercase">
              Selected Work
            </p>
            <h2 className="text-2xl font-semibold tracking-tight md:text-4xl">
              Ideas, translated into real work
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl text-sm md:text-base">
              Explore selected projects and the thinking behind the digital
              solutions we build.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="text-primary inline-flex items-center gap-2 text-sm font-medium"
          >
            Explore Our Work
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="group border-border/60 hover:border-primary/40 overflow-hidden rounded-xl border transition-colors"
            >
              <Link href={`/portfolio/${project.slug}`} className="block">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={project.cover}
                    alt={project.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
                  />
                </div>
                <div className="flex flex-col gap-2 p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">{project.name}</h3>
                    <ExternalLink className="text-muted-foreground h-4 w-4" />
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {project.subcategory}
                  </p>
                  <p className="text-muted-foreground line-clamp-2 text-sm">
                    {project.description}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
