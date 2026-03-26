import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  NYXOGlobalState,
  ScenarioMode,
  ERBStatus,
  ActivityEntry,
  Notification } from
'./types';
import { defaultState } from './defaultState';

interface NYXOStore extends NYXOGlobalState {
  // Actions
  setScenario: (scenario: ScenarioMode) => void;
  setERBStatus: (status: ERBStatus) => void;
  pauseAgent: (agentId: string) => void;
  resumeAgent: (agentId: string) => void;
  approveRequest: (requestId: string) => void;
  rejectRequest: (requestId: string) => void;
  addActivity: (entry: Omit<ActivityEntry, 'id' | 'timestamp'>) => void;
  addNotification: (
  notification: Omit<Notification, 'id' | 'timestamp' | 'read'>)
  => void;
  markNotificationRead: (id: string) => void;
  advanceTime: (minutes: number) => void;
  setTimeMultiplier: (multiplier: number) => void;
  toggleTimeRunning: () => void;
  switchRole: (role: any) => void;
  resetToDefault: () => void;
}

export const useNYXOStore = create<NYXOStore>()(
  persist(
    (set, get) => ({
      ...defaultState,

      setScenario: (scenario) =>
      set((state) => {
        // In a real app, this would deeply merge scenario-specific data
        // For now, we just update the scenario string
        return {
          company: { ...state.company, currentScenario: scenario }
        };
      }),

      setERBStatus: (status) =>
      set((state) => {
        const isBunker = status === 'bunker';
        const isHaltSpend = status === 'halt_spend';

        return {
          governance: { ...state.governance, erbStatus: status },
          agents: state.agents.map((agent) => {
            if (isBunker) return { ...agent, status: 'locked' };
            if (isHaltSpend && agent.department === 'finance')
            return { ...agent, status: 'locked' };
            return agent;
          })
        };
      }),

      pauseAgent: (agentId) =>
      set((state) => ({
        agents: state.agents.map((a) =>
        a.id === agentId ? { ...a, status: 'paused' } : a
        ),
        system: {
          ...state.system,
          activeAgentCount: Math.max(0, state.system.activeAgentCount - 1)
        }
      })),

      resumeAgent: (agentId) =>
      set((state) => ({
        agents: state.agents.map((a) =>
        a.id === agentId ? { ...a, status: 'active' } : a
        ),
        system: {
          ...state.system,
          activeAgentCount: state.system.activeAgentCount + 1
        }
      })),

      approveRequest: (requestId) =>
      set((state) => {
        const request = state.approvals.find((r) => r.id === requestId);
        if (!request) return state;

        const newFinancials = { ...state.financials };
        if (request.financialImpact) {
          if (request.financialImpact.type === 'revenue') {
            newFinancials.pipeline += request.financialImpact.amount;
            newFinancials.monthlyRevenue += Math.round(
              request.financialImpact.amount / 12
            );
          } else if (request.financialImpact.type === 'cost') {
            newFinancials.monthlyBurn += request.financialImpact.amount;
          }
        }

        return {
          approvals: state.approvals.filter((r) => r.id !== requestId),
          financials: newFinancials,
          tasks: {
            ...state.tasks,
            monthlyCount: state.tasks.monthlyCount + 1
          }
        };
      }),

      rejectRequest: (requestId) =>
      set((state) => ({
        approvals: state.approvals.filter((r) => r.id !== requestId)
      })),

      addActivity: (entry) =>
      set((state) => {
        const newEntry: ActivityEntry = {
          ...entry,
          id: `act-${Date.now()}`,
          timestamp: state.simulatedTime.currentDate
        };
        return {
          activityFeed: [newEntry, ...state.activityFeed].slice(0, 200)
        };
      }),

      addNotification: (notification) =>
      set((state) => {
        const newNotif: Notification = {
          ...notification,
          id: `notif-${Date.now()}`,
          timestamp: state.simulatedTime.currentDate,
          read: false
        };
        return {
          notifications: [newNotif, ...state.notifications],
          unreadCount: state.unreadCount + 1
        };
      }),

      markNotificationRead: (id) =>
      set((state) => ({
        notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1)
      })),

      advanceTime: (minutes) =>
      set((state) => {
        const current = new Date(state.simulatedTime.currentDate);
        current.setMinutes(current.getMinutes() + minutes);
        return {
          simulatedTime: {
            ...state.simulatedTime,
            currentDate: current.toISOString()
          }
        };
      }),

      setTimeMultiplier: (multiplier) =>
      set((state) => ({
        simulatedTime: { ...state.simulatedTime, timeMultiplier: multiplier }
      })),

      toggleTimeRunning: () =>
      set((state) => ({
        simulatedTime: {
          ...state.simulatedTime,
          isRunning: !state.simulatedTime.isRunning
        }
      })),

      switchRole: (role) =>
      set((state) => ({
        currentUser: { ...state.currentUser, role }
      })),

      resetToDefault: () => set(defaultState)
    }),
    {
      name: 'nyxo-os-storage',
      partialize: (state) => state // Persist everything
    }
  )
);