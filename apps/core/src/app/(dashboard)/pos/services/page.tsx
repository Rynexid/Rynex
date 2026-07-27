import { GlassPanel } from "@/components/pos/glass-panel";

const services = [
  {
    id: 1,
    name: "UI/UX Design",
    desc: "Wireframing, prototyping, and user interface design for web and mobile apps",
    price: "$2,400",
    timeline: "2-4 weeks",
    orders: 28,
    growth: "+12%",
    positive: true,
  },
  {
    id: 2,
    name: "Web Development",
    desc: "Full-stack web application development using modern frameworks",
    price: "$4,200",
    timeline: "4-8 weeks",
    orders: 22,
    growth: "+8%",
    positive: true,
  },
  {
    id: 3,
    name: "Brand Identity",
    desc: "Logo design, color palette, typography, and complete brand guidelines",
    price: "$1,800",
    timeline: "1-2 weeks",
    orders: 15,
    growth: "+15%",
    positive: true,
  },
  {
    id: 4,
    name: "Mobile App Development",
    desc: "Cross-platform mobile applications for iOS and Android",
    price: "$6,300",
    timeline: "6-12 weeks",
    orders: 12,
    growth: "+22%",
    positive: true,
  },
  {
    id: 5,
    name: "SEO Optimization",
    desc: "Search engine optimization, content strategy, and analytics",
    price: "$960",
    timeline: "2-3 weeks",
    orders: 18,
    growth: "-3%",
    positive: false,
  },
  {
    id: 6,
    name: "Cloud Migration",
    desc: "Cloud infrastructure setup, migration, and management",
    price: "$3,600",
    timeline: "3-6 weeks",
    orders: 8,
    growth: "+18%",
    positive: true,
  },
];

export default function ServicesPage() {
  return (
    <div className="flex-1 space-y-6 p-6 lg:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl font-semibold text-[#e5e1e4]">
            Services
          </h1>
          <p className="mt-1 text-sm text-[#c2c6d6]">
            Manage your service catalog
          </p>
        </div>
        <button className="rounded-lg bg-[#adc6ff] px-4 py-2 text-sm font-bold text-[#002e6a] transition-all hover:opacity-90">
          + Add Service
        </button>
      </div>

      <div className="relative max-w-md">
        <svg
          className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[#c2c6d6]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          placeholder="Search services..."
          className="w-full rounded-full border border-[#27272A] bg-[#1c1b1d] py-2 pr-4 pl-11 text-sm text-[#e5e1e4] transition-all outline-none placeholder:text-[#c2c6d6]/50 focus:border-[#adc6ff] focus:ring-2 focus:ring-[rgba(173,198,255,0.2)]"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="rounded-xl border border-[#27272A] bg-[#111113] p-6 transition-all hover:border-[#adc6ff]"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(173,198,255,0.1)]">
              <svg
                className="h-6 w-6 text-[#adc6ff]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
            </div>
            <h3 className="mb-1 text-lg font-semibold text-[#e5e1e4]">
              {service.name}
            </h3>
            <p className="mb-4 line-clamp-2 text-sm text-[#c2c6d6]">
              {service.desc}
            </p>
            <p className="mb-1 text-2xl font-bold text-[#adc6ff]">
              {service.price}
            </p>
            <p className="mb-4 text-xs text-[#8c909f]">Starting from</p>
            <div className="flex items-center justify-between border-t border-[#27272A]/50 pt-4">
              <div className="text-xs text-[#c2c6d6]">
                {service.orders} orders
              </div>
              <span
                className={`text-xs font-medium ${service.positive ? "text-[#4ae176]" : "text-[#ffb4ab]"}`}
              >
                {service.growth}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
