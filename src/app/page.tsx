"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  GraduationCap,
  Brain,
  Users,
  BookOpen,
  BarChart3,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle2,
  Award,
  MessageSquare,
  Calendar,
  Bell,
  Globe,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const features = [
  {
    icon: Brain,
    title: "AI-Powered Tutoring",
    description:
      "Personalized AI tutor for every student. Gemini powered chatbot that knows your curriculum, learning style, and weak areas.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    icon: Users,
    title: "Multi-Role Portals",
    description:
      "Six dedicated portals for Super Admins, School Admins, Teachers, Students, Parents, and Staff — each with role-specific features.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: BookOpen,
    title: "Course Management",
    description:
      "Rich course builder with video, PDFs, slides, and interactive quizzes. Drag-and-drop content ordering with progress tracking.",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Real-time dashboards showing student performance, attendance trends, fee collection, and predictive risk alerts.",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "OWASP Top 10 compliance, RLS-enforced data isolation, MFA, JWT auth, CSP headers, and audit logs on every action.",
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    icon: Globe,
    title: "Multi-Tenancy",
    description:
      "Each school gets its own subdomain, branding, and fully isolated data. Self-service onboarding wizard included.",
    color: "text-teal-500",
    bg: "bg-teal-500/10",
  },
];

const roles = [
  {
    emoji: "\u{1F534}",
    title: "Super Admin",
    desc: "Platform-wide control, revenue tracking, school onboarding",
    href: "/auth/login?role=super_admin",
  },
  {
    emoji: "\u{1F7E0}",
    title: "School Admin",
    desc: "School profile, enrollments, timetables, fees, payroll",
    href: "/auth/login?role=school_admin",
  },
  {
    emoji: "\u{1F7E1}",
    title: "Teacher",
    desc: "Course builder, AI grading, attendance, live classes",
    href: "/auth/login?role=teacher",
  },
  {
    emoji: "\u{1F7E2}",
    title: "Student",
    desc: "AI tutor, assignments, quizzes, grades, study planner",
    href: "/auth/login?role=student",
  },
  {
    emoji: "\u{1F535}",
    title: "Parent",
    desc: "Child performance, attendance alerts, fee payment",
    href: "/auth/login?role=parent",
  },
  {
    emoji: "\u26AA",
    title: "Staff / HR",
    desc: "Payroll, leave management, task tracking, documents",
    href: "/auth/login?role=staff",
  },
];

const stats = [
  { value: "50K+", label: "Active Students" },
  { value: "3K+", label: "Teachers" },
  { value: "500+", label: "Schools" },
  { value: "99.9%", label: "Uptime" },
];

const aiFeatures = [
  {
    icon: Brain,
    text: "AI Personal Tutor — subject-aware chatbot per student",
  },
  { icon: Zap, text: "Smart Study Planner — AI-generated daily schedules" },
  {
    icon: Award,
    text: "Auto Grader — AI grades essays with detailed feedback",
  },
  {
    icon: MessageSquare,
    text: "Lesson Plan Generator — topic + grade \u2192 full lesson plan",
  },
  {
    icon: BarChart3,
    text: "Student Risk Detector — early academic struggle alerts",
  },
  { icon: Calendar, text: "Smart Timetable — conflict-free AI scheduling" },
];

const aiStats = [
  {
    label: "AI Tutor Sessions",
    value: "2.4M+",
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    label: "Assignments Auto-Graded",
    value: "890K+",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    label: "Study Plans Generated",
    value: "340K+",
    color: "bg-green-500/10 text-green-600",
  },
  {
    label: "Risk Alerts Sent",
    value: "18K+",
    color: "bg-orange-500/10 text-orange-600",
  },
];

