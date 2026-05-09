"use client";

import React from "react";
import { useStudentSidebarStore } from "@/store/sidebarStore";

export default function StudentMobileHeader() {
  const { toggle } = useStudentSidebarStore();

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
          EduShare
        </h2>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <button className="relative text-slate-600 hover:bg-slate-50 transition-colors p-2 rounded-full">
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            notifications
          </span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full border border-white" />
        </button>
        
        <div className="w-8 h-8 rounded-full bg-surface-variant overflow-hidden ml-2 flex-shrink-0 border border-outline-variant cursor-pointer flex items-center justify-center text-on-surface font-bold text-sm">
          S
        </div>
      </div>
    </header>
  );
}
