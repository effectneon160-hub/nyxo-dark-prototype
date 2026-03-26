import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Users,
  BrainCircuit,
  FlaskConical,
  Database,
  BarChart3,
  ShieldAlert,
  Terminal,
  Newspaper,
  Settings,
  Bell } from
'lucide-react';
import { useNYXOStore } from '../../store';
export function Sidebar() {
  const { company, currentUser, system } = useNYXOStore();
  const role = currentUser.role;
  const navGroups = [
  {
    label: 'Platform',
    items: [
    {
      name: 'Command Center',
      path: '/dashboard',
      icon: LayoutDashboard,
      show: true
    },
    {
      name: 'Departments',
      path: '/departments',
      icon: Building2,
      show: true
    },
    {
      name: 'Agents',
      path: '/agents',
      icon: Users,
      show: true
    },
    {
      name: 'Backbone',
      path: '/backbone',
      icon: BrainCircuit,
      show: role !== 'dept_manager'
    }]

  },
  {
    label: 'Intelligence',
    items: [
    {
      name: 'Simulation',
      path: '/simulation',
      icon: FlaskConical,
      show: role !== 'dept_manager'
    },
    {
      name: 'Memory Vault',
      path: '/memory',
      icon: Database,
      show: role !== 'dept_manager'
    },
    {
      name: 'Analytics',
      path: '/analytics',
      icon: BarChart3,
      show: true
    }]

  },
  {
    label: 'Control',
    items: [
    {
      name: 'Governance',
      path: '/governance',
      icon: ShieldAlert,
      show: role !== 'viewer'
    },
    {
      name: 'Console',
      path: '/console',
      icon: Terminal,
      show: true
    },
    {
      name: 'Briefing',
      path: '/briefing',
      icon: Newspaper,
      show: true
    }]

  },
  {
    label: 'System',
    items: [
    {
      name: 'Settings',
      path: '/settings',
      icon: Settings,
      show: true
    },
    {
      name: 'Notifications',
      path: '/notifications',
      icon: Bell,
      show: true
    }]

  }];

  return (
    <aside className="w-64 bg-secondary border-r border-subtle flex flex-col h-full shrink-0">
      <div className="p-6 border-b border-subtle">
        <h1 className="text-2xl font-brand font-bold text-cyan tracking-wider">
          NYXO
        </h1>
        <p className="text-xs text-text-muted mt-1 truncate">{company.name}</p>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {navGroups.map((group, idx) => {
          const visibleItems = group.items.filter((item) => item.show);
          if (visibleItems.length === 0) return null;
          return (
            <div key={idx}>
              <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2 px-3">
                {group.label}
              </div>
              <div className="space-y-1">
                {visibleItems.map((item) =>
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                      flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                      ${isActive ? 'bg-surface-hover text-cyan border-l-2 border-cyan' : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary border-l-2 border-transparent'}
                    `}>
                  
                    <item.icon className="w-4 h-4 mr-3 shrink-0" />
                    {item.name}
                  </NavLink>
                )}
              </div>
            </div>);

        })}
      </div>

      <div className="p-4 border-t border-subtle bg-surface">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-elevated border border-subtle flex items-center justify-center overflow-hidden shrink-0">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-full h-full object-cover" />
            
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-bold text-text-primary truncate">
              {currentUser.name}
            </div>
            <div className="text-[10px] text-cyan uppercase tracking-wider font-bold truncate">
              {currentUser.role.replace('_', ' ')}
            </div>
          </div>
        </div>
      </div>
    </aside>);

}