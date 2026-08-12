import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not configured");
}

export const sql = neon(databaseUrl);
export const db = drizzle(sql, { schema });
export { schema };

export {
  users,
  sessions,
  accounts,
  verifications,
  products,
  licenses,
  activations,
  orders,
  nodes,
  outbox,
  comments,
  commentOutbox,
  blogViews,
  reviews,
  portfolio,
  customerProfiles,
  apiKeys,
  supportTickets,
  workspaces,
  adminUsers,
  adminSessions,
} from "./schema";
