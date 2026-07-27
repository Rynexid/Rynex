"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const deliverables = [
  {
    title: "Source Code",
    description: "The complete, unobfuscated codebase — yours to keep.",
  },
  {
    title: "Technical Documentation",
    description:
      "System overview so any engineer can pick up where we left off.",
  },
  {
    title: "Architecture Diagram",
    description: "Visual map of how your system fits together.",
  },
  {
    title: "Database Schema",
    description: "Documented structure of every table and relationship.",
  },
  {
    title: "Deployment Guide",
    description: "Step-by-step instructions for releasing updates.",
  },
  {
    title: "Training Session",
    description: "Walkthrough so your team can operate the system confidently.",
  },
  {
    title: "Warranty",
    description: "Bug fixes included for a defined period after launch.",
  },
  {
    title: "Maintenance",
    description: "Ongoing plans to keep systems patched and current.",
  },
  {
    title: "Support",
    description: "A direct line to the team that built your system.",
  },
  {
    title: "Ownership",
    description: "No vendor lock-in — the system is fully yours.",
  },
];

export function DeliverablesSection() {
  return (
    <section className="spacious-section relative" id="deliverables">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center md:mb-16"
        >
          <span className="font-mono text-xs font-semibold tracking-widest text-sky-300 uppercase">
            Deliverables
          </span>
          <h2 className="font-display mt-4 mb-4 text-2xl font-bold md:text-4xl md:text-5xl">
            What you actually{" "}
            <span className="gradient-text">walk away with.</span>
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {deliverables.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-card/50 rounded-2xl border border-white/[0.08] p-5 backdrop-blur-sm transition-colors duration-300 hover:border-sky-300/20"
            >
              <CheckCircle2 className="mb-3 h-5 w-5 text-sky-300" />
              <h3 className="font-display mb-1.5 text-[15px] font-semibold">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-[13.5px] leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
