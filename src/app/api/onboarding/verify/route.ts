import { NextRequest, NextResponse } from "next/server";

import { db } from "@rynex/db";
import { adminUsers, adminSessions } from "@rynex/db";
import { eq, and, sql } from "drizzle-orm";
import { validateLicense } from "@/lib/license";

const MAX_ATTEMPTS = 3;
const WHATSAPP_NUMBER = "628950888317";

async function getAdminUserFromRequest(request: NextRequest) {
  const sessionToken = request.cookies.get("admin.session_token")?.value;
  if (!sessionToken) return null;

  const [session] = await db
    .select()
    .from(adminSessions)
    .where(
      and(
        eq(adminSessions.id, sessionToken),
        sql`${adminSessions.expiresAt} > now()`,
      ),
    )
    .limit(1);

  if (!session) {
    return null;
  }

  const [user] = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.id, session.userId))
    .limit(1);

  return user;
}

async function sendWhatsAppNotification(
  licenseKey: string,
  plan: string,
  email: string,
) {
  const text = encodeURIComponent(
    `Halo, lisensi admin RYNEX telah diverifikasi.\nLicense: ${licenseKey}\nPlan: ${plan}\nEmail: ${email}`,
  );

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

  try {
    await fetch(url, { method: "GET", redirect: "manual" });
  } catch {
    console.error("Failed to send WhatsApp notification:", url);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAdminUserFromRequest(request);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { licenseKey } = body;

    if (!licenseKey) {
      return NextResponse.json(
        { error: "Missing license key" },
        { status: 400 },
      );
    }

    const currentAttempts = user.licenseAttempts || 0;
    if (currentAttempts >= MAX_ATTEMPTS) {
      await db
        .update(adminUsers)
        .set({ licenseAttempts: currentAttempts + 1 })
        .where(eq(adminUsers.id, user.id));

      return NextResponse.json(
        { error: "MAX_ATTEMPTS_REACHED", attemptsLeft: 0 },
        { status: 403 },
      );
    }

    const validation = await validateLicense(licenseKey);

    if (!validation.valid) {
      const newAttempts = currentAttempts + 1;
      await db
        .update(adminUsers)
        .set({ licenseAttempts: newAttempts })
        .where(eq(adminUsers.id, user.id));

      const attemptsLeft = Math.max(0, MAX_ATTEMPTS - newAttempts);

      if (newAttempts >= MAX_ATTEMPTS) {
        return NextResponse.json(
          { error: "MAX_ATTEMPTS_REACHED", attemptsLeft: 0 },
          { status: 403 },
        );
      }

      return NextResponse.json(
        {
          error: validation.error || "Invalid license",
          attemptsLeft,
        },
        { status: 400 },
      );
    }

    await db
      .update(adminUsers)
      .set({ licenseVerified: true, licenseAttempts: 0 })
      .where(eq(adminUsers.id, user.id));

    try {
      await sendWhatsAppNotification(
        licenseKey,
        validation.plan || "admin",
        user.email,
      );
    } catch {
      console.error("WhatsApp notification failed");
    }

    return NextResponse.json({
      success: true,
      plan: validation.plan,
      email: user.email,
    });
  } catch (error) {
    console.error("Onboarding verify error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
