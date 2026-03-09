"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Upload, Send, FileText, ChevronRight, CheckCircle2 } from "lucide-react";

export default function AssignmentDetailPage() {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <nav className="text-sm text-muted-foreground flex items-center gap-1">
        <Link href="/dashboard/assignments" className="hover:text-foreground">Assignments</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-medium">Calculus Integration Problems</span>
      </nav>

      {submitted ? (
        <Card className="border-green-500/50 bg-green-50/50 dark:bg-green-900/10">
          <CardContent className="p-6 text-center">
            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <h2 className="text-xl font-bold mb-1">Submitted Successfully!</h2>
            <p className="text-sm text-muted-foreground">Your assignment has been submitted. The teacher will review it shortly.</p>
            <Button variant="outline" className="mt-4" onClick={() => setSubmitted(false)}>View Submission</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>Calculus Integration Problems</CardTitle>
                  <CardDescription className="mt-1">Advanced Mathematics · Posted by Dr. Sarah Johnson</CardDescription>
                </div>
                <Badge variant="warning">Pending</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1"><CalendarDays className="h-4 w-4" />Due: Dec 10, 2025</span>
                <span className="flex items-center gap-1"><FileText className="h-4 w-4" />50 points</span>
              </div>
              <Separator className="my-4" />
              <h4 className="font-semibold mb-2 text-sm">Instructions</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Solve the following integration problems showing all working steps. Use proper mathematical notation.
              </p>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal pl-5">
                <li>∫(3x² + 2x + 1) dx — evaluate the indefinite integral</li>
                <li>∫₀² (x³ - 4x) dx — evaluate the definite integral</li>
                <li>∫ sin(x)·cos(x) dx — use substitution method</li>
                <li>∫ eˣ·(1 + x) dx — use integration by parts</li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Your Submission</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <textarea
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none h-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Type your solution here… show all working steps"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <div className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 transition-colors">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium">Upload PDF or Image</p>
                <p className="text-xs text-muted-foreground mt-1">PDF, PNG, JPG up to 10MB</p>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline">Save Draft</Button>
                <Button onClick={() => setSubmitted(true)} disabled={!text.trim()}>
                  <Send className="h-4 w-4" />Submit Assignment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
