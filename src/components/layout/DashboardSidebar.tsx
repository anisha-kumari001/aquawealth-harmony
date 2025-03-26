
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  User,
  LineChart,
  Shield,
  Wallet,
  LifeBuoy,
  Settings,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  className?: string;
}

export default function DashboardSidebar({ className }: SidebarProps) {
  const { user } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useIsMobile();
  
  const sidebarItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      title: "Profile",
      icon: User,
      path: "/profile",
    },
    {
      title: "Investments",
      icon: LineChart,
      path: "/investments",
    },
    {
      title: "Insurance",
      icon: Shield,
      path: "/insurance",
    },
    {
      title: "Loans",
      icon: Wallet,
      path: "/loans",
    },
    {
      title: "Emergency Fund",
      icon: LifeBuoy,
      path: "/emergency-fund",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  // Don't render sidebar on mobile
  if (isMobile) return null;

  return (
    <aside
      className={cn(
        "fixed z-30 h-full border-r transition-all duration-300 ease-in-out",
        collapsed ? "w-[70px]" : "w-[250px]",
        className
      )}
    >
      <div className="h-full flex flex-col bg-background">
        <div className="flex items-center justify-between h-16 border-b px-4">
          {!collapsed && (
            <Link to="/" className="text-xl font-semibold tracking-tight flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-aqua-400 to-aqua-700 flex items-center justify-center">
                <span className="text-white font-bold">AW</span>
              </div>
              <span className="animate-fade-in">AquaWealth</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-2">
          <nav className="grid gap-1 px-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:bg-accent",
                  location.pathname === item.path && "bg-accent font-medium",
                  collapsed && "justify-center px-0"
                )}
              >
                <item.icon className="h-5 w-5" />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto border-t p-4">
          {collapsed ? (
            <div className="flex justify-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user?.profileImage} alt={user?.name} />
                <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <div className="flex items-center gap-3 animate-fade-in">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user?.profileImage} alt={user?.name} />
                <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <Badge variant="outline" className="text-xs">
                  {user?.kycStatus}
                </Badge>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
