'use client'

import { useState } from 'react'
import { Save, CheckCircle2, XCircle, Clock, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

type AttendanceStatus = 'present' | 'absent' | 'late'

interface StudentRow {
  id: string
  name: string
  roll_no: string
  status: AttendanceStatus | null
}

const classStudents: StudentRow[] = [
  { id: '1', name: 'Alice Johnson', roll_no: '01', status: null },
  { id: '2', name: 'Bob Martinez', roll_no: '02', status: null },
  { id: '3', name: 'Carol White', roll_no: '03', status: null },
  { id: '4', name: 'David Lee', roll_no: '04', status: null },
  { id: '5', name: 'Eva Chen', roll_no: '05', status: null },
  { id: '6', name: 'Frank Brown', roll_no: '06', status: null },
  { id: '7', name: 'Grace Kim', roll_no: '07', status: null },
  { id: '8', name: 'Henry Wilson', roll_no: '08', status: null },
  { id: '9', name: 'Iris Taylor', roll_no: '09', status: null },
  { id: '10', name: 'Jack Davis', roll_no: '10', status: null },
  { id: '11', name: 'Karen Moore', roll_no: '11', status: null },
  { id: '12', name: 'Liam Thompson', roll_no: '12', status: null },
  { id: '13', name: 'Mia Anderson', roll_no: '13', status: null },
  { id: '14', name: 'Noah Jackson', roll_no: '14', status: null },
  { id: '15', name: 'Olivia Harris', roll_no: '15', status: null },
]

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
}

function getAvatarColor(name: string) {
  const colors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-amber-500', 'bg-pink-500', 'bg-cyan-500']
  return colors[name.charCodeAt(0) % colors.length]
}

const statusConfig = {
  present: { label: 'Present', icon: CheckCircle2, activeClass: 'bg-green-500 text-white border-green-500 hover:bg-green-600', inactiveClass: 'border-green-200 text-green-600 hover:bg-green-50' },
  absent: { label: 'Absent', icon: XCircle, activeClass: 'bg-red-500 text-white border-red-500 hover:bg-red-600', inactiveClass: 'border-red-200 text-red-600 hover:bg-red-50' },
  late: { label: 'Late', icon: Clock, activeClass: 'bg-amber-500 text-white border-amber-500 hover:bg-amber-600', inactiveClass: 'border-amber-200 text-amber-600 hover:bg-amber-50' },
}

export default function AttendancePage() {
  const [students, setStudents] = useState<StudentRow[]>(classStudents)
  const [selectedClass, setSelectedClass] = useState('10-A')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [saved, setSaved] = useState(false)

  const setStatus = (id: string, status: AttendanceStatus) => {
    setSaved(false)
    setStudents((prev) => prev.map((s) => s.id === id ? { ...s, status } : s))
  }

  const markAllPresent = () => {
    setSaved(false)
    setStudents((prev) => prev.map((s) => ({ ...s, status: 'present' as AttendanceStatus })))
  }

  const handleSave = () => setSaved(true)

  const presentCount = students.filter((s) => s.status === 'present').length
  const absentCount = students.filter((s) => s.status === 'absent').length
  const lateCount = students.filter((s) => s.status === 'late').length
  const unmarked = students.filter((s) => s.status === null).length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
        <p className="text-muted-foreground">Mark and track student attendance</p>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="p-5">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="space-y-2">
              <Label>Class</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {['9-A', '9-B', '10-A', '10-B', '11-A', '11-B', '12-A', '12-B'].map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="flex h-10 w-44 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <Button variant="outline" onClick={markAllPresent} className="gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Mark All Present
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: students.length, icon: Users, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Present', value: presentCount, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100' },
          { label: 'Absent', value: absentCount, icon: XCircle, color: 'text-red-500', bg: 'bg-red-100' },
          { label: 'Late', value: lateCount, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100' },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', stat.bg)}>
                  <stat.icon className={cn('h-5 w-5', stat.color)} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className={cn('text-2xl font-bold', stat.color)}>{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Student List */}
      <Card>
        <CardHeader className="flex-row items-center justify-between pb-4">
          <CardTitle>Class {selectedClass} — {new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</CardTitle>
          {unmarked > 0 && <span className="text-sm text-amber-600 font-medium">{unmarked} unmarked</span>}
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {students.map((student) => (
              <div key={student.id} className="flex items-center gap-4 px-6 py-4 hover:bg-muted/20 transition-colors">
                {/* Roll + Avatar */}
                <span className="text-xs text-muted-foreground font-mono w-6 text-center flex-shrink-0">{student.roll_no}</span>
                <div className={cn('flex h-9 w-9 items-center justify-center rounded-full text-white text-xs font-semibold flex-shrink-0', getAvatarColor(student.name))}>
                  {getInitials(student.name)}
                </div>
                <span className="flex-1 font-medium text-sm">{student.name}</span>

                {/* Status Buttons */}
                <div className="flex gap-2">
                  {(['present', 'absent', 'late'] as AttendanceStatus[]).map((s) => {
                    const cfg = statusConfig[s]
                    const isActive = student.status === s
                    return (
                      <button
                        key={s}
                        onClick={() => setStatus(student.id, s)}
                        className={cn(
                          'flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all',
                          isActive ? cfg.activeClass : cfg.inactiveClass
                        )}
                      >
                        <cfg.icon className="h-3.5 w-3.5" />
                        {cfg.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Save */}
      <div className="flex items-center justify-between">
        {saved && (
          <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
            <CheckCircle2 className="h-4 w-4" />
            Attendance saved successfully!
          </div>
        )}
        {!saved && <div />}
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Save Attendance
        </Button>
      </div>
    </div>
  )
}
