"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Bell,
  Moon,
  Sun,
  Settings,
  LogOut,
  User,
  Command,
} from "lucide-react";
import { useTheme } from "next-themes";

const notifications = [
  {
    title: "Assignment Due",
    desc: "Math HW due in 2 hours",
    time: "1h ago",
    dot: "bg-orange-500",
  },
  {
    title: "New Grade Posted",
    desc: "Science Quiz: 94/100",
    time: "3h ago",
    dot: "bg-green-500",
  },
  {
    title: "Fee Reminder",
    desc: "Monthly fee due Nov 30",
    time: "1d ago",
    dot: "bg-blue-500",
  },
  {
    title: "Live Class Starting",
    desc: "English Literature — 5 min",
    time: "5m ago",
    dot: "bg-purple-500",
  },
];

const notificationItemVariants = {
  hidden: { opacity: 0, x: -12, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.06, duration: 0.3, ease: "easeOut" as const },
  }),
  exit: {
    opacity: 0,
    x: 12,
    filter: "blur(4px)",
    transition: { duration: 0.15 },
  },
};

export function Header() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Listen for Cmd+K / Ctrl+K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        const input = document.getElementById(
          "header-search",
        ) as HTMLInputElement | null;
        input?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="glass sticky top-0 z-40 flex h-16 items-center gap-4 px-4 md:px-6 border-b-0">
      {/* Bottom border gradient */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Command palette search */}
      <div className="flex-1 max-w-md">
        <motion.div
          className="relative"
          animate={searchFocused ? { scale: 1.02 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="header-search"
            placeholder="Search..."
            className={
              "pl-9 pr-20 h-9 border-0 focus-visible:ring-1 focus-visible:ring-primary/50 transition-all duration-300 " +
              (searchFocused
                ? "bg-background/80 backdrop-blur-xl shadow-lg shadow-primary/5"
                : "bg-muted/50 backdrop-blur-sm")
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          {/* Shortcut badge */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-0.5">
            <kbd className="inline-flex h-5 items-center gap-0.5 rounded border border-border/60 bg-muted/70 px-1.5 font-mono text-[10px] font-medium text-muted-foreground backdrop-blur-sm">
              <Command className="h-2.5 w-2.5" />K
            </kbd>
          </div>
        </motion.div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Notifications */}
        <DropdownMenu
          open={notificationsOpen}
          onOpenChange={setNotificationsOpen}
        >
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <motion.div
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Bell className="h-4 w-4" />
              </motion.div>
              <motion.span
                className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-80 glass border-border/50 overflow-hidden"
          >
            <DropdownMenuLabel className="flex justify-between">
              Notifications
              <Badge variant="secondary" className="text-xs">
                4 new
              </Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <AnimatePresence>
              {notificationsOpen &&
                notifications.map((n, i) => (
                  <motion.div
                    key={n.title}
                    custom={i}
                    variants={notificationItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <DropdownMenuItem className="flex gap-3 p-3 cursor-pointer">
                      <span
                        className={`w-2 h-2 rounded-full ${n.dot} mt-1.5 shrink-0`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{n.title}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {n.desc}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {n.time}
                      </span>
                    </DropdownMenuItem>
                  </motion.div>
                ))}
            </AnimatePresence>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center justify-center text-primary text-sm">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme toggle with icon rotation */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={false}
            animate={
              theme === "dark"
                ? { rotate: -90, scale: 0, opacity: 0 }
                : { rotate: 0, scale: 1, opacity: 1 }
            }
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <Sun className="h-4 w-4" />
          </motion.div>
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={false}
            animate={
              theme === "dark"
                ? { rotate: 0, scale: 1, opacity: 1 }
                : { rotate: 90, scale: 0, opacity: 0 }
            }
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <Moon className="h-4 w-4" />
          </motion.div>
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 h-9 px-2">
              <div className="relative">
                <Avatar className="h-7 w-7">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                    SA
                  </AvatarFallback>
                </Avatar>
                {/* Online status indicator */}
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
              </div>
              <div className="hidden md:flex flex-col items-start text-xs">
                <span className="font-medium">Sarah Johnson</span>
                <span className="text-muted-foreground">School Admin</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-52 glass border-border/50"
          >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => router.push("/auth/login")}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
