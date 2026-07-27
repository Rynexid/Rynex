"use client";

import { motion } from "framer-motion";

const securityCards = [
  {
    title: "Authentication",
    items: [
      "Multi-factor authentication",
      "Role-based access control",
      "Session management",
    ],
  },
  {
    title: "Infrastructure",
    items: ["Network isolation", "Encrypted data at rest", "Automated backups"],
  },
  {
    title: "Application Security",
    items: [
      "Input validation",
      "Dependency scanning",
      "OWASP-aligned practices",
    ],
  },
  {
    title: "Monitoring",
    items: ["Real-time error tracking", "Uptime alerts", "Audit logging"],
  },
  {
    title: "Compliance",
    items: [
      "Data handling policy alignment",
      "Access audit trails",
      "Documented security posture",
    ],
  },
];

export function SecuritySection() {
  return (
    <section className="spacious-section relative" id="security">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center md:mb-16"
        >
          <span className="font-mono text-xs font-semibold tracking-widest text-sky-300 uppercase">
            Security
          </span>
          <h2 className="font-display mt-4 mb-4 text-2xl font-bold md:text-4xl md:text-5xl">
            Security isn&apos;t a feature. It&apos;s the{" "}
            <span className="gradient-text">foundation.</span>
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {securityCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-card/50 rounded-2xl border border-white/[0.08] p-5 backdrop-blur-sm"
            >
              <h3 className="font-display mb-3 text-[15px] font-semibold">
                {card.title}
              </h3>
              <ul className="space-y-2">
                {card.items.map((item) => (
                  <li
                    key={item}
                    className="text-muted-foreground text-[13.5px]"
                  >
                    <span className="text-white/20">— </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
