
import { useState } from "react";
import { Link } from "react-router-dom";
import PageTransition from "@/components/layout/PageTransition";
import ProjectInvestmentForm from "@/components/forms/ProjectInvestmentForm";

// Project Type
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

const projects: Project[] = [
  { id: 1, name: "Smart Water Conservation", category: "Water Conservation", investmentRequired: 50000, roi: 12, duration: "12 months", location: "California, USA", fundingProgress: 75, featured: true },
  { id: 2, name: "AI-Based Irrigation", category: "Irrigation", investmentRequired: 30000, roi: 10, duration: "8 months", location: "India", fundingProgress: 60 },
  { id: 3, name: "Renewable Energy for Water Plants", category: "Renewable Energy", investmentRequired: 80000, roi: 15, duration: "18 months", location: "Germany", fundingProgress: 40, featured: true },
  { id: 4, name: "Eco-Friendly Farming", category: "Sustainable Agriculture", investmentRequired: 25000, roi: 9, duration: "10 months", location: "Australia", fundingProgress: 50 }
];

const categories = ["All", "Water Conservation", "Irrigation", "Renewable Energy", "Sustainable Agriculture"];
const sortOptions = ["Newest", "Highest ROI", "Most Funded"];

export default function BrowseProjects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Newest");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isInvestmentFormOpen, setIsInvestmentFormOpen] = useState(false);

  const filterProjects = () => {
    let filtered = projects;
    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    
    if (selectedSort === "Highest ROI") {
      filtered.sort((a, b) => b.roi - a.roi);
    } else if (selectedSort === "Most Funded") {
      filtered.sort((a, b) => b.fundingProgress - a.fundingProgress);
    }
    
    setFilteredProjects([...filtered]);
  };

  const handleInvestClick = (project: Project) => {
    setSelectedProject(project);
    setIsInvestmentFormOpen(true);
  };

  return (
    <PageTransition>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 via-blue-800 to-blue-600 p-10 relative overflow-hidden">
        <div className="w-full max-w-7xl rounded-3xl bg-blue-900/40 backdrop-blur-xl p-10 shadow-2xl border border-blue-400/20 relative z-10">
          <div className="grid grid-cols-4 gap-6">
            {/* Sidebar Filters */}
            <div className="col-span-1 bg-blue-800/50 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-blue-400/20 text-white">
              <h2 className="font-bold text-lg mb-4">Filters</h2>
              <label className="block mt-2">Category</label>
              <select
                className="w-full p-2 bg-blue-800/50 text-white border border-green-500/40 rounded focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
              
              <label className="block mt-4">Sort By</label>
              <select
                className="w-full p-2 bg-blue-800/50 text-white border border-green-500/40 rounded focus:ring-2 focus:ring-green-400 focus:outline-none backdrop-blur-lg shadow-md"
                onChange={(e) => setSelectedSort(e.target.value)}
              >
                {sortOptions.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>

              <button
                className="mt-6 w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 shadow"
                onClick={filterProjects}
              >
                Apply Filters
              </button>
            </div>

            {/* Projects List */}
            <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div key={project.id} className="rounded-2xl bg-blue-900/40 backdrop-blur-xl p-6 shadow-lg border border-blue-400/20 text-white hover:shadow-2xl transition-all">
                  <h2 className="text-lg font-bold text-green-300 drop-shadow-lg">{project.name}</h2>
                  <p className="mt-1">{project.category}</p>
                  <p className="mt-1">Investment: ${project.investmentRequired}</p>
                  <p className="mt-1 text-green-400 font-semibold">ROI: {project.roi}%</p>
                  <p className="mt-1">Duration: {project.duration}</p>
                  <p className="mt-1">Location: {project.location}</p>
                  <div className="mt-3 w-full bg-blue-800/30 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${project.fundingProgress}%` }}></div>
                  </div>
                  <p className="mt-2">Funding Progress: {project.fundingProgress}%</p>
                  <div className="mt-4 flex justify-between">
                    <Link to={`/projects/${project.id}`} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                      Learn More
                    </Link>
                    <button 
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                      onClick={() => handleInvestClick(project)}
                    >
                      Start Investing
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ProjectInvestmentForm 
        project={selectedProject} 
        isOpen={isInvestmentFormOpen} 
        onClose={() => setIsInvestmentFormOpen(false)} 
      />
    </PageTransition>
  );
}
