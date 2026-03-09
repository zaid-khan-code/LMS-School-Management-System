'use client'

import Link from 'next/link'
import { Users, BookOpen, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Card } from '@/components/ui/card'

interface CourseCardProps {
  id: string
  title: string
  subject: string
  grade_level: string
  teacher_name: string
  progress: number
  enrolled_students: number
  thumbnail_color: string
  description?: string
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

const subjectColors: Record<string, string> = {
  Mathematics: 'bg-blue-100 text-blue-700',
  Physics: 'bg-purple-100 text-purple-700',
  Chemistry: 'bg-orange-100 text-orange-700',
  Biology: 'bg-green-100 text-green-700',
  'English Literature': 'bg-pink-100 text-pink-700',
  'World History': 'bg-amber-100 text-amber-700',
  'Computer Science': 'bg-cyan-100 text-cyan-700',
  Art: 'bg-rose-100 text-rose-700',
}

export function CourseCard({
  id,
  title,
  subject,
  grade_level,
  teacher_name,
  progress,
  enrolled_students,
  thumbnail_color,
  description,
}: CourseCardProps) {
  const badgeClass = subjectColors[subject] ?? 'bg-gray-100 text-gray-700'

  return (
    <Link href={`/dashboard/courses/${id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
        {/* Thumbnail */}
        <div className={`h-36 bg-gradient-to-br ${thumbnail_color} relative flex items-center justify-center`}>
          <BookOpen className="h-12 w-12 text-white/60" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          <div className="absolute top-3 right-3">
            <span className="text-xs font-medium bg-black/30 text-white px-2 py-1 rounded-full">
              {grade_level}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div className="space-y-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                {title}
              </h3>
            </div>
            <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${badgeClass}`}>
              {subject}
            </span>
          </div>

          {description && (
            <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
          )}

          {/* Teacher */}
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold flex-shrink-0">
              {getInitials(teacher_name)}
            </div>
            <span className="text-xs text-muted-foreground truncate">{teacher_name}</span>
          </div>

          {/* Progress */}
          {progress > 0 && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3" />
                  <span>Progress</span>
                </div>
                <span className="text-xs font-medium text-primary">{progress}%</span>
              </div>
              <Progress value={progress} className="h-1.5" />
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-1 border-t">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="h-3 w-3" />
              <span>{enrolled_students} students</span>
            </div>
            {progress === 0 && (
              <Badge variant="outline" className="text-xs h-5">
                Not Started
              </Badge>
            )}
            {progress > 0 && progress < 100 && (
              <Badge className="text-xs h-5 bg-blue-500 hover:bg-blue-600">In Progress</Badge>
            )}
            {progress === 100 && (
              <Badge className="text-xs h-5 bg-green-500 hover:bg-green-600">Completed</Badge>
            )}
          </div>
        </div>
      </Card>
    </Link>
  )
}
