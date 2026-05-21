"use client";

import React, { useState, useMemo } from "react";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Classmate {
  id: string;
  name: string;
  email: string;
  major: string;
}

const mockInstructor = {
  id: "fac_1",
  name: "Dr. Alan Turing",
  email: "alan.turing@university.edu",
  role: "Instructor",
};

const mockClassmates: Classmate[] = [
  { id: "stu_1", name: "Alice Smith", email: "alice.smith@student.edu", major: "Computer Science" },
  { id: "stu_2", name: "Bob Johnson", email: "bob.johnson@student.edu", major: "Information Technology" },
  { id: "stu_3", name: "Charlie Davis", email: "charlie.davis@student.edu", major: "Software Engineering" },
  { id: "stu_4", name: "Diana Prince", email: "diana.prince@student.edu", major: "Computer Science" },
  { id: "stu_5", name: "Ethan Hunt", email: "ethan.hunt@student.edu", major: "Data Science" },
  { id: "stu_6", name: "Fiona Gallagher", email: "fiona.g@student.edu", major: "Cybersecurity" },
  { id: "stu_7", name: "George Miller", email: "george.m@student.edu", major: "Information Technology" },
  { id: "stu_8", name: "Hannah Abbott", email: "hannah.a@student.edu", major: "Computer Science" },
  { id: "stu_9", name: "Ian Malcolm", email: "ian.m@student.edu", major: "Mathematics" },
  { id: "stu_10", name: "Julia Roberts", email: "julia.r@student.edu", major: "Software Engineering" },
];

export default function StudentClassMembersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClassmates = useMemo(() => {
    if (!searchQuery.trim()) return mockClassmates;
    const query = searchQuery.toLowerCase();
    return mockClassmates.filter(
      (student) =>
        student.name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query) ||
        student.major.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto w-full">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-on-surface tracking-tight mb-2">Classmates</h1>
        <p className="text-on-surface-variant text-lg">Intro to Computing • Section C1</p>
      </div>

      {/* Control Bar */}
      <div className="bg-surface-container-lowest/60 backdrop-blur-xl border border-outline-variant/30 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row gap-4 items-center shadow-sm">
        <div className="relative w-full sm:w-96 flex-1">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
            search
          </span>
          <Input
            type="text"
            placeholder="Search classmates by name, email, or major..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container pl-12 pr-4 py-3 h-12 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-body-lg"
          />
        </div>
      </div>

      <div className="flex flex-col gap-10">
        {/* Section 1: Leadership */}
        <section>
          <h2 className="text-xl font-bold text-on-surface mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">school</span>
            Instructor
          </h2>
          <Card className="border-outline-variant/30 shadow-sm bg-surface-container-lowest hover:shadow-md transition-all duration-300 w-full md:w-1/2 lg:w-1/3">
            <CardContent className="p-5 flex items-center gap-4">
              <UserAvatar name={mockInstructor.name} size="lg" />
              <div className="flex flex-col flex-1 min-w-0">
                <h3 className="font-bold text-lg text-on-surface truncate">{mockInstructor.name}</h3>
                <p className="text-sm text-on-surface-variant truncate">{mockInstructor.email}</p>
                <div className="mt-2">
                  <Badge variant="secondary" className="bg-primary-container text-on-primary-container font-medium hover:bg-primary-container">
                    {mockInstructor.role}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 2: Peers */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">group</span>
              Peers
            </h2>
            <Badge variant="outline" className="text-on-surface-variant border-outline-variant/50">
              {filteredClassmates.length} Student{filteredClassmates.length !== 1 ? 's' : ''}
            </Badge>
          </div>

          {filteredClassmates.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredClassmates.map((student) => (
                <Card 
                  key={student.id} 
                  className="border-outline-variant/30 shadow-sm bg-surface-container-lowest hover:shadow-md hover:border-primary/30 transition-all duration-300"
                >
                  <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                    <UserAvatar name={student.name} size="lg" />
                    <div className="flex flex-col w-full min-w-0">
                      <h3 className="font-bold text-base text-on-surface truncate">{student.name}</h3>
                      <p className="text-sm text-on-surface-variant truncate">{student.email}</p>
                    </div>
                    <Badge variant="outline" className="mt-1 font-normal bg-surface-container text-on-surface-variant border-outline-variant/30">
                      {student.major}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center bg-surface-container-lowest/30 rounded-2xl border border-outline-variant/20 border-dashed">
              <span className="material-symbols-outlined text-5xl text-on-surface-variant mb-4 opacity-50">
                person_search
              </span>
              <h3 className="text-xl font-bold text-on-surface mb-2">
                No classmates found
              </h3>
              <p className="text-on-surface-variant max-w-md mx-auto">
                No students matched your search criteria "{searchQuery}".
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
