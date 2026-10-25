"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const items = [
  {
    title: "Source Code",
    desc: "The complete, unobfuscated codebase, yours to keep.",
  },
  {
    title: "Technical Documentation",
    desc: "System overview so any engineer can pick up where we left off.",
  },
  {
    title: "Architecture Diagram",
    desc: "Visual map of how your system fits together.",
  },
  {
    title: "Database Schema",
    desc: "Documented structure of every table and relationship.",
  },
  {
    title: "Deployment Guide",
    desc: "Step-by-step instructions for releasing updates.",
  },
  {
    title: "Training Session",
    desc: "Walkthrough so your team can operate the system confidently.",
  },
  {
    title: "Warranty",
    desc: "Bug fixes included for a defined period after launch.",
  },
  {
    title: "Maintenance",
    desc: "Ongoing plans to keep systems patched and current.",
  },
  {
    title: "Support",
    desc: "A direct line to the team that built your system.",
  },
  { title: "Ownership", desc: "No vendor lock-in, the system is fully yours." },
];

export function Deliverables() {
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
            DELIVERABLES
          </p>
          <h2 className="mx-auto max-w-[600px] text-3xl font-semibold tracking-tight text-white md:text-[2.4rem]">
            What you actually walk away with.
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.04, ease }}
              className="rounded-2xl border border-white/[0.08] bg-[#0d1420] p-5"
            >
              <h3 className="mb-1.5 text-[15px] font-semibold text-white">
                {item.title}
              </h3>
              <p className="text-[13.5px] text-white/55">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
