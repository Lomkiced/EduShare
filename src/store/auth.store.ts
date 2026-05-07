/**
 * store/auth.store.ts
 *
 * Zustand store for authenticated user state.
 * Populated on app load from Supabase session.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "@/types";

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  // Actions
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      setUser: (user) => set({ user, isLoading: false }),
      setLoading: (isLoading) => set({ isLoading }),
      clearUser: () => set({ user: null, isLoading: false }),
    }),
    {
      name: "edushare-auth",
      // Only persist non-sensitive fields
      partialize: (state) => ({ user: state.user }),
    }
  )
);