const securityItems = [
  {
    title: "MFA & Zero Trust",
    desc: "TOTP, SMS, biometric login. Every request verified.",
  },
  {
    title: "RLS Data Isolation",
    desc: "Supabase Row Level Security ensures strict data boundaries.",
  },
  {
    title: "Audit Logs",
    desc: "Every action logged with user ID, IP, timestamp, resource.",
  },
  {
    title: "GDPR / FERPA",
    desc: "Full compliance with student data privacy regulations.",
  },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Scroll-triggered section wrapper                                   */
/* ------------------------------------------------------------------ */

function RevealSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Landing Page                                                       */
/* ------------------------------------------------------------------ */

export default function LandingPage() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const featuresInView = useInView(featuresRef, {
    once: true,
    margin: "-60px",
  });

  const portalsRef = useRef<HTMLDivElement>(null);
  const portalsInView = useInView(portalsRef, { once: true, margin: "-60px" });

  const securityRef = useRef<HTMLDivElement>(null);
  const securityInView = useInView(securityRef, {
    once: true,
    margin: "-60px",
  });

  return (
    <div className="min-h-screen bg-background">
      {/* ==================== Nav ==================== */}
      <header className="glass sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold">EduSphere</span>
            <Badge variant="secondary" className="ml-1 text-xs">
              AI-Powered
            </Badge>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <Link
              href="#features"
              className="hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="#portals"
              className="hover:text-foreground transition-colors"
            >
              Portals
            </Link>
            <Link
              href="#security"
              className="hover:text-foreground transition-colors"
            >
              Security
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/register">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* ==================== Hero ==================== */}
      <section className="relative overflow-hidden py-24 md:py-32">
        {/* Gradient mesh background */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background: [
              "radial-gradient(ellipse 80% 60% at 50% 0%, hsl(224 76% 48% / 0.12), transparent)",
              "radial-gradient(ellipse 50% 50% at 80% 50%, hsl(256 60% 65% / 0.10), transparent)",
              "radial-gradient(ellipse 50% 40% at 20% 80%, hsl(199 89% 48% / 0.08), transparent)",
            ].join(", "),
          }}
        />

        <motion.div
          className="container relative text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp}>
            <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm">
              &#x1F680; Enterprise-Grade AI Learning Platform
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance"
          >
            The Future of
            <span className="gradient-text"> School Management</span>
            <br />
            is Here
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 text-balance"
          >
            An enterprise AI-powered LMS built for the modern era. Six
            role-specific portals, Gemini AI tutoring, Stripe payments,
            real-time analytics, and bank-grade security &mdash; all in one
            beautiful platform.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button size="lg" className="text-base px-8" asChild>
              <Link href="/auth/register">
                Start Free Trial <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8"
              asChild
            >
              <Link href="/dashboard/overview">View Demo Dashboard</Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold text-primary">{s.value}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ==================== Features ==================== */}
      <section id="features" className="py-24 bg-muted/30">
        <div className="container">
          <RevealSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A complete ecosystem built from the ground up for modern education
              institutions.
            </p>
          </RevealSection>

          <motion.div
            ref={featuresRef}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
          >
            {features.map((f) => (
              <motion.div key={f.title} variants={fadeUp}>
                <Card className="border-0 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 rounded-xl ${f.bg} flex items-center justify-center mb-4`}
                    >
                      <f.icon className={`h-6 w-6 ${f.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {f.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== AI Features ==================== */}
      <section className="py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <RevealSection>
              <Badge className="mb-4">AI-Powered Features</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Gemini AI Working for Every Learner
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Our AI engine doesn&apos;t just answer questions &mdash; it
                knows each student&apos;s curriculum, past performance, and
                learning style to deliver truly personalized education.
              </p>
              <div className="space-y-4">
                {aiFeatures.map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </RevealSection>

            <RevealSection>
              <div className="grid grid-cols-2 gap-4">
                {aiStats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.04 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`rounded-2xl p-6 ${stat.color}`}
                  >
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm mt-1 opacity-80">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ==================== Portals ==================== */}
      <section id="portals" className="py-24 bg-muted/30">
        <div className="container">
          <RevealSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Six Dedicated Portals
            </h2>
            <p className="text-muted-foreground text-lg">
              Every stakeholder gets a purpose-built experience tailored to
              their needs.
            </p>
          </RevealSection>

          <motion.div
            ref={portalsRef}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={staggerContainer}
            initial="hidden"
            animate={portalsInView ? "visible" : "hidden"}
          >
            {roles.map((role) => (
              <motion.div key={role.title} variants={fadeUp}>
                <Link href={role.href}>
                  <Card className="hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="text-3xl mb-3">{role.emoji}</div>
                      <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                        {role.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {role.desc}
                      </p>
                      <div className="flex items-center gap-1 text-primary text-sm mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        Demo this portal <ArrowRight className="h-3 w-3" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== Security ==================== */}
      <section id="security" className="py-24">
        <div className="container">
          <RevealSection className="text-center mb-16">
            <Badge variant="destructive" className="mb-4">
              Bank-Grade Security
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built Secure by Design
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              OWASP Top 10 compliant. Every feature, every API, every data
              access secured.
            </p>
          </RevealSection>

          <motion.div
            ref={securityRef}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate={securityInView ? "visible" : "hidden"}
          >
            {securityItems.map((item) => (
              <motion.div key={item.title} variants={fadeUp}>
                <Card className="text-center p-6 border-0 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl bg-primary text-primary-foreground p-12 md:p-16 text-center overflow-hidden"
          >
            {/* Gradient glow border effect (pseudo via inset shadow + ring) */}
            <div
              className="pointer-events-none absolute -inset-[1px] rounded-3xl"
              aria-hidden="true"
              style={{
                background:
                  "linear-gradient(135deg, hsl(224 76% 48%), hsl(256 60% 65%), hsl(199 89% 48%))",
                zIndex: 0,
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
                WebkitMaskComposite: "xor",
                padding: "2px",
                borderRadius: "1.5rem",
              }}
            />

            <div className="relative z-10">
              <Bell className="h-12 w-12 mx-auto mb-6 opacity-80" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your School?
              </h2>
              <p className="text-lg opacity-80 mb-10 max-w-xl mx-auto">
                Join 500+ schools already using EduSphere. Start your free trial
                today &mdash; no credit card required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-base px-8"
                  asChild
                >
                  <Link href="/auth/register">
                    Start Free Trial <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  asChild
                >
                  <Link href="/dashboard/overview">View Live Demo</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== Footer ==================== */}
      <footer className="border-t py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <span className="font-semibold">EduSphere LMS</span>
              <span className="text-muted-foreground text-sm">&copy; 2025</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
