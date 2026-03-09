'use client'

import { useState, useEffect, useCallback } from 'react'
import { AlertTriangle, Clock, ChevronLeft, ChevronRight, Flag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

interface PageProps {
  params: { id: string }
}

interface Question {
  id: number
  text: string
  options: string[]
  correct: number
}

const mockQuestions: Question[] = [
  { id: 1, text: 'What is the derivative of f(x) = x³ + 2x² - 5x + 1?', options: ['3x² + 4x - 5', '3x² + 2x - 5', 'x² + 4x - 5', '3x³ + 4x - 5'], correct: 0 },
  { id: 2, text: 'Which of the following is the integral of sin(x)?', options: ['cos(x) + C', '-cos(x) + C', 'sin(x) + C', '-sin(x) + C'], correct: 1 },
  { id: 3, text: "Newton's Second Law states that force equals:", options: ['mass × velocity', 'mass × acceleration', 'mass × distance', 'mass × time'], correct: 1 },
  { id: 4, text: 'Which literary device is used in "The wind whispered secrets"?', options: ['Metaphor', 'Simile', 'Personification', 'Alliteration'], correct: 2 },
  { id: 5, text: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi apparatus'], correct: 2 },
]

const quizTitles: Record<string, string> = {
  '1': 'Derivatives & Integrals Quiz',
  '2': "Newton's Laws Assessment",
  '3': 'Shakespeare & Romanticism',
  '4': 'World War II Era',
  '5': 'Cell Biology Fundamentals',
}

export default function QuizDetailPage({ params }: PageProps) {
  const totalTime = 30 * 60 // 30 minutes
  const [timeLeft, setTimeLeft] = useState(totalTime)
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showSubmit, setShowSubmit] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const title = quizTitles[params.id] ?? 'Quiz'

  const handleSubmit = useCallback(() => {
    let correct = 0
    mockQuestions.forEach((q) => {
      if (answers[q.id] === q.correct) correct++
    })
    setScore(Math.round((correct / mockQuestions.length) * 100))
    setSubmitted(true)
    setShowSubmit(false)
  }, [answers])

  useEffect(() => {
    if (submitted) return
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer)
          handleSubmit()
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [submitted, handleSubmit])

  const mins = Math.floor(timeLeft / 60)
  const secs = timeLeft % 60
  const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  const timeWarning = timeLeft < 5 * 60

  const progress = ((currentQ + 1) / mockQuestions.length) * 100
  const q = mockQuestions[currentQ]
  const answered = Object.keys(answers).length

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60">
          <span className="text-3xl font-bold text-white">{score}%</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold">Quiz Submitted!</h1>
          <p className="text-muted-foreground mt-2">You scored {score}% on {title}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full">
          <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-green-600">{answered}</p><p className="text-sm text-muted-foreground">Answered</p></CardContent></Card>
          <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-primary">{mockQuestions.length}</p><p className="text-sm text-muted-foreground">Total</p></CardContent></Card>
        </div>
        <Button asChild className="w-full"><a href="/dashboard/quiz">Back to Quizzes</a></Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-muted-foreground">Question {currentQ + 1} of {mockQuestions.length}</p>
        </div>
        <div className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-full font-mono font-semibold text-sm border',
          timeWarning ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-muted text-foreground'
        )}>
          <Clock className="h-4 w-4" />
          {timeStr}
        </div>
      </div>

      {/* Anti-cheat notice */}
      <div className="flex items-center gap-2 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-700">
        <AlertTriangle className="h-4 w-4 flex-shrink-0" />
        <span>Anti-cheat monitoring is active. Switching tabs or windows may flag your submission.</span>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <Progress value={progress} className="h-2" />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{answered} answered</span>
          <span>{mockQuestions.length - answered} remaining</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Question */}
        <div className="lg:col-span-3 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full">Q{currentQ + 1}</span>
                Multiple Choice
              </div>
              <CardTitle className="text-lg font-semibold mt-2 leading-relaxed">{q.text}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {q.options.map((opt, i) => {
                  const selected = answers[q.id] === i
                  return (
                    <button
                      key={i}
                      onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: i }))}
                      className={cn(
                        'w-full flex items-center gap-3 p-4 rounded-lg border text-left transition-all text-sm',
                        selected
                          ? 'border-primary bg-primary/10 text-primary font-medium'
                          : 'border-border hover:border-primary/50 hover:bg-muted/40'
                      )}
                    >
                      <div className={cn(
                        'flex h-6 w-6 items-center justify-center rounded-full border-2 flex-shrink-0 text-xs font-bold',
                        selected ? 'border-primary bg-primary text-white' : 'border-muted-foreground/40'
                      )}>
                        {String.fromCharCode(65 + i)}
                      </div>
                      {opt}
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentQ((q) => Math.max(0, q - 1))}
              disabled={currentQ === 0}
            >
              <ChevronLeft className="mr-1 h-4 w-4" /> Previous
            </Button>
            {currentQ < mockQuestions.length - 1 ? (
              <Button onClick={() => setCurrentQ((q) => Math.min(mockQuestions.length - 1, q + 1))}>
                Next <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={() => setShowSubmit(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                <Flag className="mr-1.5 h-4 w-4" />
                Submit Quiz
              </Button>
            )}
          </div>
        </div>

        {/* Question Navigator */}
        <div>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Question Navigation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-1.5">
                {mockQuestions.map((question, i) => (
                  <button
                    key={question.id}
                    onClick={() => setCurrentQ(i)}
                    className={cn(
                      'h-8 w-8 rounded text-xs font-semibold transition-all',
                      i === currentQ ? 'bg-primary text-primary-foreground' :
                      answers[question.id] !== undefined ? 'bg-green-100 text-green-700 border border-green-200' :
                      'bg-muted text-muted-foreground hover:bg-muted/80'
                    )}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2"><div className="h-3 w-3 rounded bg-primary" /> Current</div>
                <div className="flex items-center gap-2"><div className="h-3 w-3 rounded bg-green-100 border border-green-200" /> Answered</div>
                <div className="flex items-center gap-2"><div className="h-3 w-3 rounded bg-muted" /> Unanswered</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Submit Dialog */}
      <Dialog open={showSubmit} onOpenChange={setShowSubmit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Quiz?</DialogTitle>
            <DialogDescription>
              You have answered {answered} of {mockQuestions.length} questions.
              {answered < mockQuestions.length && ` You have ${mockQuestions.length - answered} unanswered question(s).`}
              {' '}This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 justify-end mt-2">
            <Button variant="outline" onClick={() => setShowSubmit(false)}>Review Answers</Button>
            <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
              Confirm Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
