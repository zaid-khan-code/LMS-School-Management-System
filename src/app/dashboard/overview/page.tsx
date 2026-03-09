import { StatsCard } from "@/components/dashboard/stats-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Users, BookOpen, DollarSign, TrendingUp, CheckCircle2,
  Clock, AlertCircle, GraduationCap, UserCheck,
} from "lucide-react";

const recentActivity = [
  { action: "New student enrolled", who: "Emma Wilson", time: "2 min ago", type: "success" },
  { action: "Assignment submitted", who: "Jake Thompson", time: "15 min ago", type: "info" },
  { action: "Fee payment received", who: "Park Family", time: "1 hr ago", type: "success" },
  { action: "Quiz completed — 92%", who: "Sophia Lee", time: "2 hr ago", type: "success" },
  { action: "Attendance marked absent", who: "Carlos Rivera", time: "3 hr ago", type: "warning" },
  { action: "Live class ended", who: "Mr. Peterson (Math)", time: "4 hr ago", type: "info" },
];

const topCourses = [
  { name: "Advanced Mathematics", students: 38, completion: 72, color: "bg-blue-500" },
  { name: "English Literature", students: 32, completion: 88, color: "bg-purple-500" },
  { name: "Physics", students: 27, completion: 61, color: "bg-orange-500" },
  { name: "World History", students: 35, completion: 45, color: "bg-green-500" },
];

const upcomingExams = [
  { subject: "Mathematics Final", date: "Dec 15", class: "Grade 10A", room: "Hall B" },
  { subject: "Science Mid-Term", date: "Dec 12", class: "Grade 9B", room: "Room 204" },
  { subject: "English Essay", date: "Dec 10", class: "Grade 11", room: "Room 101" },
];

export default function OverviewPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Good morning, Sarah! 👋</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Here&apos;s what&apos;s happening at Greenfield Academy today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Students"
          value="1,248"
          change="+24 this month"
          changeType="positive"
          icon={<Users className="h-4 w-4 text-blue-500" />}
          iconBg="bg-blue-500/10"
        />
        <StatsCard
          title="Active Courses"
          value="86"
          change="+3 new courses"
          changeType="positive"
          icon={<BookOpen className="h-4 w-4 text-green-500" />}
          iconBg="bg-green-500/10"
        />
        <StatsCard
          title="Fee Collected"
          value="$84,200"
          change="89% of target"
          changeType="positive"
          icon={<DollarSign className="h-4 w-4 text-emerald-500" />}
          iconBg="bg-emerald-500/10"
        />
        <StatsCard
          title="Avg. Attendance"
          value="94.2%"
          change="+1.4% vs last week"
          changeType="positive"
          icon={<TrendingUp className="h-4 w-4 text-purple-500" />}
          iconBg="bg-purple-500/10"
        />
      </div>

      {/* Secondary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Teachers"
          value="68"
          change="All active"
          changeType="neutral"
          icon={<UserCheck className="h-4 w-4 text-indigo-500" />}
          iconBg="bg-indigo-500/10"
        />
        <StatsCard
          title="Assignments Due"
          value="12"
          change="4 overdue"
          changeType="negative"
          icon={<Clock className="h-4 w-4 text-orange-500" />}
          iconBg="bg-orange-500/10"
        />
        <StatsCard
          title="Avg. GPA"
          value="3.42"
          change="+0.08 vs last term"
          changeType="positive"
          icon={<GraduationCap className="h-4 w-4 text-pink-500" />}
          iconBg="bg-pink-500/10"
        />
        <StatsCard
          title="At-Risk Students"
          value="7"
          change="Needs attention"
          changeType="negative"
          icon={<AlertCircle className="h-4 w-4 text-red-500" />}
          iconBg="bg-red-500/10"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Activity */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Recent Activity</CardTitle>
            <CardDescription>Last 24 hours across all modules</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {recentActivity.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${
                    item.type === "success" ? "bg-green-500" :
                    item.type === "warning" ? "bg-orange-500" : "bg-blue-500"
                  }`} />
                  <Avatar className="h-7 w-7 shrink-0">
                    <AvatarFallback className="text-xs">
                      {item.who.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.who}</p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{item.time}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Upcoming exams */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Upcoming Exams</CardTitle>
            <CardDescription>Next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {upcomingExams.map((exam, i) => (
                <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">DEC</div>
                    <div className="text-lg font-bold leading-none">{exam.date.split(" ")[1]}</div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{exam.subject}</p>
                    <p className="text-xs text-muted-foreground">{exam.class} • {exam.room}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Course progress */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Top Courses by Completion</CardTitle>
          <CardDescription>Student completion rates this term</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {topCourses.map((course) => (
              <div key={course.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{course.name}</span>
                  <span className="text-muted-foreground">{course.completion}%</span>
                </div>
                <Progress value={course.completion} className="h-2" />
                <p className="text-xs text-muted-foreground">{course.students} students enrolled</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Mark Attendance", icon: CheckCircle2, href: "/dashboard/attendance", color: "text-green-500 bg-green-500/10" },
          { label: "Create Course", icon: BookOpen, href: "/dashboard/courses/create", color: "text-blue-500 bg-blue-500/10" },
          { label: "Add Student", icon: Users, href: "/dashboard/students", color: "text-purple-500 bg-purple-500/10" },
          { label: "Generate Report", icon: TrendingUp, href: "/dashboard/reports", color: "text-orange-500 bg-orange-500/10" },
        ].map((action) => (
          <a
            key={action.label}
            href={action.href}
            className="flex flex-col items-center gap-2 rounded-xl border p-4 hover:shadow-sm hover:border-primary/30 transition-all text-center cursor-pointer"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${action.color}`}>
              <action.icon className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium">{action.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
