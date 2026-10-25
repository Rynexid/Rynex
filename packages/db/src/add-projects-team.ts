import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
config({ path: "../../.env.local" });

const sql = neon(process.env.DATABASE_URL!);

async function migrate() {
  console.log("Creating projects and team_members tables...");
  
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS "cores"."projects" (
        "id" serial PRIMARY KEY NOT NULL,
        "name" varchar(255) NOT NULL,
        "description" text,
        "status" varchar(50) NOT NULL DEFAULT 'active',
        "created_at" timestamp DEFAULT now() NOT NULL
      );
    `;
    console.log("  Created: projects table");
  } catch (e) {
    console.log("  projects table:", e);
  }
  
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS "cores"."team_members" (
        "id" serial PRIMARY KEY NOT NULL,
        "name" varchar(255) NOT NULL,
        "role" varchar(100),
        "email" varchar(255),
        "created_at" timestamp DEFAULT now() NOT NULL
      );
    `;
    console.log("  Created: team_members table");
  } catch (e) {
    console.log("  team_members table:", e);
  }
  
  console.log("Migration complete!");
}

migrate()
  .catch(console.error)
  .finally(() => process.exit(0));
