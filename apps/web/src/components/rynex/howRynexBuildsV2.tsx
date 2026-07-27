"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  Blocks,
  Check,
  Code,
  Compass,
  Palette,
  Rocket,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { type FC, useEffect, useRef, useState } from "react";

import { SectionBackgrounds } from "../backgrounds/sectionBackgrounds";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface StepData {
  number: string;
  title: string;
  headline: string;
  description: string;
  icon: FC<{ className?: string }>;
  deliverables: string[];
  visual: { label: string; items: string[] };
}

const steps: StepData[] = [
  {
    number: "01",
    title: "Discover",
    headline: "Understand Before Building",
    description:
      "Every project begins with understanding your business goals, workflows, users, challenges, and opportunities.",
    icon: Compass,
    deliverables: [
      "Requirement Gathering",
      "Business Analysis",
      "Stakeholder Interview",
      "User Journey",
    ],
    visual: {
      label: "Research Board",
      items: [
        "Sticky Notes",
        "Business Flow",
        "Persona Map",
        "Competitor Audit",
      ],
    },
  },
  {
    number: "02",
    title: "Architecture",
    headline: "Architecture is the Foundation",
    description:
      "Before writing code, we design how every part of the system communicates, from database schema to API contracts.",
    icon: Blocks,
    deliverables: [
      "Software Architecture",
      "System Design",
      "Database Planning",
      "API Design",
      "UML Diagrams",
    ],
    visual: {
      label: "System Architecture",
      items: ["Frontend", "API Layer", "Services", "Database"],
    },
  },
  {
    number: "03",
    title: "Design",
    headline: "Design With Purpose",
    description:
      "Interfaces are crafted with intent, pixel-perfect, accessible, and built on a scalable design system.",
    icon: Palette,
    deliverables: [
      "Wireframes",
      "UI/UX Design",
      "Design System",
      "Prototype",
      "Responsive Layout",
    ],
    visual: {
      label: "Design System",
      items: ["Wireframes", "Component Library", "Figma", "Prototype"],
    },
  },
  {
    number: "04",
    title: "Develop",
    headline: "Engineering With Standards",
    description:
      "Clean, typed, tested, and secure code, engineered to production standards from the first commit.",
    icon: Code,
    deliverables: [
      "Clean Code",
      "Type Safety",
      "Testing",
      "Security Hardening",
      "Documentation",
    ],
    visual: {
      label: "Development Stack",
      items: ["Editor", "Git", "Terminal", "CI Pipeline"],
    },
  },
  {
    number: "05",
    title: "Deploy",
    headline: "Production Ready",
    description:
      "Automated pipelines, containerized environments, and observability, deployed with confidence.",
    icon: Rocket,
    deliverables: [
      "CI/CD Pipeline",
      "Docker",
      "Cloud Infrastructure",
      "Monitoring",
      "Rollback Strategy",
    ],
    visual: {
      label: "Deployment Pipeline",
      items: ["Build", "Test", "Deploy", "Monitor"],
    },
  },
  {
    number: "06",
    title: "Support",
    headline: "Your Software Keeps Growing",
    description:
      "Post-launch, we optimize, expand features, scale infrastructure, and provide ongoing technical support.",
    icon: TrendingUp,
    deliverables: [
      "Maintenance",
      "Optimization",
      "Feature Expansion",
      "Scaling",
      "Technical Support",
    ],
    visual: {
      label: "Analytics Dashboard",
      items: ["Dashboard", "Analytics", "Monitoring", "Updates"],
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Easing                                                             */
/* ------------------------------------------------------------------ */

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/*  Left Panel Sub-components                                          */
/* ------------------------------------------------------------------ */

function StepCounter({ active }: { active: number }) {
  return (
    <div className="mb-8 flex items-baseline gap-1">
      <motion.span
        key={active}
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-primary font-mono text-5xl font-bold tracking-tight md:text-6xl"
      >
        {String(active + 1).padStart(2, "0")}
      </motion.span>
      <span className="text-muted-foreground/50 font-mono text-2xl font-medium">
        / 06
      </span>
    </div>
  );
}

function ProgressBar({ active }: { active: number }) {
  return (
    <div className="mb-6">
      <div className="bg-border relative h-1 overflow-hidden rounded-full">
        <motion.div
          className="from-primary/60 to-primary absolute inset-y-0 left-0 rounded-full bg-gradient-to-r"
          animate={{ width: `${((active + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.6, ease: EASE }}
        />
      </div>
    </div>
  );
}

function StickyLeftPanel({ active }: { active: number }) {
  const step = steps[active];

  return (
    <div className="lg:sticky lg:top-28 lg:w-2/5 lg:shrink-0 lg:self-start">
      <div className="lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="text-primary mb-6 block font-mono text-xs font-semibold tracking-[0.2em] uppercase">
            Our Process
          </span>

          <h2 className="text-foreground mb-4 text-4xl leading-[1.1] font-bold tracking-tight md:text-5xl lg:text-6xl">
            How Rynex
            <br />
            <span className="gradient-text">Builds</span>
          </h2>

          <p className="text-muted-foreground mb-8 max-w-md text-base leading-relaxed">
            Every successful software product starts long before the first line
            of code. We engineer systems from strategy, architecture, security,
            and user experience to production.
          </p>

          <StepCounter active={active} />
          <ProgressBar active={active} />

          <motion.h3
            key={`title-${active}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="text-foreground mb-1 text-xl font-bold md:text-2xl"
          >
            {step.headline}
          </motion.h3>
          <motion.p
            key={`desc-${active}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.05, ease: EASE }}
            className="text-muted-foreground max-w-sm text-sm leading-relaxed"
          >
            {step.description}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Card Visuals                                                       */
/* ------------------------------------------------------------------ */

function DiscoverVisual() {
  return (
    <div className="relative">
      <Image
        src="/assets/workflow/discovery.svg"
        alt="Discovery Phase"
        width={400}
        height={250}
        className="border-primary/10 bg-primary/[0.02] h-auto w-full rounded-xl border object-contain p-4 opacity-80"
      />
      <div className="from-background pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-t via-transparent to-transparent" />
    </div>
  );
}

function ArchitectureVisual() {
  return (
    <div className="relative">
      <Image
        src="/assets/architecture/clean-architecture.svg"
        alt="Clean Architecture"
        width={400}
        height={250}
        className="border-primary/10 bg-primary/[0.02] h-auto w-full rounded-xl border object-contain p-4 opacity-80"
      />
      <div className="from-background pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-t via-transparent to-transparent" />
    </div>
  );
}

function DesignVisual() {
  return (
    <div className="relative">
      <Image
        src="/assets/workflow/ui-ux.svg"
        alt="UI/UX Design"
        width={400}
        height={250}
        className="border-primary/10 bg-primary/[0.02] h-auto w-full rounded-xl border object-contain p-4 opacity-80"
      />
      <div className="from-background pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-t via-transparent to-transparent" />
    </div>
  );
}

function DevelopVisual() {
  return (
    <div className="relative">
      <Image
        src="/assets/workflow/development.svg"
        alt="Development"
        width={400}
        height={250}
        className="border-primary/10 bg-primary/[0.02] h-auto w-full rounded-xl border object-contain p-4 opacity-80"
      />
      <div className="from-background pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-t via-transparent to-transparent" />
    </div>
  );
}

function DeployVisual() {
  return (
    <div className="relative">
      <Image
        src="/assets/workflow/deployment.svg"
        alt="Deployment Pipeline"
        width={400}
        height={250}
        className="border-primary/10 bg-primary/[0.02] h-auto w-full rounded-xl border object-contain p-4 opacity-80"
      />
      <div className="from-background pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-t via-transparent to-transparent" />
    </div>
  );
}

function SupportVisual() {
  return (
    <div className="relative">
      <Image
        src="/assets/dashboard/analytics.svg"
        alt="Analytics Dashboard"
        width={400}
        height={250}
        className="border-primary/10 bg-primary/[0.02] h-auto w-full rounded-xl border object-contain p-4 opacity-80"
      />
      <div className="from-background pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-t via-transparent to-transparent" />
    </div>
  );
}

const visuals: Record<string, FC> = {
  Discover: DiscoverVisual,
  Architecture: ArchitectureVisual,
  Design: DesignVisual,
  Develop: DevelopVisual,
  Deploy: DeployVisual,
  Support: SupportVisual,
};

/* ------------------------------------------------------------------ */
/*  Step Card - clean stacked layout                                   */
/* ------------------------------------------------------------------ */

function StepCard({ step, isActive }: { step: StepData; isActive: boolean }) {
  const Visual = visuals[step.title];
  const Icon = step.icon;
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.25, margin: "-8% 0px -8% 0px" }}
      transition={{ duration: 0.6, ease: EASE }}
      className="min-h-[80vh] py-6 md:min-h-[85vh] md:py-10"
    >
      <div
        className={`border-border bg-card/50 relative overflow-hidden rounded-2xl border p-6 backdrop-blur-xl transition-all duration-700 md:p-8 ${
          isActive
            ? "border-primary/20 shadow-[0_0_80px_-20px_rgba(79,163,209,0.15)]"
            : "opacity-70"
        }`}
      >
        {/* Gradient glow */}
        {isActive && (
          <div className="bg-primary/[0.06] pointer-events-none absolute -top-32 -right-32 h-64 w-64 rounded-full blur-[80px]" />
        )}

        {/* Header: icon + phase + title */}
        <div className="mb-5 flex items-center gap-4 md:mb-6">
          <motion.div
            animate={{
              backgroundColor: isActive
                ? "rgba(79, 163, 209, 0.15)"
                : "rgba(79, 163, 209, 0.05)",
              borderColor: isActive
                ? "rgba(79, 163, 209, 0.25)"
                : "rgba(79, 163, 209, 0.08)",
            }}
            transition={{ duration: 0.5 }}
            className="border-border flex h-11 w-11 items-center justify-center rounded-2xl border md:h-12 md:w-12"
          >
            <Icon
              className={`h-5 w-5 transition-colors duration-500 ${
                isActive ? "text-primary" : "text-primary/40"
              }`}
            />
          </motion.div>
          <div>
            <span className="text-muted-foreground/50 font-mono text-[10px] tracking-[0.2em] uppercase">
              Phase {step.number}
            </span>
            <h3
              className={`text-lg font-bold transition-colors duration-500 md:text-xl ${
                isActive ? "text-foreground" : "text-muted-foreground/50"
              }`}
            >
              {step.title}
            </h3>
          </div>
        </div>

        {/* Headline */}
        <motion.h4
          animate={{
            color: isActive
              ? isDark
                ? "#FFFFFF"
                : "#1C1E22"
              : isDark
                ? "rgba(184, 194, 204, 0.45)"
                : "rgba(107, 114, 128, 0.45)",
          }}
          transition={{ duration: 0.5 }}
          className="mb-2 text-xl leading-snug font-bold md:text-2xl"
        >
          {step.headline}
        </motion.h4>

        {/* Description */}
        <p className="text-muted-foreground mb-6 max-w-lg text-sm leading-relaxed md:text-base">
          {step.description}
        </p>

        {/* Visual illustration */}
        {Visual && (
          <div className="mb-6">
            <span className="text-muted-foreground/50 mb-2 block font-mono text-[10px] tracking-[0.15em] uppercase">
              {step.visual.label}
            </span>
            <Visual />
          </div>
        )}

        {/* Deliverables */}
        <div className="border-border border-t pt-5">
          <span className="text-muted-foreground/50 mb-3 block font-mono text-[10px] tracking-[0.15em] uppercase">
            Deliverables
          </span>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {step.deliverables.map((d, di) => (
              <motion.div
                key={d}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: di * 0.03, duration: 0.3, ease: EASE }}
                className="border-border bg-card/50 flex items-center gap-2.5 rounded-lg border px-3 py-2.5"
              >
                <Check className="text-primary/60 h-3.5 w-3.5 shrink-0" />
                <span className="text-muted-foreground text-xs">{d}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile Carousel                                                    */
/* ------------------------------------------------------------------ */

function MobileCarousel() {
  return (
    <div className="mt-10 md:hidden">
      <div
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6"
        style={{ scrollbarWidth: "none" }}
      >
        {steps.map((step) => {
          const Icon = step.icon;
          const Visual = visuals[step.title];
          return (
            <div key={step.number} className="w-[82vw] shrink-0 snap-start">
              <div className="border-border bg-card/50 flex h-full flex-col rounded-2xl border p-5 backdrop-blur-xl">
                <div className="mb-3 flex items-center gap-3">
                  <div className="border-primary/15 bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl border">
                    <Icon className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-muted-foreground/50 font-mono text-[10px] uppercase">
                      Phase {step.number}
                    </span>
                    <h3 className="text-foreground text-base font-bold">
                      {step.title}
                    </h3>
                  </div>
                </div>

                <h4 className="text-foreground mb-1 text-lg font-bold">
                  {step.headline}
                </h4>
                <p className="text-muted-foreground mb-4 text-xs leading-relaxed">
                  {step.description}
                </p>

                {Visual && (
                  <div className="mb-4">
                    <Visual />
                  </div>
                )}

                <div className="border-border mt-auto border-t pt-3">
                  <span className="text-muted-foreground/50 mb-2 block font-mono text-[10px] uppercase">
                    Deliverables
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {step.deliverables.map((d) => (
                      <div
                        key={d}
                        className="text-muted-foreground flex items-center gap-1.5 text-[11px]"
                      >
                        <div className="bg-primary/40 h-1 w-1 shrink-0 rounded-full" />
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Export                                                         */
/* ------------------------------------------------------------------ */

export function HowRynexBuildsV2() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const bgOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = stepRefs.current.indexOf(
              entry.target as HTMLDivElement,
            );
            if (idx !== -1) setActiveStep(idx);
          }
        });
      },
      { threshold: 0.35, rootMargin: "-15% 0px -15% 0px" },
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-rynex-builds"
      className="bg-background relative"
    >
      <SectionBackgrounds activeStep={activeStep} />

      <motion.div
        style={{ opacity: bgOpacity }}
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="bg-primary/[0.04] absolute top-1/4 left-1/4 h-96 w-96 rounded-full blur-[120px]" />
        <div className="bg-primary/[0.03] absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full blur-[120px]" />
      </motion.div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8">
        {/* Desktop */}
        <div className="hidden lg:flex lg:gap-16">
          <StickyLeftPanel active={activeStep} />

          <div className="relative flex-1 py-28">
            {/* Progress line */}
            <div className="absolute top-0 bottom-0 left-0 w-px">
              <div className="bg-border h-full w-full" />
              <motion.div
                className="from-primary/50 via-primary/25 absolute inset-x-0 top-0 origin-top bg-gradient-to-b to-transparent"
                style={{
                  height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
                }}
              />
            </div>

            {steps.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className="relative pl-10"
              >
                <StepCard step={step} isActive={i === activeStep} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile */}
        <MobileCarousel />
      </div>
    </section>
  );
}
