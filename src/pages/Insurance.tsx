
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import InsuranceForm from "@/components/forms/InsuranceForm";
import { insurancePlans } from "@/data/mockData";
import { ShieldCheck, CheckCircle2, X, BarChart3 } from "lucide-react";

export default function Insurance() {
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [showInsuranceForm, setShowInsuranceForm] = useState(false);

  // Handle opening the insurance form
  const handleBuyInsurance = (id: string) => {
    const plan = insurancePlans.find(plan => plan.id === id);
    setSelectedPlan(plan);
    setShowInsuranceForm(true);
  };

  // Risk level colors
  const getRiskLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "low":
        return "bg-green-500/10 text-green-500 border-green-200";
      case "medium":
        return "bg-orange-500/10 text-orange-500 border-orange-200";
      case "high":
        return "bg-red-500/10 text-red-500 border-red-200";
      default:
        return "";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Insurance</h1>
          <p className="text-muted-foreground">
            Protect your water investments with our customized insurance policies
          </p>
        </div>

        {/* Risk Assessment Section */}
        <Card className="hover-lift overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-2">Water Risk Assessment</h2>
              <p className="text-muted-foreground mb-6">
                Our advanced analytics determine your regional risk profile to customize insurance coverage.
              </p>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Flood Risk</span>
                    <span>Moderate</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full">
                    <div className="h-full w-[60%] bg-orange-500 rounded-full"></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Drought Risk</span>
                    <span>Low</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full">
                    <div className="h-full w-[30%] bg-green-500 rounded-full"></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Infrastructure Failure</span>
                    <span>High</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full">
                    <div className="h-full w-[80%] bg-red-500 rounded-full"></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Water Quality Issues</span>
                    <span>Moderate</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full">
                    <div className="h-full w-[55%] bg-orange-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button className="w-full">Get Detailed Risk Report</Button>
              </div>
            </div>
            
            <div className="hidden md:block relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40" />
              <img 
                src="https://source.unsplash.com/random/800x1200/?water,risk" 
                alt="Water Risk Assessment" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Card>

        {/* Plans Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Insurance Plans</h2>
          
          <Tabs defaultValue="compare" className="space-y-6">
            <TabsList className="mx-auto w-full max-w-md grid grid-cols-2 mb-4">
              <TabsTrigger value="compare">Compare Plans</TabsTrigger>
              <TabsTrigger value="cards">Plan Cards</TabsTrigger>
            </TabsList>
            
            <TabsContent value="compare">
              <Card className="hover-lift overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg">Plan Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full table-fixed border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-4 w-1/4">Features</th>
                          {insurancePlans.map((plan) => (
                            <th key={plan.id} className="text-center p-4 w-1/4">
                              <div className="flex flex-col items-center">
                                <span className="font-medium">{plan.name}</span>
                                <Badge variant="outline" className={`mt-1 ${getRiskLevelColor(plan.riskLevel)}`}>
                                  {plan.riskLevel} Risk
                                </Badge>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-4 font-medium">Monthly Premium</td>
                          {insurancePlans.map((plan) => (
                            <td key={plan.id} className="text-center p-4">
                              ${plan.monthlyPremium}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 font-medium">Coverage Amount</td>
                          {insurancePlans.map((plan) => (
                            <td key={plan.id} className="text-center p-4">
                              ${plan.coverage.toLocaleString()}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 font-medium">Coverage Benefits</td>
                          {insurancePlans.map((plan) => (
                            <td key={plan.id} className="text-center p-4">
                              <div className="space-y-2">
                                {plan.benefits.map((benefit, index) => (
                                  <div key={index} className="flex items-center justify-center gap-1">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    <span className="text-sm">{benefit}</span>
                                  </div>
                                ))}
                              </div>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="p-4"></td>
                          {insurancePlans.map((plan) => (
                            <td key={plan.id} className="text-center p-4">
                              <Button onClick={() => handleBuyInsurance(plan.id)}>
                                Buy Now
                              </Button>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="cards">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {insurancePlans.map((plan) => (
                  <Card key={plan.id} className="hover-lift overflow-hidden flex flex-col">
                    <CardHeader className="bg-primary/5 pb-4">
                      <Badge variant="outline" className={`mb-2 ${getRiskLevelColor(plan.riskLevel)}`}>
                        {plan.riskLevel} Risk
                      </Badge>
                      <CardTitle>{plan.name}</CardTitle>
                      <div className="mt-2 text-3xl font-bold">
                        ${plan.monthlyPremium}
                        <span className="text-sm font-normal text-muted-foreground">/month</span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 pt-6">
                      <p className="text-sm text-muted-foreground mb-4">
                        {plan.description}
                      </p>
                      <div className="space-y-2">
                        <p className="font-medium">Coverage Benefits:</p>
                        <ul className="space-y-2">
                          {plan.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                              <span className="text-sm">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Coverage Amount:</span>
                          <span className="font-medium">${plan.coverage.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm">Duration:</span>
                          <span className="font-medium">{plan.duration}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button className="w-full" onClick={() => handleBuyInsurance(plan.id)}>
                        Buy Insurance
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Global Risk Map */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Global Water Risk Heatmap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
              {/* Placeholder for an actual map - would use a mapping library in production */}
              <div className="text-center">
                <p className="text-muted-foreground">Interactive risk heatmap would be displayed here</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Using data from global water risk assessments
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Policies */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              Your Active Policies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">Premium Water Protection</h3>
                    <p className="text-sm text-muted-foreground">Policy #INS-2023-8742</p>
                  </div>
                  <Badge>Active</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Premium</p>
                    <p className="font-medium">$49.99/month</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Coverage</p>
                    <p className="font-medium">$150,000</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Renewal Date</p>
                    <p className="font-medium">Dec 15, 2023</p>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </div>
              
              <div className="rounded-lg border p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">Basic Water Risk Coverage</h3>
                    <p className="text-sm text-muted-foreground">Policy #INS-2023-6531</p>
                  </div>
                  <Badge>Active</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Premium</p>
                    <p className="font-medium">$29.99/month</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Coverage</p>
                    <p className="font-medium">$50,000</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Renewal Date</p>
                    <p className="font-medium">Feb 3, 2024</p>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Insurance form dialog */}
      <InsuranceForm
        insurance={selectedPlan}
        isOpen={showInsuranceForm}
        onClose={() => setShowInsuranceForm(false)}
      />
    </DashboardLayout>
  );
}
