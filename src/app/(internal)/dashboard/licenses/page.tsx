import { db, licenses } from "@rynex/db"

export default async function LicensesPage() {
  const rows = await db.select().from(licenses)
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Licenses</h1>
      <ul className="mt-4 space-y-2">
        {rows.map((l) => (
          <li key={l.id} className="rounded border p-3">{l.licenseKey ?? l.id}</li>
        ))}
      </ul>
    </div>
  )
}
