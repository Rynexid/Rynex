import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().optional(),
    APP_URL: z.string().url().optional(),
    LICENSE_HMAC_KEY: z.string().optional(),
    ABLY_API_KEY: z.string().optional(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    APP_URL: process.env.APP_URL,
    LICENSE_HMAC_KEY: process.env.LICENSE_HMAC_KEY,
    ABLY_API_KEY: process.env.ABLY_API_KEY,
  },
});
