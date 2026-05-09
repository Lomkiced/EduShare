"use client";

import React, { useState } from "react";
import StatCard from "@/components/shared/StatCard";
import MySection from "@/components/student/MySection";
import RecentFeedPreview from "@/components/student/RecentFeedPreview";
import JoinClassModal from "@/components/student/JoinClassModal";

export default function StudentDashboardPage() {
  const [joinModalOpen, setJoinModalOpen] = useState(false);

  return (
    <>
      {/* Desktop Page Header — hidden on mobile */}
      <div className="hidden md:flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="font-headline-xl text-headline-xl text-primary tracking-tight">
            Welcome back, Student!
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-2 max-w-2xl">
            Here&apos;s what&apos;s happening in your Introduction to Computing section today.
          </p>
        </div>
        
        {/* Desktop Join Class shortcut button */}
        <button
          onClick={() => setJoinModalOpen(true)}
          className="bg-secondary text-on-secondary rounded-lg py-2 px-6 font-label-md text-label-md hover:opacity-90 transition-opacity shadow-[0_4px_12px_rgba(0,0,0,0.04)] flex items-center gap-2"
        >
          <span
            className="material-symbols-outlined text-[18px]"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            add
          </span>
          Join a Section
        </button>
      </div>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="My Section"
          value="C1"
          icon="school"
          iconBg="bg-primary-fixed"
          iconColor="text-on-primary-fixed"
        />
        <StatCard
          label="Unread Posts"
          value="12"
          icon="forum"
          iconBg="bg-secondary-fixed"
          iconColor="text-on-secondary-fixed"
        />
        <StatCard
          label="Pending Submissions"
          value="3"
          icon="assignment_late"
          iconBg="bg-tertiary-fixed"
          iconColor="text-on-tertiary-fixed"
          isAlert={true}
          alertLabel="Due Soon"
        />
      </section>

      {/* My Section */}
      <MySection />

      {/* Recent Activity Feed Preview */}
      <RecentFeedPreview />

      <JoinClassModal
        isOpen={joinModalOpen}
        onClose={() => setJoinModalOpen(false)}
      />
    </>
  );
}
