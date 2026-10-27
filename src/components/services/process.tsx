"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Tell Us What You Need",
    desc: "Share your goals, challenges, and what you want to achieve.",
  },
  {
    num: "02",
    title: "Explore the Scope",
    desc: "Discuss the requirements, constraints, and possible direction of the solution.",
  },
  {
    num: "03",
    title: "Plan the Work",
    desc: "Clarify the proposed scope, deliverables, and commercial terms before work begins.",
  },
  {
    num: "04",
    title: "Build and Improve",
    desc: "Proceed with the agreed work and identify opportunities for improvement where appropriate.",
  },
];

export function Process() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl">
          <p className="text-primary mb-2 font-mono text-xs tracking-widest uppercase">
            How a Project Moves Forward
          </p>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            A simple path from need to solution
          </h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            A practical process to keep things clear from the start.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.article
              key={step.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="border-border/60 relative rounded-xl border p-5"
            >
              <span className="text-primary/60 absolute top-4 right-4 font-mono text-sm">
                {step.num}
              </span>
              <div className="bg-primary/10 mb-4 flex h-9 w-9 items-center justify-center rounded-lg">
                <span className="text-primary font-mono text-xs">
                  {step.num}
                </span>
              </div>
              <h3 className="font-medium">{step.title}</h3>
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
