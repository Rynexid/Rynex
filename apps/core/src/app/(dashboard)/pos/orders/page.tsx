import { GlassPanel } from "@/components/pos/glass-panel";
import { StatusBadge } from "@/components/pos/status-badge";

const orders = [
  {
    id: "ORD-001",
    client: "Lumina Tech",
    service: "UI/UX Design",
    status: "active" as const,
    amount: "$2,400",
    date: "Oct 20",
    avatar: "LT",
  },
  {
    id: "ORD-002",
    client: "Nexus Cloud",
    service: "Web Development",
    status: "active" as const,
    amount: "$4,200",
    date: "Oct 18",
    avatar: "NC",
  },
  {
    id: "ORD-003",
    client: "BioTech Org",
    service: "Brand Identity",
    status: "completed" as const,
    amount: "$1,800",
    date: "Oct 15",
    avatar: "BO",
  },
  {
    id: "ORD-004",
    client: "Vanguard Cap",
    service: "Mobile App Dev",
    status: "active" as const,
    amount: "$6,300",
    date: "Oct 12",
    avatar: "VC",
  },
  {
    id: "ORD-005",
    client: "GreenLeaf Co",
    service: "SEO Optimization",
    status: "pending" as const,
    amount: "$960",
    date: "Oct 10",
    avatar: "GC",
  },
  {
    id: "ORD-006",
    client: "PayWave Inc",
    service: "Cloud Migration",
    status: "cancelled" as const,
    amount: "$3,600",
    date: "Oct 8",
    avatar: "PW",
  },
  {
    id: "ORD-007",
    client: "LearnSphere",
    service: "UI/UX Design",
    status: "pending" as const,
    amount: "$2,800",
    date: "Oct 5",
    avatar: "LS",
  },
  {
    id: "ORD-008",
    client: "Urban Style",
    service: "Web Development",
    status: "completed" as const,
    amount: "$5,100",
    date: "Oct 3",
    avatar: "US",
  },
];

export default function OrdersPage() {
  return (
    <div className="flex-1 space-y-6 p-6 lg:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl font-semibold text-[#e5e1e4]">
            Orders
          </h1>
          <p className="mt-1 text-sm text-[#c2c6d6]">
            Manage all client orders
          </p>
        </div>
        <button className="rounded-lg bg-[#adc6ff] px-4 py-2 text-sm font-bold text-[#002e6a] transition-all hover:opacity-90">
          + New Order
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative max-w-md flex-1">
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
            placeholder="Search orders..."
            className="w-full rounded-full border border-[#27272A] bg-[#1c1b1d] py-2 pr-4 pl-11 text-sm text-[#e5e1e4] transition-all outline-none placeholder:text-[#c2c6d6]/50 focus:border-[#adc6ff] focus:ring-2 focus:ring-[rgba(173,198,255,0.2)]"
          />
        </div>
        <select className="rounded-lg border border-[#27272A] bg-[#1c1b1d] px-3 py-2 text-sm text-[#c2c6d6] outline-none">
          <option>All Status</option>
          <option>Active</option>
          <option>Pending</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
      </div>

      <GlassPanel>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#27272A]">
              {[
                "Order ID",
                "Client",
                "Service",
                "Status",
                "Amount",
                "Date",
              ].map((h) => (
                <th
                  key={h}
                  className={`px-4 py-3 text-left text-xs font-semibold tracking-wider text-[#c2c6d6] uppercase ${h === "Amount" || h === "Date" ? "text-right" : ""}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#27272A]/50">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="transition-colors hover:bg-[rgba(32,31,34,0.3)]"
              >
                <td className="px-4 py-4 text-sm font-medium text-[#adc6ff]">
                  {order.id}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#353437] text-xs font-bold text-[#e5e1e4]">
                      {order.avatar}
                    </div>
                    <span className="text-sm text-[#e5e1e4]">
                      {order.client}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-[#c2c6d6]">
                  {order.service}
                </td>
                <td className="px-4 py-4">
                  <StatusBadge variant={order.status} />
                </td>
                <td className="px-4 py-4 text-right text-sm font-semibold text-[#e5e1e4]">
                  {order.amount}
                </td>
                <td className="px-4 py-4 text-right text-sm text-[#c2c6d6]">
                  {order.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassPanel>
    </div>
  );
}
