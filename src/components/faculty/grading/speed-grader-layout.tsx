"use client";

import React from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface SpeedGraderLayoutProps {
  classId: string;
  entityTitle: string;
  studentName: string;
  leftPaneContent: React.ReactNode;
  rightPaneContent: React.ReactNode;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export function SpeedGraderLayout({
  classId,
  entityTitle,
  studentName,
  leftPaneContent,
  rightPaneContent,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}: SpeedGraderLayoutProps) {
  return (
    <div className="h-[calc(100vh-4rem)] w-full flex flex-col bg-surface-container-lowest overflow-hidden">
      {/* Top Header Bar */}
      <header className="flex-none h-16 border-b border-outline-variant/30 px-4 flex items-center justify-between bg-surface-container-low">
        <div className="flex items-center gap-4">
          <Link href={`/faculty/classes/${classId}/submissions`}>
            <Button variant="ghost" size="sm" className="gap-2 text-on-surface-variant hover:text-primary">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <div className="h-6 w-px bg-outline-variant/30" />
          <div>
            <h1 className="text-sm font-semibold text-on-surface truncate max-w-[300px]">
              {entityTitle}
            </h1>
            <p className="text-xs text-on-surface-variant">SpeedGrader View</p>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-on-surface mr-2">{studentName}</span>
          <div className="flex items-center gap-1 border border-outline-variant/30 rounded-lg p-0.5 bg-surface-container-lowest shadow-sm">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 rounded-md"
              disabled={!hasPrev}
              onClick={onPrev}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="w-px h-4 bg-outline-variant/30" />
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 rounded-md"
              disabled={!hasNext}
              onClick={onNext}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Split Interface */}
      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">
          <Panel defaultSize={65} minSize={30} className="bg-surface-container-lowest relative">
            <div className="absolute inset-0 overflow-auto">
              {leftPaneContent}
            </div>
          </Panel>
          
          <PanelResizeHandle className="w-1.5 bg-outline-variant/20 hover:bg-primary/50 transition-colors flex items-center justify-center cursor-col-resize z-10 group">
            <div className="h-8 w-1 rounded-full bg-outline-variant/50 group-hover:bg-primary transition-colors" />
          </PanelResizeHandle>
          
          <Panel defaultSize={35} minSize={20} className="bg-surface-container-low/30 relative border-l border-outline-variant/30 shadow-inner">
             <div className="absolute inset-0 overflow-auto">
               {rightPaneContent}
             </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}
