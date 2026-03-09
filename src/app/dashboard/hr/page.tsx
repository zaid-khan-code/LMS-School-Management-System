"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle2, XCircle, FileText, Download } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const staffPayroll = [
  { name: "Dr. Sarah Johnson", role: "Teacher", department: "Mathematics", baseSalary: 5200, deductions: 520, netPay: 4680, status: "paid" },
  { name: "Ms. Emma Roberts", role: "Teacher", department: "English", baseSalary: 4800, deductions: 480, netPay: 4320, status: "paid" },
  { name: "Mr. David Kim", role: "Teacher", department: "Physics", baseSalary: 5000, deductions: 500, netPay: 4500, status: "pending" },
  { name: "Mr. Robert Admin", role: "Administrator", department: "Management", baseSalary: 6500, deductions: 650, netPay: 5850, status: "paid" },
];

const leaveRequests = [
  { name: "Ms. Emma Roberts", type: "Medical Leave", days: 3, from: "Dec 12", to: "Dec 14", status: "pending" },
  { name: "Mr. David Kim", type: "Annual Leave", days: 5, from: "Dec 23", to: "Dec 27", status: "approved" },
  { name: "Dr. Maya Patel", type: "Personal Leave", days: 2, from: "Dec 10", to: "Dec 11", status: "approved" },
  { name: "Ms. Lisa Chen", type: "Emergency Leave", days: 1, from: "Dec 9", to: "Dec 9", status: "pending" },
];

export default function HRPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">HR & Payroll</h1>
        <p className="text-sm text-muted-foreground">Manage staff payroll, leave, and HR operations</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Staff", value: "68", color: "text-blue-500" },
          { label: "Monthly Payroll", value: formatCurrency(285000), color: "text-green-500" },
          { label: "Leave Requests", value: "4", color: "text-orange-500" },
          { label: "On Leave Today", value: "3", color: "text-red-500" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="payroll">
        <TabsList>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="leave">Leave Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="payroll" className="mt-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">December 2025 Payroll</h3>
            <div className="flex gap-2">
              <Button size="sm" variant="outline"><Download className="h-4 w-4" />Export</Button>
              <Button size="sm">Process All</Button>
            </div>
          </div>
          <div className="space-y-3">
            {staffPayroll.map((staff, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="text-xs bg-primary/10 text-primary">
                      {staff.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{staff.name}</p>
                    <p className="text-xs text-muted-foreground">{staff.role} · {staff.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right hidden md:block">
                    <p className="text-xs text-muted-foreground">Base</p>
                    <p className="text-sm font-medium">{formatCurrency(staff.baseSalary)}</p>
                  </div>
                  <div className="text-right hidden md:block">
                    <p className="text-xs text-muted-foreground">Deductions</p>
                    <p className="text-sm text-red-500">−{formatCurrency(staff.deductions)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Net Pay</p>
                    <p className="text-sm font-bold">{formatCurrency(staff.netPay)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={staff.status === "paid" ? "success" : "warning"} className="text-xs capitalize">
                      {staff.status}
                    </Badge>
                    <Button size="sm" variant="ghost" className="h-7"><FileText className="h-3 w-3" /></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">Budget Utilization</CardTitle></CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Dec 2025 Payroll</span>
                <span className="font-medium">{formatCurrency(285000)} / {formatCurrency(300000)}</span>
              </div>
              <Progress value={95} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">95% of monthly payroll budget</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leave" className="mt-4 space-y-3">
          {leaveRequests.map((req, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl border hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="text-xs">{req.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{req.name}</p>
                  <p className="text-xs text-muted-foreground">{req.type} · {req.days} day{req.days > 1 ? "s" : ""} · {req.from} – {req.to}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={req.status === "approved" ? "success" : "warning"} className="text-xs capitalize">{req.status}</Badge>
                {req.status === "pending" && (
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" className="h-7 w-7 p-0 text-green-500"><CheckCircle2 className="h-4 w-4" /></Button>
                    <Button size="sm" variant="outline" className="h-7 w-7 p-0 text-red-500"><XCircle className="h-4 w-4" /></Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
