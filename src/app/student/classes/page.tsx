"use client";

import React, { useState, useMemo } from "react";
import { ClassCard, ExtendedClass } from "@/components/student/class-card";
import JoinClassModal from "@/components/student/JoinClassModal";
import { Button } from "@/components/ui/button";

const MOCK_CLASSES: ExtendedClass[] = [
  {
    id: "c1",
    name: "Introduction to Computing",
    subject: "Computer Science",
    description: "Learn the fundamentals of computer science, algorithms, and computational thinking.",
    classCode: "CS101",
    isArchived: false,
    faculty: {
      id: "fac_1",
      name: "Dr. Alan Turing",
      avatarUrl: null,
    },
    memberCount: 32,
  },
  {
    id: "c2",
    name: "Data Structures and Algorithms",
    subject: "Computer Science",
    description: "An in-depth look at organizing data and building efficient algorithms for complex problems.",
    classCode: "CS201",
    isArchived: false,
    faculty: {
      id: "fac_2",
      name: "Grace Hopper",
      avatarUrl: null,
    },
    memberCount: 28,
  },
  {
    id: "c3",
    name: "Calculus I",
    subject: "Mathematics",
    description: "Limits, derivatives, and integrals of functions of a single variable.",
    classCode: "MATH101",
    isArchived: false,
    faculty: {
      id: "fac_3",
      name: "Prof. Isaac Newton",
      avatarUrl: null,
    },
    memberCount: 45,
  },
  {
    id: "c4",
    name: "Physics 101: Mechanics",
    subject: "Physics",
    description: "Classical mechanics, thermodynamics, and the fundamental laws of motion.",
    classCode: "PHYS101",
    isArchived: false,
    faculty: {
      id: "fac_4",
      name: "Dr. Albert Einstein",
      avatarUrl: null,
    },
    memberCount: 38,
  },
  {
    id: "c5",
    name: "Web Development",
    subject: "Information Technology",
    description: "Building modern, responsive web applications using React and Next.js.",
    classCode: "IT302",
    isArchived: false,
    faculty: {
      id: "fac_5",
      name: "Tim Berners-Lee",
      avatarUrl: null,
    },
    memberCount: 22,
  },
  {
    id: "c6",
    name: "Introduction to Psychology",
    subject: "Psychology",
    description: "Understanding human behavior, cognitive processes, and emotional development.",
    classCode: "PSYCH101",
    isArchived: true,
    faculty: {
      id: "fac_6",
      name: "Dr. Sigmund Freud",
      avatarUrl: null,
    },
    memberCount: 50,
  }
];

export default function StudentClassesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Classes");
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const filteredClasses = useMemo(() => {
    return MOCK_CLASSES.filter((cls) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        cls.name.toLowerCase().includes(query) ||
        cls.subject.toLowerCase().includes(query) ||
        cls.classCode.toLowerCase().includes(query);
      
      let matchesFilter = true;
      if (statusFilter === "Active") {
        matchesFilter = !cls.isArchived;
      } else if (statusFilter === "Archived") {
        matchesFilter = cls.isArchived;
      }
      
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, statusFilter]);

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto w-full">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-on-surface tracking-tight mb-2">My Classes</h1>
          <p className="text-on-surface-variant text-lg">View and manage your enrolled sections.</p>
        </div>
        <Button 
          onClick={() => setIsJoinModalOpen(true)}
          className="bg-primary hover:bg-primary/90 text-on-primary flex items-center gap-2 h-11 px-6 shadow-sm w-fit"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Join Class
        </Button>
      </div>

      {/* Control Bar */}
      <div className="bg-surface-container-lowest/60 backdrop-blur-xl border border-outline-variant/30 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row gap-4 items-center shadow-sm">
        <div className="relative w-full sm:w-96 flex-1">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
            search
          </span>
          <input
            type="text"
            placeholder="Search by class name, subject, or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container pl-12 pr-4 py-3 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-body-lg"
          />
        </div>
        <div className="relative w-full sm:w-64">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full appearance-none bg-surface-container px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-body-lg cursor-pointer"
          >
            <option value="All Classes">All Classes</option>
            <option value="Active">Active</option>
            <option value="Archived">Archived</option>
          </select>
          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
            expand_more
          </span>
        </div>
      </div>

      {/* Grid Layout */}
      {filteredClasses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredClasses.map((cls) => (
            <ClassCard key={cls.id} classData={cls} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center bg-surface-container-lowest/30 rounded-2xl border border-outline-variant/20 border-dashed">
          <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-4 opacity-50">
            school
          </span>
          <h3 className="text-xl font-bold text-on-surface mb-2">
            No classes found
          </h3>
          <p className="text-on-surface-variant max-w-md mx-auto mb-6">
            We couldn&apos;t find any classes matching your current search and filter criteria.
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("All Classes");
            }}
            className="border-outline-variant/50 hover:bg-surface-container text-on-surface"
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Join Class Modal */}
      <JoinClassModal 
        isOpen={isJoinModalOpen} 
        onClose={() => setIsJoinModalOpen(false)} 
      />
    </div>
  );
}
