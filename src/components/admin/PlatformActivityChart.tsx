"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

const mockData = [
  { day: "May 1", users: 120, uploads: 45 },
  { day: "May 5", users: 145, uploads: 60 },
  { day: "May 8", users: 132, uploads: 52 },
  { day: "May 11", users: 168, uploads: 78 },
  { day: "May 14", users: 155, uploads: 65 },
  { day: "May 17", users: 190, uploads: 88 },
  { day: "May 20", users: 210, uploads: 95 },
  { day: "May 23", users: 198, uploads: 82 },
  { day: "May 26", users: 225, uploads: 105 },
  { day: "May 29", users: 248, uploads: 118 },
  { day: "May 30", users: 260, uploads: 122 },
];

export default function PlatformActivityChart() {
  const [activeRange, setActiveRange] = useState<"30D" | "90D" | "1Y">("30D");

  return (
    <div className="bg-surface-container-lowest rounded-xl card-shadow-1 border border-surface-variant p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h3 className="font-headline-md text-on-surface">Platform Activity</h3>
          <p className="font-body-sm text-on-surface-variant mt-1">
            User engagement and resource uploads over time.
          </p>
        </div>
        <div className="flex bg-surface-container-low p-1 rounded-lg">
          {["30D", "90D", "1Y"].map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range as any)}
              className={cn(
                "px-3 py-1 font-label-sm rounded-md transition-all",
                activeRange === range
                  ? "bg-surface-container-lowest shadow-sm text-on-surface"
                  : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div style={{ width: "100%", height: 256 }}>
        <ResponsiveContainer>
          <LineChart data={mockData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e3e5" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fill: "#444651", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            <YAxis
              tick={{ fill: "#444651", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              dx={-10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                border: "1px solid #e0e3e5",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.04)",
                padding: "12px",
              }}
              itemStyle={{ fontSize: "14px", fontWeight: 500 }}
              labelStyle={{ fontSize: "12px", color: "#444651", marginBottom: "4px" }}
            />
            <Line
              type="monotone"
              dataKey="users"
              name="Active Users"
              stroke="#0058be"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: "#0058be", stroke: "#ffffff", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="uploads"
              name="Resource Uploads"
              stroke="#adc6ff"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: "#adc6ff", stroke: "#ffffff", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Legend */}
      <div className="mt-6 flex gap-6 justify-center">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-secondary" />
          <span className="font-label-sm text-on-surface-variant">Active Users</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-secondary-fixed-dim" />
          <span className="font-label-sm text-on-surface-variant">Resource Uploads</span>
        </div>
      </div>
    </div>
  );
}
