import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, MapPin, Download, FileText, TrendingUp } from "lucide-react";
const upcomingExams = [
  { id: "1", subject: "Advanced Mathematics", date: "Dec 15, 2025", time: "09:00 - 11:00", room: "Hall B, Seat 24", status: "upcoming", type: "Final Exam" },
  { id: "2", subject: "Physics", date: "Dec 12, 2025", time: "13:00 - 14:30", room: "Room 204, Seat 12", status: "upcoming", type: "Mid-Term" },
  { id: "3", subject: "English Literature", date: "Dec 10, 2025", time: "09:00 - 10:30", room: "Room 101, Seat 8", status: "upcoming", type: "Essay Exam" },
];

const completedExams = [
  { id: "4", subject: "Computer Science", date: "Nov 28, 2025", type: "Practical Exam", score: 94, maxScore: 100, grade: "A" },
  { id: "5", subject: "World History", date: "Nov 20, 2025", type: "Mid-Term", score: 82, maxScore: 100, grade: "B" },
  { id: "6", subject: "Chemistry", date: "Nov 15, 2025", type: "Lab Practical", score: 88, maxScore: 100, grade: "B+" },
];

export default function ExamsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Examinations</h1>
        <p className="text-sm text-muted-foreground">Upcoming exams and past results</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Upcoming", value: upcomingExams.length, color: "text-orange-500" },
          { label: "Completed", value: completedExams.length, color: "text-green-500" },
          { label: "Avg Score", value: "88%", color: "text-blue-500" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border bg-card p-4 text-center">
            <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Upcoming */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Upcoming Exams</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingExams.map((exam) => (
            <div key={exam.id} className="flex items-center justify-between p-4 rounded-xl border bg-orange-50/50 dark:bg-orange-900/5 border-orange-200/50">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{exam.subject}</h3>
                  <Badge variant="warning" className="text-xs">{exam.type}</Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" />{exam.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{exam.time}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{exam.room}</span>
                </div>
              </div>
              <Button size="sm" variant="outline" className="gap-1.5">
                <Download className="h-3 w-3" />Hall Ticket
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-base">Exam Results</CardTitle>
            <Button size="sm" variant="outline"><FileText className="h-4 w-4" />Download Report Card</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {completedExams.map((exam) => {
              const pct = Math.round((exam.score / exam.maxScore) * 100);
              const gradeColor =
                exam.grade.startsWith("A") ? "border-green-500 text-green-600 dark:text-green-400" :
                exam.grade.startsWith("B") ? "border-blue-500 text-blue-600 dark:text-blue-400" :
                "border-orange-500 text-orange-600 dark:text-orange-400";
              const barColor =
                pct >= 90 ? "bg-green-500" : pct >= 75 ? "bg-blue-500" : "bg-orange-500";
              return (
                <div key={exam.id} className="p-4 rounded-xl border space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-sm">{exam.subject}</h3>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                        <span>{exam.type}</span>
                        <span>{exam.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm font-semibold">{exam.score}/{exam.maxScore}</p>
                        <p className="text-xs text-muted-foreground">{pct}%</p>
                      </div>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 ${gradeColor}`}>
                        {exam.grade}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className={`h-1.5 w-full rounded-full bg-muted overflow-hidden`}>
                      <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${pct}%` }} />
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {pct >= 90 ? "Excellent" : pct >= 75 ? "Good" : "Needs improvement"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
