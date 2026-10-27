"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;

export function CTA() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="border-border/60 relative overflow-hidden rounded-xl border p-6 text-center md:p-10"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.08),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.12),transparent_60%)]" />
          <div className="relative">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Let's work on the right solution.
            </h2>
            <p className="text-muted-foreground mx-auto mt-3 max-w-2xl leading-relaxed">
              Tell us what you're trying to build, improve, or solve. We can
              start by understanding the problem.
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
                Explore Our Products
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
