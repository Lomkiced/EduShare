import type { Metadata } from "next";

export const metadata: Metadata = { title: "Student Dashboard" };

export default function StudentDashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Student Dashboard</h1>
      <p className="text-muted-foreground">Your classes, recent activity, and updates — Coming Soon</p>
    </div>
  );
}
