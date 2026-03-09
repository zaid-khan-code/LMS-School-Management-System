"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DollarSign, CreditCard, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

const fees = [
  { id: "1", type: "Monthly Tuition", amount: 850, dueDate: "2025-12-01", paidDate: "2025-11-28", status: "paid" as const },
  { id: "2", type: "Library Fee", amount: 50, dueDate: "2025-12-15", paidDate: null, status: "pending" as const },
  { id: "3", type: "Lab Fee", amount: 120, dueDate: "2025-11-30", paidDate: null, status: "overdue" as const },
  { id: "4", type: "Sports Activities", amount: 200, dueDate: "2025-12-20", paidDate: null, status: "pending" as const },
  { id: "5", type: "Monthly Tuition", amount: 850, dueDate: "2025-11-01", paidDate: "2025-10-29", status: "paid" as const },
  { id: "6", type: "Annual Admission", amount: 500, dueDate: "2025-04-01", paidDate: "2025-03-28", status: "paid" as const },
];

const statusConfig = {
  paid: { label: "Paid", variant: "success" as const, icon: CheckCircle2, color: "text-green-500" },
  pending: { label: "Pending", variant: "warning" as const, icon: Clock, color: "text-orange-500" },
  overdue: { label: "Overdue", variant: "destructive" as const, icon: AlertTriangle, color: "text-red-500" },
};

export default function FeesPage() {
  const paid = fees.filter((f) => f.status === "paid");
  const pending = fees.filter((f) => f.status === "pending");
  const overdue = fees.filter((f) => f.status === "overdue");
  const totalDue = [...pending, ...overdue].reduce((acc, f) => acc + f.amount, 0);
  const totalPaid = paid.reduce((acc, f) => acc + f.amount, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Fee Management</h1>
        <p className="text-sm text-muted-foreground">Track and manage all school fee payments</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Due", value: formatCurrency(totalDue), icon: DollarSign, color: "text-orange-500", bg: "bg-orange-500/10" },
          { label: "Total Paid", value: formatCurrency(totalPaid), icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10" },
          { label: "Overdue", value: overdue.length.toString(), icon: AlertTriangle, color: "text-red-500", bg: "bg-red-500/10" },
          { label: "Pending", value: pending.length.toString(), icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.bg}`}>
                  <s.icon className={`h-4 w-4 ${s.color}`} />
                </div>
              </div>
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payment progress */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Annual Fee Collection</CardTitle>
          <CardDescription>School-wide fee collection status for 2025-26</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: "Tuition Fees", collected: 84200, target: 95000 },
            { label: "Lab & Equipment", collected: 12400, target: 15000 },
            { label: "Sports & Activities", collected: 8900, target: 12000 },
            { label: "Library", collected: 3200, target: 4000 },
          ].map((item) => {
            const pct = Math.round((item.collected / item.target) * 100);
            return (
              <div key={item.label} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-muted-foreground">{formatCurrency(item.collected)} / {formatCurrency(item.target)}</span>
                </div>
                <Progress value={pct} className="h-2" />
                <p className="text-xs text-muted-foreground text-right">{pct}% collected</p>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Fee list */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Your Fee Statement</CardTitle>
            <Button size="sm" variant="outline">Download PDF</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {fees.map((fee) => {
              const cfg = statusConfig[fee.status];
              const Icon = cfg.icon;
              return (
                <div key={fee.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center bg-muted`}>
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{fee.type}</p>
                      <p className="text-xs text-muted-foreground">
                        {fee.status === "paid"
                          ? `Paid on ${formatDate(fee.paidDate!)}`
                          : `Due: ${formatDate(fee.dueDate)}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">{formatCurrency(fee.amount)}</span>
                    <Badge variant={cfg.variant} className="flex items-center gap-1 text-xs">
                      <Icon className="h-3 w-3" />{cfg.label}
                    </Badge>
                    {fee.status !== "paid" && (
                      <Button size="sm" className="h-7 text-xs">Pay Now</Button>
                    )}
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
