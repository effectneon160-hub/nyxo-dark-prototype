import React from 'react';
import { CheckCircle2, AlertCircle, XCircle, Info } from 'lucide-react';
import { ActivityEntry } from '../../store/types';
interface ActivityFeedItemProps {
  entry: ActivityEntry;
}
export function ActivityFeedItem({ entry }: ActivityFeedItemProps) {
  const time = new Date(entry.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
  const deptColors = {
    sales: 'text-success border-success/30 bg-success-muted',
    marketing: 'text-violet border-violet/30 bg-violet-muted',
    finance: 'text-gold border-gold/30 bg-gold/10',
    operations: 'text-info border-info/30 bg-info-muted',
    it: 'text-cyan border-cyan/30 bg-cyan-muted',
    system: 'text-text-primary border-subtle bg-elevated'
  };
  const statusIcons = {
    success: <CheckCircle2 className="w-4 h-4 text-success shrink-0" />,
    warning: <AlertCircle className="w-4 h-4 text-warning shrink-0" />,
    error: <XCircle className="w-4 h-4 text-danger shrink-0" />,
    info: <Info className="w-4 h-4 text-info shrink-0" />
  };
  return (
    <div className="flex items-start space-x-3 py-3 border-b border-subtle/50 animate-feed-entry hover:bg-surface-hover/50 px-2 -mx-2 rounded transition-colors">
      <div className="text-xs text-text-muted font-mono shrink-0 mt-0.5 w-12">
        {time}
      </div>

      <div
        className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider shrink-0 mt-0.5 ${deptColors[entry.department]}`}>
        
        {entry.department.substring(0, 3)}
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-sm font-mono text-text-secondary leading-tight">
          <span className="text-text-primary font-medium">
            {entry.agentName}
          </span>
          <span className="text-text-muted mx-2">→</span>
          {entry.action}
        </div>
      </div>

      <div className="shrink-0 mt-0.5">{statusIcons[entry.status]}</div>
    </div>);

}