import { StatsCard } from '@/components/dashboard/stats-card'
import { Badge } from '@/components/ui/badge'
import { Users, BookOpen, GraduationCap, TrendingUp } from 'lucide-react'

export default function SchoolAdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">School Dashboard</h1>
          <p className="text-muted-foreground">Manage your school&apos;s operations</p>
        </div>
        <Badge className="bg-blue-500/10 text-blue-500 border-blue-200">School Admin</Badge>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Students" value="1,284" change={12} icon={Users} iconColor="text-blue-500" iconBg="bg-blue-500/10" />
        <StatsCard title="Courses" value="48" change={8} icon={BookOpen} iconColor="text-green-500" iconBg="bg-green-500/10" />
        <StatsCard title="Teachers" value="86" change={3} icon={GraduationCap} iconColor="text-purple-500" iconBg="bg-purple-500/10" />
        <StatsCard title="Avg Performance" value="87.4%" change={4.2} icon={TrendingUp} iconColor="text-orange-500" iconBg="bg-orange-500/10" />
      </div>
    </div>
  )
}
