"use client";

const industries = [
  { name: "Healthcare", mono: "HC" },
  { name: "Education", mono: "ED" },
  { name: "Retail", mono: "RT" },
  { name: "Restaurant", mono: "RS" },
  { name: "Hotel", mono: "HT" },
  { name: "Government", mono: "GV" },
  { name: "Manufacturing", mono: "MF" },
  { name: "Finance", mono: "FN" },
  { name: "Startup", mono: "ST" },
  { name: "Community", mono: "CM" },
  { name: "Logistics", mono: "LG" },
  { name: "NGO", mono: "NG" },
];

function IndustryItem({ item }: { item: (typeof industries)[number] }) {
  return (
    <div className="flex shrink-0 items-center gap-3 px-7 text-white/30 transition-colors duration-300 hover:text-white/60">
      <span className="flex h-6 w-6 items-center justify-center rounded border border-white/10 font-mono text-[9px] text-sky-300/60">
        {item.mono}
      </span>
      <span className="text-xs font-medium tracking-wide">{item.name}</span>
    </div>
  );
}

export function Industry() {
  return (
    <section className="relative overflow-hidden py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#06090f] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#06090f] to-transparent" />

      <div className="animate-marquee flex w-fit">
        {[...industries, ...industries].map((item, i) => (
          <IndustryItem key={`${item.name}-${i}`} item={item} />
        ))}
      </div>
    </section>
  );
}
