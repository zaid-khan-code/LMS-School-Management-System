"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap, LayoutDashboard, BookOpen, ClipboardList, Brain,
  BarChart3, Users, UserCheck, Calendar, DollarSign, FileText,
  Bell, Library, Briefcase, Shield, Settings, ChevronLeft,
  ChevronRight, Bot, MessageSquare,
} from "lucide-react";

interface NavLink {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
}

interface NavSection {
  title: string;
  links: NavLink[];
}

const navSections: NavSection[] = [
  {
    title: "Overview",
    links: [
      { href: "/dashboard/overview", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Learning",
    links: [
      { href: "/dashboard/courses", label: "Courses", icon: BookOpen },
      { href: "/dashboard/assignments", label: "Assignments", icon: ClipboardList, badge: 3 },
      { href: "/dashboard/quiz", label: "Quizzes", icon: Brain },
      { href: "/dashboard/gradebook", label: "Gradebook", icon: BarChart3 },
      { href: "/dashboard/ai-tutor", label: "AI Tutor", icon: Bot },
    ],
  },
  {
    title: "School",
    links: [
      { href: "/dashboard/students", label: "Students", icon: Users },
      { href: "/dashboard/teachers", label: "Teachers", icon: UserCheck },
      { href: "/dashboard/attendance", label: "Attendance", icon: Calendar },
      { href: "/dashboard/timetable", label: "Timetable", icon: Calendar },
      { href: "/dashboard/fees", label: "Fee Management", icon: DollarSign },
      { href: "/dashboard/exams", label: "Exams", icon: FileText },
      { href: "/dashboard/library", label: "Library", icon: Library },
    ],
  },
  {
    title: "Communication",
    links: [
      { href: "/dashboard/notifications", label: "Notifications", icon: Bell, badge: 3 },
      { href: "/dashboard/messages", label: "Messages", icon: MessageSquare, badge: 1 },
      { href: "/dashboard/announcements", label: "Announcements", icon: Bell },
    ],
  },
  {
    title: "Admin",
    links: [
      { href: "/dashboard/hr", label: "HR & Payroll", icon: Briefcase },
      { href: "/dashboard/reports", label: "Reports", icon: BarChart3 },
      { href: "/dashboard/security", label: "Security Logs", icon: Shield },
      { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ],
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r bg-background transition-all duration-300 shrink-0",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className={cn("flex items-center gap-2 px-4 h-16 border-b shrink-0", collapsed && "justify-center px-2")}>
        <GraduationCap className="h-6 w-6 text-primary shrink-0" />
        {!collapsed && <span className="font-bold text-base truncate">EduSphere</span>}
      </div>

      {/* Nav */}
      <ScrollArea className="flex-1 py-3">
        <nav className="space-y-5 px-2">
          {navSections.map((section) => (
            <div key={section.title}>
              {!collapsed && (
                <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                  {section.title}
                </p>
              )}
              <ul className="space-y-0.5">
                {section.links.map((link) => {
                  const isActive = pathname === link.href || (link.href !== "/dashboard" && pathname.startsWith(link.href));
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                          isActive ? "bg-primary/10 text-primary" : "text-muted-foreground",
                          collapsed && "justify-center px-2"
                        )}
                        title={collapsed ? link.label : undefined}
                      >
                        <link.icon className="h-4 w-4 shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="flex-1 truncate">{link.label}</span>
                            {link.badge && (
                              <Badge variant="default" className="h-5 text-xs px-1.5 ml-auto">
                                {link.badge}
                              </Badge>
                            )}
                          </>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border bg-background shadow-sm hover:bg-accent transition-colors z-10"
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>
    </aside>
  );
}
