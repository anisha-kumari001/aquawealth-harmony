
import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  children: ReactNode;
  description?: string;
  tag?: string;
  className?: string;
  action?: ReactNode;
}

export default function ChartCard({
  title,
  children,
  description,
  tag,
  className,
  action,
}: ChartCardProps) {
  return (
    <Card className={cn("hover-lift overflow-hidden h-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6 px-6">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {tag && <Badge variant="secondary">{tag}</Badge>}
          {action && action}
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="h-[300px] w-full">{children}</div>
      </CardContent>
    </Card>
  );
}
