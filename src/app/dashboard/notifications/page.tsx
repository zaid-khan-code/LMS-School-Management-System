"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Bell, BellOff, Search, CheckCheck, Trash2,
  BookOpen, ClipboardList, DollarSign, AlertCircle,
  Calendar, GraduationCap, MessageSquare, Megaphone,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NotifCategory = "all" | "academic" | "financial" | "admin" | "system";

interface Notification {
  id: string;
  title: string;
  body: string;
  category: "academic" | "financial" | "admin" | "system";
  icon: React.ElementType;
  iconColor: string;
  time: string;
  read: boolean;
  priority: "normal" | "high";
}

const initialNotifications: Notification[] = [
  {
    id: "1", title: "Assignment graded: Calculus Integration",
    body: "Dr. Sarah Johnson graded your submission. You scored 47/50 (94%).",
    category: "academic", icon: ClipboardList, iconColor: "text-blue-500 bg-blue-500/10",
    time: "5 min ago", read: false, priority: "normal",
  },
  {
    id: "2", title: "Fee payment overdue",
    body: "Your December tuition fee of $850 is 3 days overdue. Please pay to avoid late charges.",
    category: "financial", icon: DollarSign, iconColor: "text-red-500 bg-red-500/10",
    time: "2 hr ago", read: false, priority: "high",
  },
  {
    id: "3", title: "New course available: Advanced Python",
    body: "Mr. Park has published a new elective course. Enrollment closes Dec 12.",
    category: "academic", icon: BookOpen, iconColor: "text-green-500 bg-green-500/10",
    time: "4 hr ago", read: false, priority: "normal",
  },
  {
    id: "4", title: "Exam schedule released",
    body: "Final exam timetable for December 2025 has been published. Check the Exams page.",
    category: "academic", icon: Calendar, iconColor: "text-orange-500 bg-orange-500/10",
    time: "Yesterday", read: true, priority: "normal",
  },
  {
    id: "5", title: "Grade report available",
    body: "Your Term 1 grade report is ready. GPA: 3.8 — Top 10% of class.",
    category: "academic", icon: GraduationCap, iconColor: "text-purple-500 bg-purple-500/10",
    time: "Yesterday", read: true, priority: "normal",
  },
  {
    id: "6", title: "School closed — Dec 25 to Jan 2",
    body: "The school will be closed for the winter holiday. All scheduled events are postponed.",
    category: "admin", icon: Megaphone, iconColor: "text-teal-500 bg-teal-500/10",
    time: "2 days ago", read: true, priority: "normal",
  },
  {
    id: "7", title: "New reply to your message",
    body: "Ms. Roberts replied to your question about the essay assignment rubric.",
    category: "academic", icon: MessageSquare, iconColor: "text-indigo-500 bg-indigo-500/10",
    time: "3 days ago", read: true, priority: "normal",
  },
  {
    id: "8", title: "System maintenance — Dec 10, 02:00 to 04:00 UTC",
    body: "EduSphere will be offline for scheduled maintenance. Please save any work beforehand.",
    category: "system", icon: AlertCircle, iconColor: "text-yellow-500 bg-yellow-500/10",
    time: "4 days ago", read: true, priority: "high",
  },
];

const categoryLabels: Record<string, string> = {
  all: "All",
  academic: "Academic",
  financial: "Financial",
  admin: "Admin",
  system: "System",
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<NotifCategory>("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filtered = notifications.filter((n) => {
    const matchesTab = activeTab === "all" || n.category === activeTab;
    const matchesSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.body.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const markRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

  const deleteNotif = (id: string) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {unreadCount > 0
              ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
              : "All caught up!"}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllRead}>
            <CheckCheck className="h-4 w-4" />
            Mark all read
          </Button>
        )}
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Unread", value: notifications.filter((n) => !n.read).length, color: "text-blue-500" },
          { label: "Academic", value: notifications.filter((n) => n.category === "academic").length, color: "text-green-500" },
          { label: "Financial", value: notifications.filter((n) => n.category === "financial").length, color: "text-red-500" },
          { label: "High Priority", value: notifications.filter((n) => n.priority === "high").length, color: "text-orange-500" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border bg-card p-3 text-center">
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search notifications…"
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Card>
        <CardHeader className="pb-0">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as NotifCategory)}>
            <TabsList className="w-full justify-start">
              {(["all", "academic", "financial", "admin", "system"] as NotifCategory[]).map((tab) => {
                const count =
                  tab === "all"
                    ? notifications.filter((n) => !n.read).length
                    : notifications.filter((n) => n.category === tab && !n.read).length;
                return (
                  <TabsTrigger key={tab} value={tab} className="gap-1.5">
                    {categoryLabels[tab]}
                    {count > 0 && (
                      <Badge variant="default" className="h-4 px-1 text-xs">
                        {count}
                      </Badge>
                    )}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {(["all", "academic", "financial", "admin", "system"] as NotifCategory[]).map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-0">
                <CardContent className="p-0 divide-y">
                  {filtered.length === 0 ? (
                    <div className="py-16 text-center">
                      <BellOff className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                      <p className="font-medium">No notifications</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {search ? "No results for that search." : "You are all caught up!"}
                      </p>
                    </div>
                  ) : (
                    filtered.map((notif) => (
                      <div
                        key={notif.id}
                        className={cn(
                          "flex items-start gap-4 px-5 py-4 group hover:bg-muted/30 transition-colors cursor-pointer",
                          !notif.read && "bg-primary/5 border-l-2 border-l-primary"
                        )}
                        onClick={() => markRead(notif.id)}
                      >
                        <div className={cn("mt-0.5 rounded-full p-2 shrink-0", notif.iconColor)}>
                          <notif.icon className="h-4 w-4" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className={cn("text-sm", !notif.read ? "font-semibold" : "font-medium")}>
                              {notif.title}
                            </p>
                            {notif.priority === "high" && (
                              <Badge variant="destructive" className="text-xs px-1.5 py-0">
                                Urgent
                              </Badge>
                            )}
                            {!notif.read && (
                              <span className="h-2 w-2 rounded-full bg-primary shrink-0 ml-auto" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{notif.body}</p>
                          <p className="text-xs text-muted-foreground mt-1.5">{notif.time}</p>
                        </div>

                        <button
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-destructive/10 hover:text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotif(notif.id);
                          }}
                          title="Delete notification"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </CardContent>
              </TabsContent>
            ))}
          </Tabs>
        </CardHeader>
      </Card>

      <div className="flex items-center justify-between rounded-xl border p-4">
        <div className="flex items-center gap-3">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Notification Preferences</p>
            <p className="text-xs text-muted-foreground">
              Control which notifications you receive and how.
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" asChild>
          <a href="/dashboard/settings">Manage</a>
        </Button>
      </div>
    </div>
  );
}
