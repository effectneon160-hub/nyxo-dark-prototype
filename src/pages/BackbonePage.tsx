import React from 'react';
import { Link } from 'react-router-dom';
import { useNYXOStore } from '../store';
import { StatusPill } from '../components/shared/StatusPill';
import {
  BrainCircuit,
  Cpu,
  Scale,
  GraduationCap,
  LineChart,
  Database,
  CheckCircle2 } from
'lucide-react';
export function BackbonePage() {
  const { backboneAgents } = useNYXOStore();
  const iconMap: Record<string, React.ElementType> = {
    cpu: Cpu,
    scale: Scale,
    'graduation-cap': GraduationCap,
    'line-chart': LineChart,
    database: Database,
    'check-circle-2': CheckCircle2
  };
  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 pb-24">
      <div>
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2 flex items-center">
          <BrainCircuit className="w-8 h-8 mr-3 text-violet" />
          Backbone Intelligence
        </h1>
        <p className="text-text-secondary text-sm">
          The 6 system-level agents that coordinate all autonomous operations
          across the enterprise.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {backboneAgents.map((agent) => {
          const Icon = iconMap[agent.avatar] || BrainCircuit;
          return (
            <Link
              key={agent.id}
              to={`/agents/${agent.id}`}
              className="bg-surface border border-subtle rounded-lg p-6 hover:bg-surface-hover transition-colors group relative overflow-hidden flex flex-col h-[320px]">
              
              <div className="absolute top-0 left-0 w-full h-1 bg-violet" />

              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-elevated border border-subtle flex items-center justify-center text-violet group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-text-primary">
                      {agent.name}
                    </h3>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-violet-muted text-violet uppercase tracking-wider">
                        Global Scope
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <StatusPill status={agent.status} />
              </div>

              <div className="flex-1">
                <div className="text-xs text-text-muted mb-1 uppercase tracking-wider font-bold">
                  Current Focus
                </div>
                <div className="text-sm text-text-secondary line-clamp-2 h-10">
                  {agent.currentTask || 'Monitoring system state'}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-subtle mt-auto">
                <div>
                  <div className="text-xs text-text-muted mb-1">
                    Tasks Today
                  </div>
                  <div className="text-lg font-mono font-bold text-text-primary">
                    {agent.tasksToday.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-text-muted mb-1">
                    Success Rate
                  </div>
                  <div className="text-lg font-mono font-bold text-success">
                    {agent.successRate}%
                  </div>
                </div>
              </div>
            </Link>);

        })}
      </div>

      <div className="bg-surface border border-subtle rounded-lg p-6 mt-8">
        <h3 className="text-lg font-bold text-text-primary mb-4">
          System Coordination Status
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed">
          The Master Coordinator is currently routing tasks across 14 active
          departmental agents with a 99.9% success rate. The Governance Agent is
          actively monitoring all outbound communications and financial
          transactions against 247 compliance rules. Memory synchronization is
          optimal across all vector and graph databases.
        </p>
      </div>
    </div>);

}