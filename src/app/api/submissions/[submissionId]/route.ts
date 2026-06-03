/**
 * app/api/submissions/[submissionId]/route.ts
 *
 * PATCH /api/submissions/[submissionId]
 * — Faculty only: Mark a student submission as REVIEWED
 */

import { NextRequest } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth-session";
import { successResponse, errorResponse, ERRORS } from "@/lib/api-response";
import { createNotification } from "@/lib/notifications";

export const dynamic = "force-dynamic";

const reviewSubmissionSchema = z.object({
  status:   z.enum(["REVIEWED"]),
  feedback: z.string().max(1000).optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { submissionId: string } }
) {
  try {
    const session = await getAuthSession();
    if (!session) return errorResponse(ERRORS.UNAUTHORIZED.message, ERRORS.UNAUTHORIZED.status);

    const { profile } = session;
    const { submissionId } = params;

    if (profile.role !== "FACULTY") {
      return errorResponse(ERRORS.FORBIDDEN.message, ERRORS.FORBIDDEN.status);
    }

    const submission = await prisma.submission.findUnique({
      where: { id: submissionId },
      include: {
        post: {
          include: {
            class: { select: { facultyId: true, name: true } },
          },
        },
      },
    });

    if (!submission) return errorResponse(ERRORS.NOT_FOUND.message, ERRORS.NOT_FOUND.status);

    // Verify faculty owns the class this submission belongs to
    if (submission.post.class.facultyId !== profile.id) {
      return errorResponse(ERRORS.FORBIDDEN.message, ERRORS.FORBIDDEN.status);
    }

    const body = await request.json();
    const parsed = reviewSubmissionSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(parsed.error.errors[0].message, ERRORS.VALIDATION.status);
    }

    const updated = await prisma.submission.update({
      where: { id: submissionId },
      data: { status: "REVIEWED" },
      include: {
        student: { select: { id: true, name: true, email: true, avatarUrl: true } },
      },
    });

    // Notify the student
    try {
      const preview =
        submission.post.content.length > 50
          ? submission.post.content.slice(0, 50) + "..."
          : submission.post.content;

      await createNotification({
        userId:      submission.studentId,
        type:        "SUBMISSION_REVIEWED",
        message:     `Your submission for "${preview}" has been reviewed.`,
        referenceId: submission.postId,
      });
    } catch (notifError) {
      console.warn("[PATCH /api/submissions/[submissionId]] Notification failed:", notifError);
    }

    return successResponse(updated, "Submission marked as reviewed.");
  } catch (error) {
    console.error("[PATCH /api/submissions/[submissionId]]", error);
    return errorResponse(ERRORS.INTERNAL.message, ERRORS.INTERNAL.status);
  }
}
