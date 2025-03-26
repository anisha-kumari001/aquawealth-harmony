
// Mock data for investments
export const investments = [
  {
    id: "inv-1",
    name: "Clean Water Initiative - Ghana",
    description: "Funding sustainable water purification plants in rural Ghana",
    image: "https://source.unsplash.com/random/800x600/?water,africa",
    riskLevel: "Medium",
    expectedROI: 8.5,
    fundingGoal: 500000,
    fundingRaised: 325000,
    duration: "36 months",
    status: "Active",
    category: "Infrastructure",
    impact: "Provides clean water to 50,000 people",
  },
  {
    id: "inv-2",
    name: "Irrigation Modernization - India",
    description: "Upgrading traditional irrigation systems with water-saving technology",
    image: "https://source.unsplash.com/random/800x600/?irrigation,india",
    riskLevel: "Low",
    expectedROI: 6.2,
    fundingGoal: 750000,
    fundingRaised: 680000,
    duration: "24 months",
    status: "Active",
    category: "Agriculture",
    impact: "Reduces water usage by 40% across 200 farms",
  },
  {
    id: "inv-3",
    name: "Oceanic Research Vessels",
    description: "Funding research vessels to monitor ocean health and plastic pollution",
    image: "https://source.unsplash.com/random/800x600/?ocean,research",
    riskLevel: "High",
    expectedROI: 12.8,
    fundingGoal: 1200000,
    fundingRaised: 420000,
    duration: "48 months",
    status: "Active",
    category: "Research",
    impact: "Maps oceanic pollution in 3 major areas",
  },
  {
    id: "inv-4",
    name: "Coastal Erosion Protection",
    description: "Building sustainable barriers to protect coastal communities",
    image: "https://source.unsplash.com/random/800x600/?coast,erosion",
    riskLevel: "Medium",
    expectedROI: 7.5,
    fundingGoal: 850000,
    fundingRaised: 510000,
    duration: "30 months",
    status: "Active",
    category: "Infrastructure",
    impact: "Protects 15km of vulnerable coastline",
  },
];

// Mock insurance plans
export const insurancePlans = [
  {
    id: "ins-1",
    name: "Basic Water Risk Coverage",
    description: "Essential coverage for standard water-related risks",
    monthlyPremium: 29.99,
    coverage: 50000,
    benefits: ["Flood damage", "Pipe breakage", "Basic water contamination"],
    duration: "12 months",
    riskLevel: "Low"
  },
  {
    id: "ins-2",
    name: "Premium Water Protection",
    description: "Comprehensive coverage for all water-related risks",
    monthlyPremium: 49.99,
    coverage: 150000,
    benefits: ["All Basic coverage", "Advanced contamination", "Infrastructure damage", "Business interruption"],
    duration: "12 months",
    riskLevel: "Medium"
  },
  {
    id: "ins-3",
    name: "Enterprise Water Security",
    description: "Maximum coverage for large-scale water infrastructure",
    monthlyPremium: 129.99,
    coverage: 500000,
    benefits: ["All Premium coverage", "Catastrophic events", "Long-term supply disruption", "Legal liability"],
    duration: "12 months",
    riskLevel: "High"
  }
];

// Mock loan types
export const loanTypes = [
  {
    id: "loan-1",
    name: "Micro Water Project Loan",
    description: "Small loans for individual or community water projects",
    interestRate: 4.5,
    minAmount: 1000,
    maxAmount: 10000,
    duration: "6-24 months",
    requirements: ["Valid ID", "Project plan", "Basic financial history"],
    approvalRate: 78
  },
  {
    id: "loan-2",
    name: "Medium Enterprise Loan",
    description: "For established businesses expanding water-related services",
    interestRate: 5.2,
    minAmount: 10000,
    maxAmount: 100000,
    duration: "12-48 months",
    requirements: ["Business registration", "2+ years operation", "Financial statements", "Collateral may be required"],
    approvalRate: 65
  },
  {
    id: "loan-3",
    name: "Large Infrastructure Loan",
    description: "Major funding for significant water infrastructure projects",
    interestRate: 6.8,
    minAmount: 100000,
    maxAmount: 1000000,
    duration: "36-120 months",
    requirements: ["Detailed project planning", "Environmental impact assessment", "Substantial collateral", "Board approval"],
    approvalRate: 42
  }
];

