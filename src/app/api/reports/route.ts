import { NextResponse } from "next/server";

// GET /api/reports — fetch all reports (admin only)
export async function GET() {
  return NextResponse.json({ message: "GET /api/reports — Coming Soon" }, { status: 200 });
}

// POST /api/reports — file a new content report
export async function POST() {
  return NextResponse.json({ message: "POST /api/reports — Coming Soon" }, { status: 201 });
}
