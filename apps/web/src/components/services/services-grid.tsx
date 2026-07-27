"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const categories = [
  {
    id: "svc-1",
    num: "01",
    label: "Custom Development",
    title: "Custom Development",
    desc: "End-to-end product builds for teams that need more than a template.",
    useCases: ["Website", "Web App", "Mobile App", "Enterprise Dashboard"],
    benefits: [
      "Tailored to your workflow",
      "Built to scale from day one",
      "Full source code ownership",
    ],
    deliverables: [
      "Production codebase",
      "Component library",
      "Deployment pipeline",
    ],
    timeline: "6–14 weeks depending on scope",
  },
  {
    id: "svc-2",
    num: "02",
    label: "Business Systems",
    title: "Business Systems",
    desc: "Operational software that runs the parts of your business spreadsheets can't.",
    useCases: [
      "POS",
      "ERP",
      "CRM",
      "Inventory",
      "HRIS",
      "Booking",
      "Membership",
    ],
    benefits: [
      "Replaces manual processes",
      "Single source of truth",
      "Role-based access control",
    ],
    deliverables: ["Admin dashboard", "Data migration", "User training"],
    timeline: "8–16 weeks depending on modules",
  },
  {
    id: "svc-3",
    num: "03",
    label: "Engineering",
    title: "Engineering",
    desc: "Deep technical work for teams that already have a product and need it done right.",
    useCases: [
      "API",
      "Database",
      "Authentication",
      "Architecture Review",
      "Performance",
      "Security Audit",
    ],
    benefits: [
      "Reduces technical debt",
      "Improves system reliability",
      "Documented decisions",
    ],
    deliverables: [
      "Technical audit report",
      "Refactored codebase",
      "Architecture diagram",
    ],
    timeline: "2–8 weeks depending on depth",
  },
  {
    id: "svc-4",
    num: "04",
    label: "Cloud",
    title: "Cloud",
    desc: "Infrastructure that stays online and costs what it should.",
    useCases: [
      "Cloud Infrastructure",
      "Migration",
      "DevOps",
      "Maintenance",
      "Monitoring",
    ],
    benefits: [
      "Predictable uptime",
      "Lower infrastructure cost",
      "Faster deployments",
    ],
    deliverables: [
      "Infrastructure-as-code",
      "CI/CD pipeline",
      "Monitoring dashboard",
    ],
    timeline: "3–6 weeks setup, ongoing for maintenance",
  },
  {
    id: "svc-5",
    num: "05",
    label: "AI",
    title: "AI",
    desc: "Automation and intelligence layered onto your existing systems.",
    useCases: ["Automation", "Internal Tools", "AI Integration", "Analytics"],
    benefits: [
      "Removes repetitive manual work",
      "Faster internal operations",
      "Data-driven decisions",
    ],
    deliverables: [
      "Automation workflows",
      "Internal tool",
      "Analytics dashboard",
    ],
    timeline: "4–10 weeks depending on scope",
  },
];

export function ServicesGrid() {
  const [active, setActive] = useState(0);

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
            SERVICES
          </p>
          <h2 className="mx-auto max-w-[600px] text-3xl font-semibold tracking-tight text-white md:text-[2.4rem]">
            Five categories. One engineering standard.
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-7 lg:grid-cols-[280px_1fr]">
          {/* Tab list */}
          <div
            className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible"
            role="tablist"
            aria-label="Service categories"
          >
            {categories.map((cat, i) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`flex items-center gap-3 rounded-[10px] border px-[18px] py-4 text-left text-[15px] whitespace-nowrap transition-all duration-250 ${
                  i === active
                    ? "border-white/[0.16] bg-[#0d1420] font-semibold text-white"
                    : "border-transparent text-white/55 hover:bg-[#0d1420]/50"
                }`}
              >
                <span
                  className={`font-mono text-xs ${
                    i === active ? "text-sky-300" : "text-white/25"
                  }`}
                >
                  {cat.num}
                </span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Panels */}
          <div>
            {categories.map((cat, i) => (
              <motion.article
                key={cat.id}
                role="tabpanel"
                initial={false}
                animate={{
                  opacity: i === active ? 1 : 0,
                  display: i === active ? "block" : "none",
                }}
                transition={{ duration: 0.35, ease }}
              >
                <h3 className="mb-3 text-2xl font-semibold text-white">
                  {cat.title}
                </h3>
                <p className="mb-6 max-w-[560px] text-[15px] text-white/55">
                  {cat.desc}
                </p>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <h4 className="mb-3 font-mono text-[11px] tracking-[0.08em] text-sky-300 uppercase">
                      Use Cases
                    </h4>
                    <ul className="space-y-2">
                      {cat.useCases.map((item) => (
                        <li
                          key={item}
                          className="border-b border-white/[0.06] pb-2 text-[13.5px] text-white/55"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-3 font-mono text-[11px] tracking-[0.08em] text-sky-300 uppercase">
                      Key Benefits
                    </h4>
                    <ul className="space-y-2">
                      {cat.benefits.map((item) => (
                        <li
                          key={item}
                          className="border-b border-white/[0.06] pb-2 text-[13.5px] text-white/55"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-3 font-mono text-[11px] tracking-[0.08em] text-sky-300 uppercase">
                      Deliverables
                    </h4>
                    <ul className="space-y-2">
                      {cat.deliverables.map((item) => (
                        <li
                          key={item}
                          className="border-b border-white/[0.06] pb-2 text-[13.5px] text-white/55"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-3 font-mono text-[11px] tracking-[0.08em] text-sky-300 uppercase">
                      Timeline
                    </h4>
                    <p className="text-[14px] text-white">{cat.timeline}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
