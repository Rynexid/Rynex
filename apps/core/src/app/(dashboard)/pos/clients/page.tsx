import { GlassPanel } from "@/components/pos/glass-panel";

const clients = [
  {
    id: 1,
    name: "Lumina Tech",
    domain: "lumina.tech",
    tags: ["VIP", "Retainer"],
    projects: 3,
    revenue: "$12,400",
    balance: "$2,400",
    lastActivity: "Today",
    initials: "LT",
  },
  {
    id: 2,
    name: "Nexus Cloud",
    domain: "nexuscloud.io",
    tags: ["Retainer"],
    projects: 5,
    revenue: "$24,800",
    balance: "$4,200",
    lastActivity: "Yesterday",
    initials: "NC",
  },
  {
    id: 3,
    name: "BioTech Org",
    domain: "biotech.org",
    tags: ["VIP", "Lead"],
    projects: 2,
    revenue: "$6,300",
    balance: "$0",
    lastActivity: "2 days ago",
    initials: "BO",
  },
  {
    id: 4,
    name: "Vanguard Capital",
    domain: "vanguardcap.com",
    tags: ["Lead"],
    projects: 1,
    revenue: "$3,600",
    balance: "$1,800",
    lastActivity: "3 days ago",
    initials: "VC",
  },
  {
    id: 5,
    name: "GreenLeaf Co",
    domain: "greenleaf.co",
    tags: ["Retainer"],
    projects: 4,
    revenue: "$18,200",
    balance: "$960",
    lastActivity: "5 days ago",
    initials: "GC",
  },
  {
    id: 6,
    name: "PayWave Inc",
    domain: "paywave.io",
    tags: ["Lead"],
    projects: 2,
    revenue: "$8,900",
    balance: "$3,600",
    lastActivity: "1 week ago",
    initials: "PW",
  },
  {
    id: 7,
    name: "LearnSphere",
    domain: "learnsphere.com",
    tags: ["VIP"],
    projects: 6,
    revenue: "$31,500",
    balance: "$0",
    lastActivity: "1 week ago",
    initials: "LS",
  },
  {
    id: 8,
    name: "Urban Style",
    domain: "urbanstyle.shop",
    tags: ["Retainer", "Lead"],
    projects: 3,
    revenue: "$14,200",
    balance: "$5,100",
    lastActivity: "2 weeks ago",
    initials: "US",
  },
];

const statWidgets = [
  { label: "Active Retainers", value: "12", color: "text-[#4ae176]" },
  { label: "Avg Revenue/Client", value: "$14,800", color: "text-[#adc6ff]" },
  { label: "New Leads", value: "8", color: "text-[#ffb95f]" },
];

const tagStyles: Record<string, string> = {
  VIP: "bg-[rgba(173,198,255,0.1)] text-[#adc6ff]",
  Retainer: "bg-[rgba(74,225,118,0.1)] text-[#4ae176]",
  Lead: "bg-[rgba(255,185,95,0.1)] text-[#ffb95f]",
};

export default function ClientsPage() {
  return (
    <div className="flex-1 space-y-6 p-6 lg:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl font-semibold text-[#e5e1e4]">
            Clients
          </h1>
          <p className="mt-1 text-sm text-[#c2c6d6]">
            Manage your client relationships
          </p>
        </div>
        <button className="rounded-lg bg-[#adc6ff] px-4 py-2 text-sm font-bold text-[#002e6a] transition-all hover:opacity-90">
          + Add Client
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative max-w-sm flex-1">
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
            placeholder="Search clients..."
            className="w-full rounded-full border border-[#27272A] bg-[#1c1b1d] py-2 pr-4 pl-11 text-sm text-[#e5e1e4] transition-all outline-none placeholder:text-[#c2c6d6]/50 focus:border-[#adc6ff] focus:ring-2 focus:ring-[rgba(173,198,255,0.2)]"
          />
        </div>
        <select className="rounded-lg border border-[#27272A] bg-[#1c1b1d] px-3 py-2 text-sm text-[#c2c6d6] outline-none">
          <option>Status</option>
          <option>VIP</option>
          <option>Retainer</option>
          <option>Lead</option>
        </select>
        <button className="rounded-lg border border-[#27272A] px-3 py-2 text-sm text-[#c2c6d6] transition-all hover:bg-[#1c1b1d]">
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {statWidgets.map((w) => (
          <GlassPanel key={w.label}>
            <p className="mb-1 text-sm text-[#c2c6d6]">{w.label}</p>
            <p className={`text-2xl font-semibold ${w.color}`}>{w.value}</p>
          </GlassPanel>
        ))}
      </div>

      <GlassPanel>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#27272A]">
              {[
                "Client",
                "Tags",
                "Projects",
                "Revenue",
                "Balance",
                "Last Activity",
              ].map((h) => (
                <th
                  key={h}
                  className={`px-4 py-3 text-left text-xs font-semibold tracking-wider text-[#c2c6d6] uppercase ${h === "Projects" ? "text-center" : h === "Revenue" || h === "Balance" || h === "Last Activity" ? "text-right" : ""}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#27272A]/50">
            {clients.map((client) => (
              <tr
                key={client.id}
                className="transition-colors hover:bg-[rgba(32,31,34,0.3)]"
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#353437] text-xs font-bold text-[#e5e1e4]">
                      {client.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#e5e1e4]">
                        {client.name}
                      </p>
                      <p className="text-xs text-[#8c909f]">{client.domain}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-1">
                    {client.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold ${tagStyles[tag]}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-4 text-center text-sm text-[#e5e1e4]">
                  {client.projects}
                </td>
                <td className="px-4 py-4 text-right text-sm font-semibold text-[#e5e1e4]">
                  {client.revenue}
                </td>
                <td className="px-4 py-4 text-right text-sm text-[#e5e1e4]">
                  {client.balance}
                </td>
                <td className="px-4 py-4 text-right text-sm text-[#c2c6d6]">
                  {client.lastActivity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between border-t border-[#27272A] px-4 py-3">
          <p className="text-sm text-[#c2c6d6]">Showing 1-8 of 124 results</p>
          <div className="flex items-center gap-2">
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#27272A] text-[#c2c6d6] hover:bg-[#1c1b1d]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#adc6ff] text-sm font-bold text-[#002e6a]">
              1
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-sm text-[#c2c6d6]">
              2
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-sm text-[#c2c6d6]">
              3
            </button>
            <span className="text-sm text-[#c2c6d6]">...</span>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-sm text-[#c2c6d6]">
              12
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#27272A] text-[#c2c6d6] hover:bg-[#1c1b1d]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
