"use client";

import Image from "next/image";
import Link from "next/link";

import { businessPartners } from "@/config";

export function LogoMarquee() {
  const partners = businessPartners;

  return (
    <section className="border-border/40 relative overflow-hidden border-y py-6">
      {/* Header */}
      <div className="mb-5 text-center">
        <span className="text-muted-foreground/50 font-mono text-[9px] tracking-[0.2em] uppercase">
          Partners
        </span>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r to-transparent" />
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l to-transparent" />

        {/* Scrolling logos */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee flex items-center gap-8 px-4 md:gap-12 md:px-6">
            {[...partners, ...partners, ...partners].map((item, i) => (
              <Link
                key={`${item.id}-${i}`}
                href={item.website}
                target="_blank"
                rel="noopener noreferrer"
                className="border-border bg-card/50 group hover:border-primary/20 hover:bg-primary/5 flex shrink-0 items-center gap-3 rounded-lg border px-4 py-2 opacity-70 transition-all duration-300 hover:opacity-100"
              >
                <div className="relative h-7 w-auto md:h-8">
                  <Image
                    src={item.logo}
                    alt={item.name}
                    width={100}
                    height={28}
                    className="h-7 w-auto object-contain brightness-200 md:h-8"
                  />
                </div>
                <span className="text-muted-foreground group-hover:text-foreground hidden text-xs font-medium md:block">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="mt-5 flex items-center justify-center gap-6 text-center">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-[#4FA3D1]" />
          <span className="text-muted-foreground/50 font-mono text-[10px] tracking-wider">
            {partners.length} Partners
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-[#4FA3D1]" />
          <span className="text-muted-foreground/50 font-mono text-[10px] tracking-wider">
            Ecosystem Growing
          </span>
        </div>
      </div>
    </section>
  );
}
