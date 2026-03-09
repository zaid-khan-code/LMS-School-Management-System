import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, BookOpen, Users } from "lucide-react";

const courses = [
  { id: "1", title: "Advanced Mathematics", subject: "Mathematics", grade: "Grade 10", teacher: "Dr. Sarah Johnson", students: 38, progress: 72, color: "from-blue-500 to-blue-700", status: "active" },
  { id: "2", title: "English Literature", subject: "English", grade: "Grade 11", teacher: "Ms. Emma Roberts", students: 32, progress: 88, color: "from-purple-500 to-purple-700", status: "active" },
  { id: "3", title: "Physics", subject: "Science", grade: "Grade 10", teacher: "Mr. David Kim", students: 27, progress: 61, color: "from-orange-500 to-orange-700", status: "active" },
  { id: "4", title: "World History", subject: "History", grade: "Grade 9", teacher: "Ms. Lisa Chen", students: 35, progress: 45, color: "from-green-500 to-green-700", status: "active" },
  { id: "5", title: "Computer Science", subject: "Technology", grade: "Grade 11", teacher: "Mr. Alex Park", students: 22, progress: 90, color: "from-cyan-500 to-cyan-700", status: "active" },
  { id: "6", title: "Chemistry", subject: "Science", grade: "Grade 11", teacher: "Dr. Maya Patel", students: 29, progress: 33, color: "from-red-500 to-red-700", status: "draft" },
];

export default function CoursesPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Courses</h1>
          <p className="text-sm text-muted-foreground">Manage and explore all available courses</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/courses/create"><Plus className="h-4 w-4" />New Course</Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Courses", value: "86", sub: "6 in draft" },
          { label: "Active Students", value: "1,248", sub: "Enrolled across all" },
          { label: "Avg. Completion", value: "67%", sub: "This term" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border bg-card p-4 text-center">
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-sm font-medium mt-0.5">{s.label}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <Link key={course.id} href={`/dashboard/courses/${course.id}`}>
            <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
              {/* Thumbnail */}
              <div className={`h-28 bg-gradient-to-br ${course.color} flex items-center justify-center relative`}>
                <BookOpen className="h-10 w-10 text-white/80" />
                <Badge
                  className="absolute top-3 right-3 text-xs"
                  variant={course.status === "active" ? "secondary" : "outline"}
                >
                  {course.status}
                </Badge>
              </div>
              <CardContent className="p-4 pb-2">
                <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-1">
                  {course.title}
                </h3>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                  <span>{course.subject}</span>
                  <span>·</span>
                  <span>{course.grade}</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Avatar className="h-5 w-5">
                    <AvatarFallback className="text-xs">
                      {course.teacher.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground truncate">{course.teacher}</span>
                </div>
              </CardContent>
              <CardFooter className="px-4 pb-4 pt-2 flex flex-col gap-2">
                <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" />{course.students} students</span>
                  <span>{course.progress}% complete</span>
                </div>
                <Progress value={course.progress} className="h-1.5" />
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
