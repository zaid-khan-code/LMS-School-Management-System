'use client'

import { useState } from 'react'
import { UserPlus, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DataTable } from '@/components/data-table/data-table'
import { cn } from '@/lib/utils'
import type { ColumnDef } from '@/components/data-table/data-table'

interface Student {
  id: string
  name: string
  student_id: string
  class: string
  grade: string
  attendance: number
  gpa: number
  status: 'active' | 'inactive'
  email: string
}

const mockStudents: Student[] = [
  { id: '1', name: 'Alice Johnson', student_id: 'STU-2024-001', class: '10-A', grade: 'Grade 10', attendance: 96, gpa: 3.8, status: 'active', email: 'alice@school.edu' },
  { id: '2', name: 'Bob Martinez', student_id: 'STU-2024-002', class: '10-B', grade: 'Grade 10', attendance: 88, gpa: 3.2, status: 'active', email: 'bob@school.edu' },
  { id: '3', name: 'Carol White', student_id: 'STU-2024-003', class: '11-A', grade: 'Grade 11', attendance: 72, gpa: 2.7, status: 'inactive', email: 'carol@school.edu' },
  { id: '4', name: 'David Lee', student_id: 'STU-2024-004', class: '9-A', grade: 'Grade 9', attendance: 100, gpa: 4.0, status: 'active', email: 'david@school.edu' },
  { id: '5', name: 'Eva Chen', student_id: 'STU-2024-005', class: '11-B', grade: 'Grade 11', attendance: 94, gpa: 3.6, status: 'active', email: 'eva@school.edu' },
  { id: '6', name: 'Frank Brown', student_id: 'STU-2024-006', class: '10-A', grade: 'Grade 10', attendance: 81, gpa: 3.1, status: 'active', email: 'frank@school.edu' },
  { id: '7', name: 'Grace Kim', student_id: 'STU-2024-007', class: '12-A', grade: 'Grade 12', attendance: 98, gpa: 3.9, status: 'active', email: 'grace@school.edu' },
  { id: '8', name: 'Henry Wilson', student_id: 'STU-2024-008', class: '9-B', grade: 'Grade 9', attendance: 65, gpa: 2.4, status: 'inactive', email: 'henry@school.edu' },
  { id: '9', name: 'Iris Taylor', student_id: 'STU-2024-009', class: '12-B', grade: 'Grade 12', attendance: 91, gpa: 3.5, status: 'active', email: 'iris@school.edu' },
  { id: '10', name: 'Jack Davis', student_id: 'STU-2024-010', class: '11-A', grade: 'Grade 11', attendance: 87, gpa: 3.3, status: 'active', email: 'jack@school.edu' },
]

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
}

function getAvatarColor(name: string) {
  const colors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-amber-500', 'bg-pink-500', 'bg-cyan-500']
  return colors[name.charCodeAt(0) % colors.length]
}

export default function StudentsPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [gradeFilter, setGradeFilter] = useState('all')
  const [formData, setFormData] = useState({ name: '', email: '', class: '', grade: '' })

  const filtered = gradeFilter === 'all' ? mockStudents : mockStudents.filter((s) => s.grade === gradeFilter)

  const activeCount = mockStudents.filter((s) => s.status === 'active').length
  const avgAttendance = Math.round(mockStudents.reduce((sum, s) => sum + s.attendance, 0) / mockStudents.length)

  const columns: ColumnDef<Student>[] = [
    {
      id: 'name',
      header: 'Student',
      accessorKey: 'name',
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className={cn('flex h-8 w-8 items-center justify-center rounded-full text-white text-xs font-semibold flex-shrink-0', getAvatarColor(row.name))}>
            {getInitials(row.name)}
          </div>
          <div>
            <p className="font-medium text-sm">{row.name}</p>
            <p className="text-xs text-muted-foreground">{row.email}</p>
          </div>
        </div>
      ),
    },
    { id: 'student_id', header: 'Student ID', accessorKey: 'student_id', sortable: true },
    { id: 'class', header: 'Class', accessorKey: 'class', sortable: true },
    {
      id: 'attendance',
      header: 'Attendance',
      accessorKey: 'attendance',
      sortable: true,
      cell: (row) => (
        <span className={cn('font-semibold text-sm', row.attendance >= 90 ? 'text-green-600' : row.attendance >= 75 ? 'text-amber-600' : 'text-red-500')}>
          {row.attendance}%
        </span>
      ),
    },
    {
      id: 'gpa',
      header: 'GPA',
      accessorKey: 'gpa',
      sortable: true,
      cell: (row) => <span className="font-semibold">{row.gpa.toFixed(1)}</span>,
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => (
        <Badge className={cn('text-xs border', row.status === 'active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200')}>
          {row.status === 'active' ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground">Manage and monitor student records</p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Students', value: mockStudents.length, color: 'text-primary' },
          { label: 'Active', value: activeCount, color: 'text-green-600' },
          { label: 'New This Month', value: 3, color: 'text-blue-600' },
          { label: 'Avg Attendance', value: `${avgAttendance}%`, color: 'text-amber-600' },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className={cn('text-2xl font-bold mt-1', stat.color)}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <Select value={gradeFilter} onValueChange={setGradeFilter}>
          <SelectTrigger className="w-44">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by grade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Grades</SelectItem>
            {['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map((g) => (
              <SelectItem key={g} value={g}>{g}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <DataTable<Student>
        columns={columns}
        data={filtered}
        searchPlaceholder="Search students by name or ID..."
        searchKeys={['name', 'student_id', 'email']}
        pageSize={10}
      />

      {/* Add Student Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>Enter the student&apos;s details below to enroll them in the system.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label>Full Name *</Label>
              <Input placeholder="e.g. John Doe" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Email *</Label>
              <Input type="email" placeholder="student@school.edu" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Class</Label>
                <Input placeholder="e.g. 10-A" value={formData.class} onChange={(e) => setFormData({ ...formData, class: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Grade</Label>
                <Select onValueChange={(v) => setFormData({ ...formData, grade: v })}>
                  <SelectTrigger><SelectValue placeholder="Select grade" /></SelectTrigger>
                  <SelectContent>
                    {['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-3 justify-end pt-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => setDialogOpen(false)}>Add Student</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
