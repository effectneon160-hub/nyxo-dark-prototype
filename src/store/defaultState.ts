import {
  NYXOGlobalState,
  AgentState,
  BackboneAgentState,
  ApprovalRequest,
  ActivityEntry } from
'./types';

const generateMockPerformance = () => {
  return Array.from({ length: 30 }).map((_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString(),
    tasks: Math.floor(Math.random() * 50) + 10,
    successRate: 90 + Math.random() * 10
  }));
};

const defaultAgentConfig = {
  systemPrompt:
  'You are an AI agent operating within the NYXO OS framework. Execute tasks efficiently and log all reasoning.',
  maxSpendPerTask: 50,
  retryPolicy: 3,
  cooldownPeriod: 5
};

const salesAgents: AgentState[] = [
{
  id: 'agt-sales-01',
  name: 'Lead Scraper Agent',
  department: 'sales',
  type: 'execution',
  status: 'idle',
  currentTask: null,
  lastCompletedTask: 'Scraped 127 leads from LinkedIn Tokyo',
  lastCompletedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  successRate: 94.2,
  tasksToday: 42,
  tasksAllTime: 4821,
  costThisMonth: 124.5,
  averageTaskDuration: 3.2,
  llmModel: 'Claude 3.5 Sonnet',
  errorCount: 2,
  lastError: null,
  retryCount: 0,
  autonomyLevel: 90,
  personality: {
    riskTolerance: 'aggressive',
    decisionSpeed: 'fast',
    communicationStyle: 'data-driven',
    specialty: 'High-volume data extraction and enrichment'
  },
  tools: ['Apollo API', 'LinkedIn Sales Navigator', 'Clearbit'],
  config: defaultAgentConfig,
  logs: [],
  performanceHistory: generateMockPerformance(),
  avatar: 'target'
},
{
  id: 'agt-sales-02',
  name: 'CRM Management Agent',
  department: 'sales',
  type: 'execution',
  status: 'idle',
  currentTask: null,
  lastCompletedTask: 'Updated 45 stale records',
  lastCompletedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  successRate: 98.1,
  tasksToday: 12,
  tasksAllTime: 8432,
  costThisMonth: 45.2,
  averageTaskDuration: 1.1,
  llmModel: 'GPT-4o-mini',
  errorCount: 0,
  lastError: null,
  retryCount: 0,
  autonomyLevel: 95,
  personality: {
    riskTolerance: 'conservative',
    decisionSpeed: 'balanced',
    communicationStyle: 'concise',
    specialty: 'Data hygiene and pipeline organization'
  },
  tools: ['HubSpot API', 'Salesforce API'],
  config: defaultAgentConfig,
  logs: [],
  performanceHistory: generateMockPerformance(),
  avatar: 'database'
},
{
  id: 'agt-sales-03',
  name: 'Outreach Automation',
  department: 'sales',
  type: 'execution',
  status: 'error',
  currentTask: 'Sending batch 4 of Q3 campaign',
  lastCompletedTask: 'Sent 200 emails for Webinar promo',
  lastCompletedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  successRate: 88.5,
  tasksToday: 8,
  tasksAllTime: 12450,
  costThisMonth: 312.8,
  averageTaskDuration: 5.4,
  llmModel: 'GPT-4o',
  errorCount: 14,
  lastError:
  'Gmail API rate limit exceeded (500/day). Queued 47 pending emails. Retrying in 23 minutes.',
  retryCount: 3,
  autonomyLevel: 80,
  personality: {
    riskTolerance: 'moderate',
    decisionSpeed: 'fast',
    communicationStyle: 'creative',
    specialty: 'Personalized cold outreach at scale'
  },
  tools: ['Gmail API', 'SendGrid', 'Instantly'],
  config: defaultAgentConfig,
  logs: [],
  performanceHistory: generateMockPerformance(),
  avatar: 'mail'
},
{
  id: 'agt-sales-04',
  name: 'Deal Closer Agent',
  department: 'sales',
  type: 'strategic',
  status: 'idle',
  currentTask: null,
  lastCompletedTask: 'Generated proposal for Nexus Corp',
  lastCompletedAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
  successRate: 91.2,
  tasksToday: 3,
  tasksAllTime: 842,
  costThisMonth: 184.5,
  averageTaskDuration: 12.5,
  llmModel: 'Claude 3.5 Sonnet',
  errorCount: 1,
  lastError: null,
  retryCount: 0,
  autonomyLevel: 60,
  personality: {
    riskTolerance: 'moderate',
    decisionSpeed: 'cautious',
    communicationStyle: 'formal',
    specialty: 'Contract negotiation and pricing strategy'
  },
  tools: ['DocuSign API', 'Stripe API', 'HubSpot API'],
  config: defaultAgentConfig,
  logs: [],
  performanceHistory: generateMockPerformance(),
  avatar: 'briefcase'
},
{
  id: 'agt-sales-05',
  name: 'Lead Scoring Agent',
  department: 'sales',
  type: 'strategic',
  status: 'idle',
  currentTask: null,
  lastCompletedTask: 'Scored 450 inbound leads',
  lastCompletedAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
  successRate: 96.2,
  tasksToday: 120,
  tasksAllTime: 15420,
  costThisMonth: 85.4,
  averageTaskDuration: 0.5,
  llmModel: 'GPT-4o-mini',
  errorCount: 0,
  lastError: null,
  retryCount: 0,
  autonomyLevel: 95,
  personality: {
    riskTolerance: 'conservative',
    decisionSpeed: 'fast',
    communicationStyle: 'data-driven',
    specialty: 'Predictive lead scoring'
  },
  tools: ['HubSpot API', 'Clearbit'],
  config: defaultAgentConfig,
  logs: [],
  performanceHistory: generateMockPerformance(),
  avatar: 'bar-chart'
}];


