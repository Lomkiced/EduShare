import type { Metadata } from "next";

export const metadata: Metadata = { title: "Reports" };

export default function AdminReportsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Content Reports</h1>
      <p className="text-muted-foreground">Review and resolve flagged content reports — Coming Soon</p>
    </div>
  );
}
