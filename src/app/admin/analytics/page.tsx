import type { Metadata } from "next";

export const metadata: Metadata = { title: "Analytics" };

export default function AdminAnalyticsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Platform Analytics</h1>
      <p className="text-muted-foreground">Usage statistics, charts, and data export — Coming Soon</p>
    </div>
  );
}
