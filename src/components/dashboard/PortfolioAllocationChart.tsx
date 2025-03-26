
import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { portfolioAllocation } from "@/data/mockData";

const COLORS = ["#0ea5e9", "#38bdf8", "#7dd3fc", "#bae6fd"];

export default function PortfolioAllocationChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={portfolioAllocation}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          innerRadius={50}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          animationDuration={500}
          animationBegin={0}
        >
          {portfolioAllocation.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: number) => [`${value}%`, 'Allocation']}
          contentStyle={{ 
            borderRadius: '0.75rem',
            border: '1px solid var(--border)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}
        />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  );
}
