"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@rynex/ui/button";
import { cn } from "@rynex/utils";

const ACCENT = "#D8FF3E";

const plans = [
  {
    name: "Starter",
    price: "Rp 1.500.000",
    description: "Perfect for UMKM, personal brands, and portfolios.",
    popular: false,
    features: [
      "5 Pages",
      "Custom UI/UX Design",
      "Responsive Design",
      "Basic SEO",
      "Contact Form & WhatsApp",
      ".com Domain (1 Year)",
      "1 Revision",
    ],
    cta: "Get Started",
    href: "/contact",
  },
  {
    name: "Business",
    price: "Rp 3.500.000",
    description: "Ideal for growing businesses that want to scale online.",
    popular: true,
    badge: "Most Popular",
    features: [
      "Up to 10 Pages",
      "Advanced Custom UI/UX",
      "Blog CMS",
      "SEO Optimization",
      "Google Analytics Integration",
      ".com Domain (1 Year)",
      "Hosting (1 Year)",
      "3 Revisions",
    ],
    cta: "Start Your Project",
    href: "/contact",
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for companies with complex requirements.",
    popular: false,
    features: [
      "Unlimited Pages",
      "Premium Custom UI/UX",
      "Admin Dashboard",
      "Unlimited Consultation",
      "Database & API Integration",
      "1 Month Maintenance",
    ],
    cta: "Contact Sales",
    href: "/contact",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

function CheckIcon({ popular }: { popular: boolean }) {
  return (
    <div
      className={cn(
        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
        popular ? "bg-[#D8FF3E]/10" : "bg-white/5",
      )}
    >
      <Check
        className="h-3 w-3"
        style={{ color: popular ? ACCENT : "#ffffff" }}
      />
    </div>
  );
}

export function PremiumPricingCards() {
  const [annual, setAnnual] = useState(false);

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 md:py-28 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full blur-[180px]"
          style={{ background: `${ACCENT}08` }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-10 text-center sm:mb-12 md:mb-16"
        >
          <span
            className="mb-4 inline-block font-mono text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: ACCENT }}
          >
            Pricing
          </span>
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-5xl">
            Choose Your Website Package
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-base text-white/50 md:text-lg">
            Professional website solutions tailored for your business growth.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] p-1">
            <button
              onClick={() => setAnnual(false)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
                !annual ? "text-black" : "text-white/50 hover:text-white/80",
              )}
              style={!annual ? { background: ACCENT } : {}}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
                annual ? "text-black" : "text-white/50 hover:text-white/80",
              )}
              style={annual ? { background: ACCENT } : {}}
            >
              Annual
            </button>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-5">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease }}
              className={cn(
                "relative flex flex-col rounded-[20px] border p-5 transition-all duration-500 sm:p-6 md:rounded-[24px] md:p-8",
                plan.popular
                  ? "z-10 border-[#D8FF3E]/30 bg-[#D8FF3E]/[0.04] shadow-[0_0_40px_rgba(216,255,62,0.06)] sm:col-span-2 sm:max-w-sm sm:justify-self-center md:col-span-1 md:-my-4 md:max-w-none md:scale-105 md:justify-self-auto md:shadow-[0_0_60px_rgba(216,255,62,0.08)]"
                  : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]",
              )}
            >
              {plan.badge && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-[11px] font-bold tracking-wider whitespace-nowrap uppercase"
                  style={{ background: ACCENT, color: "#0a0a0a" }}
                >
                  {plan.badge}
                </div>
              )}

              {/* Plan header */}
              <div className={cn("mb-6", plan.popular && "mt-1")}>
                <h3 className="mb-1 text-lg font-semibold text-white">
                  {plan.name}
                </h3>
                <p className="mb-4 text-sm text-white/40">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                    {plan.price}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div
                className="mb-6 h-px"
                style={{
                  background: plan.popular
                    ? `linear-gradient(90deg, transparent, ${ACCENT}30, transparent)`
                    : "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
                }}
              />

              {/* Features */}
              <ul className="mb-8 flex-1 space-y-3.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckIcon popular={plan.popular} />
                    <span className="text-sm text-white/70">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link href={plan.href}>
                <Button
                  className={cn(
                    "w-full rounded-xl py-3 text-sm font-semibold tracking-wide",
                    plan.popular
                      ? ""
                      : "border border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08]",
                  )}
                  style={
                    plan.popular ? { background: ACCENT, color: "#0a0a0a" } : {}
                  }
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
