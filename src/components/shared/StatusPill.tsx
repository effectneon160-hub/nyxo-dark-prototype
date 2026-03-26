import React from 'react';
import { AgentStatus } from '../../store/types';
interface StatusPillProps {
  status: AgentStatus | 'healthy' | 'warning' | 'critical';
  size?: 'sm' | 'md';
}
export function StatusPill({ status, size = 'md' }: StatusPillProps) {
  const isSmall = size === 'sm';
  const config = {
    active: {
      bg: 'bg-cyan-muted',
      text: 'text-cyan',
      dot: 'bg-cyan',
      label: 'Active',
      pulse: false
    },
    running: {
      bg: 'bg-cyan-muted',
      text: 'text-cyan',
      dot: 'bg-cyan',
      label: 'Running',
      pulse: true
    },
    idle: {
      bg: 'bg-surface-hover',
      text: 'text-text-secondary',
      dot: 'bg-text-muted',
      label: 'Idle',
      pulse: false
    },
    paused: {
      bg: 'bg-warning-muted',
      text: 'text-warning',
      dot: 'bg-warning',
      label: 'Paused',
      pulse: false
    },
    error: {
      bg: 'bg-danger-muted',
      text: 'text-danger',
      dot: 'bg-danger',
      label: 'Error',
      pulse: false
    },
    cooldown: {
      bg: 'bg-info-muted',
      text: 'text-info',
      dot: 'bg-info',
      label: 'Cooldown',
      pulse: false
    },
    locked: {
      bg: 'bg-erb/20',
      text: 'text-erb',
      dot: 'bg-erb',
      label: 'Locked',
      pulse: false
    },
    healthy: {
      bg: 'bg-success-muted',
      text: 'text-success',
      dot: 'bg-success',
      label: 'Healthy',
      pulse: false
    },
    warning: {
      bg: 'bg-warning-muted',
      text: 'text-warning',
      dot: 'bg-warning',
      label: 'Warning',
      pulse: false
    },
    critical: {
      bg: 'bg-danger-muted',
      text: 'text-danger',
      dot: 'bg-danger',
      label: 'Critical',
      pulse: false
    }
  };
  const current = config[status] || config.idle;
  return (
    <div
      className={`inline-flex items-center rounded-pill ${current.bg} ${isSmall ? 'px-2 py-0.5' : 'px-3 py-1'}`}>
      
      <div
        className={`rounded-full ${current.dot} ${isSmall ? 'w-1.5 h-1.5 mr-1.5' : 'w-2 h-2 mr-2'} ${current.pulse ? 'animate-agent-pulse' : ''}`} />
      
      <span
        className={`font-medium ${current.text} ${isSmall ? 'text-[10px]' : 'text-xs'} uppercase tracking-wider`}>
        
        {current.label}
      </span>
    </div>);

}