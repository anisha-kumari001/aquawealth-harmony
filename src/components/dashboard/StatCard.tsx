
import React, { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  description,
  trend,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("hover-lift overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          <h3 className="text-2xl font-bold">{value}</h3>
          {trend && (
            <span 
              className={`text-sm font-medium ${
                trend.isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {trend.isPositive ? "+" : ""}
              {trend.value}%
            </span>
          )}
        </div>

        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
