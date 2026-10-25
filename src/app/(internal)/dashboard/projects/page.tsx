import { db, projects } from "@rynex/db"

export default async function ProjectsPage() {
  const rows = await db.select().from(projects)
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Projects</h1>
      <ul className="mt-4 space-y-2">
        {rows.map((p) => (
          <li key={p.id} className="rounded border p-3">{p.name}</li>
        ))}
      </ul>
    </div>
  )
}
