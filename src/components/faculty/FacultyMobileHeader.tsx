"use client";

import React from "react";
import { useFacultySidebarStore } from "@/store/sidebarStore";

export default function FacultyMobileHeader() {
  const { toggle } = useFacultySidebarStore();

  return (
    <header className="md:hidden bg-white font-sans antialiased border-b border-slate-200 shadow-sm flex items-center justify-between px-6 py-3 w-full sticky top-0 z-50">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="text-slate-600 hover:bg-slate-50 transition-colors p-2 rounded-md flex items-center justify-center"
        >
          <span
            className="material-symbols-outlined text-2xl"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            menu
          </span>
        </button>
        <h2 className="text-xl font-bold tracking-tight text-blue-900">
          EduShare Faculty
        </h2>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <button className="text-slate-600 hover:bg-slate-50 transition-colors p-2 rounded-full flex items-center justify-center">
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            notifications
          </span>
        </button>
        <button className="text-slate-600 hover:bg-slate-50 transition-colors p-2 rounded-full flex items-center justify-center">
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            help_outline
          </span>
        </button>
        <div className="w-8 h-8 rounded-full bg-surface-variant overflow-hidden ml-2 flex-shrink-0 border border-outline-variant flex items-center justify-center text-on-surface font-bold text-sm">
          F
        </div>
      </div>
    </header>
  );
}
