"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Plus, Filter, GraduationCap, TrendingUp, TrendingDown, Eye } from "lucide-react";

const students = [
  { id: "1", name: "Emma Wilson", studentId: "STU-001", class: "Grade 10A", gpa: 3.8, attendance: 96, status: "active" },
  { id: "2", name: "Jake Thompson", studentId: "STU-002", class: "Grade 10A", gpa: 3.2, attendance: 88, status: "active" },
  { id: "3", name: "Sophia Lee", studentId: "STU-003", class: "Grade 10B", gpa: 4.0, attendance: 99, status: "active" },
  { id: "4", name: "Carlos Rivera", studentId: "STU-004", class: "Grade 11A", gpa: 2.8, attendance: 72, status: "at-risk" },
  { id: "5", name: "Aisha Patel", studentId: "STU-005", class: "Grade 11B", gpa: 3.9, attendance: 94, status: "active" },
  { id: "6", name: "Michael Chen", studentId: "STU-006", class: "Grade 9A", gpa: 2.4, attendance: 65, status: "at-risk" },
  { id: "7", name: "Olivia Johnson", studentId: "STU-007", class: "Grade 9B", gpa: 3.5, attendance: 91, status: "active" },
  { id: "8", name: "Noah Davis", studentId: "STU-008", class: "Grade 12A", gpa: 3.7, attendance: 95, status: "active" },
];

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.studentId.includes(search) ||
    s.class.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Students</h1>
          <p className="text-sm text-muted-foreground">Manage all enrolled students</p>
        </div>
        <Button><Plus className="h-4 w-4" />Add Student</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Students", value: "1,248", icon: GraduationCap, color: "text-blue-500" },
          { label: "Active", value: "1,218", icon: TrendingUp, color: "text-green-500" },
          { label: "At Risk", value: "7", icon: TrendingDown, color: "text-red-500" },
          { label: "Avg GPA", value: "3.42", icon: TrendingUp, color: "text-purple-500" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border bg-card p-4">
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-sm text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name, ID, or class…" className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Button variant="outline"><Filter className="h-4 w-4" />Filter</Button>
      </div>

      <div className="rounded-xl border overflow-hidden">
        <div className="bg-muted/50 grid grid-cols-7 gap-4 px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          <div className="col-span-2">Student</div>
          <div>Class</div>
          <div>GPA</div>
          <div>Attendance</div>
          <div>Status</div>
          <div>Actions</div>
        </div>
        {filtered.map((s, i) => (
          <div key={s.id} className={`grid grid-cols-7 gap-4 px-4 py-3 items-center hover:bg-muted/30 transition-colors ${i > 0 ? "border-t" : ""}`}>
            <div className="col-span-2 flex items-center gap-2.5">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                  {s.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <Link href={`/dashboard/students/${s.id}`} className="text-sm font-medium hover:text-primary hover:underline underline-offset-2 transition-colors">
                  {s.name}
                </Link>
                <p className="text-xs text-muted-foreground">{s.studentId}</p>
              </div>
            </div>
            <div className="text-sm">{s.class}</div>
            <div>
              <span className={`text-sm font-semibold ${s.gpa >= 3.5 ? "text-green-500" : s.gpa >= 3.0 ? "text-blue-500" : s.gpa >= 2.5 ? "text-orange-500" : "text-red-500"}`}>
                {s.gpa.toFixed(1)}
              </span>
            </div>
            <div>
              <span className={`text-sm font-medium ${s.attendance >= 90 ? "text-green-500" : s.attendance >= 75 ? "text-orange-500" : "text-red-500"}`}>
                {s.attendance}%
              </span>
            </div>
            <div>
              <Badge variant={s.status === "active" ? "success" : "destructive"} className="text-xs">
                {s.status === "active" ? "Active" : "At Risk"}
              </Badge>
            </div>
            <div>
              <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs" asChild>
                <Link href={`/dashboard/students/${s.id}`}>
                  <Eye className="h-3 w-3" />
                  Profile
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
