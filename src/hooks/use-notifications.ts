/**
 * hooks/use-notifications.ts
 *
 * Manages real-time notifications via Supabase Realtime.
 * Subscribes to the notifications table filtered by the current user's id.
 */

"use client";

import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@/hooks/use-user";
import type { Notification } from "@/types";

export function useNotifications() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user) return;

    const supabase = createClient();

    // Subscribe to new notifications for this user
    const channel = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `userId=eq.${user.id}`,
        },
        (payload) => {
          // Invalidate notifications query to trigger a refetch
          queryClient.invalidateQueries({ queryKey: ["notifications", user.id] });

          // Update unread count optimistically
          setUnreadCount((prev) => prev + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, queryClient]);

  return { unreadCount, setUnreadCount };
}
