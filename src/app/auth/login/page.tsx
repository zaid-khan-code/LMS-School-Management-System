"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Loader2, GraduationCap } from "lucide-react";

const demoAccounts = [
  { role: "Super Admin", email: "superadmin@edusphere.com", color: "bg-red-500" },
  { role: "School Admin", email: "admin@greenfield.edu", color: "bg-orange-500" },
  { role: "Teacher", email: "t.johnson@greenfield.edu", color: "bg-yellow-500" },
  { role: "Student", email: "s.miller@greenfield.edu", color: "bg-green-500" },
  { role: "Parent", email: "p.miller@gmail.com", color: "bg-blue-500" },
  { role: "Staff", email: "hr@greenfield.edu", color: "bg-gray-500" },
];

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);
    router.push("/dashboard/overview");
  };

  const fillDemo = (email: string) => {
    setFormData({ email, password: "demo123456" });
  };

  return (
    <div className="animate-fade-in">
      <Card className="border shadow-lg">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
            <GraduationCap className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Sign in to your EduSphere account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Demo accounts */}
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Quick demo — click to fill:</p>
            <div className="grid grid-cols-3 gap-1.5">
              {demoAccounts.map((a) => (
                <button
                  key={a.role}
                  type="button"
                  onClick={() => fillDemo(a.email)}
                  className="flex items-center gap-1.5 rounded-md border px-2 py-1.5 text-xs hover:bg-accent transition-colors text-left"
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${a.color}`} />
                  {a.role}
                </button>
              ))}
            </div>
          </div>

          <Separator />

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@school.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="/auth/forgot-password" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  autoComplete="current-password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {isLoading ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-primary font-medium hover:underline">
              Create one
            </Link>
          </p>
        </CardContent>
      </Card>
      <p className="text-center text-xs text-muted-foreground mt-4">
        Demo: use any email above with password{" "}
        <Badge variant="outline" className="font-mono text-xs">demo123456</Badge>
      </p>
    </div>
  );
}
