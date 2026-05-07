import type { Metadata } from "next";

export const metadata: Metadata = { title: "Class Feed" };

export default function StudentClassFeedPage({
  params,
}: {
  params: { classId: string };
}) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Class Feed</h1>
      <p className="text-muted-foreground text-sm mb-4">Class ID: {params.classId}</p>
      <p className="text-muted-foreground">Posts and resources for this class — Coming Soon</p>
    </div>
  );
}
