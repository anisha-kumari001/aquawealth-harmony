
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
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { ShieldCheck } from "lucide-react";

interface Insurance {
  id: string;
  name: string;
  monthlyPremium: number;
  coverage: number;
  benefits: string[];
}

interface InsuranceFormProps {
  insurance: Insurance | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function InsuranceForm({ 
  insurance, 
  isOpen, 
  onClose 
}: InsuranceFormProps) {
  const [duration, setDuration] = useState<string>("12");
  const [paymentFrequency, setPaymentFrequency] = useState<string>("monthly");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!insurance) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Insurance Purchased!",
      description: `You are now covered with ${insurance.name}.`,
    });
    
    setIsSubmitting(false);
    onClose();
  };

  const calculateTotalCost = () => {
    if (!insurance) return 0;
    
    let monthlyRate = insurance.monthlyPremium;
    let months = parseInt(duration);
    
    // Apply discount for annual payment
    if (paymentFrequency === "annual") {
      return (monthlyRate * months * 0.9).toFixed(2); // 10% discount
    }
    
    return (monthlyRate * months).toFixed(2);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Purchase {insurance?.name}</DialogTitle>
          <DialogDescription>
            Configure your insurance plan coverage and payment details.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2 rounded-md bg-muted p-4">
            <h4 className="font-medium">Plan Details</h4>
            <ul className="mt-2 space-y-1 text-sm">
              {insurance?.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2 pt-2 border-t">
              <div className="flex justify-between">
                <span>Monthly Premium:</span>
                <span className="font-medium">${insurance?.monthlyPremium}</span>
              </div>
              <div className="flex justify-between">
                <span>Coverage Amount:</span>
                <span className="font-medium">${insurance?.coverage.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="duration">Coverage Duration</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger id="duration">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12">12 Months</SelectItem>
                <SelectItem value="24">24 Months</SelectItem>
                <SelectItem value="36">36 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Payment Frequency</Label>
            <RadioGroup value={paymentFrequency} onValueChange={setPaymentFrequency}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly">Monthly (regular rate)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="annual" id="annual" />
                <Label htmlFor="annual">Annual (10% discount)</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="rounded-md bg-primary/10 p-4">
            <div className="flex justify-between">
              <span className="font-medium">Total Cost:</span>
              <span className="font-bold">${calculateTotalCost()}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {paymentFrequency === "annual" 
                ? "Billed annually with 10% discount applied" 
                : "Billed monthly"}
            </p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Purchase Insurance"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
