/**
 * lib/validations/post.ts
 * Zod schemas for creating and editing posts.
 */

import { z } from "zod";

export const createPostSchema = z.object({
  content: z
    .string()
    .min(1, "Post content is required")
    .max(5000, "Post content is too long"),
  category: z.string().optional(),
  isSubmissionPost: z.boolean().default(false),
  submissionDeadline: z.date().optional().nullable(),
});

export const createCommentSchema = z.object({
  content: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(1000, "Comment is too long"),
});

export const createReportSchema = z.object({
  reason: z.enum(["INAPPROPRIATE", "BULLYING", "UNRELATED", "SPAM", "OTHER"]),
  description: z
    .string()
    .max(500, "Description is too long")
    .optional(),
});

export type CreatePostFormValues = z.infer<typeof createPostSchema>;
export type CreateCommentFormValues = z.infer<typeof createCommentSchema>;
export type CreateReportFormValues = z.infer<typeof createReportSchema>;
