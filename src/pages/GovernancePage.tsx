import React, { useState } from 'react';
import { useNYXOStore } from '../store';
import { ERBStatus } from '../store/types';
import { KPICard } from '../components/shared/KPICard';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Lock,
  Activity,
  FileText,
  CheckCircle2 } from
'lucide-react';
export function GovernancePage() {
  const { governance, setERBStatus, currentUser } = useNYXOStore();
  const [showConfirm, setShowConfirm] = useState<ERBStatus | null>(null);
  const canTriggerERB =
  currentUser.role === 'super_admin' || currentUser.role === 'org_admin';
  const handleERBClick = (status: ERBStatus) => {
    if (!canTriggerERB) return;
    if (status === 'inactive') {
      setERBStatus('inactive');
    } else {
      setShowConfirm(status);
    }
  };
  const confirmERB = () => {
    if (showConfirm) {
      setERBStatus(showConfirm);
      setShowConfirm(null);
    }
  };
  const erbButtons = [
  {
    id: 'halt_sales',
    label: 'HALT SALES',
    desc: 'Pauses all outbound outreach and deal closing',
    color: 'bg-warning hover:bg-warning/80 text-void'
  },
  {
    id: 'halt_spend',
    label: 'HALT SPEND',
    desc: 'Freezes all ad spend and vendor payments',
    color: 'bg-warning hover:bg-warning/80 text-void'
  },
  {
    id: 'halt_tech',
    label: 'HALT TECH',
    desc: 'Stops all deployments and code changes',
    color: 'bg-warning hover:bg-warning/80 text-void'
  },
  {
    id: 'bunker',
    label: 'BUNKER MODE',
    desc: 'Total system freeze. All agents locked.',
    color:
    'bg-danger hover:bg-danger/80 text-void border-2 border-danger shadow-[0_0_15px_rgba(255,59,59,0.5)]'
  }];

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 pb-24">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
            Governance & Compliance
          </h1>
          <p className="text-text-secondary text-sm">
            Monitor system compliance, audit logs, and control emergency
            protocols.
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-surface border border-subtle px-4 py-2 rounded-lg">
          <ShieldCheck className="w-5 h-5 text-success" />
          <span className="text-sm font-bold text-text-primary">
            System Secure
          </span>
        </div>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface border border-subtle rounded-lg p-6 flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-text-secondary mb-1">
              Compliance Score
            </div>
            <div
              className={`text-4xl font-display font-bold ${governance.complianceScore >= 90 ? 'text-success' : 'text-warning'}`}>
              
              {governance.complianceScore}
              <span className="text-xl text-text-muted">/100</span>
            </div>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-success flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 text-success" />
          </div>
        </div>
        <KPICard
          title="Active Rules"
          value={governance.activeRules}
          sublabel="Enforced across all agents"
          accentColor="cyan" />
        
        <KPICard
          title="Violations Blocked"
          value={governance.violationsThisMonth}
          sublabel="This month"
          accentColor="amber" />
        
        <KPICard
          title="Audit Events"
          value={governance.auditEventsToday.toLocaleString()}
          sublabel="Logged today"
          accentColor="violet" />
        
      </div>

      {/* THE EMERGENCY RED BUTTON PANEL */}
      <div className="bg-surface border border-danger/30 rounded-xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-danger"></div>
        <div className="p-6 border-b border-subtle flex justify-between items-center bg-danger-muted/10">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-danger" />
            <h2 className="text-xl font-display font-bold text-text-primary">
              Emergency Protocols (ERB)
            </h2>
          </div>
          {governance.erbStatus !== 'inactive' &&
          <div className="flex items-center space-x-3">
              <span className="text-danger font-bold animate-pulse">
                PROTOCOL ACTIVE
              </span>
              <button
              onClick={() => handleERBClick('inactive')}
              className="px-4 py-2 bg-success hover:bg-success/90 text-void font-bold rounded text-sm transition-colors">
              
                ALL CLEAR (Unfreeze)
              </button>
            </div>
          }
        </div>

        <div className="p-8">
          <p className="text-text-secondary mb-8 max-w-3xl">
            Activating an emergency protocol will immediately halt the specified
            operations. Agents will be locked, pending tasks queued, and all
            relevant API keys temporarily revoked. Use only in critical
            situations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {erbButtons.map((btn) =>
            <button
              key={btn.id}
              onClick={() => handleERBClick(btn.id as ERBStatus)}
              disabled={!canTriggerERB || governance.erbStatus !== 'inactive'}
              className={`flex flex-col items-center justify-center p-6 rounded-lg transition-all ${!canTriggerERB || governance.erbStatus !== 'inactive' ? 'bg-elevated text-text-muted cursor-not-allowed border border-subtle' : btn.color}`}>
              
                <Lock className="w-8 h-8 mb-4" />
                <span className="font-display font-bold text-lg mb-2 tracking-wider">
                  {btn.label}
                </span>
                <span className="text-xs text-center opacity-80">
                  {btn.desc}
                </span>
              </button>
            )}
          </div>

          {!canTriggerERB &&
          <div className="mt-6 text-center text-sm text-warning">
              You do not have permission to trigger emergency protocols.
              (Requires Admin role)
            </div>
          }
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm &&
      <div className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm bg-void/80">
          <div className="bg-surface border border-danger rounded-xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-danger-muted text-danger mx-auto mb-6">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-display font-bold text-text-primary text-center mb-2">
              Confirm Activation
            </h3>
            <p className="text-text-secondary text-center mb-8">
              Are you sure you want to activate{' '}
              <strong className="text-danger uppercase">
                {showConfirm.replace('_', ' ')}
              </strong>
              ? This will immediately disrupt business operations.
            </p>
            <div className="flex space-x-4">
              <button
              onClick={() => setShowConfirm(null)}
              className="flex-1 px-4 py-3 bg-elevated hover:bg-surface-hover border border-subtle rounded text-text-primary font-bold transition-colors">
              
                Cancel
              </button>
              <button
              onClick={confirmERB}
              className="flex-1 px-4 py-3 bg-danger hover:bg-danger/90 text-void rounded font-bold transition-colors">
              
                ACTIVATE NOW
              </button>
            </div>
          </div>
        </div>
      }

      {/* Audit Log Placeholder */}
      <div className="bg-surface border border-subtle rounded-lg">
        <div className="p-4 border-b border-subtle">
          <h3 className="text-lg font-bold text-text-primary">
            Recent Audit Events
          </h3>
        </div>
        <div className="p-6 text-center text-text-muted">
          <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>
            Audit log table goes here. Shows all policy checks and system
            events.
          </p>
        </div>
      </div>
    </div>);

}