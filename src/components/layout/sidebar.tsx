'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  LayoutDashboard,
  BookOpen,
  Users,
  BarChart3,
  Settings,
  GraduationCap,
  MessageSquare,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  Brain,
  UserCheck,
  CalendarDays,
  CreditCard,
  FileCheck,
  Megaphone,
} from 'lucide-react'
import { useState } from 'react'

export type SidebarItem = {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string | number
}

export type SidebarSection = {
  title?: string
  items: SidebarItem[]
}

const defaultNavigation: SidebarSection[] = [
  {
    items: [
      { title: 'Dashboard', href: '/dashboard/overview', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Learning',
    items: [
      { title: 'Courses', href: '/dashboard/courses', icon: BookOpen },
      { title: 'Assignments', href: '/dashboard/assignments', icon: ClipboardList, badge: 3 },
      { title: 'Quizzes', href: '/dashboard/quiz', icon: Brain },
      { title: 'Gradebook', href: '/dashboard/gradebook', icon: BarChart3 },
    ],
  },
  {
    title: 'School',
    items: [
      { title: 'Students', href: '/dashboard/students', icon: Users },
      { title: 'Teachers', href: '/dashboard/teachers', icon: GraduationCap },
      { title: 'Attendance', href: '/dashboard/attendance', icon: UserCheck },
      { title: 'Timetable', href: '/dashboard/timetable', icon: CalendarDays },
      { title: 'Fees', href: '/dashboard/fees', icon: CreditCard },
      { title: 'Exams', href: '/dashboard/exams', icon: FileCheck },
    ],
  },
  {
    title: 'Communication',
    items: [
      { title: 'Announcements', href: '/dashboard/announcements', icon: Megaphone },
      { title: 'Messages', href: '/dashboard/messages', icon: MessageSquare, badge: 5 },
    ],
  },
  {
    items: [
      { title: 'Settings', href: '/dashboard/settings', icon: Settings },
    ],
  },
]

interface SidebarProps {
  navigation?: SidebarSection[]
  className?: string
}

export function Sidebar({ navigation = defaultNavigation, className }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={cn(
        'flex flex-col border-r bg-card transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      <div className={cn('flex h-16 items-center border-b px-4', collapsed ? 'justify-center' : 'gap-2 justify-between')}>
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary flex-shrink-0">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">EduSphere</span>
          </Link>
        )}
        {collapsed && (
          <Link href="/">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 flex-shrink-0"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-1 px-2">
          {navigation.map((section, sectionIdx) => (
            <div key={sectionIdx} className="space-y-1">
              {section.title && !collapsed && (
                <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {section.title}
                </p>
              )}
              {section.title && collapsed && <Separator className="my-2" />}
              {section.items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                        collapsed && 'justify-center px-2'
                      )}
                      title={collapsed ? item.title : undefined}
                    >
                      <item.icon className={cn('h-5 w-5 flex-shrink-0', isActive ? 'text-primary-foreground' : '')} />
                      {!collapsed && (
                        <>
                          <span className="flex-1">{item.title}</span>
                          {item.badge && (
                            <Badge
                              variant={isActive ? 'secondary' : 'default'}
                              className="ml-auto h-5 px-1.5 text-xs"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}
