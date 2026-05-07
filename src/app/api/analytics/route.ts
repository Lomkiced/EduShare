import { NextResponse } from "next/server";

// GET /api/analytics — fetch platform analytics summary (admin only)
export async function GET() {
  return NextResponse.json({ message: "GET /api/analytics — Coming Soon" }, { status: 200 });
}
