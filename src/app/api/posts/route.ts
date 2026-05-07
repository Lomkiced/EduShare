import { NextResponse } from "next/server";

// GET /api/posts — fetch posts for a class
export async function GET() {
  return NextResponse.json({ message: "GET /api/posts — Coming Soon" }, { status: 200 });
}

// POST /api/posts — create a new post in a class
export async function POST() {
  return NextResponse.json({ message: "POST /api/posts — Coming Soon" }, { status: 201 });
}
