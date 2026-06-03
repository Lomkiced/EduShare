"use client";

import React, { useState } from "react";
import StatCard from "@/components/shared/StatCard";
import StudentAnalytics from "@/components/student/StudentAnalytics";
import { useAuthStore } from "@/store/auth.store";
import { useClasses } from "@/hooks/use-class";
import { usePosts } from "@/hooks/use-posts";
import { useNotifications } from "@/hooks/use-notifications";

export default function StudentDashboardPage() {
  const { profile } = useAuthStore();
  
  const { data: classes = [], isLoading: isLoadingClasses } = useClasses();
  // Fetch posts for all classes by passing empty string for classId.
  // The API allows omitting classId to fetch across all classes.
  const { data: posts = [], isLoading: isLoadingPosts } = usePosts("");
  const { data: notifData } = useNotifications();
  const notifications = notifData?.notifications || [];

  const unreadPosts = notifications.filter((n) => !n.isRead && n.type === "NEW_POST").length;
  // Pending submissions could be computed, mock it as 0 for now since it's a derived stat.
  const pendingSubmissions = 0; 

  const isLoading = isLoadingClasses || isLoadingPosts;

  return (
    <>
      <div className="hidden md:flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="font-headline-xl text-headline-xl text-primary tracking-tight">
            Welcome back, {profile?.name?.split(" ")[0] || "Student"}!
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-2 max-w-2xl">
            Here&apos;s your current overview and recent class activity.
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          label="My Sections"
          value={classes.length.toString()}
          icon="school"
          iconBg="bg-primary-fixed"
          iconColor="text-on-primary-fixed"
        />
        <StatCard
          label="Unread Posts"
          value={unreadPosts.toString()}
          icon="forum"
          iconBg="bg-secondary-fixed"
          iconColor="text-on-secondary-fixed"
        />
        <StatCard
          label="Pending Submissions"
          value={pendingSubmissions.toString()}
          icon="assignment_late"
          iconBg="bg-tertiary-fixed"
          iconColor="text-on-tertiary-fixed"
          isAlert={pendingSubmissions > 0}
          alertLabel="Due Soon"
        />
      </section>

      {isLoading ? (
        <div className="py-12 text-center text-on-surface-variant font-body-lg">
          Loading dashboard...
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {/* Advanced Analytics Panel */}
          <section>
            <h3 className="font-headline-lg text-headline-lg text-on-surface mb-6">
              Activity Overview
            </h3>
            <StudentAnalytics posts={posts} />
          </section>
        </div>
      )}
    </>
  );
}
