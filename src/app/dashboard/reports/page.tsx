"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Download, TrendingUp } from "lucide-react";

const enrollmentData = [
  { month: "Jul", students: 1180 }, { month: "Aug", students: 1210 }, { month: "Sep", students: 1235 },
  { month: "Oct", students: 1242 }, { month: "Nov", students: 1245 }, { month: "Dec", students: 1248 },
];
const gradeData = [
  { grade: "A", count: 312 }, { grade: "B", count: 445 }, { grade: "C", count: 289 },
  { grade: "D", count: 134 }, { grade: "F", count: 68 },
];
const attendanceData = [
  { week: "W1", rate: 93 }, { week: "W2", rate: 94 }, { week: "W3", rate: 92 },
  { week: "W4", rate: 95 }, { week: "W5", rate: 94 }, { week: "W6", rate: 96 },
];
const feeData = [
  { name: "Paid", value: 84200, color: "#22c55e" },
  { name: "Pending", value: 8400, color: "#f97316" },
  { name: "Overdue", value: 2400, color: "#ef4444" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          <p className="text-sm text-muted-foreground">Comprehensive data insights for Greenfield Academy</p>
        </div>
        <Button variant="outline"><Download className="h-4 w-4" />Export All</Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Enrollment", value: "1,248", change: "+5.6%", positive: true },
          { label: "Avg Attendance", value: "94.2%", change: "+1.4%", positive: true },
          { label: "Avg GPA", value: "3.42", change: "+0.08", positive: true },
          { label: "Fee Collection", value: "89%", change: "-2%", positive: false },
        ].map((m) => (
          <Card key={m.label}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{m.label}</p>
              <div className="text-2xl font-bold mt-1">{m.value}</div>
              <Badge variant={m.positive ? "success" : "destructive"} className="text-xs mt-1">
                <TrendingUp className="h-3 w-3 mr-0.5" />{m.change}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">Enrollment Trend</CardTitle><CardDescription>Monthly 2025</CardDescription></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis domain={[1150, 1280]} tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                <Line type="monotone" dataKey="students" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">Grade Distribution</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={gradeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="grade" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">Attendance Rate</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                <YAxis domain={[88, 100]} tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} formatter={(v) => [`${v}%`, "Rate"]} />
                <Line type="monotone" dataKey="rate" stroke="#22c55e" strokeWidth={2} dot={{ fill: "#22c55e" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">Fee Collection</CardTitle></CardHeader>
          <CardContent className="flex items-center gap-6">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={feeData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value">
                  {feeData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} formatter={(v) => [`$${(v as number).toLocaleString()}`, ""]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 flex-1">
              {feeData.map((d) => (
                <div key={d.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: d.color }} /><span className="text-muted-foreground">{d.name}</span></div>
                  <span className="font-medium">${d.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
