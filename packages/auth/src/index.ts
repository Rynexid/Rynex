import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";

import { db, schema } from "@rynex/db";
import {
  ac,
  customer,
  staff,
  admin as adminRole,
  superAdmin,
} from "./permissions";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: process.env.BETTER_AUTH_URL ? [process.env.BETTER_AUTH_URL] : undefined,
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    ...(process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET
      ? {
          github: {
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
          },
        }
      : {}),

  },
  plugins: [
    admin({
      ac,
      roles: {
        customer,
        staff,
        admin: adminRole,
        superAdmin,
      },
      defaultRole: "customer",
      adminRoles: ["admin", "superAdmin"],
    }),
  ],
});
