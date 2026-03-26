import React, { useState } from 'react';
import { useNYXOStore } from '../store';
import { KPICard } from '../components/shared/KPICard';
import { ApprovalCard } from '../components/shared/ApprovalCard';
import { ActivityFeedItem } from '../components/shared/ActivityFeedItem';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer } from
'recharts';
import { Play, Pause, FastForward } from 'lucide-react';
export function Dashboard() {
  const {
    currentUser,
    company,
    tasks,
    system,
    simulations,
    financials,
    approvals,
    activityFeed,
    simulatedTime,
    toggleTimeRunning,
    setTimeMultiplier
  } = useNYXOStore();
  const [feedFilter, setFeedFilter] = useState<string>('all');
  const filteredFeed =
  feedFilter === 'all' ?
  activityFeed :
  activityFeed.filter((a) => a.department === feedFilter);
  // Generate mock chart data based on current time
  const chartData = Array.from({
    length: 24
  }).map((_, i) => ({
    time: `${i}:00`,
    sales: Math.floor(Math.random() * 50) + 10,
    marketing: Math.floor(Math.random() * 40) + 5,
    finance: Math.floor(Math.random() * 20) + 2,
    operations: Math.floor(Math.random() * 60) + 15,
    it: Math.floor(Math.random() * 30) + 5
  }));
  const formatCurrency = (val: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(val);
  const formatCompact = (val: number) =>
  new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(val);
  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 pb-24">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
          Good morning, {currentUser.name}. NYXO has completed{' '}
          {tasks.monthlyCount.toLocaleString()} tasks this month.
        </h1>
        <p className="text-text-secondary text-sm">
          All systems operational · Tier: {company.tier.toUpperCase()} ·{' '}
          {system.activeAgentCount} agents active
        </p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard
          title="Tasks This Month"
          value={tasks.monthlyCount.toLocaleString()}
          sublabel={`Limit: ${tasks.monthlyLimit.toLocaleString()}`}
          trend={{
            value: 12,
            direction: 'up'
          }}
          accentColor="cyan"
          delay={0} />
        
        <KPICard
          title="Active Agents"
          value={`${system.activeAgentCount} / 52`}
          sublabel="Currently executing tasks"
          accentColor="violet"
          delay={50} />
        
        <KPICard
          title="Simulation Success"
          value={`${simulations.successRate}%`}
          sublabel={`${simulations.monthlyCount} simulations run`}
          trend={{
            value: 2.1,
            direction: 'up'
          }}
          accentColor="green"
          delay={100} />
        
        <KPICard
          title="Cost Saved"
          value={formatCurrency(financials.totalSavedVsManual)}
          sublabel="Vs manual human execution"
          accentColor="gold"
          delay={150} />
        
        <KPICard
          title="Pipeline Value"
          value={formatCompact(financials.pipeline)}
          sublabel="Across 14 active deals"
          trend={{
            value: 8.4,
            direction: 'up'
          }}
          accentColor="cyan"
          delay={200} />
        
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Activity Feed (7 cols) */}
        <div className="lg:col-span-7 bg-surface border border-subtle rounded-lg flex flex-col h-[600px]">
          <div className="p-4 border-b border-subtle flex justify-between items-center">
            <h3 className="text-lg font-bold text-text-primary">
              Live Activity Feed
            </h3>
            <div className="flex space-x-1 overflow-x-auto hide-scrollbar">
              {[
              'all',
              'sales',
              'marketing',
              'finance',
              'operations',
              'it',
              'system'].
              map((tab) =>
              <button
                key={tab}
                onClick={() => setFeedFilter(tab)}
                className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${feedFilter === tab ? 'bg-elevated text-cyan border border-subtle' : 'text-text-muted hover:text-text-secondary'}`}>
                
                  {tab}
                </button>
              )}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-1">
            {filteredFeed.map((entry) =>
            <ActivityFeedItem key={entry.id} entry={entry} />
            )}
            {filteredFeed.length === 0 &&
            <div className="h-full flex items-center justify-center text-text-muted text-sm">
                No activity found for this filter.
              </div>
            }
          </div>
        </div>

        {/* Right Column: Approvals (5 cols) */}
        <div className="lg:col-span-5 flex flex-col h-[600px]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-text-primary flex items-center">
              Pending Approvals
              <span className="ml-2 bg-warning text-void text-xs font-bold px-2 py-0.5 rounded-full">
                {approvals.length}
              </span>
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {approvals.length > 0 ?
            approvals.map((request) =>
            <ApprovalCard
              key={request.id}
              request={request}
              role={currentUser.role} />

            ) :

            <div className="bg-surface border border-subtle rounded-lg p-8 text-center flex flex-col items-center justify-center h-full">
                <div className="w-16 h-16 rounded-full bg-success-muted flex items-center justify-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center text-void font-bold text-xl">
                    ✓
                  </div>
                </div>
                <h4 className="text-lg font-bold text-text-primary mb-2">
                  You're all caught up.
                </h4>
                <p className="text-sm text-text-secondary">
                  NYXO is handling everything autonomously right now.
                </p>
              </div>
            }
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart */}
        <div className="bg-surface border border-subtle rounded-lg p-6 h-[400px] flex flex-col">
          <h3 className="text-lg font-bold text-text-primary mb-6">
            Task Volume (24h)
          </h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{
                  top: 0,
                  right: 0,
                  left: -20,
                  bottom: 0
                }}>
                
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00E5A0" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00E5A0" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorOps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4DA6FF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4DA6FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1A3260"
                  vertical={false} />
                
                <XAxis
                  dataKey="time"
                  stroke="#4A6080"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false} />
                
                <YAxis
                  stroke="#4A6080"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false} />
                
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F1F3D',
                    borderColor: '#1A3260',
                    color: '#fff',
                    borderRadius: '8px'
                  }}
                  itemStyle={{
                    color: '#fff'
                  }} />
                
                <Area
                  type="monotone"
                  dataKey="operations"
                  stroke="#4DA6FF"
                  fillOpacity={1}
                  fill="url(#colorOps)" />
                
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#00E5A0"
                  fillOpacity={1}
                  fill="url(#colorSales)" />
                
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Morning Briefing Placeholder */}
        <div className="bg-surface border border-subtle rounded-lg p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-text-primary">
              Morning Briefing
            </h3>
            <span className="text-xs text-text-muted font-mono">
              {new Date(simulatedTime.currentDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex-1 bg-void border border-subtle rounded p-6 overflow-y-auto font-body text-sm text-text-secondary space-y-4">
            <p>
              <strong className="text-text-primary">Executive Summary:</strong>{' '}
              All systems nominal. We processed 1,240 tasks overnight. The Nexus
              Corp deal is ready for your review.
            </p>
            <p>
              <strong className="text-text-primary">Financials:</strong> Burn
              rate is stable. We saved $420 in LLM routing optimizations
              yesterday.
            </p>
            <p>
              <strong className="text-text-primary">Risks:</strong> 2 security
              events blocked. Meta Ads API is showing degraded performance, Ad
              Manager is in fallback mode.
            </p>
            <button className="mt-4 text-cyan hover:text-cyan-hover font-bold text-sm transition-colors">
              Read Full Briefing →
            </button>
          </div>
        </div>
      </div>

      {/* Time Control Widget (Fixed Bottom Right) */}
      <div className="fixed bottom-6 right-6 bg-elevated border border-subtle rounded-full shadow-2xl flex items-center p-1 z-50">
        <div className="px-4 py-2 border-r border-subtle">
          <div className="text-xs font-mono text-text-secondary">
            {new Date(simulatedTime.currentDate).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
        <div className="flex items-center px-2 space-x-1">
          <button
            onClick={toggleTimeRunning}
            className={`p-2 rounded-full hover:bg-surface transition-colors ${!simulatedTime.isRunning ? 'text-warning' : 'text-text-primary'}`}>
            
            {simulatedTime.isRunning ?
            <Pause className="w-4 h-4" /> :

            <Play className="w-4 h-4" />
            }
          </button>
          <button
            onClick={() => setTimeMultiplier(1)}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${simulatedTime.timeMultiplier === 1 ? 'bg-cyan text-void' : 'text-text-secondary hover:bg-surface'}`}>
            
            1x
          </button>
          <button
            onClick={() => setTimeMultiplier(10)}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${simulatedTime.timeMultiplier === 10 ? 'bg-cyan text-void' : 'text-text-secondary hover:bg-surface'}`}>
            
            10x
          </button>
          <button
            onClick={() => setTimeMultiplier(60)}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${simulatedTime.timeMultiplier === 60 ? 'bg-cyan text-void' : 'text-text-secondary hover:bg-surface'}`}>
            
            <FastForward className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>);

}