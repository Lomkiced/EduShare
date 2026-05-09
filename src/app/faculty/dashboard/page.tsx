import React from "react";
import StatCard from "@/components/shared/StatCard";
import MySectionsSection from "@/components/faculty/MySectionsSection";

export default function FacultyDashboardPage() {
  return (
    <>
      {/* Desktop Page Header */}
      <div className="hidden md:flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="font-headline-xl text-headline-xl text-primary tracking-tight">
            Introduction to Computing
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-2 max-w-2xl">
            Manage your sections, monitor student engagement, and 
            review submissions for Introduction to Computing.
          </p>
        </div>
        
        {/* Decorative banner */}
        <div className="hidden lg:flex w-full md:w-auto h-[120px] rounded-xl overflow-hidden shadow-sm flex-shrink-0 opacity-90 border border-outline-variant/30 bg-surface-variant">
          <svg
            width="400"
            height="120"
            viewBox="0 0 400 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full object-cover"
          >
            <rect width="400" height="120" fill="#fefcff" />
            <circle cx="350" cy="20" r="60" fill="#dce1ff" opacity="0.6" />
            <circle cx="50" cy="100" r="40" fill="#d8e2ff" opacity="0.6" />
            <path
              d="M150 120L250 0H300L200 120H150Z"
              fill="#00236f"
              opacity="0.05"
            />
            <path
              d="M180 120L280 0H330L230 120H180Z"
              fill="#0058be"
              opacity="0.05"
            />
          </svg>
        </div>
      </div>

      {/* Quick Stats Strip */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Total Students"
          value="142"
          icon="groups"
          iconBg="bg-primary-fixed"
          iconColor="text-on-primary-fixed"
        />
        <StatCard
          label="Active Posts"
          value="48"
          icon="forum"
          iconBg="bg-secondary-fixed"
          iconColor="text-on-secondary-fixed"
        />
        <StatCard
          label="Pending Submissions"
          value="24"
          icon="inventory_2"
          iconBg="bg-tertiary-fixed"
          iconColor="text-on-tertiary-fixed"
          isAlert={true}
          alertLabel="Action Needed"
        />
      </section>

      {/* My Sections */}
      <MySectionsSection />
    </>
  );
}
