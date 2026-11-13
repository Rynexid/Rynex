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
  status: varchar("status", { length: 50 }).notNull().default("draft"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const lifecycleStages = coresSchema.table(
  "lifecycle_stages",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    stage: varchar("stage", { length: 50 }).notNull(),
    progress: integer("progress").notNull().default(0),
    product: varchar("product", { length: 255 }).notNull(),
    status: varchar("status", { length: 50 }).notNull().default("planning"),
    productId: integer("product_id").references(() => products.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("lifecycle_stages_product_id_idx").on(table.productId),
    index("lifecycle_stages_stage_idx").on(table.stage),
    index("lifecycle_stages_status_idx").on(table.status),
  ],
);

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

export const projects = coresSchema.table("projects", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  status: varchar("status", { length: 50 }).notNull().default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const teamMembers = coresSchema.table("team_members", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  role: varchar("role", { length: 100 }),
  email: varchar("email", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const nodes = coresSchema.table("nodes", {
  id: text("id").primaryKey(),
  expiry: timestamp("expiry").notNull(),
});

export const leads = coresSchema.table(
  "leads",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 50 }),
    company: varchar("company", { length: 255 }),
    source: varchar("source", { length: 50 }).notNull().default("website"),
    status: varchar("status", { length: 50 }).notNull().default("new"),
    value: integer("value").notNull().default(0),
    assignedTo: varchar("assigned_to", { length: 255 }),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("leads_email_idx").on(table.email),
    index("leads_status_idx").on(table.status),
    index("leads_source_idx").on(table.source),
  ],
);

export const inquiries = coresSchema.table(
  "inquiries",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 50 }),
    subject: varchar("subject", { length: 255 }).notNull(),
    message: text("message").notNull(),
    service: varchar("service", { length: 100 }),
    status: varchar("status", { length: 50 }).notNull().default("open"),
    priority: varchar("priority", { length: 20 }).notNull().default("medium"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date()),
    resolvedAt: timestamp("resolved_at"),
  },
  (table) => [
    index("inquiries_email_idx").on(table.email),
    index("inquiries_status_idx").on(table.status),
    index("inquiries_service_idx").on(table.service),
  ],
);

export const services = coresSchema.table(
  "services",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    description: text("description"),
    shortDescription: varchar("short_description", { length: 500 }),
    icon: varchar("icon", { length: 100 }),
    category: varchar("category", { length: 100 }),
    price: integer("price").notNull().default(0),
    featured: boolean("featured").default(false).notNull(),
    order: integer("order").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("services_category_idx").on(table.category),
    index("services_featured_idx").on(table.featured),
  ],
);

export const content = coresSchema.table(
  "content",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    description: text("description"),
    body: text("body"),
    type: varchar("type", { length: 50 }).notNull().default("page"),
    category: varchar("category", { length: 100 }),
    tags: jsonb("tags").$type<string[]>().default([]).notNull(),
    cover: varchar("cover", { length: 500 }),
    status: varchar("status", { length: 50 }).notNull().default("draft"),
    authorId: text("author_id").references(() => users.id, {
      onDelete: "set null",
    }),
    publishedAt: timestamp("published_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("content_author_id_idx").on(table.authorId),
    index("content_status_idx").on(table.status),
    index("content_type_idx").on(table.type),
    index("content_category_idx").on(table.category),
  ],
);

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

// ── Cores Schema Relations ──

export const productsRelations = relations(products, ({ many }) => ({
  lifecycleStages: many(lifecycleStages),
}));

export const lifecycleStagesRelations = relations(
  lifecycleStages,
  ({ one }) => ({
    product: one(products, {
      fields: [lifecycleStages.productId],
      references: [products.id],
    }),
  }),
);

export const leadsRelations = relations(leads, ({ one }) => ({
  // No direct relation to users table - leads are standalone
}));

export const inquiriesRelations = relations(inquiries, ({ one }) => ({
  // No direct relation to users table - inquiries are standalone
}));

