'use client'

import { useState } from 'react'
import { Calendar, Star, Upload, FileText, CheckCircle2, Clock, ChevronLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface PageProps {
  params: { id: string }
}

interface AssignmentData {
  id: string
  title: string
  course: string
  due_date: string
  points: number
  status: 'pending' | 'submitted' | 'graded'
  description: string
  instructions: string[]
}

interface Submission {
  id: string
  submitted_at: string
  status: 'submitted' | 'graded'
  content: string
  grade?: number
  feedback?: string
}

const mockAssignments: Record<string, AssignmentData> = {
  '1': {
    id: '1',
    title: 'Calculus Problem Set 3',
    course: 'Advanced Mathematics',
    due_date: '2024-12-20',
    points: 100,
    status: 'pending',
    description: 'Complete the following calculus problems covering derivatives, integrals, and applications.',
    instructions: [
      'Solve all 10 problems showing full working',
      'Use proper mathematical notation throughout',
      'Submit as a PDF with clear diagrams where required',
      'Collaboration is not permitted — individual work only',
    ],
  },
  '2': {
    id: '2',
    title: "Newton's Laws Lab Report",
    course: 'Physics Fundamentals',
    due_date: '2024-12-15',
    points: 50,
    status: 'submitted',
    description: 'Write a comprehensive lab report on the experiment conducted exploring Newton\'s three laws of motion.',
    instructions: [
      'Include hypothesis, method, results, and conclusion',
      'Attach data tables and graphs from the experiment',
      'Minimum 800 words',
      'Reference at least 3 scientific sources',
    ],
  },
}

const mockSubmissions: Record<string, Submission[]> = {
  '2': [
    {
      id: 's1',
      submitted_at: '2024-12-14T14:32:00Z',
      status: 'submitted',
      content: 'Submitted lab report covering all three of Newton\'s laws with experimental data...',
    },
  ],
  '3': [
    {
      id: 's2',
      submitted_at: '2024-12-09T10:15:00Z',
      status: 'graded',
      content: 'Essay analyzing Hamlet\'s soliloquy in Act III...',
      grade: 72,
      feedback: 'Strong analysis with good textual evidence. Work on the conclusion.',
    },
  ],
}

export default function AssignmentDetailPage({ params }: PageProps) {
  const assignment = mockAssignments[params.id] ?? mockAssignments['1']
  const submissions = mockSubmissions[params.id] ?? []
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [dragging, setDragging] = useState(false)

  const handleSubmit = () => {
    if (!text.trim()) return
    setSubmitted(true)
  }

  const statusColors = {
    pending: 'bg-amber-100 text-amber-700 border-amber-200',
    submitted: 'bg-blue-100 text-blue-700 border-blue-200',
    graded: 'bg-green-100 text-green-700 border-green-200',
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back */}
      <Link href="/dashboard/assignments">
        <Button variant="ghost" size="sm" className="gap-2 -ml-2 text-muted-foreground">
          <ChevronLeft className="h-4 w-4" /> Back to Assignments
        </Button>
      </Link>

      {/* Header */}
      <div className="rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border p-6 space-y-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <Badge className={cn('text-xs border mb-2', statusColors[assignment.status])}>
              {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
            </Badge>
            <h1 className="text-2xl font-bold">{assignment.title}</h1>
            <p className="text-muted-foreground mt-1">{assignment.course}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Due {new Date(assignment.due_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Star className="h-4 w-4 text-amber-500" />
              <span>{assignment.points} points</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Instructions */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">{assignment.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {assignment.instructions.map((inst, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-muted-foreground">{inst}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Submission Form */}
          {assignment.status === 'pending' && !submitted && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Submit Assignment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Text Response</label>
                  <textarea
                    rows={6}
                    placeholder="Write your answer here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                  />
                </div>

                {/* File Upload */}
                <div
                  onDragEnter={() => setDragging(true)}
                  onDragLeave={() => setDragging(false)}
                  onDrop={() => setDragging(false)}
                  className={cn(
                    'border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer',
                    dragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/30'
                  )}
                >
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="font-medium text-sm">Drag & drop files here</p>
                  <p className="text-xs text-muted-foreground mt-1">or click to browse — PDF, DOC, images supported</p>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={!text.trim()}
                  className="w-full"
                >
                  Submit Assignment
                </Button>
              </CardContent>
            </Card>
          )}

          {submitted && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6 flex items-center gap-3">
                <CheckCircle2 className="h-8 w-8 text-green-500 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-green-800">Submitted Successfully!</p>
                  <p className="text-sm text-green-700">Your assignment has been submitted and is pending review.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Submission History</CardTitle>
            </CardHeader>
            <CardContent>
              {submissions.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground text-sm">
                  <FileText className="h-8 w-8 mx-auto mb-2 opacity-40" />
                  No submissions yet
                </div>
              ) : (
                <div className="space-y-3">
                  {submissions.map((sub) => (
                    <div key={sub.id} className="rounded-lg border p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {sub.status === 'graded' ? 'Graded' : 'Submitted'}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {new Date(sub.submitted_at).toLocaleDateString()}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{sub.content}</p>
                      {sub.grade !== undefined && (
                        <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
                          <Star className="h-3.5 w-3.5 text-amber-500" />
                          {sub.grade}/{assignment.points} pts
                        </div>
                      )}
                      {sub.feedback && (
                        <>
                          <Separator />
                          <p className="text-xs text-muted-foreground italic">&ldquo;{sub.feedback}&rdquo;</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
