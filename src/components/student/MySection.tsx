import React from "react";
import Link from "next/link";

export default function MySection() {
  return (
    <section>
      <h3 className="font-headline-lg text-headline-lg text-on-surface mb-6">
        My Section
      </h3>

      <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-outline-variant/20 hover:shadow-[0_8px_20px_rgba(0,35,111,0.08)] transition-all duration-300 relative overflow-hidden">
        <div className="h-2 w-full bg-primary absolute top-0 left-0" />

        <div className="p-md pt-lg flex flex-col md:flex-row gap-md">
          <div className="flex-1 flex flex-col gap-sm">
            <div className="flex items-center gap-sm flex-wrap">
              <span className="bg-primary-fixed text-on-primary-fixed px-3 py-1 rounded-full font-label-sm text-label-sm">
                Section C1
              </span>
              <span className="font-headline-md text-headline-md text-on-surface">
                Introduction to Computing
              </span>
            </div>

            <div className="flex items-center gap-1 font-body-sm text-body-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-[14px]">person</span>
              Prof. Juan dela Cruz
            </div>

            <div className="flex flex-wrap gap-md">
              <div className="flex items-center gap-1 font-body-sm text-body-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                MWF 7:30 – 9:00 AM
              </div>
              <div className="flex items-center gap-1 font-body-sm text-body-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-[14px]">
                  meeting_room
                </span>
                Room 204
              </div>
            </div>

            <div className="flex gap-md flex-wrap mt-xs">
              <span className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-[14px]">group</span>
                32 Classmates
              </span>
              <span className="flex items-center gap-1 font-label-sm text-label-sm text-secondary">
                <span className="material-symbols-outlined text-[14px]">
                  notifications_active
                </span>
                5 New Posts
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-sm md:items-end justify-center shrink-0">
            <Link
              href="/student/feed"
              className="bg-secondary text-on-secondary px-md py-sm rounded-lg font-label-md text-label-md hover:opacity-90 transition-opacity shadow-[0_4px_12px_rgba(0,0,0,0.04)] flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">forum</span>
              Go to Section Feed
            </Link>
            <Link
              href="/student/submissions"
              className="border border-primary text-primary px-md py-sm rounded-lg font-label-md text-label-md hover:bg-surface-container-low transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">assignment</span>
              View Submissions
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
