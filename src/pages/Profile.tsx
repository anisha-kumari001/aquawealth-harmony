
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import PortfolioAllocationChart from "@/components/dashboard/PortfolioAllocationChart";
import WalletHistoryChart from "@/components/dashboard/WalletHistoryChart";
import { recentTransactions } from "@/data/mockData";
import { User, MapPin, Mail, Phone, Upload, Edit, CheckCircle2, Clock, ShieldAlert } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const KycStatusBadge = () => {
    switch (user?.kycStatus) {
      case "verified":
        return (
          <Badge className="bg-green-500/10 text-green-500 border-green-200 flex items-center gap-1 px-2 py-1">
            <CheckCircle2 className="h-3 w-3" />
            Verified
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-orange-500/10 text-orange-500 border-orange-200 flex items-center gap-1 px-2 py-1">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        );
      default:
        return (
          <Badge className="bg-red-500/10 text-red-500 border-red-200 flex items-center gap-1 px-2 py-1">
            <ShieldAlert className="h-3 w-3" />
            Unverified
          </Badge>
        );
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">My Profile</h1>
            <p className="text-muted-foreground">
              Manage your personal information and account preferences
            </p>
          </div>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="hover-lift">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={user?.profileImage} alt={user?.name} />
                  <AvatarFallback className="text-2xl">{user?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-semibold">{user?.name}</h2>
                <div className="mt-2 mb-4">
                  <KycStatusBadge />
                </div>
                <div className="w-full space-y-3 mt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>San Francisco, CA</span>
                  </div>
                </div>
                <div className="mt-6 w-full">
                  <Button variant="outline" className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Documents
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Main content area */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="wallet">Wallet</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <Card className="hover-lift">
                  <CardHeader>
                    <CardTitle className="text-lg">Portfolio Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <PortfolioAllocationChart />
                  </CardContent>
                </Card>
                
                <Card className="hover-lift">
                  <CardHeader>
                    <CardTitle className="text-lg">KYC Verification Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Identity Verification</span>
                          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-200">Completed</Badge>
                        </div>
                        <Progress value={100} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Address Verification</span>
                          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-200">Completed</Badge>
                        </div>
                        <Progress value={100} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Financial Information</span>
                          <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-200">Pending</Badge>
                        </div>
                        <Progress value={50} className="h-2" />
                      </div>
                      
                      <Button className="w-full mt-4">Complete Verification</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="wallet" className="space-y-6">
                <Card className="hover-lift">
                  <CardHeader>
                    <CardTitle className="text-lg">Wallet Balance</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-col items-center justify-center py-6">
                      <div className="text-4xl font-bold mb-2">${user?.walletBalance.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Available Balance</div>
                      <div className="flex gap-2 mt-4">
                        <Button>Deposit</Button>
                        <Button variant="outline">Withdraw</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="hover-lift">
                  <CardHeader>
                    <CardTitle className="text-lg">Balance History</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <WalletHistoryChart />
                  </CardContent>
                </Card>
                
                <Card className="hover-lift">
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Transactions</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {recentTransactions.slice(0, 3).map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-4">
                          <div>
                            <p className="font-medium">{transaction.type}</p>
                            <p className="text-sm text-muted-foreground">{transaction.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              {transaction.type === "Deposit" ? "+" : "-"}${transaction.amount}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(transaction.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 text-center">
                      <Button variant="link">View All Transactions</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-6">
                <Card className="hover-lift">
                  <CardHeader>
                    <CardTitle className="text-lg">Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email Notifications</label>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Investment updates</span>
                          <div className="flex h-6 w-12 rounded-full bg-primary justify-end">
                            <div className="h-6 w-6 rounded-full bg-white shadow-sm" />
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Insurance renewals</span>
                          <div className="flex h-6 w-12 rounded-full bg-primary justify-end">
                            <div className="h-6 w-6 rounded-full bg-white shadow-sm" />
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Loan updates</span>
                          <div className="flex h-6 w-12 rounded-full bg-muted justify-start">
                            <div className="h-6 w-6 rounded-full bg-white shadow-sm" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <h3 className="text-sm font-medium mb-2">Security Settings</h3>
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full justify-start">
                            Change Password
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            Enable Two-Factor Authentication
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            Manage Authorized Devices
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
