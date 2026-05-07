/**
 * lib/validations/class.ts
 * Zod schemas for class creation and management.
 */

import { z } from "zod";

export const createClassSchema = z.object({
  name: z
    .string()
    .min(1, "Class name is required")
    .max(100, "Class name is too long"),
  subject: z
    .string()
    .min(1, "Subject is required")
    .max(100, "Subject is too long"),
  description: z.string().max(500, "Description is too long").optional(),
});

export const joinClassSchema = z.object({
  classCode: z
    .string()
    .min(6, "Class code must be 6 characters")
    .max(6, "Class code must be 6 characters")
    .toUpperCase(),
});

export const updateClassSchema = createClassSchema.partial();

export type CreateClassFormValues = z.infer<typeof createClassSchema>;
export type JoinClassFormValues = z.infer<typeof joinClassSchema>;
export type UpdateClassFormValues = z.infer<typeof updateClassSchema>;
