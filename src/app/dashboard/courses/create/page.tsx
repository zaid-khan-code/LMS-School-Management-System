"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { CheckCircle2, BookOpen, Settings, Rocket, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";

const steps = [
  { id: 1, label: "Basic Info", icon: BookOpen },
  { id: 2, label: "Content", icon: Plus },
  { id: 3, label: "Settings", icon: Settings },
  { id: 4, label: "Publish", icon: Rocket },
];

export default function CreateCoursePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isPublished, setIsPublished] = useState(false);
  const [form, setForm] = useState({
    title: "", description: "", subject: "", grade: "", thumbnail_color: "from-blue-500 to-blue-700",
  });
  const [modules, setModules] = useState([{ title: "Module 1: Introduction", lessons: ["Lesson 1"] }]);

  const addModule = () => setModules([...modules, { title: `Module ${modules.length + 1}`, lessons: ["Lesson 1"] }]);
  const addLesson = (mi: number) => {
    const updated = [...modules];
    updated[mi].lessons.push(`Lesson ${updated[mi].lessons.length + 1}`);
    setModules(updated);
  };
  const removeLesson = (mi: number, li: number) => {
    const updated = [...modules];
    updated[mi].lessons.splice(li, 1);
    setModules(updated);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Create New Course</h1>
        <p className="text-sm text-muted-foreground">Build a comprehensive course for your students</p>
      </div>

      {/* Steps */}
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2 flex-1">
            <button
              onClick={() => setStep(s.id)}
              className={`flex items-center gap-2 text-sm font-medium ${step === s.id ? "text-primary" : step > s.id ? "text-green-500" : "text-muted-foreground"}`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                step === s.id ? "bg-primary text-primary-foreground" :
                step > s.id ? "bg-green-500 text-white" : "bg-muted"
              }`}>
                {step > s.id ? <CheckCircle2 className="h-4 w-4" /> : s.id}
              </div>
              <span className="hidden sm:block">{s.label}</span>
            </button>
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 rounded-full ${step > s.id ? "bg-green-500" : "bg-muted"}`} />}
          </div>
        ))}
      </div>

      {/* Step content */}
      {step === 1 && (
        <Card>
          <CardHeader><CardTitle>Course Information</CardTitle><CardDescription>Fill in the basic details about your course</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5"><Label>Course Title *</Label><Input placeholder="e.g. Advanced Mathematics Grade 10" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            <div className="space-y-1.5"><Label>Description</Label><textarea className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none h-24 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="What will students learn?" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Subject</Label>
                <Select value={form.subject} onValueChange={(v) => setForm({ ...form, subject: v })}>
                  <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                  <SelectContent>
                    {["Mathematics","English","Science","History","Computer Science","Art","Physical Education"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Grade Level</Label>
                <Select value={form.grade} onValueChange={(v) => setForm({ ...form, grade: v })}>
                  <SelectTrigger><SelectValue placeholder="Select grade" /></SelectTrigger>
                  <SelectContent>
                    {["Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6","Grade 7","Grade 8","Grade 9","Grade 10","Grade 11","Grade 12"].map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Cover Colour</Label>
              <div className="flex gap-2 flex-wrap">
                {["from-blue-500 to-blue-700","from-purple-500 to-purple-700","from-green-500 to-green-700","from-orange-500 to-orange-700","from-red-500 to-red-700","from-cyan-500 to-cyan-700"].map((color) => (
                  <button key={color} onClick={() => setForm({ ...form, thumbnail_color: color })} className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} ring-2 ring-offset-2 transition-all ${form.thumbnail_color === color ? "ring-primary" : "ring-transparent"}`} />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader><CardTitle>Course Content</CardTitle><CardDescription>Build your modules and lessons</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            {modules.map((mod, mi) => (
              <div key={mi} className="border rounded-xl p-4 space-y-3">
                <Input value={mod.title} onChange={(e) => { const u = [...modules]; u[mi].title = e.target.value; setModules(u); }} className="font-medium" />
                <div className="space-y-2 pl-4 border-l-2 border-muted">
                  {mod.lessons.map((lesson, li) => (
                    <div key={li} className="flex items-center gap-2">
                      <Input value={lesson} onChange={(e) => { const u = [...modules]; u[mi].lessons[li] = e.target.value; setModules(u); }} className="text-sm" />
                      <button onClick={() => removeLesson(mi, li)} className="text-muted-foreground hover:text-destructive"><X className="h-4 w-4" /></button>
                    </div>
                  ))}
                </div>
                <Button size="sm" variant="ghost" onClick={() => addLesson(mi)} className="w-full border border-dashed"><Plus className="h-3 w-3" />Add Lesson</Button>
              </div>
            ))}
            <Button variant="outline" onClick={addModule} className="w-full border-dashed"><Plus className="h-4 w-4" />Add Module</Button>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader><CardTitle>Course Settings</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Allow student discussions", desc: "Students can post questions and replies" },
              { label: "Certificate on completion", desc: "Auto-issue a certificate when completed" },
              { label: "Require sequential order", desc: "Students must complete lessons in order" },
              { label: "Enable AI Tutor", desc: "Students can use the AI tutor for this course" },
            ].map((setting) => (
              <div key={setting.label} className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <p className="text-sm font-medium">{setting.label}</p>
                  <p className="text-xs text-muted-foreground">{setting.desc}</p>
                </div>
                <Switch defaultChecked />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Ready to Publish?</CardTitle>
            <CardDescription>Review your course before making it available to students</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`h-24 rounded-xl bg-gradient-to-br ${form.thumbnail_color} flex items-center justify-center`}>
              <BookOpen className="h-10 w-10 text-white/80" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{form.title || "Untitled Course"}</h3>
              <div className="flex gap-2 mt-2">
                {form.subject && <Badge variant="secondary">{form.subject}</Badge>}
                {form.grade && <Badge variant="outline">{form.grade}</Badge>}
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div>
                <p className="text-sm font-medium">Publish Now</p>
                <p className="text-xs text-muted-foreground">Make visible to enrolled students immediately</p>
              </div>
              <Switch checked={isPublished} onCheckedChange={setIsPublished} />
            </div>
            <Button className="w-full" onClick={() => { setTimeout(() => router.push("/dashboard/courses"), 500); }}>
              <Rocket className="h-4 w-4" />{isPublished ? "Publish Course" : "Save as Draft"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>Previous</Button>
        {step < 4
          ? <Button onClick={() => setStep(step + 1 as 1|2|3|4)}>Next Step</Button>
          : null
        }
      </div>
    </div>
  );
}
