"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-[26px] w-[26px]">
        <path d="M4 21V9l8-6 8 6v12" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9 21v-8h6v8" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
    title: "Architecture First",
    desc: "We design the system before writing a line of code, so growth doesn't mean rebuilding.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-[26px] w-[26px]">
        <path
          d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-4Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    ),
    title: "Security by Design",
    desc: "Authentication, data handling, and infrastructure are hardened from day one, not bolted on later.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-[26px] w-[26px]">
        <path
          d="M3 21h18M6 21V10M12 21V4M18 21v-8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Scalable Systems",
    desc: "Built to handle ten times the traffic and complexity without a rewrite.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-[26px] w-[26px]">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M12 7v5l3 3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Transparent Process",
    desc: "You see the architecture, the timeline, and the code, nothing is a black box.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-[26px] w-[26px]">
        <path
          d="M12 3v18M3 12h18"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
    title: "Modern Stack",
    desc: "TypeScript, React, and proven cloud infrastructure, no outdated frameworks.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-[26px] w-[26px]">
        <path
          d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm11 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Long-term Partnership",
    desc: "We stay on as your systems evolve, not disappear after handoff.",
  },
];

export function WhyRynex() {
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
            WHY RYNEX
          </p>
          <h2 className="mx-auto max-w-[600px] text-3xl font-semibold tracking-tight text-white md:text-[2.4rem]">
            Six things we don&apos;t compromise on.
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.article
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.05,
                ease,
              }}
              className="rounded-2xl border border-white/[0.08] bg-[#0d1420] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.16]"
            >
              <div className="mb-4 text-sky-300">{f.icon}</div>
              <h3 className="mb-2 text-[17px] font-semibold text-white">
                {f.title}
              </h3>
              <p className="text-sm text-white/55">{f.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
