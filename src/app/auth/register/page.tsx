"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState({
    full_name: "", email: "", password: "", confirm_password: "",
    role: "", school_name: "", school_code: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);
    router.push("/dashboard/overview");
  };

  return (
    <div className="animate-fade-in">
      <Card className="border shadow-lg">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
            <GraduationCap className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>
            Step {step} of 2 — {step === 1 ? "Personal Information" : "School Details"}
          </CardDescription>
          {/* Progress */}
          <div className="flex gap-1 mt-3">
            <div className="h-1 flex-1 rounded-full bg-primary" />
            <div className={`h-1 flex-1 rounded-full ${step === 2 ? "bg-primary" : "bg-muted"}`} />
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 ? (
              <>
                <div className="space-y-1.5">
                  <Label>Full Name</Label>
                  <Input placeholder="John Smith" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} required />
                </div>
                <div className="space-y-1.5">
                  <Label>Email Address</Label>
                  <Input type="email" placeholder="you@school.edu" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </div>
                <div className="space-y-1.5">
                  <Label>Role</Label>
                  <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v })}>
                    <SelectTrigger><SelectValue placeholder="Select your role" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="school_admin">�� School Administrator</SelectItem>
                      <SelectItem value="teacher">🟡 Teacher</SelectItem>
                      <SelectItem value="student">🟢 Student</SelectItem>
                      <SelectItem value="parent">🔵 Parent</SelectItem>
                      <SelectItem value="staff">⚪ Staff Member</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Password</Label>
                  <Input type="password" placeholder="Min. 8 characters" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={8} />
                </div>
                <div className="space-y-1.5">
                  <Label>Confirm Password</Label>
                  <Input type="password" placeholder="Repeat password" value={form.confirm_password} onChange={(e) => setForm({ ...form, confirm_password: e.target.value })} required />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-1.5">
                  <Label>School Name</Label>
                  <Input placeholder="Greenfield Academy" value={form.school_name} onChange={(e) => setForm({ ...form, school_name: e.target.value })} required />
                </div>
                <div className="space-y-1.5">
                  <Label>School Code / Invitation Code</Label>
                  <Input placeholder="e.g. GRFLD-2024" value={form.school_code} onChange={(e) => setForm({ ...form, school_code: e.target.value })} required />
                  <p className="text-xs text-muted-foreground">Ask your school administrator for the code.</p>
                </div>
              </>
            )}
            <div className="flex gap-2 pt-2">
              {step === 2 && (
                <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
              )}
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                {step === 1 ? "Continue" : isLoading ? "Creating account…" : "Create Account"}
              </Button>
            </div>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
