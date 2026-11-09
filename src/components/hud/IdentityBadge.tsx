import React from 'react';
import { useGameStore } from '@/stores/useGameStore';
import { VISITOR_IDENTITIES } from '@/features/visitor/identityData';
import { RefreshCw } from 'lucide-react';

export const IdentityBadge: React.FC = () => {
  const visitorNickname = useGameStore((state) => state.visitorNickname);
  const visitorIdentity = useGameStore((state) => state.visitorIdentity);
  const setGameState = useGameStore((state) => state.setGameState);

  const identityConfig = VISITOR_IDENTITIES[visitorIdentity] || VISITOR_IDENTITIES.visitor;

  return (
    <div
      onClick={() => setGameState('IDENTIFICATION')}
      className="flex items-center gap-3 bg-slate-900/85 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 shadow-lg pointer-events-auto cursor-pointer hover:border-sky-400/40 transition-all group"
      title="Click to Switch Avatar or Role"
    >
      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white text-base shadow-inner group-hover:scale-105 transition-transform">
        {identityConfig.badge}
      </div>
      <div>
        <div className="text-xs font-bold text-white tracking-wide uppercase">
          {visitorNickname}
        </div>
        <div className="text-[11px] text-sky-400 font-medium capitalize flex items-center gap-1">
          <span>{identityConfig.nameEn}</span>
        </div>
      </div>
      <RefreshCw className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400 transition-colors ml-1" />
    </div>
  );
};