const marketingAgents: AgentState[] = [
{
  id: 'agt-mkt-01',
  name: 'Content Writer Agent',
  department: 'marketing',
  type: 'execution',
  status: 'running',
  currentTask: "Drafting blog post: 'AI Coworkers'",
  lastCompletedTask: 'Published 3 tweets',
  lastCompletedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  successRate: 95.5,
  tasksToday: 14,
  tasksAllTime: 3240,
  costThisMonth: 84.2,
  averageTaskDuration: 8.2,
  llmModel: 'Claude 3.5 Sonnet',
  errorCount: 0,
  lastError: null,
  retryCount: 0,
  autonomyLevel: 85,
  personality: {
    riskTolerance: 'moderate',
    decisionSpeed: 'balanced',
    communicationStyle: 'creative',
    specialty: 'Long-form content and copywriting'
  },
  tools: ['WordPress API', 'Grammarly API'],
  config: defaultAgentConfig,
  logs: [],
  performanceHistory: generateMockPerformance(),
  avatar: 'pen-tool'
},
{
  id: 'agt-mkt-02',
  name: 'Ad Campaign Manager',
  department: 'marketing',
  type: 'strategic',
  status: 'warning',
  currentTask: 'Monitoring ROAS across 4 platforms',
  lastCompletedTask: 'Adjusted bids for Q3 campaign',
  lastCompletedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  successRate: 89.4,
  tasksToday: 24,
  tasksAllTime: 5420,
  costThisMonth: 412.5,
  averageTaskDuration: 2.5,
  llmModel: 'GPT-4o',
  errorCount: 5,
  lastError:
  'Meta Ads API returning intermittent 503 errors. Operating in fallback mode.',
  retryCount: 1,
  autonomyLevel: 75,
  personality: {
    riskTolerance: 'aggressive',
    decisionSpeed: 'fast',
    communicationStyle: 'data-driven',
    specialty: 'Performance marketing and budget allocation'
  },
  tools: ['Google Ads API', 'Meta Ads API', 'LinkedIn Ads API'],
  config: defaultAgentConfig,
  logs: [],
  performanceHistory: generateMockPerformance(),
  avatar: 'trending-up'
},
{
  id: 'agt-mkt-03',
  name: 'SEO Optimizer',
  department: 'marketing',
  type: 'execution',
  status: 'idle',
  currentTask: null,
  lastCompletedTask: 'Optimized 12 landing pages',
  lastCompletedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  successRate: 94.1,
  tasksToday: 5,
  tasksAllTime: 2100,
  costThisMonth: 65.2,
  averageTaskDuration: 4.5,
  llmModel: 'Claude 3.5 Sonnet',
  errorCount: 0,
  lastError: null,
  retryCount: 0,
  autonomyLevel: 90,
  personality: {
    riskTolerance: 'moderate',
    decisionSpeed: 'balanced',
    communicationStyle: 'data-driven',
    specialty: 'Search engine optimization'
  },
  tools: ['Ahrefs API', 'Google Search Console'],
  config: defaultAgentConfig,
  logs: [],
  performanceHistory: generateMockPerformance(),
  avatar: 'search'
}];


