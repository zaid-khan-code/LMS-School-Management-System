import { NextResponse } from 'next/server'
import { z } from 'zod'

const courseSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  subject: z.string().min(1),
  grade_level: z.string().min(1),
})

export async function GET() {
  const mockCourses = [
    { id: '1', title: 'Advanced Mathematics', subject: 'Mathematics', grade_level: 'Grade 10', teacher_name: 'Dr. Sarah Johnson', progress: 65, enrolled_students: 28 },
    { id: '2', title: 'Physics Fundamentals', subject: 'Physics', grade_level: 'Grade 11', teacher_name: 'Prof. Michael Chen', progress: 40, enrolled_students: 24 },
  ]
  return NextResponse.json({ courses: mockCourses })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = courseSchema.parse(body)
    return NextResponse.json(
      { course: { id: crypto.randomUUID(), ...data, created_at: new Date().toISOString() } },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
