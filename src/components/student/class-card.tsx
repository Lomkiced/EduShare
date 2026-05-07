/**
 * components/student/class-card.tsx
 * Card component for displaying a class in the student's class list.
 * TODO: Implement with class name, subject, member count, and join link.
 */

"use client";

import type { Class } from "@/types";

interface ClassCardProps {
  classData: Class;
}

export function ClassCard({ classData }: ClassCardProps) {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-semibold">{classData.name}</h3>
      <p className="text-sm text-muted-foreground">{classData.subject}</p>
      <p className="text-xs text-muted-foreground mt-2">ClassCard — Coming Soon</p>
    </div>
  );
}
