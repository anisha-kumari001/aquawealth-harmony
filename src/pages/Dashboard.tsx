
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import ChartCard from "@/components/dashboard/ChartCard";
import PortfolioAllocationChart from "@/components/dashboard/PortfolioAllocationChart";
import InvestmentGrowthChart from "@/components/dashboard/InvestmentGrowthChart";
import WalletHistoryChart from "@/components/dashboard/WalletHistoryChart";
import RiskLevelChart from "@/components/dashboard/RiskLevelChart";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import NotificationsPanel from "@/components/dashboard/NotificationsPanel";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Wallet, TrendingUp, ShieldCheck, BanknoteIcon, LifeBuoy, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name}! Here's an overview of your account.
          </p>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Wallet Balance"
            value={`$${user?.walletBalance.toLocaleString()}`}
            description="Available balance"
            icon={<Wallet className="h-5 w-5" />}
          />
          <StatCard
            title="Total Investments"
            value="$21,500"
            trend={{ value: 8.2, isPositive: true }}
            icon={<TrendingUp className="h-5 w-5" />}
          />
          <StatCard
            title="Active Insurance"
            value="2 Policies"
            description="Premium Water Protection"
            icon={<ShieldCheck className="h-5 w-5" />}
          />
          <StatCard
            title="Loan Status"
            value="$8,200"
            description="Outstanding balance"
            icon={<BanknoteIcon className="h-5 w-5" />}
          />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Investment Growth"
            description="Performance over the last 12 months"
            tag="8.2% Increase"
            action={
              <Button asChild variant="ghost" size="sm">
                <Link to="/investments">
                  View All
                </Link>
              </Button>
            }
          >
            <InvestmentGrowthChart />
          </ChartCard>
          
          <ChartCard
            title="Portfolio Allocation"
            description="Current distribution of your assets"
            action={
              <Button asChild variant="ghost" size="sm">
                <Link to="/profile">
                  Details
                </Link>
              </Button>
            }
          >
            <PortfolioAllocationChart />
          </ChartCard>
        </div>

        {/* More charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Wallet History"
            description="Balance changes over time"
          >
            <WalletHistoryChart />
          </ChartCard>
          
          <ChartCard
            title="Investment Risk Levels"
            description="Risk distribution in your portfolio"
          >
            <RiskLevelChart />
          </ChartCard>
        </div>

        {/* Quick actions */}
        <div className="bg-card/60 backdrop-blur-sm border rounded-lg p-6">
          <h2 className="text-xl font-medium mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button asChild variant="outline" className="h-auto py-6 flex flex-col gap-2 hover-lift">
              <Link to="/investments">
                <TrendingUp className="h-6 w-6 mb-2" />
                <span>Invest Now</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-6 flex flex-col gap-2 hover-lift">
              <Link to="/insurance">
                <ShieldCheck className="h-6 w-6 mb-2" />
                <span>Buy Insurance</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-6 flex flex-col gap-2 hover-lift">
              <Link to="/loans">
                <BanknoteIcon className="h-6 w-6 mb-2" />
                <span>Apply for Loan</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-6 flex flex-col gap-2 hover-lift">
              <Link to="/emergency-fund">
                <LifeBuoy className="h-6 w-6 mb-2" />
                <span>Emergency Fund</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Transactions and notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentTransactions />
          <NotificationsPanel />
        </div>
      </div>
    </DashboardLayout>
  );
}
