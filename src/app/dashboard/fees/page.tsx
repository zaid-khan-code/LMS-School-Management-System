'use client'

import { useState } from 'react'
import { CreditCard, CheckCircle2, AlertCircle, Clock, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type FeeStatus = 'paid' | 'pending' | 'overdue'

interface Fee {
  id: string
  type: string
  amount: number
  due_date: string
  status: FeeStatus
  description: string
}

interface Payment {
  id: string
  date: string
  description: string
  amount: number
  reference: string
  status: 'completed' | 'processing'
}

const mockFees: Fee[] = [
  { id: '1', type: 'Tuition Fee', amount: 1500, due_date: '2024-12-31', status: 'pending', description: 'Q4 2024 Tuition' },
  { id: '2', type: 'Library Fee', amount: 50, due_date: '2024-11-30', status: 'overdue', description: 'Annual library access' },
  { id: '3', type: 'Laboratory Fee', amount: 120, due_date: '2024-12-15', status: 'pending', description: 'Science lab usage' },
  { id: '4', type: 'Sports Fee', amount: 80, due_date: '2024-12-20', status: 'paid', description: 'Sports equipment & facilities' },
  { id: '5', type: 'Activity Fee', amount: 60, due_date: '2025-01-15', status: 'pending', description: 'Extracurricular activities' },
]

const mockPayments: Payment[] = [
  { id: 'p1', date: '2024-09-01', description: 'Q3 Tuition Fee', amount: 1500, reference: 'PAY-2024-001', status: 'completed' },
  { id: 'p2', date: '2024-09-05', description: 'Sports Fee', amount: 80, reference: 'PAY-2024-002', status: 'completed' },
  { id: 'p3', date: '2024-06-01', description: 'Q2 Tuition Fee', amount: 1500, reference: 'PAY-2024-003', status: 'completed' },
  { id: 'p4', date: '2024-06-10', description: 'Technology Fee', amount: 100, reference: 'PAY-2024-004', status: 'completed' },
]

const statusConfig: Record<FeeStatus, { label: string; class: string; icon: React.ComponentType<{ className?: string }> }> = {
  paid: { label: 'Paid', class: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle2 },
  pending: { label: 'Pending', class: 'bg-amber-100 text-amber-700 border-amber-200', icon: Clock },
  overdue: { label: 'Overdue', class: 'bg-red-100 text-red-700 border-red-200', icon: AlertCircle },
}

export default function FeesPage() {
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const total = mockFees.reduce((s, f) => s + f.amount, 0)
  const paid = mockFees.filter((f) => f.status === 'paid').reduce((s, f) => s + f.amount, 0)
  const pending = mockFees.filter((f) => f.status === 'pending').reduce((s, f) => s + f.amount, 0)
  const overdue = mockFees.filter((f) => f.status === 'overdue').reduce((s, f) => s + f.amount, 0)

  return (
    <div className="space-y-8">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-lg bg-foreground text-background px-4 py-3 shadow-lg text-sm font-medium">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Fee Management</h1>
        <p className="text-muted-foreground">Track and manage your school fees</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Fees', value: total, color: 'text-primary', bg: 'from-primary/10 to-primary/5 border-primary/20', icon: CreditCard },
          { label: 'Paid', value: paid, color: 'text-green-600', bg: 'from-green-50 to-emerald-50 border-green-200', icon: CheckCircle2 },
          { label: 'Pending', value: pending, color: 'text-amber-600', bg: 'from-amber-50 to-yellow-50 border-amber-200', icon: Clock },
          { label: 'Overdue', value: overdue, color: 'text-red-500', bg: 'from-red-50 to-rose-50 border-red-200', icon: AlertCircle },
        ].map((stat) => (
          <Card key={stat.label} className={cn('bg-gradient-to-br border', stat.bg)}>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className={cn('h-4 w-4', stat.color)} />
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
              <p className={cn('text-2xl font-bold', stat.color)}>${stat.value.toLocaleString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Fee Structure */}
      <Card>
        <CardHeader>
          <CardTitle>Fee Structure</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Fee Type</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Amount</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Due Date</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody>
                {mockFees.map((fee) => {
                  const s = statusConfig[fee.status]
                  return (
                    <tr key={fee.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4 font-medium">{fee.type}</td>
                      <td className="px-6 py-4 text-muted-foreground">{fee.description}</td>
                      <td className="px-6 py-4 font-semibold">${fee.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {new Date(fee.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={cn('text-xs border gap-1', s.class)}>
                          <s.icon className="h-3 w-3" />
                          {s.label}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        {fee.status !== 'paid' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => showToast(`Redirecting to payment for ${fee.type}...`)}
                            className="gap-1.5 text-xs h-8"
                          >
                            <CreditCard className="h-3.5 w-3.5" />
                            Pay Now
                          </Button>
                        )}
                        {fee.status === 'paid' && (
                          <Button size="sm" variant="ghost" className="gap-1.5 text-xs h-8 text-muted-foreground" onClick={() => showToast('Receipt downloaded')}>
                            <Download className="h-3.5 w-3.5" />
                            Receipt
                          </Button>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Amount</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Reference</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockPayments.map((p) => (
                  <tr key={p.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 text-muted-foreground">{new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                    <td className="px-6 py-4 font-medium">{p.description}</td>
                    <td className="px-6 py-4 font-semibold text-green-600">${p.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-muted-foreground font-mono text-xs">{p.reference}</td>
                    <td className="px-6 py-4">
                      <Badge className="text-xs border bg-green-100 text-green-700 border-green-200 gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Completed
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
