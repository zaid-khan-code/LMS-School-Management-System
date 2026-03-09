import { StatsCard } from '@/components/dashboard/stats-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, BookOpen, ClipboardList, Award } from 'lucide-react'

export default function TeacherDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
          <p className="text-muted-foreground">Manage your classes and track student progress</p>
        </div>
        <Badge className="bg-green-500/10 text-green-500 border-green-200">Teacher</Badge>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="My Students" value="156" change={5} icon={Users} iconColor="text-blue-500" iconBg="bg-blue-500/10" />
        <StatsCard title="Active Courses" value="6" change={1} icon={BookOpen} iconColor="text-green-500" iconBg="bg-green-500/10" />
        <StatsCard title="Pending Grading" value="23" change={-8} icon={ClipboardList} iconColor="text-orange-500" iconBg="bg-orange-500/10" />
        <StatsCard title="Avg Class Score" value="82.3%" change={3.1} icon={Award} iconColor="text-purple-500" iconBg="bg-purple-500/10" />
      </div>
      <Card>
        <CardHeader><CardTitle>My Classes Today</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'Mathematics 101', time: '8:00 - 9:30 AM', room: 'Room 204', students: 32 },
              { name: 'Advanced Calculus', time: '10:00 - 11:30 AM', room: 'Room 108', students: 24 },
              { name: 'Statistics', time: '2:00 - 3:30 PM', room: 'Room 301', students: 28 },
            ].map((cls) => (
              <div key={cls.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">{cls.name}</p>
                  <p className="text-sm text-muted-foreground">{cls.time} • {cls.room}</p>
                </div>
                <Badge variant="secondary">{cls.students} students</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
