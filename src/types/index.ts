export type UserRole = 'super_admin' | 'school_admin' | 'teacher' | 'student' | 'parent' | 'staff'

export interface User {
  id: string
  email: string
  role: UserRole
  full_name: string
  avatar_url?: string
  school_id?: string
  created_at: string
  updated_at: string
}

export interface School {
  id: string
  name: string
  slug: string
  logo_url?: string
  primary_color?: string
  secondary_color?: string
  domain?: string
  subscription_tier: 'free' | 'basic' | 'pro' | 'enterprise'
  is_active: boolean
  created_at: string
}

export interface Course {
  id: string
  title: string
  description?: string
  school_id: string
  teacher_id: string
  subject: string
  grade_level: string
  thumbnail_url?: string
  is_published: boolean
  created_at: string
}

export interface Assignment {
  id: string
  title: string
  description?: string
  course_id: string
  teacher_id: string
  due_date: string
  max_points: number
  is_published: boolean
  created_at: string
}

export interface Student {
  id: string
  user_id: string
  school_id: string
  student_id_number: string
  class_id?: string
  section?: string
  guardian_id?: string
  admission_date: string
  is_active: boolean
}

export interface AttendanceRecord {
  id: string
  student_id: string
  class_id: string
  date: string
  status: 'present' | 'absent' | 'late' | 'excused'
  marked_by: string
  created_at: string
}

export interface NavItem {
  title: string
  href: string
  icon?: string
  badge?: string | number
  children?: NavItem[]
}

export interface DashboardStats {
  title: string
  value: string | number
  change: number
  changeType: 'increase' | 'decrease'
  icon: string
}
