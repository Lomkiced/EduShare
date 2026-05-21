"use client";

import React, { useMemo } from "react";
import { CreatePostDialog } from "@/components/faculty/create-post-dialog";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

// --- Types ---
type MockUser = {
  id: string;
  name: string;
  avatarUrl: string | null;
  role: "STUDENT" | "FACULTY" | "ADMIN";
};

type MockPostFile = {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
};

type MockComment = {
  id: string;
  content: string;
  createdAt: Date;
  author: MockUser;
};

type MockPost = {
  id: string;
  content: string;
  category: string | null;
  isPinned: boolean;
  isSubmissionPost: boolean;
  submissionDeadline: Date | null;
  createdAt: Date;
  author: MockUser;
  files: MockPostFile[];
  comments: MockComment[];
};

// --- Helpers ---
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
};

const formatBytes = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

const getInitials = (name: string) => {
  return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
};

// --- Mock Data ---
const CURRENT_USER: MockUser = {
  id: "fac_1",
  name: "Dr. Alan Turing",
  avatarUrl: null,
  role: "FACULTY",
};

const MOCK_POSTS: MockPost[] = [
  {
    id: "post_1",
    content: "Welcome to Introduction to Computing! Please review the syllabus posted in the class files. Let's have a great semester.",
    category: "Announcement",
    isPinned: true,
    isSubmissionPost: false,
    submissionDeadline: null,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    author: CURRENT_USER,
    files: [],
    comments: [],
  },
  {
    id: "post_2",
    content: "For your first assignment, please write a short essay on the history of computing focusing on the Turing machine. Ensure your essay is at least 1000 words. Submit it as a PDF.",
    category: "Assignment",
    isPinned: false,
    isSubmissionPost: true,
    submissionDeadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
    author: CURRENT_USER,
    files: [
      {
        id: "file_1",
        fileName: "CS101_Assignment1_Rubric.pdf",
        fileUrl: "#",
        fileType: "application/pdf",
        fileSize: 1024 * 512,
      }
    ],
    comments: [],
  },
  {
    id: "post_3",
    content: "I've uploaded the lecture slides from today's session on boolean logic. Feel free to ask any questions here if you need clarification.",
    category: "Material",
    isPinned: false,
    isSubmissionPost: false,
    submissionDeadline: null,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    author: CURRENT_USER,
    files: [
      {
        id: "file_2",
        fileName: "Lecture_2_Boolean_Logic.pptx",
        fileUrl: "#",
        fileType: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        fileSize: 1024 * 1024 * 2.5,
      }
    ],
    comments: [
      {
        id: "comment_1",
        content: "Could you explain the difference between XOR and NAND gates again?",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
        author: {
          id: "stu_1",
          name: "Ada Lovelace",
          avatarUrl: null,
          role: "STUDENT",
        }
      },
      {
        id: "comment_2",
        content: "XOR outputs true only when inputs differ. NAND is the exact opposite of AND.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1),
        author: {
          id: "stu_2",
          name: "Charles Babbage",
          avatarUrl: null,
          role: "STUDENT",
        }
      }
    ],
  }
];

