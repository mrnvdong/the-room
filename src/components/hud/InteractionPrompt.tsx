import React from 'react';
import { useInteractionStore } from '@/stores/useInteractionStore';
import { useInputStore } from '@/stores/useInputStore';
import { useI18nStore } from '@/stores/useI18nStore';
import { Sparkles, CornerDownLeft } from 'lucide-react';

export const InteractionPrompt: React.FC = () => {
  const activeNearObject = useInteractionStore((state) => state.activeNearObject);
  const activeModalObject = useInteractionStore((state) => state.activeModalObject);
  const triggerInteract = useInputStore((state) => state.triggerInteract);
  const isTouchDevice = useInputStore((state) => state.isTouchDevice);
  const language = useI18nStore((state) => state.language);

  if (!activeNearObject || activeModalObject) return null;

  return (
    <div className="pointer-events-auto cursor-pointer animate-bounce">
      <button
        type="button"
        onClick={triggerInteract}
        className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-900/90 text-white border border-sky-400/50 shadow-2xl backdrop-blur-xl hover:bg-slate-800 transition-all group"
      >
        <span className="flex items-center justify-center w-6 h-6 rounded bg-sky-500/20 text-sky-400 font-mono text-xs font-bold border border-sky-400/40">
          {isTouchDevice ? 'TAP' : 'E'}
        </span>
        <span className="text-sm font-semibold tracking-wide flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-sky-400" />
          <span>
            {language === 'vi' ? 'Khám phá' : 'Inspect'} {activeNearObject.displayName}
          </span>
        </span>
        <CornerDownLeft className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
      </button>
    </div>
  );
};
