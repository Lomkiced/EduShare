"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ClassCardProps {
  classCode: string;
  name: string;
  description: string;
  studentCount: number;
  bandColor: "primary" | "secondary" | "tertiary";
  codeBadgeBg: string; // e.g. "bg-primary-fixed"
  codeBadgeText: string; // e.g. "text-on-primary-fixed"
  status: {
    icon: string;
    label: string;
    color: string; // Tailwind text color class
    bg?: string; // Optional bg for pill badges
  };
  href: string;
}

const bandColorMap = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  tertiary: "bg-tertiary",
};

export default function ClassCard({
  classCode,
  name,
  description,
  studentCount,
  bandColor,
  codeBadgeBg,
  codeBadgeText,
  status,
  href,
}: ClassCardProps) {
  return (
    <Link href={href} className="block h-full outline-none">
      <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-outline-variant/20 hover:shadow-[0_8px_20px_rgba(0,35,111,0.08)] transition-all duration-300 flex flex-col group relative overflow-hidden h-full">
        {/* Top color band */}
        <div
          className={cn("h-2 w-full absolute top-0 left-0", bandColorMap[bandColor])}
        />

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col pt-8">
          {/* Header row */}
          <div className="flex justify-between items-start mb-4">
            <span
              className={cn(
                "px-3 py-1 rounded-full font-label-sm text-label-sm",
                codeBadgeBg,
                codeBadgeText
              )}
            >
              {classCode}
            </span>
            <button className="text-outline hover:text-primary transition-colors focus:outline-none">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                more_vert
              </span>
            </button>
          </div>

          {/* Class name */}
          <h4 className="font-headline-md text-headline-md text-on-surface mb-2 group-hover:text-secondary transition-colors">
            {name}
          </h4>

          {/* Description */}
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-6 flex-1">
            {description}
          </p>

          {/* Card footer */}
          <div className="border-t border-outline-variant/20 pt-4 mt-auto flex items-center justify-between">
            {/* Left: student count */}
            <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
              <span
                className="material-symbols-outlined text-[16px]"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                group
              </span>
              {studentCount} Students
            </div>

            {/* Right: status badge */}
            <div
              className={cn(
                "flex items-center gap-1 font-label-sm text-label-sm",
                status.color,
                status.bg ? `${status.bg} px-2 py-0.5 rounded-full` : ""
              )}
            >
              <span
                className="material-symbols-outlined text-[16px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {status.icon}
              </span>
              {status.label}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
