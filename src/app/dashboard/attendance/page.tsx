"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle2, XCircle, Clock, AlertCircle, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const students = [
  { id: "1", name: "Emma Wilson", studentId: "STU-001" },
  { id: "2", name: "Jake Thompson", studentId: "STU-002" },
  { id: "3", name: "Sophia Lee", studentId: "STU-003" },
  { id: "4", name: "Carlos Rivera", studentId: "STU-004" },
  { id: "5", name: "Aisha Patel", studentId: "STU-005" },
  { id: "6", name: "Michael Chen", studentId: "STU-006" },
  { id: "7", name: "Olivia Johnson", studentId: "STU-007" },
  { id: "8", name: "Noah Davis", studentId: "STU-008" },
];

type Status = "present" | "absent" | "late" | "excused";

const statusConfig: Record<Status, { label: string; color: string; icon: React.ElementType }> = {
  present: { label: "Present", color: "text-green-500 bg-green-50 dark:bg-green-900/20 border-green-200", icon: CheckCircle2 },
  absent: { label: "Absent", color: "text-red-500 bg-red-50 dark:bg-red-900/20 border-red-200", icon: XCircle },
  late: { label: "Late", color: "text-orange-500 bg-orange-50 dark:bg-orange-900/20 border-orange-200", icon: Clock },
  excused: { label: "Excused", color: "text-blue-500 bg-blue-50 dark:bg-blue-900/20 border-blue-200", icon: AlertCircle },
};

export default function AttendancePage() {
  const { toast } = useToast();
  const [selectedClass, setSelectedClass] = useState("10A");
  const [attendance, setAttendance] = useState<Record<string, Status>>(
    Object.fromEntries(students.map((s) => [s.id, "present"]))
  );

  const markAll = (status: Status) => {
    setAttendance(Object.fromEntries(students.map((s) => [s.id, status])));
  };

  const save = () => {
    toast({ title: "Attendance saved!", description: `Attendance for Grade ${selectedClass} recorded successfully.` });
  };

  const counts = {
    present: Object.values(attendance).filter((v) => v === "present").length,
    absent: Object.values(attendance).filter((v) => v === "absent").length,
    late: Object.values(attendance).filter((v) => v === "late").length,
    excused: Object.values(attendance).filter((v) => v === "excused").length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Attendance</h1>
          <p className="text-sm text-muted-foreground">Mark daily attendance for {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
        </div>
        <Button onClick={save}><Save className="h-4 w-4" />Save Attendance</Button>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-center">
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            {["9A","9B","10A","10B","11A","11B","12A","12B"].map((c) => <SelectItem key={c} value={c}>Grade {c}</SelectItem>)}
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          {(["present","absent","late"] as Status[]).map((s) => (
            <Button key={s} size="sm" variant="outline" onClick={() => markAll(s)} className="capitalize text-xs">
              Mark All {s}
            </Button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-3">
        {(Object.entries(counts) as [Status, number][]).map(([s, count]) => {
          const cfg = statusConfig[s];
          return (
            <div key={s} className={`rounded-xl border p-3 text-center ${cfg.color}`}>
              <div className="text-2xl font-bold">{count}</div>
              <div className="text-xs font-medium mt-0.5">{cfg.label}</div>
            </div>
          );
        })}
      </div>

      {/* Student list */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Grade {selectedClass} Students</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {students.map((student) => {
              const status = attendance[student.id];
              return (
                <div key={student.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">
                        {student.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.studentId}</p>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    {(["present","absent","late","excused"] as Status[]).map((s) => {
                      const cfg = statusConfig[s];
                      const Icon = cfg.icon;
                      return (
                        <button
                          key={s}
                          onClick={() => setAttendance({ ...attendance, [student.id]: s })}
                          className={`flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all ${
                            status === s ? cfg.color : "opacity-40 hover:opacity-70"
                          }`}
                        >
                          <Icon className="h-3.5 w-3.5" />
                          <span className="hidden sm:block">{cfg.label}</span>
                        </button>
                      );
                    })}
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
