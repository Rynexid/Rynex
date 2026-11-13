import {
  getOverviewStats,
  getRevenueChartData,
  getOrdersChartData,
  getLicenseStatusDistribution,
  getLifecycleStageDistribution,
  getLeadSourceDistribution,
  getTopProducts,
} from "@/server/actions/analytics";
import { Button } from "@/components/ui/button";
import { ChartArea } from "@components/ui/chart";
import { ChartBar } from "@components/ui/chart";
import { ChartPie } from "@components/ui/chart";
import { formatCurrency } from "@/lib/utils";

async function getAnalyticsData() {
  const [
    statsResult,
    revenueChartResult,
    ordersChartResult,
    licenseDistResult,
    lifecycleDistResult,
    leadSourceResult,
    topProductsResult,
  ] = await Promise.all([
    getOverviewStats(),
    getRevenueChartData(12),
    getOrdersChartData(12),
    getLicenseStatusDistribution(),
    getLifecycleStageDistribution(),
    getLeadSourceDistribution(),
    getTopProducts(5),
  ]);

  return {
    stats: statsResult.success ? statsResult.data : null,
    revenueChart: revenueChartResult.success ? revenueChartResult.data : [],
    ordersChart: ordersChartResult.success ? ordersChartResult.data : [],
    licenseDistribution: licenseDistResult.success
      ? licenseDistResult.data
      : [],
    lifecycleDistribution: lifecycleDistResult.success
      ? lifecycleDistResult.data
      : [],
    leadSources: leadSourceResult.success ? leadSourceResult.data : [],
    topProducts: topProductsResult.success ? topProductsResult.data : [],
  };
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export default async function AnalyticsPage() {
  const data = await getAnalyticsData();
  const stats = data.stats;

  const metrics = stats
    ? [
        {
          label: "Total Revenue",
          value: formatCurrency(stats.totalRevenue || 0),
          change: "+12.5%",
          trend: "up" as const,
        },
        {
          label: "Total Customers",
          value: formatNumber(stats.totalCustomers || 0),
          change: "+8.2%",
          trend: "up" as const,
        },
        {
          label: "Active Licenses",
          value: formatNumber(stats.activeLicenses || 0),
          change: "-0.5%",
          trend: "down" as const,
        },
        {
          label: "Total Orders",
          value: formatNumber(stats.totalOrders || 0),
          change: "+3.1%",
          trend: "up" as const,
        },
      ]
    : [];

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-bold">Analytics</h1>
          <p className="text-muted-foreground text-sm">
            Monitor your business performance and trends
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </Button>
          <Button variant="outline">
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="bg-card rounded-lg border p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">{m.label}</h3>
              <span
                className={`text-xs font-medium ${m.trend === "up" ? "text-green-600" : "text-red-600"}`}
              >
                {m.trend === "up" ? "↑" : "↓"} {m.change}
              </span>
            </div>
            <div className="text-2xl font-bold">{m.value}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="bg-card rounded-lg border p-6">
          <h3 className="mb-2 text-lg font-semibold">Revenue Trend</h3>
          <p className="text-muted-foreground mb-4 text-sm">
            Monthly revenue over the last 12 months
          </p>
          <div className="h-[300px]">
            <ChartArea
              data={data.revenueChart.map((d: any) => ({
                month: d.month,
                revenue: Number(d.revenue),
              }))}
              config={{
                revenue: { label: "Revenue", color: "var(--primary)" },
              }}
            />
          </div>
        </div>

        <div className="bg-card rounded-lg border p-6">
          <h3 className="mb-2 text-lg font-semibold">Orders Trend</h3>
          <p className="text-muted-foreground mb-4 text-sm">
            Monthly orders over the last 12 months
          </p>
          <div className="h-[300px]">
            <ChartBar
              data={data.ordersChart.map((d: any) => ({
                month: d.month,
                orders: Number(d.orders),
              }))}
              config={{
                orders: { label: "Orders", color: "var(--primary)" },
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="bg-card rounded-lg border p-6">
          <h3 className="mb-2 text-lg font-semibold">
            License Status Distribution
          </h3>
          <p className="text-muted-foreground mb-4 text-sm">
            Licenses by status
          </p>
          <div className="h-[300px]">
            <ChartPie
              data={data.licenseDistribution.map((d: any) => ({
                status: d.status,
                count: Number(d.count),
              }))}
              config={{
                count: { label: "Count", color: "var(--primary)" },
              }}
            />
          </div>
        </div>

        <div className="bg-card rounded-lg border p-6">
          <h3 className="mb-2 text-lg font-semibold">Top Products</h3>
          <p className="text-muted-foreground mb-4 text-sm">
            Products by order count
          </p>
          <div className="space-y-4">
            {data.topProducts.map((p: any, i: number) => (
              <div
                key={i}
                className="flex items-center justify-between border-b py-2 last:border-0"
              >
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-muted-foreground text-sm">
                    {p.order_count} orders
                  </p>
                </div>
                <span className="font-semibold">
                  {formatCurrency(p.revenue || 0)}
                </span>
              </div>
            ))}
            {data.topProducts.length === 0 && (
              <p className="text-muted-foreground py-4 text-center">
                No products found
              </p>
            )}
          </div>
        </div>

        <div className="bg-card rounded-lg border p-6">
          <h3 className="mb-2 text-lg font-semibold">Lead Sources</h3>
          <p className="text-muted-foreground mb-4 text-sm">Leads by source</p>
          <div className="h-[300px]">
            <ChartPie
              data={data.leadSources.map((d: any) => ({
                source: d.source,
                count: Number(d.count),
              }))}
              config={{
                count: { label: "Count", color: "var(--primary)" },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
