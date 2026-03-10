"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { StatsCard } from "@/components/dashboard/stats-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertCircle,
  GraduationCap,
  UserCheck,
  CalendarDays,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                    Data                                    */
/* -------------------------------------------------------------------------- */

const recentActivity = [
  {
    action: "New student enrolled",
    who: "Emma Wilson",
    time: "2 min ago",
    type: "success",
  },
  {
    action: "Assignment submitted",
    who: "Jake Thompson",
    time: "15 min ago",
    type: "info",
  },
  {
    action: "Fee payment received",
    who: "Park Family",
    time: "1 hr ago",
    type: "success",
  },
  {
    action: "Quiz completed — 92%",
    who: "Sophia Lee",
    time: "2 hr ago",
    type: "success",
  },
  {
    action: "Attendance marked absent",
    who: "Carlos Rivera",
    time: "3 hr ago",
    type: "warning",
  },
  {
    action: "Live class ended",
    who: "Mr. Peterson (Math)",
    time: "4 hr ago",
    type: "info",
  },
];

const topCourses = [
  {
    name: "Advanced Mathematics",
    students: 38,
    completion: 72,
    color: "bg-blue-500",
  },
  {
    name: "English Literature",
    students: 32,
    completion: 88,
    color: "bg-purple-500",
  },
  { name: "Physics", students: 27, completion: 61, color: "bg-orange-500" },
  {
    name: "World History",
    students: 35,
    completion: 45,
    color: "bg-green-500",
  },
];

const upcomingExams = [
  {
    subject: "Mathematics Final",
    date: "Dec 15",
    class: "Grade 10A",
    room: "Hall B",
  },
  {
    subject: "Science Mid-Term",
    date: "Dec 12",
    class: "Grade 9B",
    room: "Room 204",
  },
  {
    subject: "English Essay",
    date: "Dec 10",
    class: "Grade 11",
    room: "Room 101",
  },
];

const weeklyAttendance = [
  { day: "Mon", rate: 96 },
  { day: "Tue", rate: 94 },
  { day: "Wed", rate: 97 },
  { day: "Thu", rate: 93 },
  { day: "Fri", rate: 91 },
];

const quickActions = [
  {
    label: "Mark Attendance",
    icon: CheckCircle2,
    href: "/dashboard/attendance",
    gradient: "from-green-500 to-emerald-600",
    shadow: "shadow-green-500/25",
  },
  {
    label: "Create Course",
    icon: BookOpen,
    href: "/dashboard/courses/create",
    gradient: "from-blue-500 to-indigo-600",
    shadow: "shadow-blue-500/25",
  },
  {
    label: "Add Student",
    icon: Users,
    href: "/dashboard/students",
    gradient: "from-purple-500 to-violet-600",
    shadow: "shadow-purple-500/25",
  },
  {
    label: "Generate Report",
    icon: TrendingUp,
    href: "/dashboard/reports",
    gradient: "from-orange-500 to-amber-600",
    shadow: "shadow-orange-500/25",
  },
];

/* -------------------------------------------------------------------------- */
/*                            Animation Variants                              */
/* -------------------------------------------------------------------------- */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const cardHover = {
  scale: 1.02,
  transition: { type: "spring" as const, stiffness: 300, damping: 20 },
};

/* -------------------------------------------------------------------------- */
/*                          Animated Number Component                         */
/* -------------------------------------------------------------------------- */

