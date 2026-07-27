"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We learn your business, users, and the problem before touching a design tool.",
  },
  {
    number: "02",
    title: "Business Analysis",
    description:
      "Requirements are mapped against real operational constraints, not assumptions.",
  },
  {
    number: "03",
    title: "Architecture",
    description:
      "System boundaries, data flow, and technology choices are decided upfront.",
  },
  {
    number: "04",
    title: "Database Design",
    description:
      "Schemas built for the queries you'll actually run, not just the ones you have today.",
  },
  {
    number: "05",
    title: "Wireframe",
    description:
      "Low-fidelity structure to validate flow before visual design begins.",
  },
  {
    number: "06",
    title: "UI Design",
    description:
      "Interface design that matches your brand and reduces user friction.",
  },
  {
    number: "07",
    title: "Frontend",
    description:
      "Interfaces built with modern, maintainable component architecture.",
  },
  {
    number: "08",
    title: "Backend",
    description:
      "Business logic, APIs, and data layers built for correctness and scale.",
  },
  {
    number: "09",
    title: "Testing",
    description:
      "Automated and manual testing across critical paths before anything ships.",
  },
  {
    number: "10",
    title: "Deployment",
    description:
      "Staged rollout with monitoring in place from the first release.",
  },
  {
    number: "11",
    title: "Maintenance",
    description: "Ongoing support, patching, and improvements after launch.",
  },
];

export function EngineeringProcessSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300/[0.02] blur-[200px]" />
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
            Engineering Process
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            className="font-display text-foreground mx-auto max-w-[550px] text-3xl font-bold tracking-tight md:text-5xl"
          >
            Eleven steps.
            <br />
            Zero guesswork.
          </motion.h2>
        </div>

        <div className="mx-auto max-w-[760px]">
          <div className="border-l border-white/[0.08]">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.04, ease }}
                className={`relative flex gap-5 py-6 pl-8 md:gap-7 md:py-8 md:pl-10 ${
                  i < steps.length - 1 ? "border-b border-white/[0.06]" : ""
                }`}
              >
                <div className="bg-background absolute top-6 -left-3.5 flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.08] md:top-8 md:-left-[17px] md:h-8 md:w-8">
                  <span className="font-mono text-[10px] font-bold text-sky-300 md:text-xs">
                    {step.number}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="font-display text-foreground mb-1 text-base font-semibold md:text-lg">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
