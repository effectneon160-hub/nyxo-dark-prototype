import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useNYXOStore } from '../store';
import { Department } from '../store/types';
import { StatusPill } from '../components/shared/StatusPill';
import { ActivityFeedItem } from '../components/shared/ActivityFeedItem';
import { getAgentIcon } from './AgentsGrid';
import {
  ArrowLeft,
  TrendingUp,
  Megaphone,
  DollarSign,
  Settings,
  Server,
  Send,
  Activity } from
'lucide-react';
export function DepartmentDetail() {
  const { dept } = useParams<{
    dept: string;
  }>();
  const navigate = useNavigate();
  const { agents, activityFeed, financials } = useNYXOStore();
  // Validate department
  const validDepts = ['sales', 'marketing', 'finance', 'operations', 'it'];
  if (!dept || !validDepts.includes(dept)) {
    return <div className="p-8 text-danger">Invalid Department</div>;
  }
  const departmentId = dept as Department;
  const deptAgents = agents.filter((a) => a.department === departmentId);
  const deptFeed = activityFeed.filter((a) => a.department === departmentId);
  const activeAgents = deptAgents.filter(
    (a) => a.status === 'running' || a.status === 'active'
  ).length;
  const tasksToday = deptAgents.reduce((sum, a) => sum + a.tasksToday, 0);
  const avgSuccess =
  deptAgents.reduce((sum, a) => sum + a.successRate, 0) / (
  deptAgents.length || 1);
  // Department specific config
  const deptConfig = {
    sales: {
      name: 'Sales & Growth',
      icon: TrendingUp,
      color: 'text-success',
      bg: 'bg-success-muted',
      border: 'border-success',
      metrics: [
      {
        label: 'Pipeline Value',
        value: `$${(financials.pipeline / 1000000).toFixed(1)}M`
      },
      {
        label: 'Leads This Week',
        value: '1,847'
      },
      {
        label: 'Conversion Rate',
        value: '8.4%'
      },
      {
        label: 'Meetings Booked',
        value: '28'
      }]

    },
    marketing: {
      name: 'Marketing & Content',
      icon: Megaphone,
      color: 'text-violet',
      bg: 'bg-violet-muted',
      border: 'border-violet',
      metrics: [
      {
        label: 'Ad Spend',
        value: `$${(financials.adSpend / 1000).toFixed(1)}K`
      },
      {
        label: 'Content Published',
        value: '47'
      },
      {
        label: 'Avg CTR',
        value: '3.8%'
      },
      {
        label: 'Brand Sentiment',
        value: '87/100'
      }]

    },
    finance: {
      name: 'Finance & Legal',
      icon: DollarSign,
      color: 'text-gold',
      bg: 'bg-gold/10',
      border: 'border-gold',
      metrics: [
      {
        label: 'Monthly Revenue',
        value: `$${(financials.monthlyRevenue / 1000).toFixed(1)}K`
      },
      {
        label: 'Monthly Burn',
        value: `$${(financials.monthlyBurn / 1000).toFixed(1)}K`
      },
      {
        label: 'Cash Runway',
        value: `${financials.cashRunway} mo`
      },
      {
        label: 'Outstanding',
        value: `$${(financials.outstandingInvoices / 1000).toFixed(1)}K`
      }]

    },
    operations: {
      name: 'Operations & Support',
      icon: Settings,
      color: 'text-info',
      bg: 'bg-info-muted',
      border: 'border-info',
      metrics: [
      {
        label: 'Open Tickets',
        value: '47'
      },
      {
        label: 'Resolved Today',
        value: '124'
      },
      {
        label: 'Avg Resolution',
        value: '8.4 min'
      },
      {
        label: 'CSAT Score',
        value: '94.2%'
      }]

    },
    it: {
      name: 'IT & Automation',
      icon: Server,
      color: 'text-cyan',
      bg: 'bg-cyan-muted',
      border: 'border-cyan',
      metrics: [
      {
        label: 'System Uptime',
        value: '99.97%'
      },
      {
        label: 'Active APIs',
        value: '47'
      },
      {
        label: 'Security Score',
        value: '94/100'
      },
      {
        label: 'Incidents',
        value: '2'
      }]

    }
  }[departmentId];
  const Icon = deptConfig.icon;
  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 pb-24">
      <button
        onClick={() => navigate('/departments')}
        className="flex items-center text-sm text-text-secondary hover:text-text-primary transition-colors">
        
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Departments
      </button>

      {/* Header Banner */}
      <div
        className={`relative overflow-hidden rounded-xl border ${deptConfig.border}/30 bg-surface p-8`}>
        
        <div
          className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 -translate-y-1/2 translate-x-1/3 ${deptConfig.bg}`}>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center space-x-4">
            <div
              className={`w-16 h-16 rounded-xl flex items-center justify-center border ${deptConfig.bg} ${deptConfig.border}/50 ${deptConfig.color}`}>
              
              <Icon className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-text-primary mb-1">
                {deptConfig.name}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <span>{deptAgents.length} Specialized Agents</span>
                <span>•</span>
                <span className="flex items-center">
                  <Activity className="w-3 h-3 mr-1" /> {tasksToday} tasks today
                </span>
                <span>•</span>
                <span className="text-success">
                  {avgSuccess.toFixed(1)}% success rate
                </span>
              </div>
            </div>
          </div>

          {/* Department Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto">
            {deptConfig.metrics.map((metric, idx) =>
            <div
              key={idx}
              className="bg-void/50 border border-subtle rounded-lg p-3 min-w-[120px]">
              
                <div className="text-xs text-text-muted mb-1">
                  {metric.label}
                </div>
                <div className="text-lg font-bold text-text-primary">
                  {metric.value}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Command Input */}
      <div className="bg-surface border border-subtle rounded-lg p-2 flex items-center shadow-lg">
        <div className="pl-4 pr-2 text-text-muted">
          <Terminal className="w-5 h-5" />
        </div>
        <input
          type="text"
          placeholder={`Give a command to the ${deptConfig.name} department...`}
          className="flex-1 bg-transparent border-none outline-none text-text-primary py-3 px-2" />
        
        <button className="bg-cyan hover:bg-cyan-hover text-void px-6 py-3 rounded font-bold transition-colors flex items-center">
          <Send className="w-4 h-4 mr-2" /> Execute
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Agents Grid (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-text-primary">
            Department Agents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {deptAgents.map((agent, idx) =>
            <div
              key={agent.id}
              onClick={() => navigate(`/agents/${agent.id}`)}
              className="bg-surface border border-subtle rounded-lg p-5 hover:bg-surface-hover transition-colors cursor-pointer animate-feed-entry group"
              style={{
                animationDelay: `${idx * 50}ms`
              }}>
              
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded bg-elevated flex items-center justify-center text-text-secondary group-hover:text-cyan transition-colors">
                      {getAgentIcon(agent.avatar)}
                    </div>
                    <div>
                      <h3 className="font-bold text-text-primary truncate max-w-[150px]">
                        {agent.name}
                      </h3>
                      <div className="text-xs text-text-muted capitalize">
                        {agent.type}
                      </div>
                    </div>
                  </div>
                  <StatusPill status={agent.status} />
                </div>
                <div className="text-xs text-text-secondary mb-1">
                  Current Task:
                </div>
                <div className="text-sm font-medium text-text-primary truncate">
                  {agent.currentTask || 'Idle'}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Department Activity (1 col) */}
        <div className="bg-surface border border-subtle rounded-lg flex flex-col h-[600px]">
          <div className="p-4 border-b border-subtle">
            <h3 className="text-lg font-bold text-text-primary">
              Recent Activity
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-1">
            {deptFeed.length > 0 ?
            deptFeed.map((entry) =>
            <ActivityFeedItem key={entry.id} entry={entry} />
            ) :

            <div className="h-full flex items-center justify-center text-text-muted text-sm">
                No recent activity in this department.
              </div>
            }
          </div>
        </div>
      </div>
    </div>);

}