"use client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  ChevronRight, Mail, Phone, MapPin, Calendar,
  GraduationCap, BookOpen, ClipboardList, BarChart2,
  CheckCircle2, XCircle, Clock, AlertTriangle, MessageSquare,
  TrendingUp, TrendingDown, Edit,
} from "lucide-react";

// ── Demo data for a single student ────────────────────────────────────────────

const student = {
  id: "stu-001",
  name: "Emma Wilson",
  initials: "EW",
  email: "emma.wilson@students.edu",
  grade: "Grade 10 — Section A",
  rollNumber: "2025-10A-021",
  dateOfBirth: "March 15, 2010",
  gender: "Female",
  phone: "+1 555-0101",
  address: "42 Maple Street, Springfield, IL 62701",
  guardian: "Helen Wilson (Mother)",
  guardianPhone: "+1 555-0102",
  enrolledSince: "August 20, 2024",
  gpa: 3.9,
  gpaTrend: "up" as const,
  attendanceRate: 97,
  attendanceTrend: "up" as const,
  completedCourses: 4,
  activeCourses: 6,
  atRisk: false,
};

const courses = [
  { id: "1", name: "Advanced Mathematics", teacher: "Dr. Sarah Johnson", grade: "A", score: 96, progress: 72, status: "active" },
  { id: "2", name: "English Literature", teacher: "Ms. Emma Roberts", grade: "A-", score: 91, progress: 88, status: "active" },
  { id: "3", name: "Physics", teacher: "Mr. Kevin Kim", grade: "B+", score: 88, progress: 61, status: "active" },
  { id: "4", name: "World History", teacher: "Ms. Jessica Chen", grade: "A", score: 94, progress: 45, status: "active" },
  { id: "5", name: "Computer Science", teacher: "Mr. David Park", grade: "A+", score: 99, progress: 100, status: "completed" },
  { id: "6", name: "Chemistry", teacher: "Dr. Anita Patel", grade: "B+", score: 87, progress: 100, status: "completed" },
];

const attendance = [
  { date: "Dec 9", day: "Mon", status: "present" },
  { date: "Dec 8", day: "Fri", status: "present" },
  { date: "Dec 7", day: "Thu", status: "present" },
  { date: "Dec 6", day: "Wed", status: "late" },
  { date: "Dec 5", day: "Tue", status: "present" },
  { date: "Dec 4", day: "Mon", status: "present" },
  { date: "Dec 3", day: "Fri", status: "absent" },
  { date: "Dec 2", day: "Thu", status: "present" },
  { date: "Dec 1", day: "Wed", status: "present" },
  { date: "Nov 30", day: "Tue", status: "present" },
  { date: "Nov 29", day: "Mon", status: "present" },
  { date: "Nov 28", day: "Fri", status: "present" },
  { date: "Nov 27", day: "Thu", status: "present" },
  { date: "Nov 26", day: "Wed", status: "excused" },
];

const assignments = [
  { name: "Calculus Integration Problems", course: "Advanced Mathematics", due: "Dec 10", score: 47, max: 50, status: "graded" },
  { name: "Shakespeare Essay: Hamlet", course: "English Literature", due: "Dec 12", score: null, max: 100, status: "submitted" },
  { name: "Wave Motion Lab Report", course: "Physics", due: "Dec 8", score: null, max: 50, status: "pending" },
  { name: "Renaissance Research Paper", course: "World History", due: "Dec 15", score: null, max: 80, status: "pending" },
  { name: "Python OOP Project", course: "Computer Science", due: "Nov 28", score: 98, max: 100, status: "graded" },
];

const gradeColor = (g: string) =>
  g.startsWith("A") ? "text-green-600 dark:text-green-400" :
  g.startsWith("B") ? "text-blue-600 dark:text-blue-400" :
  "text-orange-600 dark:text-orange-400";

const attendanceIcon = (s: string) => {
  if (s === "present") return <CheckCircle2 className="h-4 w-4 text-green-500" />;
  if (s === "absent") return <XCircle className="h-4 w-4 text-red-500" />;
  if (s === "late") return <Clock className="h-4 w-4 text-orange-500" />;
  return <Clock className="h-4 w-4 text-blue-500" />;
};

