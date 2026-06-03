"use client";

import React, { useEffect, useState } from "react";
import { useStudentSidebarStore } from "@/store/sidebarStore";
import { createClient } from "@/lib/supabase/client";

export default function StudentHeader() {
  const { toggle } = useStudentSidebarStore();
  const [initials, setInitials] = useState<string>("S");

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.user_metadata?.name) {
        setInitials(user.user_metadata.name[0].toUpperCase());
      }
    };
    fetchUser();
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

      {/* Center — Search Bar */}
      <div className="flex-1 max-w-md mx-6 hidden sm:block relative group">
        <span
          className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-secondary transition-colors"
          style={{ fontVariationSettings: "'FILL' 0" }}
        >
          search
        </span>
        <input
          type="text"
          placeholder="Search classes, resources, or settings..."
          className="w-full pl-10 pr-12 py-2 bg-surface-container-lowest border border-surface-variant rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-sm transition-all text-on-surface shadow-sm"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
          <kbd className="hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 border border-surface-variant rounded text-[10px] font-medium text-outline bg-surface-container-low">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        <button className="relative w-10 h-10 rounded-full hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors group">
          <span
            className="material-symbols-outlined group-hover:text-primary transition-colors"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            notifications
          </span>
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-error rounded-full border-2 border-surface-container-lowest"></span>
        </button>
        <button className="w-10 h-10 rounded-full hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors group">
          <span
            className="material-symbols-outlined group-hover:rotate-45 transition-transform duration-300"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            settings
          </span>
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container font-bold flex items-center justify-center ml-2 border border-surface-variant cursor-pointer hover:ring-2 hover:ring-secondary hover:ring-offset-2 hover:ring-offset-surface-container-lowest transition-all">
          {initials}
        </div>
      </div>
    </header>
  );
}
