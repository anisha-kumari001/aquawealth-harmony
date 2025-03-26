
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
import { AlertCircle } from "lucide-react";

interface EmergencyFundFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmergencyFundForm({ 
  isOpen, 
  onClose 
}: EmergencyFundFormProps) {
  const [amount, setAmount] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [urgency, setUrgency] = useState<string>("medium");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Emergency Fund Request Submitted",
      description: "Your request has been logged and will be reviewed shortly.",
    });
    
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request Emergency Assistance</DialogTitle>
          <DialogDescription>
            Please provide details about your emergency water situation.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="region">Affected Region</Label>
            <Select value={region} onValueChange={setRegion} required>
              <SelectTrigger id="region">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="africa">Africa</SelectItem>
                <SelectItem value="asia">Asia</SelectItem>
                <SelectItem value="south-america">South America</SelectItem>
                <SelectItem value="north-america">North America</SelectItem>
                <SelectItem value="europe">Europe</SelectItem>
                <SelectItem value="oceania">Oceania</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Requested Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="100"
              required
              placeholder="Enter amount needed"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="urgency">Urgency Level</Label>
            <Select value={urgency} onValueChange={setUrgency}>
              <SelectTrigger id="urgency">
                <SelectValue placeholder="Select urgency level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low - Needed within 30 days</SelectItem>
                <SelectItem value="medium">Medium - Needed within 14 days</SelectItem>
                <SelectItem value="high">High - Needed within 7 days</SelectItem>
                <SelectItem value="critical">Critical - Needed immediately</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reason">Emergency Details</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              placeholder="Explain the water-related emergency situation..."
              className="min-h-[100px]"
            />
          </div>
          
          <div className="rounded-md bg-primary/10 p-4 flex gap-2">
            <AlertCircle className="h-5 w-5 flex-shrink-0 text-primary" />
            <p className="text-sm">
              Emergency funds are prioritized based on severity and impact. 
              Our team will review your request within 48 hours.
            </p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
