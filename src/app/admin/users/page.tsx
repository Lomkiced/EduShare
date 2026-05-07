import type { Metadata } from "next";

export const metadata: Metadata = { title: "User Management" };

export default function AdminUsersPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">User Management</h1>
      <p className="text-muted-foreground">Manage students, faculty, and admin accounts — Coming Soon</p>
    </div>
  );
}
