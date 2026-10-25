"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    title: "Discovery",
    desc: "We learn your business, users, and the problem before touching a design tool.",
  },
  {
    title: "Business Analysis",
    desc: "Requirements are mapped against real operational constraints, not assumptions.",
  },
  {
    title: "Architecture",
    desc: "System boundaries, data flow, and technology choices are decided upfront.",
  },
  {
    title: "Database Design",
    desc: "Schemas built for the queries you'll actually run, not just the ones you have today.",
  },
  {
    title: "Wireframe",
    desc: "Low-fidelity structure to validate flow before visual design begins.",
  },
  {
    title: "UI Design",
    desc: "Interface design that matches your brand and reduces user friction.",
  },
  {
    title: "Frontend",
    desc: "Interfaces built with modern, maintainable component architecture.",
  },
  {
    title: "Backend",
    desc: "Business logic, APIs, and data layers built for correctness and scale.",
  },
  {
    title: "Testing",
    desc: "Automated and manual testing across critical paths before anything ships.",
  },
  {
    title: "Deployment",
    desc: "Staged rollout with monitoring in place from the first release.",
  },
  {
    title: "Maintenance",
    desc: "Ongoing support, patching, and improvements after launch.",
  },
];

export function Process() {
  return (
    <section className="relative overflow-hidden bg-[#080d16] py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-16 text-center"
        >
          <p className="mb-4 font-mono text-xs font-semibold tracking-[0.14em] text-sky-300 uppercase">
            ENGINEERING PROCESS
          </p>
          <h2 className="mx-auto max-w-[600px] text-3xl font-semibold tracking-tight text-white md:text-[2.4rem]">
            Eleven steps. Zero guesswork.
          </h2>
        </motion.div>

        <ol className="mx-auto flex max-w-[760px] flex-col">
          {steps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.03, ease }}
              className={`grid grid-cols-[64px_1fr] gap-5 py-5 ${
                i < steps.length - 1 ? "border-b border-white/[0.06]" : ""
              }`}
            >
              <span className="font-mono text-[13px] text-sky-300">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="mb-1 text-[16px] font-semibold text-white">
                  {step.title}
                </h3>
                <p className="text-[14px] text-white/55">{step.desc}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