const financeAgents: AgentState[] = [
{
  id: 'agt-fin-01',
  name: 'Invoice Generator',
  department: 'finance',
  type: 'execution',
  status: 'idle',
  currentTask: null,
  lastCompletedTask: 'Sent INV-2847 to Nexus Corp',
  lastCompletedAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
  successRate: 99.8,
  tasksToday: 18,
  tasksAllTime: 12400,
  costThisMonth: 24.5,
  averageTaskDuration: 0.8,
  llmModel: 'GPT-4o-mini',
  errorCount: 0,
  lastError: null,
  retryCount: 0,
  autonomyLevel: 98,
  personality: {
    riskTolerance: 'conservative',
    decisionSpeed: 'fast',
    communicationStyle: 'formal',
    specialty: 'Billing and accounts receivable'
  },
  tools: ['Stripe API', 'Xero API'],
  config: defaultAgentConfig,
  logs: [],
  performanceHistory: generateMockPerformance(),
  avatar: 'file-text'
},
{
  id: 'agt-fin-02',
  name: 'Fraud Detection',
  department: 'finance',
  type: 'strategic',
  status: 'running',
  currentTask: 'Analyzing outbound transaction batch',
  lastCompletedTask: 'Flagged TechPulse Ltd payment',
  lastCompletedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  successRate: 97.5,
  tasksToday: 142,
  tasksAllTime: 45200,
  costThisMonth: 185.2,
  averageTaskDuration: 1.2,
  llmModel: 'GPT-4o',
  errorCount: 0,
  lastError: null,
  retryCount: 0,
  autonomyLevel: 95,
  personality: {
    riskTolerance: 'conservative',
    decisionSpeed: 'cautious',
    communicationStyle: 'data-driven',
    specialty: 'Anomaly detection and risk mitigation'
  },
  tools: ['Plaid API', 'Internal Ledger'],
  config: defaultAgentConfig,
  logs: [],
  performanceHistory: generateMockPerformance(),
  avatar: 'shield-alert'
},
{
  id: 'agt-fin-03',
  name: 'Expense Tracker',
  department: 'finance',
  type: 'execution',
  status: 'idle',
  currentTask: null,
  lastCompletedTask: 'Reconciled Q2 software subscriptions',
  lastCompletedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  successRate: 99.1,
  tasksToday: 45,
  tasksAllTime: 18500,
  costThisMonth: 42.1,
  averageTaskDuration: 1.5,
  llmModel: 'GPT-4o-mini',
  errorCount: 0,
  lastError: null,
  retryCount: 0,
  autonomyLevel: 95,
  personality: {
    riskTolerance: 'conservative',
    decisionSpeed: 'fast',
    communicationStyle: 'formal',
    specialty: 'Expense reconciliation'
  },
  tools: ['Expensify API', 'Brex API'],
  config: defaultAgentConfig,
  logs: [],
  performanceHistory: generateMockPerformance(),
  avatar: 'receipt'
}];


