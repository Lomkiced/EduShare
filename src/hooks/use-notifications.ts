"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import { createClient } from "@/lib/supabase/client";
import type { NotificationsResponse } from "@/types";

export function useNotifications(unreadOnly = false) {
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: ["notifications", { unreadOnly }],
    queryFn:  () =>
      apiClient.get<NotificationsResponse>(
        `/api/notifications${unreadOnly ? "?unreadOnly=true" : ""}`
      ),
    refetchInterval: 60_000, // Poll every 60s as fallback
  });

  // REAL-TIME: Subscribe to Supabase Realtime for instant updates
  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel("notifications-realtime")
      .on(
        "postgres_changes",
        {
          event:  "INSERT",
          schema: "public",
          table:  "notifications",
        },
        () => {
          qc.invalidateQueries({ queryKey: ["notifications"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [qc]);

  return query;
}

export function useMarkNotificationsRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (notificationIds?: string[]) =>
      apiClient.patch<{ updatedCount: number }>(
        "/api/notifications/read",
        notificationIds ? { notificationIds } : {}
      ),
    onMutate: async (notificationIds) => {
      await qc.cancelQueries({ queryKey: ["notifications"] })
      const previous = qc.getQueryData(["notifications"])
      
      qc.setQueryData<any>(
        ["notifications", { unreadOnly: false }],
        (old: any) => {
          if (!old) return old
          return {
            ...old,
            unreadCount: 0,
            notifications: old.notifications.map((n: any) => ({
              ...n,
              isRead: notificationIds
                ? notificationIds.includes(n.id) ? true : n.isRead
                : true,
            })),
          }
        }
      )
      return { previous }
    },
    onError: (_, __, ctx) => {
      qc.setQueryData(["notifications"], ctx?.previous)
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] })
    },
  });
}
