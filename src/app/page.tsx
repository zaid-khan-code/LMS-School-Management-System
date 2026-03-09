import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  GraduationCap, Brain, Users, BookOpen, BarChart3,
  Shield, Zap, ArrowRight, CheckCircle2, Award,
  MessageSquare, Calendar, Bell, Globe,
} from "lucide-react";

const features = [
  { icon: Brain, title: "AI-Powered Tutoring", description: "Personalized AI tutor for every student. GPT-4o powered chatbot that knows your curriculum, learning style, and weak areas.", color: "text-purple-500", bg: "bg-purple-500/10" },
  { icon: Users, title: "Multi-Role Portals", description: "Six dedicated portals for Super Admins, School Admins, Teachers, Students, Parents, and Staff — each with role-specific features.", color: "text-blue-500", bg: "bg-blue-500/10" },
  { icon: BookOpen, title: "Course Management", description: "Rich course builder with video, PDFs, slides, and interactive quizzes. Drag-and-drop content ordering with progress tracking.", color: "text-green-500", bg: "bg-green-500/10" },
  { icon: BarChart3, title: "Advanced Analytics", description: "Real-time dashboards showing student performance, attendance trends, fee collection, and predictive risk alerts.", color: "text-orange-500", bg: "bg-orange-500/10" },
  { icon: Shield, title: "Enterprise Security", description: "OWASP Top 10 compliance, RLS-enforced data isolation, MFA, JWT auth, CSP headers, and audit logs on every action.", color: "text-red-500", bg: "bg-red-500/10" },
  { icon: Globe, title: "Multi-Tenancy", description: "Each school gets its own subdomain, branding, and fully isolated data. Self-service onboarding wizard included.", color: "text-teal-500", bg: "bg-teal-500/10" },
];

const roles = [
  { emoji: "🔴", title: "Super Admin", desc: "Platform-wide control, revenue tracking, school onboarding", href: "/auth/login?role=super_admin" },
  { emoji: "🟠", title: "School Admin", desc: "School profile, enrollments, timetables, fees, payroll", href: "/auth/login?role=school_admin" },
  { emoji: "🟡", title: "Teacher", desc: "Course builder, AI grading, attendance, live classes", href: "/auth/login?role=teacher" },
  { emoji: "🟢", title: "Student", desc: "AI tutor, assignments, quizzes, grades, study planner", href: "/auth/login?role=student" },
  { emoji: "🔵", title: "Parent", desc: "Child performance, attendance alerts, fee payment", href: "/auth/login?role=parent" },
  { emoji: "⚪", title: "Staff / HR", desc: "Payroll, leave management, task tracking, documents", href: "/auth/login?role=staff" },
];

const stats = [
  { value: "50K+", label: "Active Students" },
  { value: "3K+", label: "Teachers" },
  { value: "500+", label: "Schools" },
  { value: "99.9%", label: "Uptime" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold">EduSphere</span>
            <Badge variant="secondary" className="ml-1 text-xs">AI-Powered</Badge>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="#portals" className="hover:text-foreground transition-colors">Portals</Link>
            <Link href="#security" className="hover:text-foreground transition-colors">Security</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild><Link href="/auth/login">Sign In</Link></Button>
            <Button asChild><Link href="/auth/register">Get Started <ArrowRight className="h-4 w-4" /></Link></Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-purple-500/5 pointer-events-none" />
        <div className="container relative text-center">
          <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm">
            🚀 Enterprise-Grade AI Learning Platform
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance">
            The Future of
            <span className="text-primary"> School Management</span>
            <br />is Here
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 text-balance">
            An enterprise AI-powered LMS built for the modern era. Six role-specific portals,
            GPT-4o tutoring, Stripe payments, real-time analytics, and bank-grade security —
            all in one beautiful platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="text-base px-8" asChild>
              <Link href="/auth/register">Start Free Trial <ArrowRight className="h-5 w-5" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8" asChild>
              <Link href="/dashboard/overview">View Demo Dashboard</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold text-primary">{s.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A complete ecosystem built from the ground up for modern education institutions.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <Card key={f.title} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl ${f.bg} flex items-center justify-center mb-4`}>
                    <f.icon className={`h-6 w-6 ${f.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features highlight */}
      <section className="py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-4">AI-Powered Features</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                GPT-4o Working for Every Learner
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Our AI engine doesn&apos;t just answer questions — it knows each student&apos;s curriculum,
                past performance, and learning style to deliver truly personalized education.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Brain, text: "AI Personal Tutor — subject-aware chatbot per student" },
                  { icon: Zap, text: "Smart Study Planner — AI-generated daily schedules" },
                  { icon: Award, text: "Auto Grader — AI grades essays with detailed feedback" },
                  { icon: MessageSquare, text: "Lesson Plan Generator — topic + grade → full lesson plan" },
                  { icon: BarChart3, text: "Student Risk Detector — early academic struggle alerts" },
                  { icon: Calendar, text: "Smart Timetable — conflict-free AI scheduling" },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "AI Tutor Sessions", value: "2.4M+", color: "bg-purple-500/10 text-purple-600" },
                { label: "Assignments Auto-Graded", value: "890K+", color: "bg-blue-500/10 text-blue-600" },
                { label: "Study Plans Generated", value: "340K+", color: "bg-green-500/10 text-green-600" },
                { label: "Risk Alerts Sent", value: "18K+", color: "bg-orange-500/10 text-orange-600" },
              ].map((stat) => (
                <div key={stat.label} className={`rounded-2xl p-6 ${stat.color}`}>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm mt-1 opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portals */}
      <section id="portals" className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Six Dedicated Portals</h2>
            <p className="text-muted-foreground text-lg">
              Every stakeholder gets a purpose-built experience tailored to their needs.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.map((role) => (
              <Link key={role.title} href={role.href}>
                <Card className="hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-3xl mb-3">{role.emoji}</div>
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                      {role.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{role.desc}</p>
                    <div className="flex items-center gap-1 text-primary text-sm mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      Demo this portal <ArrowRight className="h-3 w-3" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section id="security" className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="destructive" className="mb-4">Bank-Grade Security</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built Secure by Design</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              OWASP Top 10 compliant. Every feature, every API, every data access secured.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "MFA & Zero Trust", desc: "TOTP, SMS, biometric login. Every request verified." },
              { title: "RLS Data Isolation", desc: "Supabase Row Level Security ensures strict data boundaries." },
              { title: "Audit Logs", desc: "Every action logged with user ID, IP, timestamp, resource." },
              { title: "GDPR / FERPA", desc: "Full compliance with student data privacy regulations." },
            ].map((item) => (
              <Card key={item.title} className="text-center p-6 border-0 shadow-sm">
                <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <Bell className="h-12 w-12 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your School?
          </h2>
          <p className="text-lg opacity-80 mb-10 max-w-xl mx-auto">
            Join 500+ schools already using EduSphere. Start your free trial today — no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-base px-8" asChild>
              <Link href="/auth/register">Start Free Trial <ArrowRight className="h-5 w-5" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link href="/dashboard/overview">View Live Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <span className="font-semibold">EduSphere LMS</span>
              <span className="text-muted-foreground text-sm">© 2025</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
              <Link href="#" className="hover:text-foreground">Terms of Service</Link>
              <Link href="#" className="hover:text-foreground">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
