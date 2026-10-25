"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const technologies = [
  { name: "Next.js", color: "#FFFFFF" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "React", color: "#61DAFB" },
  { name: "Node.js", color: "#339933" },
  { name: "Docker", color: "#2496ED" },
  { name: "Cloudflare", color: "#F38020" },
  { name: "Firebase", color: "#FFCA28" },
  { name: "Prisma", color: "#2D3748" },
  { name: "Better Auth", color: "#7DD3FC" },
  { name: "Framer Motion", color: "#F0ABFC" },
  { name: "Radix UI", color: "#FFFFFF" },
];

function TechLogo({ color }: { color: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="shrink-0"
    >
      <circle cx="8" cy="8" r="6" fill={color} fillOpacity="0.9" />
      <circle cx="8" cy="8" r="3" fill="white" fillOpacity="0.15" />
    </svg>
  );
}

export function TechnologiesSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300/[0.02] blur-[180px]" />
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
            Technologies
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            className="font-display text-foreground mx-auto max-w-[550px] text-3xl font-bold tracking-tight md:text-5xl"
          >
            Proven technology,
            <br />
            not trends.
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3"
        >
          {technologies.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.04, ease }}
              className="group bg-card/50 flex items-center gap-2.5 rounded-full border border-white/[0.08] px-4 py-3 backdrop-blur-sm transition-all duration-300 hover:border-sky-300/50 hover:shadow-[0_0_20px_rgba(125,211,252,0.06)]"
            >
              <TechLogo color={tech.color} />
              <span className="text-muted-foreground group-hover:text-foreground text-sm font-medium transition-colors duration-300">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
