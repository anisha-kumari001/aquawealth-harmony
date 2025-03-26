
import React from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine 
} from "recharts";
import { investmentGrowthData } from "@/data/mockData";

export default function InvestmentGrowthChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={investmentGrowthData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="investmentGrowth" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis 
          dataKey="month" 
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => `$${value / 1000}k`}
        />
        <Tooltip 
          formatter={(value: number) => [`$${value.toLocaleString()}`, 'Investment Value']}
          contentStyle={{ 
            borderRadius: '0.75rem',
            border: '1px solid var(--border)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}
        />
        <ReferenceLine y={15000} stroke="#9ca3af" strokeDasharray="3 3" />
        <Area 
          type="monotone" 
          dataKey="amount" 
          stroke="#0ea5e9" 
          fillOpacity={1} 
          fill="url(#investmentGrowth)" 
          activeDot={{ r: 6 }}
          animationDuration={1000}
          animationBegin={0}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
