import { CreditCard, DollarSign, TrendingUp } from "lucide-react";

import { GlassPanel } from "@/components/pos/glass-panel";
import { StatusBadge } from "@/components/pos/status-badge";

const payments = [
  {
    id: "PAY-001",
    client: "Lumina Tech",
    method: "Bank Transfer",
    status: "paid" as const,
    amount: "$2,400",
    date: "Oct 22",
    avatar: "LT",
  },
  {
    id: "PAY-002",
    client: "Nexus Cloud",
    method: "Credit Card",
    status: "paid" as const,
    amount: "$4,200",
    date: "Oct 20",
    avatar: "NC",
  },
  {
    id: "PAY-003",
    client: "BioTech Org",
    method: "QRIS",
    status: "pending" as const,
    amount: "$1,800",
    date: "Oct 19",
    avatar: "BO",
  },
  {
    id: "PAY-004",
    client: "Vanguard Capital",
    method: "Cash",
    status: "paid" as const,
    amount: "$6,300",
    date: "Oct 17",
    avatar: "VC",
  },
  {
    id: "PAY-005",
    client: "GreenLeaf Co",
    method: "Bank Transfer",
    status: "paid" as const,
    amount: "$960",
    date: "Oct 15",
    avatar: "GC",
  },
  {
    id: "PAY-006",
    client: "PayWave Inc",
    method: "Credit Card",
    status: "overdue" as const,
    amount: "$3,600",
    date: "Oct 12",
    avatar: "PW",
  },
  {
    id: "PAY-007",
    client: "LearnSphere",
    method: "QRIS",
    status: "paid" as const,
    amount: "$2,800",
    date: "Oct 10",
    avatar: "LS",
  },
  {
    id: "PAY-008",
    client: "Urban Style",
    method: "Bank Transfer",
    status: "pending" as const,
    amount: "$5,100",
    date: "Oct 8",
    avatar: "US",
  },
];

export default function PaymentsPage() {
  return (
    <div className="flex-1 space-y-6 p-6 lg:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl font-semibold text-[#e5e1e4]">
            Payments
          </h1>
          <p className="mt-1 text-sm text-[#c2c6d6]">
            Track incoming and outgoing payments
          </p>
        </div>
        <button className="rounded-lg bg-[#adc6ff] px-4 py-2 text-sm font-bold text-[#002e6a] transition-all hover:opacity-90">
          + Record Payment
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Total Collected",
            value: "$27,560",
            sub: "+8.3% vs last month",
            icon: DollarSign,
            color: "text-[#adc6ff]",
          },
          {
            label: "Pending",
            value: "$6,900",
            sub: "12 payments pending",
            icon: TrendingUp,
            color: "text-[#ffb95f]",
          },
          {
            label: "Payment Methods",
            value: "4",
            sub: "Bank, Card, QRIS, Cash",
            icon: CreditCard,
            color: "text-[#4ae176]",
          },
        ].map((s) => (
          <GlassPanel key={s.label}>
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-sm text-[#c2c6d6]">{s.label}</p>
                <p className="text-2xl font-semibold text-[#e5e1e4]">
                  {s.value}
                </p>
              </div>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg bg-[rgba(173,198,255,0.1)] ${s.color}`}
              >
                <s.icon className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-2 text-xs text-[#c2c6d6]">{s.sub}</p>
          </GlassPanel>
        ))}
      </div>

      <GlassPanel>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#27272A]">
              {[
                "Payment ID",
                "Client",
                "Method",
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
            {payments.map((p) => (
              <tr
                key={p.id}
                className="transition-colors hover:bg-[rgba(32,31,34,0.3)]"
              >
                <td className="px-4 py-4 text-sm font-medium text-[#adc6ff]">
                  {p.id}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#353437] text-xs font-bold text-[#e5e1e4]">
                      {p.avatar}
                    </div>
                    <span className="text-sm text-[#e5e1e4]">{p.client}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-[#c2c6d6]">{p.method}</td>
                <td className="px-4 py-4">
                  <StatusBadge variant={p.status} />
                </td>
                <td className="px-4 py-4 text-right text-sm font-semibold text-[#e5e1e4]">
                  {p.amount}
                </td>
                <td className="px-4 py-4 text-right text-sm text-[#c2c6d6]">
                  {p.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassPanel>
    </div>
  );
}
