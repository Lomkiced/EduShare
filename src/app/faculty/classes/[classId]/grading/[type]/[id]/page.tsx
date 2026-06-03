"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { SpeedGraderLayout } from "@/components/faculty/grading/speed-grader-layout";
import { Button } from "@/components/ui/button";
import { useNeedsGrading, useReviewSubmission } from "@/hooks/use-submissions";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function GradingPage() {
  const params = useParams();
  const classId = params.classId as string;
  const type = params.type as string; // 'assignment' or 'assessment'
  const id = params.id as string; // Submission ID or AssessmentAttempt ID
  const router = useRouter();

  const { data: queue = [], isLoading } = useNeedsGrading(classId);
  const { mutate: reviewSubmission, isPending: isReviewing } = useReviewSubmission();

  const [manualScore, setManualScore] = useState<string>("");

  const currentIndex = queue.findIndex(item => item.id === id && item.type.toLowerCase() === type);
  const currentItem = queue[currentIndex];

  const hasNext = currentIndex < queue.length - 1;
  const hasPrev = currentIndex > 0;

  const handleNext = () => {
    if (hasNext) {
      const next = queue[currentIndex + 1];
      router.push(`/faculty/classes/${classId}/grading/${next.type.toLowerCase()}/${next.id}`);
      setManualScore("");
    }
  };

  const handlePrev = () => {
    if (hasPrev) {
      const prev = queue[currentIndex - 1];
      router.push(`/faculty/classes/${classId}/grading/${prev.type.toLowerCase()}/${prev.id}`);
      setManualScore("");
    }
  };

  const handleSubmitGrade = () => {
    if (type === "assignment") {
      reviewSubmission({ submissionId: id, postId: currentItem.entityId }, {
        onSuccess: () => {
          if (hasNext) handleNext();
          else router.push(`/faculty/classes/${classId}/submissions`);
        }
      });
    } else {
      // Logic for assessment manual grading would go here.
      // For now, simulating success.
      toast.success("Score updated!");
      if (hasNext) handleNext();
      else router.push(`/faculty/classes/${classId}/submissions`);
    }
  };

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-4rem)] w-full flex items-center justify-center bg-surface-container-lowest">
        <div className="space-y-4 w-96 text-center">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>
      </div>
    );
  }

  if (!currentItem) {
    return (
      <div className="h-[calc(100vh-4rem)] w-full flex flex-col items-center justify-center bg-surface-container-lowest">
        <AlertCircle className="w-12 h-12 text-outline-variant mb-4" />
        <h2 className="text-xl font-semibold text-on-surface">Submission not found</h2>
        <p className="text-on-surface-variant text-sm mt-1">This item may have already been graded or does not exist.</p>
        <Button variant="outline" className="mt-6" onClick={() => router.push(`/faculty/classes/${classId}/submissions`)}>
          Return to Queue
        </Button>
      </div>
    );
  }

  const renderLeftPane = () => {
    if (type === "assignment") {
      const fileUrl = currentItem.details.fileUrl;
      if (!fileUrl) {
        return (
          <div className="h-full flex items-center justify-center text-on-surface-variant bg-surface-container-lowest">
            No file was attached to this submission.
          </div>
        );
      }
      return (
        <iframe 
          src={fileUrl} 
          className="w-full h-full border-none bg-white"
          title="Student Submission"
        />
      );
    }

    if (type === "assessment") {
      return (
        <div className="p-8 max-w-3xl mx-auto space-y-8">
          <h2 className="text-2xl font-bold text-on-surface border-b border-outline-variant/30 pb-4">
            Pending Short Answers
          </h2>
          {currentItem.details.answers.map((answer: any, idx: number) => (
            <div key={answer.id} className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 shadow-sm">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">
                  {idx + 1}
                </div>
                <div className="space-y-4 w-full">
                  <div>
                    <h4 className="font-medium text-on-surface">{answer.question.questionText}</h4>
                    <span className="text-xs text-on-surface-variant">{answer.question.points} Points Possible</span>
                  </div>
                  <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/50 relative">
                    <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider absolute -top-2.5 left-3 bg-surface-container-lowest px-1">
                      Student's Answer
                    </span>
                    <p className="text-on-surface text-sm mt-1 whitespace-pre-wrap">{answer.textAnswer || <span className="text-on-surface-variant/50 italic">No answer provided</span>}</p>
                  </div>
                  {answer.question.explanation && (
                    <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                      <h5 className="text-xs font-bold text-green-800 mb-1">Expected Answer / Rubric</h5>
                      <p className="text-sm text-green-700">{answer.question.explanation}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  const renderRightPane = () => {
    return (
      <div className="h-full flex flex-col bg-surface-container-lowest">
        <div className="p-6 border-b border-outline-variant/30">
          <h3 className="text-lg font-bold text-on-surface">Evaluation</h3>
          <p className="text-sm text-on-surface-variant">Provide feedback and score.</p>
        </div>
        
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          {type === "assessment" && (
            <div className="space-y-3">
              <label className="text-sm font-semibold text-on-surface">Manual Score Adjustment</label>
              <div className="flex items-center gap-3">
                <input 
                  type="number" 
                  value={manualScore}
                  onChange={(e) => setManualScore(e.target.value)}
                  placeholder="e.g. 5"
                  className="w-24 p-3 bg-surface-container border border-outline-variant/50 rounded-xl focus:ring-1 focus:ring-primary outline-none"
                />
                <span className="text-sm text-on-surface-variant">Points</span>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <label className="text-sm font-semibold text-on-surface">Comments</label>
            <textarea 
              rows={6}
              placeholder="Great work! Next time, try to focus on..."
              className="w-full p-4 bg-surface-container border border-outline-variant/50 rounded-xl focus:ring-1 focus:ring-primary outline-none resize-none text-sm"
            />
          </div>
        </div>

        <div className="p-6 border-t border-outline-variant/30 bg-surface-container-low">
          <Button 
            className="w-full h-12 text-base gap-2 shadow-md"
            onClick={handleSubmitGrade}
            disabled={isReviewing}
          >
            <CheckCircle2 className="w-5 h-5" />
            {isReviewing ? "Saving..." : (hasNext ? "Submit & Next" : "Submit & Finish")}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <SpeedGraderLayout
      classId={classId}
      studentName={currentItem.student.name}
      entityTitle={currentItem.title}
      leftPaneContent={renderLeftPane()}
      rightPaneContent={renderRightPane()}
      onNext={handleNext}
      onPrev={handlePrev}
      hasNext={hasNext}
      hasPrev={hasPrev}
    />
  );
}
