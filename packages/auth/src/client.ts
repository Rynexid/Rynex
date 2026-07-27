import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

import {
  ac,
  customer,
  staff,
  admin as adminRole,
  superAdmin,
} from "./permissions";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  plugins: [
    adminClient({
      ac,
      roles: {
        customer,
        staff,
        admin: adminRole,
        superAdmin,
      },
    }),
  ],
});
