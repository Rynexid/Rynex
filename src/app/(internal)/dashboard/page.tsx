import { db, products, licenses, orders, projects, teamMembers, reviews, portfolio, comments } from "@rynex/db"
import { count } from "drizzle-orm"

import { SectionCards } from "@/components/section-cards"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default async function Page() {
  const [{ value: productCount }] = await db.select({ value: count() }).from(products)
  const [{ value: licenseCount }] = await db.select({ value: count() }).from(licenses)
  const [{ value: orderCount }] = await db.select({ value: count() }).from(orders)
  const [{ value: projectCount }] = await db.select({ value: count() }).from(projects)
  const [{ value: teamCount }] = await db.select({ value: count() }).from(teamMembers)
  const [{ value: reviewCount }] = await db.select({ value: count() }).from(reviews)
  const [{ value: portfolioCount }] = await db.select({ value: count() }).from(portfolio)
  const [{ value: commentCount }] = await db.select({ value: count() }).from(comments)

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col overflow-y-auto">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <div className="grid gap-4 px-4 lg:px-6 md:grid-cols-2 xl:grid-cols-4">
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
                <div className="px-4 lg:px-6">
                  <ChartAreaInteractive />
                </div>
                <DataTable data={[]} />
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
