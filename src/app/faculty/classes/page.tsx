"use client";

import React, { useState, useMemo } from "react";
import SectionCard from "@/components/faculty/SectionCard";
import { useClasses } from "@/hooks/use-class";

type BandColor = "primary" | "secondary" | "tertiary";

export default function FacultyClassesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: classes = [], isLoading } = useClasses();

  const filteredSections = useMemo(() => {
    return classes.filter((section) => {
      const matchesSearch =
        section.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.classCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.subject.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Ignoring schedule filter for now since it's not strongly mapped in the real schema (we'll keep the UI minimal for this integration phase or use subject as search)
      return matchesSearch && !section.isArchived;
    });
  }, [searchQuery, classes]);

  const bandColors: BandColor[] = ["primary", "secondary", "tertiary"];

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto w-full">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-4xl font-bold text-on-surface mb-2 tracking-tight">
            My Sections
          </h1>
          <p className="text-on-surface-variant text-lg">
            Manage your classes, schedules, and students.
          </p>
        </div>
      </div>

      <div className="bg-surface-container-lowest/60 backdrop-blur-xl border border-outline-variant/30 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row gap-4 items-center shadow-sm">
        <div className="relative w-full sm:w-96 flex-1">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
            search
          </span>
          <input
            type="text"
            placeholder="Search by section, code, or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container pl-12 pr-4 py-3 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-body-lg"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="p-12 text-center text-on-surface-variant font-body-lg">
          Loading sections...
        </div>
      ) : filteredSections.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSections.map((section, idx) => (
            <SectionCard
              key={section.id}
              sectionCode={section.classCode}
              sectionLabel={section.name}
              schedule={section.subject}
              room="Virtual"
              studentCount={section._count?.members || 0}
              bandColor={bandColors[idx % bandColors.length]}
              status={{
                icon: "check_circle",
                label: "Active",
                color: "text-outline",
              }}
              href={`/faculty/classes/${section.id}/feed`}
            />
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
            You don't have any sections matching your search, or you haven't created any yet.
          </p>
        </div>
      )}
    </div>
  );
}