const operationsAgents: AgentState[] = [
{
  id: 'agt-ops-01',
  name: 'Support Ticket Handler',
  department: 'operations',
  type: 'execution',
  status: 'idle',
  currentTask: null,
  lastCompletedTask: 'Resolved TKT-2891',
  lastCompletedAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
  successRate: 92.4,
  tasksToday: 84,
  tasksAllTime: 24500,
  costThisMonth: 342.1,
  averageTaskDuration: 4.2,
  llmModel: 'Claude 3.5 Sonnet',
  errorCount: 3,
  lastError: null,
  retryCount: 0,
  autonomyLevel: 85,
  personality: {
    riskTolerance: 'moderate',
    decisionSpeed: 'balanced',
    communicationStyle: 'empathetic',
    specialty: 'Customer resolution and triage'
  },
  tools: ['Zendesk API', 'Jira API'],
  config: defaultAgentConfig,
  logs: [],
  performanceHistory: generateMockPerformance(),
  avatar: 'life-buoy'
},
{
  id: 'agt-ops-02',
  name: 'Client Onboarding',
  department: 'operations',
  type: 'execution',
  status: 'idle',
  currentTask: null,
  lastCompletedTask: 'Sent welcome sequence to Meridian Global',
  lastCompletedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  successRate: 97.8,
  tasksToday: 12,
  tasksAllTime: 3400,
  costThisMonth: 112.4,
  averageTaskDuration: 5.2,
  llmModel: 'Claude 3.5 Sonnet',
  errorCount: 0,
  lastError: null,
  retryCount: 0,
  autonomyLevel: 85,
  personality: {
    riskTolerance: 'moderate',
    decisionSpeed: 'balanced',
    communicationStyle: 'empathetic',
    specialty: 'Client success and onboarding'
  },
  tools: ['HubSpot API', 'Slack API'],
  config: defaultAgentConfig,
  logs: [],
  performanceHistory: generateMockPerformance(),
  avatar: 'users'
}];


const itAgents: AgentState[] = [
{
  id: 'agt-it-01',
  name: 'Security Monitor',
  department: 'it',
  type: 'strategic',
  status: 'running',
  currentTask: 'Scanning dependency tree',
  lastCompletedTask: 'Blocked 2 failed logins from 185.220.101.x',
  lastCompletedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  successRate: 99.9,
  tasksToday: 450,
  tasksAllTime: 184000,
  costThisMonth: 540.2,
  averageTaskDuration: 0.5,
  llmModel: 'GPT-4o',
  errorCount: 0,
  lastError: null,
  retryCount: 0,
  autonomyLevel: 100,
  personality: {
    riskTolerance: 'conservative',
    decisionSpeed: 'fast',
    communicationStyle: 'concise',
    specialty: 'Threat detection and infrastructure security'
  },
  tools: ['AWS Security Hub', 'Cloudflare API', 'Datadog'],
  config: defaultAgentConfig,
  logs: [],
  performanceHistory: generateMockPerformance(),
  avatar: 'lock'
},
{
  id: 'agt-it-02',
  name: 'Deployment Manager',
  department: 'it',
  type: 'execution',
  status: 'idle',
  currentTask: null,
  lastCompletedTask: 'Deployed hotfix v2.4.0',
  lastCompletedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
  successRate: 98.5,
  tasksToday: 4,
  tasksAllTime: 1250,
  costThisMonth: 45.2,
  averageTaskDuration: 8.5,
  llmModel: 'GPT-4o',
  errorCount: 1,
  lastError: null,
  retryCount: 0,
  autonomyLevel: 70,
  personality: {
    riskTolerance: 'conservative',
    decisionSpeed: 'cautious',
    communicationStyle: 'concise',
    specialty: 'CI/CD and infrastructure deployment'
  },
  tools: ['GitHub API', 'Vercel API', 'AWS API'],
  config: defaultAgentConfig,
  logs: [],
  performanceHistory: generateMockPerformance(),
  avatar: 'server'
}];


