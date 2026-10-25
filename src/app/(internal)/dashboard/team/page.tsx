import { db, teamMembers } from "@rynex/db"

export default async function TeamPage() {
  const rows = await db.select().from(teamMembers)
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Team</h1>
      <ul className="mt-4 space-y-2">
        {rows.map((m) => (
          <li key={m.id} className="rounded border p-3">{m.name} — {m.role}</li>
        ))}
      </ul>
    </div>
  )
}
