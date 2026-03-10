import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

// ── Validation schemas ────────────────────────────────────────────────────────

const CreateStudentSchema = z.object({
  full_name: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100),
  email: z.string().email("Invalid email address"),
  grade_level: z.string().min(1, "Grade level is required"),
  guardian_name: z.string().max(100).optional(),
  guardian_phone: z.string().max(20).optional(),
  date_of_birth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD")
    .optional(),
  gender: z.enum(["male", "female", "other", "prefer_not_to_say"]).optional(),
  address: z.string().max(500).optional(),
});

const UpdateStudentSchema = CreateStudentSchema.partial().extend({
  is_active: z.boolean().optional(),
  profile_photo_url: z.string().url("Invalid URL").optional(),
});

// ── Demo data (replace with Supabase in production) ───────────────────────────

const students = [
  {
    id: "stu-001",
    full_name: "Emma Wilson",
    email: "emma.wilson@students.edu",
    grade_level: "Grade 10",
    gender: "female",
    gpa: 3.9,
    attendance_rate: 97,
    is_active: true,
    at_risk: false,
    enrolled_courses: 6,
    guardian_name: "Helen Wilson",
    guardian_phone: "+1 555-0101",
    date_of_birth: "2010-03-15",
    address: "42 Maple Street, Springfield",
    created_at: "2024-08-20T09:00:00Z",
  },
  {
    id: "stu-002",
    full_name: "Jake Thompson",
    email: "jake.thompson@students.edu",
    grade_level: "Grade 10",
    gender: "male",
    gpa: 2.4,
    attendance_rate: 61,
    is_active: true,
    at_risk: true,
    enrolled_courses: 5,
    guardian_name: "Mark Thompson",
    guardian_phone: "+1 555-0102",
    date_of_birth: "2010-07-22",
    address: "8 Oak Avenue, Springfield",
    created_at: "2024-08-20T09:00:00Z",
  },
  {
    id: "stu-003",
    full_name: "Sophia Lee",
    email: "sophia.lee@students.edu",
    grade_level: "Grade 11",
    gender: "female",
    gpa: 3.7,
    attendance_rate: 94,
    is_active: true,
    at_risk: false,
    enrolled_courses: 7,
    guardian_name: "Jenny Lee",
    guardian_phone: "+1 555-0103",
    date_of_birth: "2009-11-30",
    address: "15 Pine Road, Springfield",
    created_at: "2024-08-20T09:00:00Z",
  },
  {
    id: "stu-004",
    full_name: "Carlos Rivera",
    email: "carlos.rivera@students.edu",
    grade_level: "Grade 9",
    gender: "male",
    gpa: 2.8,
    attendance_rate: 58,
    is_active: true,
    at_risk: true,
    enrolled_courses: 4,
    guardian_name: "Maria Rivera",
    guardian_phone: "+1 555-0104",
    date_of_birth: "2011-05-18",
    address: "27 Birch Lane, Springfield",
    created_at: "2024-08-21T09:00:00Z",
  },
  {
    id: "stu-005",
    full_name: "Aisha Patel",
    email: "aisha.patel@students.edu",
    grade_level: "Grade 12",
    gender: "female",
    gpa: 4.0,
    attendance_rate: 99,
    is_active: true,
    at_risk: false,
    enrolled_courses: 8,
    guardian_name: "Priya Patel",
    guardian_phone: "+1 555-0105",
    date_of_birth: "2008-02-10",
    address: "3 Elm Court, Springfield",
    created_at: "2024-08-20T09:00:00Z",
  },
];

// ── GET /api/students ─────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (!user || authError) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);

  const search = searchParams.get("search")?.toLowerCase() ?? "";
  const grade = searchParams.get("grade");
  const atRisk = searchParams.get("at_risk");
  const pageStr = searchParams.get("page") ?? "1";
  const limitStr = searchParams.get("limit") ?? "20";

  const page = Math.max(1, parseInt(pageStr, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(limitStr, 10) || 20));

  let filtered = students.filter((s) => {
    if (
      search &&
      !s.full_name.toLowerCase().includes(search) &&
      !s.email.toLowerCase().includes(search)
    )
      return false;
    if (grade && s.grade_level !== grade) return false;
    if (atRisk === "true" && !s.at_risk) return false;
    if (atRisk === "false" && s.at_risk) return false;
    return true;
  });

  const total = filtered.length;
  const start = (page - 1) * limit;
  filtered = filtered.slice(start, start + limit);

  const response = NextResponse.json({
    data: filtered,
    meta: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  });
  response.headers.set("X-RateLimit-Limit", "100");
  return response;
}

// ── POST /api/students ────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (!user || authError) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = CreateStudentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    // In production: create Supabase auth user + insert profile row
    const student = {
      id: `stu-${crypto.randomUUID().slice(0, 8)}`,
      ...parsed.data,
      gpa: null,
      attendance_rate: null,
      is_active: true,
      at_risk: false,
      enrolled_courses: 0,
      school_id: "demo-school",
      created_at: new Date().toISOString(),
    };

    const response = NextResponse.json({ data: student }, { status: 201 });
    response.headers.set("X-RateLimit-Limit", "100");
    return response;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}

// ── PATCH /api/students — bulk status update ─────────────────────────────────

export async function PATCH(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (!user || authError) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const BulkSchema = z.object({
      ids: z.array(z.string()).min(1, "At least one student ID required"),
      update: UpdateStudentSchema,
    });

    const parsed = BulkSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    // In production: batch update in Supabase
    const response = NextResponse.json({
      message: `Updated ${parsed.data.ids.length} student(s)`,
      updated_ids: parsed.data.ids,
    });
    response.headers.set("X-RateLimit-Limit", "100");
    return response;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}
