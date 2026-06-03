"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { useClass } from "@/hooks/use-class";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare, FileText, Users, ArrowLeft, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StudentClassLayout({ children }: { children: React.ReactNode }) {
  const params    = useParams();
  const pathname  = usePathname();
  const classId   = params.classId as string;

  const { data: classData, isLoading } = useClass(classId);

  const tabs = [
    { label: "Feed",        href: `/student/classes/${classId}/feed`,        icon: MessageSquare },
    { label: "Submissions", href: `/student/classes/${classId}/submissions`,  icon: FileText },
    { label: "Members",     href: `/student/classes/${classId}/members`,      icon: Users },
    { label: "Lessons",     href: `/student/classes/${classId}/lessons`,      icon: Video },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {/* Top Header */}
      <header className="bg-surface-container-lowest border-b border-outline-variant/30 sticky top-16 z-10">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8 pt-6">
          <Link href="/student/classes">
            <Button
              variant="ghost" size="sm"
              className="mb-4 -ml-2 text-on-surface-variant hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to My Sections
            </Button>
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              {isLoading ? (
                <>
                  <Skeleton className="h-10 w-64 mb-2" />
                  <Skeleton className="h-6 w-32" />
                </>
              ) : !classData ? (
                <h1 className="text-3xl font-bold text-on-surface">Class Overview</h1>
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-on-surface tracking-tight">{classData.name}</h1>
                  <p className="text-on-surface-variant text-base flex items-center gap-2 mt-1 font-medium">
                    <span className="material-symbols-outlined text-[18px]">subject</span>
                    {classData.subject}
                    {classData.faculty && (
                      <>
                        {" · "}
                        <span className="text-sm text-on-surface-variant">
                          {classData.faculty.name}
                        </span>
                      </>
                    )}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex gap-2 overflow-x-auto no-scrollbar border-b border-transparent">
            {tabs.map((tab) => {
              const isActive = pathname.startsWith(tab.href);
              const Icon = tab.icon;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 font-semibold text-sm transition-all whitespace-nowrap ${
                    isActive
                      ? "border-primary text-primary"
                      : "border-transparent text-on-surface-variant hover:text-on-surface hover:border-outline-variant/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-surface">
        {children}
      </main>
    </div>
  );
}
