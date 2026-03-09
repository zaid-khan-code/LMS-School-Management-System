'use client'

import { useState } from 'react'
import { Search, BookOpen, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CourseCard } from '@/components/courses/course-card'

interface Course {
  id: string
  title: string
  subject: string
  grade_level: string
  teacher_name: string
  progress: number
  enrolled_students: number
  thumbnail_color: string
  description: string
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Advanced Mathematics',
    subject: 'Mathematics',
    grade_level: 'Grade 10',
    teacher_name: 'Dr. Sarah Johnson',
    progress: 65,
    enrolled_students: 28,
    thumbnail_color: 'from-blue-500 to-blue-700',
    description: 'Explore calculus, algebra, and advanced problem-solving techniques.',
  },
  {
    id: '2',
    title: 'Physics Fundamentals',
    subject: 'Physics',
    grade_level: 'Grade 11',
    teacher_name: 'Prof. Michael Chen',
    progress: 40,
    enrolled_students: 24,
    thumbnail_color: 'from-purple-500 to-purple-700',
    description: 'Study mechanics, thermodynamics, electromagnetism, and modern physics.',
  },
  {
    id: '3',
    title: 'English Literature',
    subject: 'English Literature',
    grade_level: 'Grade 10',
    teacher_name: 'Ms. Emily Parker',
    progress: 100,
    enrolled_students: 32,
    thumbnail_color: 'from-pink-500 to-rose-600',
    description: 'Analyze classic and contemporary works of literature from around the world.',
  },
  {
    id: '4',
    title: 'World History',
    subject: 'World History',
    grade_level: 'Grade 9',
    teacher_name: 'Mr. David Kim',
    progress: 0,
    enrolled_students: 30,
    thumbnail_color: 'from-amber-500 to-orange-600',
    description: 'Journey through civilizations, revolutions, and world-changing events.',
  },
  {
    id: '5',
    title: 'Biology & Life Sciences',
    subject: 'Biology',
    grade_level: 'Grade 10',
    teacher_name: 'Dr. Aisha Patel',
    progress: 20,
    enrolled_students: 26,
    thumbnail_color: 'from-green-500 to-emerald-700',
    description: 'Discover the science of life — from cells to ecosystems.',
  },
  {
    id: '6',
    title: 'Introduction to Computer Science',
    subject: 'Computer Science',
    grade_level: 'Grade 11',
    teacher_name: 'Mr. James Wright',
    progress: 0,
    enrolled_students: 22,
    thumbnail_color: 'from-cyan-500 to-teal-600',
    description: 'Learn programming, algorithms, data structures, and computational thinking.',
  },
]

type FilterTab = 'all' | 'in-progress' | 'completed' | 'not-started'

export default function CoursesPage() {
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState<FilterTab>('all')

  const filtered = mockCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.subject.toLowerCase().includes(search.toLowerCase()) ||
      course.teacher_name.toLowerCase().includes(search.toLowerCase())

    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'in-progress' && course.progress > 0 && course.progress < 100) ||
      (activeTab === 'completed' && course.progress === 100) ||
      (activeTab === 'not-started' && course.progress === 0)

    return matchesSearch && matchesTab
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
        <p className="text-muted-foreground">Browse and continue your learning journey</p>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses, subjects, teachers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="h-4 w-4" />
          <span>{filtered.length} course{filtered.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as FilterTab)}>
        <TabsList className="grid w-full grid-cols-4 sm:w-auto sm:inline-flex">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="not-started">Not Started</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Course Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <BookOpen className="h-10 w-10 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">No courses found</h3>
            <p className="text-muted-foreground mt-1">
              Try adjusting your search or filter to find what you&#39;re looking for.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
