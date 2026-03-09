'use client'

import { useState } from 'react'
import { Calendar, Clock, MapPin, Download, FileCheck, Award } from 'lucide-react'
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

interface UpcomingExam {
  id: string
  subject: string
  date: string
  time: string
  venue: string
  duration: string
  color: string
}

interface CompletedExam {
  id: string
  subject: string
  date: string
  max_marks: number
  obtained: number
  short: string
}

const upcomingExams: UpcomingExam[] = [
  { id: '1', subject: 'Advanced Mathematics', date: '2024-12-20', time: '09:00 AM', venue: 'Exam Hall A', duration: '3 hours', color: 'from-blue-500 to-blue-700' },
  { id: '2', subject: 'Physics Fundamentals', date: '2024-12-22', time: '10:00 AM', venue: 'Exam Hall B', duration: '2.5 hours', color: 'from-purple-500 to-purple-700' },
  { id: '3', subject: 'English Literature', date: '2024-12-24', time: '09:00 AM', venue: 'Room 301', duration: '2 hours', color: 'from-pink-500 to-rose-600' },
]

const completedExams: CompletedExam[] = [
  { id: 'c1', subject: 'Computer Science', date: '2024-11-15', max_marks: 100, obtained: 88, short: 'CS' },
  { id: 'c2', subject: 'World History', date: '2024-11-12', max_marks: 100, obtained: 74, short: 'History' },
  { id: 'c3', subject: 'Biology', date: '2024-11-10', max_marks: 100, obtained: 91, short: 'Biology' },
  { id: 'c4', subject: 'Chemistry', date: '2024-10-30', max_marks: 100, obtained: 67, short: 'Chem' },
  { id: 'c5', subject: 'Art & Design', date: '2024-10-25', max_marks: 100, obtained: 95, short: 'Art' },
]

function getGradeLetter(pct: number) {
  if (pct >= 90) return 'A'
  if (pct >= 80) return 'B'
  if (pct >= 70) return 'C'
  if (pct >= 60) return 'D'
  return 'F'
}

function getGradeColor(pct: number) {
  if (pct >= 90) return 'text-green-600'
  if (pct >= 80) return 'text-blue-600'
  if (pct >= 70) return 'text-amber-600'
  return 'text-red-500'
}

function getBadgeClass(pct: number) {
  if (pct >= 90) return 'bg-green-100 text-green-700 border-green-200'
  if (pct >= 80) return 'bg-blue-100 text-blue-700 border-blue-200'
  if (pct >= 70) return 'bg-amber-100 text-amber-700 border-amber-200'
  return 'bg-red-100 text-red-700 border-red-200'
}

const chartData = completedExams.map((e) => ({ name: e.short, score: e.obtained }))

export default function ExamsPage() {
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

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
        <h1 className="text-3xl font-bold tracking-tight">Examinations</h1>
        <p className="text-muted-foreground">View upcoming exams and past results</p>
      </div>

      {/* Upcoming Exams */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Upcoming Exams
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {upcomingExams.map((exam) => (
            <Card key={exam.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className={`h-2 bg-gradient-to-r ${exam.color}`} />
              <CardContent className="p-5 space-y-4">
                <div>
                  <h3 className="font-semibold">{exam.subject}</h3>
                  <Badge className="mt-1 text-xs bg-blue-100 text-blue-700 border-blue-200">Upcoming</Badge>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 flex-shrink-0" />
                    <span>{new Date(exam.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 flex-shrink-0" />
                    <span>{exam.time} · {exam.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span>{exam.venue}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-1.5"
                  onClick={() => showToast(`Downloading hall ticket for ${exam.subject}...`)}
                >
                  <Download className="h-3.5 w-3.5" />
                  Download Hall Ticket
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Results Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-500" />
            Exam Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value) => [`${value}%`, 'Score']}
                contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
              />
              <Bar dataKey="score" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Completed Exams */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-green-500" />
            Completed Exams
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Subject</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Max Marks</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Obtained</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Percentage</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Grade</th>
                </tr>
              </thead>
              <tbody>
                {completedExams.map((exam) => {
                  const pct = Math.round((exam.obtained / exam.max_marks) * 100)
                  return (
                    <tr key={exam.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4 font-medium">{exam.subject}</td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {new Date(exam.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4">{exam.max_marks}</td>
                      <td className="px-6 py-4 font-semibold">{exam.obtained}</td>
                      <td className="px-6 py-4">
                        <span className={cn('font-bold', getGradeColor(pct))}>{pct}%</span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={cn('text-xs border', getBadgeClass(pct))}>
                          {getGradeLetter(pct)}
                        </Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
