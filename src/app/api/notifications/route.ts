import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

// ── Validation schemas ────────────────────────────────────────────────────────

const CreateNotificationSchema = z.object({
  user_id: z.string().uuid("Invalid user ID"),
  title: z.string().min(1).max(200),
  body: z.string().min(1).max(2000),
  category: z.enum(["academic", "financial", "admin", "system"]),
  priority: z.enum(["normal", "high"]).default("normal"),
  action_url: z.string().url("Invalid URL").optional(),
});

const MarkReadSchema = z.object({
  ids: z.array(z.string()).min(1, "Provide at least one notification ID"),
  read: z.boolean().default(true),
});

// ── Demo data ─────────────────────────────────────────────────────────────────

const notifications = [
  {
    id: "notif-001",
    user_id: "demo-user",
    title: "Assignment graded: Calculus Integration",
    body: "Dr. Sarah Johnson graded your submission. You scored 47/50 (94%).",
    category: "academic",
    priority: "normal",
    read: false,
    action_url: "/dashboard/assignments",
    created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  {
    id: "notif-002",
    user_id: "demo-user",
    title: "Fee payment overdue",
    body: "Your December tuition fee of $850 is 3 days overdue.",
    category: "financial",
    priority: "high",
    read: false,
    action_url: "/dashboard/fees",
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "notif-003",
    user_id: "demo-user",
    title: "New course available: Advanced Python",
    body: "Mr. Park has published a new elective course. Enrollment closes Dec 12.",
    category: "academic",
    priority: "normal",
    read: false,
    action_url: "/dashboard/courses",
    created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "notif-004",
    user_id: "demo-user",
    title: "System maintenance scheduled",
    body: "EduSphere will be offline Dec 10, 02:00–04:00 UTC for scheduled maintenance.",
    category: "system",
    priority: "high",
    read: true,
    action_url: null,
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// ── GET /api/notifications ────────────────────────────────────────────────────

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

  const userId = searchParams.get("user_id") ?? "demo-user";
  const category = searchParams.get("category");
  const unreadOnly = searchParams.get("unread_only") === "true";
  const pageStr = searchParams.get("page") ?? "1";
  const limitStr = searchParams.get("limit") ?? "20";

  const page = Math.max(1, parseInt(pageStr, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(limitStr, 10) || 20));

  let filtered = notifications.filter((n) => {
    if (n.user_id !== userId) return false;
    if (category && n.category !== category) return false;
    if (unreadOnly && n.read) return false;
    return true;
  });

  const total = filtered.length;
  const unreadCount = notifications.filter(
    (n) => n.user_id === userId && !n.read,
  ).length;
  const start = (page - 1) * limit;
  filtered = filtered.slice(start, start + limit);

  const response = NextResponse.json({
    data: filtered,
    meta: {
      total,
      unread_count: unreadCount,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  });
  response.headers.set("X-RateLimit-Limit", "100");
  return response;
}

// ── POST /api/notifications — create (used by server-side triggers) ────────────

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
    const parsed = CreateNotificationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    // In production: insert into Supabase notifications table and send push/email
    const notification = {
      id: `notif-${crypto.randomUUID().slice(0, 8)}`,
      ...parsed.data,
      read: false,
      created_at: new Date().toISOString(),
    };

    const response = NextResponse.json({ data: notification }, { status: 201 });
    response.headers.set("X-RateLimit-Limit", "100");
    return response;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}

// ── PATCH /api/notifications — mark read/unread ───────────────────────────────

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
    const parsed = MarkReadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    // In production: update rows in Supabase
    const response = NextResponse.json({
      message: `Marked ${parsed.data.ids.length} notification(s) as ${parsed.data.read ? "read" : "unread"}`,
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

// ── DELETE /api/notifications — delete by IDs ─────────────────────────────────

export async function DELETE(request: NextRequest) {
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
    const DeleteSchema = z.object({ ids: z.array(z.string()).min(1) });
    const parsed = DeleteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    // In production: delete from Supabase
    const response = NextResponse.json({
      message: `Deleted ${parsed.data.ids.length} notification(s)`,
      deleted_ids: parsed.data.ids,
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
