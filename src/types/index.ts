/**
 * types/index.ts
 *
 * Global TypeScript interfaces mirroring the Prisma schema.
 * Use these types throughout the app for type-safe data handling.
 */

// ─── Enums ────────────────────────────────────────────────────────────────────

export type Role = "STUDENT" | "FACULTY" | "ADMIN";

export type SubmissionStatus = "PENDING" | "SUBMITTED" | "REVIEWED";

export type ReportReason =
  | "INAPPROPRIATE"
  | "BULLYING"
  | "UNRELATED"
  | "SPAM"
  | "OTHER";

export type ReportStatus = "PENDING" | "RESOLVED" | "DISMISSED";

// ─── Core Models ──────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  department: string | null;
  role: Role;
  isActive: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Class {
  id: string;
  name: string;
  subject: string;
  description: string | null;
  classCode: string;
  inviteLink: string | null;
  isArchived: boolean;
  createdAt: Date | string;
  facultyId: string;
  faculty?: User;
  members?: ClassMembership[];
  posts?: Post[];
  _count?: {
    members: number;
    posts: number;
  };
}

export interface ClassMembership {
  id: string;
  classId: string;
  studentId: string;
  joinedAt: Date | string;
  class?: Class;
  student?: User;
}

export interface Post {
  id: string;
  classId: string;
  authorId: string;
  content: string;
  category: string | null;
  isPinned: boolean;
  isSubmissionPost: boolean;
  submissionDeadline: Date | string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  class?: Class;
  author?: User;
  files?: PostFile[];
  comments?: Comment[];
  submissions?: Submission[];
  _count?: {
    comments: number;
    submissions: number;
  };
}

export interface PostFile {
  id: string;
  postId: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  post?: Post;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: Date | string;
  post?: Post;
  author?: User;
}

export interface Submission {
  id: string;
  postId: string;
  studentId: string;
  fileUrl: string;
  fileName: string;
  fileType: string;
  status: SubmissionStatus;
  submittedAt: Date | string;
  updatedAt: Date | string;
  post?: Post;
  student?: User;
}

export interface Report {
  id: string;
  reporterId: string;
  reportedUserId: string | null;
  postId: string | null;
  reason: ReportReason;
  description: string | null;
  status: ReportStatus;
  actionTaken: string | null;
  createdAt: Date | string;
  resolvedAt: Date | string | null;
  reporter?: User;
  reportedUser?: User | null;
  post?: Post | null;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  message: string;
  isRead: boolean;
  referenceId: string | null;
  createdAt: Date | string;
  user?: User;
}

// ─── API Response Wrappers ────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  data: T | null;
  error: string | null;
  success: boolean;
}

export interface PaginatedResponse<T = unknown> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  email: string;
  role: Role;
  name: string;
  avatarUrl: string | null;
}

// ─── Analytics (Admin) ────────────────────────────────────────────────────────

export interface AnalyticsSummary {
  totalUsers: number;
  totalStudents: number;
  totalFaculty: number;
  totalClasses: number;
  totalPosts: number;
  totalSubmissions: number;
  pendingReports: number;
}
