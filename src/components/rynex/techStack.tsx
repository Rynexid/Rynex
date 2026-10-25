"use client";

import { motion } from "framer-motion";

const stackCategories = [
  {
    category: "Frontend",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    category: "Backend",
    tags: ["Node.js", "TypeScript", "REST / GraphQL"],
  },
  {
    category: "Database",
    tags: ["PostgreSQL", "Prisma", "Redis"],
  },
  {
    category: "Cloud",
    tags: ["Cloudflare", "Vercel", "AWS"],
  },
  {
    category: "Authentication",
    tags: ["Better Auth", "OAuth 2.0", "JWT"],
  },
  {
    category: "Infrastructure",
    tags: ["Docker", "CI/CD", "IaC"],
  },
  {
    category: "DevOps",
    tags: ["GitHub Actions", "Monitoring", "Automated Deploys"],
  },
  {
    category: "AI",
    tags: ["AI APIs", "Automation", "Analytics"],
  },
  {
    category: "Monitoring",
    tags: ["Error Tracking", "Uptime Monitoring", "Logging"],
  },
];

export function TechStackSection() {
  return (
    <section className="spacious-section relative" id="tech-stack">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center md:mb-16"
        >
          <span className="font-mono text-xs font-semibold tracking-widest text-sky-300 uppercase">
            Technology Stack
          </span>
          <h2 className="font-display mt-4 mb-4 text-2xl font-bold md:text-4xl md:text-5xl">
            One stack. <span className="gradient-text">Every layer.</span>
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stackCategories.map((stack, i) => (
            <motion.div
              key={stack.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4 }}
              className="bg-card/50 rounded-2xl border border-white/[0.08] p-5 backdrop-blur-sm transition-colors duration-300 hover:border-sky-300/20"
            >
              <h3 className="font-display mb-3 text-[15px] font-semibold">
                {stack.category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {stack.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-muted-foreground rounded-md border border-white/[0.08] px-2 py-1 font-mono text-[11.5px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
