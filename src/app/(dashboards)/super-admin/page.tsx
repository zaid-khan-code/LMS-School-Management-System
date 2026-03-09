import { StatsCard } from '@/components/dashboard/stats-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Building2, Users, DollarSign, TrendingUp, Globe, Shield } from 'lucide-react'

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
          <p className="text-muted-foreground">Global overview of all schools and system health</p>
        </div>
        <Badge className="bg-purple-500/10 text-purple-500 border-purple-200">Super Admin</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Schools" value="524" change={15} icon={Building2} iconColor="text-purple-500" iconBg="bg-purple-500/10" />
        <StatsCard title="Total Users" value="98,432" change={22} icon={Users} iconColor="text-blue-500" iconBg="bg-blue-500/10" />
        <StatsCard title="Monthly Revenue" value="$284K" change={18} icon={DollarSign} iconColor="text-green-500" iconBg="bg-green-500/10" />
        <StatsCard title="System Uptime" value="99.9%" change={0.1} icon={TrendingUp} iconColor="text-orange-500" iconBg="bg-orange-500/10" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Globe className="h-5 w-5" /> Schools by Subscription</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { tier: 'Enterprise', count: 52, color: 'bg-purple-500' },
                { tier: 'Pro', count: 148, color: 'bg-blue-500' },
                { tier: 'Basic', count: 224, color: 'bg-green-500' },
                { tier: 'Free', count: 100, color: 'bg-gray-500' },
              ].map((item) => (
                <div key={item.tier} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="flex-1 text-sm">{item.tier}</span>
                  <span className="font-bold">{item.count}</span>
                  <span className="text-sm text-muted-foreground">schools</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" /> System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { label: 'API Response Time', value: '142ms', status: 'good' },
                { label: 'Database Load', value: '23%', status: 'good' },
                { label: 'Storage Used', value: '67%', status: 'warning' },
                { label: 'Active Sessions', value: '12,482', status: 'good' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${item.status === 'good' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                    <span className="font-medium text-sm">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