// Mock portfolio data
export const portfolioAllocation = [
  { name: "Investments", value: 65 },
  { name: "Emergency Fund", value: 20 },
  { name: "Insurance", value: 10 },
  { name: "Loans", value: 5 },
];

// Mock investment growth data
export const investmentGrowthData = [
  { month: "Jan", amount: 10000 },
  { month: "Feb", amount: 12000 },
  { month: "Mar", amount: 11500 },
  { month: "Apr", amount: 13800 },
  { month: "May", amount: 15200 },
  { month: "Jun", amount: 16500 },
  { month: "Jul", amount: 18000 },
  { month: "Aug", amount: 19800 },
  { month: "Sep", amount: 21000 },
  { month: "Oct", amount: 22500 },
  { month: "Nov", amount: 24100 },
  { month: "Dec", amount: 26000 },
];

// Mock wallet balance history
export const walletBalanceHistory = [
  { date: "Jan 1", balance: 8500 },
  { date: "Feb 1", balance: 9200 },
  { date: "Mar 1", balance: 11000 },
  { date: "Apr 1", balance: 10300 },
  { date: "May 1", balance: 12700 },
  { date: "Jun 1", balance: 14500 },
];

// Mock risk level distribution
export const riskLevelDistribution = [
  { name: "Low Risk", value: 35 },
  { name: "Medium Risk", value: 45 },
  { name: "High Risk", value: 20 },
];

// Mock emergency fund data
export const emergencyFundData = {
  totalPool: 2500000,
  availableFunds: 1850000,
  allocatedFunds: 650000,
  requestsPending: 15,
  requestsApproved: 28,
  requestsDeclined: 7,
  regionAllocation: [
    { region: "Africa", allocation: 40 },
    { region: "Asia", allocation: 30 },
    { region: "South America", allocation: 20 },
    { region: "Other", allocation: 10 },
  ],
  usageBreakdown: [
    { category: "Flood Relief", percentage: 45 },
    { category: "Drought Aid", percentage: 30 },
    { category: "Infrastructure Repair", percentage: 15 },
    { category: "Educational Programs", percentage: 10 },
  ],
};

// Mock transactions
export const recentTransactions = [
  {
    id: "tx-1",
    type: "Investment",
    amount: 5000,
    date: "2023-12-01",
    description: "Investment in Clean Water Initiative",
    status: "Completed"
  },
  {
    id: "tx-2",
    type: "Insurance",
    amount: 49.99,
    date: "2023-12-05",
    description: "Premium Water Protection monthly payment",
    status: "Completed"
  },
  {
    id: "tx-3",
    type: "Loan Repayment",
    amount: 350,
    date: "2023-12-10",
    description: "Micro Water Project Loan repayment",
    status: "Completed"
  },
  {
    id: "tx-4",
    type: "Deposit",
    amount: 2000,
    date: "2023-12-15",
    description: "Wallet deposit",
    status: "Completed"
  },
  {
    id: "tx-5",
    type: "Investment",
    amount: 3000,
    date: "2023-12-20",
    description: "Investment in Irrigation Modernization",
    status: "Pending"
  },
];

// Mock notifications
export const notifications = [
  {
    id: "notif-1",
    type: "info",
    message: "Your KYC verification has been approved!",
    date: "2023-12-01",
    read: false
  },
  {
    id: "notif-2",
    type: "success",
    message: "Investment in Clean Water Initiative completed successfully.",
    date: "2023-12-02",
    read: true
  },
  {
    id: "notif-3",
    type: "warning",
    message: "Your insurance policy is due for renewal in 7 days.",
    date: "2023-12-05",
    read: false
  },
  {
    id: "notif-4",
    type: "error",
    message: "Your loan application requires additional documentation.",
    date: "2023-12-10",
    read: false
  },
  {
    id: "notif-5",
    type: "info",
    message: "New investment opportunity available: Coastal Erosion Protection.",
    date: "2023-12-15",
    read: true
  },
];
