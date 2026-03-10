import { GraduationCap, Star } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col lg:grid lg:grid-cols-2">
      {/* ── Mobile brand header strip ── */}
      <div className="lg:hidden relative bg-gradient-to-r from-[#0a0e2a] via-[#162052] to-[#1a1050] px-5 py-4">
        {/* noise overlay on mobile strip */}
        <div className="absolute inset-0 bg-noise pointer-events-none" />
        <Link
          href="/"
          className="relative z-10 flex items-center gap-2.5 text-white"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 ring-1 ring-white/20">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="font-bold text-lg tracking-tight">
            EduSphere LMS
          </span>
        </Link>
      </div>

      {/* ── Left panel — premium showcase ── */}
      <div className="hidden lg:flex relative overflow-hidden flex-col bg-gradient-to-br from-[#070b1e] via-[#0f1740] to-[#1a1050] text-white">
        {/* --- Noise texture layer --- */}
        <div className="absolute inset-0 bg-noise pointer-events-none" />

        {/* --- CSS grid pattern overlay --- */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* --- Radial glow orbs --- */}
        {/* Top-right warm glow */}
        <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none" />
        {/* Center-left cool glow */}
        <div className="absolute top-1/2 -left-24 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-blue-500/15 blur-[100px] pointer-events-none" />
        {/* Bottom accent glow */}
        <div className="absolute -bottom-20 right-1/4 w-[360px] h-[360px] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />

        {/* --- Content layer --- */}
        <div className="relative z-10 flex flex-col h-full p-10 xl:p-14">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 font-bold text-xl tracking-tight group"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 ring-1 ring-white/20 transition-colors group-hover:bg-white/[0.15]">
              <GraduationCap className="h-5 w-5" />
            </div>
            EduSphere LMS
          </Link>

          {/* Testimonial — centered with radial glow behind it */}
          <div className="flex-1 flex flex-col justify-center max-w-lg">
            {/* Radial glow behind testimonial */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-gradient-radial from-purple-500/10 via-blue-600/5 to-transparent blur-[60px] pointer-events-none" />

            <div className="relative">
              {/* Large decorative quote mark */}
              <span
                className="block text-6xl font-serif leading-none text-white/10 select-none mb-2"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              <blockquote className="text-[1.15rem] leading-relaxed text-white/90 font-light tracking-wide">
                EduSphere transformed how our 2,000-student school operates.
                AI&nbsp;tutoring alone improved average grades by 18% in one
                semester.
              </blockquote>

              {/* Closing quote */}
              <span
                className="block text-6xl font-serif leading-none text-white/10 text-right select-none -mt-2"
                aria-hidden="true"
              >
                &rdquo;
              </span>

              {/* Attribution */}
              <div className="flex items-center gap-4 mt-6">
                {/* Avatar with gradient ring */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 p-[2px]">
                    <div className="w-full h-full rounded-full bg-[#111738] flex items-center justify-center text-sm font-bold text-white/90">
                      RC
                    </div>
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-white/95 text-[0.95rem]">
                    Dr. Rebecca Chen
                  </div>
                  <div className="text-sm text-white/50">
                    Principal, Westside Academy
                  </div>
                </div>
                {/* Star rating */}
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="relative">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold tracking-tight bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
                  500+
                </div>
                <div className="text-xs uppercase tracking-widest text-white/40 mt-1">
                  Schools
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold tracking-tight bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
                  50K+
                </div>
                <div className="text-xs uppercase tracking-widest text-white/40 mt-1">
                  Students
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold tracking-tight bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
                  99.9%
                </div>
                <div className="text-xs uppercase tracking-widest text-white/40 mt-1">
                  Uptime
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel — auth form ── */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 bg-background">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
