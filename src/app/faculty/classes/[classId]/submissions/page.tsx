import type { Metadata } from "next";

export const metadata: Metadata = { title: "Submissions" };

export default function FacultyClassSubmissionsPage({
  params,
}: {
  params: { classId: string };
}) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Student Submissions</h1>
      <p className="text-muted-foreground text-sm mb-4">Class ID: {params.classId}</p>
      <p className="text-muted-foreground">Review and grade student submissions — Coming Soon</p>
    </div>
  );
}
