import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  GraduationCap,
  Users,
  BookOpen,
  BarChart3,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle2,
  Brain,
  MessageSquare,
  Calendar,
  Award,
} from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Learning',
    description: 'Personalized learning paths powered by advanced AI algorithms that adapt to each student\'s pace and style.',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  {
    icon: Users,
    title: 'Multi-Role Management',
    description: 'Comprehensive dashboards for super admins, school admins, teachers, students, parents, and staff.',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    icon: BookOpen,
    title: 'Course Management',
    description: 'Create, manage, and deliver courses with rich content including videos, documents, and interactive quizzes.',
    color: 'text-green-500',
    bg: 'bg-green-500/10',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Real-time insights into student performance, attendance, and engagement with beautiful visualizations.',
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
  },
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description: 'Automated timetable generation, event management, and attendance tracking for the entire school.',
    color: 'text-pink-500',
    bg: 'bg-pink-500/10',
  },
  {
    icon: MessageSquare,
    title: 'Communication Hub',
    description: 'Seamless communication between teachers, students, parents, and administration.',
    color: 'text-teal-500',
    bg: 'bg-teal-500/10',
  },
]

const roles = [
  {
    title: 'Super Admin',
    description: 'Manage multiple schools, view system-wide analytics, control subscriptions and configurations.',
    icon: Shield,
    color: 'from-purple-600 to-purple-800',
    features: ['Multi-school management', 'System analytics', 'Subscription control', 'Global settings'],
  },
  {
    title: 'School Admin',
    description: 'Full control over your school\'s operations, staff, students, and academic programs.',
    icon: GraduationCap,
    color: 'from-blue-600 to-blue-800',
    features: ['Staff management', 'Student enrollment', 'Academic calendar', 'Fee management'],
  },
  {
    title: 'Teacher',
    description: 'Create engaging courses, track student progress, and manage assignments with ease.',
    icon: BookOpen,
    color: 'from-green-600 to-green-800',
    features: ['Course creation', 'Grade management', 'Attendance tracking', 'Student communication'],
  },
  {
    title: 'Student',
    description: 'Access learning materials, submit assignments, track progress, and connect with peers.',
    icon: Award,
    color: 'from-orange-600 to-orange-800',
    features: ['Course access', 'Assignment submission', 'Progress tracking', 'Achievement badges'],
  },
]

const stats = [
  { value: '50,000+', label: 'Students' },
  { value: '500+', label: 'Schools' },
  { value: '98%', label: 'Satisfaction' },
  { value: '24/7', label: 'Support' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">EduSphere</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link>
            <Link href="#roles" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Roles</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
        <div className="container relative py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-6 px-4 py-2 text-sm" variant="secondary">
              <Zap className="mr-2 h-3.5 w-3.5" />
              AI-Powered Education Platform
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Transform Education with{' '}
              <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Intelligent Learning
              </span>
            </h1>
            <p className="mb-10 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
              EduSphere is the all-in-one LMS platform that empowers schools, teachers, students, and parents
              with AI-driven tools for exceptional educational outcomes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/register">
                <Button size="lg" className="w-full sm:w-auto px-8">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto px-8">
                  View Demo
                </Button>
              </Link>
            </div>
            <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Features</Badge>
            <h2 className="text-3xl font-bold md:text-4xl mb-4">Everything you need to run a school</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From AI-powered personalization to real-time analytics, EduSphere provides all the tools modern educational institutions need.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-3`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="roles" className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">User Roles</Badge>
            <h2 className="text-3xl font-bold md:text-4xl mb-4">Built for every stakeholder</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tailored dashboards and tools for every role in your educational ecosystem.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {roles.map((role) => (
              <Card key={role.title} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
                <div className={`h-2 bg-gradient-to-r ${role.color}`} />
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${role.color} flex items-center justify-center`}>
                      <role.icon className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle>{role.title}</CardTitle>
                  </div>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {role.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-primary-foreground md:text-4xl mb-4">
            Ready to transform your school?
          </h2>
          <p className="text-primary-foreground/80 mb-8 text-lg max-w-2xl mx-auto">
            Join thousands of schools already using EduSphere to deliver exceptional educational experiences.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/register">
              <Button size="lg" variant="secondary" className="px-8">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline" className="px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
                <GraduationCap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold">EduSphere LMS</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} EduSphere LMS. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/auth/login" className="text-sm text-muted-foreground hover:text-foreground">Login</Link>
              <Link href="/auth/register" className="text-sm text-muted-foreground hover:text-foreground">Register</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
