'use client'

import { useState } from 'react'
import { ClipboardList, Search, Calendar, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type AssignmentStatus = 'pending' | 'submitted' | 'graded' | 'late'

interface Assignment {
  id: string
  title: string
  course: string
  due_date: string
  status: AssignmentStatus
  points: number
  earned_points?: number
}

const mockAssignments: Assignment[] = [
  { id: '1', title: 'Calculus Problem Set 3', course: 'Advanced Mathematics', due_date: '2024-12-20', status: 'pending', points: 100 },
  { id: '2', title: 'Newton\'s Laws Lab Report', course: 'Physics Fundamentals', due_date: '2024-12-15', status: 'submitted', points: 50 },
  { id: '3', title: 'Shakespeare Essay Analysis', course: 'English Literature', due_date: '2024-12-10', status: 'graded', points: 80, earned_points: 72 },
  { id: '4', title: 'WWI Research Paper', course: 'World History', due_date: '2024-12-08', status: 'graded', points: 100, earned_points: 88 },
  { id: '5', title: 'Cell Division Diagram', course: 'Biology & Life Sciences', due_date: '2024-12-22', status: 'pending', points: 30 },
  { id: '6', title: 'Python Calculator Project', course: 'Computer Science', due_date: '2024-12-05', status: 'late', points: 100, earned_points: 60 },
  { id: '7', title: 'Trigonometry Quiz Prep', course: 'Advanced Mathematics', due_date: '2024-12-18', status: 'submitted', points: 50 },
  { id: '8', title: 'Optics Experiment Report', course: 'Physics Fundamentals', due_date: '2024-12-25', status: 'pending', points: 75 },
]

const statusConfig: Record<AssignmentStatus, { label: string; class: string }> = {
  pending: { label: 'Pending', class: 'bg-amber-100 text-amber-700 border-amber-200' },
  submitted: { label: 'Submitted', class: 'bg-blue-100 text-blue-700 border-blue-200' },
  graded: { label: 'Graded', class: 'bg-green-100 text-green-700 border-green-200' },
  late: { label: 'Late', class: 'bg-red-100 text-red-700 border-red-200' },
}

type FilterTab = 'all' | 'pending' | 'submitted' | 'graded'

const courses = Array.from(new Set(mockAssignments.map((a) => a.course)))

export default function AssignmentsPage() {
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState<FilterTab>('all')
  const [courseFilter, setCourseFilter] = useState('all')

  const filtered = mockAssignments.filter((a) => {
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.course.toLowerCase().includes(search.toLowerCase())
    const matchesTab = activeTab === 'all' || a.status === activeTab || (activeTab === 'pending' && a.status === 'late')
    const matchesCourse = courseFilter === 'all' || a.course === courseFilter
    return matchesSearch && matchesTab && matchesCourse
  })

  const pendingCount = mockAssignments.filter((a) => a.status === 'pending' || a.status === 'late').length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
        <p className="text-muted-foreground">Track and submit your assignments</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search assignments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={courseFilter} onValueChange={setCourseFilter}>
          <SelectTrigger className="w-full sm:w-56">
            <SelectValue placeholder="Filter by course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            {courses.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as FilterTab)}>
        <TabsList>
          <TabsTrigger value="all">All <span className="ml-1.5 bg-muted rounded-full px-1.5 py-0.5 text-xs">{mockAssignments.length}</span></TabsTrigger>
          <TabsTrigger value="pending">Pending <span className="ml-1.5 bg-amber-100 text-amber-700 rounded-full px-1.5 py-0.5 text-xs">{pendingCount}</span></TabsTrigger>
          <TabsTrigger value="submitted">Submitted</TabsTrigger>
          <TabsTrigger value="graded">Graded</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Assignment List */}
      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((a) => {
            const s = statusConfig[a.status]
            const isOverdue = new Date(a.due_date) < new Date() && a.status === 'pending'
            return (
              <Link key={a.id} href={`/dashboard/assignments/${a.id}`}>
                <Card className="hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer group">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                        <ClipboardList className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-semibold group-hover:text-primary transition-colors">{a.title}</h3>
                            <p className="text-sm text-muted-foreground">{a.course}</p>
                          </div>
                          <Badge className={cn('text-xs border flex-shrink-0', s.class)}>{s.label}</Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <div className={cn('flex items-center gap-1', isOverdue && 'text-red-500')}>
                            <Calendar className="h-3.5 w-3.5" />
                            <span>Due {new Date(a.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            {isOverdue && <span className="font-medium">(Overdue)</span>}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5" />
                            {a.earned_points !== undefined
                              ? <span className="font-medium text-green-600">{a.earned_points}/{a.points} pts</span>
                              : <span>{a.points} pts</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <ClipboardList className="h-10 w-10 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">No assignments found</h3>
            <p className="text-muted-foreground mt-1">Try adjusting your filters</p>
          </div>
        </div>
      )}
    </div>
  )
}
