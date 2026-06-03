"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useGradebook } from "@/hooks/use-submissions";
import { GradebookTable } from "@/components/faculty/grading/gradebook-table";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, RefreshCw } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function GradebookPage() {
  const params = useParams();
  const classId = params.classId as string;

  const { data, isLoading, refetch, isRefetching } = useGradebook(classId);

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto w-full animate-in fade-in duration-500">
      <Link href={`/faculty/classes/${classId}`}>
        <Button variant="ghost" size="sm" className="mb-4 -ml-2 text-on-surface-variant hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Class
        </Button>
      </Link>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-on-surface tracking-tight mb-2">Class Gradebook</h1>
          <p className="text-on-surface-variant text-base">Comprehensive view of all student scores and statuses.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => refetch()} 
            disabled={isRefetching}
            className="gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRefetching ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="default" size="sm" className="gap-2 shadow-md">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {isLoading || !data ? (
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6">
          <div className="flex gap-4 mb-4">
            <Skeleton className="h-12 w-48" />
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-32" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      ) : (
        <GradebookTable data={data} />
      )}
    </div>
  );
}
