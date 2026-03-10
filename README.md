# 🎓 EduSphere — AI-Powered School Management System

> A full-stack, production-ready Learning Management System (LMS) built with Next.js 14, Supabase, and AI features. Designed for K-12 and higher education institutions with multi-tenant, role-based access for 6 user types.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green?logo=supabase)](https://supabase.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwindcss)](https://tailwindcss.com)

---

## ✨ Features

### 🏫 School Management
| Feature | Details |
|---------|---------|
| **Multi-Tenancy** | Each school gets isolated data, custom branding, and a unique subdomain |
| **6 Role Portals** | Super Admin, School Admin, Teacher, Student, Parent, Staff — each with its own dashboard |
| **Student Management** | Enroll, search, track GPA, attendance, at-risk alerts, and view full student profiles |
| **Teacher Directory** | Profile cards, subject expertise, course assignments, and direct messaging |
| **Attendance** | Per-student daily marking (Present / Absent / Late / Excused) with monthly reports |
| **Timetable** | Visual weekly grid with color-coded subjects and room assignments |
| **Fee Management** | Payment tracking, overdue alerts, receipt generation, pie chart analytics |
| **Exam Management** | Schedule exams, generate hall tickets, record results with grade breakdowns |
| **HR & Payroll** | Staff payroll runs, leave request approvals, and payslip downloads |
| **Library** | Book catalog, borrow/renew/return tracking |

### 📚 Learning Management
| Feature | Details |
|---------|---------|
| **Course Builder** | 4-step wizard: info → content modules → settings → publish |
| **Course Viewer** | Module tree, lesson player, progress tracking |
| **Assignments** | File upload, text submission, teacher feedback, grading |
| **Quiz Engine** | Timed quizzes, anti-cheat tab-switch detection, MCQ flow, instant results |
| **Gradebook** | GPA calculator, bar chart visualisation, per-course breakdown |
| **AI Tutor** | GPT-4o powered chat tutor with subject selector and conversation history |

### 🤖 AI Features
| Feature | Details |
|---------|---------|
| **AI Tutor Chat** | Subject-aware chatbot powered by the OpenAI API |
| **Lesson Plan Generator** | Auto-generate weekly lesson plans from curriculum objectives |
| **Quiz Generator** | Create MCQ quizzes from any topic in seconds |
| **Essay Grader** | AI-assisted essay scoring with rubric feedback |
| **Study Plan Builder** | Personalised weekly study schedule based on weak areas |
| **At-Risk Detection** | Flag students with low GPA or attendance for early intervention |

### 💬 Communication
| Feature | Details |
|---------|---------|
| **Messages / Inbox** | Two-panel inbox with thread view, star, archive, compose, and reply |
| **Notifications** | Category tabs (Academic / Financial / Admin / System), search, mark-read, delete |
| **Announcements** | Pinnable, prioritised school-wide announcements with rich text |

### 🔒 Security
| Feature | Details |
|---------|---------|
| **Auth** | Supabase Auth (email/password + OAuth providers) |
| **Row Level Security** | All Supabase tables have RLS policies scoped to `school_id` and `user_id` |
| **Security Headers** | HSTS, CSP, X-Frame-Options: DENY, X-Content-Type-Options, Referrer-Policy |
| **Middleware Guard** | All `/dashboard/*` routes redirect unauthenticated users to `/auth/login` |
| **Audit Logs** | Every sensitive action (login, role change, data export) is logged |
| **MFA** | Two-factor authentication support via Supabase |

---

## 🏗 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 14](https://nextjs.org) — App Router, Server Components, API Routes |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS + shadcn/ui component system |
| **UI Components** | Radix UI primitives (Avatar, Dialog, Dropdown, Tabs, Select, Switch, Accordion…) |
| **Database & Auth** | [Supabase](https://supabase.com) — PostgreSQL + RLS + Auth |
| **Charts** | [Recharts](https://recharts.org) — Bar, Line, Pie, Area charts |
| **Animations** | [Framer Motion](https://framer.motion.com) |
| **Forms** | React Hook Form + Zod validation |
| **Icons** | [Lucide React](https://lucide.dev) |
| **Date Utils** | date-fns |
| **Theme** | next-themes (dark / light mode) |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout + fonts + theme
│   ├── globals.css                 # Tailwind base + custom CSS variables
│   │
│   ├── auth/
│   │   ├── login/page.tsx          # Login with 6 demo role accounts
│   │   ├── register/page.tsx       # 2-step registration form
│   │   └── forgot-password/page.tsx
│   │
│   ├── dashboard/
│   │   ├── layout.tsx              # Dashboard shell (sidebar + header)
│   │   ├── overview/page.tsx       # Stats, activity feed, quick actions
│   │   ├── courses/                # List, [id] detail, create wizard
│   │   ├── assignments/            # List + [id] submission
│   │   ├── quiz/                   # List + [id] timed quiz engine
│   │   ├── gradebook/              # GPA + bar chart
│   │   ├── ai-tutor/               # Chat interface
│   │   ├── students/               # List + [id] full profile
│   │   ├── teachers/               # Directory
│   │   ├── attendance/             # Daily marking grid
│   │   ├── timetable/              # Weekly visual grid
│   │   ├── fees/                   # Payment tracking + pie chart
│   │   ├── exams/                  # Schedule + results with grade bars
│   │   ├── notifications/          # Notification center
│   │   ├── messages/               # Inbox with thread view
│   │   ├── announcements/          # School-wide announcements
│   │   ├── library/                # Book catalog
│   │   ├── hr/                     # HR & payroll
│   │   ├── reports/                # Analytics with 4 charts
│   │   ├── security/               # Audit log + OWASP checklist
│   │   └── settings/               # Profile, notifications, 2FA, theme
│   │
│   └── api/
│       ├── courses/route.ts        # GET (filter) + POST (create)
│       ├── attendance/route.ts     # GET (summary) + POST (mark)
│       ├── students/route.ts       # GET (paginated) + POST + PATCH (bulk)
│       ├── notifications/route.ts  # GET + POST + PATCH (mark-read) + DELETE
│       └── ai/route.ts             # POST — tutor / lesson_plan / quiz_generate / grade_essay / study_plan
│
├── components/
│   ├── layout/
│   │   ├── sidebar.tsx             # Collapsible nav with badge counts
│   │   └── header.tsx              # Search, notifications, theme toggle, user menu
│   ├── dashboard/
│   │   └── stats-card.tsx          # Reusable metric card with trend indicator
│   ├── providers/
│   │   └── theme-provider.tsx      # next-themes wrapper
│   └── ui/                         # shadcn/ui components
│       ├── accordion.tsx
│       ├── alert.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── checkbox.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── progress.tsx
│       ├── radio-group.tsx
│       ├── scroll-area.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── skeleton.tsx
│       ├── switch.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       ├── toast.tsx
│       ├── toaster.tsx
│       └── tooltip.tsx
│
├── lib/
│   ├── utils.ts                    # cn() helper
│   └── supabase/
│       ├── client.ts               # Browser client (createBrowserClient)
│       ├── server.ts               # Server client (createServerClient + cookies)
│       └── middleware.ts           # Session refresh helper
│
├── hooks/
│   └── use-toast.ts                # Toast notification hook
│
├── types/
│   └── index.ts                    # TypeScript models for all entities
│
└── middleware.ts                   # Route guard + security headers

supabase/
└── migrations/
    └── 001_initial_schema.sql      # All tables + RLS policies + indexes
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9
- A [Supabase](https://supabase.com) project (free tier works fine)

### 1. Clone & Install

```bash
git clone https://github.com/zaid-khan-code/LMS-School-Management-System.git
cd LMS-School-Management-System
npm install
```

### 2. Configure Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL (e.g. `https://abc.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-only, never expose client-side) |
| `OPENAI_API_KEY` | OpenAI API key for AI tutor, quiz generator, and essay grader |
| `NEXT_PUBLIC_APP_URL` | Your deployment URL (e.g. `http://localhost:3000`) |

### 3. Set Up the Database

In your Supabase SQL editor, run the migration file:

```bash
# Copy and run in Supabase SQL Editor:
supabase/migrations/001_initial_schema.sql
```

This creates all 13 tables with Row Level Security policies.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Demo Login Accounts

Use any of these demo credentials on the login page:

| Role | Email | Password |
|------|-------|----------|
| Super Admin | `super@edusphere.com` | `demo123` |
| School Admin | `admin@greenfield.edu` | `demo123` |
| Teacher | `teacher@greenfield.edu` | `demo123` |
| Student | `student@greenfield.edu` | `demo123` |
| Parent | `parent@greenfield.edu` | `demo123` |
| Staff | `staff@greenfield.edu` | `demo123` |

---

## 🗃 Database Schema

The migration creates the following tables with full RLS:

| Table | Description |
|-------|-------------|
| `schools` | Multi-tenant school registry |
| `profiles` | User profiles with role, school linkage |
| `courses` | Course catalogue with teacher assignment |
| `lessons` | Course content (video, PDF, text, quiz) |
| `enrollments` | Student-course mapping with progress |
| `assignments` | Assignment metadata and submissions |
| `quiz_questions` | MCQ question bank linked to quizzes |
| `quiz_attempts` | Student quiz attempts with scores |
| `attendance_records` | Daily per-student attendance |
| `fee_records` | Fee items, amounts, and payment status |
| `exams` | Exam schedule and results |
| `announcements` | School-wide announcements |
| `audit_logs` | Security event log |

---

## 🧪 API Reference

All API routes are under `/api/` and accept/return JSON.

### Courses
```
GET  /api/courses?subject=Mathematics&grade=Grade+10
POST /api/courses
  Body: { title, description?, subject, grade_level, is_published? }
```

### Students
```
GET  /api/students?search=emma&grade=Grade+10&at_risk=false&page=1&limit=20
POST /api/students
  Body: { full_name, email, grade_level, guardian_name?, guardian_phone?, date_of_birth?, gender?, address? }
PATCH /api/students
  Body: { ids: string[], update: Partial<Student> }
```

### Attendance
```
GET  /api/attendance?date=2025-12-09&class_id=10A
POST /api/attendance
  Body: { date, class_id, records: [{ student_id, status: "present"|"absent"|"late"|"excused", note? }] }
```

### Notifications
```
GET    /api/notifications?user_id=xxx&category=academic&unread_only=true&page=1&limit=20
POST   /api/notifications
  Body: { user_id, title, body, category, priority?, action_url? }
PATCH  /api/notifications
  Body: { ids: string[], read: boolean }
DELETE /api/notifications
  Body: { ids: string[] }
```

### AI
```
POST /api/ai
  Body: { type: "tutor"|"lesson_plan"|"quiz_generate"|"grade_essay"|"study_plan", prompt, subject?, grade_level? }
```

> ⚠️ Replace `OPENAI_API_KEY` in `.env.local` to activate AI features.

---

## 🔐 Security

- **CSP**: `Content-Security-Policy` header with script-src, style-src, connect-src
- **HSTS**: `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- **Clickjacking**: `X-Frame-Options: DENY`
- **MIME sniffing**: `X-Content-Type-Options: nosniff`
- **Referrer**: `Referrer-Policy: strict-origin-when-cross-origin`
- **Permissions**: Camera, microphone, and geolocation all disabled by default
- **RLS**: Every database table enforces school-level and user-level data isolation
- **Input validation**: All API routes use Zod schemas before touching any data

---

## 📦 Building for Production

```bash
npm run build
npm run start
```

Or deploy to [Vercel](https://vercel.com) with a single click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/zaid-khan-code/LMS-School-Management-System)

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for:

- Branching strategy (`main` / `develop` / `feature/*` / `fix/*`)
- **How to merge branches** — via GitHub Pull Requests or the Git CLI
- Resolving merge conflicts
- Branch naming conventions
- Commit message guidelines (Conventional Commits)

---

## 📝 License

MIT — feel free to use for personal or commercial projects.

