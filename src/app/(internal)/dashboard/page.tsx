import { db, products, licenses, orders, projects } from "@rynex/db"
import { count } from "drizzle-orm"

import { SectionCards } from "@/components/section-cards"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"

export default async function Page() {
  const [{ value: productCount }] = await db.select({ value: count() }).from(products)
  const [{ value: licenseCount }] = await db.select({ value: count() }).from(licenses)
  const [{ value: orderCount }] = await db.select({ value: count() }).from(orders)
  const [{ value: projectCount }] = await db.select({ value: count() }).from(projects)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border p-4">
          <div className="text-sm text-muted-foreground">Products</div>
          <div className="text-2xl font-bold">{productCount}</div>
        </div>
        <div className="rounded-xl border p-4">
          <div className="text-sm text-muted-foreground">Licenses</div>
          <div className="text-2xl font-bold">{licenseCount}</div>
        </div>
        <div className="rounded-xl border p-4">
          <div className="text-sm text-muted-foreground">Orders</div>
          <div className="text-2xl font-bold">{orderCount}</div>
        </div>
        <div className="rounded-xl border p-4">
          <div className="text-sm text-muted-foreground">Projects</div>
          <div className="text-2xl font-bold">{projectCount}</div>
        </div>
      </div>
      <SectionCards />
      <ChartAreaInteractive />
      <DataTable data={[]} />
    </div>
  )
}
