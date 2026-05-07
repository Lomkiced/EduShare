import React from "react";
import FacultySidebar from "@/components/faculty/FacultySidebar";
import FacultyMobileHeader from "@/components/faculty/FacultyMobileHeader";

export default function FacultyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex">
      <FacultySidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <FacultyMobileHeader />
        <div className="p-6 md:p-8 max-w-[1280px] mx-auto w-full flex-1 flex flex-col gap-8">
          {children}
        </div>
      </main>
    </div>
  );
}
