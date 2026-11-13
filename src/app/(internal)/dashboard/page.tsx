import { ChartAreaInteractive } from "@components/chart-area-interactive";
import { SectionCards } from "@components/section-cards";
import {
  getOverviewStats,
  getRevenueChartData,
} from "@/server/actions/analytics";

async function getOverviewData() {
  const [statsResult, chartResult] = await Promise.all([
    getOverviewStats(),
    getRevenueChartData(12),
  ]);

  return {
    stats: statsResult.success ? statsResult.data : null,
    chartData: chartResult.success ? chartResult.data : [],
  };
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

function calculateChange(
  current: number,
  previous: number,
): { change: string; trend: "up" | "down" } {
  if (previous === 0) return { change: "+100%", trend: "up" };
  const percent = ((current - previous) / previous) * 100;
  return {
    change: `${percent >= 0 ? "+" : ""}${percent.toFixed(1)}%`,
    trend: percent >= 0 ? "up" : "down",
  };
}

function transformChartData(
  rows: any[],
): { date: string; desktop: number; mobile: number }[] {
  // Transform revenue chart data to match the expected format
  // Using month as date and splitting revenue into desktop/mobile proportionally
  return rows.map((row, index) => ({
    date: new Date(row.month + " 1, 2024").toISOString().split("T")[0],
    desktop: Math.round(Number(row.revenue) * 0.6),
    mobile: Math.round(Number(row.revenue) * 0.4),
  }));
}

export default async function Page() {
  const { stats, chartData } = await getOverviewData();

  const statCards = stats
    ? [
        {
          title: "Total Revenue",
          value: formatCurrency(stats.totalRevenue || 0),
          change: "+12.5%",
          trend: "up" as const,
          description: "Trending up this month",
        },
        {
          title: "Total Customers",
          value: formatNumber(stats.totalCustomers || 0),
          change: "+8.2%",
          trend: "up" as const,
          description: "New customers this period",
        },
        {
          title: "Active Licenses",
          value: formatNumber(stats.activeLicenses || 0),
          change: "+12.5%",
          trend: "up" as const,
          description: "Active licenses",
        },
        {
          title: "Total Orders",
          value: formatNumber(stats.totalOrders || 0),
          change: "+4.5%",
          trend: "up" as const,
          description: "Orders this period",
        },
      ]
    : undefined;

  const transformedChartData =
    chartData.length > 0 ? transformChartData(chartData) : undefined;

  return (
    <>
      <SectionCards stats={statCards} />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive
          data={transformedChartData}
          title="Revenue Overview"
          description="Monthly revenue for the last 12 months"
        />
      </div>
    </>
  );
}
