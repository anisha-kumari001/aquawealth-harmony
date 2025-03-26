
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  kycStatus: "verified" | "pending" | "unverified";
  walletBalance: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const defaultUser: User = {
  id: "user-1",
  name: "Alex Johnson",
  email: "alex@example.com",
  profileImage: "https://source.unsplash.com/random/100x100/?portrait",
  kycStatus: "verified",
  walletBalance: 12450.75,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check for user in localStorage (simulating persistence)
    const storedUser = localStorage.getItem("aquawealth_user");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // For demo purposes, auto-login with default user if nothing in storage
    setTimeout(() => {
      if (!storedUser) {
        setUser(defaultUser);
        localStorage.setItem("aquawealth_user", JSON.stringify(defaultUser));
      }
      setIsLoading(false);
    }, 800);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate authentication
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For demo, we'll just log in with the default user
      setUser(defaultUser);
      localStorage.setItem("aquawealth_user", JSON.stringify(defaultUser));
      
      toast({
        title: "Logged in successfully",
        description: `Welcome back, ${defaultUser.name}!`,
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate registration
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newUser: User = {
        ...defaultUser,
        name,
        email,
        kycStatus: "pending",
      };
      
      setUser(newUser);
      localStorage.setItem("aquawealth_user", JSON.stringify(newUser));
      
      toast({
        title: "Registration successful",
        description: "Your account has been created.",
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "There was an error creating your account.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("aquawealth_user");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
