"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Clock, ChevronLeft, ChevronRight, CheckCircle2, AlertTriangle } from "lucide-react";


const questions = [
  { id: 1, text: "What is the derivative of f(x) = 3x² + 2x + 1?", options: ["6x + 2", "3x + 2", "6x² + 2", "3x² + 2"], correct: "6x + 2" },
  { id: 2, text: "Which integration technique would you use for ∫ x·eˣ dx?", options: ["Substitution", "Integration by parts", "Partial fractions", "Trigonometric substitution"], correct: "Integration by parts" },
  { id: 3, text: "What is ∫ cos(x) dx?", options: ["sin(x) + C", "-sin(x) + C", "cos(x) + C", "-cos(x) + C"], correct: "sin(x) + C" },
  { id: 4, text: "The definite integral ∫₀¹ x² dx equals:", options: ["1/3", "1/2", "2/3", "1"], correct: "1/3" },
  { id: 5, text: "What is the antiderivative of f(x) = 1/x?", options: ["ln|x| + C", "1/x² + C", "-1/x² + C", "x·ln(x) + C"], correct: "ln|x| + C" },
];

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 min in seconds
  const [submitted, setSubmitted] = useState(false);
  const [tabSwitchWarning, setTabSwitchWarning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000);
    const handleVisibility = () => {
      if (document.hidden && !submitted) setTabSwitchWarning(true);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => { clearInterval(timer); document.removeEventListener("visibilitychange", handleVisibility); };
  }, [submitted]);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const progress = ((current + 1) / questions.length) * 100;
  const score = questions.filter((q) => answers[q.id] === q.correct).length;

  if (submitted) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-xl mx-auto pt-10 animate-fade-in">
        <Card className={`border-2 ${pct >= 70 ? "border-green-500" : "border-orange-500"}`}>
          <CardContent className="p-8 text-center">
            <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white ${pct >= 70 ? "bg-green-500" : "bg-orange-500"}`}>
              {pct}%
            </div>
            <h2 className="text-2xl font-bold mb-1">{pct >= 70 ? "Great job!" : "Keep practicing!"}</h2>
            <p className="text-muted-foreground mb-6">You scored {score} out of {questions.length} questions correctly.</p>
            <div className="grid grid-cols-3 gap-4 mb-6 text-center">
              <div><div className="text-xl font-bold text-green-500">{score}</div><div className="text-xs text-muted-foreground">Correct</div></div>
              <div><div className="text-xl font-bold text-red-500">{questions.length - score}</div><div className="text-xs text-muted-foreground">Incorrect</div></div>
              <div><div className="text-xl font-bold text-blue-500">{pct}%</div><div className="text-xs text-muted-foreground">Score</div></div>
            </div>
            <Button onClick={() => { setSubmitted(false); setCurrent(0); setAnswers({}); setTimeLeft(30 * 60); }}>
              Retake Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const q = questions[current];
  return (
    <div className="max-w-2xl mx-auto space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Calculus Quiz 3</h1>
          <p className="text-sm text-muted-foreground">Advanced Mathematics</p>
        </div>
        <div className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-mono font-medium ${timeLeft < 300 ? "border-red-500 text-red-500 bg-red-50 dark:bg-red-900/10" : ""}`}>
          <Clock className="h-4 w-4" />
          {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
        </div>
      </div>

      {tabSwitchWarning && (
        <div className="flex items-center gap-2 rounded-lg border border-orange-500 bg-orange-50 dark:bg-orange-900/10 p-3 text-sm text-orange-700">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>⚠️ Tab switch detected! This may be flagged as a potential cheating attempt.</span>
          <button className="ml-auto text-xs underline" onClick={() => setTabSwitchWarning(false)}>Dismiss</button>
        </div>
      )}

      {/* Progress */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Question {current + 1} of {questions.length}</span>
          <span>{Object.keys(answers).length} answered</span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`flex-1 h-1.5 rounded-full transition-colors ${
                i === current ? "bg-primary" :
                answers[questions[i].id] ? "bg-green-500" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <Card>
        <CardHeader className="pb-3">
          <Badge variant="secondary" className="w-fit mb-2">Question {current + 1}</Badge>
          <CardTitle className="text-lg font-medium leading-snug">{q.text}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={answers[q.id] || ""}
            onValueChange={(v) => setAnswers({ ...answers, [q.id]: v })}
            className="space-y-3"
          >
            {q.options.map((opt) => (
              <div key={opt} className={`flex items-center gap-3 rounded-lg border p-3.5 cursor-pointer transition-colors ${answers[q.id] === opt ? "border-primary bg-primary/5" : "hover:bg-muted/50"}`}>
                <RadioGroupItem value={opt} id={opt} />
                <Label htmlFor={opt} className="cursor-pointer text-sm flex-1">{opt}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0}>
          <ChevronLeft className="h-4 w-4" />Previous
        </Button>
        {current < questions.length - 1 ? (
          <Button onClick={() => setCurrent(current + 1)} disabled={!answers[q.id]}>
            Next<ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={() => setSubmitted(true)}
            disabled={Object.keys(answers).length < questions.length}
            className="bg-green-600 hover:bg-green-700"
          >
            <CheckCircle2 className="h-4 w-4" />Submit Quiz
          </Button>
        )}
      </div>
      <p className="text-xs text-center text-muted-foreground">
        Answer all {questions.length} questions to submit. Tab switching is monitored.
      </p>
    </div>
  );
}
