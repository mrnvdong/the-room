import React from 'react';
import { VirtualJoystick } from './VirtualJoystick';
import { TouchLookArea } from './TouchLookArea';
import { useInputStore } from '@/stores/useInputStore';
import { useInteractionStore } from '@/stores/useInteractionStore';
import { Flame, Hand } from 'lucide-react';

export const MobileControls: React.FC = () => {
  const isRunning = useInputStore((state) => state.isRunning);
  const setRunning = useInputStore((state) => state.setRunning);
  const triggerInteract = useInputStore((state) => state.triggerInteract);
  const activeNearObject = useInteractionStore((state) => state.activeNearObject);

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {/* Right side touch camera look swipe area */}
      <TouchLookArea />

      {/* Left side: Joystick & Run Toggle */}
      <div className="absolute bottom-8 left-6 flex flex-col items-center gap-4 pointer-events-auto">
        {/* Run Toggle Button */}
        <button
          type="button"
          onClick={() => setRunning(!isRunning)}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-md border transition-all ${
            isRunning
              ? 'bg-amber-500/90 text-white border-amber-300 shadow-lg shadow-amber-500/30'
              : 'bg-slate-900/60 text-slate-300 border-white/20'
          }`}
          aria-label="Toggle Running Speed"
        >
          <Flame className="w-3.5 h-3.5" />
          <span>{isRunning ? 'Sprint ON' : 'Walk'}</span>
        </button>

        {/* Virtual Joystick */}
        <VirtualJoystick />
      </div>

      {/* Right side: Action / Interact Button */}
      <div className="absolute bottom-10 right-6 pointer-events-auto flex flex-col items-end gap-3">
        {activeNearObject && (
          <div className="text-right text-xs text-sky-300 font-medium bg-slate-900/80 px-2.5 py-1 rounded-md border border-sky-500/30 backdrop-blur-sm max-w-[160px] truncate">
            {activeNearObject.displayName}
          </div>
        )}

        <button
          type="button"
          onClick={triggerInteract}
          disabled={!activeNearObject}
          className={`w-16 h-16 rounded-full flex flex-col items-center justify-center gap-0.5 border shadow-2xl transition-all active:scale-95 ${
            activeNearObject
              ? 'bg-gradient-to-tr from-sky-600 to-cyan-500 text-white border-sky-300 shadow-sky-500/40 ring-4 ring-sky-500/30 animate-pulse'
              : 'bg-slate-900/50 text-slate-500 border-white/10 opacity-60'
          }`}
          aria-label="Interact / Inspect Object"
        >
          <Hand className="w-6 h-6" />
          <span className="text-[10px] font-bold tracking-wider uppercase">Tap [E]</span>
        </button>
      </div>
    </div>
  );
};
