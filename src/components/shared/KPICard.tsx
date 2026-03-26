import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
interface KPICardProps {
  title: string;
  value: string | number;
  sublabel: string;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
  accentColor?: 'cyan' | 'violet' | 'amber' | 'green' | 'gold';
  onClick?: () => void;
  delay?: number;
}
export function KPICard({
  title,
  value,
  sublabel,
  trend,
  accentColor = 'cyan',
  onClick,
  delay = 0
}: KPICardProps) {
  const accentMap = {
    cyan: 'bg-cyan',
    violet: 'bg-violet',
    amber: 'bg-warning',
    green: 'bg-success',
    gold: 'bg-gold'
  };
  return (
    <div
      className={`relative bg-surface border border-subtle rounded-lg p-6 hover:bg-surface-hover transition-colors cursor-pointer overflow-hidden animate-feed-entry`}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: 'backwards'
      }}
      onClick={onClick}>
      
      <div
        className={`absolute top-0 left-0 w-full h-1 ${accentMap[accentColor]}`} />
      

      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-text-secondary">{title}</h3>
        {trend &&
        <div
          className={`flex items-center text-xs font-medium ${trend.direction === 'up' ? 'text-success' : trend.direction === 'down' ? 'text-danger' : 'text-text-muted'}`}>
          
            {trend.direction === 'up' &&
          <ArrowUpRight className="w-3 h-3 mr-1" />
          }
            {trend.direction === 'down' &&
          <ArrowDownRight className="w-3 h-3 mr-1" />
          }
            {trend.direction === 'neutral' &&
          <Minus className="w-3 h-3 mr-1" />
          }
            {Math.abs(trend.value)}%
          </div>
        }
      </div>

      <div className="text-3xl font-display font-bold text-text-primary mb-1">
        {value}
      </div>

      <div className="text-xs text-text-muted">{sublabel}</div>
    </div>);

}