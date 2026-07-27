"use client";

import { motion } from "framer-motion";

const row1 = [
  "Healthcare", "Education", "Retail", "Restaurant", "Hotel", "Government",
  "Manufacturing", "Finance", "Startup", "Community", "Logistics", "NGO",
];
const row2 = [
  "E-commerce", "SaaS", "Real Estate", "Agriculture", "Transport", "Media",
  "Insurance", "Telecom", "Energy", "Legal", "Nonprofit", "Entertainment",
];

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex w-max gap-3"
        animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="whitespace-nowrap rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-2.5 text-sm text-muted-foreground backdrop-blur-sm transition-colors duration-300 hover:border-sky-300/50 hover:text-foreground"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function IndustriesSection() {
  return (
    <section className="spacious-section relative overflow-hidden" id="industries">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center md:mb-16"
        >
          <span className="font-mono text-xs font-semibold tracking-widest text-sky-300 uppercase">
            Industries
          </span>
          <h2 className="font-display mt-4 text-2xl font-bold md:text-4xl">
            Built for how your industry{" "}
            <span className="gradient-text">actually works.</span>
          </h2>
        </motion.div>

        <div className="mx-auto flex max-w-6xl flex-col gap-3">
          <MarqueeRow items={row1} />
          <MarqueeRow items={row2} reverse />
        </div>
      </div>
    </section>
  );
}
