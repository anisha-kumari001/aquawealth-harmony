
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import InvestmentCard from "@/components/investments/InvestmentCard";
import InvestmentForm from "@/components/forms/InvestmentForm";
import { investments } from "@/data/mockData";
import { SearchIcon, Filter, SlidersHorizontal } from "lucide-react";

export default function Investments() {
  const [searchQuery, setSearchQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  
  const [selectedInvestment, setSelectedInvestment] = useState<any>(null);
  const [showInvestmentForm, setShowInvestmentForm] = useState(false);

  // Handle opening the investment form
  const handleInvestClick = (id: string) => {
    const investment = investments.find(inv => inv.id === id);
    setSelectedInvestment(investment);
    setShowInvestmentForm(true);
  };

  // Filter and sort investments
  const filteredInvestments = investments.filter(investment => {
    // Apply search filter
    const matchesSearch = investment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      investment.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply risk filter
    const matchesRisk = riskFilter === "all" || investment.riskLevel.toLowerCase() === riskFilter.toLowerCase();
    
    // Apply category filter
    const matchesCategory = categoryFilter === "all" || investment.category === categoryFilter;
    
    return matchesSearch && matchesRisk && matchesCategory;
  }).sort((a, b) => {
    // Sort by selected option
    switch (sortBy) {
      case "roi-high":
        return b.expectedROI - a.expectedROI;
      case "roi-low":
        return a.expectedROI - b.expectedROI;
      case "funding-high":
        return (b.fundingRaised / b.fundingGoal) - (a.fundingRaised / a.fundingGoal);
      case "funding-low":
        return (a.fundingRaised / a.fundingGoal) - (b.fundingRaised / b.fundingGoal);
      default:
        return 0;
    }
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Investments</h1>
          <p className="text-muted-foreground">
            Discover and invest in water sustainability projects around the world
          </p>
        </div>

        {/* Filters and search */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="text-lg">Find Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div>
                <Select value={riskFilter} onValueChange={setRiskFilter}>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="Risk Level" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Risk Levels</SelectItem>
                    <SelectItem value="low">Low Risk</SelectItem>
                    <SelectItem value="medium">Medium Risk</SelectItem>
                    <SelectItem value="high">High Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="Category" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                    <SelectItem value="Agriculture">Agriculture</SelectItem>
                    <SelectItem value="Research">Research</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="h-4 w-4" />
                      <SelectValue placeholder="Sort By" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="roi-high">Highest ROI</SelectItem>
                    <SelectItem value="roi-low">Lowest ROI</SelectItem>
                    <SelectItem value="funding-high">Most Funded</SelectItem>
                    <SelectItem value="funding-low">Least Funded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Featured project */}
        <div className="bg-card/60 backdrop-blur-sm rounded-lg p-6 border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="h-full flex flex-col justify-center">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold">Featured Project</h2>
                  <p className="text-muted-foreground">
                    This high-impact project stands to make a significant difference in water sustainability.
                  </p>
                </div>
                <div className="space-y-6 mt-6">
                  <h3 className="text-xl font-semibold">{investments[0].name}</h3>
                  <p>{investments[0].description}</p>
                  <div className="flex gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Expected ROI</p>
                      <p className="text-lg font-medium">{investments[0].expectedROI}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="text-lg font-medium">{investments[0].duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Impact</p>
                      <p className="text-lg font-medium">High</p>
                    </div>
                  </div>
                  <Button size="lg" onClick={() => handleInvestClick(investments[0].id)}>
                    Invest Now
                  </Button>
                </div>
              </div>
            </div>
            <div className="h-[300px] rounded-lg overflow-hidden relative group">
              <img 
                src={investments[0].image} 
                alt={investments[0].name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Project listing */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Available Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInvestments.map((investment) => (
              <InvestmentCard
                key={investment.id}
                {...investment}
                onInvest={handleInvestClick}
              />
            ))}
          </div>
          
          {filteredInvestments.length === 0 && (
            <div className="text-center py-12 bg-muted/40 rounded-lg">
              <h3 className="text-lg font-medium">No projects found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your filters to see more projects</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Investment form dialog */}
      <InvestmentForm
        investment={selectedInvestment}
        isOpen={showInvestmentForm}
        onClose={() => setShowInvestmentForm(false)}
      />
    </DashboardLayout>
  );
}
