/**
 * app/api/assessments/[assessmentId]/attempts/route.ts
 *
 * GET  — Student: Get attempt history for this assessment
 * POST — Student: Start a new attempt (validates lesson completion, attempt limits)
 */

import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth-session";
import { successResponse, errorResponse, ERRORS } from "@/lib/api-response";
import type { AttemptQuestion, AttemptSession } from "@/types";

export const dynamic = "force-dynamic";

// ─── GET /api/assessments/[assessmentId]/attempts ─────────────────────────────

export async function GET(
  _request: NextRequest,
  { params }: { params: { assessmentId: string } }
) {
  try {
    const session = await getAuthSession();
    if (!session) return errorResponse(ERRORS.UNAUTHORIZED.message, ERRORS.UNAUTHORIZED.status);

    const { profile } = session;
    if (profile.role !== "STUDENT") {
      return errorResponse(ERRORS.FORBIDDEN.message, ERRORS.FORBIDDEN.status);
    }

    const attempts = await prisma.assessmentAttempt.findMany({
      where: {
        assessmentId: params.assessmentId,
        studentId: profile.id,
      },
      orderBy: { attemptNumber: "asc" },
    });

    return successResponse(attempts);
  } catch (error) {
    console.error("[GET /api/assessments/[assessmentId]/attempts]", error);
    return errorResponse(ERRORS.INTERNAL.message, ERRORS.INTERNAL.status);
  }
}

// ─── POST /api/assessments/[assessmentId]/attempts ────────────────────────────

export async function POST(
  _request: NextRequest,
  { params }: { params: { assessmentId: string } }
) {
  try {
    const session = await getAuthSession();
    if (!session) return errorResponse(ERRORS.UNAUTHORIZED.message, ERRORS.UNAUTHORIZED.status);

    const { profile } = session;
    if (profile.role !== "STUDENT") {
      return errorResponse(ERRORS.FORBIDDEN.message, ERRORS.FORBIDDEN.status);
    }

    const { assessmentId } = params;

    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId },
      include: { lesson: { select: { id: true, classId: true, title: true, videoDuration: true } } },
    });
    if (!assessment) return errorResponse(ERRORS.NOT_FOUND.message, ERRORS.NOT_FOUND.status);

    // Verify enrollment
    const membership = await prisma.classMembership.findUnique({
      where: { classId_studentId: { classId: assessment.lesson.classId, studentId: profile.id } },
    });
    if (!membership) return errorResponse(ERRORS.FORBIDDEN.message, ERRORS.FORBIDDEN.status);

    // Must have completed the video lesson
    const progress = await prisma.lessonProgress.findUnique({
      where: {
        lessonId_studentId: {
          lessonId: assessment.lesson.id,
          studentId: profile.id,
        },
      },
    });
    if (!progress?.isCompleted) {
      return errorResponse(
        "You must finish watching the video lesson before taking the assessment.",
        403
      );
    }

    // Check attempt limit
    const attemptCount = await prisma.assessmentAttempt.count({
      where: { assessmentId, studentId: profile.id },
    });
    if (assessment.maxAttempts > 0 && attemptCount >= assessment.maxAttempts) {
      return errorResponse(
        `You have used all ${assessment.maxAttempts} attempt${assessment.maxAttempts === 1 ? "" : "s"}.`,
        403
      );
    }

    // Check no IN_PROGRESS attempt exists
    const inProgress = await prisma.assessmentAttempt.findFirst({
      where: { assessmentId, studentId: profile.id, status: "IN_PROGRESS" },
    });
    if (inProgress) {
      return errorResponse("You already have an attempt in progress.", ERRORS.CONFLICT.status);
    }

    // Fetch questions
    let questions = await prisma.question.findMany({
      where: { assessmentId },
      include: {
        choices:    { orderBy: { order: "asc" } },
        matchPairs: { orderBy: { order: "asc" } },
      },
      orderBy: { order: "asc" },
    });

    if (assessment.shuffleQuestions) {
      questions = questions.sort(() => Math.random() - 0.5);
    }

    // Create the attempt record
    const attempt = await prisma.assessmentAttempt.create({
      data: {
        assessmentId,
        studentId:     profile.id,
        attemptNumber: attemptCount + 1,
        status:        "IN_PROGRESS",
        timeLimitEnd:  assessment.timeLimitMins
          ? new Date(Date.now() + assessment.timeLimitMins * 60 * 1000)
          : null,
      },
    });

    // Build AttemptSession — strip isCorrect, shuffle MATCHING right items
    const attemptQuestions: AttemptQuestion[] = questions.map((q) => ({
      id:           q.id,
      type:         q.type,
      order:        q.order,
      questionText: q.questionText,
      points:       q.points,
      imageUrl:     q.imageUrl,
      choices:      q.choices.map(({ isCorrect: _stripped, ...c }) => c),
      matchPairs:   q.type === "MATCHING"
        ? q.matchPairs.map(({ rightItem: _stripped, ...p }) => p)
        : undefined,
      shuffledRightItems: q.type === "MATCHING"
        ? q.matchPairs.map((p) => p.rightItem).sort(() => Math.random() - 0.5)
        : undefined,
      currentAnswer: null,
    }));

    const session_data: AttemptSession = {
      attempt: attempt as any,
      assessment: assessment as any,
      questions: attemptQuestions,
      timeRemaining: assessment.timeLimitMins
        ? assessment.timeLimitMins * 60
        : null,
    };

    return successResponse(session_data, "Attempt started.", 201);
  } catch (error) {
    console.error("[POST /api/assessments/[assessmentId]/attempts]", error);
    return errorResponse(ERRORS.INTERNAL.message, ERRORS.INTERNAL.status);
  }
}
