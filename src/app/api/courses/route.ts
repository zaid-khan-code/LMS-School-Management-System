import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CreateCourseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200),
  description: z.string().max(2000).optional(),
  subject: z.string().min(1, "Subject is required"),
  grade_level: z.string().min(1, "Grade level is required"),
  is_published: z.boolean().default(false),
});

// GET /api/courses - List courses
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const subject = searchParams.get("subject");
  const grade = searchParams.get("grade");

  // Demo data — replace with Supabase query in production
  const courses = [
    { id: "1", title: "Advanced Mathematics", subject: "Mathematics", grade_level: "Grade 10", is_published: true, created_at: new Date().toISOString() },
    { id: "2", title: "English Literature", subject: "English", grade_level: "Grade 11", is_published: true, created_at: new Date().toISOString() },
  ].filter((c) => {
    if (subject && c.subject !== subject) return false;
    if (grade && c.grade_level !== grade) return false;
    return true;
  });

  return NextResponse.json({ data: courses, total: courses.length });
}

// POST /api/courses - Create course
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = CreateCourseSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // In production: insert into Supabase with teacher_id from session
    const course = {
      id: crypto.randomUUID(),
      ...parsed.data,
      teacher_id: "demo-teacher",
      school_id: "demo-school",
      created_at: new Date().toISOString(),
    };

    return NextResponse.json({ data: course }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
