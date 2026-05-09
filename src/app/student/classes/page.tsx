import type { Metadata } from "next";

export const metadata: Metadata = { title: "My Section" };

export default function StudentClassesPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">My Section</h1>
      <p className="text-muted-foreground">The section you have joined — Coming Soon</p>
    </div>
  );
}
