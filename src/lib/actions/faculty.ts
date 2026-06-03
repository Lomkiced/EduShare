"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function approveStudent(userId: string, classId: string) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { approvalStatus: "APPROVED" },
    });
    revalidatePath(`/faculty/classes/${classId}/members`);
    return { success: true };
  } catch (error: any) {
    console.error("[approveStudent] Error:", error);
    return { success: false, error: "Failed to approve student." };
  }
}

export async function rejectStudent(userId: string, classId: string) {
  try {
    // If we reject them, we delete the user so they can register again if they made a mistake,
    // or we can set them to REJECTED. Setting to REJECTED blocks the email. Let's set to REJECTED.
    // Also remove their class membership.
    await prisma.$transaction([
      prisma.classMembership.deleteMany({
        where: { studentId: userId, classId: classId },
      }),
      prisma.user.update({
        where: { id: userId },
        data: { approvalStatus: "REJECTED" },
      }),
    ]);
    
    revalidatePath(`/faculty/classes/${classId}/members`);
    return { success: true };
  } catch (error: any) {
    console.error("[rejectStudent] Error:", error);
    return { success: false, error: "Failed to reject student." };
  }
}

export async function removeStudent(userId: string, classId: string) {
  try {
    // 1. Delete the class membership
    await prisma.classMembership.deleteMany({
      where: { studentId: userId, classId: classId },
    });

    // 2. Check if they have any other classes
    const remainingMemberships = await prisma.classMembership.count({
      where: { studentId: userId },
    });

    // 3. If they have no other classes, completely purge the account
    if (remainingMemberships === 0) {
      await prisma.user.delete({
        where: { id: userId },
      });

      // Attempt to delete from Supabase Auth as well
      try {
        const { createAdminClient } = await import("@/lib/supabase/admin");
        const adminClient = createAdminClient();
        await adminClient.auth.admin.deleteUser(userId);
      } catch (authError) {
        console.error("[removeStudent] Failed to delete from Supabase Auth:", authError);
      }
    }

    revalidatePath(`/faculty/classes/${classId}/members`);
    return { success: true };
  } catch (error: any) {
    console.error("[removeStudent] Error:", error);
    return { success: false, error: "Failed to remove student from class." };
  }
}
