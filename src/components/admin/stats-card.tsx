/**
 * components/admin/stats-card.tsx
 * Admin dashboard summary stat card (total users, classes, reports, etc.)
 * TODO: Implement with icon, label, value, and trend indicator using Recharts.
 */

"use client";

interface StatsCardProps {
  label: string;
  value: number | string;
  icon?: React.ReactNode;
}

export function StatsCard({ label, value, icon }: StatsCardProps) {
  return (
    <div className="border rounded-lg p-6 bg-card">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        {icon}
      </div>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">StatsCard — Coming Soon</p>
    </div>
  );
}
