import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="flex-1 min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-8">
      <div className="w-16 h-16 rounded-2xl bg-tertiary-container text-on-tertiary-container flex items-center justify-center mb-6 shadow-sm animate-pulse">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
      <h2 className="text-2xl font-bold text-on-surface mb-2 animate-pulse">Loading Admin Portal</h2>
      <p className="text-on-surface-variant max-w-md text-center">Fetching platform analytics, users, and system data...</p>
    </div>
  );
}
