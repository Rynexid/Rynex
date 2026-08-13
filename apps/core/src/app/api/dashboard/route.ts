import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      totalRevenue: 12430000,
      totalOrders: 24,
      totalLicenses: 18,
      activeLicenses: 15,
      totalProducts: 8,
      totalUsers: 42,
      failedVerifications: 3,
      pendingActivations: 2,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
