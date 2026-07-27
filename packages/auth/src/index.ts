import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";

import { db } from "@rynex/db";
import {
  ac,
  customer,
  staff,
  admin as adminRole,
  superAdmin,
} from "./permissions";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: "auth.users",
      session: "auth.sessions",
      account: "auth.accounts",
      verification: "auth.verifications",
    },
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
    ...(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
      ? {
          google: {
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
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
