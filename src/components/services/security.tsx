"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const categories = [
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

export function Security() {
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
            SECURITY
          </p>
          <h2 className="mx-auto max-w-[600px] text-3xl font-semibold tracking-tight text-white md:text-[2.4rem]">
            Security isn&apos;t a feature. It&apos;s the foundation.
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease }}
              className="rounded-2xl border border-white/[0.08] bg-[#0d1420] p-5"
            >
              <h3 className="mb-3 text-[15px] font-semibold text-white">
                {cat.title}
              </h3>
              <ul className="space-y-1">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="text-[13.5px] text-white/55 before:mr-1.5 before:text-white/20 before:content-['·']"
                  >
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
