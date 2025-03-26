
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  User,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
  Search,
  Sun,
  Moon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Header({ isDarkMode, toggleDarkMode }: HeaderProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const NavItems = [
    { title: "Home", path: "/" },
    { title: "Dashboard", path: "/dashboard" },
    { title: "Investments", path: "/investments" },
    { title: "Insurance", path: "/insurance" },
    { title: "Loans", path: "/loans" },
    { title: "Emergency Fund", path: "/emergency-fund" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="text-xl font-semibold tracking-tight flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-aqua-400 to-aqua-700 flex items-center justify-center">
              <span className="text-white font-bold">AW</span>
            </div>
            <span>AquaWealth</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:gap-6">
          {NavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path === "/dashboard" && !isAuthenticated ? "/login" : item.path}
              className="text-sm font-medium transition-colors hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Right side items */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Search button */}
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="h-5 w-5" />
          </Button>

          {/* Authentication UI */}
          {isAuthenticated ? (
            <div className="flex items-center gap-1">
              {!isMobile && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full relative">
                      <Bell className="h-5 w-5" />
                      <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="max-h-96 overflow-auto flex flex-col gap-2 p-2">
                      {/* Simplified notifications for now */}
                      <div className="text-sm bg-muted/50 p-3 rounded-md">
                        <div className="font-medium">Your KYC verification has been approved!</div>
                        <div className="text-xs text-muted-foreground">Today</div>
                      </div>
                      <div className="text-sm bg-muted/50 p-3 rounded-md">
                        <div className="font-medium">Investment in Clean Water Initiative completed successfully.</div>
                        <div className="text-xs text-muted-foreground">Yesterday</div>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.profileImage} alt={user?.name} />
                      <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer flex items-center gap-2 text-destructive focus:text-destructive" 
                    onClick={logout}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden md:flex md:gap-2">
              <Button asChild variant="outline" size="sm">
                <Link to="/login">Log In</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/register">Sign Up</Link>
              </Button>
            </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="rounded-full"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-30 bg-background md:hidden animate-fade-in">
          <div className="container p-6 flex flex-col gap-6">
            <nav className="flex flex-col gap-4">
              {NavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path === "/dashboard" && !isAuthenticated ? "/login" : item.path}
                  className="text-lg font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
            
            {!isAuthenticated && (
              <div className="flex flex-col gap-3">
                <Button asChild size="lg">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    Log In
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    Sign Up
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
