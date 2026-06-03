/**
 * app/api/admin/users/[userId]/route.ts
 *
 * PATCH /api/admin/users/[userId] — Admin only: Toggle user active status
 * Deactivate: sets isActive=false + Supabase ban (87600h)
 * Activate:   sets isActive=true  + removes Supabase ban
 */

import { NextRequest } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAuthSession } from "@/lib/auth-session";
import { successResponse, errorResponse, ERRORS } from "@/lib/api-response";

export const dynamic = "force-dynamic";

const toggleStatusSchema = z.object({
  isActive: z.boolean(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getAuthSession();
    if (!session) return errorResponse(ERRORS.UNAUTHORIZED.message, ERRORS.UNAUTHORIZED.status);
    if (session.profile.role !== "ADMIN") return errorResponse(ERRORS.FORBIDDEN.message, ERRORS.FORBIDDEN.status);

    const { userId } = params;

    // Prevent self-deactivation
    if (userId === session.profile.id) {
      return errorResponse("You cannot deactivate your own account.", 400);
    }

    const body = await request.json();
    const parsed = toggleStatusSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(parsed.error.errors[0].message, ERRORS.VALIDATION.status);
    }

    const { isActive } = parsed.data;

    // Update Prisma profile
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data:  { isActive },
      select: {
        id:         true,
        name:       true,
        email:      true,
        role:       true,
        department: true,
        isActive:   true,
        avatarUrl:  true,
        createdAt:  true,
      },
    });

    // Sync with Supabase Auth
    const adminClient = createAdminClient();
    if (isActive) {
      // Restore access — remove ban
      await adminClient.auth.admin.updateUserById(userId, {
        ban_duration: "none",
      });
    } else {
      // Ban user effectively permanently (~10 years)
      await adminClient.auth.admin.updateUserById(userId, {
        ban_duration: "87600h",
      });
    }

    return successResponse(
      updatedUser,
      isActive ? "User activated." : "User deactivated."
    );
  } catch (error) {
    console.error("[PATCH /api/admin/users/[userId]]", error);
    return errorResponse(ERRORS.INTERNAL.message, ERRORS.INTERNAL.status);
  }
}
