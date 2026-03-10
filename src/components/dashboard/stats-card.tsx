"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: React.ReactNode;
  iconBg?: string;
  description?: string;
}

export function StatsCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon,
  iconBg = "bg-primary/10",
  description,
}: StatsCardProps) {
  const changeBarColor =
    changeType === "positive"
      ? "bg-green-500"
      : changeType === "negative"
        ? "bg-red-500"
        : "bg-muted-foreground/40";

  const changeBarWidth =
    changeType === "positive"
      ? "60%"
      : changeType === "negative"
        ? "30%"
        : "50%";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card
        className={cn(
          "relative overflow-hidden",
          "border border-border/50",
          "transition-all duration-300 ease-in-out",
          "hover:shadow-lg hover:shadow-primary/5",
          "hover:border-primary/30",
          "group",
        )}
        style={{
          backgroundImage:
            "radial-gradient(ellipse at top right, hsl(var(--primary) / 0.03), transparent 50%)",
        }}
      >
        {/* Border glow effect on hover */}
        <div
          className={cn(
            "absolute inset-0 rounded-[inherit] pointer-events-none",
            "opacity-0 group-hover:opacity-100",
            "transition-opacity duration-300 ease-in-out",
          )}
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--primary) / 0.12), transparent 40%, transparent 60%, hsl(var(--primary) / 0.08))",
          }}
        />

        <CardContent className="relative p-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-muted-foreground tracking-wide">
              {title}
            </p>

            {/* Icon with gradient shine effect */}
            <div
              className={cn(
                "relative w-10 h-10 rounded-xl flex items-center justify-center",
                "overflow-hidden",
                iconBg,
              )}
            >
              {/* Gradient shine overlay */}
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  background:
                    "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)",
                }}
              />
              <div className="relative z-10">{icon}</div>
            </div>
          </div>

          <div className="text-2xl font-bold tracking-tight">{value}</div>

          {(change || description) && (
            <div className="flex items-center gap-1.5 mt-1.5">
              {change &&
                changeType !== "neutral" &&
                (changeType === "positive" ? (
                  <TrendingUp className="h-3.5 w-3.5 text-green-500" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5 text-red-500" />
                ))}
              {change && changeType === "neutral" && (
                <Minus className="h-3.5 w-3.5 text-muted-foreground" />
              )}
              <p
                className={cn(
                  "text-xs font-medium",
                  changeType === "positive" && "text-green-600",
                  changeType === "negative" && "text-red-600",
                  changeType === "neutral" && "text-muted-foreground",
                )}
              >
                {change || description}
              </p>
            </div>
          )}

          {/* Animated bottom bar showing change direction */}
          <div className="mt-4 h-1 w-full rounded-full bg-muted/50 overflow-hidden">
            <motion.div
              className={cn("h-full rounded-full", changeBarColor)}
              initial={{ width: 0 }}
              animate={{ width: changeBarWidth }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 0.2,
              }}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