export const servicesRelations = relations(services, ({ one }) => ({
  // No direct relation to users table - services are standalone
}));

export const contentRelations = relations(content, ({ one }) => ({
  author: one(users, {
    fields: [content.authorId],
    references: [users.id],
  }),
}));

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

export const documents = customerSchema.table(
  "documents",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    fileName: varchar("file_name", { length: 500 }).notNull(),
    fileSize: integer("file_size").notNull(),
    mimeType: varchar("mime_type", { length: 100 }).notNull(),
    storagePath: varchar("storage_path", { length: 500 }).notNull(),
    category: varchar("category", { length: 100 }),
    tags: jsonb("tags").$type<string[]>().default([]).notNull(),
    status: varchar("status", { length: 50 }).notNull().default("active"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("documents_userId_idx").on(table.userId),
    index("documents_category_idx").on(table.category),
    index("documents_status_idx").on(table.status),
  ],
);

export const datasets = customerSchema.table(
  "datasets",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    description: text("description"),
    source: varchar("source", { length: 100 }),
    rowCount: integer("row_count").notNull().default(0),
    columnCount: integer("column_count").notNull().default(0),
    fileSize: integer("file_size").notNull(),
    mimeType: varchar("mime_type", { length: 100 }).notNull(),
    storagePath: varchar("storage_path", { length: 500 }).notNull(),
    schema: jsonb("schema")
      .$type<Record<string, string>>()
      .default({})
      .notNull(),
    previewData: jsonb("preview_data").$type<any[][]>().default([]).notNull(),
    status: varchar("status", { length: 50 }).notNull().default("active"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("datasets_userId_idx").on(table.userId),
    index("datasets_status_idx").on(table.status),
    index("datasets_slug_idx").on(table.slug),
  ],
);

export const reports = customerSchema.table(
  "reports",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    type: varchar("type", { length: 50 }).notNull(),
    config: jsonb("config").$type<Record<string, any>>().default({}).notNull(),
    filters: jsonb("filters")
      .$type<Record<string, any>>()
      .default({})
      .notNull(),
    dateFrom: timestamp("date_from"),
    dateTo: timestamp("date_to"),
    format: varchar("format", { length: 20 }).notNull().default("json"),
    status: varchar("status", { length: 50 }).notNull().default("draft"),
    resultPath: varchar("result_path", { length: 500 }),
    generatedAt: timestamp("generated_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("reports_userId_idx").on(table.userId),
    index("reports_status_idx").on(table.status),
    index("reports_type_idx").on(table.type),
  ],
);

export const wordAssistantDocs = customerSchema.table(
  "word_assistant_docs",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 255 }).notNull(),
    content: text("content").notNull(),
    type: varchar("type", { length: 50 }).notNull().default("document"),
    template: varchar("template", { length: 100 }),
    meta: jsonb("meta").$type<Record<string, any>>().default({}).notNull(),
    status: varchar("status", { length: 50 }).notNull().default("draft"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("word_assistant_docs_userId_idx").on(table.userId),
    index("word_assistant_docs_status_idx").on(table.status),
    index("word_assistant_docs_type_idx").on(table.type),
  ],
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

export const documentsRelations = relations(documents, ({ one }) => ({
  user: one(users, {
    fields: [documents.userId],
    references: [users.id],
  }),
}));

export const datasetsRelations = relations(datasets, ({ one }) => ({
  user: one(users, {
    fields: [datasets.userId],
    references: [users.id],
  }),
}));

export const reportsRelations = relations(reports, ({ one }) => ({
  user: one(users, {
    fields: [reports.userId],
    references: [users.id],
  }),
}));

export const wordAssistantDocsRelations = relations(
  wordAssistantDocs,
  ({ one }) => ({
    user: one(users, {
      fields: [wordAssistantDocs.userId],
      references: [users.id],
    }),
  }),
);

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
