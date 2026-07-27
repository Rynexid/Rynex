import { neon } from "@neondatabase/serverless";
import { readFileSync } from "fs";
import { join } from "path";
import { config } from "dotenv";

config({ path: "../../.env.local" });

async function migrateToAuthSchema() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured");
  }

  const sql = neon(databaseUrl);

  const sqlFile = readFileSync(
    join(__dirname, "migrate-to-auth-schema.sql"),
    "utf-8",
  );

  const statements = sqlFile
    .split(";")
    .map((s) => s.trim())
    .filter(
      (s) => s.length > 0 && !s.startsWith("--") && !s.startsWith("SELECT"),
    );

  for (const statement of statements) {
    try {
      await sql.unsafe(statement);
      console.log(`✓ ${statement.substring(0, 100)}`);
    } catch (error: any) {
      console.error(`✗ ${statement.substring(0, 100)}`);
      console.error(`  ${error.message}`);
    }
  }

  // Verify
  const result = await sql.unsafe(`
    SELECT table_schema, table_name
    FROM information_schema.tables
    WHERE table_name IN ('users', 'sessions', 'accounts', 'verifications')
      AND table_schema IN ('public', 'auth')
    ORDER BY table_schema, table_name
  `);
  console.log("\nCurrent state:", result);

  process.exit(0);
}

migrateToAuthSchema();
