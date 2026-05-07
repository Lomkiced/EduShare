import type { Metadata } from "next";

export const metadata: Metadata = { title: "Notifications" };

export default function FacultyNotificationsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Notifications</h1>
      <p className="text-muted-foreground">Activity from your classes — Coming Soon</p>
    </div>
  );
}
