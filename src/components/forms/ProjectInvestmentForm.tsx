
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, Droplets } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export interface Project {
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

interface ProjectInvestmentFormProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectInvestmentForm({ 
  project, 
  isOpen, 
  onClose 
}: ProjectInvestmentFormProps) {
  const [amount, setAmount] = useState<string>("1000");
  const [paymentMethod, setPaymentMethod] = useState<string>("wallet");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!project) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Investment Successful!",
      description: `You have invested $${amount} in ${project.name}.`,
    });
    
    setIsSubmitting(false);
    onClose();
  };

  const calculateReturns = () => {
    if (!project || !amount) return 0;
    return (parseFloat(amount) * project.roi / 100).toFixed(2);
  };

  const calculateImpact = () => {
    if (!amount) return 0;
    // Simplified impact calculation - 1 person gets access to water per $100 invested
    return Math.floor(parseFloat(amount) / 100);
  };

  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invest in {project.name}</DialogTitle>
          <DialogDescription>
            Enter investment details to proceed with your contribution.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Investment Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="100"
              max={project.investmentRequired}
              required
              placeholder="Enter amount"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="payment-method">Payment Method</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger id="payment-method">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wallet">Wallet Balance</SelectItem>
                <SelectItem value="card">Credit/Debit Card</SelectItem>
                <SelectItem value="bank">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-4 rounded-md bg-blue-900/40 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Project Funding:</span>
              <span className="text-sm font-medium">
                ${project.investmentRequired * project.fundingProgress / 100} of ${project.investmentRequired}
              </span>
            </div>
            
            <Progress value={project.fundingProgress} className="h-2" />
            
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm">Expected Return:</span>
              <div className="flex items-center gap-1 text-sm font-medium">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span>${calculateReturns()}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Environmental Impact:</span>
              <div className="flex items-center gap-1 text-sm font-medium">
                <Droplets className="h-4 w-4 text-blue-500" />
                <span>Helps {calculateImpact()} people access clean water</span>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Confirm Investment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
