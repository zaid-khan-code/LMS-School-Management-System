import { StatsCard } from '@/components/dashboard/stats-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ClipboardList, Users, Calendar, CheckCircle2 } from 'lucide-react'

export default function StaffDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Staff Dashboard</h1>
          <p className="text-muted-foreground">Manage administrative tasks and school operations</p>
        </div>
        <Badge className="bg-gray-500/10 text-gray-500 border-gray-200">Staff</Badge>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Open Tasks" value="12" change={-3} icon={ClipboardList} iconColor="text-blue-500" iconBg="bg-blue-500/10" />
        <StatsCard title="Staff Members" value="45" icon={Users} iconColor="text-green-500" iconBg="bg-green-500/10" />
        <StatsCard title="Events This Week" value="8" icon={Calendar} iconColor="text-purple-500" iconBg="bg-purple-500/10" />
        <StatsCard title="Completed Today" value="7" change={40} icon={CheckCircle2} iconColor="text-orange-500" iconBg="bg-orange-500/10" />
      </div>
      <Card>
        <CardHeader><CardTitle>Today&apos;s Tasks</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { task: 'Process new student enrollments', priority: 'high', status: 'pending' },
              { task: 'Update attendance records', priority: 'medium', status: 'in-progress' },
              { task: 'Prepare monthly report', priority: 'medium', status: 'pending' },
              { task: 'Send parent notifications', priority: 'low', status: 'completed' },
              { task: 'Schedule parent-teacher meetings', priority: 'high', status: 'pending' },
            ].map((item) => (
              <div key={item.task} className="flex items-center gap-3 p-3 rounded-lg border">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  item.status === 'completed' ? 'bg-green-500' :
                  item.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-400'
                }`} />
                <span className={`flex-1 text-sm ${item.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                  {item.task}
                </span>
                <Badge
                  variant={item.priority === 'high' ? 'destructive' : item.priority === 'medium' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {item.priority}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
