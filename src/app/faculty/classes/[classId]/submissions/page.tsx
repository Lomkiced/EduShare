"use client";

import React, { useState, useMemo } from "react";
import { SubmissionTable, MockSubmission } from "@/components/faculty/submission-table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MOCK_SUBMISSIONS: MockSubmission[] = [
  {
    id: "sub_1",
    studentName: "Ada Lovelace",
    avatarInitial: "AL",
    assignmentTitle: "Essay: History of Computing",
    fileName: "Lovelace_History_Essay.pdf",
    submissionDate: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    status: "SUBMITTED",
  },
  {
    id: "sub_2",
    studentName: "Charles Babbage",
    avatarInitial: "CB",
    assignmentTitle: "Essay: History of Computing",
    fileName: "Babbage_Computing.pdf",
    submissionDate: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    status: "REVIEWED",
  },
  {
    id: "sub_3",
    studentName: "Alan Turing",
    avatarInitial: "AT",
    assignmentTitle: "Essay: History of Computing",
    fileName: null,
    submissionDate: null,
    status: "PENDING",
  },
  {
    id: "sub_4",
    studentName: "Grace Hopper",
    avatarInitial: "GH",
    assignmentTitle: "Programming Assignment 1",
    fileName: "Hopper_Code.zip",
    submissionDate: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    status: "SUBMITTED",
  },
  {
    id: "sub_5",
    studentName: "John von Neumann",
    avatarInitial: "JV",
    assignmentTitle: "Programming Assignment 1",
    fileName: null,
    submissionDate: null,
    status: "PENDING",
  }
];

export default function FacultySubmissionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredSubmissions = useMemo(() => {
    return MOCK_SUBMISSIONS.filter((sub) => {
      const matchesSearch = 
        sub.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.assignmentTitle.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = statusFilter === "All" || sub.status === statusFilter;
      
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, statusFilter]);

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto w-full">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-on-surface tracking-tight mb-2">Class Submissions</h1>
          <p className="text-on-surface-variant text-lg">Review and grade student assignments.</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2 border-outline-variant/50 hover:bg-surface-container text-on-surface w-fit h-11 px-6 shadow-sm">
          <span className="material-symbols-outlined text-[18px]">download</span>
          Export Report
        </Button>
      </div>

      {/* Control Bar */}
      <Card className="bg-surface-container-lowest/60 backdrop-blur-xl border border-outline-variant/30 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row gap-4 items-center shadow-sm">
        <div className="relative w-full sm:w-96 flex-1">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
            search
          </span>
          <input
            type="text"
            placeholder="Search by student name or assignment..."
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
            <option value="All">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="SUBMITTED">Submitted</option>
            <option value="REVIEWED">Reviewed</option>
          </select>
          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
            expand_more
          </span>
        </div>
      </Card>

      <SubmissionTable submissions={filteredSubmissions} />
    </div>
  );
}