const backboneAgents: BackboneAgentState[] = [
{
  id: 'agt-sys-01',
  name: 'Master Coordinator',
  department: 'system',
  scope: 'global',
  type: 'strategic',
  status: 'running',
  currentTask: 'Orchestrating 14 active agents',
  lastCompletedTask: 'Rebalanced workflow after agent pause',
  lastCompletedAt: new Date().toISOString(),
  successRate: 99.9,
  tasksToday: 1240,
  tasksAllTime: 482000,
  costThisMonth: 840.5,
  averageTaskDuration: 0.1,
  llmModel: 'GPT-4o',
  errorCount: 0,
  lastError: null,
  retryCount: 0,
  autonomyLevel: 100,
  personality: {
    riskTolerance: 'moderate',
    decisionSpeed: 'fast',
    communicationStyle: 'concise',
    specialty: 'DAG execution and resource routing'
  },
  tools: ['Internal Event Bus'],
  config: defaultAgentConfig,
  logs: [],
  performanceHistory: generateMockPerformance(),
  avatar: 'cpu'
},
{
  id: 'agt-sys-02',
  name: 'Governance Agent',
  department: 'system',
  scope: 'global',
  type: 'strategic',
  status: 'running',
  currentTask: 'Monitoring compliance stream',
  lastCompletedTask: 'Logged policy check for AP-4829',
  lastCompletedAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
  successRate: 99.5,
  tasksToday: 845,
  tasksAllTime: 340000,
  costThisMonth: 620.1,
  averageTaskDuration: 0.2,
  llmModel: 'Claude 3.5 Sonnet',
  errorCount: 0,
  lastError: null,
  retryCount: 0,
  autonomyLevel: 100,
  personality: {
    riskTolerance: 'conservative',
    decisionSpeed: 'cautious',
    communicationStyle: 'formal',
    specialty: 'Policy enforcement and audit logging'
  },
  tools: ['Compliance DB', 'ERB Controller'],
  config: defaultAgentConfig,
  logs: [],
  performanceHistory: generateMockPerformance(),
  avatar: 'scale'
},
{
  id: 'agt-sys-03',
  name: 'Learning Agent',
  department: 'system',
  scope: 'global',
  type: 'strategic',
  status: 'idle',
  currentTask: null,
  lastCompletedTask: 'Updated Tokyo SaaS conversion baseline',
  lastCompletedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  successRate: 99.1,
  tasksToday: 45,
  tasksAllTime: 125000,
  costThisMonth: 320.4,
  averageTaskDuration: 2.1,
  llmModel: 'Claude 3.5 Sonnet',
  errorCount: 0,
  lastError: null,
  retryCount: 0,
  autonomyLevel: 100,
  personality: {
    riskTolerance: 'moderate',
    decisionSpeed: 'balanced',
    communicationStyle: 'data-driven',
    specialty: 'Memory vectorization and pattern recognition'
  },
  tools: ['Pinecone API', 'Neo4j API'],
  config: defaultAgentConfig,
  logs: [],
  performanceHistory: generateMockPerformance(),
  avatar: 'brain'
}];


