import React, { useState } from 'react';
import { useNYXOStore } from '../store';
import { Settings, Users, Link as LinkIcon, AlertTriangle } from 'lucide-react';
export function SettingsPage() {
  const { company, currentUser, resetToDefault } = useNYXOStore();
  const [activeTab, setActiveTab] = useState<
    'general' | 'team' | 'integrations' | 'developer'>(
    'general');
  const mockTeam = [
  {
    name: 'Salauddin',
    role: 'Founder & CEO',
    nyxoRole: 'Super Admin'
  },
  {
    name: 'Priya Nair',
    role: 'VP Sales',
    nyxoRole: 'Dept Manager'
  },
  {
    name: 'Jason Koh',
    role: 'Marketing Lead',
    nyxoRole: 'Dept Manager'
  },
  {
    name: 'Rachel Obi',
    role: 'CFO',
    nyxoRole: 'Org Admin'
  },
  {
    name: 'Tom Brennan',
    role: 'Head of Ops',
    nyxoRole: 'Dept Manager'
  }];

  const mockIntegrations = [
  {
    name: 'Salesforce',
    status: 'connected',
    time: '42ms'
  },
  {
    name: 'HubSpot',
    status: 'connected',
    time: '18ms'
  },
  {
    name: 'Stripe',
    status: 'connected',
    time: '12ms'
  },
  {
    name: 'AWS',
    status: 'connected',
    time: '8ms'
  },
  {
    name: 'LinkedIn API',
    status: 'degraded',
    time: '340ms'
  },
  {
    name: 'Shopify Webhook',
    status: 'degraded',
    time: 'Timeout'
  },
  {
    name: 'Zendesk',
    status: 'connected',
    time: '45ms'
  },
  {
    name: 'Slack',
    status: 'connected',
    time: '22ms'
  }];

  return (
    <div className="p-8 max-w-[1200px] mx-auto space-y-8 pb-24">
      <div>
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2 flex items-center">
          <Settings className="w-8 h-8 mr-3 text-text-muted" />
          Settings
        </h1>
        <p className="text-text-secondary text-sm">
          Manage your organization, team access, and system configurations.
        </p>
      </div>

      <div className="flex space-x-1 border-b border-subtle">
        {[
        {
          id: 'general',
          label: 'General',
          icon: Settings
        },
        {
          id: 'team',
          label: 'Team & RBAC',
          icon: Users
        },
        {
          id: 'integrations',
          label: 'Integrations',
          icon: LinkIcon
        },
        {
          id: 'developer',
          label: 'Developer',
          icon: AlertTriangle
        }].
        map((tab) =>
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id as any)}
          className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id ? 'border-cyan text-cyan' : 'border-transparent text-text-muted hover:text-text-primary'}`}>
          
            <tab.icon className="w-4 h-4 mr-2" />
            {tab.label}
          </button>
        )}
      </div>

      <div className="mt-6">
        {activeTab === 'general' &&
        <div className="space-y-6 max-w-2xl">
            <div className="bg-surface border border-subtle rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-bold text-text-primary mb-4">
                Company Profile
              </h3>
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1">
                  Company Name
                </label>
                <input
                type="text"
                value={company.name}
                readOnly
                className="w-full bg-elevated border border-subtle rounded p-2 text-text-primary focus:outline-none" />
              
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1">
                    Industry
                  </label>
                  <input
                  type="text"
                  value={company.industry}
                  readOnly
                  className="w-full bg-elevated border border-subtle rounded p-2 text-text-primary focus:outline-none" />
                
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1">
                    Team Size
                  </label>
                  <input
                  type="text"
                  value={company.teamSize}
                  readOnly
                  className="w-full bg-elevated border border-subtle rounded p-2 text-text-primary focus:outline-none" />
                
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1">
                  Timezone
                </label>
                <input
                type="text"
                value={company.timezone}
                readOnly
                className="w-full bg-elevated border border-subtle rounded p-2 text-text-primary focus:outline-none" />
              
              </div>
            </div>
          </div>
        }

        {activeTab === 'team' &&
        <div className="bg-surface border border-subtle rounded-lg overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-elevated border-b border-subtle">
                <tr>
                  <th className="px-6 py-3 font-medium text-text-muted">
                    Name
                  </th>
                  <th className="px-6 py-3 font-medium text-text-muted">
                    Role
                  </th>
                  <th className="px-6 py-3 font-medium text-text-muted">
                    NYXO Access
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-subtle">
                {mockTeam.map((member, i) =>
              <tr key={i} className="hover:bg-surface-hover">
                    <td className="px-6 py-4 text-text-primary font-medium">
                      {member.name}
                    </td>
                    <td className="px-6 py-4 text-text-secondary">
                      {member.role}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded bg-elevated border border-subtle text-xs font-bold text-cyan uppercase tracking-wider">
                        {member.nyxoRole}
                      </span>
                    </td>
                  </tr>
              )}
              </tbody>
            </table>
          </div>
        }

        {activeTab === 'integrations' &&
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockIntegrations.map((int, i) =>
          <div
            key={i}
            className="bg-surface border border-subtle rounded-lg p-4 flex items-center justify-between">
            
                <div className="flex items-center space-x-3">
                  <div
                className={`w-2 h-2 rounded-full ${int.status === 'connected' ? 'bg-success' : 'bg-warning'}`} />
              
                  <span className="font-medium text-text-primary">
                    {int.name}
                  </span>
                </div>
                <span className="text-xs font-mono text-text-muted">
                  {int.time}
                </span>
              </div>
          )}
          </div>
        }

        {activeTab === 'developer' &&
        <div className="space-y-6 max-w-2xl">
            <div className="bg-danger-muted border border-danger/30 rounded-lg p-6">
              <h3 className="text-lg font-bold text-danger mb-2 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" /> Danger Zone
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                Resetting to default will wipe all local storage state and
                restore the initial dummy data. This action cannot be undone.
              </p>
              <button
              onClick={() => {
                if (
                window.confirm(
                  'Are you sure you want to reset all state to default?'
                ))
                {
                  resetToDefault();
                  window.location.reload();
                }
              }}
              className="bg-danger hover:bg-red-600 text-void font-bold py-2 px-4 rounded transition-colors">
              
                Reset to Default State
              </button>
            </div>
          </div>
        }
      </div>
    </div>);

}