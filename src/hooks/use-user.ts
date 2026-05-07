/**
 * hooks/use-user.ts
 *
 * Returns the currently authenticated user from the Zustand auth store.
 * Also provides a helper to check role-based access.
 */

"use client";

import { useAuthStore } from "@/store/auth.store";
import type { Role } from "@/types";

export function useUser() {
  const { user, isLoading } = useAuthStore();

  const hasRole = (...roles: Role[]) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  const isStudent = user?.role === "STUDENT";
  const isFaculty = user?.role === "FACULTY";
  const isAdmin = user?.role === "ADMIN";

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    hasRole,
    isStudent,
    isFaculty,
    isAdmin,
  };
}
