
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
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Info } from "lucide-react";

interface Loan {
  id: string;
  name: string;
  interestRate: number;
  minAmount: number;
  maxAmount: number;
  duration: string;
  requirements: string[];
}

interface LoanFormProps {
  loan: Loan | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function LoanForm({ 
  loan, 
  isOpen, 
  onClose 
}: LoanFormProps) {
  const [amount, setAmount] = useState<string>("");
  const [duration, setDuration] = useState<string>("12");
  const [purpose, setPurpose] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loan) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Loan Application Submitted!",
      description: "Your application is being processed. We'll notify you soon.",
    });
    
    setIsSubmitting(false);
    onClose();
  };

  const calculateMonthlyPayment = () => {
    if (!loan || !amount) return 0;
    
    const principal = parseFloat(amount);
    const interestRate = loan.interestRate / 100 / 12; // monthly interest rate
    const numberOfPayments = parseInt(duration);
    
    // Monthly payment formula: P * (r(1+r)^n) / ((1+r)^n - 1)
    const payment = principal * (interestRate * Math.pow(1 + interestRate, numberOfPayments)) 
                    / (Math.pow(1 + interestRate, numberOfPayments) - 1);
    
    return payment.toFixed(2);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Apply for {loan?.name}</DialogTitle>
          <DialogDescription>
            Fill out the details for your loan application.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Loan Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={loan?.minAmount}
              max={loan?.maxAmount}
              required
              placeholder={`${loan?.minAmount} - ${loan?.maxAmount}`}
            />
            <p className="text-xs text-muted-foreground">
              Min: ${loan?.minAmount} - Max: ${loan?.maxAmount}
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="duration">Loan Duration (months)</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger id="duration">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12">12 Months</SelectItem>
                <SelectItem value="24">24 Months</SelectItem>
                <SelectItem value="36">36 Months</SelectItem>
                <SelectItem value="48">48 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="purpose">Loan Purpose</Label>
            <Textarea
              id="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              required
              placeholder="Explain how you'll use this loan..."
              className="min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2 rounded-md bg-muted p-4">
            <div className="flex justify-between">
              <span>Interest Rate:</span>
              <span className="font-medium">{loan?.interestRate}%</span>
            </div>
            
            <div className="flex justify-between">
              <span>Estimated Monthly Payment:</span>
              <span className="font-medium">${calculateMonthlyPayment()}</span>
            </div>
            
            <div className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
              <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <p>
                Required documents: {loan?.requirements.join(", ")}. You'll need to upload 
                these after submission.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Apply for Loan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
