"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Code2, Package, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import { Breadcrumbs } from "@/components/editorial/breadcrumbs";

const missions = [
  {
    number: "01",
    title: "Solve Real Problems",
    description:
      "Understand the actual needs behind a challenge and build solutions that serve a clear purpose.",
  },
  {
    number: "02",
    title: "Build with Purpose",
    description:
      "Develop reliable, useful, and maintainable software instead of adding complexity without a reason.",
  },
  {
    number: "03",
    title: "Create Products That Matter",
    description:
      "Develop digital products that provide practical value beyond individual client projects.",
  },
  {
    number: "04",
    title: "Keep Improving",
    description:
      "Learn, refine, and evolve our solutions as technology and user needs change.",
  },
];

const approach = [
  {
    number: "01",
    title: "Understand",
    description:
      "Understand the problem, context, and needs before choosing a solution.",
  },
  {
    number: "02",
    title: "Define",
    description:
      "Identify priorities, constraints, and the most practical direction.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Develop the solution with attention to usability, maintainability, and technical quality.",
  },
  {
    number: "04",
    title: "Improve",
    description:
      "Evaluate the result, address issues, and continue improving where needed.",
  },
];

const buildWith = [
  {
    title: "Web Development",
    description:
      "Modern websites and web applications built for clarity and performance.",
  },
  {
    title: "Application Development",
    description:
      "Custom web apps and business systems tailored to real workflows.",
  },
  {
    title: "System Architecture",
    description:
      "Thoughtful structure for scalability, maintainability, and reliability.",
  },
  {
    title: "Deployment and Infrastructure",
    description: "Pragmatic setup for stable, secure, and manageable releases.",
  },
  {
    title: "Maintenance and Technical Support",
    description: "Ongoing care to keep solutions reliable as needs evolve.",
  },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 100px", "end 70%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <main className="bg-background min-h-screen">
      <section className="pt-24 pb-20 md:pt-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <Breadcrumbs items={[{ label: "About" }]} />

            <header className="mb-24">
              <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
                <div>
                  <p className="text-primary mb-3 font-mono text-xs tracking-widest uppercase">
                    About Rynex
                  </p>
                  <h1 className="text-3xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
                    We build what moves businesses forward.
                  </h1>
                  <p className="text-muted-foreground mt-4 max-w-xl text-base leading-relaxed md:text-lg">
                    Rynex develops digital solutions and products that help turn
                    real needs into practical technology.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Link
                      href="/services"
                      className="bg-background text-foreground border-border/60 hover:bg-accent inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm shadow-sm"
                    >
                      Explore Our Services
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/products"
                      className="bg-background text-foreground border-border/60 hover:bg-accent inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm shadow-sm"
                    >
                      Discover Our Products
                    </Link>
                  </div>
                </div>
                <div className="relative hidden lg:block">
                  <div className="border-border/60 relative overflow-hidden rounded-xl border">
                    <div className="from-primary/5 to-background grid grid-cols-6 gap-2 bg-gradient-to-br p-6">
                      {[...Array(18)].map((_, i) => (
                        <div
                          key={i}
                          className="border-border/40 bg-background/60 h-10 rounded-md border"
                        />
                      ))}
                    </div>
                    <div className="border-border/60 bg-background/80 absolute inset-x-6 bottom-6 rounded-lg border p-4 backdrop-blur-sm">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-md">
                          <Code2 className="text-primary h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            Build. Ship. Improve.
                          </p>
                          <p className="text-muted-foreground text-xs">
                            Turning needs into working solutions
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            <div ref={containerRef} className="relative">
              <div className="absolute top-0 -left-6 hidden h-full w-px lg:block">
                <div className="bg-border/60 absolute inset-0" />
                <motion.div
                  className="bg-primary absolute inset-x-0 top-0 h-full origin-top"
                  style={{ scaleY }}
                />
              </div>

              <div className="flex flex-col gap-32 lg:ml-10">
                <section className="relative">
                  <div className="bg-background border-primary absolute top-1 -left-14 hidden h-3 w-3 items-center justify-center rounded-full border lg:flex">
                    <div className="bg-primary h-1.5 w-1.5 rounded-full" />
                  </div>
                  <div className="max-w-3xl">
                    <p className="text-primary mb-2 font-mono text-xs tracking-widest uppercase">
                      Our Vision
                    </p>
                    <h2 className="text-2xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
                      To make technology a meaningful force for progress.
                    </h2>
                    <p className="text-muted-foreground mt-4 text-base leading-relaxed md:text-lg">
                      Rynex aims to create useful digital solutions and products
                      that help people and businesses solve problems, work
                      better, and grow through technology.
                    </p>
                  </div>
                </section>

                <section className="relative">
                  <div className="bg-background border-primary absolute top-1 -left-14 hidden h-3 w-3 items-center justify-center rounded-full border lg:flex">
                    <div className="bg-primary h-1.5 w-1.5 rounded-full" />
                  </div>
                  <div className="mb-10 max-w-2xl">
                    <p className="text-primary mb-2 font-mono text-xs tracking-widest uppercase">
                      Our Mission
                    </p>
                    <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                      Turning vision into action
                    </h2>
                    <p className="text-muted-foreground mt-3 leading-relaxed">
                      Our mission guides how we work: from understanding needs
                      to building solutions and products that matter.
                    </p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {missions.map((item) => (
                      <article
                        key={item.number}
                        className="border-border/60 rounded-xl border p-5"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-primary font-mono text-sm">
                            {item.number}
                          </span>
                          <div>
                            <h3 className="font-medium">{item.title}</h3>
                            <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="relative">
                  <div className="bg-background border-primary absolute top-1 -left-14 hidden h-3 w-3 items-center justify-center rounded-full border lg:flex">
                    <div className="bg-primary h-1.5 w-1.5 rounded-full" />
                  </div>
                  <div className="mb-8 max-w-2xl">
                    <p className="text-primary mb-2 font-mono text-xs tracking-widest uppercase">
                      Two Ways We Build
                    </p>
                    <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                      Services and products, built with the same care
                    </h2>
                    <p className="text-muted-foreground mt-3 leading-relaxed">
                      Rynex has two equally important focuses that complement
                      each other.
                    </p>
                  </div>
                  <div className="grid gap-6 lg:grid-cols-2">
                    <article className="border-border/60 relative overflow-hidden rounded-xl border p-6 md:p-8">
                      <div className="bg-primary/5 absolute -top-10 -right-10 h-40 w-40 rounded-full blur-3xl" />
                      <div className="relative">
                        <div className="bg-primary/10 mb-5 flex h-10 w-10 items-center justify-center rounded-lg">
                          <Code2 className="text-primary h-5 w-5" />
                        </div>
                        <p className="text-primary mb-2 font-mono text-xs tracking-widest uppercase">
                          01. Software Development
                        </p>
                        <h3 className="text-xl font-semibold tracking-tight">
                          Custom digital solutions designed around real business
                          needs
                        </h3>
                        <p className="text-muted-foreground mt-3 leading-relaxed">
                          From websites and web applications to custom software,
                          we build solutions aligned with your workflows and
                          priorities.
                        </p>
                        <div className="mt-6">
                          <Link
                            href="/services"
                            className="text-primary inline-flex items-center gap-2 text-sm font-medium"
                          >
                            Explore Services
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </article>
                    <article className="border-border/60 relative overflow-hidden rounded-xl border p-6 md:p-8">
                      <div className="bg-primary/5 absolute -top-10 -right-10 h-40 w-40 rounded-full blur-3xl" />
                      <div className="relative">
                        <div className="bg-primary/10 mb-5 flex h-10 w-10 items-center justify-center rounded-lg">
                          <Package className="text-primary h-5 w-5" />
                        </div>
                        <p className="text-primary mb-2 font-mono text-xs tracking-widest uppercase">
                          02. Digital Products
                        </p>
                        <h3 className="text-xl font-semibold tracking-tight">
                          Digital products built to be useful, accessible, and
                          ready to evolve
                        </h3>
                        <p className="text-muted-foreground mt-3 leading-relaxed">
                          We develop and own our digital products, designed to
                          solve practical problems and grow alongside real
                          needs.
                        </p>
                        <div className="mt-6">
                          <Link
                            href="/products"
                            className="text-primary inline-flex items-center gap-2 text-sm font-medium"
                          >
                            Explore Products
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  </div>
                </section>

                <section className="relative">
                  <div className="bg-background border-primary absolute top-1 -left-14 hidden h-3 w-3 items-center justify-center rounded-full border lg:flex">
                    <div className="bg-primary h-1.5 w-1.5 rounded-full" />
                  </div>
                  <div className="mb-10 max-w-2xl">
                    <p className="text-primary mb-2 font-mono text-xs tracking-widest uppercase">
                      How We Approach Problems
                    </p>
                    <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                      A practical path from need to solution
                    </h2>
                    <p className="text-muted-foreground mt-3 leading-relaxed">
                      A simple, clear approach that keeps focus on what matters.
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {approach.map((item) => (
                      <article
                        key={item.number}
                        className="border-border/60 relative overflow-hidden rounded-xl border p-5"
                      >
                        <span className="text-primary/60 absolute top-4 right-4 font-mono text-sm">
                          {item.number}
                        </span>
                        <div className="bg-primary/10 mb-4 flex h-9 w-9 items-center justify-center rounded-lg">
                          <span className="text-primary font-mono text-xs">
                            {item.number}
                          </span>
                        </div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="relative">
                  <div className="bg-background border-primary absolute top-1 -left-14 hidden h-3 w-3 items-center justify-center rounded-full border lg:flex">
                    <div className="bg-primary h-1.5 w-1.5 rounded-full" />
                  </div>
                  <div className="mb-10 max-w-2xl">
                    <p className="text-primary mb-2 font-mono text-xs tracking-widest uppercase">
                      Our Principles
                    </p>
                    <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                      The spirit behind what we build
                    </h2>
                  </div>
                  <div className="grid gap-6 lg:grid-cols-2">
                    <article className="border-border/60 relative overflow-hidden rounded-xl border p-6 md:p-8">
                      <div className="bg-primary/5 absolute -top-16 -right-16 h-48 w-48 rounded-full blur-3xl" />
                      <div className="relative">
                        <div className="bg-primary/10 mb-5 flex h-10 w-10 items-center justify-center rounded-lg">
                          <Sparkles className="text-primary h-5 w-5" />
                        </div>
                        <p className="text-primary font-mono text-sm tracking-widest uppercase">
                          CREATE. CONQUER. CONTINUE!
                        </p>
                        <h3 className="mt-2 text-xl font-semibold tracking-tight">
                          Create, face challenges, keep moving forward
                        </h3>
                        <p className="text-muted-foreground mt-3 leading-relaxed">
                          Create to start building, conquer to meet challenges
                          with discipline, and continue to learn and refine
                          until it's right.
                        </p>
                      </div>
                    </article>
                    <article className="border-border/60 relative overflow-hidden rounded-xl border p-6 md:p-8">
                      <div className="bg-primary/5 absolute -top-16 -right-16 h-48 w-48 rounded-full blur-3xl" />
                      <div className="relative">
                        <div className="bg-primary/10 mb-5 flex h-10 w-10 items-center justify-center rounded-lg">
                          <ArrowRight className="text-primary h-5 w-5" />
                        </div>
                        <p className="text-primary font-mono text-sm tracking-widest uppercase">
                          NO LIMITS. JUST BUILD!
                        </p>
                        <h3 className="mt-2 text-xl font-semibold tracking-tight">
                          Turn ideas into something real
                        </h3>
                        <p className="text-muted-foreground mt-3 leading-relaxed">
                          Understand real constraints, find practical
                          approaches, and build solutions that can be used. It's
                          about execution, not ignoring boundaries.
                        </p>
                      </div>
                    </article>
                  </div>
                </section>

                <section className="relative">
                  <div className="bg-background border-primary absolute top-1 -left-14 hidden h-3 w-3 items-center justify-center rounded-full border lg:flex">
                    <div className="bg-primary h-1.5 w-1.5 rounded-full" />
                  </div>
                  <div className="mb-8 max-w-2xl">
                    <p className="text-primary mb-2 font-mono text-xs tracking-widest uppercase">
                      What We Build With
                    </p>
                    <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                      Practical capabilities for real solutions
                    </h2>
                    <p className="text-muted-foreground mt-3 leading-relaxed">
                      Focused on the areas we use to deliver reliable digital
                      solutions and products.
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
                    {buildWith.map((item, index) => (
                      <article
                        key={item.title}
                        className={`border-border/60 rounded-xl border p-5 ${
                          index === 0
                            ? "lg:col-span-3"
                            : index === 1
                              ? "lg:col-span-3"
                              : index === 2
                                ? "lg:col-span-2"
                                : index === 3
                                  ? "lg:col-span-2"
                                  : "lg:col-span-2"
                        }`}
                      >
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </article>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Link
                      href="/services"
                      className="text-primary inline-flex items-center gap-2 text-sm font-medium"
                    >
                      See full capabilities on Services
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </section>

                <section className="relative">
                  <div className="bg-background border-primary absolute top-1 -left-14 hidden h-3 w-3 items-center justify-center rounded-full border lg:flex">
                    <div className="bg-primary h-1.5 w-1.5 rounded-full" />
                  </div>
                  <div className="max-w-3xl">
                    <p className="text-primary mb-2 font-mono text-xs tracking-widest uppercase">
                      Where We're Heading
                    </p>
                    <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                      Growing through two connected directions
                    </h2>
                    <p className="text-muted-foreground mt-3 leading-relaxed">
                      Rynex continues to grow through building digital solutions
                      for clients and developing products of our own. Together,
                      they form a connected ecosystem of practical technology.
                    </p>
                  </div>
                </section>

                <section className="relative lg:ml-4">
                  <div className="bg-background border-primary absolute top-1/2 -left-14 hidden h-3 w-3 -translate-y-1/2 items-center justify-center rounded-full border lg:flex">
                    <div className="bg-primary h-1.5 w-1.5 rounded-full" />
                  </div>
                  <div className="border-border/60 relative overflow-hidden rounded-xl border p-6 text-center md:p-10">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.08),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.12),transparent_60%)]" />
                    <div className="relative">
                      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                        Have a problem worth solving?
                      </h2>
                      <p className="text-muted-foreground mx-auto mt-3 max-w-2xl leading-relaxed">
                        Let's explore how the right digital solution can move
                        your idea or business forward.
                      </p>
                      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                        <Link
                          href="/contact"
                          className="bg-background text-foreground border-border/60 hover:bg-accent inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm shadow-sm"
                        >
                          Discuss a Project
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                          href="/products"
                          className="bg-background text-foreground border-border/60 hover:bg-accent inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm shadow-sm"
                        >
                          Explore Our Products
                        </Link>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
