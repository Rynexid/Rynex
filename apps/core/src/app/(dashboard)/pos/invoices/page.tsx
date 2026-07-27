import { DollarSign } from "lucide-react";

import { GlassPanel } from "@/components/pos/glass-panel";
import { StatusBadge } from "@/components/pos/status-badge";

const invoices = [
  {
    id: "INV-001",
    client: "Lumina Tech",
    issueDate: "Oct 20",
    dueDate: "Nov 4",
    status: "paid" as const,
    amount: "$2,400",
    avatar: "LT",
  },
  {
    id: "INV-002",
    client: "Nexus Cloud",
    issueDate: "Oct 18",
    dueDate: "Nov 2",
    status: "sent" as const,
    amount: "$4,200",
    avatar: "NC",
  },
  {
    id: "INV-003",
    client: "BioTech Org",
    issueDate: "Oct 15",
    dueDate: "Oct 30",
    status: "overdue" as const,
    amount: "$1,800",
    avatar: "BO",
  },
  {
    id: "INV-004",
    client: "Vanguard Capital",
    issueDate: "Oct 12",
    dueDate: "Oct 27",
    status: "draft" as const,
    amount: "$6,300",
    avatar: "VC",
  },
  {
    id: "INV-005",
    client: "GreenLeaf Co",
    issueDate: "Oct 10",
    dueDate: "Oct 25",
    status: "paid" as const,
    amount: "$960",
    avatar: "GC",
  },
  {
    id: "INV-006",
    client: "PayWave Inc",
    issueDate: "Oct 8",
    dueDate: "Oct 23",
    status: "sent" as const,
    amount: "$3,600",
    avatar: "PW",
  },
  {
    id: "INV-007",
    client: "LearnSphere",
    issueDate: "Oct 5",
    dueDate: "Oct 20",
    status: "overdue" as const,
    amount: "$2,800",
    avatar: "LS",
  },
  {
    id: "INV-008",
    client: "Urban Style",
    issueDate: "Oct 3",
    dueDate: "Oct 18",
    status: "paid" as const,
    amount: "$5,100",
    avatar: "US",
  },
];

const tabs = ["All Invoices", "Draft", "Sent", "Paid", "Overdue"];

export default function InvoicesPage() {
  return (
    <div className="flex-1 space-y-6 p-6 lg:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl font-semibold text-[#e5e1e4]">
            Invoices
          </h1>
          <p className="mt-1 text-sm text-[#c2c6d6]">Manage client invoices</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded-lg border border-[#27272A] px-4 py-2 text-sm font-medium text-[#c2c6d6] transition-all hover:bg-[#1c1b1d]">
            Export
          </button>
          <button className="rounded-lg bg-[#adc6ff] px-4 py-2 text-sm font-bold text-[#002e6a] transition-all hover:opacity-90">
            + New Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Total Receivables",
            value: "$27,160",
            sub: "+12% from last month",
            valueColor: "text-[#e5e1e4]",
            iconColor: "text-[#adc6ff]",
          },
          {
            label: "Overdue Invoices",
            value: "$4,600",
            sub: "8 Pending",
            valueColor: "text-[#ffb4ab]",
            iconColor: "text-[#ffb4ab]",
          },
          {
            label: "Paid This Month",
            value: "$8,400",
            sub: "24 Invoices",
            valueColor: "text-[#4ae176]",
            iconColor: "text-[#4ae176]",
          },
        ].map((s) => (
          <GlassPanel key={s.label}>
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-sm text-[#c2c6d6]">{s.label}</p>
                <p className={`text-2xl font-semibold ${s.valueColor}`}>
                  {s.value}
                </p>
              </div>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg bg-[rgba(173,198,255,0.1)] ${s.iconColor}`}
              >
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-2 text-xs text-[#c2c6d6]">{s.sub}</p>
          </GlassPanel>
        ))}
      </div>

      <GlassPanel>
        <div className="mb-6 flex items-center border-b border-[#27272A]">
          <div className="flex gap-6">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                className={`pb-3 text-sm font-medium transition-all ${i === 0 ? "border-b-2 border-[#adc6ff] text-[#adc6ff]" : "text-[#c2c6d6] hover:text-[#e5e1e4]"}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="ml-auto flex gap-1 rounded-lg bg-[#2a2a2c] p-1">
            <button className="rounded-md bg-[#353437] px-3 py-1.5 text-xs font-medium text-[#adc6ff]">
              List
            </button>
            <button className="rounded-md px-3 py-1.5 text-xs font-medium text-[#c2c6d6]">
              Grid
            </button>
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-[#27272A]">
              {[
                "Invoice",
                "Client",
                "Issue Date",
                "Due Date",
                "Status",
                "Amount",
              ].map((h) => (
                <th
                  key={h}
                  className={`px-4 py-3 text-left text-xs font-semibold tracking-wider text-[#c2c6d6] uppercase ${h === "Amount" ? "text-right" : ""}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#27272A]/50">
            {invoices.map((inv) => (
              <tr
                key={inv.id}
                className="transition-colors hover:bg-[rgba(32,31,34,0.3)]"
              >
                <td className="px-4 py-4 text-sm font-medium text-[#adc6ff]">
                  {inv.id}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#353437] text-xs font-bold text-[#e5e1e4]">
                      {inv.avatar}
                    </div>
                    <span className="text-sm text-[#e5e1e4]">{inv.client}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-[#c2c6d6]">
                  {inv.issueDate}
                </td>
                <td
                  className={`px-4 py-4 text-sm ${inv.status === "overdue" ? "text-[#ffb4ab]" : "text-[#c2c6d6]"}`}
                >
                  {inv.dueDate}
                </td>
                <td className="px-4 py-4">
                  <StatusBadge variant={inv.status} />
                </td>
                <td className="px-4 py-4 text-right text-sm font-semibold text-[#e5e1e4]">
                  {inv.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassPanel>
    </div>
  );
}
