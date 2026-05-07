import type { Metadata } from "next";

export const metadata: Metadata = { title: "My Profile" };

export default function StudentProfilePage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">My Profile</h1>
      <p className="text-muted-foreground">Edit your profile information — Coming Soon</p>
    </div>
  );
}
