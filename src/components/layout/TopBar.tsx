import React from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell, ChevronDown } from 'lucide-react';
import { useNYXOStore } from '../../store';
import { UserRole, ScenarioMode } from '../../store/types';
export function TopBar() {
  const location = useLocation();
  const { company, currentUser, system, unreadCount, switchRole, setScenario } =
  useNYXOStore();
  const getPageTitle = () => {
    const path = location.pathname.split('/')[1];
    if (!path) return 'Command Center';
    return path.charAt(0).toUpperCase() + path.slice(1).replace('-', ' ');
  };
  const scenarioColors = {
    normal: 'text-success border-success/30 bg-success-muted',
    highgrowth: 'text-cyan border-cyan/30 bg-cyan-muted',
    crisis: 'text-danger border-danger/30 bg-danger-muted',
    startup: 'text-warning border-warning/30 bg-warning-muted'
  };
  return (
    <header className="h-16 bg-primary border-b border-subtle flex items-center justify-between px-6 shrink-0 z-10">
      <div className="flex items-center space-x-6">
        <h2 className="text-xl font-display font-bold text-text-primary">
          {getPageTitle()}
        </h2>

        <div className="hidden md:flex items-center bg-surface border border-subtle rounded-md px-3 py-1.5 w-64">
          <Search className="w-4 h-4 text-text-muted mr-2" />
          <input
            type="text"
            placeholder="Search commands (CMD+K)..."
            className="bg-transparent border-none outline-none text-sm text-text-primary w-full placeholder-text-muted"
            readOnly />
          
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Scenario Switcher */}
        <div className="relative group">
          <button
            className={`flex items-center space-x-2 px-3 py-1.5 rounded border text-xs font-bold uppercase tracking-wider transition-colors ${scenarioColors[company.currentScenario]}`}>
            
            <span>
              {company.currentScenario.replace('highgrowth', 'high growth')}
            </span>
            <ChevronDown className="w-3 h-3" />
          </button>
          <div className="absolute right-0 mt-1 w-48 bg-elevated border border-subtle rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 py-1">
            {(
            ['normal', 'highgrowth', 'crisis', 'startup'] as ScenarioMode[]).
            map((s) =>
            <button
              key={s}
              onClick={() => setScenario(s)}
              className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-surface hover:text-text-primary uppercase tracking-wider text-xs font-bold">
              
                {s.replace('highgrowth', 'high growth')}
              </button>
            )}
          </div>
        </div>

        {/* Role Switcher */}
        <div className="relative group">
          <button className="flex items-center space-x-2 px-3 py-1.5 rounded bg-surface border border-subtle text-xs font-bold text-text-secondary uppercase tracking-wider hover:bg-surface-hover transition-colors">
            <span>Demo Role</span>
            <ChevronDown className="w-3 h-3" />
          </button>
          <div className="absolute right-0 mt-1 w-48 bg-elevated border border-subtle rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 py-1">
            {(
            [
            'super_admin',
            'org_admin',
            'dept_manager',
            'analyst',
            'viewer'] as
            UserRole[]).
            map((r) =>
            <button
              key={r}
              onClick={() => switchRole(r)}
              className={`w-full text-left px-4 py-2 text-sm uppercase tracking-wider text-xs font-bold ${currentUser.role === r ? 'text-cyan bg-surface' : 'text-text-secondary hover:bg-surface hover:text-text-primary'}`}>
              
                {r.replace('_', ' ')}
              </button>
            )}
          </div>
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-text-secondary hover:text-text-primary transition-colors">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 &&
          <span className="absolute top-1 right-1 w-4 h-4 bg-danger rounded-full text-[10px] font-bold text-void flex items-center justify-center">
              {unreadCount}
            </span>
          }
        </button>

        <div className="w-px h-6 bg-subtle mx-2"></div>

        {/* System Health */}
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-surface border border-subtle text-xs font-medium text-gold uppercase tracking-wide">
          {company.tier} Tier
        </div>
      </div>
    </header>);

}