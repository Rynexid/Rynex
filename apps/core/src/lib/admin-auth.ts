import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { db } from "@rynex/db";
import { adminSessions, adminUsers } from "@rynex/db";
import { eq, and, lt } from "drizzle-orm";
import bcrypt from "bcryptjs";

const SESSION_COOKIE_NAME = "admin.session_token";
const SESSION_DURATION_DAYS = 7;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hashed: string,
): Promise<boolean> {
  return bcrypt.compare(password, hashed);
}

export async function createAdminUser(data: {
  email: string;
  password: string;
  name: string;
  role?: string;
}) {
  const hashedPassword = await hashPassword(data.password);
  const id = randomUUID();

  const [user] = await db
    .insert(adminUsers)
    .values({
      id,
      email: data.email.toLowerCase(),
      password: hashedPassword,
      name: data.name,
      role: data.role || "staff",
    })
    .returning();

  return user;
}

export async function validateAdminCredentials(
  email: string,
  password: string,
) {
  const [user] = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.email, email.toLowerCase()))
    .limit(1);

  if (!user) return null;

  const valid = await verifyPassword(password, user.password);
  if (!valid) return null;

  return user;
}

export async function createAdminSession(userId: string) {
  const token = randomUUID();
  const expiresAt = new Date(
    Date.now() + SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000,
  );

  await db.insert(adminSessions).values({
    id: token,
    userId,
    expiresAt,
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });

  return token;
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) return null;

  const [session] = await db
    .select()
    .from(adminSessions)
    .where(
      and(
        eq(adminSessions.id, token),
        lt(adminSessions.expiresAt, new Date()),
      ),
    )
    .limit(1);

  if (!session) {
    (await cookies()).delete(SESSION_COOKIE_NAME);
    return null;
  }

  const [user] = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.id, session.userId))
    .limit(1);

  if (!user) {
    await db.delete(adminSessions).where(eq(adminSessions.id, token));
    (await cookies()).delete(SESSION_COOKIE_NAME);
    return null;
  }

  return user;
}

export async function deleteAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (token) {
    await db.delete(adminSessions).where(eq(adminSessions.id, token));
    (await cookies()).delete(SESSION_COOKIE_NAME);
  }
}
