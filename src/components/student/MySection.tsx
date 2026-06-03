import React, { useState } from "react";
import Link from "next/link";
import type { Class } from "@/types";
import ClassmatesModal from "./ClassmatesModal";

interface MySectionProps {
  classData: Class & {
    faculty?: { name: string };
    _count?: { students: number; posts: number };
  };
}

export default function MySection({ classData }: MySectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
    <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-outline-variant/20 hover:shadow-[0_8px_20px_rgba(0,35,111,0.08)] transition-all duration-300 relative overflow-hidden">
      <div className="h-2 w-full bg-primary absolute top-0 left-0" />

      <div className="p-md pt-lg flex flex-col md:flex-row gap-md">
        <div className="flex-1 flex flex-col gap-sm">
          <div className="flex items-center gap-sm flex-wrap">
            <span className="bg-primary-fixed text-on-primary-fixed px-3 py-1 rounded-full font-label-sm text-label-sm">
              {classData.classCode}
            </span>
            <span className="font-headline-md text-headline-md text-on-surface">
              {classData.name}
            </span>
          </div>

          <div className="flex items-center gap-1 font-body-sm text-body-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-[14px]">person</span>
            Prof. {classData.faculty?.name || "Faculty"}
          </div>

          <div className="flex flex-wrap gap-md">
            <div className="flex items-center gap-1 font-body-sm text-body-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-[14px]">subject</span>
              {classData.subject}
            </div>
            {classData._count && (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-1.5 font-label-sm text-sm text-primary bg-primary/5 hover:bg-primary/15 px-3 py-1 rounded-md transition-colors group cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px] group-hover:scale-110 transition-transform">group</span>
                {classData._count.students} Classmates
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-sm md:items-end justify-center shrink-0">
          <Link
            href={`/student/classes/${classData.id}/feed`}
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
    
    <ClassmatesModal 
      isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false)} 
      classId={classData.id} 
      className={classData.name} 
    />
    </>
  );
}
