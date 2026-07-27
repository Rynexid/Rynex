"use client";

import { Plus, Receipt } from "lucide-react";
import { useState } from "react";

import { GlassPanel } from "@/components/pos/glass-panel";
import { StatusBadge } from "@/components/pos/status-badge";

type ExpenseType =
  | "operational"
  | "supplies"
  | "utilities"
  | "marketing"
  | "other";

const expenses = [
  {
    id: "EXP-001",
    description: "Office Rent",
    amount: 1200,
    category: "operational" as ExpenseType,
    date: "01 Jul 2026",
    status: "paid" as const,
  },
  {
    id: "EXP-002",
    description: "Software Licenses",
    amount: 450,
    category: "operational" as ExpenseType,
    date: "02 Jul 2026",
    status: "paid" as const,
  },
  {
    id: "EXP-003",
    description: "Design Tools Subscription",
    amount: 89,
    category: "supplies" as ExpenseType,
    date: "03 Jul 2026",
    status: "paid" as const,
  },
  {
    id: "EXP-004",
    description: "Social Media Ads",
    amount: 300,
    category: "marketing" as ExpenseType,
    date: "05 Jul 2026",
    status: "pending" as const,
  },
  {
    id: "EXP-005",
    description: "Electricity Bill",
    amount: 210,
    category: "utilities" as ExpenseType,
    date: "10 Jul 2026",
    status: "pending" as const,
  },
  {
    id: "EXP-006",
    description: "Office Supplies",
    amount: 75,
    category: "supplies" as ExpenseType,
    date: "12 Jul 2026",
    status: "paid" as const,
  },
];

const categoryStyles: Record<ExpenseType, string> = {
  operational: "bg-[rgba(173,198,255,0.1)] text-[#adc6ff]",
  supplies: "bg-[rgba(255,185,95,0.1)] text-[#ffb95f]",
  utilities: "bg-[rgba(74,225,118,0.1)] text-[#4ae176]",
  marketing: "bg-[rgba(255,180,171,0.1)] text-[#ffb4ab]",
  other: "bg-[rgba(194,198,214,0.1)] text-[#c2c6d6]",
};

export default function ExpensesPage() {
  const [filter, setFilter] = useState<"all" | "paid" | "pending">("all");

  const totalPaid = expenses
    .filter((e) => e.status === "paid")
    .reduce((s, e) => s + e.amount, 0);
  const totalPending = expenses
    .filter((e) => e.status === "pending")
    .reduce((s, e) => s + e.amount, 0);

  const filtered =
    filter === "all" ? expenses : expenses.filter((e) => e.status === filter);

  return (
    <div className="flex-1 space-y-6 p-6 lg:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#e5e1e4]">Expenses</h1>
          <p className="mt-1 text-sm text-[#c2c6d6]">
            Track your operational costs
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-[#adc6ff] px-4 py-2 text-sm font-bold text-[#002e6a] transition-all hover:opacity-90">
          <Plus className="h-4 w-4" />
          Add Expense
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <GlassPanel>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#c2c6d6]">Total Expenses</span>
            <Receipt className="h-4 w-4 text-[#adc6ff]" />
          </div>
          <p className="mt-2 text-2xl font-semibold text-[#e5e1e4]">
            ${expenses.reduce((s, e) => s + e.amount, 0)}
          </p>
        </GlassPanel>
        <GlassPanel>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#c2c6d6]">Paid</span>
            <div className="h-2 w-2 rounded-full bg-[#4ae176]" />
          </div>
          <p className="mt-2 text-2xl font-semibold text-[#4ae176]">
            ${totalPaid}
          </p>
        </GlassPanel>
        <GlassPanel>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#c2c6d6]">Pending</span>
            <div className="h-2 w-2 rounded-full bg-[#ffb95f]" />
          </div>
          <p className="mt-2 text-2xl font-semibold text-[#ffb95f]">
            ${totalPending}
          </p>
        </GlassPanel>
      </div>

      <GlassPanel>
        <div className="mb-4 flex items-center gap-2">
          {(["all", "paid", "pending"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold tracking-wider uppercase transition-all ${
                filter === t
                  ? "bg-[#adc6ff] text-[#002e6a]"
                  : "text-[#c2c6d6] hover:bg-[#1c1b1d]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#27272A]">
              {[
                "ID",
                "Description",
                "Category",
                "Amount",
                "Date",
                "Status",
              ].map((h) => (
                <th
                  key={h}
                  className={`px-3 py-3 text-left text-xs font-semibold tracking-wider text-[#c2c6d6] uppercase ${h === "Amount" ? "text-right" : ""}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#27272A]/50">
            {filtered.map((exp) => (
              <tr
                key={exp.id}
                className="transition-colors hover:bg-[rgba(32,31,34,0.3)]"
              >
                <td className="px-3 py-4 text-sm font-medium text-[#adc6ff]">
                  {exp.id}
                </td>
                <td className="px-3 py-4 text-sm text-[#e5e1e4]">
                  {exp.description}
                </td>
                <td className="px-3 py-4">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${categoryStyles[exp.category]}`}
                  >
                    {exp.category}
                  </span>
                </td>
                <td className="px-3 py-4 text-right text-sm font-semibold text-[#e5e1e4]">
                  ${exp.amount}
                </td>
                <td className="px-3 py-4 text-sm text-[#c2c6d6]">{exp.date}</td>
                <td className="px-3 py-4">
                  <StatusBadge variant={exp.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassPanel>
    </div>
  );
}
