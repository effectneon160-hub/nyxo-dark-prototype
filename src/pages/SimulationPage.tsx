import React, { useState } from 'react';
import { useNYXOStore } from '../store';
import { KPICard } from '../components/shared/KPICard';
import {
  FlaskConical,
  Play,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  BarChart3,
  Shield } from
'lucide-react';
export function SimulationPage() {
  const { simulations, currentUser } = useNYXOStore();
  const [isSimulating, setIsSimulating] = useState(false);
  const [simProgress, setSimProgress] = useState(0);
  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimProgress(0);
    // Fake simulation progress
    const interval = setInterval(() => {
      setSimProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsSimulating(false), 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 300);
  };
  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-success';
    if (score >= 0.6) return 'text-warning';
    return 'text-danger';
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'AUTO-APPROVED':
        return (
          <span className="px-2 py-1 bg-success-muted text-success border border-success/30 rounded text-xs font-bold flex items-center">
            <CheckCircle2 className="w-3 h-3 mr-1" /> APPROVED
          </span>);

      case 'ESCALATED':
        return (
          <span className="px-2 py-1 bg-warning-muted text-warning border border-warning/30 rounded text-xs font-bold flex items-center">
            <AlertTriangle className="w-3 h-3 mr-1" /> REVIEW REQ
          </span>);

      case 'BLOCKED':
        return (
          <span className="px-2 py-1 bg-danger-muted text-danger border border-danger/30 rounded text-xs font-bold flex items-center">
            <XCircle className="w-3 h-3 mr-1" /> BLOCKED
          </span>);

      default:
        return null;
    }
  };
  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary mb-2 flex items-center">
            <FlaskConical className="w-8 h-8 mr-3 text-cyan" />
            Simulation Engine
          </h1>
          <p className="text-text-secondary text-sm max-w-2xl">
            NYXO runs Monte Carlo simulations (10,000+ iterations) before
            executing any strategic action to calculate the Probability of
            Success (P_s).
          </p>
        </div>
        <button
          onClick={handleRunSimulation}
          disabled={isSimulating || currentUser.role === 'viewer'}
          className="px-6 py-3 bg-cyan hover:bg-cyan-hover text-void font-bold rounded flex items-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          
          <Play className="w-4 h-4 mr-2" />
          Run Custom Simulation
        </button>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Simulations Run"
          value={simulations.monthlyCount.toLocaleString()}
          sublabel={`Limit: ${simulations.monthlyLimit.toLocaleString()}`}
          accentColor="cyan" />
        
        <KPICard
          title="Avg Success Rate"
          value={`${simulations.successRate}%`}
          sublabel="Across all approved actions"
          accentColor="green" />
        
        <KPICard
          title="Auto-Approved"
          value="83.6%"
          sublabel="P_s ≥ 0.80"
          accentColor="green" />
        
        <KPICard
          title="Auto-Blocked"
          value="4.6%"
          sublabel="P_s < 0.60"
          accentColor="amber" />
        
      </div>

      {/* Active Simulation Overlay */}
      {isSimulating &&
      <div className="bg-surface border border-cyan rounded-lg p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-elevated">
            <div
            className="h-full bg-cyan transition-all duration-300"
            style={{
              width: `${simProgress}%`
            }}>
          </div>
          </div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-text-primary flex items-center">
              <FlaskConical className="w-5 h-5 mr-2 text-cyan animate-pulse" />
              Running Monte Carlo Simulation...
            </h3>
            <span className="text-cyan font-mono font-bold">
              {simProgress}%
            </span>
          </div>
          <div className="font-mono text-xs text-text-secondary space-y-2">
            <div>&gt; Initializing digital twin environment...</div>
            {simProgress > 20 &&
          <div>
                &gt; Loading historical market data from Memory Vault...
              </div>
          }
            {simProgress > 40 &&
          <div>&gt; Executing 10,000 probabilistic iterations...</div>
          }
            {simProgress > 60 &&
          <div>&gt; Calculating financial risk exposure...</div>
          }
            {simProgress > 80 && <div>&gt; Aggregating P_s score...</div>}
          </div>
        </div>
      }

      {/* Simulation History */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-text-primary">
          Recent Simulations
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {simulations.history.map((sim, idx) =>
          <div
            key={sim.id}
            className="bg-surface border border-subtle rounded-lg p-6 hover:border-medium transition-colors animate-feed-entry"
            style={{
              animationDelay: `${idx * 100}ms`
            }}>
            
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
                      {sim.id}
                    </span>
                    <span className="text-xs font-bold text-text-secondary px-2 py-0.5 bg-elevated rounded uppercase">
                      {sim.department}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-text-primary">
                    {sim.scenarioName}
                  </h3>
                </div>
                {getStatusBadge(sim.status)}
              </div>

              <div className="flex items-center justify-between p-4 bg-void border border-subtle rounded-lg mb-6">
                <div>
                  <div className="text-xs text-text-muted mb-1 uppercase tracking-wider font-bold">
                    P_s Score
                  </div>
                  <div
                  className={`text-4xl font-display font-bold ${getScoreColor(sim.psScore)}`}>
                  
                    {sim.psScore.toFixed(2)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-text-muted mb-1 uppercase tracking-wider font-bold">
                    Expected Value
                  </div>
                  <div
                  className={`text-xl font-bold ${sim.expectedValue >= 0 ? 'text-success' : 'text-danger'}`}>
                  
                    {sim.expectedValue >= 0 ? '+' : ''}$
                    {Math.abs(sim.expectedValue).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 mb-6">
                {[
              {
                label: 'Financial',
                val: sim.financialRisk
              },
              {
                label: 'Brand',
                val: sim.reputationalRisk
              },
              {
                label: 'Legal',
                val: sim.legalRisk
              },
              {
                label: 'Ops',
                val: sim.operationalRisk
              }].
              map((risk) =>
              <div key={risk.label} className="text-center">
                    <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                      {risk.label}
                    </div>
                    <div
                  className={`text-sm font-bold ${risk.val > 7 ? 'text-danger' : risk.val > 4 ? 'text-warning' : 'text-success'}`}>
                  
                      {risk.val}/10
                    </div>
                  </div>
              )}
              </div>

              <button className="w-full py-2 bg-elevated hover:bg-surface-hover border border-subtle rounded text-sm text-text-primary font-bold transition-colors flex items-center justify-center">
                View Full Report <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          )}

          {simulations.history.length === 0 &&
          <div className="col-span-2 bg-surface border border-subtle rounded-lg p-12 text-center">
              <BarChart3 className="w-12 h-12 text-text-muted mx-auto mb-4" />
              <h3 className="text-lg font-bold text-text-primary mb-2">
                No simulations run yet
              </h3>
              <p className="text-text-secondary">
                Simulations will appear here as agents evaluate strategic
                decisions.
              </p>
            </div>
          }
        </div>
      </div>
    </div>);

}