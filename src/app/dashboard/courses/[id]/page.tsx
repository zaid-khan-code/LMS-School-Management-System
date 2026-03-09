'use client'

import { useState } from 'react'
import { CheckCircle2, Circle, Play, ChevronRight, BookOpen, Clock } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

interface PageProps {
  params: { id: string }
}

interface Lesson {
  id: string
  title: string
  duration: string
  completed: boolean
}

interface Module {
  id: string
  title: string
  lessons: Lesson[]
}

const mockModules: Module[] = [
  {
    id: 'm1',
    title: 'Module 1: Foundations',
    lessons: [
      { id: 'l1', title: 'Introduction & Overview', duration: '12 min', completed: true },
      { id: 'l2', title: 'Core Concepts Part 1', duration: '18 min', completed: true },
      { id: 'l3', title: 'Core Concepts Part 2', duration: '22 min', completed: true },
      { id: 'l4', title: 'Practice Problems', duration: '15 min', completed: false },
    ],
  },
  {
    id: 'm2',
    title: 'Module 2: Intermediate Topics',
    lessons: [
      { id: 'l5', title: 'Advanced Techniques', duration: '25 min', completed: false },
      { id: 'l6', title: 'Real-World Applications', duration: '20 min', completed: false },
      { id: 'l7', title: 'Case Study Analysis', duration: '30 min', completed: false },
    ],
  },
  {
    id: 'm3',
    title: 'Module 3: Advanced Mastery',
    lessons: [
      { id: 'l8', title: 'Deep Dive: Theory', duration: '35 min', completed: false },
      { id: 'l9', title: 'Complex Problem Solving', duration: '28 min', completed: false },
      { id: 'l10', title: 'Final Project', duration: '45 min', completed: false },
    ],
  },
]

const courseDetails: Record<string, { title: string; color: string }> = {
  '1': { title: 'Advanced Mathematics', color: 'from-blue-500 to-blue-700' },
  '2': { title: 'Physics Fundamentals', color: 'from-purple-500 to-purple-700' },
  '3': { title: 'English Literature', color: 'from-pink-500 to-rose-600' },
  '4': { title: 'World History', color: 'from-amber-500 to-orange-600' },
  '5': { title: 'Biology & Life Sciences', color: 'from-green-500 to-emerald-700' },
  '6': { title: 'Introduction to Computer Science', color: 'from-cyan-500 to-teal-600' },
}

export default function CourseDetailPage({ params }: PageProps) {
  const course = courseDetails[params.id] ?? { title: 'Course', color: 'from-blue-500 to-blue-700' }
  const allLessons = mockModules.flatMap((m) => m.lessons)
  const completedCount = allLessons.filter((l) => l.completed).length
  const totalCount = allLessons.length
  const progressValue = Math.round((completedCount / totalCount) * 100)

  const [selectedLesson, setSelectedLesson] = useState<Lesson>(
    allLessons.find((l) => !l.completed) ?? allLessons[0]
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <BookOpen className="h-4 w-4" />
          <span>{course.title}</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">{selectedLesson.title}</span>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{course.title}</h1>
          <Badge variant="outline">{completedCount}/{totalCount} lessons</Badge>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Course Progress</span>
            <span className="font-semibold text-primary">{progressValue}%</span>
          </div>
          <Progress value={progressValue} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6 min-h-[600px]">
        {/* Module Sidebar */}
        <div className="lg:w-1/4 flex-shrink-0">
          <div className="rounded-xl border bg-card overflow-hidden">
            <div className="px-4 py-3 border-b bg-muted/30">
              <h3 className="font-semibold text-sm">Course Content</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{totalCount} lessons · {completedCount} completed</p>
            </div>
            <ScrollArea className="h-[500px]">
              <div className="p-2">
                {mockModules.map((module) => {
                  const moduleCompleted = module.lessons.filter((l) => l.completed).length
                  return (
                    <div key={module.id} className="mb-4">
                      <div className="px-2 py-2">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          {module.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {moduleCompleted}/{module.lessons.length} done
                        </p>
                      </div>
                      <div className="space-y-0.5">
                        {module.lessons.map((lesson) => (
                          <button
                            key={lesson.id}
                            onClick={() => setSelectedLesson(lesson)}
                            className={cn(
                              'w-full flex items-start gap-2.5 px-2 py-2.5 rounded-lg text-left transition-colors text-sm',
                              selectedLesson.id === lesson.id
                                ? 'bg-primary/10 text-primary'
                                : 'hover:bg-muted text-foreground'
                            )}
                          >
                            {lesson.completed ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                            ) : (
                              <Circle className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium leading-tight line-clamp-2">{lesson.title}</p>
                              <div className="flex items-center gap-1 mt-1 text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span className="text-xs">{lesson.duration}</span>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-4">
          {/* Video Player */}
          <div className={`relative rounded-xl overflow-hidden bg-gradient-to-br ${course.color} aspect-video flex items-center justify-center group cursor-pointer`}>
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative flex flex-col items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 group-hover:scale-110 transition-transform">
                <Play className="h-7 w-7 text-white fill-white ml-1" />
              </div>
              <span className="text-white/80 text-sm font-medium">Click to play</span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="text-white font-semibold text-lg drop-shadow">{selectedLesson.title}</span>
              <div className="flex items-center gap-1.5 bg-black/40 text-white text-xs px-2.5 py-1 rounded-full">
                <Clock className="h-3 w-3" />
                {selectedLesson.duration}
              </div>
            </div>
          </div>

          {/* Lesson Info */}
          <div className="rounded-xl border bg-card p-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">{selectedLesson.title}</h2>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{selectedLesson.duration}</span>
                  </div>
                  {selectedLesson.completed && (
                    <Badge className="bg-green-500 hover:bg-green-600 text-xs">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">About This Lesson</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                In this lesson, you will explore key concepts related to{' '}
                <strong className="text-foreground">{selectedLesson.title}</strong>. The content covers
                theoretical foundations alongside practical applications to help solidify your understanding.
                By the end of this lesson, you&apos;ll be equipped with the skills to tackle related exercises and
                real-world challenges confidently.
              </p>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Learning Objectives</h3>
              <ul className="space-y-1.5">
                {['Understand the core principles', 'Apply concepts to practical scenarios', 'Solve related problems independently'].map((obj, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                    {obj}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
