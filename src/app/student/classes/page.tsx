"use client";

import React from "react";
import Link from "next/link";
import MySection from "@/components/student/MySection";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function StudentClassesPage() {
  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto w-full">
      {/* Hero Header via MySection component */}
      <div className="mb-8">
        <MySection />
      </div>

      {/* Section Hub layout */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-on-surface mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">apps</span>
          Section Hub
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Classmates Preview */}
          <Card className="border-outline-variant/30 shadow-sm bg-surface-container-lowest hover:shadow-md hover:border-primary/30 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <span className="material-symbols-outlined text-primary">groups</span>
                Classmates Preview
              </CardTitle>
              <CardDescription>View your peers in the section</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">school</span>
                </div>
                <div>
                  <p className="font-bold text-lg text-on-surface">32 Students Enrolled</p>
                  <p className="text-sm text-on-surface-variant">Intro to Computing • Section C1</p>
                </div>
              </div>
              <Button asChild className="w-full sm:w-fit bg-secondary hover:bg-secondary/90 text-on-secondary shadow-sm">
                <Link href="/student/classes/c1/members" className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">group_search</span>
                  View Full Roster
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Card 2: Recent Feed */}
          <Card className="border-outline-variant/30 shadow-sm bg-surface-container-lowest hover:shadow-md hover:border-primary/30 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <span className="material-symbols-outlined text-secondary">forum</span>
                Recent Feed
              </CardTitle>
              <CardDescription>Stay updated with class announcements</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">campaign</span>
                </div>
                <div>
                  <p className="font-bold text-lg text-on-surface">5 New Announcements</p>
                  <p className="text-sm text-on-surface-variant">Latest updates from your instructor</p>
                </div>
              </div>
              <Button asChild variant="outline" className="w-full sm:w-fit border-outline-variant/50 hover:bg-surface-container">
                <Link href="/student/classes/c1/feed" className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  Go to Feed
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
