"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Konsultasi",
    subtitle: "Diskusi kebutuhan dan tujuan proyek",
    details: [
      "analisis kebutuhan",
      "diskusi konsep",
      "objective mapping",
      "estimasi awal",
    ],
  },
  {
    number: "02",
    title: "Requirement",
    subtitle: "Pengumpulan data dan spesifikasi teknis",
    details: ["data gathering", "technical spec", "sitemap", "feature list"],
  },
  {
    number: "03",
    title: "Wireframe",
    subtitle: "Kerangka layout dan alur pengguna",
    details: [
      "user flow",
      "layout structure",
      "navigation map",
      "content planning",
    ],
  },
  {
    number: "04",
    title: "UI/UX Design",
    subtitle: "Desain antarmuka modern dan fungsional",
    details: [
      "interface design",
      "responsive layout",
      "interaction design",
      "design system",
    ],
  },
  {
    number: "05",
    title: "Development",
    subtitle: "Pengembangan frontend & backend",
    details: [
      "frontend engineering",
      "backend integration",
      "API development",
      "database setup",
    ],
  },
  {
    number: "06",
    title: "Testing",
    subtitle: "Quality assurance dan bug fixing",
    details: [
      "unit testing",
      "integration test",
      "cross-browser",
      "performance test",
    ],
  },
  {
    number: "07",
    title: "Deployment",
    subtitle: "Peluncuran ke production server",
    details: ["server setup", "domain config", "SSL certificate", "launch"],
  },
  {
    number: "08",
    title: "Maintenance",
    subtitle: "Perawatan dan dukungan berkelanjutan",
    details: [
      "content updates",
      "security monitoring",
      "backup routine",
      "tech support",
    ],
  },
];

export function HowRynexBuilds() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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
      { threshold: 0.4, rootMargin: "-10% 0px -10% 0px" },
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="spacious-section relative"
      id="how-rynex-builds"
    >
      <div className="container mx-auto px-4">
        <div className="lg:flex lg:gap-12">
          {/* Sticky Left */}
          <div className="lg:w-2/5 lg:shrink-0">
            <div className="lg:sticky lg:top-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-primary font-mono text-xs font-semibold tracking-widest uppercase">
                  Cara Kami Membangun
                </span>
                <h2 className="mt-4 mb-4 text-3xl leading-tight font-bold md:text-5xl lg:text-6xl">
                  How Rynex
                  <br />
                  <span className="gradient-text">Builds</span>
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed lg:text-base">
                  Setiap proyek dibangun melalui proses terstruktur untuk
                  memastikan hasil yang presisi, scalable, dan siap berkembang.
                </p>

                {/* Active step indicator */}
                <div className="glass-card mt-8 rounded-2xl border border-white/10 p-5 backdrop-blur-xl">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
                      Langkah
                    </span>
                    <span className="text-primary font-mono text-xs font-bold">
                      {activeStep + 1} / {steps.length}
                    </span>
                  </div>
                  <div className="relative mb-4 h-1 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      className="from-primary/70 to-primary absolute inset-y-0 left-0 rounded-full bg-gradient-to-r"
                      animate={{
                        width: `${((activeStep + 1) / steps.length) * 100}%`,
                      }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <motion.div
                      key={activeStep}
                      initial={{ rotate: -10, scale: 0.8 }}
                      animate={{ rotate: 0, scale: 1 }}
                      className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                    >
                      <span className="text-primary font-mono text-lg font-bold">
                        {steps[activeStep].number}
                      </span>
                    </motion.div>
                    <div className="min-w-0">
                      <motion.h3
                        key={`t-${activeStep}`}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="truncate font-bold"
                      >
                        {steps[activeStep].title}
                      </motion.h3>
                      <motion.p
                        key={`s-${activeStep}`}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="text-muted-foreground truncate text-sm"
                      >
                        {steps[activeStep].subtitle}
                      </motion.p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-6">
                  <div className="text-muted-foreground flex items-center gap-2 font-mono text-[10px] tracking-wider uppercase">
                    <span className="bg-primary h-2 w-2 rounded-full" />8
                    Tahapan
                  </div>
                  <div className="text-muted-foreground flex items-center gap-2 font-mono text-[10px] tracking-wider uppercase">
                    <span className="bg-border/40 h-2 w-2 rounded-full" />
                    Siap Launch
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Mobile carousel */}
          <div className="relative mt-10 md:hidden lg:mt-0">
            <div
              className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4"
              style={{ scrollbarWidth: "none" }}
            >
              {steps.map((step, i) => (
                <div key={step.number} className="w-[78vw] shrink-0 snap-start">
                  <div className="border-border bg-card flex h-full flex-col rounded-xl border p-4">
                    <span className="text-border/60 mb-2 font-mono text-xs leading-none font-bold">
                      Langkah {step.number}
                    </span>
                    <h3 className="mb-0.5 text-base font-bold">{step.title}</h3>
                    <p className="text-muted-foreground mb-3 text-xs">
                      {step.subtitle}
                    </p>
                    <div className="bg-border/20 mb-2 h-px" />
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                      {step.details.map((detail) => (
                        <span
                          key={detail}
                          className="text-muted-foreground flex items-center gap-1.5 font-mono text-[10px]"
                        >
                          <span className="bg-primary/40 h-1 w-1 shrink-0 rounded-full" />
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop cards - scroll to reveal */}
          <div className="relative hidden md:block lg:flex-1">
            {/* Progress line */}
            <div className="absolute top-0 bottom-0 left-5 w-px md:left-6">
              <div className="bg-border/20 h-full w-full" />
              <motion.div
                className="from-primary/60 via-primary/40 absolute inset-x-0 top-0 origin-top bg-gradient-to-b to-transparent"
                style={{ height: progressHeight }}
              />
            </div>

            {steps.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className="relative pb-8 last:pb-0 md:pb-10"
              >
                <div className="flex gap-4 md:gap-5">
                  {/* Step number node */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: false, amount: 0.5 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className={`z-10 flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-500 md:h-12 md:w-12 ${
                        i === activeStep
                          ? "border-primary/50 bg-primary/15 shadow-[0_0_24px_rgba(79,163,209,0.25)]"
                          : "border-primary/20 bg-primary/5"
                      }`}
                    >
                      <span
                        className={`font-mono text-sm font-bold transition-colors duration-300 md:text-base ${
                          i === activeStep ? "text-primary" : "text-primary/50"
                        }`}
                      >
                        {step.number}
                      </span>
                    </motion.div>
                  </div>

                  {/* Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="min-w-0 flex-1"
                  >
                    <div
                      className={`rounded-2xl border p-5 transition-all duration-500 md:p-6 ${
                        i === activeStep
                          ? "border-primary/25 bg-card/80 shadow-[0_0_40px_rgba(79,163,209,0.06)]"
                          : "border-border bg-card/40"
                      }`}
                    >
                      <h3
                        className={`text-lg font-bold transition-colors duration-300 md:text-2xl ${
                          i === activeStep
                            ? "text-primary"
                            : "text-foreground/80"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground mt-0.5 text-sm md:text-base">
                        {step.subtitle}
                      </p>
                      <div className="bg-border/20 my-3 h-px md:my-4" />
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 md:gap-x-6 md:gap-y-2">
                        {step.details.map((detail) => (
                          <div
                            key={detail}
                            className="text-muted-foreground flex items-center gap-2 font-mono text-[11px] md:text-xs"
                          >
                            <span className="bg-primary/30 h-1 w-1 rounded-full" />
                            {detail}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
