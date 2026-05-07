import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const activities = [
  {
    id: 1,
    icon: "person_add",
    iconBg: "bg-primary-fixed",
    iconColor: "text-primary",
    message: (
      <>
        <strong>Dr. Sarah Jenkins</strong> created a new course{" "}
        <span className="text-secondary">Advanced Physics 301</span>.
      </>
    ),
    time: "10 mins ago",
  },
  {
    id: 2,
    icon: "flag",
    iconBg: "bg-error-container",
    iconColor: "text-error",
    message: (
      <>
        Resource <span className="text-secondary">Midterm_Answers.pdf</span> was
        flagged for review.
      </>
    ),
    time: "45 mins ago",
  },
  {
    id: 3,
    icon: "upload_file",
    iconBg: "bg-tertiary-fixed",
    iconColor: "text-tertiary",
    message: (
      <>
        <strong>Prof. Allen</strong> uploaded 12 new materials to{" "}
        <span className="text-secondary">Design Systems</span>.
      </>
    ),
    time: "2 hours ago",
  },
  {
    id: 4,
    icon: "settings",
    iconBg: "bg-surface-container-high",
    iconColor: "text-on-surface",
    message: <>System backup completed successfully.</>,
    time: "5 hours ago",
  },
  {
    id: 5,
    icon: "login",
    iconBg: "bg-primary-fixed",
    iconColor: "text-primary",
    message: <>New batch of 50 students registered for Spring Semester.</>,
    time: "Yesterday",
  },
];

export default function RecentActivity() {
  return (
    <div className="bg-surface-container-lowest rounded-xl card-shadow-1 border border-surface-variant flex flex-col h-full">
      <div className="p-6 border-b border-surface-variant flex justify-between items-center">
        <h3 className="font-headline-md text-on-surface">Recent Activity</h3>
        <Link
          href="/admin/reports"
          className="text-secondary font-label-md hover:underline"
        >
          View All
        </Link>
      </div>
      <div className="flex-1 divide-y divide-surface-variant">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="p-4 hover:bg-surface-container-low/50 transition-colors flex gap-4 items-start"
          >
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1",
                activity.iconBg,
                activity.iconColor
              )}
            >
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {activity.icon}
              </span>
            </div>
            <div>
              <p className="font-body-sm text-on-surface">{activity.message}</p>
              <p className="font-label-sm text-on-surface-variant mt-1">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