const initialApprovals: ApprovalRequest[] = [
{
  id: 'APR-2847',
  agentId: 'agt-sales-04',
  agentName: 'Deal Closer Agent',
  department: 'sales',
  urgency: 'URGENT',
  risk: 'MEDIUM',
  title: 'Approve 18% Discount for Nexus Corp',
  description:
  "Nexus Corp deal at risk. 18% discount (vs. competitor's 22%) closes $45K contract. Close window: 24 hours.",
  requestedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  financialImpact: { type: 'revenue', amount: 36900 },
  reasoningChain: [
  {
    title: 'DATA CONSIDERED',
    details: [
    'Nexus Corp LTV: $450,000 (top 3 client)',
    'Competitor Apex offering: 22% discount',
    'Our margin at 18% discount: 31% (above 25% threshold)']

  },
  {
    title: 'SIMULATION RESULT',
    details: [
    'P_s with 18% discount: 0.84 (High confidence — Approve)',
    'P_s without discount: 0.31 (High churn risk)',
    'Expected value with approval: +$36,900']

  }]

},
{
  id: 'APR-2848',
  agentId: 'agt-mkt-01',
  agentName: 'Content Writer Agent',
  department: 'marketing',
  urgency: 'STANDARD',
  risk: 'LOW',
  title: "Publish 'AI Coworkers' Trend Post",
  description:
  "Trend detected: 'AI Coworkers' — velocity score 8.7/10. Content opportunity window: 18-24 hours. Draft ready for review.",
  requestedAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
  reasoningChain: [
  {
    title: 'TREND ANALYSIS',
    details: [
    'Topic velocity: 8.7/10 on Twitter/LinkedIn',
    'Estimated reach: 12,400 impressions',
    'Brand risk: LOW']

  }]

},
{
  id: 'APR-2849',
  agentId: 'agt-fin-02',
  agentName: 'Fraud Detection',
  department: 'finance',
  urgency: 'LOW',
  risk: 'HIGH',
  title: 'Review Flagged Payment: TechPulse Ltd',
  description:
  "Transaction flagged: $4,200 outbound to unknown vendor 'TechPulse Ltd' — not in approved vendor list. Payment frozen.",
  requestedAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
  reasoningChain: [
  {
    title: 'ANOMALY DETECTION',
    details: [
    'Vendor not in approved DB',
    'First-time transaction',
    'Amount exceeds auto-approval threshold for unknown vendors']

  }]

},
{
  id: 'APR-2850',
  agentId: 'agt-fin-03',
  agentName: 'Expense Tracker',
  department: 'finance',
  urgency: 'STANDARD',
  risk: 'LOW',
  title: 'Approve Cyber Insurance Renewal',
  description:
  'Invoice $1,200/yr from Hiscox Cyber Insurance. Policy provides: £1M cyber coverage, £500K business interruption.',
  requestedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  financialImpact: { type: 'cost', amount: 1200 },
  reasoningChain: [
  {
    title: 'RISK ASSESSMENT',
    details: [
    'NOT insuring = potential $4.2M exposure',
    'P/L impact: -$1,200',
    'Current cash runway: unaffected']

  }]

},
{
  id: 'APR-2851',
  agentId: 'agt-it-02',
  agentName: 'Deployment Manager',
  department: 'it',
  urgency: 'STANDARD',
  risk: 'MEDIUM',
  title: 'Deploy v2.4.1 to Production',
  description:
  'All tests passed. Contains security patches and 3 minor feature updates. Estimated downtime: 0s.',
  requestedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  reasoningChain: [
  {
    title: 'DEPLOYMENT READINESS',
    details: [
    'CI/CD Pipeline: PASS',
    'Security Scan: 0 vulnerabilities',
    'Rollback plan: Verified and ready']

  }]

}];


const initialActivityFeed: ActivityEntry[] = [
{
  id: 'act-1',
  timestamp: new Date(Date.now() - 1000 * 60 * 1).toISOString(),
  department: 'sales',
  agentName: 'Lead Scraper Agent',
  action: 'Scraped 127 leads · LinkedIn Tokyo',
  status: 'success'
},
{
  id: 'act-2',
  timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
  department: 'system',
  agentName: 'Governance Agent',
  action: 'Policy check · outbound email #AP-4829',
  status: 'warning'
},
{
  id: 'act-3',
  timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
  department: 'finance',
  agentName: 'Invoice Generator',
  action: 'INV-2847 sent · Nexus Corp · $12,500',
  status: 'success'
},
{
  id: 'act-4',
  timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
  department: 'system',
  agentName: 'QC Backbone',
  action: 'Output rejected · Content Writer · Brand voice',
  status: 'warning'
},
{
  id: 'act-5',
  timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  department: 'marketing',
  agentName: 'Social Media Publisher',
  action: '3 posts scheduled · LinkedIn · Instagram',
  status: 'success'
},
{
  id: 'act-6',
  timestamp: new Date(Date.now() - 1000 * 60 * 6).toISOString(),
  department: 'operations',
  agentName: 'Support Ticket Handler',
  action: 'TKT-2891 resolved · CSAT predicted: 9.1',
  status: 'success'
},
{
  id: 'act-7',
  timestamp: new Date(Date.now() - 1000 * 60 * 7).toISOString(),
  department: 'it',
  agentName: 'Security Monitor',
  action: '2 failed logins from 185.220.101.x · Blocked',
  status: 'success'
},
{
  id: 'act-8',
  timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
  department: 'finance',
  agentName: 'Fraud Detection',
  action: 'ALERT: TechPulse Ltd $4,200 · Freezing',
  status: 'error'
}];


