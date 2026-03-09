import { GraduationCap } from 'lucide-react'
import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-blue-500/5">
      <div className="container flex min-h-screen flex-col items-center justify-center py-12">
        <Link href="/" className="mb-8 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold">EduSphere</span>
        </Link>
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  )
}
