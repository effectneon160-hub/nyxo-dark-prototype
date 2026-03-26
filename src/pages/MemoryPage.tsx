import React, { useState, memo } from 'react';
import { useNYXOStore } from '../store';
import { KPICard } from '../components/shared/KPICard';
import { Database, Search, HardDrive } from 'lucide-react';
export function MemoryPage() {
  const { memory } = useNYXOStore();
  const [activeTab, setActiveTab] = useState<'vector' | 'graph' | 'structured'>(
    'vector'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const storagePercentage = memory.totalGB / memory.limitGB * 100;
  // Mock data for the tables
  const mockVectors = Array.from({
    length: 12
  }).map((_, i) => ({
    id: `MEM-V-${8472 + i}`,
    preview: `Historical campaign performance Q${i % 4 + 1} 2025...`,
    agent: 'Analytics Intelligence',
    similarity: (0.98 - i * 0.02).toFixed(2),
    date: new Date(Date.now() - i * 86400000).toLocaleDateString()
  }));
  const mockGraph = Array.from({
    length: 12
  }).map((_, i) => ({
    id: `MEM-G-${3921 + i}`,
    relation: 'PURCHASED_PRODUCT',
    source: `Client_NexusCorp`,
    target: `Product_EnterpriseTier`,
    agent: 'CRM Management',
    date: new Date(Date.now() - i * 86400000).toLocaleDateString()
  }));
  const mockStructured = Array.from({
    length: 12
  }).map((_, i) => ({
    id: `MEM-S-${1042 + i}`,
    table: 'invoices_q3',
    keys: 'INV-2847, Nexus Corp, $12,500',
    agent: 'Invoice Generator',
    date: new Date(Date.now() - i * 86400000).toLocaleDateString()
  }));
  const filterData = (data: any[]) => {
    if (!searchQuery) return data;
    return data.filter((item) =>
    Object.values(item).some((val) =>
    String(val).toLowerCase().includes(searchQuery.toLowerCase())
    )
    );
  };
  const renderTable = () => {
    let data: any[] = [];
    let columns: string[] = [];
    if (activeTab === 'vector') {
      data = filterData(mockVectors);
      columns = ['ID', 'Content Preview', 'Source Agent', 'Similarity', 'Date'];
    } else if (activeTab === 'graph') {
      data = filterData(mockGraph);
      columns = ['Relationship', 'Source → Target', 'Created By', 'Date'];
    } else {
      data = filterData(mockStructured);
      columns = ['Record ID', 'Table', 'Key Fields', 'Agent', 'Date'];
    }
    if (data.length === 0) {
      return (
        <div className="py-24 flex flex-col items-center justify-center text-center">
          <Search className="w-12 h-12 text-text-disabled mb-4" />
          <h3 className="text-lg font-bold text-text-primary mb-2">
            No memories found
          </h3>
          <p className="text-sm text-text-secondary">
            Try adjusting your search query.
          </p>
        </div>);

    }
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-subtle text-text-muted">
              {columns.map((col, i) =>
              <th key={i} className="pb-3 font-medium px-4">
                  {col}
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-subtle">
            {data.map((row, i) =>
            <tr
              key={i}
              className="hover:bg-surface-hover transition-colors font-mono text-xs">
              
                {Object.values(row).map((val: any, j) =>
              <td
                key={j}
                className={`py-3 px-4 ${j === 0 ? 'text-cyan' : 'text-text-secondary'}`}>
                
                    {val}
                  </td>
              )}
              </tr>
            )}
          </tbody>
        </table>
      </div>);

  };
  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 pb-24">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary mb-2 flex items-center">
            <Database className="w-8 h-8 mr-3 text-cyan" />
            Memory Vault
          </h1>
          <p className="text-text-secondary text-sm">
            The central repository for all agent learnings, context, and
            historical data.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <div
            className={`w-2 h-2 rounded-full ${memory.syncStatus === 'synced' ? 'bg-success' : 'bg-warning animate-pulse'}`} />
          
          <span className="text-text-muted">
            {memory.syncStatus === 'synced' ? 'Synced' : 'Syncing...'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Vector Embeddings"
          value={memory.vectorCount.toLocaleString()}
          sublabel="Semantic search index"
          accentColor="violet" />
        
        <KPICard
          title="Graph Relationships"
          value={memory.graphRelationships.toLocaleString()}
          sublabel="Entity connections"
          accentColor="cyan" />
        
        <KPICard
          title="Structured Records"
          value={memory.structuredRecords.toLocaleString()}
          sublabel="PostgreSQL rows"
          accentColor="green" />
        
        <div className="bg-surface border border-subtle rounded-lg p-6 flex flex-col justify-center">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-text-secondary flex items-center">
              <HardDrive className="w-4 h-4 mr-2" /> Storage Used
            </h3>
            <span className="text-xs font-mono text-text-muted">
              {memory.totalGB} / {memory.limitGB} GB
            </span>
          </div>
          <div className="w-full h-2 bg-elevated rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan transition-all duration-1000"
              style={{
                width: `${storagePercentage}%`
              }} />
            
          </div>
        </div>
      </div>

      <div className="bg-surface border border-subtle rounded-lg overflow-hidden flex flex-col min-h-[500px]">
        <div className="p-4 border-b border-subtle flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex space-x-1 bg-elevated p-1 rounded-md border border-subtle">
            {(['vector', 'graph', 'structured'] as const).map((tab) =>
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === tab ? 'bg-surface text-cyan shadow' : 'text-text-muted hover:text-text-primary'}`}>
              
                {tab}
              </button>
            )}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search memories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-elevated border border-subtle rounded-md py-1.5 pl-9 pr-4 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-cyan transition-colors" />
            
          </div>
        </div>
        <div className="flex-1 p-0">{renderTable()}</div>
      </div>
    </div>);

}