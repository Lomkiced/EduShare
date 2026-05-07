import type { Metadata } from "next";

export const metadata: Metadata = { title: "Settings" };

export default function AdminSettingsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Platform Settings</h1>
      <p className="text-muted-foreground">Configure platform-wide settings — Coming Soon</p>
    </div>
  );
}
