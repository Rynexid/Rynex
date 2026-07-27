"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const principles = [
  {
    title: "Clean Architecture",
    description:
      "Business logic isolated from frameworks and delivery mechanisms.",
  },
  {
    title: "SOLID",
    description:
      "Five principles that keep code flexible as requirements change.",
  },
  {
    title: "DDD",
    description:
      "Domain-driven design that models software around real business rules.",
  },
  {
    title: "Scalable Code",
    description: "Written to handle growth in data, traffic, and team size.",
  },
  {
    title: "Maintainable Code",
    description:
      "Readable and consistent, so future changes don't require a rewrite.",
  },
  {
    title: "Reusable Components",
    description: "Shared UI and logic reduce duplication across the codebase.",
  },
  {
    title: "Testing",
    description: "Unit and integration tests protect critical business logic.",
  },
  {
    title: "Documentation",
    description: "Decisions and systems are documented, not just implemented.",
  },
  {
    title: "Code Review",
    description: "Every change is reviewed before it reaches production.",
  },
  {
    title: "CI/CD",
    description: "Automated pipelines catch issues before your users do.",
  },
];

export function DevPrinciplesSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300/[0.02] blur-[180px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-screen-xl px-4 md:px-6 lg:px-8">
        <div className="mb-14 text-center md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease }}
            className="mb-4 block font-mono text-xs font-semibold tracking-[0.2em] text-sky-300 uppercase"
          >
            Development Principles
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            className="font-display text-foreground mx-auto max-w-[500px] text-3xl font-bold tracking-tight md:text-5xl"
          >
            How we write software.
          </motion.h2>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5 lg:grid-cols-5">
          {principles.map((principle, i) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.04, ease }}
              className="group bg-card/50 rounded-2xl border border-white/[0.08] p-5 backdrop-blur-sm transition-all duration-300 hover:border-sky-300/20 hover:shadow-[0_8px_30px_rgba(125,211,252,0.05)]"
            >
              <h3 className="font-display text-foreground mb-1.5 text-[15px] font-semibold">
                {principle.title}
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed md:text-[13px]">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
