
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import LoanForm from "@/components/forms/LoanForm";
import { loanTypes } from "@/data/mockData";
import { BanknoteIcon, ArrowRight, PieChart, ChevronRight, Clock, CalendarDays, PercentIcon, FileText } from "lucide-react";

export default function Loans() {
  const [selectedLoan, setSelectedLoan] = useState<any>(null);
  const [showLoanForm, setShowLoanForm] = useState(false);

  // Handle opening the loan form
  const handleApplyLoan = (id: string) => {
    const loan = loanTypes.find(loan => loan.id === id);
    setSelectedLoan(loan);
    setShowLoanForm(true);
  };

  // Approval rate chart data
  const approvalRateData = loanTypes.map(loan => ({
    name: loan.name.split(' ')[0], // Just use the first word for chart labels
    rate: loan.approvalRate,
  }));

  // Chart colors
  const COLORS = ["#0ea5e9", "#38bdf8", "#7dd3fc"];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Loans</h1>
          <p className="text-muted-foreground">
            Apply for micro-loans to fund your water sustainability projects
          </p>
        </div>

        {/* Loan Status Overview */}
        <Card className="hover-lift overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg">Your Loan Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Micro Water Project Loan</h3>
                    <Badge className="bg-green-500/10 text-green-500 border-green-200">
                      Active
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Loan Amount</p>
                      <p className="font-medium">$5,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Interest Rate</p>
                      <p className="font-medium">4.5%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly Payment</p>
                      <p className="font-medium">$350</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Next Payment</p>
                      <p className="font-medium">Dec 15, 2023</p>
                    </div>
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Repayment Progress</span>
                      <span>65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">View Payment History</Button>
              </div>
              
              <div>
                <h3 className="font-medium mb-4">Loan Applications</h3>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Medium Enterprise Loan</h4>
                        <p className="text-sm text-muted-foreground">
                          Application #LOAN-2023-4521
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-200">
                        Under Review
                      </Badge>
                    </div>
                    <div className="flex gap-2 items-center mt-3 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Submitted: Nov 28, 2023</span>
                    </div>
                    <Button variant="link" className="h-auto p-0 mt-2">
                      <span className="flex items-center">
                        Track Application
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Approval Rate Chart */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Loan Approval Rates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={approvalRateData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                  <Tooltip 
                    formatter={(value: number) => [`${value}%`, 'Approval Rate']}
                    contentStyle={{ 
                      borderRadius: '0.75rem',
                      border: '1px solid var(--border)',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}
                  />
                  <Bar dataKey="rate" fill="#0ea5e9" radius={[4, 4, 0, 0]}>
                    {approvalRateData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-4">
              Historical approval rates by loan type. Smaller loans typically have higher approval chances.
            </p>
          </CardContent>
        </Card>

        {/* Loan Types */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Available Loan Types</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {loanTypes.map((loan) => (
              <Card key={loan.id} className="hover-lift overflow-hidden">
                <CardHeader className="border-b pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <BanknoteIcon className="h-5 w-5 text-primary" />
                    {loan.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    {loan.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-y-4 mb-6">
                    <div className="flex items-center gap-2">
                      <PercentIcon className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Interest Rate</p>
                        <p className="font-medium">{loan.interestRate}%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <BanknoteIcon className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Amount Range</p>
                        <p className="font-medium">${loan.minAmount} - ${loan.maxAmount}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-medium">{loan.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Requirements</p>
                        <p className="font-medium">{loan.requirements.length} Items</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-md bg-muted p-3 mb-6 flex items-center justify-between">
                    <span className="text-sm">Approval Rate:</span>
                    <div className="flex items-center gap-1">
                      <Progress value={loan.approvalRate} className="h-2 w-24" />
                      <span className="text-sm font-medium">{loan.approvalRate}%</span>
                    </div>
                  </div>
                  
                  <Button className="w-full" onClick={() => handleApplyLoan(loan.id)}>
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Loan Process */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="text-lg">Loan Application Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative flex flex-col items-center text-center p-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <span className="font-bold text-primary">1</span>
                </div>
                <h3 className="font-medium">Apply</h3>
                <p className="text-sm text-muted-foreground">Complete application with project details</p>
                {/* Arrow for desktop */}
                <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              
              <div className="relative flex flex-col items-center text-center p-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <span className="font-bold text-primary">2</span>
                </div>
                <h3 className="font-medium">Review</h3>
                <p className="text-sm text-muted-foreground">Underwriting team evaluates application</p>
                {/* Arrow for desktop */}
                <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              
              <div className="relative flex flex-col items-center text-center p-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <span className="font-bold text-primary">3</span>
                </div>
                <h3 className="font-medium">Approval</h3>
                <p className="text-sm text-muted-foreground">Decision made within 48-72 hours</p>
                {/* Arrow for desktop */}
                <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <span className="font-bold text-primary">4</span>
                </div>
                <h3 className="font-medium">Funding</h3>
                <p className="text-sm text-muted-foreground">Funds deposited into your wallet</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Loan form dialog */}
      <LoanForm
        loan={selectedLoan}
        isOpen={showLoanForm}
        onClose={() => setShowLoanForm(false)}
      />
    </DashboardLayout>
  );
}
