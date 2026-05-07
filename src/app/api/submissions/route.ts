import { NextResponse } from "next/server";

// GET /api/submissions — fetch submissions
export async function GET() {
  return NextResponse.json({ message: "GET /api/submissions — Coming Soon" }, { status: 200 });
}

// POST /api/submissions — submit a file for an assignment post
export async function POST() {
  return NextResponse.json({ message: "POST /api/submissions — Coming Soon" }, { status: 201 });
}
