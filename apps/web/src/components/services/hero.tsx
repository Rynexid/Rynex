"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

import { Button } from "@rynex/ui/button";

const ease = [0.22, 1, 0.36, 1] as const;

function BlueprintGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
      style={{
        backgroundImage:
          "linear-gradient(rgba(125,211,252,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,.06) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
        maskImage:
          "radial-gradient(900px 600px at 30% 20%, black, transparent 75%)",
      }}
    />
  );
}

function ArchitectureDiagram() {
  return (
    <div className="relative aspect-square">
      <span className="absolute top-0 left-0 font-mono text-[10px] tracking-widest text-white/20">
        X:048 Y:012
      </span>
      <span className="absolute right-0 bottom-0 font-mono text-[10px] tracking-widest text-white/20">
        X:512 Y:480
      </span>

      <div className="absolute top-0 left-0 h-4 w-4 border-t border-l border-sky-300/40" />
      <div className="absolute top-0 right-0 h-4 w-4 border-t border-r border-sky-300/40" />
      <div className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-sky-300/40" />
      <div className="absolute right-0 bottom-0 h-4 w-4 border-r border-b border-sky-300/40" />

      <svg viewBox="0 0 480 480" className="h-full w-full">
        <line
          x1="90"
          y1="90"
          x2="90"
          y2="390"
          stroke="rgba(125,211,252,.35)"
          strokeDasharray="4 6"
        />
        <line
          x1="90"
          y1="90"
          x2="390"
          y2="90"
          stroke="rgba(125,211,252,.35)"
          strokeDasharray="4 6"
        />
        <line
          x1="240"
          y1="140"
          x2="240"
          y2="220"
          stroke="rgba(125,211,252,.5)"
          strokeWidth="1.5"
        />
        <line
          x1="150"
          y1="280"
          x2="240"
          y2="220"
          stroke="rgba(125,211,252,.5)"
          strokeWidth="1.5"
        />
        <line
          x1="330"
          y1="280"
          x2="240"
          y2="220"
          stroke="rgba(125,211,252,.5)"
          strokeWidth="1.5"
        />
        <line
          x1="150"
          y1="280"
          x2="150"
          y2="360"
          stroke="rgba(125,211,252,.5)"
          strokeWidth="1.5"
        />
        <line
          x1="330"
          y1="280"
          x2="330"
          y2="360"
          stroke="rgba(125,211,252,.5)"
          strokeWidth="1.5"
        />

        <rect x="180" y="100" width="120" height="44" rx="8" fill="#7dd3fc" />
        <text
          x="240"
          y="127"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#06090f"
          fontFamily="var(--font-mono)"
          fontSize="9.5"
          fontWeight="600"
          letterSpacing="0.04em"
        >
          CLIENT
        </text>

        <rect
          x="180"
          y="200"
          width="120"
          height="44"
          rx="8"
          fill="#121b2c"
          stroke="rgba(255,255,255,.16)"
          strokeWidth="1"
        />
        <text
          x="240"
          y="227"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#8b96ac"
          fontFamily="var(--font-mono)"
          fontSize="9.5"
          letterSpacing="0.04em"
        >
          API GATEWAY
        </text>

        <rect
          x="90"
          y="260"
          width="120"
          height="44"
          rx="8"
          fill="#121b2c"
          stroke="rgba(255,255,255,.16)"
          strokeWidth="1"
        />
        <text
          x="150"
          y="287"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#8b96ac"
          fontFamily="var(--font-mono)"
          fontSize="9.5"
          letterSpacing="0.04em"
        >
          AUTH SERVICE
        </text>

        <rect
          x="270"
          y="260"
          width="120"
          height="44"
          rx="8"
          fill="#121b2c"
          stroke="rgba(255,255,255,.16)"
          strokeWidth="1"
        />
        <text
          x="330"
          y="287"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#8b96ac"
          fontFamily="var(--font-mono)"
          fontSize="9.5"
          letterSpacing="0.04em"
        >
          CORE SERVICE
        </text>

        <rect
          x="90"
          y="340"
          width="120"
          height="44"
          rx="8"
          fill="transparent"
          stroke="rgba(255,255,255,.16)"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
        <text
          x="150"
          y="367"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#8b96ac"
          fontFamily="var(--font-mono)"
          fontSize="9.5"
          letterSpacing="0.04em"
        >
          SESSION STORE
        </text>

        <rect
          x="270"
          y="340"
          width="120"
          height="44"
          rx="8"
          fill="transparent"
          stroke="rgba(255,255,255,.16)"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
        <text
          x="330"
          y="367"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#8b96ac"
          fontFamily="var(--font-mono)"
          fontSize="9.5"
          letterSpacing="0.04em"
        >
          DATABASE
        </text>
      </svg>
    </div>
  );
}

const trustBadges = [
  "Source Code Ownership",
  "Architecture First",
  "Security by Design",
  "100% Custom Development",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <BlueprintGrid />

      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="mb-6 font-mono text-xs font-semibold tracking-[0.14em] text-sky-300 uppercase"
            >
              RYNEX / SOFTWARE ENGINEERING
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="mb-6 max-w-[640px] text-4xl leading-[1.08] font-semibold tracking-tight text-white md:text-5xl lg:text-[3.6rem]"
            >
              Engineering Software Built Around Your Business.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease }}
              className="mb-10 max-w-[480px] text-[17px] leading-relaxed text-white/55"
            >
              We design, build, and maintain custom platforms and business
              systems on architecture that&apos;s meant to last, not templates
              you&apos;ll outgrow in a year.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease }}
              className="mb-12 flex flex-wrap gap-4"
            >
              <Link href="/contact">
                <Button className="gap-2 rounded-full px-6 py-3 font-mono text-xs tracking-wider uppercase">
                  Start Your Project
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="gap-2 rounded-full px-6 py-3 font-mono text-xs tracking-wider uppercase"
                >
                  <Calendar className="h-4 w-4" />
                  Book Free Consultation
                </Button>
              </Link>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7, ease }}
              className="flex flex-wrap gap-x-6 gap-y-3"
            >
              {trustBadges.map((badge) => (
                <li
                  key={badge}
                  className="flex items-center gap-2 font-mono text-xs text-white/45"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="shrink-0 text-emerald-400"
                  >
                    <path
                      d="M20 6 9 17l-5-5"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {badge}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="hidden lg:block"
          >
            <ArchitectureDiagram />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
