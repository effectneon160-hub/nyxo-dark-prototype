import React, { useState } from 'react';
import {
  Check,
  X,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  ShieldCheck,
  Shield } from
'lucide-react';
import { ApprovalRequest, UserRole } from '../../store/types';
import { useNYXOStore } from '../../store';
interface ApprovalCardProps {
  request: ApprovalRequest;
  role: UserRole;
}
export function ApprovalCard({ request, role }: ApprovalCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { approveRequest, rejectRequest } = useNYXOStore();
  const urgencyColors = {
    LOW: 'bg-surface-hover text-text-secondary border-subtle',
    STANDARD: 'bg-warning-muted text-warning border-warning/30',
    URGENT: 'bg-danger-muted text-danger border-danger/30'
  };
  const riskIcons = {
    LOW: <ShieldCheck className="w-4 h-4 text-success" />,
    MEDIUM: <Shield className="w-4 h-4 text-warning" />,
    HIGH: <ShieldAlert className="w-4 h-4 text-danger" />,
    CRITICAL: <ShieldAlert className="w-4 h-4 text-erb" />
  };
  const handleApprove = () => approveRequest(request.id);
  const handleReject = () => rejectRequest(request.id);
  return (
    <div className="bg-surface border border-subtle rounded-lg overflow-hidden flex flex-col animate-feed-entry">
      <div className="p-4 border-b border-subtle flex justify-between items-start">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded bg-elevated border border-subtle flex items-center justify-center text-cyan font-brand font-bold">
            {request.agentName.charAt(0)}
          </div>
          <div>
            <div className="text-sm font-medium text-text-primary">
              {request.agentName}
            </div>
            <div className="text-xs text-text-muted uppercase tracking-wider">
              {request.department}
            </div>
          </div>
        </div>
        <div
          className={`text-[10px] font-bold px-2 py-1 rounded border uppercase tracking-wider ${urgencyColors[request.urgency]}`}>
          
          {request.urgency}
        </div>
      </div>

      <div className="p-4 flex-1">
        <h4 className="text-base font-bold text-text-primary mb-2">
          {request.title}
        </h4>
        <p className="text-sm text-text-secondary mb-4 leading-relaxed">
          {request.description}
        </p>

        <div className="flex items-center space-x-2 text-xs font-medium bg-elevated px-3 py-2 rounded border border-subtle mb-4 w-fit">
          {riskIcons[request.risk]}
          <span className="text-text-primary">Risk Level: {request.risk}</span>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center text-xs text-cyan hover:text-cyan-hover transition-colors font-medium">
          
          {expanded ?
          <ChevronUp className="w-4 h-4 mr-1" /> :

          <ChevronDown className="w-4 h-4 mr-1" />
          }
          See NYXO's Reasoning
        </button>

        {expanded &&
        <div className="mt-4 p-4 bg-void border border-subtle rounded font-mono text-xs text-text-secondary space-y-4">
            {request.reasoningChain.map((step, idx) =>
          <div key={idx}>
                <div className="text-cyan mb-1">
                  {idx + 1}. {step.title}:
                </div>
                <ul className="space-y-1 pl-4">
                  {step.details.map((detail, dIdx) =>
              <li key={dIdx} className="flex items-start">
                      <span className="text-text-muted mr-2">•</span>
                      {detail}
                    </li>
              )}
                </ul>
              </div>
          )}
          </div>
        }
      </div>

      <div className="p-4 bg-elevated border-t border-subtle flex gap-2">
        {role === 'super_admin' ||
        role === 'org_admin' ||
        role === 'dept_manager' && request.department === 'sales' ?
        <>
            <button
            onClick={handleApprove}
            className="flex-1 bg-cyan hover:bg-cyan-hover text-void font-bold py-2 px-4 rounded transition-colors flex items-center justify-center text-sm">
            
              <Check className="w-4 h-4 mr-2" /> Approve
            </button>
            <button
            onClick={handleReject}
            className="flex-1 bg-surface hover:bg-surface-hover border border-subtle text-text-primary font-medium py-2 px-4 rounded transition-colors flex items-center justify-center text-sm">
            
              <X className="w-4 h-4 mr-2" /> Reject
            </button>
          </> :
        role === 'dept_manager' ?
        <button className="w-full bg-surface hover:bg-surface-hover border border-subtle text-text-primary font-medium py-2 px-4 rounded transition-colors flex items-center justify-center text-sm">
            <ArrowRight className="w-4 h-4 mr-2" /> Escalate to Admin
          </button> :
        role === 'analyst' ?
        <button className="w-full bg-surface hover:bg-surface-hover border border-subtle text-text-primary font-medium py-2 px-4 rounded transition-colors flex items-center justify-center text-sm">
            <ShieldAlert className="w-4 h-4 mr-2" /> Flag for Review
          </button> :

        <div className="w-full text-center text-xs text-text-muted py-2">
            View Only Mode
          </div>
        }
      </div>
    </div>);

}