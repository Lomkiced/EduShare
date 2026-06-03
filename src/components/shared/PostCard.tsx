"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useTogglePin, useDeletePost } from "@/hooks/use-posts";
import { useSubmissions, useSubmitFile } from "@/hooks/use-submissions";
import { useFileUpload } from "@/hooks/use-file-upload";
import { toast } from "sonner";
import type { Post } from "@/types";
import CommentThread from "./CommentThread";
import ReportModal from "./ReportModal";

interface PostCardProps {
  post: Post;
  isFacultyView?: boolean;
}

function StudentSubmissionSection({ postId, deadline }: { postId: string, deadline: string | null }) {
  const { data: submission, isLoading } = useSubmissions(postId);
  const { mutate: submitFile, isPending: isSubmitting } = useSubmitFile();
  const { upload, isUploading, error: uploadError } = useFileUpload({ bucket: "submissions" });
  
  const [stagedFile, setStagedFile] = React.useState<File | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    const allowedExtensions = [".pdf", ".doc", ".docx"];
    const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    
    if (!allowedExtensions.includes(ext)) {
      toast.error(`Unsupported file format: ${ext}. Please upload .pdf, .doc, or .docx`);
      return false;
    }
    
    // 50MB limit
    if (file.size > 50 * 1024 * 1024) {
      toast.error("File size must be less than 50MB");
      return false;
    }
    
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (validateFile(file)) {
      setStagedFile(file);
    } else {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (validateFile(file)) {
      setStagedFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!stagedFile) return;

    const result = await upload(stagedFile);
    if (result) {
      submitFile({
        postId,
        fileUrl: result.url,
        fileName: stagedFile.name,
        fileType: stagedFile.type || "application/octet-stream",
      }, {
        onSuccess: () => {
          setStagedFile(null);
        }
      });
    }
  };

  if (isLoading) {
    return <div className="p-4 bg-surface-container-low rounded-lg animate-pulse text-on-surface-variant text-sm">Loading submission status...</div>;
  }

  if (submission && !Array.isArray(submission)) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined">check_circle</span>
          </div>
          <div>
            <p className="font-label-md text-green-800">Submitted Successfully</p>
            <p className="font-label-sm text-green-700">
              {submission.fileName} • {new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(submission.submittedAt))}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const isPastDeadline = deadline ? new Date() > new Date(deadline) : false;

  return (
    <div 
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center gap-2 transition-colors ${
        isDragging 
          ? "bg-primary-container/30 border-primary" 
          : "bg-surface-container-low/50 border-outline-variant hover:bg-surface-container-low"
      }`}
    >
      <span className={`material-symbols-outlined text-3xl ${isDragging ? "text-primary" : "text-outline"}`}>
        {stagedFile ? "description" : "upload_file"}
      </span>
      
      {!stagedFile ? (
        <>
          <p className="font-label-md text-on-surface">Submit Your Work</p>
          <p className="font-label-sm text-on-surface-variant max-w-[250px]">
            Drag & drop your file here, or click to browse. Accepted: .pdf, .docx, .doc (Max 50MB).
          </p>
          
          {uploadError && <p className="text-error font-label-sm mt-2">{uploadError}</p>}

          <div className="mt-4">
            <input
              type="file"
              accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf,.doc,.docx"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              disabled={isUploading || isSubmitting || isPastDeadline}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading || isSubmitting || isPastDeadline}
              type="button"
              className="bg-primary text-on-primary px-5 py-2 rounded-lg font-label-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {isPastDeadline ? "Deadline Passed" : "Select File"}
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="font-label-md text-on-surface">File Staged</p>
          <p className="font-label-sm text-on-surface-variant max-w-[250px] truncate" title={stagedFile.name}>
            {stagedFile.name} ({Math.round(stagedFile.size / 1024)} KB)
          </p>

          {uploadError && <p className="text-error font-label-sm mt-2">{uploadError}</p>}

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => {
                setStagedFile(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              disabled={isUploading || isSubmitting}
              type="button"
              className="px-4 py-2 rounded-lg font-label-md border border-outline-variant text-on-surface-variant hover:bg-surface-container disabled:opacity-50 transition-colors"
            >
              Remove
            </button>
            <button
              onClick={handleSubmit}
              disabled={isUploading || isSubmitting || isPastDeadline}
              type="button"
              className="bg-primary text-on-primary px-5 py-2 rounded-lg font-label-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center gap-2"
            >
              {isUploading ? "Uploading..." : isSubmitting ? "Submitting..." : "Submit Assignment"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function FileAttachmentItem({ file }: { file: NonNullable<Post["files"]>[number] }) {
  const [isDownloading, setIsDownloading] = React.useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isDownloading) return;

    setIsDownloading(true);
    try {
      const response = await fetch(file.fileUrl);
      if (!response.ok) throw new Error("Network response was not ok");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = file.fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a); // Cleanup logic
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download file");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      type="button"
      className="w-full text-left flex items-center gap-3 p-3 rounded-lg border border-outline-variant/50 hover:bg-surface-container-low transition-colors group disabled:opacity-70 disabled:cursor-wait"
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
      <span className={`material-symbols-outlined text-outline transition-colors ${isDownloading ? "animate-spin text-primary" : "group-hover:text-primary"}`}>
        {isDownloading ? "autorenew" : "download"}
      </span>
    </button>
  );
}

export default function PostCard({ post, isFacultyView = false }: PostCardProps) {
  const { user } = useAuthStore();
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const { mutate: togglePin } = useTogglePin(post.classId);
  const { mutate: deletePost } = useDeletePost(post.classId);

  const isAuthor = user?.id === post.authorId;
  const canPin = user?.role === "FACULTY";

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
                <FileAttachmentItem key={file.id} file={file} />
              ))}
            </div>
          )}

          {post.isSubmissionPost && (
            <div className="mb-6 flex flex-col gap-4">
              <div className="bg-primary-container/20 border border-primary/20 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="font-label-md text-primary flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">assignment</span>
                    Assignment Submission
                  </p>
                  <p className="font-label-sm text-on-surface-variant mt-1">
                    Due: {post.submissionDeadline ? new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(post.submissionDeadline)) : "No deadline"}
                  </p>
                </div>
                {isFacultyView && (
                  <a
                    href={`/faculty/classes/${post.classId}/submissions?postId=${post.id}`}
                    className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md text-label-md hover:bg-primary/90 transition-colors shadow-sm whitespace-nowrap"
                  >
                    View Submissions
                  </a>
                )}
              </div>
              {!isFacultyView && <StudentSubmissionSection postId={post.id} deadline={post.submissionDeadline} />}
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
