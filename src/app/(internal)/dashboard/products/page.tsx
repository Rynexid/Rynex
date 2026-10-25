import { db, products } from "@rynex/db"

export default async function ProductsPage() {
  const rows = await db.select().from(products)
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Products</h1>
      <ul className="mt-4 space-y-2">
        {rows.map((p) => (
          <li key={p.id} className="rounded border p-3">{p.name ?? p.id}</li>
        ))}
      </ul>
    </div>
  )
}
