
import React from "react";
import { recentTransactions } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownLeft, Clock } from "lucide-react";

export default function RecentTransactions() {
  // Get transaction icon based on type
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "Investment":
      case "Insurance":
        return <ArrowUpRight className="h-4 w-4" />;
      case "Deposit":
        return <ArrowDownLeft className="h-4 w-4 text-green-500" />;
      case "Loan Repayment":
        return <ArrowUpRight className="h-4 w-4 text-orange-500" />;
      default:
        return <ArrowUpRight className="h-4 w-4" />;
    }
  };

  // Get transaction status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-200">Completed</Badge>;
      case "Pending":
        return <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-200">Pending</Badge>;
      case "Failed":
        return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-200">Failed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className="hover-lift">
      <CardHeader>
        <CardTitle className="text-base font-medium">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {recentTransactions.slice(0, 5).map((transaction) => (
            <div key={transaction.id} className="flex items-start justify-between p-4">
              <div className="flex items-start space-x-3">
                <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  {getTransactionIcon(transaction.type)}
                </div>
                <div>
                  <p className="text-sm font-medium">{transaction.type}</p>
                  <p className="text-xs text-muted-foreground">{transaction.description}</p>
                  <div className="mt-1 flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {new Date(transaction.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">
                  {transaction.type === "Deposit" ? "+" : "-"}${transaction.amount}
                </p>
                <div className="mt-1">{getStatusBadge(transaction.status)}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
