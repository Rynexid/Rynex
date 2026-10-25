"use client";

import { motion } from "framer-motion";
import { ArrowRight, Eye } from "lucide-react";
import Link from "next/link";

import { Button } from "@rynex/ui/button";
import { showcaseProjects } from "@/data/showcase";

export default function PortfolioPage() {
  const dashboards = showcaseProjects.filter((p) => p.category === "Dashboard");
  const storefronts = showcaseProjects.filter(
    (p) => p.category === "eCommerce Storefront",
  );

  return (
    <div className="pt-28">
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
          >
            <span className="text-primary font-mono text-xs font-semibold tracking-widest uppercase">
              Case Studies
            </span>
            <h1 className="mt-4 mb-4 text-2xl font-bold md:text-4xl md:text-6xl">
              Portfolio
            </h1>
            <p className="text-muted-foreground text-base md:text-lg">
              Real projects with real results. Each case study shows our
              approach from challenge to outcome.
            </p>
          </motion.div>

          {/* Dashboard */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8"
            >
              <h2 className="text-xl font-semibold md:text-2xl">Dashboard</h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Analytics, CRM, SRM, and admin interfaces
              </p>
            </motion.div>
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
              {dashboards.map((project, i) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                >
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="group hover:border-primary/20 flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] transition-[background-color,border-color] duration-300 hover:bg-white/[0.04]"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={project.cover}
                        alt={project.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                      <span className="bg-primary/90 text-primary-foreground absolute top-3 left-3 max-w-[calc(100%-24px)] truncate rounded-full px-3 py-1 font-mono text-[10px] font-semibold tracking-wider uppercase">
                        {project.subcategory}
                      </span>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
                        <Eye className="h-6 w-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-4 md:p-5">
                      <h3 className="group-hover:text-primary mb-1 text-sm leading-snug font-semibold transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-muted-foreground mb-3 line-clamp-2 flex-1 text-xs leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.highlights.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="bg-primary/10 text-primary rounded-full px-2.5 py-0.5 font-mono text-[10px]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Storefront */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8"
            >
              <h2 className="text-xl font-semibold md:text-2xl">
                eCommerce Storefront
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Fashion, luxury, retail, and pet product storefronts
              </p>
            </motion.div>
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
              {storefronts.map((project, i) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.08 }}
                >
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="group hover:border-primary/20 flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] transition-[background-color,border-color] duration-300 hover:bg-white/[0.04]"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={project.cover}
                        alt={project.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                      <span className="bg-primary/90 text-primary-foreground absolute top-3 left-3 max-w-[calc(100%-24px)] truncate rounded-full px-3 py-1 font-mono text-[10px] font-semibold tracking-wider uppercase">
                        {project.subcategory}
                      </span>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
                        <Eye className="h-6 w-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-4 md:p-5">
                      <h3 className="group-hover:text-primary mb-1 text-sm leading-snug font-semibold transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-muted-foreground mb-3 line-clamp-2 flex-1 text-xs leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.highlights.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="bg-primary/10 text-primary rounded-full px-2.5 py-0.5 font-mono text-[10px]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 text-center md:mt-16"
          >
            <Link href="/contact">
              <Button
                size="lg"
                className="soft-shadow font-mono text-xs tracking-wider uppercase"
              >
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
