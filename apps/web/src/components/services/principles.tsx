"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const principles = [
  {
    title: "Clean Architecture",
    desc: "Business logic isolated from frameworks and delivery mechanisms.",
  },
  {
    title: "SOLID",
    desc: "Five principles that keep code flexible as requirements change.",
  },
  {
    title: "DDD",
    desc: "Domain-driven design that models software around real business rules.",
  },
  {
    title: "Scalable Code",
    desc: "Written to handle growth in data, traffic, and team size.",
  },
  {
    title: "Maintainable Code",
    desc: "Readable and consistent, so future changes don't require a rewrite.",
  },
  {
    title: "Reusable Components",
    desc: "Shared UI and logic reduce duplication across the codebase.",
  },
  {
    title: "Testing",
    desc: "Unit and integration tests protect critical business logic.",
  },
  {
    title: "Documentation",
    desc: "Decisions and systems are documented, not just implemented.",
  },
  {
    title: "Code Review",
    desc: "Every change is reviewed before it reaches production.",
  },
  {
    title: "CI/CD",
    desc: "Automated pipelines catch issues before your users do.",
  },
];

export function Principles() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-16 text-center"
        >
          <p className="mb-4 font-mono text-xs font-semibold tracking-[0.14em] text-sky-300 uppercase">
            DEVELOPMENT PRINCIPLES
          </p>
          <h2 className="mx-auto max-w-[600px] text-3xl font-semibold tracking-tight text-white md:text-[2.4rem]">
            How we write software.
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.04, ease }}
              className="rounded-2xl border border-white/[0.08] bg-[#0d1420] p-5"
            >
              <h3 className="mb-1.5 text-[15px] font-semibold text-white">
                {p.title}
              </h3>
              <p className="text-[13.5px] text-white/55">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
