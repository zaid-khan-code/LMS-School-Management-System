import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, BookOpen, CheckCircle2, PlayCircle, Lock } from "lucide-react";
import Link from "next/link";

const quizzes = [
  { id: "1", title: "Calculus Quiz 3", course: "Mathematics", questions: 15, timeLimit: 30, dueDate: "Dec 12", status: "available", bestScore: null },
  { id: "2", title: "Grammar & Syntax Test", course: "English Literature", questions: 20, timeLimit: 40, dueDate: "Dec 10", status: "completed", bestScore: 92 },
  { id: "3", title: "Newton's Laws Assessment", course: "Physics", questions: 10, timeLimit: 20, dueDate: "Dec 15", status: "available", bestScore: null },
  { id: "4", title: "World War II Quiz", course: "World History", questions: 25, timeLimit: 45, dueDate: "Dec 14", status: "completed", bestScore: 78 },
  { id: "5", title: "Algorithms Midterm", course: "Computer Science", questions: 12, timeLimit: 25, dueDate: "Dec 18", status: "locked", bestScore: null },
];

export default function QuizPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Quizzes</h1>
        <p className="text-sm text-muted-foreground">Test your knowledge across all subjects</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Available", value: quizzes.filter((q) => q.status === "available").length, color: "text-blue-500" },
          { label: "Completed", value: quizzes.filter((q) => q.status === "completed").length, color: "text-green-500" },
          { label: "Avg Score", value: "85%", color: "text-purple-500" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border bg-card p-4 text-center">
            <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-sm font-medium mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {quizzes.map((quiz) => (
          <Card key={quiz.id} className={`${quiz.status === "locked" ? "opacity-60" : "hover:shadow-md"} transition-shadow`}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{quiz.title}</h3>
                  <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
                    <BookOpen className="h-3 w-3" />{quiz.course}
                  </div>
                </div>
                {quiz.status === "completed" && (
                  <Badge variant="success">{quiz.bestScore}%</Badge>
                )}
                {quiz.status === "available" && <Badge variant="info">Available</Badge>}
                {quiz.status === "locked" && <Badge variant="outline"><Lock className="h-3 w-3 mr-1" />Locked</Badge>}
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                <span>{quiz.questions} questions</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{quiz.timeLimit} min</span>
                <span>Due: {quiz.dueDate}</span>
              </div>
              {quiz.status === "completed" && quiz.bestScore && (
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Your score</span>
                    <span className="font-medium">{quiz.bestScore}%</span>
                  </div>
                  <Progress value={quiz.bestScore} className="h-1.5" />
                </div>
              )}
              {quiz.status === "available" && (
                <Button size="sm" className="w-full" asChild>
                  <Link href={`/dashboard/quiz/${quiz.id}`}><PlayCircle className="h-4 w-4" />Start Quiz</Link>
                </Button>
              )}
              {quiz.status === "completed" && (
                <Button size="sm" variant="outline" className="w-full" asChild>
                  <Link href={`/dashboard/quiz/${quiz.id}`}><CheckCircle2 className="h-4 w-4" />Review Answers</Link>
                </Button>
              )}
              {quiz.status === "locked" && (
                <Button size="sm" variant="outline" className="w-full" disabled>
                  <Lock className="h-4 w-4" />Complete prerequisites first
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
