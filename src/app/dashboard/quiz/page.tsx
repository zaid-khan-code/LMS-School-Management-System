'use client'

import { Brain, Clock, HelpCircle, Calendar, Play } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type QuizStatus = 'not-started' | 'in-progress' | 'completed'

interface Quiz {
  id: string
  title: string
  course: string
  time_limit: number
  question_count: number
  due_date: string
  status: QuizStatus
  score?: number
}

const mockQuizzes: Quiz[] = [
  { id: '1', title: 'Derivatives & Integrals Quiz', course: 'Advanced Mathematics', time_limit: 30, question_count: 15, due_date: '2024-12-22', status: 'not-started' },
  { id: '2', title: 'Newton\'s Laws Assessment', course: 'Physics Fundamentals', time_limit: 20, question_count: 10, due_date: '2024-12-18', status: 'in-progress' },
  { id: '3', title: 'Shakespeare & Romanticism', course: 'English Literature', time_limit: 25, question_count: 12, due_date: '2024-12-10', status: 'completed', score: 85 },
  { id: '4', title: 'World War II Era', course: 'World History', time_limit: 30, question_count: 20, due_date: '2024-12-08', status: 'completed', score: 92 },
  { id: '5', title: 'Cell Biology Fundamentals', course: 'Biology & Life Sciences', time_limit: 20, question_count: 10, due_date: '2024-12-25', status: 'not-started' },
]

const statusConfig: Record<QuizStatus, { label: string; class: string }> = {
  'not-started': { label: 'Not Started', class: 'bg-gray-100 text-gray-600 border-gray-200' },
  'in-progress': { label: 'In Progress', class: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  'completed': { label: 'Completed', class: 'bg-green-100 text-green-700 border-green-200' },
}

const courseColors: Record<string, string> = {
  'Advanced Mathematics': 'from-blue-500 to-blue-700',
  'Physics Fundamentals': 'from-purple-500 to-purple-700',
  'English Literature': 'from-pink-500 to-rose-600',
  'World History': 'from-amber-500 to-orange-600',
  'Biology & Life Sciences': 'from-green-500 to-emerald-700',
}

export default function QuizPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Quizzes</h1>
        <p className="text-muted-foreground">Test your knowledge with timed assessments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Quizzes', value: mockQuizzes.length, color: 'text-primary' },
          { label: 'Completed', value: mockQuizzes.filter((q) => q.status === 'completed').length, color: 'text-green-600' },
          { label: 'In Progress', value: mockQuizzes.filter((q) => q.status === 'in-progress').length, color: 'text-yellow-600' },
          { label: 'Avg Score', value: '88%', color: 'text-blue-600' },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className={cn('text-2xl font-bold mt-1', stat.color)}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quiz Cards */}
      <div className="grid gap-4">
        {mockQuizzes.map((quiz) => {
          const s = statusConfig[quiz.status]
          const gradient = courseColors[quiz.course] ?? 'from-gray-400 to-gray-600'
          return (
            <Card key={quiz.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="flex items-stretch">
                  {/* Color accent */}
                  <div className={`w-1.5 bg-gradient-to-b ${gradient} flex-shrink-0`} />
                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex items-start gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${gradient} flex-shrink-0`}>
                          <Brain className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{quiz.title}</h3>
                          <p className="text-sm text-muted-foreground">{quiz.course}</p>
                        </div>
                      </div>
                      <Badge className={cn('text-xs border', s.class)}>{s.label}</Badge>
                    </div>

                    <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        <span>{quiz.time_limit} min</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <HelpCircle className="h-4 w-4" />
                        <span>{quiz.question_count} questions</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        <span>Due {new Date(quiz.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                      {quiz.score !== undefined && (
                        <span className="font-semibold text-green-600">{quiz.score}%</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center pr-5">
                    {quiz.status === 'completed' ? (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/quiz/${quiz.id}`}>Review</Link>
                      </Button>
                    ) : (
                      <Button size="sm" asChild className={cn(quiz.status === 'in-progress' && 'bg-yellow-500 hover:bg-yellow-600')}>
                        <Link href={`/dashboard/quiz/${quiz.id}`}>
                          <Play className="mr-1.5 h-3.5 w-3.5" />
                          {quiz.status === 'in-progress' ? 'Continue' : 'Start Quiz'}
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
