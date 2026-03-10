"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  Brain,
  BarChart3,
  Users,
  UserCheck,
  Calendar,
  DollarSign,
  FileText,
  Bell,
  Library,
  Briefcase,
  Shield,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bot,
  MessageSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
      {
        href: "/dashboard/overview",
        label: "Dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Learning",
    links: [
      { href: "/dashboard/courses", label: "Courses", icon: BookOpen },
      {
        href: "/dashboard/assignments",
        label: "Assignments",
        icon: ClipboardList,
        badge: 3,
      },
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
      {
        href: "/dashboard/notifications",
        label: "Notifications",
        icon: Bell,
        badge: 3,
      },
      {
        href: "/dashboard/messages",
        label: "Messages",
        icon: MessageSquare,
        badge: 1,
      },
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

const sidebarVariants = {
  expanded: { width: 256 },
  collapsed: { width: 64 },
};

const sectionTitleVariants = {
  visible: {
    opacity: 1,
    height: "auto",
    marginBottom: 4,
    transition: { duration: 0.2, ease: "easeOut" as const },
  },
  hidden: {
    opacity: 0,
    height: 0,
    marginBottom: 0,
    transition: { duration: 0.15, ease: "easeIn" as const },
  },
};

const labelVariants = {
  visible: {
    opacity: 1,
    width: "auto",
    transition: { duration: 0.2, delay: 0.05 },
  },
  hidden: {
    opacity: 0,
    width: 0,
    transition: { duration: 0.15 },
  },
};

const pulseKeyframes = {
  scale: [1, 1.15, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

function NavItem({
  link,
  isActive,
  collapsed,
  hoveredLink,
  onHover,
  onLeave,
}: {
  link: NavLink;
  isActive: boolean;
  collapsed: boolean;
  hoveredLink: string | null;
  onHover: (href: string) => void;
  onLeave: () => void;
}) {
  const Icon = link.icon;
  const isHovered = hoveredLink === link.href;

  const content = (
    <Link
      href={link.href}
      onMouseEnter={() => onHover(link.href)}
      onMouseLeave={onLeave}
      className={cn(
        "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "text-primary"
          : "text-muted-foreground hover:text-foreground",
        collapsed && "justify-center px-2",
      )}
    >
      {/* Sliding hover background indicator */}
      {isHovered && !isActive && (
        <motion.div
          layoutId="sidebar-hover"
          className="absolute inset-0 rounded-lg bg-accent/50"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}

      {/* Active background + left accent border */}
      {isActive && (
        <motion.div
          layoutId="sidebar-active"
          className="absolute inset-0 rounded-lg bg-primary/10 dark:bg-primary/15"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        >
          <motion.div
            className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-full bg-primary"
            layoutId="sidebar-active-accent"
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />
        </motion.div>
      )}

      {/* Icon */}
      <span className="relative z-10 shrink-0">
        <Icon
          className={cn(
            "h-4 w-4 transition-colors",
            isActive && "text-primary",
          )}
        />
      </span>

      {/* Label + Badge (animated out when collapsed) */}
      <AnimatePresence mode="wait">
        {!collapsed && (
          <motion.span
            className="relative z-10 flex flex-1 items-center gap-2 overflow-hidden"
            variants={labelVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <span className="flex-1 truncate">{link.label}</span>
            {link.badge && (
              <motion.span animate={pulseKeyframes}>
                <Badge
                  variant="default"
                  className="h-5 text-xs px-1.5 ml-auto shadow-sm"
                >
                  {link.badge}
                </Badge>
              </motion.span>
            )}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Badge in collapsed mode (small dot indicator) */}
      {collapsed && link.badge && (
        <motion.span
          className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </Link>
  );

  // Wrap in tooltip when collapsed
  if (collapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right" className="font-medium">
          <span>{link.label}</span>
          {link.badge && (
            <Badge variant="default" className="ml-2 h-5 text-xs px-1.5">
              {link.badge}
            </Badge>
          )}
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <TooltipProvider>
      <motion.aside
        className="relative flex flex-col border-r bg-background shrink-0 overflow-hidden"
        variants={sidebarVariants}
        initial={false}
        animate={collapsed ? "collapsed" : "expanded"}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Logo area with gradient accent */}
        <div className="relative shrink-0 overflow-hidden">
          {/* Gradient background accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-primary/4 to-transparent dark:from-primary/12 dark:via-primary/6 dark:to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />

          <div
            className={cn(
              "relative flex items-center gap-3 px-4 h-16",
              collapsed && "justify-center px-2",
            )}
          >
            <motion.div
              className="shrink-0"
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <GraduationCap className="h-7 w-7 text-primary drop-shadow-sm" />
            </motion.div>

            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.span
                  className="font-bold text-base tracking-tight truncate"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  EduSphere
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-3">
          <nav className="space-y-5 px-2">
            {navSections.map((section) => (
              <div key={section.title}>
                {/* Section title - animated out when collapsed */}
                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.p
                      className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider overflow-hidden"
                      variants={sectionTitleVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      {section.title}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Collapsed section divider */}
                {collapsed && (
                  <div className="mx-auto mb-1 h-px w-6 bg-border/60" />
                )}

                <ul className="space-y-0.5">
                  {section.links.map((link) => {
                    const isActive =
                      pathname === link.href ||
                      (link.href !== "/dashboard" &&
                        pathname.startsWith(link.href));
                    return (
                      <li key={link.href}>
                        <NavItem
                          link={link}
                          isActive={isActive}
                          collapsed={collapsed}
                          hoveredLink={hoveredLink}
                          onHover={setHoveredLink}
                          onLeave={() => setHoveredLink(null)}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </ScrollArea>

        {/* Collapse toggle button - glass effect */}
        <motion.button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "absolute -right-3 top-20 z-10 flex h-6 w-6 items-center justify-center rounded-full",
            "border border-border/50 bg-background/80 backdrop-blur-md",
            "shadow-lg shadow-black/5 dark:shadow-black/20",
            "hover:bg-accent hover:shadow-md",
            "transition-shadow duration-200",
          )}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <AnimatePresence mode="wait" initial={false}>
            {collapsed ? (
              <motion.div
                key="expand"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <ChevronRight className="h-3 w-3" />
              </motion.div>
            ) : (
              <motion.div
                key="collapse"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <ChevronLeft className="h-3 w-3" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.aside>
    </TooltipProvider>
  );
}
