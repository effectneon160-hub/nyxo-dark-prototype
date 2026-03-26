import React, { useState, memo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useNYXOStore } from '../store';
import { StatusPill } from '../components/shared/StatusPill';
import { KPICard } from '../components/shared/KPICard';
import { getAgentIcon } from './AgentsGrid';
import {
  ArrowLeft,
  Play,
  Pause,
  Settings,
  Terminal,
  Activity,
  Database,
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  XCircle } from
'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer } from
'recharts';
export function AgentDetail() {
  const { id } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const { agents, backboneAgents, currentUser, pauseAgent, resumeAgent } =
  useNYXOStore();
  const [activeTab, setActiveTab] = useState<
    'history' | 'logs' | 'performance' | 'config'>(
    'logs');
  // Find agent in either regular agents or backbone agents
  const agent =
  agents.find((a) => a.id === id) || backboneAgents.find((a) => a.id === id);
  if (!agent) {
    return (
      <div className="p-8 flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-bold text-danger mb-2">Agent Not Found</h2>
        <p className="text-text-secondary mb-4">
          The requested agent ID ({id}) does not exist.
        </p>
        <button
          onClick={() => navigate('/agents')}
          className="px-4 py-2 bg-surface border border-subtle rounded hover:bg-surface-hover transition-colors">
          
          Return to Directory
        </button>
      </div>);

  }
  const isBackbone = 'scope' in agent;
  const isError = agent.status === 'error';
  const isPaused = agent.status === 'paused';
  const isLocked = agent.status === 'locked';
  const canControl =
  currentUser.role === 'super_admin' ||
  currentUser.role === 'org_admin' ||
  currentUser.role === 'dept_manager' &&
  agent.department === currentUser.department;
  const handleTogglePause = () => {
    if (!canControl || isLocked) return;
    if (isPaused) {
      resumeAgent(agent.id);
    } else {
      pauseAgent(agent.id);
    }
  };
  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 pb-24">
      {/* Back Navigation */}
      <button
        onClick={() => navigate('/agents')}
        className="flex items-center text-sm text-text-secondary hover:text-text-primary transition-colors">
        
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Directory
      </button>

      {/* Error Banner */}
      {isError &&
      <div className="bg-danger-muted border border-danger/50 rounded-lg p-4 flex items-start space-x-4 animate-feed-entry">
          <AlertTriangle className="w-6 h-6 text-danger shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-danger font-bold mb-1">Agent Error Detected</h3>
            <p className="text-sm text-text-primary mb-3">{agent.lastError}</p>
            <div className="flex space-x-3">
              <button
              onClick={() => resumeAgent(agent.id)}
              className="px-3 py-1.5 bg-danger text-void font-bold text-xs rounded hover:bg-danger/80 transition-colors flex items-center">
              
                <RefreshCw className="w-3 h-3 mr-2" />
                Force Retry Now
              </button>
              <span className="text-xs text-text-secondary flex items-center">
                Attempt {agent.retryCount} of {agent.config.retryPolicy}
              </span>
            </div>
          </div>
        </div>
      }

      {/* Agent Header */}
      <div className="bg-surface border border-subtle rounded-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center space-x-6">
          <div
            className={`w-20 h-20 rounded-xl flex items-center justify-center shrink-0 ${isBackbone ? 'bg-violet-muted text-violet border border-violet/30' : 'bg-elevated text-cyan border border-subtle'}`}>
            
            {getAgentIcon(agent.avatar, 'w-10 h-10')}
          </div>
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-3xl font-display font-bold text-text-primary">
                {agent.name}
              </h1>
              <StatusPill status={agent.status} size="md" />
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <span className="px-2 py-0.5 bg-elevated border border-subtle rounded text-text-secondary uppercase tracking-wider font-bold text-xs">
                {isBackbone ? 'Global Backbone' : agent.department}
              </span>
              <span className="text-text-muted flex items-center">
                <BrainCircuit className="w-3 h-3 mr-1" />
                {agent.llmModel}
              </span>
              <span className="text-text-muted flex items-center">
                <Terminal className="w-3 h-3 mr-1" />
                {agent.type}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 w-full md:w-auto">
          {canControl && !isLocked &&
          <button
            onClick={handleTogglePause}
            className={`flex-1 md:flex-none px-4 py-2 rounded font-bold text-sm transition-colors flex items-center justify-center ${isPaused ? 'bg-success text-void hover:bg-success/90' : 'bg-warning text-void hover:bg-warning/90'}`}>
            
              {isPaused ?
            <>
                  <Play className="w-4 h-4 mr-2" /> Resume Agent
                </> :

            <>
                  <Pause className="w-4 h-4 mr-2" /> Pause Agent
                </>
            }
            </button>
          }
          <button
            onClick={() => setActiveTab('config')}
            disabled={!canControl}
            className="flex-1 md:flex-none px-4 py-2 bg-surface border border-subtle rounded text-text-primary hover:bg-surface-hover transition-colors flex items-center justify-center text-sm disabled:opacity-50 disabled:cursor-not-allowed">
            
            <Settings className="w-4 h-4 mr-2" /> Configure
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard
          title="Tasks All Time"
          value={agent.tasksAllTime.toLocaleString()}
          sublabel="Since deployment"
          accentColor={isBackbone ? 'violet' : 'cyan'} />
        
        <KPICard
          title="Success Rate"
          value={`${agent.successRate.toFixed(1)}%`}
          sublabel="Rolling 30-day average"
          trend={{
            value: 1.2,
            direction: 'up'
          }}
          accentColor="green" />
        
        <KPICard
          title="Avg Duration"
          value={`${agent.averageTaskDuration}m`}
          sublabel="Per task execution"
          accentColor="amber" />
        
        <KPICard
          title="Tasks Today"
          value={agent.tasksToday.toLocaleString()}
          sublabel="Since 12:00 AM"
          accentColor={isBackbone ? 'violet' : 'cyan'} />
        
        <KPICard
          title="Cost This Month"
          value={`$${agent.costThisMonth.toFixed(2)}`}
          sublabel="LLM Token usage"
          accentColor="gold" />
        
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Context & Personality (1 col) */}
        <div className="space-y-8">
          {/* Current Task Panel */}
          <div className="bg-surface border border-subtle rounded-lg p-6">
            <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-4">
              Current Status
            </h3>
            {agent.status === 'running' ?
            <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-cyan animate-agent-pulse"></div>
                  <span className="text-cyan font-bold">Executing Task</span>
                </div>
                <p className="text-text-primary font-medium">
                  {agent.currentTask}
                </p>
                <div className="w-full bg-elevated rounded-full h-1.5 overflow-hidden">
                  <div className="bg-cyan h-full rounded-full w-2/3 animate-pulse"></div>
                </div>
              </div> :
            agent.status === 'idle' ?
            <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full bg-elevated flex items-center justify-center mx-auto mb-3">
                  <Activity className="w-5 h-5 text-text-muted" />
                </div>
                <p className="text-text-primary font-medium">
                  Waiting for trigger
                </p>
                <p className="text-xs text-text-secondary mt-1">
                  Last task completed{' '}
                  {new Date(agent.lastCompletedAt || '').toLocaleTimeString()}
                </p>
              </div> :
            agent.status === 'paused' ?
            <div className="text-center py-6">
                <Pause className="w-8 h-8 text-warning mx-auto mb-3" />
                <p className="text-text-primary font-medium">Agent Paused</p>
                <p className="text-xs text-text-secondary mt-1">
                  Manual intervention required to resume
                </p>
              </div> :

            <div className="text-center py-6">
                <AlertTriangle className="w-8 h-8 text-danger mx-auto mb-3" />
                <p className="text-text-primary font-medium">System Error</p>
              </div>
            }

            <div className="mt-6 pt-4 border-t border-subtle">
              <div className="text-xs text-text-muted mb-1">
                Last Completed Task:
              </div>
              <div
                className="text-sm text-text-secondary truncate"
                title={agent.lastCompletedTask || ''}>
                
                {agent.lastCompletedTask || 'None'}
              </div>
            </div>
          </div>

          {/* Personality Card */}
          <div className="bg-surface border border-subtle rounded-lg p-6">
            <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-4">
              Behavioral Profile
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-text-muted mb-1">
                  Domain Specialty
                </div>
                <div className="text-sm text-text-primary font-medium">
                  {agent.personality.specialty}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <div className="text-xs text-text-muted mb-1">
                    Risk Tolerance
                  </div>
                  <div className="text-sm text-text-primary capitalize">
                    {agent.personality.riskTolerance}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-text-muted mb-1">
                    Decision Speed
                  </div>
                  <div className="text-sm text-text-primary capitalize">
                    {agent.personality.decisionSpeed}
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="text-xs text-text-muted mb-1">
                    Communication Style
                  </div>
                  <div className="text-sm text-text-primary capitalize">
                    {agent.personality.communicationStyle}
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-subtle">
                <div className="text-xs text-text-muted mb-2">
                  Available Tools (APIs)
                </div>
                <div className="flex flex-wrap gap-2">
                  {agent.tools.map((tool) =>
                  <span
                    key={tool}
                    className="px-2 py-1 bg-elevated border border-subtle rounded text-xs text-text-secondary font-mono">
                    
                      {tool}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Tabs (2 cols) */}
        <div className="lg:col-span-2 bg-surface border border-subtle rounded-lg flex flex-col h-[800px]">
          {/* Tab Navigation */}
          <div className="flex border-b border-subtle px-4 pt-4 space-x-6">
            {[
            {
              id: 'logs',
              label: 'Live Logs',
              icon: Terminal
            },
            {
              id: 'history',
              label: 'Task History',
              icon: Database
            },
            {
              id: 'performance',
              label: 'Performance',
              icon: Activity
            },
            {
              id: 'config',
              label: 'Configuration',
              icon: Settings
            }].
            map((tab) =>
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center pb-3 text-sm font-bold transition-colors border-b-2 ${activeTab === tab.id ? 'border-cyan text-cyan' : 'border-transparent text-text-secondary hover:text-text-primary'}`}>
              
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            )}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden relative">
            {/* LIVE LOGS TAB */}
            {activeTab === 'logs' &&
            <div className="absolute inset-0 bg-void p-4 font-mono text-xs overflow-y-auto space-y-2">
                <div className="text-text-muted mb-4">
                  // NYXO OS Agent Terminal
                  <br />
                  // Connecting to {agent.name} stream...
                  <br />
                  // Connection established.
                </div>
                {agent.status === 'running' ?
              <>
                    <div className="text-info">
                      [INFO] Parsing command intent...
                    </div>
                    <div className="text-info">
                      [INFO] Intent identified: Execute {agent.currentTask}
                    </div>
                    <div className="text-cyan">
                      [REASONING] Consulting memory vault for historical
                      context...
                    </div>
                    <div className="text-cyan">
                      [REASONING] Found 3 relevant past executions. Adjusting
                      parameters.
                    </div>
                    <div className="text-success">
                      [SUCCESS] Parameters validated against governance rules.
                    </div>
                    <div className="text-info">
                      [INFO] Initiating API calls to{' '}
                      {agent.tools[0] || 'internal service'}...
                    </div>
                    <div className="text-warning animate-pulse">
                      [WAITING] Awaiting response...
                    </div>
                  </> :
              agent.status === 'error' ?
              <>
                    <div className="text-danger">
                      [ERROR] Exception caught during execution.
                    </div>
                    <div className="text-danger">[TRACE] {agent.lastError}</div>
                    <div className="text-warning">
                      [SYSTEM] Agent halted. Awaiting manual intervention or
                      retry cooldown.
                    </div>
                  </> :

              <>
                    <div className="text-success">
                      [SUCCESS] Last task completed successfully.
                    </div>
                    <div className="text-info">
                      [INFO] Memory updated with execution results.
                    </div>
                    <div className="text-text-muted">
                      [SYSTEM] Agent entering idle state. Listening for
                      triggers...
                    </div>
                  </>
              }
              </div>
            }

            {/* PERFORMANCE TAB */}
            {activeTab === 'performance' &&
            <div className="absolute inset-0 p-6 overflow-y-auto">
                <h3 className="text-lg font-bold text-text-primary mb-6">
                  30-Day Task Volume
                </h3>
                <div className="h-64 mb-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={agent.performanceHistory}>
                      <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#1A3260"
                      vertical={false} />
                    
                      <XAxis
                      dataKey="date"
                      tickFormatter={(val) =>
                      new Date(val).getDate().toString()
                      }
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
                      labelFormatter={(val) =>
                      new Date(val).toLocaleDateString()
                      } />
                    
                      <Line
                      type="monotone"
                      dataKey="tasks"
                      stroke="#00D4FF"
                      strokeWidth={2}
                      dot={false} />
                    
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <h3 className="text-lg font-bold text-text-primary mb-6">
                  Success Rate Trend
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={agent.performanceHistory}>
                      <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#1A3260"
                      vertical={false} />
                    
                      <XAxis
                      dataKey="date"
                      tickFormatter={(val) =>
                      new Date(val).getDate().toString()
                      }
                      stroke="#4A6080"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false} />
                    
                      <YAxis
                      domain={[80, 100]}
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
                      labelFormatter={(val) =>
                      new Date(val).toLocaleDateString()
                      } />
                    
                      <Line
                      type="monotone"
                      dataKey="successRate"
                      stroke="#00E5A0"
                      strokeWidth={2}
                      dot={false} />
                    
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            }

            {/* CONFIGURATION TAB */}
            {activeTab === 'config' &&
            <div className="absolute inset-0 p-6 overflow-y-auto">
                <div className="space-y-6 max-w-2xl">
                  <div>
                    <label className="block text-sm font-bold text-text-secondary mb-2">
                      System Prompt
                    </label>
                    <textarea
                    className="w-full h-32 bg-void border border-subtle rounded-md p-3 text-sm text-text-primary font-mono focus:border-cyan outline-none resize-none"
                    defaultValue={agent.config.systemPrompt}
                    disabled={!canControl} />
                  
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-text-secondary mb-2">
                        LLM Model
                      </label>
                      <select
                      className="w-full bg-void border border-subtle rounded-md p-2.5 text-sm text-text-primary focus:border-cyan outline-none appearance-none"
                      defaultValue={agent.llmModel}
                      disabled={!canControl}>
                      
                        <option value="GPT-4o">GPT-4o</option>
                        <option value="GPT-4o-mini">GPT-4o-mini</option>
                        <option value="Claude 3.5 Sonnet">
                          Claude 3.5 Sonnet
                        </option>
                        <option value="Claude 3 Haiku">Claude 3 Haiku</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-text-secondary mb-2">
                        Autonomy Level (0-100)
                      </label>
                      <input
                      type="range"
                      min="0"
                      max="100"
                      defaultValue={agent.autonomyLevel}
                      disabled={!canControl}
                      className="w-full mt-2 accent-cyan" />
                    
                      <div className="flex justify-between text-xs text-text-muted mt-1">
                        <span>Requires Approval</span>
                        <span>Fully Autonomous</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6 pt-4 border-t border-subtle">
                    <div>
                      <label className="block text-xs font-bold text-text-secondary mb-2">
                        Max Spend / Task
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                          $
                        </span>
                        <input
                        type="number"
                        defaultValue={agent.config.maxSpendPerTask}
                        disabled={!canControl}
                        className="w-full bg-void border border-subtle rounded-md pl-7 pr-3 py-2 text-sm text-text-primary focus:border-cyan outline-none" />
                      
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-text-secondary mb-2">
                        Retry Policy
                      </label>
                      <input
                      type="number"
                      defaultValue={agent.config.retryPolicy}
                      disabled={!canControl}
                      className="w-full bg-void border border-subtle rounded-md px-3 py-2 text-sm text-text-primary focus:border-cyan outline-none" />
                    
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-text-secondary mb-2">
                        Cooldown (min)
                      </label>
                      <input
                      type="number"
                      defaultValue={agent.config.cooldownPeriod}
                      disabled={!canControl}
                      className="w-full bg-void border border-subtle rounded-md px-3 py-2 text-sm text-text-primary focus:border-cyan outline-none" />
                    
                    </div>
                  </div>

                  {canControl &&
                <div className="pt-6 flex justify-end space-x-3">
                      <button className="px-4 py-2 bg-surface border border-subtle rounded text-text-primary hover:bg-surface-hover transition-colors text-sm font-bold">
                        Revert Changes
                      </button>
                      <button className="px-4 py-2 bg-cyan hover:bg-cyan-hover text-void rounded transition-colors text-sm font-bold">
                        Save Configuration
                      </button>
                    </div>
                }
                </div>
              </div>
            }

            {/* HISTORY TAB (Placeholder) */}
            {activeTab === 'history' &&
            <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center">
                <Database className="w-12 h-12 text-text-muted mb-4" />
                <h3 className="text-lg font-bold text-text-primary mb-2">
                  Task History
                </h3>
                <p className="text-text-secondary max-w-md">
                  Detailed task execution history is stored in the Memory Vault.
                  This view will display a paginated table of all tasks
                  completed by this agent.
                </p>
              </div>
            }
          </div>
        </div>
      </div>
    </div>);

}