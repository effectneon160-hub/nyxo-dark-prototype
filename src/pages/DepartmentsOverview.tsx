import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useNYXOStore } from '../store';
import {
  TrendingUp,
  Megaphone,
  DollarSign,
  Settings,
  Server,
  ArrowRight,
  Activity } from
'lucide-react';
export function DepartmentsOverview() {
  const navigate = useNavigate();
  const { agents, tasks } = useNYXOStore();
  const departments = [
  {
    id: 'sales',
    name: 'Sales & Growth',
    icon: TrendingUp,
    color: 'text-success',
    bg: 'bg-success-muted',
    border: 'border-success/30',
    description:
    'Lead generation, CRM management, and deal closing automation.',
    metrics: {
      label1: 'Pipeline',
      val1: '$2.4M',
      label2: 'Leads',
      val2: '1,847'
    }
  },
  {
    id: 'marketing',
    name: 'Marketing & Content',
    icon: Megaphone,
    color: 'text-violet',
    bg: 'bg-violet-muted',
    border: 'border-violet/30',
    description:
    'Content creation, ad campaign management, and brand voice consistency.',
    metrics: {
      label1: 'Ad Spend',
      val1: '$24.5K',
      label2: 'Content',
      val2: '47'
    }
  },
  {
    id: 'finance',
    name: 'Finance & Legal',
    icon: DollarSign,
    color: 'text-gold',
    bg: 'bg-gold/10',
    border: 'border-gold/30',
    description:
    'Invoicing, fraud detection, expense tracking, and compliance.',
    metrics: {
      label1: 'Revenue',
      val1: '$284.5K',
      label2: 'Burn',
      val2: '$89.4K'
    }
  },
  {
    id: 'operations',
    name: 'Operations & Support',
    icon: Settings,
    color: 'text-info',
    bg: 'bg-info-muted',
    border: 'border-info/30',
    description: 'Customer support, SOP management, and client onboarding.',
    metrics: {
      label1: 'CSAT',
      val1: '94.2%',
      label2: 'Tickets',
      val2: '124'
    }
  },
  {
    id: 'it',
    name: 'IT & Automation',
    icon: Server,
    color: 'text-cyan',
    bg: 'bg-cyan-muted',
    border: 'border-cyan/30',
    description:
    'Security monitoring, deployments, and infrastructure scaling.',
    metrics: {
      label1: 'Uptime',
      val1: '99.97%',
      label2: 'APIs',
      val2: '47'
    }
  }];

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
          Departments Overview
        </h1>
        <p className="text-text-secondary text-sm max-w-2xl">
          NYXO organizes your autonomous workforce into 5 core departments. Each
          department operates independently while coordinating through the
          Master Backbone Agent.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept, idx) => {
          const deptAgents = agents.filter((a) => a.department === dept.id);
          const activeAgents = deptAgents.filter(
            (a) => a.status === 'running' || a.status === 'active'
          ).length;
          const tasksToday = deptAgents.reduce(
            (sum, a) => sum + a.tasksToday,
            0
          );
          const hasErrors = deptAgents.some((a) => a.status === 'error');
          return (
            <div
              key={dept.id}
              onClick={() => navigate(`/departments/${dept.id}`)}
              className="bg-surface border border-subtle rounded-xl p-6 hover:bg-surface-hover transition-all cursor-pointer group relative overflow-hidden animate-feed-entry"
              style={{
                animationDelay: `${idx * 100}ms`
              }}>
              
              {/* Decorative background gradient */}
              <div
                className={`absolute -right-20 -top-20 w-40 h-40 rounded-full blur-3xl opacity-20 ${dept.bg}`}>
              </div>

              <div className="flex justify-between items-start mb-6 relative z-10">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center border ${dept.bg} ${dept.border} ${dept.color}`}>
                  
                  <dept.icon className="w-6 h-6" />
                </div>
                <div
                  className={`flex items-center space-x-1 text-xs font-bold px-2 py-1 rounded-full ${hasErrors ? 'bg-danger-muted text-danger' : 'bg-success-muted text-success'}`}>
                  
                  <Activity className="w-3 h-3" />
                  <span>{hasErrors ? 'ATTENTION' : 'HEALTHY'}</span>
                </div>
              </div>

              <h2 className="text-xl font-display font-bold text-text-primary mb-2 group-hover:text-cyan transition-colors relative z-10">
                {dept.name}
              </h2>
              <p className="text-sm text-text-secondary mb-6 h-10 relative z-10">
                {dept.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
                <div className="bg-elevated rounded p-3 border border-subtle">
                  <div className="text-xs text-text-muted mb-1">Agents</div>
                  <div className="text-lg font-bold text-text-primary">
                    {activeAgents}{' '}
                    <span className="text-sm text-text-secondary font-normal">
                      / {deptAgents.length}
                    </span>
                  </div>
                </div>
                <div className="bg-elevated rounded p-3 border border-subtle">
                  <div className="text-xs text-text-muted mb-1">
                    Tasks Today
                  </div>
                  <div className="text-lg font-bold text-text-primary">
                    {tasksToday}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-subtle flex justify-between items-center relative z-10">
                <div className="flex space-x-4">
                  <div>
                    <span className="text-xs text-text-muted">
                      {dept.metrics.label1}:{' '}
                    </span>
                    <span className="text-sm font-bold text-text-primary">
                      {dept.metrics.val1}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-text-muted">
                      {dept.metrics.label2}:{' '}
                    </span>
                    <span className="text-sm font-bold text-text-primary">
                      {dept.metrics.val2}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-cyan transition-colors" />
              </div>
            </div>);

        })}
      </div>
    </div>);

}