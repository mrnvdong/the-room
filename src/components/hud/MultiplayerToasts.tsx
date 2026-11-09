import React from 'react';
import { useMultiplayerStore } from '@/stores/useMultiplayerStore';
import { UserCheck, UserMinus, Info } from 'lucide-react';

export const MultiplayerToasts: React.FC = () => {
  const toasts = useMultiplayerStore((state) => state.toasts);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-6 z-40 flex flex-col gap-2 pointer-events-none max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-fade-in flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-900/95 border border-sky-500/30 text-white text-xs shadow-2xl backdrop-blur-md"
        >
          {toast.type === 'join' && (
            <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          {toast.type === 'leave' && (
            <UserMinus className="w-4 h-4 text-amber-400 shrink-0" />
          )}
          {toast.type === 'info' && (
            <Info className="w-4 h-4 text-sky-400 shrink-0" />
          )}
          <span className="font-medium text-slate-200">{toast.message}</span>
        </div>
      ))}
    </div>
  );
};
