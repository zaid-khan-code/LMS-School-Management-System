import { StatsCard } from '@/components/dashboard/stats-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Users,
  BookOpen,
  GraduationCap,
  TrendingUp,
  Calendar,
  Award,
  Clock,
  CheckCircle2,
} from 'lucide-react'

const recentActivity = [
  { user: 'Alice Johnson', action: 'submitted assignment', subject: 'Mathematics 101', time: '2 min ago', avatar: 'AJ' },
  { user: 'Bob Smith', action: 'enrolled in course', subject: 'Physics Advanced', time: '15 min ago', avatar: 'BS' },
  { user: 'Carol White', action: 'completed quiz', subject: 'Chemistry Lab', time: '1 hr ago', avatar: 'CW' },
  { user: 'David Lee', action: 'joined class', subject: 'English Literature', time: '2 hr ago', avatar: 'DL' },
  { user: 'Emma Davis', action: 'received grade', subject: 'Biology 201', time: '3 hr ago', avatar: 'ED' },
]

const upcomingEvents = [
  { title: 'Parent-Teacher Conference', date: 'Tomorrow, 2:00 PM', type: 'meeting' },
  { title: 'Math Olympiad', date: 'Dec 15, 9:00 AM', type: 'exam' },
  { title: 'Science Fair', date: 'Dec 18, 10:00 AM', type: 'event' },
  { title: 'End of Term Exams', date: 'Dec 20-24', type: 'exam' },
]

export default function OverviewPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here&apos;s what&apos;s happening at your school.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Students"
          value="1,284"
          change={12}
          icon={Users}
          iconColor="text-blue-500"
          iconBg="bg-blue-500/10"
        />
        <StatsCard
          title="Active Courses"
          value="48"
          change={8}
          icon={BookOpen}
          iconColor="text-green-500"
          iconBg="bg-green-500/10"
        />
        <StatsCard
          title="Teachers"
          value="86"
          change={3}
          icon={GraduationCap}
          iconColor="text-purple-500"
          iconBg="bg-purple-500/10"
        />
        <StatsCard
          title="Avg. Performance"
          value="87.4%"
          change={4.2}
          icon={TrendingUp}
          iconColor="text-orange-500"
          iconBg="bg-orange-500/10"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest actions from students and teachers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <Avatar className="h-9 w-9 flex-shrink-0">
                    <AvatarFallback className="text-xs bg-primary/10 text-primary">
                      {activity.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      <span className="font-semibold">{activity.user}</span>{' '}
                      {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{activity.subject}</p>
                  </div>
                  <span className="text-xs text-muted-foreground flex-shrink-0">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              Upcoming Events
            </CardTitle>
            <CardDescription>Scheduled events this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map((event, idx) => (
                <div key={idx} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    event.type === 'exam' ? 'bg-red-500' :
                    event.type === 'meeting' ? 'bg-blue-500' : 'bg-green-500'
                  }`} />
                  <div>
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                  </div>
                  <Badge variant="outline" className="ml-auto text-xs capitalize">
                    {event.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { label: 'Attendance Today', value: '94.2%', color: 'text-green-500' },
                { label: 'Assignments Due', value: '23', color: 'text-orange-500' },
                { label: 'New Enrollments', value: '12', color: 'text-blue-500' },
                { label: 'Pending Approvals', value: '5', color: 'text-purple-500' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between py-1">
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <span className={`text-sm font-bold ${stat.color}`}>{stat.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-muted-foreground" />
              Top Performers
            </CardTitle>
            <CardDescription>Students with highest grades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Sarah Chen', grade: '98.5%', subject: 'Mathematics' },
                { name: 'James Wilson', grade: '97.2%', subject: 'Science' },
                { name: 'Aisha Patel', grade: '96.8%', subject: 'Literature' },
                { name: 'Marcus Johnson', grade: '95.4%', subject: 'History' },
              ].map((student, idx) => (
                <div key={student.name} className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.subject}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">{student.grade}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
