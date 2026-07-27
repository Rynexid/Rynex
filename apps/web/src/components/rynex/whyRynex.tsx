"use client";

import { motion } from "framer-motion";
import { BarChart3, Clock, Crosshair, Home, Shield, Users } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const features = [
  {
    icon: Home,
    title: "Architecture First",
    description:
      "We design the system before writing a line of code, so growth doesn't mean rebuilding.",
  },
  {
    icon: Shield,
    title: "Security by Design",
    description:
      "Authentication, data handling, and infrastructure are hardened from day one.",
  },
  {
    icon: BarChart3,
    title: "Scalable Systems",
    description:
      "Built to handle ten times the traffic and complexity without a rewrite.",
  },
  {
    icon: Clock,
    title: "Transparent Process",
    description:
      "You see the architecture, the timeline, and the code — nothing is a black box.",
  },
  {
    icon: Crosshair,
    title: "Modern Stack",
    description:
      "TypeScript, React, and proven cloud infrastructure — no outdated frameworks.",
  },
  {
    icon: Users,
    title: "Long-term Partnership",
    description:
      "We stay on as your systems evolve, not disappear after handoff.",
  },
];

export function WhyRynexSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300/[0.03] blur-[200px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-screen-xl px-4 md:px-6 lg:px-8">
        <div className="mb-14 max-w-2xl md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease }}
            className="mb-4 block font-mono text-xs font-semibold tracking-[0.2em] text-sky-300 uppercase"
          >
            Why Rynex
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            className="font-display text-foreground mb-4 text-3xl font-bold tracking-tight md:text-5xl"
          >
            Six things we don&apos;t
            <br />
            compromise on.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
            className="text-muted-foreground max-w-xl text-sm leading-relaxed md:text-base"
          >
            Every system we build is held to these standards — no shortcuts, no
            exceptions.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease }}
                className="group bg-card/50 relative rounded-2xl border border-white/[0.08] p-6 backdrop-blur-sm transition-all duration-400 hover:-translate-y-1 hover:border-sky-300/20 hover:shadow-[0_8px_40px_rgba(125,211,252,0.06)]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] transition-colors duration-300 group-hover:border-sky-300/20 group-hover:bg-sky-300/[0.08]">
                  <Icon className="h-5 w-5 text-sky-300/80 transition-colors duration-300 group-hover:text-sky-300" />
                </div>
                <h3 className="font-display text-foreground mb-2 text-base font-semibold">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
