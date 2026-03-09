import { NextResponse } from 'next/server'
import { z } from 'zod'

const attendanceSchema = z.object({
  student_id: z.string().min(1),
  class_id: z.string().min(1),
  date: z.string().min(1),
  status: z.enum(['present', 'absent', 'late', 'excused']),
})

const mockAttendance = [
  { id: '1', student_id: 'STU-001', class_id: '10-A', date: '2024-12-10', status: 'present', marked_by: 'teacher-1', created_at: '2024-12-10T08:00:00Z' },
  { id: '2', student_id: 'STU-002', class_id: '10-A', date: '2024-12-10', status: 'absent', marked_by: 'teacher-1', created_at: '2024-12-10T08:00:00Z' },
  { id: '3', student_id: 'STU-003', class_id: '10-A', date: '2024-12-10', status: 'late', marked_by: 'teacher-1', created_at: '2024-12-10T08:05:00Z' },
  { id: '4', student_id: 'STU-004', class_id: '10-A', date: '2024-12-10', status: 'present', marked_by: 'teacher-1', created_at: '2024-12-10T08:00:00Z' },
]

export async function GET() {
  return NextResponse.json({ attendance: mockAttendance })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = attendanceSchema.parse(body)
    return NextResponse.json(
      {
        record: {
          id: crypto.randomUUID(),
          ...data,
          marked_by: 'current-user',
          created_at: new Date().toISOString(),
        },
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
