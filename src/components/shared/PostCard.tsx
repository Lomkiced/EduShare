"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useTogglePin, useDeletePost } from "@/hooks/use-posts";
import type { Post } from "@/types";
import CommentThread from "./CommentThread";
import ReportModal from "./ReportModal";

interface PostCardProps {
  post: Post;
  isFacultyView?: boolean;
}

export default function PostCard({ post, isFacultyView = false }: PostCardProps) {
  const { profile } = useAuthStore();
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const { mutate: togglePin } = useTogglePin(post.classId);
  const { mutate: deletePost } = useDeletePost(post.classId);

  const isAuthor = profile?.id === post.authorId;
  const canPin = profile?.role === "FACULTY";

  return (
    <>
      <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-outline-variant/30 flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-md">
        {post.isPinned && (
          <div className="bg-secondary text-on-secondary text-[10px] font-bold uppercase tracking-wider px-3 py-1 self-start rounded-br-lg absolute top-0 left-0 z-10 flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px]">push_pin</span>
            Pinned
          </div>
        )}

        <div className={`p-5 md:p-6 ${post.isPinned ? "pt-8" : ""}`}>
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold">
                {post.author.avatarUrl ? (
                  <img src={post.author.avatarUrl} alt={post.author.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  post.author.name.charAt(0).toUpperCase()
                )}
              </div>
              <div>
                <p className="font-label-md text-on-surface flex items-center gap-2">
                  {post.author.name}
                  {post.author.role === "FACULTY" && (
                    <span className="bg-primary-fixed text-primary px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider">
                      Faculty
                    </span>
                  )}
                </p>
                <p className="font-label-sm text-on-surface-variant">
                  {new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(post.createdAt))}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {canPin && (
                <button
                  onClick={() => togglePin(post.id)}
                  className={`p-2 rounded-full transition-colors ${post.isPinned ? "text-secondary hover:bg-secondary-container/50" : "text-outline hover:text-secondary hover:bg-secondary-container/30"}`}
                  title={post.isPinned ? "Unpin post" : "Pin post"}
                >
                  <span className="material-symbols-outlined text-[20px]">push_pin</span>
                </button>
              )}
              
              {!isAuthor && (
                <button
                  onClick={() => setIsReportOpen(true)}
                  className="p-2 rounded-full text-outline hover:text-error hover:bg-error-container/30 transition-colors"
                  title="Report Post"
                >
                  <span className="material-symbols-outlined text-[20px]">flag</span>
                </button>
              )}

              {(isAuthor || canPin) && (
                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this post?")) {
                      deletePost(post.id);
                    }
                  }}
                  className="p-2 rounded-full text-outline hover:text-error hover:bg-error-container/30 transition-colors"
                  title="Delete Post"
                >
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              )}
            </div>
          </div>

          <div className="font-body-md text-on-surface mb-6 whitespace-pre-wrap leading-relaxed">
            {post.content}
          </div>

          {post.files && post.files.length > 0 && (
            <div className="flex flex-col gap-2 mb-6">
              {post.files.map((file) => (
                <a
                  key={file.id}
                  href={file.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border border-outline-variant/50 hover:bg-surface-container-low transition-colors group"
                >
                  <div className="w-10 h-10 rounded bg-tertiary-container/50 text-tertiary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">description</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-label-md text-on-surface truncate group-hover:text-primary transition-colors">
                      {file.fileName}
                    </p>
                    <p className="font-label-sm text-on-surface-variant">
                      {Math.round(file.fileSize / 1024)} KB
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">download</span>
                </a>
              ))}
            </div>
          )}

          {post.isSubmissionPost && (
            <div className="bg-primary-container/20 border border-primary/20 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <p className="font-label-md text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">assignment</span>
                  Assignment Submission
                </p>
                <p className="font-label-sm text-on-surface-variant mt-1">
                  Due: {post.submissionDeadline ? new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(post.submissionDeadline)) : "No deadline"}
                </p>
              </div>
              <a
                href={isFacultyView ? `/faculty/classes/${post.classId}/submissions?postId=${post.id}` : `/student/submissions`}
                className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md text-label-md hover:bg-primary/90 transition-colors shadow-sm whitespace-nowrap"
              >
                {isFacultyView ? "View Submissions" : "Submit Assignment"}
              </a>
            </div>
          )}
        </div>

        <div className="bg-surface-container-low/50 px-5 py-3 border-t border-outline-variant/30 flex items-center justify-between">
          <button
            onClick={() => setIsCommentsOpen(!isCommentsOpen)}
            className="flex items-center gap-2 font-label-md text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">
              chat_bubble_outline
            </span>
            {post._count?.comments || 0} Comments
          </button>
        </div>
      </div>

      {isCommentsOpen && (
        <div className="mt-4 pl-4 md:pl-12 border-l-2 border-outline-variant/30">
          <CommentThread postId={post.id} classId={post.classId} />
        </div>
      )}

      {isReportOpen && (
        <ReportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          postId={post.id}
          reportedUserId={post.authorId}
        />
      )}
    </>
  );
}
