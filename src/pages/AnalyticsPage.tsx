import React from 'react';
import { useNYXOStore } from '../store';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area } from
'recharts';
import { BarChart3, TrendingUp, DollarSign, Activity } from 'lucide-react';
export function AnalyticsPage() {
  const { financials, tasks } = useNYXOStore();
  const deptVolumeData = [
  {
    name: 'Sales',
    volume: 42500,
    fill: '#00D4FF'
  },
  {
    name: 'Marketing',
    volume: 18200,
    fill: '#7B61FF'
  },
  {
    name: 'Finance',
    volume: 8400,
    fill: '#FFD700'
  },
  {
    name: 'Operations',
    volume: 12100,
    fill: '#4DA6FF'
  },
  {
    name: 'IT',
    volume: 6034,
    fill: '#00E5A0'
  }];

  const topAgentsData = [
  {
    name: 'Invoice Gen',
    rate: 99.8
  },
  {
    name: 'Security Mon',
    rate: 99.9
  },
  {
    name: 'CRM Mgmt',
    rate: 98.1
  },
  {
    name: 'Fraud Detect',
    rate: 97.5
  },
  {
    name: 'Content Writer',
    rate: 95.5
  }];

  const formatCurrency = (val: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(val);
  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 pb-24">
      <div>
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2 flex items-center">
          <BarChart3 className="w-8 h-8 mr-3 text-cyan" />
          Analytics & Reporting
        </h1>
        <p className="text-text-secondary text-sm">
          Enterprise performance metrics and agent efficiency analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-subtle rounded-lg p-6">
          <div className="flex items-center text-text-muted mb-2">
            <DollarSign className="w-4 h-4 mr-2" />
            <span className="text-xs font-bold uppercase tracking-wider">
              LLM Cost (MTD)
            </span>
          </div>
          <div className="text-2xl font-display font-bold text-text-primary">
            {formatCurrency(financials.llmCost)}
          </div>
        </div>
        <div className="bg-surface border border-subtle rounded-lg p-6">
          <div className="flex items-center text-text-muted mb-2">
            <TrendingUp className="w-4 h-4 mr-2" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Ad Spend (MTD)
            </span>
          </div>
          <div className="text-2xl font-display font-bold text-text-primary">
            {formatCurrency(financials.adSpend)}
          </div>
        </div>
        <div className="bg-surface border border-subtle rounded-lg p-6">
          <div className="flex items-center text-text-muted mb-2">
            <Activity className="w-4 h-4 mr-2" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Tasks Completed
            </span>
          </div>
          <div className="text-2xl font-display font-bold text-text-primary">
            {tasks.monthlyCount.toLocaleString()}
          </div>
        </div>
        <div className="bg-surface border border-subtle rounded-lg p-6">
          <div className="flex items-center text-text-muted mb-2">
            <DollarSign className="w-4 h-4 mr-2" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Total Saved
            </span>
          </div>
          <div className="text-2xl font-display font-bold text-success">
            {formatCurrency(financials.totalSavedVsManual)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Trend */}
        <div className="bg-surface border border-subtle rounded-lg p-6 h-[400px] flex flex-col">
          <h3 className="text-lg font-bold text-text-primary mb-6">
            Revenue Trend (6 Months)
          </h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={financials.revenueHistory}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00D4FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1A3260"
                  vertical={false} />
                
                <XAxis
                  dataKey="month"
                  stroke="#4A6080"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false} />
                
                <YAxis
                  stroke="#4A6080"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `$${val / 1000}k`} />
                
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F1F3D',
                    borderColor: '#1A3260',
                    color: '#fff',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => formatCurrency(value)} />
                
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#00D4FF"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRev)" />
                
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Task Volume by Dept */}
        <div className="bg-surface border border-subtle rounded-lg p-6 h-[400px] flex flex-col">
          <h3 className="text-lg font-bold text-text-primary mb-6">
            Task Volume by Department
          </h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptVolumeData} layout="vertical">
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1A3260"
                  horizontal={false} />
                
                <XAxis
                  type="number"
                  stroke="#4A6080"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false} />
                
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke="#4A6080"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  width={80} />
                
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F1F3D',
                    borderColor: '#1A3260',
                    color: '#fff',
                    borderRadius: '8px'
                  }}
                  cursor={{
                    fill: '#132540'
                  }} />
                
                <Bar dataKey="volume" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Agents */}
        <div className="bg-surface border border-subtle rounded-lg p-6 h-[400px] flex flex-col lg:col-span-2">
          <h3 className="text-lg font-bold text-text-primary mb-6">
            Top Agents by Success Rate
          </h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topAgentsData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1A3260"
                  vertical={false} />
                
                <XAxis
                  dataKey="name"
                  stroke="#4A6080"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false} />
                
                <YAxis
                  stroke="#4A6080"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  domain={[90, 100]} />
                
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F1F3D',
                    borderColor: '#1A3260',
                    color: '#fff',
                    borderRadius: '8px'
                  }}
                  cursor={{
                    fill: '#132540'
                  }}
                  formatter={(value: number) => `${value}%`} />
                
                <Bar dataKey="rate" fill="#00E5A0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>);

}