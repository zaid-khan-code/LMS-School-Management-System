'use client'

import { Download, TrendingUp, TrendingDown, BookOpen, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { cn } from '@/lib/utils'

interface CourseGrade {
  id: string
  course: string
  teacher: string
  grade: number
  assignments_done: number
  assignments_total: number
  short: string
}

const mockGrades: CourseGrade[] = [
  { id: '1', course: 'Advanced Mathematics', teacher: 'Dr. Sarah Johnson', grade: 87, assignments_done: 8, assignments_total: 10, short: 'Math' },
  { id: '2', course: 'Physics Fundamentals', teacher: 'Prof. Michael Chen', grade: 74, assignments_done: 6, assignments_total: 9, short: 'Physics' },
  { id: '3', course: 'English Literature', teacher: 'Ms. Emily Parker', grade: 92, assignments_done: 10, assignments_total: 10, short: 'English' },
  { id: '4', course: 'World History', teacher: 'Mr. David Kim', grade: 68, assignments_done: 5, assignments_total: 8, short: 'History' },
  { id: '5', course: 'Biology & Life Sciences', teacher: 'Dr. Aisha Patel', grade: 81, assignments_done: 7, assignments_total: 9, short: 'Biology' },
  { id: '6', course: 'Computer Science', teacher: 'Mr. James Wright', grade: 95, assignments_done: 9, assignments_total: 9, short: 'CS' },
]

function getLetterGrade(pct: number): string {
  if (pct >= 90) return 'A'
  if (pct >= 80) return 'B'
  if (pct >= 70) return 'C'
  if (pct >= 60) return 'D'
  return 'F'
}

function getGradeColor(pct: number): string {
  if (pct >= 90) return 'text-green-600'
  if (pct >= 80) return 'text-blue-600'
  if (pct >= 70) return 'text-amber-600'
  return 'text-red-600'
}

function getBadgeClass(pct: number): string {
  if (pct >= 90) return 'bg-green-100 text-green-700 border-green-200'
  if (pct >= 80) return 'bg-blue-100 text-blue-700 border-blue-200'
  if (pct >= 70) return 'bg-amber-100 text-amber-700 border-amber-200'
  return 'bg-red-100 text-red-700 border-red-200'
}

const chartData = mockGrades.map((g) => ({ name: g.short, grade: g.grade, fill: g.grade >= 90 ? '#22c55e' : g.grade >= 80 ? '#3b82f6' : g.grade >= 70 ? '#f59e0b' : '#ef4444' }))

const gpa = (mockGrades.reduce((s, g) => s + g.grade, 0) / mockGrades.length / 10).toFixed(1)
const highest = Math.max(...mockGrades.map((g) => g.grade))
const lowest = Math.min(...mockGrades.map((g) => g.grade))
const done = mockGrades.reduce((s, g) => s + g.assignments_done, 0)
const total = mockGrades.reduce((s, g) => s + g.assignments_total, 0)

export default function GradebookPage() {
  const handleExport = () => {
    alert('Exporting gradebook... (toast would appear here)')
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gradebook</h1>
          <p className="text-muted-foreground">Track your academic performance across all courses</p>
        </div>
        <Button variant="outline" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <Award className="h-4 w-4 text-primary" />
              GPA
            </div>
            <p className="text-3xl font-bold text-primary">{gpa}</p>
            <p className="text-xs text-muted-foreground mt-1">Cumulative average</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <TrendingUp className="h-4 w-4 text-green-500" />
              Highest
            </div>
            <p className="text-3xl font-bold text-green-600">{highest}%</p>
            <p className="text-xs text-muted-foreground mt-1">{mockGrades.find((g) => g.grade === highest)?.course}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <TrendingDown className="h-4 w-4 text-red-500" />
              Lowest
            </div>
            <p className="text-3xl font-bold text-red-500">{lowest}%</p>
            <p className="text-xs text-muted-foreground mt-1">{mockGrades.find((g) => g.grade === lowest)?.course}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <BookOpen className="h-4 w-4 text-blue-500" />
              Assignments
            </div>
            <p className="text-3xl font-bold text-blue-600">{done}/{total}</p>
            <p className="text-xs text-muted-foreground mt-1">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance by Course</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value) => [`${value}%`, 'Grade']}
                contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
              />
              <Bar dataKey="grade" radius={[6, 6, 0, 0]}>
                {chartData.map((entry, index) => (
                  <rect key={index} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Grades Table */}
      <Card>
        <CardHeader>
          <CardTitle>Course Grades</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Course</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Teacher</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Grade</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Letter</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Progress</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockGrades.map((g, i) => (
                  <tr key={g.id} className={cn('border-b last:border-0 hover:bg-muted/30 transition-colors', i % 2 === 0 ? '' : 'bg-muted/10')}>
                    <td className="px-6 py-4 font-medium">{g.course}</td>
                    <td className="px-6 py-4 text-muted-foreground">{g.teacher}</td>
                    <td className="px-6 py-4">
                      <span className={cn('font-bold text-base', getGradeColor(g.grade))}>{g.grade}%</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn('text-lg font-bold', getGradeColor(g.grade))}>{getLetterGrade(g.grade)}</span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{g.assignments_done}/{g.assignments_total}</td>
                    <td className="px-6 py-4">
                      <Badge className={cn('text-xs border', getBadgeClass(g.grade))}>
                        {g.grade >= 60 ? 'Passing' : 'At Risk'}
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
