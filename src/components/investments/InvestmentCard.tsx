
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LineChart, TrendingUp, Clock } from "lucide-react";

interface InvestmentCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  riskLevel: string;
  expectedROI: number;
  fundingGoal: number;
  fundingRaised: number;
  duration: string;
  status: string;
  category: string;
  impact: string;
  onInvest: (id: string) => void;
}

export default function InvestmentCard({
  id,
  name,
  description,
  image,
  riskLevel,
  expectedROI,
  fundingGoal,
  fundingRaised,
  duration,
  status,
  category,
  impact,
  onInvest,
}: InvestmentCardProps) {
  const fundingPercentage = Math.round((fundingRaised / fundingGoal) * 100);
  
  const getRiskBadgeColor = (risk: string) => {
    switch (risk.toLowerCase()) {
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
    <Card className="overflow-hidden hover-lift h-full flex flex-col">
      <div className="relative h-48 w-full">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          <Badge variant="outline" className={getRiskBadgeColor(riskLevel)}>
            {riskLevel} Risk
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            {category}
          </Badge>
          <div className="flex items-center space-x-1 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="font-medium">{expectedROI}% ROI</span>
          </div>
        </div>
        <CardTitle className="mt-2 text-lg">{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground">{description}</p>
        
        <div className="mt-4 space-y-3">
          <div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span>Funding Progress</span>
              <span className="font-medium">{fundingPercentage}%</span>
            </div>
            <Progress value={fundingPercentage} className="h-2" />
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
              <span>{duration}</span>
            </div>
            <span>${fundingRaised.toLocaleString()} of ${fundingGoal.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-xs text-muted-foreground">{impact}</p>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button className="w-full" onClick={() => onInvest(id)}>
          Invest Now
        </Button>
      </CardFooter>
    </Card>
  );
}
