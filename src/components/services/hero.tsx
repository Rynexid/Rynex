"use client";

import { Button } from "@rynex/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="text-primary mb-4 font-mono text-xs tracking-widest uppercase">
              Services
            </p>
            <h1 className="text-3xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              Technology built around your needs.
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed md:text-lg">
              From websites and custom software to infrastructure and ongoing
              support, Rynex helps turn technical challenges into practical
              digital solutions.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/contact">
                <Button className="gap-2">
                  Discuss a Project
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#service-directory">
                <Button variant="outline" className="gap-2">
                  Explore Our Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