export default function StudentProfilePage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground flex items-center gap-1">
        <Link href="/dashboard/students" className="hover:text-foreground">Students</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-medium">{student.name}</span>
      </nav>

      {/* At-risk alert */}
      {student.atRisk && (
        <Alert variant="warning">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>At-Risk Student</AlertTitle>
          <AlertDescription>
            This student has a low attendance rate or GPA below threshold. Consider scheduling a parent meeting.
          </AlertDescription>
        </Alert>
      )}

      {/* Profile header */}
      <div className="flex flex-col sm:flex-row items-start gap-5 p-6 rounded-2xl border bg-card">
        <Avatar className="h-20 w-20 text-2xl shrink-0">
          <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
            {student.initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold">{student.name}</h1>
            <Badge variant="success">Active</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{student.grade} &bull; Roll #{student.rollNumber}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            <div className="text-center p-3 rounded-xl border">
              <div className={`text-2xl font-bold ${student.gpaTrend === "up" ? "text-green-500" : "text-orange-500"}`}>
                {student.gpa}
              </div>
              <div className="text-xs text-muted-foreground flex items-center justify-center gap-0.5 mt-0.5">
                {student.gpaTrend === "up"
                  ? <TrendingUp className="h-3 w-3 text-green-500" />
                  : <TrendingDown className="h-3 w-3 text-orange-500" />
                }
                GPA
              </div>
            </div>
            <div className="text-center p-3 rounded-xl border">
              <div className={`text-2xl font-bold ${student.attendanceRate >= 90 ? "text-green-500" : "text-red-500"}`}>
                {student.attendanceRate}%
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">Attendance</div>
            </div>
            <div className="text-center p-3 rounded-xl border">
              <div className="text-2xl font-bold text-blue-500">{student.activeCourses}</div>
              <div className="text-xs text-muted-foreground mt-0.5">Active Courses</div>
            </div>
            <div className="text-center p-3 rounded-xl border">
              <div className="text-2xl font-bold text-purple-500">{student.completedCourses}</div>
              <div className="text-xs text-muted-foreground mt-0.5">Completed</div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm">
            <MessageSquare className="h-4 w-4" />
            Message
          </Button>
          <Button size="sm">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
        </TabsList>

        {/* ── Overview ── */}
        <TabsContent value="overview" className="mt-4">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {[
                  { icon: Mail, label: "Email", value: student.email },
                  { icon: Phone, label: "Phone", value: student.phone },
                  { icon: MapPin, label: "Address", value: student.address },
                  { icon: Calendar, label: "Date of Birth", value: student.dateOfBirth },
                  { icon: GraduationCap, label: "Enrolled Since", value: student.enrolledSince },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-3">
                    <Icon className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Guardian / Parent</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {[
                  { icon: GraduationCap, label: "Guardian", value: student.guardian },
                  { icon: Phone, label: "Guardian Phone", value: student.guardianPhone },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-3">
                    <Icon className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="font-medium">{value}</p>
                    </div>
                  </div>
                ))}
                <Separator className="my-2" />
                <Button variant="outline" size="sm" className="w-full">
                  <MessageSquare className="h-4 w-4" />
                  Contact Guardian
                </Button>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Academic Summary</CardTitle>
                <CardDescription>Course progress this term</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {courses.filter((c) => c.status === "active").map((c) => (
                    <div key={c.id} className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium truncate">{c.name}</span>
                        <span className={`font-bold text-sm ${gradeColor(c.grade)}`}>{c.grade}</span>
                      </div>
                      <Progress value={c.progress} className="h-1.5" />
                      <p className="text-xs text-muted-foreground">{c.progress}% complete &bull; {c.teacher}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ── Courses ── */}
        <TabsContent value="courses" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Enrolled Courses</CardTitle>
            </CardHeader>
            <CardContent className="divide-y">
              {courses.map((c) => (
                <div key={c.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <BookOpen className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.teacher}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-right">
                    <div className="hidden sm:block w-24">
                      <Progress value={c.progress} className="h-1.5" />
                      <p className="text-xs text-muted-foreground mt-0.5">{c.progress}%</p>
                    </div>
                    <div className={`text-lg font-bold ${gradeColor(c.grade)}`}>{c.grade}</div>
                    <Badge variant={c.status === "completed" ? "success" : "default"} className="text-xs">
                      {c.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Attendance ── */}
        <TabsContent value="attendance" className="mt-4 space-y-4">
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "Present", value: attendance.filter((a) => a.status === "present").length, color: "text-green-500" },
              { label: "Absent", value: attendance.filter((a) => a.status === "absent").length, color: "text-red-500" },
              { label: "Late", value: attendance.filter((a) => a.status === "late").length, color: "text-orange-500" },
              { label: "Excused", value: attendance.filter((a) => a.status === "excused").length, color: "text-blue-500" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border bg-card p-3 text-center">
                <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Recent Attendance (Last 14 days)</CardTitle>
            </CardHeader>
            <CardContent className="divide-y">
              {attendance.map((a, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    {attendanceIcon(a.status)}
                    <div>
                      <p className="text-sm font-medium">{a.date}</p>
                      <p className="text-xs text-muted-foreground">{a.day}</p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      a.status === "present" ? "success" :
                      a.status === "absent" ? "destructive" :
                      a.status === "late" ? "warning" : "default"
                    }
                    className="text-xs capitalize"
                  >
                    {a.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Assignments ── */}
        <TabsContent value="assignments" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Assignments</CardTitle>
            </CardHeader>
            <CardContent className="divide-y">
              {assignments.map((a, i) => (
                <div key={i} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <ClipboardList className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div>
                      <p className="text-sm font-medium">{a.name}</p>
                      <p className="text-xs text-muted-foreground">{a.course} &bull; Due {a.due}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {a.score !== null && (
                      <span className="text-sm font-semibold">
                        {a.score}/{a.max} ({Math.round((a.score / a.max) * 100)}%)
                      </span>
                    )}
                    <Badge
                      variant={
                        a.status === "graded" ? "success" :
                        a.status === "submitted" ? "default" : "warning"
                      }
                      className="text-xs capitalize"
                    >
                      {a.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick links */}
      <div className="flex items-center gap-3">
        <BarChart2 className="h-4 w-4 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          View full academic history and generate a student report card from the{" "}
          <Link href="/dashboard/reports" className="text-primary underline underline-offset-2">Reports</Link>{" "}
          page.
        </p>
      </div>
    </div>
  );
}
