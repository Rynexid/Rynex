"use client";

import {
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@rynex/ui/card";

const chartColors = {
  primary: "#6366f1",
  purple: "#a78bfa",
  green: "#4ae176",
  amber: "#f59e0b",
  red: "#ef4444",
  blue: "#60a5fa",
  gray: "#6b7280",
};

const statusColors: Record<string, string> = {
  active: chartColors.green,
  inactive: chartColors.gray,
  suspended: chartColors.amber,
  revoked: chartColors.red,
};

export function RevenueChart({
  data,
}: {
  data: { month: string; revenue: number }[];
}) {
  return (
    <Card className="border-border/50 bg-[#111113]">
      <CardHeader>
        <CardTitle className="text-sm font-semibold text-[#e5e1e4]">
          Pendapatan Bulanan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChartComponent data={data} />
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function AreaChartComponent({
  data,
}: {
  data: { month: string; revenue: number }[];
}) {
  return (
    <LineChart data={data}>
      <defs>
        <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={chartColors.primary} stopOpacity={0.3} />
          <stop offset="95%" stopColor={chartColors.primary} stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis
        dataKey="month"
        axisLine={false}
        tickLine={false}
        tick={{ fill: "#8c909f", fontSize: 12 }}
      />
      <YAxis
        axisLine={false}
        tickLine={false}
        tick={{ fill: "#8c909f", fontSize: 12 }}
        tickFormatter={(v: number) => `Rp${(v / 1000000).toFixed(0)}jt`}
      />
      <Tooltip
        contentStyle={{
          background: "#1a1b1e",
          border: "1px solid #27272A",
          borderRadius: 8,
          fontSize: 13,
        }}
        labelStyle={{ color: "#e5e1e4" }}
        formatter={(value) => [
          `Rp ${Number(value).toLocaleString("id-ID")}`,
          "Pendapatan",
        ]}
      />
      <Line
        type="monotone"
        dataKey="revenue"
        stroke={chartColors.primary}
        strokeWidth={2}
        dot={{ fill: chartColors.primary, r: 4 }}
        activeDot={{ r: 6 }}
      />
    </LineChart>
  );
}

export function LicenseStatusChart({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <Card className="border-border/50 bg-[#111113]">
      <CardHeader>
        <CardTitle className="text-sm font-semibold text-[#e5e1e4]">
          Status Lisensi
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={
                      statusColors[entry.name.toLowerCase()] || chartColors.gray
                    }
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#1a1b1e",
                  border: "1px solid #27272A",
                  borderRadius: 8,
                  fontSize: 13,
                }}
                labelStyle={{ color: "#e5e1e4" }}
                formatter={(value, name) => [
                  `${value} (${((Number(value) / total) * 100).toFixed(1)}%)`,
                  name,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 flex flex-wrap justify-center gap-4">
          {data.map((d) => (
            <div key={d.name} className="flex items-center gap-1.5">
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor:
                    statusColors[d.name.toLowerCase()] || chartColors.gray,
                }}
              />
              <span className="text-[11px] text-[#8c909f]">
                {d.name}: {d.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function ProductsBarChart({
  data,
}: {
  data: { name: string; orders: number; revenue: number }[];
}) {
  return (
    <Card className="border-border/50 bg-[#111113]">
      <CardHeader>
        <CardTitle className="text-sm font-semibold text-[#e5e1e4]">
          Produk Terpopuler
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#8c909f", fontSize: 12 }}
                width={120}
              />
              <Tooltip
                contentStyle={{
                  background: "#1a1b1e",
                  border: "1px solid #27272A",
                  borderRadius: 8,
                  fontSize: 13,
                }}
                labelStyle={{ color: "#e5e1e4" }}
                formatter={(value) => [Number(value), "Pesanan"]}
              />
              <Bar dataKey="orders" radius={[0, 4, 4, 0]}>
                {data.map((_, index) => (
                  <Cell
                    key={index}
                    fill={
                      [
                        chartColors.primary,
                        chartColors.purple,
                        chartColors.blue,
                        chartColors.green,
                        chartColors.amber,
                      ][index % 5]
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
