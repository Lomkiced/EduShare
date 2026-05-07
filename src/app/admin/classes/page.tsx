import type { Metadata } from "next";

export const metadata: Metadata = { title: "All Classes" };

export default function AdminClassesPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">All Classes</h1>
      <p className="text-muted-foreground">View and manage all platform classes — Coming Soon</p>
    </div>
  );
}
