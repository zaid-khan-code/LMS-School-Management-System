import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, CheckCircle2, Activity, Globe, Lock } from "lucide-react";

const auditLog = [
  { action: "User Login", user: "sarah.johnson@school.edu", ip: "192.168.1.42", time: "2 min ago", status: "success" },
  { action: "Password Changed", user: "admin@school.edu", ip: "10.0.0.15", time: "1 hr ago", status: "success" },
  { action: "Failed Login (3x)", user: "unknown@external.com", ip: "45.76.234.12", time: "2 hr ago", status: "warning" },
  { action: "Data Export", user: "principal@school.edu", ip: "192.168.1.1", time: "3 hr ago", status: "success" },
  { action: "Role Changed", user: "admin@school.edu", ip: "10.0.0.15", time: "5 hr ago", status: "success" },
  { action: "Brute Force Attempt", user: "attacker IP", ip: "185.220.101.34", time: "6 hr ago", status: "danger" },
];

const securityChecks = [
  { label: "SSL/TLS Enforced", status: "pass", icon: Lock },
  { label: "MFA Enabled (Admin)", status: "pass", icon: Shield },
  { label: "RLS Policies Active", status: "pass", icon: CheckCircle2 },
  { label: "Rate Limiting Active", status: "pass", icon: Activity },
  { label: "CSP Headers Set", status: "pass", icon: Shield },
  { label: "Audit Logging On", status: "pass", icon: Activity },
  { label: "Backup Encryption", status: "pass", icon: Lock },
  { label: "Staff MFA Required", status: "warning", icon: AlertTriangle },
];

export default function SecurityPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Security & Audit Logs</h1>
        <p className="text-sm text-muted-foreground">Monitor security events and system activity</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Security Score", value: "94/100", color: "text-green-500" },
          { label: "Active Sessions", value: "284", color: "text-blue-500" },
          { label: "Failed Logins (24h)", value: "12", color: "text-orange-500" },
          { label: "Blocked IPs", value: "3", color: "text-red-500" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4 text-center">
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Security Checklist</CardTitle>
            <CardDescription>OWASP Top 10 & compliance status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {securityChecks.map((check) => (
                <div key={check.label} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-muted/30">
                  <div className="flex items-center gap-2.5">
                    <check.icon className={`h-4 w-4 ${check.status === "pass" ? "text-green-500" : "text-orange-500"}`} />
                    <span className="text-sm">{check.label}</span>
                  </div>
                  <Badge variant={check.status === "pass" ? "success" : "warning"} className="text-xs">
                    {check.status === "pass" ? "✓ Pass" : "⚠ Review"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Recent Audit Log</CardTitle>
            <CardDescription>Last 24 hours of system activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {auditLog.map((log, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                    log.status === "success" ? "bg-green-500" :
                    log.status === "warning" ? "bg-orange-500" : "bg-red-500"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{log.action}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                      <span>{log.user}</span>
                      <Globe className="h-3 w-3" />
                      <span>{log.ip}</span>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{log.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
