import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNYXOStore } from '../store';
import { StatusPill } from '../components/shared/StatusPill';
import {
  Search,
  Filter,
  Target,
  Database,
  Mail,
  Briefcase,
  PenTool,
  TrendingUp,
  FileText,
  ShieldAlert,
  LifeBuoy,
  Lock,
  Cpu,
  Scale,
  BrainCircuit,
  Activity,
  AlertCircle,
  PlayCircle,
  PauseCircle } from
'lucide-react';
// Helper to map string avatar names to Lucide icons
export const getAgentIcon = (avatarName: string, className = 'w-6 h-6') => {
  const iconMap: Record<string, React.ReactNode> = {
    target: <Target className={className} />,
    database: <Database className={className} />,
    mail: <Mail className={className} />,
    briefcase: <Briefcase className={className} />,
    'pen-tool': <PenTool className={className} />,
    'trending-up': <TrendingUp className={className} />,
    'file-text': <FileText className={className} />,
    'shield-alert': <ShieldAlert className={className} />,
    'life-buoy': <LifeBuoy className={className} />,
    lock: <Lock className={className} />,
    cpu: <Cpu className={className} />,
    scale: <Scale className={className} />
  };
  return iconMap[avatarName] || <BrainCircuit className={className} />;
};
export function AgentsGrid() {
  const navigate = useNavigate();
  const { agents, backboneAgents, system } = useNYXOStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const filteredAgents = agents.filter((agent) => {
    const matchesSearch = agent.name.
    toLowerCase().
    includes(searchQuery.toLowerCase());
    const matchesDept = deptFilter === 'all' || agent.department === deptFilter;
    const matchesStatus =
    statusFilter === 'all' || agent.status === statusFilter;
    return matchesSearch && matchesDept && matchesStatus;
  });
  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
            Agent Directory
          </h1>
          <p className="text-text-secondary text-sm">
            {system.activeAgentCount} of {agents.length + backboneAgents.length}{' '}
            agents currently active across all departments.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-surface border border-subtle rounded-md pl-9 pr-4 py-2 text-sm text-text-primary focus:border-cyan outline-none w-full sm:w-64 transition-colors" />
            
          </div>
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="bg-surface border border-subtle rounded-md px-4 py-2 text-sm text-text-primary focus:border-cyan outline-none appearance-none">
            
            <option value="all">All Departments</option>
            <option value="sales">Sales</option>
            <option value="marketing">Marketing</option>
            <option value="finance">Finance</option>
            <option value="operations">Operations</option>
            <option value="it">IT</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-surface border border-subtle rounded-md px-4 py-2 text-sm text-text-primary focus:border-cyan outline-none appearance-none">
            
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="running">Running</option>
            <option value="idle">Idle</option>
            <option value="paused">Paused</option>
            <option value="error">Error</option>
          </select>
        </div>
      </div>

      {/* Backbone Agents Section (Only show if not filtering by dept) */}
      {deptFilter === 'all' && searchQuery === '' &&
      <div className="space-y-4">
          <h2 className="text-lg font-bold text-text-primary flex items-center">
            <BrainCircuit className="w-5 h-5 mr-2 text-violet" />
            Backbone Brain Agents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {backboneAgents.map((agent, idx) =>
          <div
            key={agent.id}
            className="bg-surface border border-violet/30 rounded-lg p-5 hover:bg-surface-hover transition-colors cursor-pointer animate-feed-entry relative overflow-hidden group"
            style={{
              animationDelay: `${idx * 50}ms`
            }}
            onClick={() => navigate(`/agents/${agent.id}`)}>
            
                <div className="absolute top-0 left-0 w-1 h-full bg-violet"></div>
                <div className="flex justify-between items-start mb-4 pl-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded bg-violet-muted flex items-center justify-center text-violet">
                      {getAgentIcon(agent.avatar)}
                    </div>
                    <div>
                      <h3 className="font-bold text-text-primary group-hover:text-violet transition-colors">
                        {agent.name}
                      </h3>
                      <div className="text-xs text-text-muted uppercase tracking-wider font-bold">
                        Global Scope
                      </div>
                    </div>
                  </div>
                  <StatusPill status={agent.status} />
                </div>
                <div className="pl-2">
                  <div className="text-xs text-text-secondary mb-1">
                    Current Task:
                  </div>
                  <div className="text-sm text-text-primary font-medium truncate">
                    {agent.currentTask || 'Idle'}
                  </div>
                </div>
              </div>
          )}
          </div>
        </div>
      }

      {/* Department Agents Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-text-primary flex items-center">
          <Activity className="w-5 h-5 mr-2 text-cyan" />
          Department Agents
          <span className="ml-2 bg-surface border border-subtle text-text-muted text-xs font-bold px-2 py-0.5 rounded-full">
            {filteredAgents.length}
          </span>
        </h2>

        {filteredAgents.length > 0 ?
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredAgents.map((agent, idx) =>
          <div
            key={agent.id}
            className={`bg-surface border ${agent.status === 'error' ? 'border-danger/50' : 'border-subtle'} rounded-lg p-5 hover:bg-surface-hover transition-colors cursor-pointer animate-feed-entry group flex flex-col h-full`}
            style={{
              animationDelay: `${idx % 10 * 50}ms`
            }}
            onClick={() => navigate(`/agents/${agent.id}`)}>
            
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                  className={`w-10 h-10 rounded flex items-center justify-center ${agent.status === 'error' ? 'bg-danger-muted text-danger' : agent.status === 'running' ? 'bg-cyan-muted text-cyan' : 'bg-elevated text-text-secondary'}`}>
                  
                      {getAgentIcon(agent.avatar)}
                    </div>
                    <div>
                      <h3
                    className="font-bold text-text-primary group-hover:text-cyan transition-colors truncate max-w-[120px]"
                    title={agent.name}>
                    
                        {agent.name}
                      </h3>
                      <div className="text-xs text-text-muted uppercase tracking-wider font-bold">
                        {agent.department}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <StatusPill status={agent.status} />
                </div>

                <div className="flex-1 flex flex-col justify-end">
                  <div className="text-xs text-text-secondary mb-1">
                    Current Task:
                  </div>
                  <div
                className={`text-sm font-medium line-clamp-2 ${agent.status === 'error' ? 'text-danger' : 'text-text-primary'}`}>
                
                    {agent.status === 'error' ?
                agent.lastError :
                agent.currentTask || 'Waiting for trigger'}
                  </div>

                  <div className="mt-4 pt-4 border-t border-subtle flex justify-between items-center">
                    <div className="text-xs">
                      <span className="text-text-muted">Success: </span>
                      <span
                    className={
                    agent.successRate > 90 ?
                    'text-success' :
                    'text-warning'
                    }>
                    
                        {agent.successRate}%
                      </span>
                    </div>
                    <div className="text-xs">
                      <span className="text-text-muted">Today: </span>
                      <span className="text-text-primary font-mono">
                        {agent.tasksToday}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
          )}
          </div> :

        <div className="bg-surface border border-subtle rounded-lg p-12 text-center flex flex-col items-center justify-center">
            <AlertCircle className="w-12 h-12 text-text-muted mb-4" />
            <h3 className="text-lg font-bold text-text-primary mb-2">
              No agents found
            </h3>
            <p className="text-text-secondary">
              Try adjusting your search or filters to find what you're looking
              for.
            </p>
          </div>
        }
      </div>
    </div>);

}