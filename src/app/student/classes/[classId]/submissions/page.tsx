import type { Metadata } from "next";

export const metadata: Metadata = { title: "Submissions" };

export default function StudentClassSubmissionsPage({
  params,
}: {
  params: { classId: string };
}) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Submissions</h1>
      <p className="text-muted-foreground text-sm mb-4">Class ID: {params.classId}</p>
      <p className="text-muted-foreground">Your assignment submissions — Coming Soon</p>
    </div>
  );
}
