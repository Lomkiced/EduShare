import React from "react";
import StudentSidebar from "@/components/student/StudentSidebar";
import StudentMobileHeader from "@/components/student/StudentMobileHeader";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex">
      <StudentSidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <StudentMobileHeader />
        <div className="p-6 md:p-8 max-w-[1280px] mx-auto w-full flex-1 flex flex-col gap-8">
          {children}
        </div>
      </main>
    </div>
  );
}
