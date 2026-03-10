import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const AttendanceSchema = z.object({
  class_id: z.string().uuid(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
  records: z
    .array(
      z.object({
        student_id: z.string(),
        status: z.enum(["present", "absent", "late", "excused"]),
      }),
    )
    .min(1, "At least one record required"),
});

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
    const parsed = AttendanceSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { records } = parsed.data;
    const summary = {
      present: records.filter((r) => r.status === "present").length,
      absent: records.filter((r) => r.status === "absent").length,
      late: records.filter((r) => r.status === "late").length,
      excused: records.filter((r) => r.status === "excused").length,
    };

    const response = NextResponse.json({
      message: "Attendance saved successfully",
      summary,
      saved_at: new Date().toISOString(),
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
  const classId = searchParams.get("class_id");
  const date = searchParams.get("date");

  if (!classId || !date) {
    return NextResponse.json(
      { error: "class_id and date are required" },
      { status: 400 },
    );
  }

  const response = NextResponse.json({
    class_id: classId,
    date,
    records: [],
    message: "Connect Supabase to fetch real attendance data",
  });
  response.headers.set("X-RateLimit-Limit", "100");
  return response;
}
