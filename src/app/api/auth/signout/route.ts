import { NextResponse } from "next/server";

// POST /api/auth/signout — sign out the current user
export async function POST() {
  return NextResponse.json({ message: "POST /api/auth/signout — Coming Soon" }, { status: 200 });
}
