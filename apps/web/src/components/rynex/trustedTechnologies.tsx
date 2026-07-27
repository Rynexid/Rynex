"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const technologies = [
  { name: "WordPress", color: "#21759B" },
  { name: "Shopify", color: "#96BF48" },
  { name: "Vercel", color: "#FFFFFF" },
  { name: "Cloudflare", color: "#F38020" },
  { name: "GitHub", color: "#FFFFFF" },
  { name: "Figma", color: "#A259FF" },
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#FFFFFF" },
  { name: "Laravel", color: "#FF2D20" },
  { name: "Node.js", color: "#339933" },
  { name: "Firebase", color: "#FFCA28" },
  { name: "Supabase", color: "#3ECF8E" },
  { name: "MySQL", color: "#4479A1" },
  { name: "PostgreSQL", color: "#4169E1" },
];

function TechLogo({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <span className="text-[15px] font-bold tracking-tight text-white/90">
      {initials}
    </span>
  );
}

export function TrustedTechnologies() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D8FF3E]/[0.03] blur-[200px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-16 text-center md:mb-20"
        >
          <span
            className="mb-4 inline-block font-mono text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: "#D8FF3E" }}
          >
            Technology
          </span>
          <h2 className="mb-5 text-3xl font-bold tracking-tight text-white md:text-5xl">
            Trusted Technologies
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/45 md:text-lg">
            Rynex builds modern, fast, secure, and scalable digital solutions
            using industry-leading technologies and platforms.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5">
          {technologies.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.04, ease }}
              className="group relative flex flex-col items-center gap-3 rounded-[20px] border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm transition-all duration-400 hover:border-white/[0.14] hover:bg-white/[0.05]"
            >
              {/* Hover glow */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(200px at 50% 40%, ${tech.color}10, transparent 70%)`,
                }}
              />

              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] transition-all duration-300 group-hover:scale-110 group-hover:border-white/[0.15]">
                <TechLogo name={tech.name} />
              </div>

              <span className="relative z-10 text-[13px] font-medium text-white/60 transition-colors duration-300 group-hover:text-white/90">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
