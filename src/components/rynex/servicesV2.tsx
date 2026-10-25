"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface ServiceTab {
  number: string;
  label: string;
  title: string;
  description: string;
  useCases: string[];
  benefits: string[];
  deliverables: string[];
  timeline: string;
}

const services: ServiceTab[] = [
  {
    number: "01",
    label: "Custom Development",
    title: "Custom Development",
    description:
      "End-to-end product builds for teams that need more than a template.",
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
    number: "02",
    label: "Business Systems",
    title: "Business Systems",
    description:
      "Operational software that runs the parts of your business spreadsheets can't.",
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
    number: "03",
    label: "Engineering",
    title: "Engineering",
    description:
      "Deep technical work for teams that already have a product and need it done right.",
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
    number: "04",
    label: "Cloud",
    title: "Cloud",
    description: "Infrastructure that stays online and costs what it should.",
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
    number: "05",
    label: "AI",
    title: "AI",
    description:
      "Automation and intelligence layered onto your existing systems.",
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

/* ------------------------------------------------------------------ */
/*  Easing                                                             */
/* ------------------------------------------------------------------ */

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/*  Section Header                                                     */
/* ------------------------------------------------------------------ */

function SectionHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="mb-12 text-center md:mb-16"
    >
      <span className="font-mono text-xs font-semibold tracking-[0.2em] text-sky-300 uppercase">
        Services
      </span>
      <h2 className="font-display mt-4 mb-4 text-3xl font-bold tracking-tight md:text-5xl">
        Five categories.{" "}
        <span className="text-muted-foreground">One engineering standard.</span>
      </h2>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Content Panel                                                      */
/* ------------------------------------------------------------------ */

function ContentPanel({ service }: { service: ServiceTab }) {
  return (
    <motion.div
      key={service.number}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="bg-card/50 rounded-2xl border border-white/[0.08] p-7 backdrop-blur-sm"
    >
      <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
        {service.title}
      </h3>
      <p className="text-muted-foreground mt-2 mb-8 max-w-lg text-[15px] leading-relaxed">
        {service.description}
      </p>

      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
        {/* Use Cases */}
        <div>
          <h4 className="mb-3 font-mono text-[11px] tracking-wider text-sky-300 uppercase">
            Use Cases
          </h4>
          <ul className="space-y-1.5">
            {service.useCases.map((item) => (
              <li
                key={item}
                className="text-muted-foreground text-[13.5px] leading-relaxed"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Key Benefits */}
        <div>
          <h4 className="mb-3 font-mono text-[11px] tracking-wider text-sky-300 uppercase">
            Key Benefits
          </h4>
          <ul className="space-y-1.5">
            {service.benefits.map((item) => (
              <li
                key={item}
                className="text-muted-foreground text-[13.5px] leading-relaxed"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Deliverables */}
        <div>
          <h4 className="mb-3 font-mono text-[11px] tracking-wider text-sky-300 uppercase">
            Deliverables
          </h4>
          <ul className="space-y-1.5">
            {service.deliverables.map((item) => (
              <li
                key={item}
                className="text-muted-foreground text-[13.5px] leading-relaxed"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Timeline */}
        <div>
          <h4 className="mb-3 font-mono text-[11px] tracking-wider text-sky-300 uppercase">
            Timeline
          </h4>
          <p className="text-muted-foreground text-[13.5px] leading-relaxed">
            {service.timeline}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Export                                                         */
/* ------------------------------------------------------------------ */

export function ServicesV2Section() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative py-28 md:py-36">
      <div className="mx-auto max-w-screen-xl px-4 md:px-6 lg:px-8">
        <SectionHeader />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-col gap-8 lg:flex-row lg:gap-10"
        >
          {/* Sidebar — vertical tabs on desktop, horizontal scroll on mobile */}
          <div className="flex gap-2 overflow-x-auto lg:w-56 lg:shrink-0 lg:flex-col lg:overflow-x-visible">
            {services.map((service, i) => {
              const isActive = i === activeTab;
              return (
                <button
                  key={service.number}
                  onClick={() => setActiveTab(i)}
                  className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3.5 text-left transition-all duration-300 ${
                    isActive
                      ? "bg-card text-foreground border border-white/[0.16] font-semibold"
                      : "text-muted-foreground hover:bg-card/50 border border-transparent"
                  }`}
                >
                  <span
                    className={`font-mono text-xs ${
                      isActive ? "text-sky-300" : "text-muted-foreground/60"
                    }`}
                  >
                    {service.number}
                  </span>
                  <span className="text-sm whitespace-nowrap">
                    {service.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Content panel */}
          <div className="min-w-0 flex-1">
            <AnimatePresence mode="wait">
              <ContentPanel key={activeTab} service={services[activeTab]} />
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
