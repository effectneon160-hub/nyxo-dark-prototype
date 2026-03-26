import React from 'react';
import { useNYXOStore } from '../store';
import { Newspaper, Calendar } from 'lucide-react';
export function BriefingPage() {
  const { simulatedTime, financials, system, approvals, agents } =
  useNYXOStore();
  const errorAgents = agents.filter((a) => a.status === 'error');
  const warningAgents = agents.filter((a) => a.status === 'warning');
  const formatCurrency = (val: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(val);
  return (
    <div className="p-8 max-w-[800px] mx-auto space-y-8 pb-24">
      <div>
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2 flex items-center">
          <Newspaper className="w-8 h-8 mr-3 text-text-muted" />
          Morning Briefing
        </h1>
        <div className="flex items-center text-text-secondary text-sm">
          <Calendar className="w-4 h-4 mr-2" />
          {new Date(simulatedTime.currentDate).toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>

      <div className="bg-surface border border-subtle rounded-lg p-8 space-y-8 font-body">
        <section>
          <h2 className="text-lg font-bold text-cyan mb-3 uppercase tracking-wider text-sm border-b border-subtle pb-2">
            Executive Summary
          </h2>
          <p className="text-text-primary leading-relaxed">
            All primary systems are operational. NYXO processed 1,240 tasks
            overnight. Revenue projections remain on track for the month. There
            are {approvals.length} items requiring your review today, including
            a strategic pricing decision for Nexus Corp.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-cyan mb-3 uppercase tracking-wider text-sm border-b border-subtle pb-2">
            Financial Overview
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-text-muted mb-1">
                Current Pipeline
              </div>
              <div className="text-xl font-mono text-text-primary">
                {formatCurrency(financials.pipeline)}
              </div>
            </div>
            <div>
              <div className="text-xs text-text-muted mb-1">Cash Runway</div>
              <div className="text-xl font-mono text-text-primary">
                {financials.cashRunway} months
              </div>
            </div>
            <div>
              <div className="text-xs text-text-muted mb-1">
                Outstanding Invoices
              </div>
              <div className="text-xl font-mono text-text-primary">
                {formatCurrency(financials.outstandingInvoices)}
              </div>
            </div>
            <div>
              <div className="text-xs text-text-muted mb-1">LLM Cost (MTD)</div>
              <div className="text-xl font-mono text-text-primary">
                {formatCurrency(financials.llmCost)}
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-cyan mb-3 uppercase tracking-wider text-sm border-b border-subtle pb-2">
            System Health & Risks
          </h2>
          <ul className="space-y-2 text-text-primary">
            <li className="flex items-start">
              <span className="text-success mr-2">•</span>
              Overall system uptime is {system.uptime}%.
            </li>
            {errorAgents.map((a) =>
            <li key={a.id} className="flex items-start">
                <span className="text-danger mr-2">•</span>
                {a.name} is currently in an error state: {a.lastError}
              </li>
            )}
            {warningAgents.map((a) =>
            <li key={a.id} className="flex items-start">
                <span className="text-warning mr-2">•</span>
                {a.name} is reporting warnings: {a.lastError}
              </li>
            )}
            {errorAgents.length === 0 && warningAgents.length === 0 &&
            <li className="flex items-start">
                <span className="text-success mr-2">•</span>
                No agent errors or warnings reported.
              </li>
            }
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-cyan mb-3 uppercase tracking-wider text-sm border-b border-subtle pb-2">
            Pending Decisions
          </h2>
          {approvals.length > 0 ?
          <ul className="space-y-2 text-text-primary">
              {approvals.map((req) =>
            <li key={req.id} className="flex items-start">
                  <span
                className={`mr-2 ${req.urgency === 'URGENT' ? 'text-danger' : req.urgency === 'STANDARD' ? 'text-warning' : 'text-text-muted'}`}>
                
                    •
                  </span>
                  {req.title} ({req.department})
                </li>
            )}
            </ul> :

          <p className="text-text-secondary">
              No pending approvals in queue.
            </p>
          }
        </section>
      </div>
    </div>);

}