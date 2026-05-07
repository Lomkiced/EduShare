/**
 * components/student/post-card.tsx
 * Card component for displaying a post in the class feed (student view).
 * TODO: Implement with author avatar, content, files, comment count, and report button.
 */

"use client";

import type { Post } from "@/types";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <div className="border rounded-lg p-4">
      <p className="text-sm">{post.content.slice(0, 100)}...</p>
      <p className="text-xs text-muted-foreground mt-2">PostCard — Coming Soon</p>
    </div>
  );
}
