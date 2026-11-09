import React, { useState } from 'react';
import { Server, ShieldCheck, Activity } from 'lucide-react';

interface TopologyNode {
  id: string;
  name: string;
  category: string;
  latency: string;
  uptime: string;
  status: 'ONLINE' | 'ACTIVE';
  description: string;
  details: string[];
}

const TOPOLOGY_NODES: TopologyNode[] = [
  {
    id: 'edge_cdn',
    name: 'Cloudflare Global Edge CDN',
    category: 'Edge Routing',
    latency: '8ms - 15ms',
    uptime: '99.99%',
    status: 'ONLINE',
    description: 'Anycast DNS and TLS 1.3 edge termination routing traffic across 300+ data centers globally with zero-origin bottlenecking.',
    details: ['Anycast BGP Routing', 'HTTP/3 & QUIC Protocol', 'Automated DDoS Mitigation', 'Zero Cold Starts'],
  },
  {
    id: 'workers_api',
    name: 'Serverless Workers API Mesh',
    category: 'Compute',
    latency: '< 10ms',
    uptime: '100%',
    status: 'ACTIVE',
    description: 'V8 isolate serverless microservices executing business logic, input validation, and session auth directly at the edge.',
    details: ['TypeScript Hono Framework', 'V8 Isolate Micro-tasks', 'Edge Middleware Pipeline', 'JWT Verification'],
  },
  {
    id: 'd1_database',
    name: 'Cloudflare D1 Transactional SQLite',
    category: 'Database',
    latency: '12ms',
    uptime: '99.98%',
    status: 'ONLINE',
    description: 'Distributed serverless relational database with read-replication at edge locations and parameterized SQL queries.',
    details: ['ACID Transactions', 'Automated Migrations', 'Edge Read Cache', 'Parameterized SQL Security'],
  },
  {
    id: 'r2_storage',
    name: 'Cloudflare R2 Object Storage',
    category: 'Storage',
    latency: '18ms',
    uptime: '99.99%',
    status: 'ONLINE',
    description: 'S3-compatible global asset bucket for 3D GLB models, compressed textures, and portfolio multimedia with zero egress fees.',
    details: ['Zero Egress Fees', 'S3 API Compatibility', 'Automatic CDN Edge Caching', 'Gzip/Brotli Compression'],
  },
  {
    id: 'ws_presence',
    name: 'Real-Time WebSocket Presence Server',
    category: 'Real-Time',
    latency: '15ms - 25ms',
    uptime: '99.99%',
    status: 'ONLINE',
    description: 'Bi-directional WebSocket relay synchronizing visitor avatars, 3D nametags, and coordinates at 25Hz across multiple browsers.',
    details: ['25Hz Coordinate Relays', 'Heartbeat Discovery', 'Seamless Multi-Tab & Device Sync', 'Automatic Stale Pruning'],
  },
];

export const ServerTopologyPanel: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('workers_api');
  const activeNode = TOPOLOGY_NODES.find((n) => n.id === selectedNodeId) || TOPOLOGY_NODES[0];

  return (
    <div className="flex flex-col h-[520px] bg-slate-950 rounded-2xl border border-cyan-500/40 overflow-hidden shadow-2xl font-mono text-xs text-slate-200">
      {/* Titlebar */}
      <div className="flex items-center justify-between px-5 py-3 bg-slate-900 border-b border-white/10 select-none">
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-white tracking-wider">
            INFRASTRUCTURE TELEMETRY // EDGE TOPOLOGY
          </span>
        </div>
        <div className="flex items-center gap-2 text-emerald-400 font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>DEMO DATA // NO LIVE NODES</span>
        </div>
      </div>

      <div role="note" className="border-b border-amber-400/20 bg-amber-500/10 px-5 py-2 text-center text-[11px] font-sans text-amber-200">
        Illustrative architecture only. Latency, uptime, memory, and provider details below are not live measurements.
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left: Interactive Topology Node List */}
        <div className="w-64 bg-slate-900/70 border-r border-white/10 p-3 space-y-2 select-none overflow-y-auto">
          <div className="text-[10px] font-bold uppercase text-slate-500 px-2 py-1">
            Connected Subsystems
          </div>

          {TOPOLOGY_NODES.map((node) => {
            const isSelected = selectedNodeId === node.id;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setSelectedNodeId(node.id)}
                className={`w-full p-3 rounded-xl border text-left transition-all flex flex-col gap-1 ${
                  isSelected
                    ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-lg shadow-cyan-950/50 ring-1 ring-cyan-400'
                    : 'bg-slate-800/40 border-white/5 text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold text-xs truncate">{node.name.split(' ')[0]} {node.name.split(' ')[1]}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">
                    {node.latency}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 truncate">{node.category}</div>
              </button>
            );
          })}
        </div>

        {/* Right: Node Deep Dive Inspection */}
        <div className="flex-1 p-6 bg-slate-950 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-white/10">
              <div>
                <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                  {activeNode.category} Node
                </div>
                <h3 className="text-base font-bold text-white mt-1">{activeNode.name}</h3>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-400">EXAMPLE LATENCY</div>
                <div className="text-xs font-bold text-emerald-400">{activeNode.latency}</div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {activeNode.description}
            </p>

            <div className="space-y-2 pt-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Architecture Specifications:
              </div>
              <div className="grid grid-cols-2 gap-2">
                {activeNode.details.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-900 border border-white/5 text-slate-200 flex items-center gap-2 text-xs"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Live Metrics Bar */}
          <div className="p-3 bg-black/60 rounded-xl border border-white/10 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>EXAMPLE UPTIME: {activeNode.uptime}</span>
            </span>
            <span>EXAMPLE MEMORY: 128 MB</span>
            <span>EXAMPLE EGRESS: $0.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};
