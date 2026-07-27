"use client";

import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Easing                                                             */
/* ------------------------------------------------------------------ */

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/*  Main Export                                                         */
/* ------------------------------------------------------------------ */

export function CTAV2Section() {
  return (
    <section className="relative overflow-hidden py-32 text-center">
      {/* Blueprint grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(125,211,252,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,.06) 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(900px 500px at 50% 50%, black, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(900px 500px at 50% 50%, black, transparent 75%)",
        }}
      />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/[0.06] blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-screen-xl px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl"
        >
          <h2 className="font-display text-3xl leading-tight font-bold tracking-tight md:text-5xl lg:text-[52px]">
            Ready to build software that{" "}
            <span className="text-muted-foreground">
              grows with your business?
            </span>
          </h2>

          <p className="text-muted-foreground mt-5 mb-10 text-base md:text-lg">
            Let&apos;s talk about what you&apos;re building — no obligation, no
            sales script.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-[10px] bg-white px-6 py-3.5 text-[15px] font-semibold text-[#0a0e16] transition-all hover:-translate-y-0.5 hover:bg-white/90"
            >
              Book Consultation
            </a>
            <a
              href="/contact"
              className="text-foreground inline-flex items-center justify-center rounded-[10px] border border-white/[0.16] px-6 py-3.5 text-[15px] font-semibold transition-all hover:-translate-y-0.5 hover:border-sky-300/50"
            >
              Start Your Project
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
