import { db, orders } from "@rynex/db"

export default async function OrdersPage() {
  const rows = await db.select().from(orders)
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Orders</h1>
      <ul className="mt-4 space-y-2">
        {rows.map((o) => (
          <li key={o.id} className="rounded border p-3">{o.id}</li>
        ))}
      </ul>
    </div>
  )
}
