import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Play, FileText, Clock, Users, BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";


const modules = [
  { title: "Module 1: Foundations", lessons: [
    { title: "Introduction & Overview", duration: "12 min", completed: true, type: "video" },
    { title: "Core Concepts", duration: "18 min", completed: true, type: "video" },
    { title: "Practice Problems Set 1", duration: "25 min", completed: true, type: "exercise" },
  ]},
  { title: "Module 2: Advanced Topics", lessons: [
    { title: "Differential Equations", duration: "22 min", completed: true, type: "video" },
    { title: "Integration Techniques", duration: "30 min", completed: false, type: "video" },
    { title: "Mid-Module Quiz", duration: "15 min", completed: false, type: "quiz" },
  ]},
  { title: "Module 3: Applications", lessons: [
    { title: "Real-World Problems", duration: "20 min", completed: false, type: "video" },
    { title: "Case Studies", duration: "35 min", completed: false, type: "reading" },
    { title: "Final Assessment", duration: "45 min", completed: false, type: "quiz" },
  ]},
];

export default function CourseDetailPage() {
  const progress = 55;
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground flex items-center gap-1">
        <Link href="/dashboard/courses" className="hover:text-foreground">Courses</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-medium">Advanced Mathematics</span>
      </nav>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-4">
          {/* Course header */}
          <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 p-8 text-white">
            <Badge variant="secondary" className="mb-3 bg-white/20 text-white border-0">Mathematics • Grade 10</Badge>
            <h1 className="text-2xl font-bold mb-2">Advanced Mathematics</h1>
            <p className="opacity-80 text-sm mb-4">
              Master calculus, algebra, and advanced problem-solving techniques with AI-powered practice.
            </p>
            <div className="flex items-center gap-4 text-sm opacity-90">
              <span className="flex items-center gap-1"><Users className="h-4 w-4" />38 students</span>
              <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" />9 lessons</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" />3.5 hours</span>
            </div>
          </div>

          {/* Current lesson */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Continue Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl bg-muted/50 aspect-video flex items-center justify-center mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-700/20" />
                <button className="relative w-14 h-14 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all hover:scale-105">
                  <Play className="h-6 w-6 text-blue-600 ml-1" />
                </button>
              </div>
              <h3 className="font-semibold">Integration Techniques</h3>
              <p className="text-sm text-muted-foreground mt-1">Module 2 · Lesson 2 of 3</p>
              <div className="flex gap-2 mt-4">
                <Button size="sm"><Play className="h-3 w-3" />Play Video</Button>
                <Button size="sm" variant="outline">Download Notes</Button>
              </div>
            </CardContent>
          </Card>

          {/* Modules list */}
          <div className="space-y-3">
            {modules.map((mod, mi) => (
              <Card key={mi}>
                <CardHeader className="pb-2 pt-4">
                  <h3 className="font-semibold text-sm">{mod.title}</h3>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-1">
                    {mod.lessons.map((lesson, li) => (
                      <li key={li} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${lesson.completed ? "bg-green-500/10" : "bg-muted"}`}>
                          {lesson.completed
                            ? <CheckCircle2 className="h-4 w-4 text-green-500" />
                            : lesson.type === "video" ? <Play className="h-3 w-3 text-muted-foreground" />
                            : lesson.type === "quiz" ? <FileText className="h-3 w-3 text-muted-foreground" />
                            : <BookOpen className="h-3 w-3 text-muted-foreground" />}
                        </div>
                        <span className={`flex-1 text-sm ${lesson.completed ? "text-muted-foreground line-through" : ""}`}>
                          {lesson.title}
                        </span>
                        <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Your Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-1">{progress}%</div>
              <Progress value={progress} className="h-2 mb-3" />
              <p className="text-xs text-muted-foreground">5 of 9 lessons completed</p>
              <div className="mt-4 space-y-2 text-sm">
                {[
                  { label: "Assignments Done", value: "3/4" },
                  { label: "Quiz Average", value: "88%" },
                  { label: "Time Spent", value: "2h 14m" },
                ].map((s) => (
                  <div key={s.label} className="flex justify-between">
                    <span className="text-muted-foreground">{s.label}</span>
                    <span className="font-medium">{s.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Instructor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center font-bold text-blue-500">SJ</div>
                <div>
                  <p className="font-medium text-sm">Dr. Sarah Johnson</p>
                  <p className="text-xs text-muted-foreground">Mathematics Dept.</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">Message Teacher</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

}