export default function FacultyClassFeedPage() {
  const upcomingDeadlines = useMemo(() => {
    return MOCK_POSTS
      .filter(p => p.isSubmissionPost && p.submissionDeadline && p.submissionDeadline > new Date())
      .sort((a, b) => a.submissionDeadline!.getTime() - b.submissionDeadline!.getTime());
  }, []);

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-on-surface tracking-tight mb-2">Class Feed</h1>
        <p className="text-on-surface-variant text-lg">Communicate with your students and post materials.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Feed Column */}
        <div className="col-span-1 lg:col-span-8 space-y-6">
          {/* Create Post Trigger */}
          <Card className="border-outline-variant/30 shadow-sm p-4 overflow-hidden">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="h-10 w-10 border border-outline-variant/20 shadow-sm">
                <AvatarFallback className="bg-primary/10 text-primary font-medium">{getInitials(CURRENT_USER.name)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 bg-surface-container py-2.5 px-5 rounded-full border border-outline-variant/30 text-on-surface-variant flex items-center justify-between cursor-pointer hover:bg-surface-container-high transition-all">
                <span className="text-sm">Announce something to your class...</span>
                <span className="material-symbols-outlined text-[20px] text-primary">send</span>
              </div>
            </div>
            <div className="border-t border-outline-variant/20 pt-3">
              <CreatePostDialog />
            </div>
          </Card>

          {/* Posts Feed */}
          <div className="space-y-6">
            {MOCK_POSTS.map(post => (
              <Card key={post.id} className={`shadow-sm border-outline-variant/30 overflow-hidden transition-colors ${post.isPinned ? "border-primary/50 border-l-[6px] border-l-primary bg-primary/5" : "bg-surface-container-lowest hover:bg-surface-container/30"}`}>
                <div className="p-5 md:p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="border border-outline-variant/20">
                        <AvatarFallback className="bg-secondary/10 text-secondary font-medium">{getInitials(post.author.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-on-surface flex items-center gap-2">
                          {post.author.name}
                          {post.category && (
                            <Badge variant="secondary" className="text-[10px] h-5 px-2 rounded-md font-medium bg-secondary-container text-on-secondary-container hover:bg-secondary-container">
                              {post.category}
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
                          <span className="material-symbols-outlined text-[14px]">schedule</span>
                          {formatDate(post.createdAt)}
                        </div>
                      </div>
                    </div>
                    {post.isPinned && (
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-[18px]" title="Pinned">push_pin</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="text-on-surface text-[15px] mb-5 leading-relaxed whitespace-pre-wrap">
                    {post.content}
                  </div>

                  {/* Files */}
                  {post.files.length > 0 && (
                    <div className="flex flex-col gap-2 mb-5">
                      {post.files.map(file => (
                        <div key={file.id} className="flex items-center gap-4 p-3 rounded-xl border border-outline-variant/30 bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer group">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors shrink-0">
                            <span className="material-symbols-outlined text-[20px]">description</span>
                          </div>
                          <div className="flex-1 overflow-hidden">
                            <div className="text-sm font-medium text-on-surface truncate">{file.fileName}</div>
                            <div className="text-xs text-on-surface-variant mt-0.5 uppercase tracking-wide">{formatBytes(file.fileSize)} • {file.fileType.split('/')[1] || 'FILE'}</div>
                          </div>
                          <div className="h-8 w-8 rounded-full hover:bg-surface-variant flex items-center justify-center transition-colors">
                            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">download</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Assignment Details */}
                  {post.isSubmissionPost && post.submissionDeadline && (
                    <div className="bg-tertiary-container/30 border border-tertiary/20 rounded-xl p-4 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3 text-tertiary-dark">
                        <div className="h-10 w-10 rounded-full bg-tertiary/10 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-tertiary text-[20px]">event_busy</span>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-tertiary">Due {formatDate(post.submissionDeadline)}</div>
                          <div className="text-xs text-tertiary/80 mt-0.5">0 Submissions</div>
                        </div>
                      </div>
                      <Button className="bg-tertiary hover:bg-tertiary/90 text-on-tertiary shadow-sm">
                        View Submissions
                      </Button>
                    </div>
                  )}

                  <Separator className="my-5 bg-outline-variant/20" />

                  {/* Comments Info */}
                  <div className="flex items-center gap-4 text-on-surface-variant text-sm mb-5 font-medium">
                    <div className="flex items-center gap-1.5 cursor-pointer hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-[18px]">forum</span>
                      {post.comments.length} Class comment{post.comments.length !== 1 && 's'}
                    </div>
                  </div>

                  {/* Comment List */}
                  {post.comments.length > 0 && (
                    <div className="flex flex-col gap-4 mb-5">
                      {post.comments.map(comment => (
                        <div key={comment.id} className="flex items-start gap-3">
                          <Avatar className="h-8 w-8 border border-outline-variant/20">
                            <AvatarFallback className="text-[10px] bg-surface-variant text-on-surface-variant font-medium">{getInitials(comment.author.name)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="bg-surface-container border border-outline-variant/30 rounded-2xl rounded-tl-none p-3 text-sm text-on-surface inline-block max-w-[95%]">
                              <div className="font-semibold mb-1 flex items-baseline gap-2">
                                <span>{comment.author.name}</span>
                                <span className="text-[10px] font-normal text-on-surface-variant">{formatDate(comment.createdAt)}</span>
                              </div>
                              <p className="leading-relaxed">{comment.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Comment Input */}
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-outline-variant/20">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary font-medium">{getInitials(CURRENT_USER.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 relative">
                      <Input placeholder="Add a class comment..." className="h-10 rounded-full bg-surface-container pr-12 border-outline-variant/30 focus-visible:ring-primary/50 focus-visible:border-primary/50 text-sm placeholder:text-on-surface-variant/60" />
                      <button className="absolute right-1.5 top-1/2 -translate-y-1/2 text-primary hover:bg-primary/10 transition-colors h-7 w-7 flex items-center justify-center rounded-full">
                        <span className="material-symbols-outlined text-[18px] ml-0.5">send</span>
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Utility Column */}
        <div className="col-span-1 lg:col-span-4 hidden lg:block">
          <div className="sticky top-24 space-y-6">
            {/* Class Details */}
            <Card className="border-outline-variant/30 shadow-sm overflow-hidden bg-surface-container-lowest">
              <div className="bg-primary/5 p-4 border-b border-outline-variant/20 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">info</span>
                <h3 className="font-semibold text-primary">Class Details</h3>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Class Code</span>
                  <span className="text-sm font-medium text-on-surface bg-surface-container w-fit px-2 py-1 rounded border border-outline-variant/30">CS101</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Schedule</span>
                  <span className="text-sm font-medium text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant">schedule</span>
                    MWF 7:30 – 9:00 AM
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Room</span>
                  <span className="text-sm font-medium text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant">meeting_room</span>
                    Room 204
                  </span>
                </div>
              </div>
            </Card>

            {/* Upcoming Deadlines */}
            <Card className="border-outline-variant/30 shadow-sm overflow-hidden bg-surface-container-lowest">
              <div className="bg-tertiary/5 p-4 border-b border-outline-variant/20 flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-[20px]">upcoming</span>
                <h3 className="font-semibold text-tertiary">Upcoming Deadlines</h3>
              </div>
              <div className="p-0">
                {upcomingDeadlines.length > 0 ? (
                  <div className="flex flex-col divide-y divide-outline-variant/20">
                    {upcomingDeadlines.map(assignment => (
                      <div key={assignment.id} className="p-4 hover:bg-surface-container transition-colors cursor-pointer group">
                        <div className="text-sm font-medium text-on-surface line-clamp-2 group-hover:text-tertiary transition-colors mb-2 leading-relaxed">
                          {assignment.content.split('.')[0]} {/* Show first sentence */}
                        </div>
                        <div className="text-xs text-tertiary font-semibold flex items-center gap-1.5 bg-tertiary/10 w-fit px-2 py-1 rounded-md">
                          <span className="material-symbols-outlined text-[14px]">timer</span>
                          {formatDate(assignment.submissionDeadline!)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center flex flex-col items-center gap-2">
                    <span className="material-symbols-outlined text-[32px] text-on-surface-variant/50">event_available</span>
                    <span className="text-sm text-on-surface-variant font-medium">No upcoming deadlines!</span>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
