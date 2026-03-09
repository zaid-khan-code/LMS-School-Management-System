"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Loader2, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);
    setSent(true);
  };

  return (
    <div className="animate-fade-in">
      <Card className="border shadow-lg">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
            {sent ? <CheckCircle2 className="h-6 w-6 text-green-500" /> : <GraduationCap className="h-6 w-6 text-primary" />}
          </div>
          <CardTitle className="text-2xl">{sent ? "Email Sent!" : "Reset Password"}</CardTitle>
          <CardDescription>
            {sent ? `We sent a reset link to ${email}` : "Enter your email to receive a reset link"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label>Email Address</Label>
                <Input type="email" placeholder="you@school.edu" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                {isLoading ? "Sending…" : "Send Reset Link"}
              </Button>
            </form>
          ) : (
            <p className="text-sm text-muted-foreground text-center mb-4">
              Check your inbox and follow the link to reset your password.
            </p>
          )}
          <p className="text-center text-sm text-muted-foreground mt-4">
            <Link href="/auth/login" className="text-primary font-medium hover:underline">← Back to login</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
