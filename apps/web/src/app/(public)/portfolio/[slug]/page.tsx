"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Code,
  ExternalLink,
  Layers,
  Lightbulb,
  Puzzle,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { Button } from "@rynex/ui/button";
import { showcaseProjects } from "@/data/showcase";

const sectionIcons = {
  challenge: Lightbulb,
  solution: Layers,
  outcome: TrendingUp,
} as const;

export default function PortfolioDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = showcaseProjects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="text-muted-foreground font-mono text-sm">
          Project not found
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <div className="relative h-[50vh] min-h-[360px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={project.cover}
            alt={project.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent" />
        </div>

        {/* Back */}
        <div className="absolute top-6 left-4 z-10 md:left-8">
          <Link
            href="/portfolio"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 font-mono text-xs tracking-wider uppercase backdrop-blur-sm transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Portfolio
          </Link>
        </div>

        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-10 md:px-8"
        >
          <div className="container mx-auto">
            <span className="bg-primary/90 text-primary-foreground mb-4 inline-block rounded-full px-3 py-1 font-mono text-[10px] font-semibold tracking-wider uppercase">
              {project.category} &middot; {project.subcategory}
            </span>
            <h1 className="mb-3 text-3xl font-bold md:text-5xl">
              {project.name}
            </h1>
            <p className="text-muted-foreground font-mono text-sm">
              {project.theme} &middot; {project.accent} &middot; {project.style}
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── Content ── */}
      <section className="pb-20 pt-12">
        <div className="container mx-auto px-4">
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-muted-foreground mx-auto mb-16 max-w-3xl text-base leading-relaxed md:text-lg"
          >
            {project.description}
          </motion.p>

          {/* Meta badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-16 flex max-w-3xl flex-wrap gap-2"
          >
            {project.highlights.map((h) => (
              <span
                key={h}
                className="bg-primary/10 text-primary rounded-full px-3 py-1 font-mono text-xs"
              >
                {h}
              </span>
            ))}
          </motion.div>

          {/* Tech Stack + Components */}
          <div className="mx-auto mb-16 grid max-w-3xl gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-white/5 bg-white/[0.02] p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-primary/10 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
                  <Code className="text-primary h-4 w-4" />
                </div>
                <h2 className="font-semibold">Tech Stack</h2>
              </div>
              <p className="text-muted-foreground text-sm">
                {project.techStack}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-white/5 bg-white/[0.02] p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-primary/10 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
                  <Puzzle className="text-primary h-4 w-4" />
                </div>
                <h2 className="font-semibold">Highlights</h2>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.highlights.map((h) => (
                  <span
                    key={h}
                    className="bg-primary/10 text-primary rounded-full px-2.5 py-0.5 font-mono text-[10px]"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Gallery */}
          {project.images.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mx-auto mb-16 max-w-4xl"
            >
              <div className="mb-4 flex items-center gap-2">
                <Sparkles className="text-primary h-4 w-4" />
                <span className="text-muted-foreground font-mono text-[10px] tracking-wider uppercase">
                  Preview
                </span>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {project.images.map((img, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-xl border border-white/5"
                  >
                    <img
                      src={img}
                      alt={`${project.name} - ${i + 1}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto flex max-w-3xl flex-col gap-4 sm:flex-row"
          >
            <Link href="/contact">
              <Button className="soft-shadow w-full font-mono text-xs tracking-wider uppercase sm:w-auto">
                <ExternalLink className="mr-2 h-4 w-4" />
                Mulai Proyek Serupa
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
