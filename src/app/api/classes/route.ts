import { NextResponse } from "next/server";

// GET /api/classes — fetch all classes for the authenticated user
export async function GET() {
  // TODO: Implement — fetch classes from Prisma filtered by user role
  return NextResponse.json({ message: "GET /api/classes — Coming Soon" }, { status: 200 });
}

// POST /api/classes — create a new class (faculty only)
export async function POST() {
  // TODO: Implement — validate with createClassSchema, insert via Prisma
  return NextResponse.json({ message: "POST /api/classes — Coming Soon" }, { status: 201 });
}
