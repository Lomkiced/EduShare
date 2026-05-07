"use client";

import React, { useEffect, useState } from "react";
import { useSidebarStore } from "@/store/sidebarStore";
import { createClient } from "@/lib/supabase/client";

export default function AdminHeader() {
  const { toggle } = useSidebarStore();
  const [adminInitials, setAdminInitials] = useState<string>("A");

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
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggle}
          className="md:hidden flex items-center justify-center p-2 rounded-md hover:bg-surface-container-low"
        >
          <span
            className="material-symbols-outlined text-2xl"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            menu
          </span>
        </button>
        <h2 className="text-xl font-bold text-primary hidden sm:block">
          EduShare Admin
        </h2>
      </div>

      {/* Center — Search Bar */}
      <div className="flex-1 max-w-md mx-6 hidden sm:block relative">
        <span
          className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline"
          style={{ fontVariationSettings: "'FILL' 0" }}
        >
          search
        </span>
        <input
          type="text"
          placeholder="Search users, resources, or settings..."
          className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-surface-variant rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-sm transition-all text-on-surface"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        <button className="w-10 h-10 rounded-full hover:bg-surface-container-low flex items-center justify-center text-on-surface-variant transition-colors">
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            notifications
          </span>
        </button>
        <button className="w-10 h-10 rounded-full hover:bg-surface-container-low flex items-center justify-center text-on-surface-variant transition-colors">
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            settings
          </span>
        </button>
        <button className="w-10 h-10 rounded-full hover:bg-surface-container-low hidden sm:flex items-center justify-center text-on-surface-variant transition-colors">
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            help
          </span>
        </button>

        {/* Admin Avatar */}
        <div className="w-8 h-8 rounded-full bg-secondary-fixed text-primary font-bold flex items-center justify-center ml-2 border border-primary-fixed cursor-pointer">
          {adminInitials}
        </div>
      </div>
    </header>
  );
}
