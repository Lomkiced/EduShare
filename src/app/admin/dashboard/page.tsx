import React from "react";
import StatCard from "@/components/admin/StatCard";
import PlatformActivityChart from "@/components/admin/PlatformActivityChart";
import RecentActivity from "@/components/admin/RecentActivity";

export default function AdminDashboardPage() {
  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            Dashboard Overview
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Real-time metrics and platform health for EduShare.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-surface-container-lowest border border-primary text-primary px-5 py-2 rounded-lg font-label-md text-label-md hover:bg-surface-container-low transition-colors card-shadow-1">
            Download Report
          </button>
          <button className="bg-secondary text-on-secondary px-5 py-2 rounded-lg font-label-md text-label-md hover:opacity-90 transition-opacity card-shadow-1">
            Manage Users
          </button>
        </div>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Users"
          value="1,240"
          icon="group"
          iconBg="bg-primary-fixed"
          iconColor="text-primary"
          badge={{ label: "12%", type: "success" }}
        />
        <StatCard
          label="My Sections"
          value="450"
          icon="class"
          iconBg="bg-secondary-fixed"
          iconColor="text-secondary"
          badge={{ label: "8%", type: "success" }}
        />
        <StatCard
          label="Pending Reports"
          value="12"
          icon="report"
          iconBg="bg-error-container"
          iconColor="text-error"
          badge={{ label: "Requires Action", type: "error" }}
          isAlert={true}
        />
        <StatCard
          label="Total Resources"
          value="3,800"
          icon="library_books"
          iconBg="bg-tertiary-fixed"
          iconColor="text-tertiary"
          badge={{ label: "24%", type: "success" }}
        />
      </div>

      {/* Chart + Activity - 2/3 and 1/3 split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <PlatformActivityChart />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
    </>
  );
}
