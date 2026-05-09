import React from "react";
import Link from "next/link";

interface SectionCardProps {
  sectionCode: string        // e.g. "C1", "C2", "C3"
  sectionLabel: string       // e.g. "Section C1"
  schedule: string           // e.g. "MWF 7:30 – 9:00 AM"
  room: string               // e.g. "Room 204"
  studentCount: number
  bandColor: "primary" | "secondary" | "tertiary"
  status: {
    icon: string
    label: string
    color: string
    bg?: string
  }
  href: string
}

export default function SectionCard({
  sectionCode,
  sectionLabel,
  schedule,
  room,
  studentCount,
  bandColor,
  status,
  href,
}: SectionCardProps) {
  const bandBg =
    bandColor === "primary"
      ? "bg-primary"
      : bandColor === "secondary"
      ? "bg-secondary"
      : "bg-tertiary";

  const bandText =
    bandColor === "primary"
      ? "text-on-primary"
      : bandColor === "secondary"
      ? "text-on-secondary"
      : "text-on-tertiary";

  return (
    <Link
      href={href}
      className="bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-outline-variant/20 hover:shadow-[0_8px_20px_rgba(0,35,111,0.08)] transition-all duration-300 relative overflow-hidden group flex flex-col h-[280px]"
    >
      <div className={`h-2 w-full ${bandBg}`} />

      <div className="p-md flex-1 flex flex-col pt-lg">
        <div className="flex justify-between items-start mb-sm">
          <span
            className={`${bandBg} ${bandText} px-3 py-1 rounded-full font-label-sm text-label-sm`}
          >
            {sectionLabel}
          </span>
          <button className="text-outline hover:text-primary">
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>

        <h4 className="font-headline-md text-headline-md text-on-surface mb-xs group-hover:text-secondary transition-colors line-clamp-2">
          Introduction to Computing
        </h4>

        <div className="flex flex-col gap-xs mb-md flex-1 mt-2">
          <div className="flex items-center gap-1 font-body-sm text-body-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-[14px]">schedule</span>
            {schedule}
          </div>
          <div className="flex items-center gap-1 font-body-sm text-body-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-[14px]">meeting_room</span>
            {room}
          </div>
        </div>

        <div className="border-t border-outline-variant/20 pt-sm mt-auto flex items-center justify-between">
          <div className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px]">group</span>
            {studentCount}
          </div>

          <div
            className={`flex items-center gap-1 font-label-sm text-label-sm ${status.color} ${status.bg ? `${status.bg} px-2 py-0.5 rounded-full` : ""}`}
          >
            <span className="material-symbols-outlined text-[14px]">
              {status.icon}
            </span>
            {status.label}
          </div>
        </div>
      </div>
    </Link>
  );
}
