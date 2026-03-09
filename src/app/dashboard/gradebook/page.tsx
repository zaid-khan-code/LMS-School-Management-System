"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const grades = [
  { course: "Advanced Mathematics", grade: 88, letter: "B+", weight: 4, assignments: 4, quizzes: 3, exam: 91 },
  { course: "English Literature", grade: 94, letter: "A", weight: 3, assignments: 5, quizzes: 2, exam: 96 },
  { course: "Physics", grade: 79, letter: "C+", weight: 4, assignments: 3, quizzes: 3, exam: 74 },
  { course: "World History", grade: 85, letter: "B", weight: 3, assignments: 4, quizzes: 4, exam: 88 },
  { course: "Computer Science", grade: 97, letter: "A+", weight: 3, assignments: 5, quizzes: 3, exam: 99 },
];

const chartData = grades.map((g) => ({ name: g.course.split(" ")[0], grade: g.grade }));

const letterColor: Record<string, string> = {
  "A+": "bg-green-500", "A": "bg-green-500", "B+": "bg-blue-500", "B": "bg-blue-500",
  "C+": "bg-orange-500", "C": "bg-orange-500", "D": "bg-red-500", "F": "bg-red-600",
};

const gpa = (grades.reduce((acc, g) => {
  const pts = g.letter.startsWith("A+") ? 4.3 : g.letter.startsWith("A") ? 4.0 : g.letter.startsWith("B+") ? 3.3 : g.letter.startsWith("B") ? 3.0 : g.letter.startsWith("C+") ? 2.3 : 2.0;
  return acc + pts * g.weight;
}, 0) / grades.reduce((acc, g) => acc + g.weight, 0)).toFixed(2);

export default function GradebookPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Gradebook</h1>
        <p className="text-sm text-muted-foreground">Your academic performance this term</p>
      </div>

      {/* GPA cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Current GPA", value: gpa, sub: "This semester", color: "text-primary" },
          { label: "Avg Grade", value: "89%", sub: "Across all courses", color: "text-green-500" },
          { label: "Rank", value: "#12", sub: "In your class", color: "text-purple-500" },
          { label: "Credits", value: "17", sub: "Enrolled", color: "text-orange-500" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4 text-center">
              <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-sm font-medium mt-1">{s.label}</div>
              <div className="text-xs text-muted-foreground">{s.sub}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Grade Distribution</CardTitle>
          <CardDescription>Your grades across all courses</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }}
                formatter={(v) => [`${v}%`, "Grade"]}
              />
              <Bar dataKey="grade" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Grade table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Course Grades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {grades.map((g) => (
              <div key={g.course} className="space-y-2 pb-4 border-b last:border-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{g.course}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{g.grade}%</span>
                    <Badge className={`${letterColor[g.letter]} text-white border-0 text-xs px-2`}>
                      {g.letter}
                    </Badge>
                  </div>
                </div>
                <Progress value={g.grade} className="h-2" />
                <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                  <span>Assignments: {g.assignments} done</span>
                  <span>Quizzes: {g.quizzes} done</span>
                  <span>Exam: {g.exam}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
