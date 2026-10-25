import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { db, products, licenses } from "@rynex/db"
import { count } from "drizzle-orm"

export default async function Page() {
  const [{ value: productCount }] = await db.select({ value: count() }).from(products)
  const [{ value: licenseCount }] = await db.select({ value: count() }).from(licenses)
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="grid gap-4 px-4 lg:px-6 md:grid-cols-2">
                <div className="rounded-xl border p-4">
                  <div className="text-sm text-muted-foreground">Products</div>
                  <div className="text-2xl font-bold">{productCount}</div>
                </div>
                <div className="rounded-xl border p-4">
                  <div className="text-sm text-muted-foreground">Licenses</div>
                  <div className="text-2xl font-bold">{licenseCount}</div>
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
    </SidebarProvider>
  )
}
