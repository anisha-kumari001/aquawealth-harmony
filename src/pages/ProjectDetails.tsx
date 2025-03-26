
import React from "react";
import { useParams } from "react-router-dom";
import { ChevronLeft, Calendar, MapPin, TrendingUp, Droplets, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useState } from "react";
import ProjectInvestmentForm from "@/components/forms/ProjectInvestmentForm";
import PageTransition from "@/components/layout/PageTransition";

// Project Type (should match with BrowseProjects.tsx)
interface Project {
  id: number;
  name: string;
  category: string;
  investmentRequired: number;
  roi: number;
  duration: string;
  location: string;
  fundingProgress: number;
  featured?: boolean;
}

// Mock data (in a real app, you'd fetch this from an API)
const projects: Project[] = [
  { id: 1, name: "Smart Water Conservation", category: "Water Conservation", investmentRequired: 50000, roi: 12, duration: "12 months", location: "California, USA", fundingProgress: 75, featured: true },
  { id: 2, name: "AI-Based Irrigation", category: "Irrigation", investmentRequired: 30000, roi: 10, duration: "8 months", location: "India", fundingProgress: 60 },
  { id: 3, name: "Renewable Energy for Water Plants", category: "Renewable Energy", investmentRequired: 80000, roi: 15, duration: "18 months", location: "Germany", fundingProgress: 40, featured: true },
  { id: 4, name: "Eco-Friendly Farming", category: "Sustainable Agriculture", investmentRequired: 25000, roi: 9, duration: "10 months", location: "Australia", fundingProgress: 50 }
];

export default function ProjectDetails() {
  const { id } = useParams();
  const [isInvestmentFormOpen, setIsInvestmentFormOpen] = useState(false);
  
  // Find the project based on the ID parameter
  const project = projects.find((p) => p.id === Number(id));
  
  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 via-blue-800 to-blue-600 p-10">
        <Card className="w-full max-w-md backdrop-blur-xl bg-blue-900/40 border border-blue-400/20 text-white">
          <CardContent className="p-8 text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-red-400 mb-4" />
            <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
            <p className="mb-6">The project you're looking for doesn't exist or has been removed.</p>
            <Link to="/investments">
              <Button>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="flex min-h-screen bg-gradient-to-br from-green-900 via-blue-800 to-blue-600 p-10 relative overflow-hidden">
        <div className="w-full max-w-7xl mx-auto rounded-3xl bg-blue-900/40 backdrop-blur-xl p-8 shadow-2xl border border-blue-400/20 relative z-10 text-white">
          <div className="mb-6">
            <Link to="/investments" className="inline-flex items-center text-blue-300 hover:text-blue-100">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Projects
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Project Details */}
            <div className="lg:col-span-2">
              <div className="bg-blue-800/50 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-blue-400/20">
                <Badge className="mb-2">{project.category}</Badge>
                <h1 className="text-3xl font-bold mb-4 text-white">{project.name}</h1>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-green-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-300">Expected ROI</p>
                      <p className="font-semibold text-green-400">{project.roi}%</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-blue-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-300">Duration</p>
                      <p className="font-semibold">{project.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-red-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-300">Location</p>
                      <p className="font-semibold">{project.location}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Project Description</h2>
                  <p className="text-gray-200">
                    This innovative water sustainability project aims to address critical water challenges in {project.location} through advanced 
                    technology and community engagement. The initiative will help reduce water wastage, improve access to clean water, and 
                    create sustainable water management systems.
                  </p>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Environmental Impact</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-700/30 p-4 rounded-lg text-center">
                      <Droplets className="h-6 w-6 mx-auto text-blue-300 mb-2" />
                      <p className="font-semibold">Water Saved</p>
                      <p className="text-2xl font-bold text-blue-300">2.5M</p>
                      <p className="text-sm">gallons annually</p>
                    </div>
                    <div className="bg-blue-700/30 p-4 rounded-lg text-center">
                      <Droplets className="h-6 w-6 mx-auto text-blue-300 mb-2" />
                      <p className="font-semibold">People Impacted</p>
                      <p className="text-2xl font-bold text-blue-300">10K+</p>
                      <p className="text-sm">community members</p>
                    </div>
                    <div className="bg-blue-700/30 p-4 rounded-lg text-center">
                      <Droplets className="h-6 w-6 mx-auto text-blue-300 mb-2" />
                      <p className="font-semibold">CO₂ Reduction</p>
                      <p className="text-2xl font-bold text-blue-300">500</p>
                      <p className="text-sm">tons per year</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Investment Panel */}
            <div className="lg:col-span-1">
              <div className="bg-blue-800/50 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-blue-400/20 sticky top-8">
                <h2 className="text-xl font-semibold mb-4">Investment Details</h2>
                
                <div className="mb-4">
                  <p className="flex justify-between mb-1">
                    <span>Target Amount:</span>
                    <span className="font-semibold">${project.investmentRequired.toLocaleString()}</span>
                  </p>
                  <p className="flex justify-between mb-4">
                    <span>Funds Raised:</span>
                    <span className="font-semibold">${Math.round(project.investmentRequired * project.fundingProgress / 100).toLocaleString()}</span>
                  </p>
                  
                  <div className="mb-1">
                    <div className="flex justify-between text-sm">
                      <span>Funding Progress</span>
                      <span>{project.fundingProgress}%</span>
                    </div>
                    <Progress value={project.fundingProgress} className="h-2 mb-2" />
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-6">
                    {300 - Math.floor(project.fundingProgress * 3)} investors needed to reach the funding goal
                  </p>
                </div>
                
                <div className="bg-blue-900/60 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold mb-2">Investment Benefits</h3>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start">
                      <TrendingUp className="h-4 w-4 text-green-400 mr-2 mt-0.5" />
                      <span>Projected {project.roi}% annual returns</span>
                    </li>
                    <li className="flex items-start">
                      <Droplets className="h-4 w-4 text-blue-400 mr-2 mt-0.5" />
                      <span>Direct impact on water conservation efforts</span>
                    </li>
                    <li className="flex items-start">
                      <Droplets className="h-4 w-4 text-blue-400 mr-2 mt-0.5" />
                      <span>Quarterly impact reports</span>
                    </li>
                  </ul>
                </div>
                
                <Button 
                  className="w-full mb-3" 
                  onClick={() => setIsInvestmentFormOpen(true)}
                >
                  Invest Now
                </Button>
                
                <p className="text-xs text-center text-gray-300">
                  Minimum investment: $100 <br />
                  All investments are subject to market risk
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ProjectInvestmentForm 
        project={project} 
        isOpen={isInvestmentFormOpen} 
        onClose={() => setIsInvestmentFormOpen(false)} 
      />
    </PageTransition>
  );
}
