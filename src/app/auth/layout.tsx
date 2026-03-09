import { GraduationCap } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col bg-gradient-to-br from-primary to-blue-700 text-white p-12">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <GraduationCap className="h-7 w-7" />
          EduSphere LMS
        </Link>
        <div className="flex-1 flex flex-col justify-center">
          <blockquote className="text-lg opacity-90 leading-relaxed mb-6">
            &quot;EduSphere transformed how our 2,000-student school operates. AI tutoring alone
            improved average grades by 18% in one semester.&quot;
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">DR</div>
            <div>
              <div className="font-semibold">Dr. Rebecca Chen</div>
              <div className="text-sm opacity-70">Principal, Westside Academy</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 text-center text-sm opacity-80">
          <div><div className="text-2xl font-bold">500+</div><div>Schools</div></div>
          <div><div className="text-2xl font-bold">50K+</div><div>Students</div></div>
          <div><div className="text-2xl font-bold">99.9%</div><div>Uptime</div></div>
        </div>
      </div>
      {/* Right panel */}
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">EduSphere LMS</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
