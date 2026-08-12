import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  jsonb,
  pgSchema,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

// ── Auth Schema ──

const authSchema = pgSchema("auth");

export const users = authSchema.table("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  role: varchar("role", { length: 50 }).notNull().default("customer"),
  banned: boolean("banned").default(false),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
  licenseVerified: boolean("license_verified").default(false).notNull(),
  licenseAttempts: integer("license_attempts").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const sessions = authSchema.table(
  "sessions",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    impersonatedBy: text("impersonated_by"),
  },
  (table) => [index("sessions_userId_idx").on(table.userId)],
);

export const accounts = authSchema.table(
  "accounts",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("accounts_userId_idx").on(table.userId)],
);

export const verifications = authSchema.table(
  "verifications",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("verifications_identifier_idx").on(table.identifier)],
);

// ── Auth Relations ──

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  accounts: many(accounts),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

// ── Cores Schema (dashboard/admin tables) ──

const coresSchema = pgSchema("cores");

export const products = coresSchema.table("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  image: varchar("image", { length: 500 }),
  type: varchar("type", { length: 50 }).notNull().default("template"),
  version: varchar("version", { length: 50 }).notNull().default("1.0.0"),
  price: integer("price").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const licenses = coresSchema.table("licenses", {
  id: serial("id").primaryKey(),
  licenseKey: varchar("license_key", { length: 255 }).notNull().unique(),
  productId: integer("product_id").references(() => products.id),
  customerEmail: varchar("customer_email", { length: 255 }).notNull(),
  plan: varchar("plan", { length: 50 }).notNull().default("basic"),
  status: varchar("status", { length: 50 }).notNull().default("inactive"),
  domain: varchar("domain", { length: 255 }),
  issuedAt: timestamp("issued_at").defaultNow(),
  activatedAt: timestamp("activated_at"),
  expiresAt: timestamp("expires_at"),
  maxActivations: integer("max_activations").notNull().default(1),
  currentActivations: integer("current_activations").notNull().default(0),
  signature: text("signature"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const activations = coresSchema.table("activations", {
  id: serial("id").primaryKey(),
  licenseId: integer("license_id")
    .notNull()
    .references(() => licenses.id),
  domain: varchar("domain", { length: 255 }).notNull(),
  ipAddress: varchar("ip_address", { length: 45 }),
  activatedAt: timestamp("activated_at").defaultNow(),
  deviceHash: varchar("device_hash", { length: 255 }),
});

export const orders = coresSchema.table("orders", {
  id: serial("id").primaryKey(),
  customerEmail: varchar("customer_email", { length: 255 }).notNull(),
  productId: integer("product_id").references(() => products.id),
  amount: integer("amount").notNull(),
  paymentStatus: varchar("payment_status", { length: 50 })
    .notNull()
    .default("pending"),
  paymentProvider: varchar("payment_provider", { length: 50 }),
  purchasedAt: timestamp("purchased_at").defaultNow(),
});

export const nodes = coresSchema.table("nodes", {
  id: text("id").primaryKey(),
  expiry: timestamp("expiry").notNull(),
});

export const outbox = coresSchema.table("outbox", {
  sequenceId: serial("sequence_id").primaryKey(),
  mutationId: text("mutation_id").notNull(),
  channel: text("channel").notNull(),
  name: text("name").notNull(),
  rejected: boolean("rejected").notNull().default(false),
  data: jsonb("data"),
  headers: jsonb("headers"),
  lockedBy: text("locked_by"),
  lockExpiry: timestamp("lock_expiry"),
  processed: boolean("processed").notNull().default(false),
});

// ── Customer Schema (console portal tables) ──

const customerSchema = pgSchema("customer");

export const customerProfiles = customerSchema.table("customer_profiles", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  company: varchar("company", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  timezone: varchar("timezone", { length: 100 }).default("Asia/Jakarta"),
  preferredLanguage: varchar("preferred_language", { length: 10 }).default(
    "id",
  ),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const apiKeys = customerSchema.table(
  "api_keys",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull(),
    keyHash: varchar("key_hash", { length: 255 }).notNull(),
    keyPrefix: varchar("key_prefix", { length: 20 }).notNull(),
    lastUsedAt: timestamp("last_used_at"),
    revokedAt: timestamp("revoked_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("api_keys_userId_idx").on(table.userId)],
);

export const supportTickets = customerSchema.table(
  "support_tickets",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    subject: varchar("subject", { length: 255 }).notNull(),
    message: text("message").notNull(),
    status: varchar("status", { length: 50 }).notNull().default("open"),
    priority: varchar("priority", { length: 20 }).notNull().default("medium"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    resolvedAt: timestamp("resolved_at"),
  },
  (table) => [
    index("support_tickets_userId_idx").on(table.userId),
    index("support_tickets_status_idx").on(table.status),
  ],
);

export const workspaces = customerSchema.table(
  "workspaces",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("workspaces_userId_idx").on(table.userId)],
);

// ── Customer Relations ──

export const customerProfilesRelations = relations(
  customerProfiles,
  ({ one }) => ({
    user: one(users, {
      fields: [customerProfiles.userId],
      references: [users.id],
    }),
  }),
);

export const apiKeysRelations = relations(apiKeys, ({ one }) => ({
  user: one(users, {
    fields: [apiKeys.userId],
    references: [users.id],
  }),
}));

export const supportTicketsRelations = relations(supportTickets, ({ one }) => ({
  user: one(users, {
    fields: [supportTickets.userId],
    references: [users.id],
  }),
}));

export const workspacesRelations = relations(workspaces, ({ one }) => ({
  user: one(users, {
    fields: [workspaces.userId],
    references: [users.id],
  }),
}));

// ── Admin Auth Schema (separate from better-auth) ──

const adminSchema = pgSchema("admin");

export const adminUsers = adminSchema.table("users", {
  id: text("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).notNull().default("staff"),
  licenseVerified: boolean("license_verified").default(false).notNull(),
  licenseAttempts: integer("license_attempts").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const adminSessions = adminSchema.table("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => adminUsers.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const adminUsersRelations = relations(adminUsers, ({ many }) => ({
  sessions: many(adminSessions),
}));

export const adminSessionsRelations = relations(adminSessions, ({ one }) => ({
  user: one(adminUsers, {
    fields: [adminSessions.userId],
    references: [adminUsers.id],
  }),
}));

// ── Public Schema (content tables) ──

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  postSlug: varchar("post_slug", { length: 255 }).notNull(),
  authorName: varchar("author_name", { length: 100 }).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at"),
  deletedAt: timestamp("deleted_at"),
});

export const commentOutbox = pgTable("comment_outbox", {
  id: serial("id").primaryKey(),
  mutationId: uuid("mutation_id").notNull().unique(),
  postSlug: varchar("post_slug", { length: 255 }).notNull(),
  name: varchar("name", { length: 50 }).notNull(),
  data: jsonb("data").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  processed: boolean("processed").default(false).notNull(),
});

export const blogViews = pgTable("blog_views", {
  slug: varchar("slug", { length: 255 }).primaryKey(),
  views: integer("views").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ── Reviews / Testimonials ──

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  authorName: varchar("author_name", { length: 100 }).notNull(),
  authorRole: varchar("author_role", { length: 150 }),
  authorImage: text("author_image"),
  rating: integer("rating").notNull().default(5),
  content: text("content").notNull(),
  service: varchar("service", { length: 100 }),
  status: varchar("status", { length: 20 }).notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
}));

// ── Portfolio ──

export const portfolio = pgTable("portfolio", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  description: text("description").notNull(),
  client: varchar("client", { length: 255 }),
  challenge: text("challenge"),
  solution: text("solution"),
  outcome: text("outcome"),
  tags: jsonb("tags").$type<string[]>().default([]).notNull(),
  cover: varchar("cover", { length: 500 }).notNull(),
  images: jsonb("images").$type<string[]>().default([]).notNull(),
  demo: varchar("demo", { length: 500 }),
  featured: boolean("featured").default(false).notNull(),
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
