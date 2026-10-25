import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
config({ path: "../../.env.local" });

const sql = neon(process.env.DATABASE_URL!);

async function migrate() {
  console.log("Adding status column to products table...");
  
  try {
    await sql`
      ALTER TABLE "cores"."products" 
      ADD COLUMN IF NOT EXISTS "status" varchar(50) NOT NULL DEFAULT 'draft';
    `;
    console.log("  Added: status column to products table");
  } catch (e) {
    console.log("  Column may already exist:", e);
  }
  
  console.log("Migration complete!");
}

migrate()
  .catch(console.error)
  .finally(() => process.exit(0));
