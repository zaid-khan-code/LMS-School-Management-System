'use client'

import { useState } from 'react'
import { UserPlus, Mail, Phone } from 'lucide-react'
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

interface Teacher {
  id: string
  name: string
  subject: string
  classes_taught: number
  email: string
  phone: string
  status: 'active' | 'on-leave'
  experience: string
}

const mockTeachers: Teacher[] = [
  { id: '1', name: 'Dr. Sarah Johnson', subject: 'Mathematics', classes_taught: 4, email: 'sarah.j@school.edu', phone: '+1-555-0101', status: 'active', experience: '8 years' },
  { id: '2', name: 'Prof. Michael Chen', subject: 'Physics', classes_taught: 3, email: 'michael.c@school.edu', phone: '+1-555-0102', status: 'active', experience: '12 years' },
  { id: '3', name: 'Ms. Emily Parker', subject: 'English Literature', classes_taught: 5, email: 'emily.p@school.edu', phone: '+1-555-0103', status: 'active', experience: '6 years' },
  { id: '4', name: 'Mr. David Kim', subject: 'World History', classes_taught: 4, email: 'david.k@school.edu', phone: '+1-555-0104', status: 'on-leave', experience: '10 years' },
  { id: '5', name: 'Dr. Aisha Patel', subject: 'Biology', classes_taught: 3, email: 'aisha.p@school.edu', phone: '+1-555-0105', status: 'active', experience: '9 years' },
  { id: '6', name: 'Mr. James Wright', subject: 'Computer Science', classes_taught: 4, email: 'james.w@school.edu', phone: '+1-555-0106', status: 'active', experience: '5 years' },
  { id: '7', name: 'Ms. Sophia Rivera', subject: 'Art & Design', classes_taught: 3, email: 'sophia.r@school.edu', phone: '+1-555-0107', status: 'active', experience: '7 years' },
  { id: '8', name: 'Mr. Thomas Grant', subject: 'Chemistry', classes_taught: 4, email: 'thomas.g@school.edu', phone: '+1-555-0108', status: 'active', experience: '11 years' },
]

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
}

function getAvatarColor(name: string) {
  const colors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-amber-500', 'bg-pink-500', 'bg-cyan-500', 'bg-rose-500', 'bg-teal-500']
  return colors[name.charCodeAt(0) % colors.length]
}

export default function TeachersPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', phone: '' })

  const activeCount = mockTeachers.filter((t) => t.status === 'active').length
  const subjects = new Set(mockTeachers.map((t) => t.subject)).size
  const avgClasses = Math.round(mockTeachers.reduce((s, t) => s + t.classes_taught, 0) / mockTeachers.length)

  const columns: ColumnDef<Teacher>[] = [
    {
      id: 'name',
      header: 'Teacher',
      accessorKey: 'name',
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className={cn('flex h-9 w-9 items-center justify-center rounded-full text-white text-xs font-semibold flex-shrink-0', getAvatarColor(row.name))}>
            {getInitials(row.name)}
          </div>
          <div>
            <p className="font-medium text-sm">{row.name}</p>
            <p className="text-xs text-muted-foreground">{row.experience} experience</p>
          </div>
        </div>
      ),
    },
    { id: 'subject', header: 'Subject', accessorKey: 'subject', sortable: true },
    {
      id: 'classes_taught',
      header: 'Classes',
      accessorKey: 'classes_taught',
      sortable: true,
      cell: (row) => <span className="font-medium">{row.classes_taught}</span>,
    },
    {
      id: 'email',
      header: 'Email',
      accessorKey: 'email',
      cell: (row) => (
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Mail className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="truncate max-w-[160px]">{row.email}</span>
        </div>
      ),
    },
    {
      id: 'phone',
      header: 'Phone',
      accessorKey: 'phone',
      cell: (row) => (
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Phone className="h-3.5 w-3.5 flex-shrink-0" />
          {row.phone}
        </div>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => (
        <Badge className={cn('text-xs border', row.status === 'active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-amber-100 text-amber-700 border-amber-200')}>
          {row.status === 'active' ? 'Active' : 'On Leave'}
        </Badge>
      ),
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Teachers</h1>
          <p className="text-muted-foreground">Manage faculty and teaching staff</p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Teacher
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Teachers', value: mockTeachers.length, color: 'text-primary' },
          { label: 'Active', value: activeCount, color: 'text-green-600' },
          { label: 'Subjects Covered', value: subjects, color: 'text-blue-600' },
          { label: 'Avg Classes', value: avgClasses, color: 'text-amber-600' },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className={cn('text-2xl font-bold mt-1', stat.color)}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table */}
      <DataTable<Teacher>
        columns={columns}
        data={mockTeachers}
        searchPlaceholder="Search teachers by name or subject..."
        searchKeys={['name', 'subject', 'email']}
        pageSize={10}
      />

      {/* Add Teacher Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Teacher</DialogTitle>
            <DialogDescription>Enter the teacher&apos;s information to add them to the faculty.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label>Full Name *</Label>
              <Input placeholder="e.g. Dr. Jane Smith" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Email *</Label>
              <Input type="email" placeholder="teacher@school.edu" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Subject *</Label>
                <Select onValueChange={(v) => setFormData({ ...formData, subject: v })}>
                  <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                  <SelectContent>
                    {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English Literature', 'World History', 'Computer Science', 'Art & Design'].map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input placeholder="+1-555-0000" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              </div>
            </div>
            <div className="flex gap-3 justify-end pt-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => setDialogOpen(false)}>Add Teacher</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
