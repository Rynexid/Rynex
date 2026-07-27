"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const stack = [
  {
    category: "Frontend",
    desc: "Pixel-perfect interfaces built with modern component architecture. We use React and Next.js to deliver fast, accessible, and responsive experiences that work flawlessly across every device and screen size your users touch.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    tags: ["React", "Next.js", "TypeScript", "Tailwind"],
  },
  {
    category: "Backend",
    desc: "Business logic and APIs built for correctness and scale. Our backend layer handles authentication, data processing, and third-party integrations with clean, maintainable code that grows with your business without breaking.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <circle cx="6" cy="6" r="1" fill="currentColor" />
        <circle cx="6" cy="18" r="1" fill="currentColor" />
      </svg>
    ),
    tags: ["Node.js", "TypeScript", "REST", "GraphQL"],
  },
  {
    category: "Database",
    desc: "Optimized schemas built for the queries you'll actually run, not just the ones you have today. We design data models with proper indexing, relationships, and migration strategies that support real-world usage patterns.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.657 4.03 3 9 3s9-1.343 9-3V5" />
        <path d="M3 12c0 1.657 4.03 3 9 3s9-1.343 9-3" />
      </svg>
    ),
    tags: ["PostgreSQL", "Prisma", "Redis"],
  },
  {
    category: "Cloud",
    desc: "Infrastructure that stays online and costs what it should. We set up and manage cloud environments with auto-scaling, CDN distribution, and monitoring so your application remains fast and available as traffic grows.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      </svg>
    ),
    tags: ["Cloudflare", "Vercel", "AWS"],
  },
  {
    category: "Authentication",
    desc: "Secure identity layer from day one, not bolted on later. We implement multi-factor authentication, role-based access control, and session management using industry-standard protocols that protect your users and data.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    tags: ["Better Auth", "OAuth 2.0", "JWT"],
  },
  {
    category: "Infrastructure",
    desc: "Containerized, automated, and reproducible environments. We use Docker and infrastructure-as-code to ensure your application runs the same way in development, staging, and production, every single time.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M2 20h20" />
        <path d="M5 20V8l7-5 7 5v12" />
        <path d="M9 20v-6h6v6" />
      </svg>
    ),
    tags: ["Docker", "CI/CD", "IaC"],
  },
  {
    category: "DevOps",
    desc: "Automated pipelines that catch issues before your users do. From code review to production deployment, every change goes through automated testing and staged rollouts with monitoring in place from the first release.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    tags: ["GitHub Actions", "Monitoring", "Deploys"],
  },
  {
    category: "AI",
    desc: "Intelligence layered onto your existing systems. We integrate AI capabilities for automation, document processing, and data analysis, making your operations smarter without rebuilding from scratch.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.57-3.25 3.92L12 22" />
        <path d="M12 2a4 4 0 0 0-4 4c0 1.95 1.4 3.57 3.25 3.92" />
        <path d="M3 12h4M17 12h4" />
      </svg>
    ),
    tags: ["AI APIs", "Automation", "Analytics"],
  },
  {
    category: "Monitoring",
    desc: "Real-time visibility into system health and performance. We set up error tracking, uptime alerts, and audit logging so you know exactly what's happening in production and can respond before users are affected.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    tags: ["Error Tracking", "Uptime", "Logging"],
  },
];

const AUTO_INTERVAL = 5000;

export function Technology() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStart = useRef<number | null>(null);
  const touchDelta = useRef(0);

  const total = stack.length;

  const goTo = useCallback(
    (idx: number) => {
      setActive(((idx % total) + total) % total);
    },
    [total],
  );

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(next, AUTO_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, next]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
    touchDelta.current = 0;
    setIsPaused(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    touchDelta.current = e.touches[0].clientX - touchStart.current;
  };

  const onTouchEnd = () => {
    if (Math.abs(touchDelta.current) > 50) {
      if (touchDelta.current < 0) next();
      else prev();
    }
    touchStart.current = null;
    setIsPaused(false);
  };

  const current = stack[active];

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
            TECHNOLOGY STACK
          </p>
          <h2 className="mx-auto mb-4 max-w-[600px] text-3xl font-semibold tracking-tight text-white md:text-[2.4rem]">
            One stack. Every layer.
          </h2>
          <p className="mx-auto max-w-[520px] text-[15px] text-white/45">
            We use industry-standard tools and frameworks to build reliable,
            scalable software, chosen for your specific needs, not trends.
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          className="mx-auto max-w-4xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease }}
            className="rounded-3xl border border-white/[0.08] bg-[#0d1420] p-8 md:p-10"
          >
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-sky-300">
                {current.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {current.category}
                </h3>
                <p className="text-[14px] text-white/40">{current.desc}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {current.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3.5 py-2 font-mono text-[12px] text-white/55"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              onClick={prev}
              aria-label="Previous"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-white/40 transition-all duration-200 hover:border-white/[0.2] hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="flex items-center gap-2">
              {stack.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to ${stack[i].category}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active
                      ? "w-6 bg-sky-300"
                      : "w-1.5 bg-white/15 hover:bg-white/30"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-white/40 transition-all duration-200 hover:border-white/[0.2] hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
