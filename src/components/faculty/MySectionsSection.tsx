import React from "react";
import Link from "next/link";
import SectionCard from "./SectionCard";

export default function MySectionsSection() {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-headline-lg text-headline-lg text-on-surface">
          My Sections
        </h3>
        <Link
          href="/faculty/sections"
          className="font-label-md text-label-md text-secondary hover:text-primary transition-colors flex items-center gap-1"
        >
          View All
          <span className="material-symbols-outlined text-[16px]">
            arrow_forward
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SectionCard
          sectionCode="C1"
          sectionLabel="Section C1"
          schedule="MWF 7:30 – 9:00 AM"
          room="Room 204"
          studentCount={32}
          bandColor="primary"
          status={{
            icon: "notifications_active",
            label: "5 New Posts",
            color: "text-secondary",
          }}
          href="/faculty/sections/c1"
        />
        <SectionCard
          sectionCode="C2"
          sectionLabel="Section C2"
          schedule="TTh 10:30 AM – 12:00 PM"
          room="Room 101"
          studentCount={38}
          bandColor="secondary"
          status={{
            icon: "check_circle",
            label: "Up to date",
            color: "text-outline",
          }}
          href="/faculty/sections/c2"
        />
        <SectionCard
          sectionCode="C3"
          sectionLabel="Section C3"
          schedule="MWF 1:00 – 2:30 PM"
          room="Room 305"
          studentCount={29}
          bandColor="tertiary"
          status={{
            icon: "assignment_late",
            label: "8 Ungraded",
            color: "text-error",
            bg: "bg-error-container/30",
          }}
          href="/faculty/sections/c3"
        />
      </div>
    </section>
  );
}
