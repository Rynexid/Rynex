import { cookies } from "next/headers";
import { db } from "@rynex/db";
import { licenses } from "@rynex/db";
import { eq, and, sql } from "drizzle-orm";

export async function validateLicense(key: string) {
  const [license] = await db
    .select()
    .from(licenses)
    .where(eq(licenses.licenseKey, key))
    .limit(1);

  if (!license) {
    return { valid: false, error: "License not found" };
  }

  if (license.status === "revoked") {
    return { valid: false, error: "License has been revoked" };
  }

  if (license.status === "suspended") {
    return { valid: false, error: "License is suspended" };
  }

  if (license.expiresAt && new Date(license.expiresAt) < new Date()) {
    return { valid: false, error: "License has expired" };
  }

  return {
    valid: true,
    key: license.licenseKey,
    plan: license.plan,
  };
}