function AnimatedNumber({ value }: { value: string }) {
  const [displayed, setDisplayed] = useState(value);

  useEffect(() => {
    // Extract the numeric portion from the value string
    const numericMatch = value.match(/([\d,.]+)/);
    if (!numericMatch) {
      setDisplayed(value);
      return;
    }

    const raw = numericMatch[1];
    const prefix = value.slice(0, value.indexOf(raw));
    const suffix = value.slice(value.indexOf(raw) + raw.length);
    const target = parseFloat(raw.replace(/,/g, ""));
    const isDecimal = raw.includes(".");
    const hasCommas = raw.includes(",");
    const decimals = isDecimal ? raw.split(".")[1].length : 0;

    const start = 0;
    const duration = 900; // ms
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (target - start) * eased;

      let formatted = isDecimal
        ? current.toFixed(decimals)
        : Math.round(current).toString();

      if (hasCommas) {
        const parts = formatted.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        formatted = parts.join(".");
      }

      setDisplayed(`${prefix}${formatted}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [value]);

  return <span>{displayed}</span>;
}

/* -------------------------------------------------------------------------- */
/*                               Greeting Helper                              */
/* -------------------------------------------------------------------------- */

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function formatDate(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */

export default function OverviewPage() {
  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ------------------------------------------------------------------ */}
      {/*                        Welcome Greeting                            */}
      {/* ------------------------------------------------------------------ */}
      <motion.div variants={itemVariants}>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {getGreeting()}, Sarah!
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Here&apos;s what&apos;s happening at Greenfield Academy today.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2 sm:mt-0">
            <CalendarDays className="h-4 w-4" />
            <span>{formatDate()}</span>
          </div>
        </div>
      </motion.div>

      {/* ------------------------------------------------------------------ */}
      {/*                         Primary Stats                              */}
      {/* ------------------------------------------------------------------ */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          {
            title: "Total Students",
            value: "1,248",
            change: "+24 this month",
            changeType: "positive" as const,
            icon: <Users className="h-4 w-4 text-blue-500" />,
            iconBg: "bg-blue-500/10",
          },
          {
            title: "Active Courses",
            value: "86",
            change: "+3 new courses",
            changeType: "positive" as const,
            icon: <BookOpen className="h-4 w-4 text-green-500" />,
            iconBg: "bg-green-500/10",
          },
          {
            title: "Fee Collected",
            value: "$84,200",
            change: "89% of target",
            changeType: "positive" as const,
            icon: <DollarSign className="h-4 w-4 text-emerald-500" />,
            iconBg: "bg-emerald-500/10",
          },
          {
            title: "Avg. Attendance",
            value: "94.2%",
            change: "+1.4% vs last week",
            changeType: "positive" as const,
            icon: <TrendingUp className="h-4 w-4 text-purple-500" />,
            iconBg: "bg-purple-500/10",
          },
        ].map((stat) => (
          <motion.div key={stat.title} whileHover={cardHover}>
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </motion.div>

      {/* ------------------------------------------------------------------ */}
      {/*                        Secondary Stats                             */}
      {/* ------------------------------------------------------------------ */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          {
            title: "Teachers",
            value: "68",
            change: "All active",
            changeType: "neutral" as const,
            icon: <UserCheck className="h-4 w-4 text-indigo-500" />,
            iconBg: "bg-indigo-500/10",
          },
          {
            title: "Assignments Due",
            value: "12",
            change: "4 overdue",
            changeType: "negative" as const,
            icon: <Clock className="h-4 w-4 text-orange-500" />,
            iconBg: "bg-orange-500/10",
          },
          {
            title: "Avg. GPA",
            value: "3.42",
            change: "+0.08 vs last term",
            changeType: "positive" as const,
            icon: <GraduationCap className="h-4 w-4 text-pink-500" />,
            iconBg: "bg-pink-500/10",
          },
          {
            title: "At-Risk Students",
            value: "7",
            change: "Needs attention",
            changeType: "negative" as const,
            icon: <AlertCircle className="h-4 w-4 text-red-500" />,
            iconBg: "bg-red-500/10",
          },
        ].map((stat) => (
          <motion.div key={stat.title} whileHover={cardHover}>
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </motion.div>

      {/* ------------------------------------------------------------------ */}
      {/*                  Animated Key Metrics (Numbers)                    */}
      {/* ------------------------------------------------------------------ */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { label: "Total Students", value: "1,248", color: "text-blue-600" },
          { label: "Active Courses", value: "86", color: "text-green-600" },
          {
            label: "Fee Collected",
            value: "$84,200",
            color: "text-emerald-600",
          },
          {
            label: "Avg. Attendance",
            value: "94.2%",
            color: "text-purple-600",
          },
        ].map((metric) => (
          <motion.div key={metric.label} whileHover={cardHover}>
            <Card>
              <CardContent className="p-5 text-center">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                  {metric.label}
                </p>
                <p
                  className={`text-3xl font-extrabold tabular-nums ${metric.color}`}
                >
                  <AnimatedNumber value={metric.value} />
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* ------------------------------------------------------------------ */}
      {/*               Attendance Chart + Upcoming Exams                    */}
      {/* ------------------------------------------------------------------ */}
      <motion.div variants={itemVariants} className="grid lg:grid-cols-3 gap-6">
        {/* Attendance Area Chart */}
        <motion.div className="lg:col-span-2" whileHover={cardHover}>
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Weekly Attendance</CardTitle>
              <CardDescription>
                Average attendance rate this week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={weeklyAttendance}
                    margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="attendanceGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="hsl(var(--primary))"
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="100%"
                          stopColor="hsl(var(--primary))"
                          stopOpacity={0.02}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="day"
                      tickLine={false}
                      axisLine={false}
                      className="text-xs fill-muted-foreground"
                    />
                    <YAxis
                      domain={[85, 100]}
                      tickLine={false}
                      axisLine={false}
                      className="text-xs fill-muted-foreground"
                      tickFormatter={(v: number) => `${v}%`}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        border: "1px solid hsl(var(--border))",
                        background: "hsl(var(--popover))",
                        color: "hsl(var(--popover-foreground))",
                        fontSize: "12px",
                      }}
                      formatter={(value) => [`${value}%`, "Attendance"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="rate"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2.5}
                      fill="url(#attendanceGradient)"
                      dot={{
                        r: 4,
                        fill: "hsl(var(--primary))",
                        stroke: "hsl(var(--background))",
                        strokeWidth: 2,
                      }}
                      activeDot={{
                        r: 6,
                        fill: "hsl(var(--primary))",
                        stroke: "hsl(var(--background))",
                        strokeWidth: 2,
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Exams */}
        <motion.div whileHover={cardHover}>
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Upcoming Exams</CardTitle>
              <CardDescription>Next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {upcomingExams.map((exam, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                  >
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">DEC</div>
                      <div className="text-lg font-bold leading-none">
                        {exam.date.split(" ")[1]}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{exam.subject}</p>
                      <p className="text-xs text-muted-foreground">
                        {exam.class} &bull; {exam.room}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* ------------------------------------------------------------------ */}
      {/*                   Recent Activity + Courses                        */}
      {/* ------------------------------------------------------------------ */}
      <motion.div variants={itemVariants} className="grid lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <motion.div className="lg:col-span-2" whileHover={cardHover}>
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Recent Activity</CardTitle>
              <CardDescription>
                Last 24 hours across all modules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {recentActivity.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.07 }}
                    className="flex items-center gap-3"
                  >
                    <div
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        item.type === "success"
                          ? "bg-green-500"
                          : item.type === "warning"
                            ? "bg-orange-500"
                            : "bg-blue-500"
                      }`}
                    />
                    <Avatar className="h-7 w-7 shrink-0">
                      <AvatarFallback className="text-xs">
                        {item.who
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {item.action}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.who}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {item.time}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Courses */}
        <motion.div whileHover={cardHover}>
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">
                Top Courses by Completion
              </CardTitle>
              <CardDescription>
                Student completion rates this term
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCourses.map((course, i) => (
                  <motion.div
                    key={course.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{course.name}</span>
                      <span className="text-muted-foreground">
                        {course.completion}%
                      </span>
                    </div>
                    <Progress value={course.completion} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {course.students} students enrolled
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* ------------------------------------------------------------------ */}
      {/*                          Quick Actions                             */}
      {/* ------------------------------------------------------------------ */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {quickActions.map((action, i) => (
          <motion.a
            key={action.label}
            href={action.href}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.08 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="group flex flex-col items-center gap-3 rounded-xl border bg-card p-5 text-center cursor-pointer transition-shadow hover:shadow-lg"
          >
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} ${action.shadow} shadow-lg flex items-center justify-center transition-transform group-hover:scale-110`}
            >
              <action.icon className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-semibold">{action.label}</span>
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  );
}