export const defaultState: NYXOGlobalState = {
  company: {
    name: 'Meridian Digital Solutions',
    tier: 'advanced',
    industry: 'B2B SaaS',
    teamSize: 45,
    timezone: 'Asia/Singapore',
    currentScenario: 'normal'
  },
  currentUser: {
    name: 'Salauddin',
    role: 'super_admin',
    avatar: 'https://i.pravatar.cc/150?u=salauddin'
  },
  financials: {
    monthlyRevenue: 284500,
    monthlyBurn: 89400,
    cashRunway: 8.4,
    outstandingInvoices: 47200,
    adSpend: 24500,
    llmCost: 4284,
    totalSavedVsManual: 48230,
    pipeline: 2400000,
    revenueHistory: [
    { month: 'Jan', amount: 210000 },
    { month: 'Feb', amount: 225000 },
    { month: 'Mar', amount: 240000 },
    { month: 'Apr', amount: 252000 },
    { month: 'May', amount: 268000 },
    { month: 'Jun', amount: 284500 }]

  },
  agents: [
  ...salesAgents,
  ...marketingAgents,
  ...financeAgents,
  ...operationsAgents,
  ...itAgents],

  backboneAgents: backboneAgents,
  tasks: {
    completed: [],
    active: [],
    queued: [],
    failed: [],
    monthlyCount: 87234,
    monthlyLimit: 150000
  },
  approvals: initialApprovals,
  simulations: {
    active: [],
    history: [
    {
      id: 'SIM-1247',
      scenarioName: 'Aggressive pricing war against ApexTech',
      department: 'sales',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      psScore: 0.42,
      status: 'BLOCKED',
      financialRisk: 8.5,
      reputationalRisk: 4.2,
      legalRisk: 2.1,
      operationalRisk: 6.5,
      expectedValue: -125000
    },
    {
      id: 'SIM-1246',
      scenarioName: 'Launch Q3 Ad Campaign on LinkedIn',
      department: 'marketing',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      psScore: 0.88,
      status: 'AUTO-APPROVED',
      financialRisk: 3.2,
      reputationalRisk: 1.5,
      legalRisk: 1.0,
      operationalRisk: 2.5,
      expectedValue: 45000
    },
    {
      id: 'SIM-1245',
      scenarioName: 'Hire 2 additional Support Agents',
      department: 'operations',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
      psScore: 0.71,
      status: 'ESCALATED',
      financialRisk: 6.5,
      reputationalRisk: 2.0,
      legalRisk: 1.5,
      operationalRisk: 4.0,
      expectedValue: 12000
    }],

    monthlyCount: 2847,
    monthlyLimit: 5000,
    successRate: 94.2
  },
  memory: {
    vectorCount: 1234847,
    graphRelationships: 847293,
    structuredRecords: 765153,
    totalGB: 847,
    limitGB: 2048,
    lastSync: new Date().toISOString(),
    syncStatus: 'synced'
  },
  governance: {
    complianceScore: 96,
    activeRules: 247,
    violationsThisMonth: 3,
    auditEventsToday: 1847,
    erbStatus: 'inactive',
    reflexionCorrections: 847
  },
  system: {
    uptime: 99.97,
    activeAgentCount: 14,
    apiHealth: 47,
    incidentsThisMonth: 2,
    lastBackup: new Date().toISOString(),
    overallHealth: 'healthy'
  },
  activityFeed: initialActivityFeed,
  notifications: [],
  unreadCount: 0,
  simulatedTime: {
    currentDate: new Date().toISOString(),
    timeMultiplier: 1,
    isRunning: true
  },
  onboarding: {
    completed: true,
    currentStep: 5,
    storyModeActive: false
  }
};