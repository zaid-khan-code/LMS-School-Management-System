export type UserRole =
  | "super_admin"
  | "school_admin"
  | "teacher"
  | "student"
  | "parent"
  | "staff";

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: UserRole;
  school_id?: string;
  phone?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface School {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  primary_color?: string;
  domain?: string;
  subscription_tier: "free" | "basic" | "pro" | "enterprise";
  is_active: boolean;
  created_at: string;
}

export interface Course {
  id: string;
  title: string;
  description?: string;
  subject: string;
  grade_level: string;
  school_id: string;
  teacher_id: string;
  teacher_name?: string;
  thumbnail_color?: string;
  is_published: boolean;
  enrolled_count?: number;
  progress?: number;
  created_at: string;
}

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  content?: string;
  video_url?: string;
  order_index: number;
  duration_minutes?: number;
  is_completed?: boolean;
}

export interface Assignment {
  id: string;
  title: string;
  description?: string;
  course_id: string;
  course_name?: string;
  teacher_id: string;
  due_date: string;
  max_points: number;
  status?: "pending" | "submitted" | "graded" | "late";
  grade?: number;
  is_published: boolean;
  created_at: string;
}

export interface Quiz {
  id: string;
  title: string;
  course_id: string;
  course_name?: string;
  time_limit_minutes: number;
  question_count: number;
  due_date?: string;
  status?: "not_started" | "in_progress" | "completed";
  score?: number;
  max_score?: number;
}

export interface Question {
  id: string;
  quiz_id: string;
  text: string;
  type: "mcq" | "true_false" | "short_answer";
  options?: string[];
  correct_answer?: string;
  points: number;
  order_index: number;
}

export interface Student {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  student_id: string;
  class_name?: string;
  section?: string;
  attendance_pct?: number;
  gpa?: number;
  is_active: boolean;
  admission_date: string;
}

export interface Teacher {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  subject?: string;
  class_count?: number;
  is_active: boolean;
  joined_date: string;
}

export interface AttendanceRecord {
  id: string;
  student_id: string;
  student_name?: string;
  class_id: string;
  date: string;
  status: "present" | "absent" | "late" | "excused";
  marked_by: string;
}

export interface FeeRecord {
  id: string;
  student_id: string;
  student_name?: string;
  amount: number;
  fee_type: string;
  due_date: string;
  paid_date?: string;
  status: "paid" | "pending" | "overdue" | "partial";
}

export interface Exam {
  id: string;
  title: string;
  subject: string;
  date: string;
  start_time: string;
  end_time: string;
  room?: string;
  class_id: string;
  status: "upcoming" | "ongoing" | "completed";
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author_name: string;
  priority: "low" | "medium" | "high";
  target_roles: UserRole[];
  created_at: string;
}

export interface StatsCard {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: string;
  color: string;
}

export interface NavItem {
  title: string;
  href: string;
  icon: string;
  badge?: number;
  children?: NavItem[];
}
