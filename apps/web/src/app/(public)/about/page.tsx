"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CheckCircle,
  Globe,
  GraduationCap,
  Heart,
  HeartPulse,
  Layers,
  Menu,
  Rocket,
  Shield,
  ShoppingCart,
  Target,
  Truck,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

/* ─── Shared ──────────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease },
};

const stagger = (i: number) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, delay: i * 0.08, ease },
});

/* ─── Hero ────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="bg-background relative min-h-[90vh] overflow-hidden">
      {/* Blueprint grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Aurora glow */}
      <div className="pointer-events-none absolute top-1/4 -left-40 h-[500px] w-[500px] rounded-full bg-[#4FA3D1]/8 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full bg-[#2563EB]/8 blur-[100px]" />

      <div className="relative z-10 container mx-auto flex min-h-[90vh] items-center px-4 md:px-6 lg:px-8">
        <div className="grid w-full gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Left - Copy */}
          <div>
            <motion.div {...fadeUp}>
              <span className="text-primary mb-6 inline-block font-mono text-xs font-semibold tracking-[0.2em] uppercase">
                About Rynex
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
              className="mb-6 text-4xl leading-[1.1] font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
            >
              We Don&apos;t Just Build Software.
              <br />
              <span className="gradient-text">
                We Engineer Digital Systems.
              </span>
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.2 }}
              className="text-muted-foreground mb-10 max-w-lg text-lg leading-relaxed"
            >
              Every successful business deserves technology that is secure,
              scalable, and built to last. At Rynex, we transform ideas into
              production-ready software through engineering, architecture, and
              thoughtful design.
            </motion.p>

            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/contact"
                className="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-[0_4px_24px_rgba(79,163,209,0.3)] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(79,163,209,0.4)]"
              >
                Start Your Project
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#how-we-work"
                className="border-border bg-card/50 text-muted-foreground hover:border-primary/30 hover:bg-primary/5 hover:text-foreground inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium backdrop-blur-sm transition-all duration-300"
              >
                Learn Our Process
              </Link>
            </motion.div>
          </div>

          {/* Right - Architecture Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease }}
            className="hidden lg:block"
          >
            <div className="relative">
              <Image
                src="/assets/hero/software-architecture.svg"
                alt="Software Architecture"
                width={500}
                height={500}
                className="h-auto w-full object-contain opacity-80"
                priority
              />
              <div className="pointer-events-none absolute inset-0 rounded-full bg-[#4FA3D1]/5 blur-[80px]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Who We Are ──────────────────────────────────────────── */

function WhoWeAre() {
  return (
    <section className="bg-background relative py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            {...fadeUp}
            className="text-primary mb-4 inline-block font-mono text-xs font-semibold tracking-[0.2em] uppercase"
          >
            Who We Are
          </motion.span>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="mb-6 text-3xl font-bold tracking-tight text-white md:text-5xl"
          >
            Engineering Beyond Development
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="text-muted-foreground text-lg leading-relaxed"
          >
            Rynex is a Software Engineering Company specializing in building
            custom digital products for startups, businesses, organizations, and
            enterprises.
          </motion.p>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.3 }}
            className="text-muted-foreground mt-4 text-lg leading-relaxed"
          >
            We believe software should solve problems, not create new ones.
            Every solution is designed with long-term scalability, security, and
            maintainability in mind.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

/* ─── Why We Started ──────────────────────────────────────── */

function WhyWeStarted() {
  return (
    <section className="bg-background relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute top-0 -left-40 h-[400px] w-[400px] rounded-full bg-[#2563EB]/5 blur-[100px]" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="relative hidden lg:block"
          >
            <div className="relative h-[400px] w-full">
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 400 400"
                fill="none"
              >
                {/* Puzzle pieces */}
                <rect
                  x="40"
                  y="40"
                  width="140"
                  height="140"
                  rx="16"
                  fill="rgba(79,163,209,0.1)"
                  stroke="rgba(79,163,209,0.25)"
                  strokeWidth="1.5"
                />
                <rect
                  x="200"
                  y="40"
                  width="140"
                  height="140"
                  rx="16"
                  fill="rgba(37,99,235,0.1)"
                  stroke="rgba(37,99,235,0.25)"
                  strokeWidth="1.5"
                />
                <rect
                  x="40"
                  y="200"
                  width="140"
                  height="140"
                  rx="16"
                  fill="rgba(37,99,235,0.1)"
                  stroke="rgba(37,99,235,0.25)"
                  strokeWidth="1.5"
                />
                <rect
                  x="200"
                  y="200"
                  width="140"
                  height="140"
                  rx="16"
                  fill="rgba(79,163,209,0.1)"
                  stroke="rgba(79,163,209,0.25)"
                  strokeWidth="1.5"
                />

                {/* Connection dots */}
                <circle cx="180" cy="110" r="4" fill="rgba(79,163,209,0.5)" />
                <circle cx="200" cy="110" r="4" fill="rgba(37,99,235,0.5)" />
                <line
                  x1="184"
                  y1="110"
                  x2="196"
                  y2="110"
                  stroke="rgba(79,163,209,0.4)"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />

                <circle cx="110" cy="180" r="4" fill="rgba(79,163,209,0.5)" />
                <circle cx="110" cy="200" r="4" fill="rgba(37,99,235,0.5)" />
                <line
                  x1="110"
                  y1="184"
                  x2="110"
                  y2="196"
                  stroke="rgba(79,163,209,0.4)"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />

                <circle cx="270" cy="180" r="4" fill="rgba(37,99,235,0.5)" />
                <circle cx="270" cy="200" r="4" fill="rgba(79,163,209,0.5)" />
                <line
                  x1="270"
                  y1="184"
                  x2="270"
                  y2="196"
                  stroke="rgba(37,99,235,0.4)"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />

                <circle cx="180" cy="270" r="4" fill="rgba(37,99,235,0.5)" />
                <circle cx="200" cy="270" r="4" fill="rgba(79,163,209,0.5)" />
                <line
                  x1="184"
                  y1="270"
                  x2="196"
                  y2="270"
                  stroke="rgba(37,99,235,0.4)"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />

                {/* Center connection */}
                <circle cx="200" cy="200" r="6" fill="rgba(79,163,209,0.6)" />
                <circle
                  cx="200"
                  cy="200"
                  r="12"
                  fill="none"
                  stroke="rgba(79,163,209,0.3)"
                  strokeWidth="1"
                />
              </svg>
            </div>
          </motion.div>

          {/* Right - Copy */}
          <div>
            <motion.span
              {...fadeUp}
              className="text-primary mb-4 inline-block font-mono text-xs font-semibold tracking-[0.2em] uppercase"
            >
              Why We Started
            </motion.span>
            <motion.h2
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
              className="mb-6 text-3xl font-bold tracking-tight text-white md:text-5xl"
            >
              Why Rynex Exists
            </motion.h2>
            <motion.p
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.2 }}
              className="text-muted-foreground mb-6 text-lg leading-relaxed"
            >
              Many businesses rely on software that doesn&apos;t truly fit the
              way they work. Generic solutions often force companies to change
              their processes instead of empowering them.
            </motion.p>
            <motion.p
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.3 }}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              Rynex exists to build software that adapts to businesses, not the
              other way around.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Philosophy ──────────────────────────────────────────── */

