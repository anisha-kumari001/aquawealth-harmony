
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import EmergencyFundForm from "@/components/forms/EmergencyFundForm";
import { emergencyFundData } from "@/data/mockData";
import { AlertTriangle, Globe, LifeBuoy, CircleDollarSign, Users, Clock, CheckCircle2 } from "lucide-react";

export default function EmergencyFund() {
  const [showRequestForm, setShowRequestForm] = useState(false);

  // PieChart colors
  const REGION_COLORS = ["#0ea5e9", "#38bdf8", "#7dd3fc", "#bae6fd"];
  const USAGE_COLORS = ["#f43f5e", "#fb7185", "#fda4af", "#fecdd3"];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Emergency Fund</h1>
          <p className="text-muted-foreground">
            Track fund status or request assistance for water emergencies
          </p>
        </div>

        {/* Fund Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover-lift md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CircleDollarSign className="h-5 w-5" />
                Fund Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Total Fund Pool</span>
                  <span className="text-2xl font-bold">${emergencyFundData.totalPool.toLocaleString()}</span>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Available</span>
                      <span>{Math.round(emergencyFundData.availableFunds / emergencyFundData.totalPool * 100)}%</span>
                    </div>
                    <Progress value={emergencyFundData.availableFunds / emergencyFundData.totalPool * 100} className="h-1" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-muted-foreground">Available Funds</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold">${emergencyFundData.availableFunds.toLocaleString()}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Allocated Funds</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-bold">${emergencyFundData.allocatedFunds.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center justify-center">
                  <Button onClick={() => setShowRequestForm(true)} className="w-full">
                    Request Assistance
                  </Button>
                  <div className="w-full mt-4 text-center">
                    <span className="text-sm text-muted-foreground block">Response Time</span>
                    <span className="block font-medium">48-72 hours</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5" />
                Request Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-orange-500" />
                    <div>
                      <span className="block font-medium">Pending</span>
                      <span className="text-sm text-muted-foreground">Waiting review</span>
                    </div>
                  </div>
                  <span className="text-2xl font-bold">{emergencyFundData.requestsPending}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <div>
                      <span className="block font-medium">Approved</span>
                      <span className="text-sm text-muted-foreground">Funds allocated</span>
                    </div>
                  </div>
                  <span className="text-2xl font-bold">{emergencyFundData.requestsApproved}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <div>
                      <span className="block font-medium">Declined</span>
                      <span className="text-sm text-muted-foreground">Not eligible</span>
                    </div>
                  </div>
                  <span className="text-2xl font-bold">{emergencyFundData.requestsDeclined}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fund Allocation & Usage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Regional Allocation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={emergencyFundData.regionAllocation}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="allocation"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      animationDuration={500}
                      animationBegin={0}
                    >
                      {emergencyFundData.regionAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={REGION_COLORS[index % REGION_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => [`${value}%`, 'Allocation']}
                      contentStyle={{ 
                        borderRadius: '0.75rem',
                        border: '1px solid var(--border)',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                      }}
                    />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <LifeBuoy className="h-5 w-5" />
                Usage Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={emergencyFundData.usageBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="percentage"
                      label={({ category, percent }) => `${category.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}
                      animationDuration={500}
                      animationBegin={0}
                    >
                      {emergencyFundData.usageBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={USAGE_COLORS[index % USAGE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => [`${value}%`, 'Percentage']}
                      contentStyle={{ 
                        borderRadius: '0.75rem',
                        border: '1px solid var(--border)',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                      }}
                    />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Emergency Responses */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="text-lg">Recent Emergency Responses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Emergency response card 1 */}
              <div className="rounded-lg border p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500/10 text-green-500 border-green-200">Completed</Badge>
                      <h3 className="font-semibold">Drought Relief - Kenya</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Emergency water distribution to rural communities
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-medium">$75,000</span>
                    <p className="text-xs text-muted-foreground">Allocated Funds</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Impact</p>
                    <p className="font-medium">23,000 people served</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">3 months</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date Completed</p>
                    <p className="font-medium">October 15, 2023</p>
                  </div>
                </div>
              </div>
              
              {/* Emergency response card 2 */}
              <div className="rounded-lg border p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-200">In Progress</Badge>
                      <h3 className="font-semibold">Flood Damage Repair - Bangladesh</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Reconstruction of water systems after major flooding
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-medium">$120,000</span>
                    <p className="text-xs text-muted-foreground">Allocated Funds</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Impact</p>
                    <p className="font-medium">15 villages, 40,000 people</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">6 months</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Progress</p>
                    <div className="flex items-center gap-2">
                      <Progress value={65} className="h-2 flex-1" />
                      <span className="text-sm font-medium">65%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Emergency response card 3 */}
              <div className="rounded-lg border p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-200">Upcoming</Badge>
                      <h3 className="font-semibold">Water Quality Crisis - Brazil</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Emergency filtration systems for contaminated river
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-medium">$85,000</span>
                    <p className="text-xs text-muted-foreground">Allocated Funds</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Impact</p>
                    <p className="font-medium">5 communities, 12,000 people</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">4 months</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <p className="font-medium">January 10, 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Emergency fund request form dialog */}
      <EmergencyFundForm
        isOpen={showRequestForm}
        onClose={() => setShowRequestForm(false)}
      />
    </DashboardLayout>
  );
}
