"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const faqs = [
  {
    q: "What makes Rynex different from a digital agency?",
    a: "We're a software engineering company. We build systems designed to scale and last, not marketing sites.",
  },
  {
    q: "Do we own the source code?",
    a: "Yes. Full ownership, no vendor lock-in, and no ongoing license fees to us.",
  },
  {
    q: "How long does a typical project take?",
    a: "Anywhere from 6 to 16 weeks depending on scope, we'll give you a real estimate after discovery.",
  },
  {
    q: "Do you work with existing codebases?",
    a: "Yes, through our Engineering services: audits, refactors, and architecture reviews.",
  },
  {
    q: "What technologies do you use?",
    a: "Primarily TypeScript, React, Next.js, PostgreSQL, and modern cloud infrastructure.",
  },
  {
    q: "Can you build mobile apps?",
    a: "Yes, cross-platform mobile apps are part of our Custom Development category.",
  },
  {
    q: "Do you offer ongoing maintenance?",
    a: "Yes, maintenance and support plans are available after launch.",
  },
  {
    q: "What's included in the discovery phase?",
    a: "Business analysis, requirements mapping, and early architecture decisions.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes, we can sign an NDA before any detailed discussion.",
  },
  {
    q: "How is pricing structured?",
    a: "Project-based pricing after scoping, with milestone payments.",
  },
  {
    q: "Can you integrate with our existing tools?",
    a: "Yes, API integrations with existing business tools are common work for us.",
  },
  {
    q: "Do you build ERP or CRM systems?",
    a: "Yes, under our Business Systems category.",
  },
  {
    q: "What if our requirements change mid-project?",
    a: "We work in phases so scope changes are manageable, not disruptive.",
  },
  {
    q: "Do you provide hosting?",
    a: "We can set up and manage cloud infrastructure, or work within your existing provider.",
  },
  {
    q: "How do you handle security?",
    a: "Security is designed in from architecture through deployment, not added afterward.",
  },
  {
    q: "Do you offer a warranty after launch?",
    a: "Yes, a defined bug-fix warranty period is included with every project.",
  },
  {
    q: "Can you work with our internal engineering team?",
    a: "Yes, we regularly collaborate alongside in-house teams.",
  },
  {
    q: "How do we get started?",
    a: "Book a free consultation and we'll scope the project from there.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
            FAQ
          </p>
          <h2 className="mx-auto max-w-[600px] text-3xl font-semibold tracking-tight text-white md:text-[2.4rem]">
            Questions, answered directly.
          </h2>
        </motion.div>

        <div className="mx-auto max-w-[800px]">
          {faqs.map((faq, i) => (
            <div key={faq.q} className="border-b border-white/[0.06]">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between py-5 text-left text-[15.5px] font-medium text-white"
              >
                <span className="pr-4">{faq.q}</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 shrink-0 text-white/55 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className="overflow-hidden transition-[max-height] duration-350"
                style={{
                  maxHeight: openIndex === i ? "200px" : "0px",
                }}
              >
                <p className="max-w-[640px] pb-5 text-[14.5px] text-white/55">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