const philosophies = [
  {
    icon: Target,
    title: "Think Before Build",
    description:
      "Every project begins with understanding business goals, users, and workflows.",
  },
  {
    icon: Layers,
    title: "Architecture First",
    description:
      "We design systems before writing code to ensure scalability and maintainability.",
  },
  {
    icon: Shield,
    title: "Security By Default",
    description:
      "Security is integrated into every stage of development, not added afterward.",
  },
];

function Philosophy() {
  return (
    <section className="bg-background relative py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.span
            {...fadeUp}
            className="text-primary mb-4 inline-block font-mono text-xs font-semibold tracking-[0.2em] uppercase"
          >
            Our Philosophy
          </motion.span>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-3xl font-bold tracking-tight text-white md:text-5xl"
          >
            How We Think
          </motion.h2>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {philosophies.map((item, i) => (
            <motion.div
              key={item.title}
              {...stagger(i)}
              className="border-border bg-card/50 group hover:border-primary/20 hover:bg-primary/[0.03] rounded-2xl border p-8 backdrop-blur-sm transition-all duration-500"
            >
              <div className="bg-primary/10 mb-5 flex h-12 w-12 items-center justify-center rounded-2xl">
                <item.icon className="text-primary h-5 w-5" />
              </div>
              <h3 className="mb-3 text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── How We Work (Sticky Scroll) ─────────────────────────── */

const workSteps = [
  {
    number: "01",
    title: "Discover",
    headline: "Business Analysis",
    description:
      "We dive deep into your business model, users, workflows, and pain points to understand what truly matters.",
    deliverables: [
      "Business Analysis Report",
      "User Personas",
      "Pain Point Map",
    ],
  },
  {
    number: "02",
    title: "Architecture",
    headline: "Software Architecture",
    description:
      "We design the system architecture, defining modules, data flows, integrations, and technology choices.",
    deliverables: [
      "Architecture Diagram",
      "Tech Stack Decision",
      "Integration Map",
    ],
  },
  {
    number: "03",
    title: "Design",
    headline: "UML & System Design",
    description:
      "Detailed system design with entity relationships, sequence diagrams, and API contracts.",
    deliverables: ["ERD Diagram", "Sequence Diagrams", "API Specification"],
  },
  {
    number: "04",
    title: "Wireframe",
    headline: "Wireframe",
    description:
      "Low-fidelity wireframes to validate layout, navigation, and user flows before visual design.",
    deliverables: [
      "Wireframe Set",
      "User Flow Diagram",
      "Information Architecture",
    ],
  },
  {
    number: "05",
    title: "Experience",
    headline: "UI/UX Design",
    description:
      "High-fidelity designs with component systems, responsive layouts, and micro-interactions.",
    deliverables: ["Design System", "UI Mockups", "Prototype"],
  },
  {
    number: "06",
    title: "Build",
    headline: "Development",
    description:
      "Clean, modular code built with modern frameworks. Test-driven development with CI/CD pipelines.",
    deliverables: ["Source Code", "Unit Tests", "API Documentation"],
  },
  {
    number: "07",
    title: "Security",
    headline: "Testing",
    description:
      "Comprehensive testing, unit, integration, security, and performance, before any deployment.",
    deliverables: ["Test Reports", "Security Audit", "Performance Metrics"],
  },
  {
    number: "08",
    title: "Launch",
    headline: "Deployment",
    description:
      "Production deployment with monitoring, backups, and infrastructure configured for scale.",
    deliverables: ["Production Environment", "Monitoring Dashboard", "Runbook"],
  },
  {
    number: "09",
    title: "Support",
    headline: "Maintenance",
    description:
      "Ongoing support, updates, and optimization to keep your system running smoothly.",
    deliverables: ["Support SLA", "Update Schedule", "Performance Reports"],
  },
];

function HowWeWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      className="relative"
      style={{ backgroundColor: "#09090B" }}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="pt-24 pb-16 text-center md:pt-32">
          <motion.span
            {...fadeUp}
            className="text-primary mb-4 inline-block font-mono text-xs font-semibold tracking-[0.2em] uppercase"
          >
            How We Work
          </motion.span>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-3xl font-bold tracking-tight text-white md:text-5xl"
          >
            Our Process
          </motion.h2>
        </div>
      </div>

      {/* Sticky scroll - Desktop */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="relative flex gap-16">
            {/* Left - Sticky progress */}
            <div className="sticky top-28 h-fit w-2/5 shrink-0 py-12">
              <div className="relative">
                {/* Progress line */}
                <div className="bg-border absolute top-0 left-[15px] h-full w-px">
                  <motion.div
                    className="from-primary to-primary/50 w-full bg-gradient-to-b"
                    style={{ height: lineHeight }}
                  />
                </div>

                {/* Steps list */}
                <div className="space-y-6">
                  {workSteps.map((step) => (
                    <motion.div
                      key={step.number}
                      initial={{ opacity: 0.3 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: false, margin: "-40%" }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-4"
                    >
                      <div className="border-primary/30 bg-background relative z-10 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border">
                        <span className="text-primary font-mono text-[10px] font-bold">
                          {step.number}
                        </span>
                      </div>
                      <span className="text-muted-foreground text-sm font-medium">
                        {step.title}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Step cards */}
            <div className="w-3/5 space-y-8 py-12">
              {workSteps.map((step, i) => (
                <motion.div
                  key={step.number}
                  {...stagger(i)}
                  className="border-border bg-card/50 rounded-2xl border p-8 backdrop-blur-sm"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-primary font-mono text-xs font-bold">
                      {step.number}
                    </span>
                    <span className="bg-border h-px flex-1" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-white">
                    {step.headline}
                  </h3>
                  <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                    {step.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {step.deliverables.map((d) => (
                      <span
                        key={d}
                        className="border-primary/20 bg-primary/5 text-primary rounded-full border px-3 py-1 font-mono text-[10px]"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile - Stacked */}
      <div className="lg:hidden">
        <div className="container mx-auto space-y-4 px-4 pb-24 md:px-6">
          {workSteps.map((step, i) => (
            <motion.div
              key={step.number}
              {...stagger(i)}
              className="border-border bg-card/50 rounded-2xl border p-5"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="bg-primary/10 text-primary flex h-7 w-7 items-center justify-center rounded-full font-mono text-[10px] font-bold">
                  {step.number}
                </span>
                <span className="text-muted-foreground text-xs font-medium">
                  {step.title}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">
                {step.headline}
              </h3>
              <p className="text-muted-foreground mb-4 text-xs leading-relaxed">
                {step.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {step.deliverables.map((d) => (
                  <span
                    key={d}
                    className="border-primary/20 bg-primary/5 text-primary rounded-full border px-2.5 py-0.5 font-mono text-[9px]"
                  >
                    {d}
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

/* ─── Engineering Principles ──────────────────────────────── */

const principles = [
  "Clean Architecture",
  "Modular Systems",
  "SOLID Principles",
  "Scalable Infrastructure",
  "Secure Development",
  "Reusable Components",
  "API-first Development",
  "Performance Optimization",
  "Documentation",
  "Automation",
  "Testing",
  "Continuous Improvement",
];

function EngineeringPrinciples() {
  return (
    <section className="bg-background relative py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.span
            {...fadeUp}
            className="text-primary mb-4 inline-block font-mono text-xs font-semibold tracking-[0.2em] uppercase"
          >
            Engineering Principles
          </motion.span>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-3xl font-bold tracking-tight text-white md:text-5xl"
          >
            What Guides Our Code
          </motion.h2>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
          {principles.map((item, i) => (
            <motion.div
              key={item}
              {...stagger(i)}
              className="border-border bg-card/50 group hover:border-primary/20 hover:bg-primary/[0.03] flex items-center gap-3 rounded-2xl border px-5 py-4 transition-all duration-300"
            >
              <CheckCircle className="text-primary/60 group-hover:text-primary h-4 w-4 shrink-0" />
              <span className="text-muted-foreground text-sm font-medium">
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Technologies ────────────────────────────────────────── */

const technologies = [
  { name: "Next.js", logo: "/website-assets/02-tech-logos/nextjs.svg" },
  { name: "React", logo: "/website-assets/02-tech-logos/react.svg" },
  { name: "TypeScript", logo: "/website-assets/02-tech-logos/typescript.svg" },
  { name: "PostgreSQL", logo: "/website-assets/02-tech-logos/postgresql.svg" },
];

function Technologies() {
  return (
    <section className="bg-background relative py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.span
            {...fadeUp}
            className="text-primary mb-4 inline-block font-mono text-xs font-semibold tracking-[0.2em] uppercase"
          >
            Technologies
          </motion.span>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-3xl font-bold tracking-tight text-white md:text-5xl"
          >
            Built With Modern Technology
          </motion.h2>
        </div>

        {/* Floating logo clusters */}
        <div className="relative mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-6 md:gap-10">
          {technologies.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease,
              }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="border-border bg-card/50 group hover:border-primary/20 hover:bg-primary/[0.05] flex h-20 w-20 flex-col items-center justify-center gap-2 rounded-2xl border p-4 backdrop-blur-sm transition-all duration-300 md:h-24 md:w-24"
            >
              <Image
                src={tech.logo}
                alt={tech.name}
                width={32}
                height={32}
                className="h-8 w-8 object-contain opacity-70 group-hover:opacity-100 md:h-10 md:w-10"
              />
              <span className="text-muted-foreground group-hover:text-foreground text-[9px] font-medium md:text-[10px]">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Industries ──────────────────────────────────────────── */

const industries = [
  { icon: Rocket, name: "Startup" },
  { icon: Building2, name: "SME" },
  { icon: Globe, name: "Enterprise" },
  { icon: GraduationCap, name: "Education" },
  { icon: HeartPulse, name: "Healthcare" },
  { icon: ShoppingCart, name: "Retail" },
  { icon: Menu, name: "Restaurant" },
  { icon: Truck, name: "Logistics" },
  { icon: Users, name: "Government" },
  { icon: Heart, name: "Community" },
];

function Industries() {
  return (
    <section className="bg-background relative py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.span
            {...fadeUp}
            className="text-primary mb-4 inline-block font-mono text-xs font-semibold tracking-[0.2em] uppercase"
          >
            Industries
          </motion.span>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-3xl font-bold tracking-tight text-white md:text-5xl"
          >
            Industries We Help
          </motion.h2>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 md:gap-5">
          {industries.map((item, i) => (
            <motion.div
              key={item.name}
              {...stagger(i)}
              className="border-border bg-card/50 group hover:border-primary/20 hover:bg-primary/[0.03] flex flex-col items-center gap-3 rounded-2xl border p-5 transition-all duration-300"
            >
              <item.icon className="text-primary/60 group-hover:text-primary h-6 w-6" />
              <span className="text-muted-foreground text-xs font-medium">
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── What We Build ───────────────────────────────────────── */

const whatWeBuild = [
  "Company Profile",
  "Custom Website",
  "Business Dashboard",
  "POS",
  "CRM",
  "ERP",
  "HRIS",
  "Inventory",
  "Booking System",
  "Learning Platform",
  "Community Platform",
  "Mobile Apps",
  "API Integration",
  "AI Solutions",
];

function WhatWeBuild() {
  return (
    <section className="bg-background relative py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.span
            {...fadeUp}
            className="text-primary mb-4 inline-block font-mono text-xs font-semibold tracking-[0.2em] uppercase"
          >
            What We Build
          </motion.span>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-3xl font-bold tracking-tight text-white md:text-5xl"
          >
            Products We Deliver
          </motion.h2>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-5">
          {whatWeBuild.map((item, i) => (
            <motion.div
              key={item}
              {...stagger(i)}
              className="border-border bg-card/50 group hover:border-primary/20 hover:bg-primary/[0.03] rounded-2xl border p-5 transition-all duration-300"
            >
              <span className="text-muted-foreground group-hover:text-foreground text-sm font-medium">
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Why Choose Rynex ────────────────────────────────────── */

const reasons = [
  {
    title: "Custom Built",
    description: "No unnecessary features.",
  },
  {
    title: "Scalable",
    description: "Ready to grow.",
  },
  {
    title: "Secure",
    description: "Following industry best practices.",
  },
  {
    title: "Maintainable",
    description: "Clean code and documentation.",
  },
  {
    title: "Collaborative",
    description: "Transparent communication.",
  },
  {
    title: "Future Ready",
    description: "Built with modern technologies.",
  },
];

function WhyChoose() {
  return (
    <section className="bg-background relative py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.span
            {...fadeUp}
            className="text-primary mb-4 inline-block font-mono text-xs font-semibold tracking-[0.2em] uppercase"
          >
            Why Rynex
          </motion.span>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-3xl font-bold tracking-tight text-white md:text-5xl"
          >
            Why Businesses Choose Rynex
          </motion.h2>
        </div>

        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
          {reasons.map((item, i) => (
            <motion.div
              key={item.title}
              {...stagger(i)}
              className="border-border bg-card/50 group hover:border-primary/20 hover:bg-primary/[0.03] rounded-2xl border p-8 backdrop-blur-sm transition-all duration-500"
            >
              <h3 className="mb-2 text-lg font-bold text-white">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Statistics ──────────────────────────────────────────── */

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "4+", label: "Years of Experience" },
  { value: "15+", label: "Technologies Used" },
  { value: "100K+", label: "Lines of Code" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "2 Weeks", label: "Average Delivery" },
];

function Statistics() {
  return (
    <section className="bg-background relative py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.span
            {...fadeUp}
            className="text-primary mb-4 inline-block font-mono text-xs font-semibold tracking-[0.2em] uppercase"
          >
            Statistics
          </motion.span>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-3xl font-bold tracking-tight text-white md:text-5xl"
          >
            Our Impact
          </motion.h2>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-3 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              {...stagger(i)}
              className="text-center"
            >
              <p className="mb-2 text-4xl font-bold text-white md:text-5xl">
                {stat.value}
              </p>
              <p className="text-muted-foreground font-mono text-xs tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Vision ──────────────────────────────────────────────── */

function Vision() {
  return (
    <section className="bg-background relative py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            {...fadeUp}
            className="text-primary mb-4 inline-block font-mono text-xs font-semibold tracking-[0.2em] uppercase"
          >
            Vision
          </motion.span>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="mb-6 text-3xl font-bold tracking-tight text-white md:text-5xl"
          >
            Building Technology That Lasts
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="text-muted-foreground text-lg leading-relaxed"
          >
            Our vision is to become a trusted software engineering company that
            helps organizations build reliable digital products through modern
            architecture, secure development, and continuous innovation.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

/* ─── Mission ─────────────────────────────────────────────── */

const missions = [
  "Deliver Quality Software",
  "Promote Engineering Excellence",
  "Prioritize Security",
  "Create Sustainable Solutions",
  "Empower Businesses Through Technology",
];

function Mission() {
  return (
    <section className="bg-background relative py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.span
            {...fadeUp}
            className="text-primary mb-4 inline-block font-mono text-xs font-semibold tracking-[0.2em] uppercase"
          >
            Mission
          </motion.span>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-3xl font-bold tracking-tight text-white md:text-5xl"
          >
            Our Mission
          </motion.h2>
        </div>

        <div className="mx-auto grid max-w-3xl gap-4 md:grid-cols-2 md:gap-5">
          {missions.map((item, i) => (
            <motion.div
              key={item}
              {...stagger(i)}
              className="border-border bg-card/50 group hover:border-primary/20 hover:bg-primary/[0.03] flex items-center gap-3 rounded-2xl border px-5 py-4 transition-all duration-300"
            >
              <Zap className="text-primary/60 group-hover:text-primary h-4 w-4 shrink-0" />
              <span className="text-muted-foreground text-sm font-medium">
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Closing CTA ─────────────────────────────────────────── */

function ClosingCTA() {
  return (
    <section className="bg-background relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4FA3D1]/5 blur-[150px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            {...fadeUp}
            className="mb-6 text-3xl font-bold tracking-tight text-white md:text-5xl"
          >
            Let&apos;s Build Something Meaningful
            <br />
            <span className="gradient-text">Together.</span>
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-muted-foreground mb-10 text-lg leading-relaxed"
          >
            Whether you&apos;re building a startup, modernizing an existing
            system, or creating a completely new platform, Rynex is ready to
            engineer the right solution.
          </motion.p>
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#4FA3D1] px-6 py-3 text-sm font-semibold text-[#09090B] shadow-[0_4px_24px_rgba(79,163,209,0.3)] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(79,163,209,0.4)]"
            >
              Start Your Project
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-[#4FA3D1]/30 hover:bg-[#4FA3D1]/5 hover:text-white"
            >
              Schedule Consultation
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Page ────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <main>
      <Hero />
      <WhoWeAre />
      <WhyWeStarted />
      <Philosophy />
      <HowWeWork />
      <EngineeringPrinciples />
      <Technologies />
      <Industries />
      <WhatWeBuild />
      <WhyChoose />
      <Statistics />
      <Vision />
      <Mission />
      <ClosingCTA />
    </main>
  );
}
