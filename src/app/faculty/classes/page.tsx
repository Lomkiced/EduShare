import type { Metadata } from "next";

export const metadata: Metadata = { title: "My Classes" };

export default function FacultyClassesPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">My Classes</h1>
      <p className="text-muted-foreground">Classes you are teaching — Coming Soon</p>
    </div>
  );
}
