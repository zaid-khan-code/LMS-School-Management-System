import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-screen overflow-hidden bg-gradient-to-br from-muted/40 via-background to-muted/20">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="bg-noise flex-1 overflow-y-auto p-4 md:p-8 lg:p-10">
          <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
        </main>
      </div>
    </div>
  );
}
