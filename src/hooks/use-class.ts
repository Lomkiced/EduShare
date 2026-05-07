/**
 * hooks/use-class.ts
 *
 * TanStack Query hooks for fetching class data.
 */

"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Class } from "@/types";

// ─── Query Keys ───────────────────────────────────────────────────────────────

export const classKeys = {
  all: ["classes"] as const,
  list: () => [...classKeys.all, "list"] as const,
  detail: (id: string) => [...classKeys.all, "detail", id] as const,
  members: (id: string) => [...classKeys.all, "members", id] as const,
  posts: (id: string) => [...classKeys.all, "posts", id] as const,
};

// ─── Fetch Helpers ────────────────────────────────────────────────────────────

async function fetchClasses(): Promise<Class[]> {
  const res = await fetch("/api/classes");
  if (!res.ok) throw new Error("Failed to fetch classes");
  return res.json();
}

async function fetchClass(classId: string): Promise<Class> {
  const res = await fetch(`/api/classes/${classId}`);
  if (!res.ok) throw new Error("Failed to fetch class");
  return res.json();
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

export function useClasses() {
  return useQuery({
    queryKey: classKeys.list(),
    queryFn: fetchClasses,
  });
}

export function useClass(classId: string) {
  return useQuery({
    queryKey: classKeys.detail(classId),
    queryFn: () => fetchClass(classId),
    enabled: !!classId,
  });
}
