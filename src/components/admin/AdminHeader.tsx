"use client";

import React, { useEffect, useState, useRef } from "react";
import { useSidebarStore } from "@/store/sidebarStore";
import { createClient } from "@/lib/supabase/client";
import useSWR from "swr";
import { useRouter } from "next/navigation";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
}

export default function AdminHeader() {
  const { toggle } = useSidebarStore();
  const router = useRouter();
  const [adminInitials, setAdminInitials] = useState<string>("A");
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);

  const { data, mutate } = useSWR("/api/admin/notifications", fetcher, {
    refreshInterval: 30000,
  });

  const notifications = data?.data || [];
  const unreadCount = notifications.filter((n: any) => !n.isRead).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationClick = async (notification: any) => {
    setIsNotificationsOpen(false);
    if (!notification.isRead) {
      mutate(
        {
          ...data,
          data: notifications.map((n: any) =>
            n.id === notification.id ? { ...n, isRead: true } : n
          ),
        },
        false
      );
      
      await fetch(`/api/admin/notifications/${notification.id}/read`, {
        method: "PATCH",
      });
      mutate();
    }
    
    if (notification.link) {
      router.push(notification.link);
    }
  };

  const handleReadAll = async () => {
    if (unreadCount === 0) return;
    
    mutate(
      {
        ...data,
        data: notifications.map((n: any) => ({ ...n, isRead: true })),
      },
      false
    );

    await fetch(`/api/admin/notifications/read-all`, { method: "PATCH" });
    mutate();
  };

  const handleClearAll = async () => {
    if (unreadCount > 0) return;
    
    mutate(
      {
        ...data,
        data: notifications.filter((n: any) => !n.isRead),
      },
      false
    );

    await fetch(`/api/admin/notifications/clear-all`, { method: "DELETE" });
    mutate();
  };

  useEffect(() => {
    const fetchAdmin = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.user_metadata?.name) {
        setAdminInitials(user.user_metadata.name[0].toUpperCase());
      }
    };
    fetchAdmin();
  }, []);

  return (
    <header className="flex justify-between items-center w-full px-6 h-16 sticky top-0 z-40 bg-surface-container-lowest/90 backdrop-blur-md border-b border-surface-variant shadow-sm font-sans text-primary">
      <div className="flex items-center gap-4">
        <button
          onClick={toggle}
          className="md:hidden flex items-center justify-center p-2 rounded-md hover:bg-surface-container-low transition-colors"
        >
          <span
            className="material-symbols-outlined text-2xl"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            menu
          </span>
        </button>
      </div>



      {/* Right Side */}
      <div className="flex items-center gap-3">
        <div className="relative" ref={notificationsRef}>
          <button 
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative w-10 h-10 rounded-full hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors group"
          >
            <span
              className="material-symbols-outlined group-hover:text-primary transition-colors"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              notifications
            </span>
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-error rounded-full border-2 border-surface-container-lowest"></span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-surface-container-lowest border border-surface-variant rounded-xl shadow-lg overflow-hidden z-50">
              <div className="p-4 border-b border-surface-variant flex justify-between items-center">
                <h3 className="font-semibold text-on-surface">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="text-xs bg-primary-container text-on-primary-container px-2 py-0.5 rounded-full font-medium">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-sm text-on-surface-variant">
                    No notifications yet.
                  </div>
                ) : (
                  <div className="divide-y divide-surface-variant/50">
                    {notifications.map((notif: any) => (
                      <button
                        key={notif.id}
                        onClick={() => handleNotificationClick(notif)}
                        className={`w-full text-left p-4 hover:bg-surface-container-low transition-colors flex gap-3 ${
                          !notif.isRead ? "bg-primary/5" : ""
                        }`}
                      >
                        <div className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${!notif.isRead ? "bg-primary" : "bg-transparent"}`} />
                        <div>
                          <p className={`text-sm ${!notif.isRead ? "font-medium text-on-surface" : "text-on-surface-variant"}`}>
                            {notif.message}
                          </p>
                          <p className="text-xs text-outline mt-1">
                            {formatTimeAgo(notif.createdAt)}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {notifications.length > 0 && (
                <div className="p-3 border-t border-surface-variant bg-surface-container flex items-center justify-between">
                  <button
                    onClick={handleReadAll}
                    className={`text-xs font-medium flex items-center gap-1 transition-colors ${
                      unreadCount === 0 
                        ? "text-on-surface-variant opacity-50 cursor-default" 
                        : "text-on-surface-variant hover:text-primary"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">done_all</span>
                    Mark all as read
                  </button>
                  <button
                    onClick={handleClearAll}
                    disabled={unreadCount > 0}
                    className={`text-xs font-medium flex items-center gap-1 transition-colors ${
                      unreadCount > 0 
                        ? "text-on-surface-variant opacity-50 cursor-not-allowed" 
                        : "text-error hover:bg-error-container/20 px-2 py-1 -mr-2 rounded-md"
                    }`}
                    title={unreadCount > 0 ? "You must read all notifications before clearing." : "Clear all notifications"}
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                    Clear all
                  </button>
                </div>
              )}
            </div>
          )}
        </div>


        {/* Admin Avatar */}
        <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container font-bold flex items-center justify-center ml-2 border border-surface-variant cursor-pointer hover:ring-2 hover:ring-secondary hover:ring-offset-2 hover:ring-offset-surface-container-lowest transition-all">
          {adminInitials}
        </div>
      </div>
    </header>
  );
}
