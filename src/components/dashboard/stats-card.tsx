import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

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
  title, value, change, changeType = "neutral", icon, iconBg = "bg-primary/10", description,
}: StatsCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", iconBg)}>
            {icon}
          </div>
        </div>
        <div className="text-2xl font-bold">{value}</div>
        {(change || description) && (
          <div className="flex items-center gap-1 mt-1">
            {change && changeType !== "neutral" && (
              changeType === "positive"
                ? <TrendingUp className="h-3.5 w-3.5 text-green-500" />
                : <TrendingDown className="h-3.5 w-3.5 text-red-500" />
            )}
            {change && changeType === "neutral" && <Minus className="h-3.5 w-3.5 text-muted-foreground" />}
            <p className={cn(
              "text-xs",
              changeType === "positive" && "text-green-600",
              changeType === "negative" && "text-red-600",
              changeType === "neutral" && "text-muted-foreground"
            )}>
              {change || description}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
