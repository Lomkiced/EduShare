import React from "react";
import Link from "next/link";
import ClassCard from "./ClassCard";

export default function ActiveClassesSection() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
        <h3 className="font-headline-lg text-headline-lg text-on-surface">
          Active Classes
        </h3>
        <Link
          href="/faculty/classes"
          className="font-label-md text-label-md text-secondary hover:text-primary transition-colors flex items-center gap-1"
        >
          View All
          <span
            className="material-symbols-outlined text-[16px]"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            arrow_forward
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ClassCard
          classCode="ARM-2024"
          name="Advanced Research Methods"
          description="Graduate level qualitative and quantitative methodologies."
          studentCount={32}
          bandColor="primary"
          codeBadgeBg="bg-primary-fixed"
          codeBadgeText="text-on-primary-fixed"
          status={{
            icon: "notifications_active",
            label: "5 New",
            color: "text-secondary",
          }}
          href="/faculty/classes/arm-2024"
        />
        <ClassCard
          classCode="DAT-301"
          name="Data Structures & Algorithms"
          description="Core computer science principles and optimization techniques."
          studentCount={68}
          bandColor="secondary"
          codeBadgeBg="bg-secondary-fixed"
          codeBadgeText="text-on-secondary-fixed"
          status={{
            icon: "check_circle",
            label: "Up to date",
            color: "text-outline",
          }}
          href="/faculty/classes/dat-301"
        />
        <ClassCard
          classCode="HCI-410"
          name="Human-Computer Interaction"
          description="Principles of user interface design and cognitive psychology."
          studentCount={42}
          bandColor="tertiary"
          codeBadgeBg="bg-tertiary-fixed"
          codeBadgeText="text-on-tertiary-fixed"
          status={{
            icon: "assignment_late",
            label: "12 Un-graded",
            color: "text-error",
            bg: "bg-error-container/30",
          }}
          href="/faculty/classes/hci-410"
        />
      </div>
    </div>
  );
}
