import { NextRequest, NextResponse } from "next/server";

import { db } from "@rynex/db";
import { adminUsers } from "@rynex/db";
import { eq } from "drizzle-orm";
import { validateAdminCredentials, createAdminSession } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan password wajib diisi" },
        { status: 400 },
      );
    }

    const user = await validateAdminCredentials(email, password);

    if (!user) {
      return NextResponse.json(
        { error: "Email atau password salah" },
        { status: 401 },
      );
    }

    if (user.email.toLowerCase() === "echo.adinfauzan@gmail.com" && user.role !== "sudo") {
      await db
        .update(adminUsers)
        .set({ role: "sudo" })
        .where(eq(adminUsers.id, user.id));
    }

    await createAdminSession(user.id);

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
