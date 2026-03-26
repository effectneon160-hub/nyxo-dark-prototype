import React, { useEffect, memo } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useNYXOStore } from './store';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { Dashboard } from './pages/Dashboard';
import { AgentsGrid } from './pages/AgentsGrid';
import { AgentDetail } from './pages/AgentDetail';
import { DepartmentsOverview } from './pages/DepartmentsOverview';
import { DepartmentDetail } from './pages/DepartmentDetail';
import { GovernancePage } from './pages/GovernancePage';
import { SimulationPage } from './pages/SimulationPage';
import { BackbonePage } from './pages/BackbonePage';
import { MemoryPage } from './pages/MemoryPage';
import { ConsolePage } from './pages/ConsolePage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { BriefingPage } from './pages/BriefingPage';
// Layout Shell
const Layout = ({ children }: {children: React.ReactNode;}) => {
  const { governance, setERBStatus } = useNYXOStore();
  return (
    <div className="flex h-screen w-full bg-void text-text-primary overflow-hidden font-body">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <TopBar />
        <div className="flex-1 overflow-auto bg-void relative">
          {children}

          {/* ERB Overlay */}
          {governance.erbStatus !== 'inactive' &&
          <div
            className={`absolute inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm ${governance.erbStatus === 'bunker' ? 'bg-erb/90' : 'bg-erb/20'}`}>
            
              <div className="bg-void border-2 border-erb rounded-xl p-8 max-w-lg text-center shadow-2xl animate-erb-pulse">
                <h2 className="text-4xl font-display font-bold text-erb mb-4 uppercase tracking-widest">
                  {governance.erbStatus === 'bunker' ?
                'Bunker Mode Active' :
                'System Halted'}
                </h2>
                <p className="text-text-primary text-lg mb-6">
                  {governance.erbStatus === 'bunker' ?
                'All autonomous operations are suspended. System is locked.' :
                `Emergency protocol: ${governance.erbStatus.replace('_', ' ').toUpperCase()} is active.`}
                </p>
                <div className="text-sm text-text-secondary font-mono mb-6">
                  Awaiting Super Admin clearance to unfreeze.
                </div>
                <button
                onClick={() => setERBStatus('inactive')}
                className="px-6 py-3 bg-success hover:bg-success/80 text-void font-bold rounded-lg transition-colors text-sm uppercase tracking-wider">
                
                  Deactivate — All Clear
                </button>
              </div>
            </div>
          }
        </div>
      </main>
    </div>);

};
export function App() {
  const advanceTime = useNYXOStore((state) => state.advanceTime);
  const timeMultiplier = useNYXOStore(
    (state) => state.simulatedTime.timeMultiplier
  );
  const isRunning = useNYXOStore((state) => state.simulatedTime.isRunning);
  // Global Time Simulation Hook
  useEffect(() => {
    if (!isRunning) return;
    // 1 real second = 1 simulated minute * multiplier
    const interval = setInterval(() => {
      advanceTime(1);
    }, 1000 / timeMultiplier);
    return () => clearInterval(interval);
  }, [isRunning, timeMultiplier, advanceTime]);
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/departments" element={<DepartmentsOverview />} />
          <Route path="/departments/:dept" element={<DepartmentDetail />} />

          <Route path="/agents" element={<AgentsGrid />} />
          <Route path="/agents/:id" element={<AgentDetail />} />

          <Route path="/backbone" element={<BackbonePage />} />
          <Route path="/simulation" element={<SimulationPage />} />
          <Route path="/governance" element={<GovernancePage />} />
          <Route path="/memory" element={<MemoryPage />} />
          <Route path="/console" element={<ConsolePage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/briefing" element={<BriefingPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
        </Routes>
      </Layout>
    </Router>);

}