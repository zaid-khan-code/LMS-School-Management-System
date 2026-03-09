import { StatsCard } from '@/components/dashboard/stats-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, ClipboardList, Award, TrendingUp } from 'lucide-react'

export default function StudentDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <p className="text-muted-foreground">Track your learning progress and assignments</p>
        </div>
        <Badge className="bg-orange-500/10 text-orange-500 border-orange-200">Student</Badge>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Enrolled Courses" value="7" change={2} icon={BookOpen} iconColor="text-blue-500" iconBg="bg-blue-500/10" />
        <StatsCard title="Assignments Due" value="3" change={-2} icon={ClipboardList} iconColor="text-orange-500" iconBg="bg-orange-500/10" />
        <StatsCard title="Overall GPA" value="3.8" change={0.2} icon={Award} iconColor="text-green-500" iconBg="bg-green-500/10" />
        <StatsCard title="Attendance" value="96%" change={1} icon={TrendingUp} iconColor="text-purple-500" iconBg="bg-purple-500/10" />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Current Courses</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Mathematics 101', progress: 75, grade: 'A' },
                { name: 'English Literature', progress: 60, grade: 'B+' },
                { name: 'Physics', progress: 45, grade: 'A-' },
                { name: 'Chemistry', progress: 80, grade: 'A' },
              ].map((course) => (
                <div key={course.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{course.name}</span>
                    <Badge variant="secondary">{course.grade}</Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${course.progress}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground">{course.progress}% complete</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Upcoming Assignments</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { title: 'Math Problem Set 5', due: 'Dec 12', course: 'Mathematics 101', urgent: true },
                { title: 'Essay: Shakespeare', due: 'Dec 15', course: 'English Literature', urgent: false },
                { title: 'Lab Report #3', due: 'Dec 18', course: 'Chemistry', urgent: false },
              ].map((assignment) => (
                <div key={assignment.title} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 ${assignment.urgent ? 'bg-red-500' : 'bg-blue-500'}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{assignment.title}</p>
                    <p className="text-xs text-muted-foreground">{assignment.course}</p>
                  </div>
                  <Badge variant={assignment.urgent ? 'destructive' : 'outline'} className="text-xs">
                    Due {assignment.due}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
