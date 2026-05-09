import React from "react";
import Link from "next/link";
import FeedPostPreviewCard from "./FeedPostPreviewCard";

export default function RecentFeedPreview() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
        <h3 className="font-headline-lg text-headline-lg text-on-surface">
          Recent Class Activity
        </h3>
        <Link
          href="/student/feed"
          className="font-label-md text-label-md text-secondary hover:text-primary transition-colors flex items-center gap-1"
        >
          View All
          <span
            className="material-symbols-outlined text-[16px]"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            arrow_forward
          </span>
        </Link>
      </div>

      <div className="flex flex-col gap-6">
        <FeedPostPreviewCard
          className="Introduction to Computing"
          classCode="C1"
          authorName="Prof. Juan dela Cruz"
          authorRole="FACULTY"
          content="Please review the updated course outline for Week 7. The quiz schedule has been adjusted — check the feed."
          timeAgo="10 mins ago"
          fileCount={1}
          commentCount={4}
          bandColor="primary"
          href="/student/feed"
        />
        <FeedPostPreviewCard
          className="Introduction to Computing"
          classCode="C1"
          authorName="Maria Santos"
          authorRole="STUDENT"
          content="Sharing my notes from today's lecture on number systems. Hope this helps everyone studying for the quiz!"
          timeAgo="1 hour ago"
          fileCount={2}
          commentCount={7}
          bandColor="primary"
          href="/student/feed"
        />
        <FeedPostPreviewCard
          className="Introduction to Computing"
          classCode="C1"
          authorName="Prof. Juan dela Cruz"
          authorRole="FACULTY"
          content="Lab Activity 3 has been posted. Submit your flowchart diagram by Friday. See the attached instructions."
          timeAgo="3 hours ago"
          fileCount={1}
          commentCount={2}
          bandColor="primary"
          href="/student/feed"
        />
      </div>
    </div>
  );
}
