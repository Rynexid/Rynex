"use client";

import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface PortfolioCard {
  gradient: string;
  tag: string;
  title: string;
  description: string;
}

const cards: PortfolioCard[] = [
  {
    gradient: "linear-gradient(135deg, #132038, #0a1120)",
    tag: "Business Systems",
    title: "Enterprise Dashboard Platform",
    description:
      "Operational dashboard replacing five disconnected spreadsheets.",
  },
  {
    gradient: "linear-gradient(135deg, #1b2a44, #0d1626)",
    tag: "Custom Development",
    title: "Retail POS Ecosystem",
    description:
      "Point-of-sale and inventory system for multi-location retail.",
  },
  {
    gradient: "linear-gradient(135deg, #0f1c30, #111b2c)",
    tag: "Business Systems",
    title: "Healthcare Booking System",
    description:
      "Appointment and patient management built around compliance requirements.",
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
        Selected Work
      </span>
      <h2 className="font-display mt-4 mb-4 text-3xl font-bold tracking-tight md:text-5xl">
        A sample of{" "}
        <span className="text-muted-foreground">what we build.</span>
      </h2>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Card                                                               */
/* ------------------------------------------------------------------ */

function Card({ card, index }: { card: PortfolioCard; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: EASE }}
      whileHover={{ y: -6 }}
      className="bg-card/50 overflow-hidden rounded-2xl border border-white/[0.08] backdrop-blur-sm transition-[border-color] duration-300 hover:border-white/[0.16]"
    >
      {/* Gradient Thumbnail */}
      <div
        className="aspect-[4/3] rounded-2xl"
        style={{ background: card.gradient }}
      />

      {/* Body */}
      <div className="p-5">
        <span className="mb-2 block font-mono text-[11px] tracking-wider text-sky-300 uppercase">
          {card.tag}
        </span>
        <h3 className="font-display mb-1 text-[17px] font-semibold">
          {card.title}
        </h3>
        <p className="text-muted-foreground text-[13.5px]">
          {card.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Export                                                         */
/* ------------------------------------------------------------------ */

export function PortfolioV2Section() {
  return (
    <section className="relative py-28 md:py-36">
      <div className="mx-auto max-w-screen-xl px-4 md:px-6 lg:px-8">
        <SectionHeader />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <Card key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
