import React, { useEffect, useState, useRef } from 'react';
import { Terminal, ChevronRight, Play } from 'lucide-react';
import { useNYXOStore } from '../store';
interface LogEntry {
  id: string;
  type: 'input' | 'system' | 'parsing' | 'intent' | 'success' | 'error';
  content: React.ReactNode;
}
export function ConsolePage() {
  const { currentUser } = useNYXOStore();
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([
  {
    id: 'init-1',
    type: 'system',
    content: 'NYXO OCL Console v2.0.4 initialized.'
  },
  {
    id: 'init-2',
    type: 'system',
    content: `Session active for: ${currentUser.name} [${currentUser.role.toUpperCase()}]`
  },
  {
    id: 'init-3',
    type: 'system',
    content:
    'Type a command or select from the library below. Type "help" for available commands.'
  }]
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [logs]);
  const handleCommand = (cmd: string) => {
    if (!cmd.trim() || isProcessing) return;
    const newLogs = [
    ...logs,
    {
      id: Date.now().toString(),
      type: 'input' as const,
      content: cmd
    }];

    setLogs(newLogs);
    setInput('');
    setIsProcessing(true);
    // Simulate parsing
    setTimeout(() => {
      setLogs((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: 'parsing',
        content: 'Parsing intent...'
      }]
      );
      // Simulate intent breakdown
      setTimeout(() => {
        let intentCard: React.ReactNode;
        let isError = false;
        if (cmd.toLowerCase() === 'help') {
          intentCard =
          <div className="text-text-secondary">
              Available command categories:
              <br />- LAUNCH: "Launch [Campaign]..."
              <br />- HALT: "HALT [SALES|SPEND|TECH|ALL]"
              <br />- ANALYZE: "Show ROI on..."
              <br />- SIMULATE: "Simulate entering [Market]..."
            </div>;

        } else if (cmd.toLowerCase().includes('halt')) {
          intentCard =
          <div className="border border-danger p-4 rounded bg-danger-muted/10 mt-2">
              <div className="text-danger font-bold mb-2">
                CRITICAL COMMAND PARSED
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-text-muted">Primary Intent:</div>
                <div className="col-span-2 text-text-primary">
                  Emergency Red Button Activation
                </div>
                <div className="text-text-muted">Risk Level:</div>
                <div className="col-span-2 text-danger font-bold">CRITICAL</div>
              </div>
            </div>;

        } else {
          intentCard =
          <div className="border border-subtle p-4 rounded bg-elevated mt-2">
              <div className="text-cyan font-bold mb-2">COMMAND PARSED</div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-text-muted">Primary Intent:</div>
                <div className="col-span-2 text-text-primary">
                  Workflow Orchestration
                </div>
                <div className="text-text-muted">Departments:</div>
                <div className="col-span-2 text-text-primary">
                  Marketing, Sales
                </div>
                <div className="text-text-muted">Agents Required:</div>
                <div className="col-span-2 text-text-primary">4 agents</div>
                <div className="text-text-muted">Risk Level:</div>
                <div className="col-span-2 text-warning font-bold">MEDIUM</div>
              </div>
            </div>;

        }
        setLogs((prev) => [
        ...prev.filter((l) => l.type !== 'parsing'),
        {
          id: Date.now().toString(),
          type: 'intent',
          content: intentCard
        }]
        );
        // Simulate execution result
        setTimeout(() => {
          setLogs((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: isError ? 'error' : 'success',
            content: isError ?
            'Command execution failed or blocked.' :
            'Command routed to Master Coordinator for execution.'
          }]
          );
          setIsProcessing(false);
        }, 1000);
      }, 1000);
    }, 500);
  };
  const suggestions = [
  'Launch Q4 marketing campaign with $5k budget',
  'Show ROI on LinkedIn ads for last 30 days',
  'Simulate 15% price increase on Enterprise tier',
  'Generate monthly P&L report'];

  return (
    <div className="h-full flex flex-col bg-void font-mono text-sm">
      <div className="p-4 border-b border-subtle bg-primary flex items-center justify-between shrink-0">
        <div className="flex items-center text-cyan font-bold">
          <Terminal className="w-5 h-5 mr-2" />
          OCL Console
        </div>
        <div className="text-xs text-text-muted">
          Operational Command Language
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Terminal Area */}
        <div className="flex-1 flex flex-col relative">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {logs.map((log) =>
            <div key={log.id} className="flex items-start">
                {log.type === 'input' &&
              <span className="text-cyan mr-2 mt-0.5">{'>'}</span>
              }
                {log.type === 'system' &&
              <span className="text-text-muted mr-2 mt-0.5">[SYS]</span>
              }
                {log.type === 'parsing' &&
              <span className="text-warning mr-2 mt-0.5 animate-pulse">
                    [WAIT]
                  </span>
              }
                {log.type === 'success' &&
              <span className="text-success mr-2 mt-0.5">[OK]</span>
              }
                {log.type === 'error' &&
              <span className="text-danger mr-2 mt-0.5">[ERR]</span>
              }
                <div
                className={`flex-1 ${log.type === 'input' ? 'text-text-primary' : log.type === 'system' ? 'text-text-secondary' : log.type === 'parsing' ? 'text-warning' : log.type === 'success' ? 'text-success' : log.type === 'error' ? 'text-danger' : ''}`}>
                
                  {log.content}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="p-4 border-t border-subtle bg-primary shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCommand(input);
              }}
              className="flex items-center bg-surface border border-subtle rounded px-3 py-2 focus-within:border-cyan transition-colors">
              
              <ChevronRight className="w-5 h-5 text-cyan mr-2 shrink-0" />
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isProcessing}
                placeholder={
                isProcessing ? 'Processing...' : 'Enter OCL command...'
                }
                className="flex-1 bg-transparent border-none outline-none text-text-primary placeholder-text-muted disabled:opacity-50"
                autoFocus />
              
              <button
                type="submit"
                disabled={!input.trim() || isProcessing}
                className="ml-2 p-1 text-cyan hover:text-cyan-hover disabled:text-text-muted disabled:hover:text-text-muted transition-colors">
                
                <Play className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar Library */}
        <div className="w-80 border-l border-subtle bg-primary p-4 hidden lg:flex flex-col shrink-0 overflow-y-auto">
          <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4">
            Command Library
          </h3>
          <div className="space-y-2">
            {suggestions.map((cmd, i) =>
            <button
              key={i}
              onClick={() => setInput(cmd)}
              disabled={isProcessing}
              className="w-full text-left p-3 rounded bg-surface border border-subtle hover:border-cyan hover:bg-surface-hover transition-colors text-xs text-text-secondary hover:text-text-primary disabled:opacity-50">
              
                {cmd}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>);

}