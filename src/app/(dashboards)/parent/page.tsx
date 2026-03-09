import { StatsCard } from '@/components/dashboard/stats-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Users, BookOpen, TrendingUp, Bell } from 'lucide-react'

export default function ParentDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Parent Dashboard</h1>
          <p className="text-muted-foreground">Monitor your children&apos;s academic progress</p>
        </div>
        <Badge className="bg-teal-500/10 text-teal-500 border-teal-200">Parent</Badge>
      </div>
      <Card>
        <CardHeader><CardTitle>My Children</CardTitle></CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { name: 'Alex Johnson', grade: 'Grade 10', gpa: '3.8', attendance: '96%' },
              { name: 'Sophie Johnson', grade: 'Grade 7', gpa: '3.5', attendance: '98%' },
            ].map((child) => (
              <div key={child.name} className="flex items-center gap-4 p-4 border rounded-xl">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {child.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold">{child.name}</p>
                  <p className="text-sm text-muted-foreground">{child.grade}</p>
                  <div className="flex gap-3 mt-1">
                    <span className="text-xs"><span className="font-medium">GPA:</span> {child.gpa}</span>
                    <span className="text-xs"><span className="font-medium">Attendance:</span> {child.attendance}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Children" value="2" icon={Users} iconColor="text-teal-500" iconBg="bg-teal-500/10" />
        <StatsCard title="Courses Enrolled" value="12" icon={BookOpen} iconColor="text-blue-500" iconBg="bg-blue-500/10" />
        <StatsCard title="Avg GPA" value="3.65" change={0.15} icon={TrendingUp} iconColor="text-green-500" iconBg="bg-green-500/10" />
        <StatsCard title="Notifications" value="4" icon={Bell} iconColor="text-orange-500" iconBg="bg-orange-500/10" />
      </div>
    </div>
  )
}
