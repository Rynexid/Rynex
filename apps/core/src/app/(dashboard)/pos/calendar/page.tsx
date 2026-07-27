"use client";

import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

import { GlassPanel } from "@/components/pos/glass-panel";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const events: {
  date: number;
  title: string;
  type: "deadline" | "meeting" | "milestone";
}[] = [
  { date: 5, title: "Lumina Brand Review", type: "meeting" },
  { date: 12, title: "Nexus App MVP Due", type: "deadline" },
  { date: 18, title: "Payment Gateway Launch", type: "milestone" },
  { date: 22, title: "BioTech Landing Page", type: "deadline" },
  { date: 28, title: "Team Standup", type: "meeting" },
];

const typeStyles = {
  deadline: "bg-[rgba(255,180,171,0.15)] border-l-[#ffb4ab] text-[#ffb4ab]",
  meeting: "bg-[rgba(173,198,255,0.15)] border-l-[#adc6ff] text-[#adc6ff]",
  milestone: "bg-[rgba(74,225,118,0.15)] border-l-[#4ae176] text-[#4ae176]",
};

export default function CalendarPage() {
  const [month, setMonth] = useState(6);
  const [year] = useState(2026);

  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDay = new Date(year, month - 1, 1).getDay();

  return (
    <div className="flex-1 space-y-6 p-6 lg:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#e5e1e4]">Calendar</h1>
          <p className="mt-1 text-sm text-[#c2c6d6]">
            Project deadlines &amp; events
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <GlassPanel className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={() => setMonth((m) => Math.max(1, m - 1))}
              className="text-[#c2c6d6] transition-colors hover:text-[#e5e1e4]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-semibold text-[#e5e1e4]">
              {monthNames[month - 1]} {year}
            </h2>
            <button
              onClick={() => setMonth((m) => Math.min(12, m + 1))}
              className="text-[#c2c6d6] transition-colors hover:text-[#e5e1e4]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div
                key={d}
                className="py-2 text-center text-[10px] font-bold tracking-wider text-[#8c909f] uppercase"
              >
                {d}
              </div>
            ))}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayEvents = events.filter((e) => e.date === day);
              return (
                <div
                  key={day}
                  className={`min-h-[80px] rounded-lg border p-1.5 transition-all ${
                    dayEvents.length > 0
                      ? "border-[#adc6ff]/30 bg-[rgba(173,198,255,0.05)]"
                      : "border-[#27272A] hover:border-[#353437]"
                  }`}
                >
                  <span className="text-[11px] font-medium text-[#c2c6d6]">
                    {day}
                  </span>
                  {dayEvents.slice(0, 2).map((e, j) => (
                    <div
                      key={j}
                      className={`mt-1 rounded border-l-2 px-1 py-0.5 text-[9px] font-medium ${typeStyles[e.type]}`}
                    >
                      {e.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="mt-0.5 text-[8px] text-[#8c909f]">
                      +{dayEvents.length - 2} more
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </GlassPanel>

        <div className="space-y-4">
          <GlassPanel>
            <h3 className="mb-3 text-sm font-semibold text-[#e5e1e4]">
              Upcoming Events
            </h3>
            <div className="space-y-3">
              {events.map((e, i) => (
                <div
                  key={i}
                  className={`rounded-lg border-l-4 p-3 ${typeStyles[e.type]}`}
                >
                  <p className="text-sm font-medium">{e.title}</p>
                  <p className="mt-0.5 text-[10px] tracking-wider uppercase opacity-70">
                    {e.type}
                  </p>
                  <p className="mt-0.5 text-xs text-[#c2c6d6]">
                    Jul {e.date}, 2026
                  </p>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
