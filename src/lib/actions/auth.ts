"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import {
  LoginFormValues,
  RegisterFormValues,
  ForgotPasswordFormValues,
} from "@/lib/validations/auth";

// ─────────────────────────────────────────────────────────────────────────────
// LOGIN
// ─────────────────────────────────────────────────────────────────────────────
export async function loginAction(data: LoginFormValues) {
  try {
    const supabase = createClient();
    const { email, password } = data;

    // 1. Authenticate with Supabase Auth
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false as const, error: error.message };
    }

    if (!authData.user) {
      return { success: false as const, error: "Authentication failed." };
    }

    // 2. Fetch the authoritative role from Prisma (cannot be spoofed by client)
    const dbUser = await prisma.user.findUnique({
      where: { id: authData.user.id },
      select: { role: true, name: true, isActive: true },
    });

    if (!dbUser) {
      // Sign them back out — no profile means no access
      await supabase.auth.signOut();
      return {
        success: false as const,
        error:
          "No profile found for this account. Please contact your administrator.",
      };
    }

    if (!dbUser.isActive) {
      await supabase.auth.signOut();
      return {
        success: false as const,
        error: "Your account has been deactivated. Please contact an administrator.",
      };
    }

    // 3. Write the role into Supabase user_metadata
    await supabase.auth.updateUser({
      data: { role: dbUser.role, name: dbUser.name },
    });

    return { success: true as const, role: dbUser.role };
  } catch (err: any) {
    console.error("[loginAction] Unexpected error:", err);
    // If it's a Prisma connection error or similar, expose a generic but helpful message
    if (err?.message?.includes("Invalid `prisma.user.findUnique()` invocation") || err?.name === 'PrismaClientInitializationError') {
      return { success: false as const, error: "Database connection failed. Please check your Vercel Environment Variables (DATABASE_URL)." };
    }
    return { success: false as const, error: err.message || "An internal server error occurred." };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// REGISTER
// ─────────────────────────────────────────────────────────────────────────────
export async function registerAction(data: RegisterFormValues) {
  const supabase = createClient();
  const { name, email, department, role, password } = data;

  // 1. Check if email already exists in Prisma
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return {
      success: false as const,
      error: "An account with this email already exists.",
    };
  }

  // 2. Create in Supabase Auth with role metadata pre-set
  const { data: authData, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role,
        name,
      },
    },
  });

  if (error) {
    return { success: false as const, error: error.message };
  }

  if (!authData.user) {
    return { success: false as const, error: "Failed to create account." };
  }

  // 3. Create the Prisma user profile synced to the real Supabase Auth UUID
  try {
    await prisma.user.create({
      data: {
        id: authData.user.id,
        name,
        email,
        department: department || null,
        role: role as Role,
        isActive: true,
      },
    });

    return { success: true as const };
  } catch (dbError: any) {
    console.error("[registerAction] DB Error:", dbError);

    // Rollback: delete the auth user we just created so we don't have orphans
    try {
      const adminClient = createAdminClient();
      await adminClient.auth.admin.deleteUser(authData.user.id);
    } catch (rollbackError) {
      console.error("[registerAction] Rollback failed:", rollbackError);
    }

    return {
      success: false as const,
      error: "Failed to create user profile. Please try again.",
    };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// FORGOT PASSWORD
// ─────────────────────────────────────────────────────────────────────────────
export async function forgotPasswordAction(data: ForgotPasswordFormValues) {
  const supabase = createClient();
  const { email } = data;

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/update-password`,
  });

  if (error) {
    return { success: false as const, error: error.message };
  }

  return { success: true as const };
}

// ─────────────────────────────────────────────────────────────────────────────
// LOGOUT
// ─────────────────────────────────────────────────────────────────────────────
export async function logoutAction() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { success: false as const, error: error.message };
  }

  return { success: true as const };
}
