export type ScenarioMode = 'normal' | 'highgrowth' | 'crisis' | 'startup';
export type UserRole =
'super_admin' |
'org_admin' |
'dept_manager' |
'analyst' |
'viewer';
export type Department =
'sales' |
'marketing' |
'finance' |
'operations' |
'it' |
'system';
export type AgentStatus =
'active' |
'running' |
'idle' |
'paused' |
'error' |
'cooldown' |
'locked';
export type LLMModel =
'GPT-4o' |
'GPT-4o-mini' |
'Claude 3.5 Sonnet' |
'Claude 3 Haiku' |
'Llama 3 70B';
export type ERBStatus =
'inactive' |
'halt_sales' |
'halt_spend' |
'halt_tech' |
'bunker';

export interface MonthlyRevenue {
  month: string;
  amount: number;
}

export interface AgentPersonality {
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  decisionSpeed: 'cautious' | 'balanced' | 'fast';
  communicationStyle:
  'formal' |
  'data-driven' |
  'concise' |
  'creative' |
  'empathetic';
  specialty: string;
}

export interface AgentLogEntry {
  id: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'reasoning';
  message: string;
}

export interface DailyPerf {
  date: string;
  tasks: number;
  successRate: number;
}

export interface AgentConfig {
  systemPrompt: string;
  maxSpendPerTask: number;
  retryPolicy: number;
  cooldownPeriod: number;
}

export interface AgentState {
  id: string;
  name: string;
  department: Department;
  type: 'execution' | 'strategic';
  status: AgentStatus;
  currentTask: string | null;
  lastCompletedTask: string | null;
  lastCompletedAt: string | null;
  successRate: number;
  tasksToday: number;
  tasksAllTime: number;
  costThisMonth: number;
  averageTaskDuration: number;
  llmModel: LLMModel;
  errorCount: number;
  lastError: string | null;
  retryCount: number;
  autonomyLevel: number;
  personality: AgentPersonality;
  tools: string[];
  config: AgentConfig;
  logs: AgentLogEntry[];
  performanceHistory: DailyPerf[];
  avatar: string;
}

export interface BackboneAgentState extends Omit<AgentState, 'department'> {
  department: 'system';
  scope: 'global';
}

export interface TaskRecord {
  id: string;
  agentId: string;
  agentName: string;
  department: Department;
  command: string;
  status: 'completed' | 'failed';
  duration: number;
  cost: number;
  timestamp: string;
  outputSummary: string;
}

export interface ActiveTask {
  id: string;
  agentId: string;
  command: string;
  startTime: string;
  progress: number;
  estimatedCompletion: string;
}

export interface QueuedTask {
  id: string;
  agentId: string;
  command: string;
  queuedAt: string;
  priority: 'low' | 'normal' | 'high';
}

export interface FailedTask {
  id: string;
  agentId: string;
  command: string;
  failedAt: string;
  error: string;
  retryCount: number;
}

export interface ReasoningStep {
  title: string;
  details: string[];
}

export interface ApprovalRequest {
  id: string;
  agentId: string;
  agentName: string;
  department: Department;
  urgency: 'LOW' | 'STANDARD' | 'URGENT';
  risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  title: string;
  description: string;
  requestedAt: string;
  reasoningChain: ReasoningStep[];
  financialImpact?: {
    type: 'revenue' | 'cost' | 'savings';
    amount: number;
  };
  simulationId?: string;
}

export interface SimulationResult {
  id: string;
  scenarioName: string;
  department: Department;
  timestamp: string;
  psScore: number;
  status: 'AUTO-APPROVED' | 'ESCALATED' | 'BLOCKED';
  financialRisk: number;
  reputationalRisk: number;
  legalRisk: number;
  operationalRisk: number;
  expectedValue: number;
}

export interface ActiveSimulation {
  id: string;
  scenarioName: string;
  progress: number;
  startTime: string;
}

export interface ActivityEntry {
  id: string;
  timestamp: string;
  department: Department;
  agentName: string;
  action: string;
  status: 'success' | 'warning' | 'error' | 'info';
}

export interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
  timestamp: string;
  read: boolean;
}

export interface NYXOGlobalState {
  company: {
    name: string;
    tier: 'starter' | 'growth' | 'advanced' | 'global';
    industry: string;
    teamSize: number;
    timezone: string;
    currentScenario: ScenarioMode;
  };
  currentUser: {
    name: string;
    role: UserRole;
    department?: Department;
    avatar: string;
  };
  financials: {
    monthlyRevenue: number;
    monthlyBurn: number;
    cashRunway: number;
    outstandingInvoices: number;
    adSpend: number;
    llmCost: number;
    totalSavedVsManual: number;
    pipeline: number;
    revenueHistory: MonthlyRevenue[];
  };
  agents: AgentState[];
  backboneAgents: BackboneAgentState[];
  tasks: {
    completed: TaskRecord[];
    active: ActiveTask[];
    queued: QueuedTask[];
    failed: FailedTask[];
    monthlyCount: number;
    monthlyLimit: number;
  };
  approvals: ApprovalRequest[];
  simulations: {
    active: ActiveSimulation[];
    history: SimulationResult[];
    monthlyCount: number;
    monthlyLimit: number;
    successRate: number;
  };
  memory: {
    vectorCount: number;
    graphRelationships: number;
    structuredRecords: number;
    totalGB: number;
    limitGB: number;
    lastSync: string;
    syncStatus: 'synced' | 'syncing' | 'drift_detected';
  };
  governance: {
    complianceScore: number;
    activeRules: number;
    violationsThisMonth: number;
    auditEventsToday: number;
    erbStatus: ERBStatus;
    reflexionCorrections: number;
  };
  system: {
    uptime: number;
    activeAgentCount: number;
    apiHealth: number;
    incidentsThisMonth: number;
    lastBackup: string;
    overallHealth: 'healthy' | 'warning' | 'critical';
  };
  activityFeed: ActivityEntry[];
  notifications: Notification[];
  unreadCount: number;
  simulatedTime: {
    currentDate: string;
    timeMultiplier: number;
    isRunning: boolean;
  };
  onboarding: {
    completed: boolean;
    currentStep: number;
    storyModeActive: boolean;
  };
}