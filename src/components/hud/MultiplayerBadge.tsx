import React from 'react';
import { useMultiplayerStore } from '@/stores/useMultiplayerStore';
import { Users, UserPlus } from 'lucide-react';

export const MultiplayerBadge: React.FC = () => {
  const remotePlayers = useMultiplayerStore((state) => state.remotePlayers);
  const spawnDemoVisitor = useMultiplayerStore((state) => state.spawnDemoVisitor);

  const totalCount = 1 + remotePlayers.size;

  return (
    <div className="flex items-center gap-2 pointer-events-auto">
      {/* Online Visitor Count Pill */}
      <div data-testid="multiplayer-badge" className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-white/10 text-xs shadow-lg">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <Users className="w-3.5 h-3.5 text-sky-400" />
        <span className="font-semibold text-white">
          {totalCount} {totalCount === 1 ? 'Visitor' : 'Visitors'}
        </span>
      </div>

      {/* Button to simulate an additional visitor joining (for easy testing) */}
      <button
        type="button"
        onClick={() => spawnDemoVisitor()}
        title="Simulate / Add Another Visitor"
        className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-900/85 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 backdrop-blur-md transition-all text-xs font-medium shadow-lg"
      >
        <UserPlus className="w-3.5 h-3.5 text-emerald-400" />
        <span className="hidden sm:inline">+ Co-visitor</span>
      </button>
    </div>
  );
};
