"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

import { Button } from "@rynex/ui/button";

const ease = [0.22, 1, 0.36, 1] as const;

export function CTA() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(125,211,252,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(900px 500px at 50% 50%, black, transparent 75%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto max-w-[700px] text-center"
        >
          <h2 className="mx-auto mb-4 max-w-[600px] text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight text-white">
            Ready to build software that grows with your business?
          </h2>
          <p className="mb-6 text-[16px] text-white/55">
            Let&apos;s talk about what you&apos;re building, no obligation, no
            sales script.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button className="gap-2 rounded-full px-8 py-3 font-mono text-xs tracking-wider uppercase">
                Book Consultation
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="gap-2 rounded-full px-8 py-3 font-mono text-xs tracking-wider uppercase"
              >
                <Calendar className="h-4 w-4" />
                Start Your Project
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
