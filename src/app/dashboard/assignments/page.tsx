import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, BookOpen, Plus } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

const assignments = [
  { id: "1", title: "Calculus Integration Problems", course: "Advanced Mathematics", due: "2025-12-10", status: "pending", points: 50 },
  { id: "2", title: "Essay: Victorian Literature", course: "English Literature", due: "2025-12-08", status: "submitted", points: 100, grade: null },
  { id: "3", title: "Physics Lab Report", course: "Physics", due: "2025-12-05", status: "graded", points: 75, grade: 68 },
  { id: "4", title: "History Timeline Project", course: "World History", due: "2025-12-15", status: "pending", points: 60 },
  { id: "5", title: "Data Structures Quiz", course: "Computer Science", due: "2025-12-03", status: "graded", points: 40, grade: 38 },
  { id: "6", title: "Chemical Reactions Report", course: "Chemistry", due: "2025-12-20", status: "pending", points: 80 },
];

const statusConfig: Record<string, { label: string; variant: "success"|"warning"|"info"|"default"|"secondary"|"destructive"|"outline" }> = {
  pending: { label: "Pending", variant: "warning" },
  submitted: { label: "Submitted", variant: "info" },
  graded: { label: "Graded", variant: "success" },
  late: { label: "Late", variant: "destructive" },
};

function AssignmentCard({ a }: { a: typeof assignments[0] }) {
  const cfg = statusConfig[a.status];
  const isOverdue = new Date(a.due) < new Date() && a.status === "pending";
  return (
    <Link href={`/dashboard/assignments/${a.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer group">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm group-hover:text-primary transition-colors truncate">{a.title}</h3>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                <BookOpen className="h-3 w-3" />
                <span>{a.course}</span>
              </div>
            </div>
            <Badge variant={isOverdue ? "destructive" : cfg.variant}>{isOverdue ? "Overdue" : cfg.label}</Badge>
          </div>
          <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <CalendarDays className="h-3 w-3" />
              Due {formatDate(a.due)}
            </span>
            <span>
              {a.status === "graded"
                ? <span className="font-medium text-foreground">{(a as typeof a & { grade: number }).grade}/{a.points} pts</span>
                : <span>{a.points} pts</span>}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function AssignmentsPage() {
  const pending = assignments.filter((a) => a.status === "pending");
  const submitted = assignments.filter((a) => a.status === "submitted");
  const graded = assignments.filter((a) => a.status === "graded");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Assignments</h1>
          <p className="text-sm text-muted-foreground">Track and manage all your assignments</p>
        </div>
        <Button asChild><Link href="/dashboard/assignments/create"><Plus className="h-4 w-4" />New Assignment</Link></Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Pending", value: pending.length, color: "text-orange-500" },
          { label: "Submitted", value: submitted.length, color: "text-blue-500" },
          { label: "Graded", value: graded.length, color: "text-green-500" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border bg-card p-4 text-center">
            <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-sm font-medium mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All ({assignments.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pending.length})</TabsTrigger>
          <TabsTrigger value="submitted">Submitted ({submitted.length})</TabsTrigger>
          <TabsTrigger value="graded">Graded ({graded.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4 grid md:grid-cols-2 gap-3">
          {assignments.map((a) => <AssignmentCard key={a.id} a={a} />)}
        </TabsContent>
        <TabsContent value="pending" className="mt-4 grid md:grid-cols-2 gap-3">
          {pending.map((a) => <AssignmentCard key={a.id} a={a} />)}
        </TabsContent>
        <TabsContent value="submitted" className="mt-4 grid md:grid-cols-2 gap-3">
          {submitted.map((a) => <AssignmentCard key={a.id} a={a} />)}
        </TabsContent>
        <TabsContent value="graded" className="mt-4 grid md:grid-cols-2 gap-3">
          {graded.map((a) => <AssignmentCard key={a.id} a={a} />)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
