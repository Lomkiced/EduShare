"use client";

import React from "react";
import { useFacultySidebarStore } from "@/store/sidebarStore";
import { useAuthStore } from "@/store/auth.store";
import { useNotifications, useMarkNotificationsRead } from "@/hooks/use-notifications";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function FacultyHeader() {
  const { toggle } = useFacultySidebarStore();
  const { user } = useAuthStore();
  const { data: notificationsData } = useNotifications();
  const markAsRead = useMarkNotificationsRead();
  const unreadCount = notificationsData?.unreadCount ?? 0;

  const initials = user?.name
    ? user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase()
    : "F";

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
        <Link 
          href="/faculty/notifications"
          onClick={() => { if (unreadCount > 0) markAsRead.mutate(undefined); }}
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
        </Link>

        {/* Avatar */}
        <Link href="/faculty/profile" className="ml-2">
          <Avatar className="w-8 h-8 cursor-pointer border border-surface-variant hover:ring-2 hover:ring-secondary hover:ring-offset-2 hover:ring-offset-surface-container-lowest transition-all">
            <AvatarImage src={user?.avatarUrl || ""} alt={user?.name || "Faculty"} className="object-cover" />
            <AvatarFallback className="bg-secondary-container text-on-secondary-container font-bold text-xs">{initials}</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
}
