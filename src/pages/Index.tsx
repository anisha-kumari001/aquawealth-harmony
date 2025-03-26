
import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/layout/Header";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, LineChart, ShieldCheck, BanknoteIcon, LifeBuoy, BadgeCheck } from "lucide-react";

export default function Index() {
  const { isAuthenticated } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("aquawealth-theme");
    return savedTheme === "dark" || 
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });

  const featuresRef = useRef<HTMLDivElement>(null);
  
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Save preference to localStorage
    localStorage.setItem("aquawealth-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="animated-gradient absolute inset-0 z-[-1]"></div>
        
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div 
            className="text-center max-w-3xl mx-auto space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Sustainable Water Investments for a Better World
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Join our platform to invest in water sustainability, get insurance, 
              apply for loans, and access emergency funds.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button asChild size="lg" className="px-8">
                <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                  Get Started
                </Link>
              </Button>
              <Button variant="outline" size="lg" onClick={scrollToFeatures}>
                Learn More
                <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scrolling water animation */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-aqua-500/10 backdrop-blur-sm z-10 overflow-hidden">
          <div className="animate-[slide_20s_linear_infinite] whitespace-nowrap">
            <span className="inline-block mx-4 text-aqua-500/80 font-medium">
              Clean Water Access
            </span>
            <span className="inline-block mx-4 text-aqua-500/80 font-medium">
              Sustainable Irrigation
            </span>
            <span className="inline-block mx-4 text-aqua-500/80 font-medium">
              Flood Protection
            </span>
            <span className="inline-block mx-4 text-aqua-500/80 font-medium">
              Water Purification
            </span>
            <span className="inline-block mx-4 text-aqua-500/80 font-medium">
              Ocean Conservation
            </span>
            <span className="inline-block mx-4 text-aqua-500/80 font-medium">
              Drought Resilience
            </span>
          </div>
        </div>
      </section>
      
      {/* Main Features Section */}
      <section ref={featuresRef} className="py-20 px-4 md:px-6 bg-muted/30">
        <div className="container mx-auto">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Our Platform Features
            </h2>
            <p className="text-lg text-muted-foreground">
              A comprehensive suite of tools to facilitate water resource investments and management
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Investment Feature */}
            <motion.div 
              className="bg-card border rounded-xl p-6 hover-lift flex flex-col"
              variants={itemVariants}
            >
              <div className="h-14 w-14 rounded-full bg-aqua-500/10 flex items-center justify-center mb-6">
                <LineChart className="h-7 w-7 text-aqua-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Investments</h3>
              <p className="text-muted-foreground mb-4 flex-1">
                Discover and invest in water sustainability projects around the world with transparent ROI tracking.
              </p>
              <Button asChild variant="outline" className="mt-auto">
                <Link to="/investments">
                  Browse Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            
            {/* Insurance Feature */}
            <motion.div 
              className="bg-card border rounded-xl p-6 hover-lift flex flex-col"
              variants={itemVariants}
            >
              <div className="h-14 w-14 rounded-full bg-aqua-500/10 flex items-center justify-center mb-6">
                <ShieldCheck className="h-7 w-7 text-aqua-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Insurance</h3>
              <p className="text-muted-foreground mb-4 flex-1">
                Protect your water investments with customized insurance policies for various risk levels.
              </p>
              <Button asChild variant="outline" className="mt-auto">
                <Link to="/insurance">
                  Buy Insurance
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            
            {/* Loans Feature */}
            <motion.div 
              className="bg-card border rounded-xl p-6 hover-lift flex flex-col"
              variants={itemVariants}
            >
              <div className="h-14 w-14 rounded-full bg-aqua-500/10 flex items-center justify-center mb-6">
                <BanknoteIcon className="h-7 w-7 text-aqua-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Loans</h3>
              <p className="text-muted-foreground mb-4 flex-1">
                Apply for micro-loans to fund your water sustainability projects with flexible repayment terms.
              </p>
              <Button asChild variant="outline" className="mt-auto">
                <Link to="/loans">
                  Apply for Loan
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            
            {/* Emergency Fund Feature */}
            <motion.div 
              className="bg-card border rounded-xl p-6 hover-lift flex flex-col"
              variants={itemVariants}
            >
              <div className="h-14 w-14 rounded-full bg-aqua-500/10 flex items-center justify-center mb-6">
                <LifeBuoy className="h-7 w-7 text-aqua-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Emergency Fund</h3>
              <p className="text-muted-foreground mb-4 flex-1">
                Access emergency funding for water-related crises, with quick approval for urgent situations.
              </p>
              <Button asChild variant="outline" className="mt-auto">
                <Link to="/emergency-fund">
                  Get Assistance
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Global Impact Section */}
      <section className="py-20 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Our Global Impact
              </h2>
              <p className="text-lg text-muted-foreground">
                Through sustainable water projects, we've made a measurable difference worldwide. 
                Our platform enables direct investment in communities that need it most.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <BadgeCheck className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">100+ Active Projects</h3>
                    <p className="text-sm text-muted-foreground">
                      Across 35 countries and 5 continents
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <BadgeCheck className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">2.5 Million+ People</h3>
                    <p className="text-sm text-muted-foreground">
                      Provided with clean water access
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <BadgeCheck className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">$25M+ Invested</h3>
                    <p className="text-sm text-muted-foreground">
                      With an average ROI of 7.5%
                    </p>
                  </div>
                </div>
              </div>
              
              <Button asChild>
                <Link to="/investments">
                  View Impact Projects
                </Link>
              </Button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-lg"
            >
              <img 
                src="https://source.unsplash.com/random/800x600/?water,sustainability" 
                alt="Global Water Impact" 
                className="w-full h-full object-cover" 
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Join AquaWealth Today
            </h2>
            <p className="text-xl opacity-90">
              Be part of the water sustainability revolution. Start investing, get protected, 
              and make a real difference.
            </p>
            <div className="pt-4">
              <Button asChild size="lg" variant="secondary" className="px-8">
                <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                  {isAuthenticated ? "Go to Dashboard" : "Create Account"}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-muted/30 py-12 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-aqua-400 to-aqua-700 flex items-center justify-center">
                  <span className="text-white font-bold">AW</span>
                </div>
                <span className="text-xl font-semibold">AquaWealth</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Sustainable water investments for a better future.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/investments" className="hover:text-primary">Investments</Link></li>
                <li><Link to="/insurance" className="hover:text-primary">Insurance</Link></li>
                <li><Link to="/loans" className="hover:text-primary">Loans</Link></li>
                <li><Link to="/emergency-fund" className="hover:text-primary">Emergency Fund</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary">About Us</a></li>
                <li><a href="#" className="hover:text-primary">Careers</a></li>
                <li><a href="#" className="hover:text-primary">Partners</a></li>
                <li><a href="#" className="hover:text-primary">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-12 pt-6 text-center text-sm text-muted-foreground">
            <p>© 2023 AquaWealth. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
