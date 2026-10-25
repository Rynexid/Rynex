import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
config({ path: "../../.env.local" });

const sql = neon(process.env.DATABASE_URL!);

async function migrate() {
  console.log("Checking missing tables...");
  
  // Check and create comments table
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS "public"."comments" (
        "id" serial PRIMARY KEY NOT NULL,
        "content" text NOT NULL,
        "user_id" text,
        "post_id" integer,
        "created_at" timestamp DEFAULT now() NOT NULL
      );
    `;
    console.log("  Created: comments table");
  } catch (e) {
    console.log("  comments table:", e);
  }
  
  // Check and create reviews table
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS "public"."reviews" (
        "id" serial PRIMARY KEY NOT NULL,
        "user_id" text,
        "author_name" varchar(100) NOT NULL,
        "author_role" varchar(150),
        "author_image" text,
        "rating" integer DEFAULT 5 NOT NULL,
        "content" text NOT NULL,
        "service" varchar(100),
        "status" varchar(20) DEFAULT 'pending' NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL
      );
    `;
    console.log("  Created: reviews table");
  } catch (e) {
    console.log("  reviews table:", e);
  }
  
  // Check and create portfolio table
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS "public"."portfolio" (
        "id" serial PRIMARY KEY NOT NULL,
        "slug" varchar(255) NOT NULL,
        "title" varchar(255) NOT NULL,
        "category" varchar(100) NOT NULL,
        "description" text NOT NULL,
        "client" varchar(255),
        "challenge" text,
        "solution" text,
        "outcome" text,
        "tags" jsonb DEFAULT '[]'::jsonb NOT NULL,
        "cover" varchar(500) NOT NULL,
        "images" jsonb DEFAULT '[]'::jsonb NOT NULL,
        "demo" varchar(500),
        "featured" boolean DEFAULT false NOT NULL,
        "order" integer DEFAULT 0 NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL,
        CONSTRAINT "portfolio_slug_unique" UNIQUE("slug")
      );
    `;
    console.log("  Created: portfolio table");
  } catch (e) {
    console.log("  portfolio table:", e);
  }
  
  // Check and create blog_views table
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS "public"."blog_views" (
        "id" serial PRIMARY KEY NOT NULL,
        "slug" varchar(255) NOT NULL,
        "views" integer DEFAULT 0 NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL
      );
    `;
    console.log("  Created: blog_views table");
  } catch (e) {
    console.log("  blog_views table:", e);
  }
  
  // Check and create comment_outbox table
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS "public"."comment_outbox" (
        "id" serial PRIMARY KEY NOT NULL,
        "comment_id" integer NOT NULL,
        "action" varchar(20) NOT NULL,
        "payload" jsonb NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL
      );
    `;
    console.log("  Created: comment_outbox table");
  } catch (e) {
    console.log("  comment_outbox table:", e);
  }
  
  console.log("Migration complete!");
}

migrate()
  .catch(console.error)
  .finally(() => process.exit(0));
