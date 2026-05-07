import type { Metadata } from "next";

export const metadata: Metadata = { title: "Class Members" };

export default function FacultyClassMembersPage({
  params,
}: {
  params: { classId: string };
}) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Class Members</h1>
      <p className="text-muted-foreground text-sm mb-4">Class ID: {params.classId}</p>
      <p className="text-muted-foreground">Manage enrolled students — Coming Soon</p>
    </div>
  );
}
