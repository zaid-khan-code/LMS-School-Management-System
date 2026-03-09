"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Plus, Mail, BookOpen } from "lucide-react";

const teachers = [
  { id: "1", name: "Dr. Sarah Johnson", subject: "Mathematics", classes: 4, students: 120, email: "s.johnson@school.edu", status: "active", joined: "Sep 2021" },
  { id: "2", name: "Ms. Emma Roberts", subject: "English Literature", classes: 3, students: 96, email: "e.roberts@school.edu", status: "active", joined: "Aug 2019" },
  { id: "3", name: "Mr. David Kim", subject: "Physics", classes: 3, students: 84, email: "d.kim@school.edu", status: "active", joined: "Jan 2022" },
  { id: "4", name: "Ms. Lisa Chen", subject: "World History", classes: 4, students: 130, email: "l.chen@school.edu", status: "active", joined: "Sep 2020" },
  { id: "5", name: "Mr. Alex Park", subject: "Computer Science", classes: 2, students: 56, email: "a.park@school.edu", status: "active", joined: "Aug 2023" },
  { id: "6", name: "Dr. Maya Patel", subject: "Chemistry", classes: 3, students: 88, email: "m.patel@school.edu", status: "on-leave", joined: "Sep 2018" },
];

export default function TeachersPage() {
  const [search, setSearch] = useState("");
  const filtered = teachers.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Teachers</h1>
          <p className="text-sm text-muted-foreground">Manage teaching staff across all departments</p>
        </div>
        <Button><Plus className="h-4 w-4" />Add Teacher</Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Teachers", value: "68" },
          { label: "Active", value: "65" },
          { label: "On Leave", value: "3" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border bg-card p-4 text-center">
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search teachers…" className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((t) => (
          <div key={t.id} className="rounded-xl border bg-card p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start gap-3">
              <Avatar className="h-11 w-11 shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm truncate">{t.name}</h3>
                  <Badge variant={t.status === "active" ? "success" : "warning"} className="text-xs shrink-0 ml-2">
                    {t.status === "active" ? "Active" : "On Leave"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{t.subject}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" />{t.classes} classes</span>
                  <span>{t.students} students</span>
                  <span>Since {t.joined}</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline" className="h-7 text-xs gap-1">
                    <Mail className="h-3 w-3" />Email
                  </Button>
                  <Button size="sm" variant="ghost" className="h-7 text-xs">View Profile</Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
