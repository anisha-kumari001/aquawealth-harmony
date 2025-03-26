
import React from "react";
import { notifications } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Info, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotificationsPanel() {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4" />;
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "info":
        return "bg-blue-500/10";
      case "success":
        return "bg-green-500/10";
      case "warning":
        return "bg-orange-500/10";
      case "error":
        return "bg-red-500/10";
      default:
        return "bg-gray-500/10";
    }
  };

  return (
    <Card className="hover-lift">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Notifications</CardTitle>
        <Button variant="ghost" size="sm">
          Mark all as read
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {notifications.slice(0, 4).map((notification) => (
            <div
              key={notification.id}
              className={`flex gap-3 p-4 ${
                !notification.read ? "bg-primary/5" : ""
              }`}
            >
              <div className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-full ${getNotificationColor(notification.type)}`}>
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1">
                <p className="text-sm">{notification.message}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {new Date(notification.date).toLocaleDateString()}
                </p>
              </div>
              {!notification.read && (
                <div className="flex h-2 w-2 items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
