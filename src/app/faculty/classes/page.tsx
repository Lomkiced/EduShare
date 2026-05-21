"use client";

import React, { useState, useMemo } from "react";
import SectionCard from "../../../components/faculty/SectionCard";

type BandColor = "primary" | "secondary" | "tertiary";

const MOCK_SECTIONS = [
  {
    sectionCode: "C1",
    sectionLabel: "Section C1",
    schedule: "MWF 7:30 – 9:00 AM",
    room: "Room 204",
    studentCount: 32,
    bandColor: "primary" as BandColor,
    status: {
      icon: "notifications_active",
      label: "5 New Posts",
      color: "text-secondary",
    },
    href: "/faculty/classes/c1/feed",
  },
  {
    sectionCode: "C2",
    sectionLabel: "Section C2",
    schedule: "TTh 10:30 AM – 12:00 PM",
    room: "Room 101",
    studentCount: 38,
    bandColor: "secondary" as BandColor,
    status: {
      icon: "check_circle",
      label: "Up to date",
      color: "text-outline",
    },
    href: "/faculty/classes/c2/feed",
  },
  {
    sectionCode: "C3",
    sectionLabel: "Section C3",
    schedule: "MWF 1:00 – 2:30 PM",
    room: "Room 305",
    studentCount: 29,
    bandColor: "tertiary" as BandColor,
    status: {
      icon: "assignment_late",
      label: "8 Ungraded",
      color: "text-error",
      bg: "bg-error-container/30",
    },
    href: "/faculty/classes/c3/feed",
  },
  {
    sectionCode: "C4",
    sectionLabel: "Section C4",
    schedule: "MWF 9:00 – 10:30 AM",
    room: "Room 204",
    studentCount: 40,
    bandColor: "primary" as BandColor,
    status: {
      icon: "check_circle",
      label: "Up to date",
      color: "text-outline",
    },
    href: "/faculty/classes/c4/feed",
  },
  {
    sectionCode: "C5",
    sectionLabel: "Section C5",
    schedule: "TTh 1:00 – 2:30 PM",
    room: "Room 102",
    studentCount: 35,
    bandColor: "secondary" as BandColor,
    status: {
      icon: "notifications_active",
      label: "2 New Posts",
      color: "text-secondary",
    },
    href: "/faculty/classes/c5/feed",
  },
  {
    sectionCode: "C6",
    sectionLabel: "Section C6",
    schedule: "TTh 3:00 – 4:30 PM",
    room: "Room 105",
    studentCount: 31,
    bandColor: "tertiary" as BandColor,
    status: {
      icon: "assignment_late",
      label: "3 Ungraded",
      color: "text-error",
      bg: "bg-error-container/30",
    },
    href: "/faculty/classes/c6/feed",
  },
  {
    sectionCode: "C7",
    sectionLabel: "Section C7",
    schedule: "S 8:00 – 11:00 AM",
    room: "Room 401",
    studentCount: 25,
    bandColor: "primary" as BandColor,
    status: {
      icon: "check_circle",
      label: "Up to date",
      color: "text-outline",
    },
    href: "/faculty/classes/c7/feed",
  },
  {
    sectionCode: "C8",
    sectionLabel: "Section C8",
    schedule: "MWF 4:00 – 5:30 PM",
    room: "Room 301",
    studentCount: 33,
    bandColor: "secondary" as BandColor,
    status: {
      icon: "notifications_active",
      label: "1 New Post",
      color: "text-secondary",
    },
    href: "/faculty/classes/c8/feed",
  },
];

export default function FacultyClassesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [scheduleFilter, setScheduleFilter] = useState("All");

  const filteredSections = useMemo(() => {
    return MOCK_SECTIONS.filter((section) => {
      const matchesSearch =
        section.sectionLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.sectionCode.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesFilter = true;
      if (scheduleFilter === "Morning") {
        matchesFilter = section.schedule.includes("AM");
      } else if (scheduleFilter === "Afternoon") {
        matchesFilter = section.schedule.includes("PM") && !section.schedule.includes("AM");
      }

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, scheduleFilter]);

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-on-surface mb-2 tracking-tight">
          My Sections
        </h1>
        <p className="text-on-surface-variant text-lg">
          Manage your classes, schedules, and students.
        </p>
      </div>

      <div className="bg-surface-container-lowest/60 backdrop-blur-xl border border-outline-variant/30 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row gap-4 items-center shadow-sm">
        <div className="relative w-full sm:w-96 flex-1">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
            search
          </span>
          <input
            type="text"
            placeholder="Search by section or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container pl-12 pr-4 py-3 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-body-lg"
          />
        </div>
        <div className="relative w-full sm:w-64">
          <select
            value={scheduleFilter}
            onChange={(e) => setScheduleFilter(e.target.value)}
            className="w-full appearance-none bg-surface-container px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-body-lg cursor-pointer"
          >
            <option value="All">All Schedules</option>
            <option value="Morning">Morning Classes</option>
            <option value="Afternoon">Afternoon Classes</option>
          </select>
          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
            expand_more
          </span>
        </div>
      </div>

      {filteredSections.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSections.map((section) => (
            <SectionCard key={section.sectionCode} {...section} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-surface-container-lowest/30 rounded-2xl border border-outline-variant/20 border-dashed">
          <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-4 opacity-50">
            search_off
          </span>
          <h3 className="text-xl font-bold text-on-surface mb-2">
            No sections found
          </h3>
          <p className="text-on-surface-variant max-w-md mx-auto">
            We couldn't find any sections matching your current search and filter criteria. Try adjusting your filters.
          </p>
        </div>
      )}
    </div>
  );
}
