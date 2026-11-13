"use client";

import { useState } from "react";
import { Calendar, Download, Filter, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DateRangePicker } from "@/components/date-range-picker";
import { ChartArea, ChartBar, ChartPie } from "@/components/ui/chart";

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });
  const [metric, setMetric] = useState("revenue");

  const metrics = [
    { label: "Total Revenue", value: "Rp 2.4B", change: "+12.5%", trend: "up" },
    { label: "New Customers", value: "1,234", change: "+8.2%", trend: "up" },
    { label: "Conversion Rate", value: "3.24%", change: "-0.5%", trend: "down" },
    { label: "Avg Order Value", value: "Rp 1.95M", change: "+3.1%", trend: "up" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-bold">Analytics</h1>
          <p className="text-sm text-muted-foreground">Monitor your business performance and trends</p>
        </div>
        <div className="flex items-center gap-2">
          <DateRangePicker value={dateRange} onChange={setDateRange} />
          <Select value={metric} onValueChange={setMetric}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="revenue">Revenue</SelectItem>
              <SelectItem value="customers">Customers</SelectItem>
              <SelectItem value="conversion">Conversion</SelectItem>
              <SelectItem value="orders">Orders</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon"><RefreshCw className="h-4 w-4" /></Button>
          <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <Card key={m.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{m.label}</CardTitle>
              <span className={`text-xs font-medium ${m.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                {m.trend === "up" ? "↑" : "↓"} {m.change}
              </span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{m.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue over the selected period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartArea />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Acquisition</CardTitle>
            <CardDescription>New customers by channel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartBar />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>Visitor to customer conversion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartPie />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Top Products</CardTitle>
            <Button variant="ghost" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Dashboard SaaS", revenue: "Rp 450M", orders: 120 },
                { name: "Portfolio Anime", revenue: "Rp 320M", orders: 85 },
                { name: "E-commerce Starter", revenue: "Rp 280M", orders: 72 },
                { name: "Landing Page Modern", revenue: "Rp 195M", orders: 54 },
              ].map((p, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{p.name}</p>
                    <p className="text-sm text-muted-foreground">{p.orders} orders</p>
                  </div>
                  <span className="font-semibold">{p.revenue}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Traffic Sources</CardTitle>
            <Button variant="ghost" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { source: "Organic Search", visits: "45.2%", trend: "up" },
                { source: "Direct", visits: "28.5%", trend: "up" },
                { source: "Referral", visits: "15.3%", trend: "down" },
                { source: "Social", visits: "11.0%", trend: "up" },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span>{s.source}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{s.visits}</span>
                    <span className={`text-xs ${s.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {s.trend === "up" ? "↑" : "↓"} 2.1%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
