import React, { useEffect } from 'react';
import { useGameStore } from '@/stores/useGameStore';
import { useI18nStore } from '@/stores/useI18nStore';
import { useMultiplayerStore } from '@/stores/useMultiplayerStore';
import {
  getActionsForIdentity,
  CHARACTER_ACTIONS,
  CharacterActionId,
} from '@/features/character/characterActions';
import { VISITOR_IDENTITIES } from '@/features/visitor/identityData';
import { Sparkles, X, Armchair } from 'lucide-react';

export const EmoteBar: React.FC = () => {
  const visitorIdentity = useGameStore((state) => state.visitorIdentity);
  const currentLang = useI18nStore((state) => state.language);

  const isEmoteBarOpen = useMultiplayerStore((state) => state.isEmoteBarOpen);
  const toggleEmoteBarOpen = useMultiplayerStore((state) => state.toggleEmoteBarOpen);
  const setEmoteBarOpen = useMultiplayerStore((state) => state.setEmoteBarOpen);
  const triggerLocalAction = useMultiplayerStore((state) => state.triggerLocalAction);
  const localAction = useMultiplayerStore((state) => state.localAction);
  const isLocalSitting = useMultiplayerStore((state) => state.isLocalSitting);
  const toggleLocalSitting = useMultiplayerStore((state) => state.toggleLocalSitting);

  const identityConfig = VISITOR_IDENTITIES[visitorIdentity] || VISITOR_IDENTITIES.visitor;
  const actions = getActionsForIdentity(visitorIdentity);

  // Keyboard shortcut: Press 'B' to toggle emote panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.key === 'b' || e.key === 'B') {
        e.preventDefault();
        toggleEmoteBarOpen();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleLocalSitting();
      } else if (e.key === 'Escape' && isEmoteBarOpen) {
        setEmoteBarOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleEmoteBarOpen, toggleLocalSitting, isEmoteBarOpen, setEmoteBarOpen]);

  const handleActionClick = (id: CharacterActionId) => {
    triggerLocalAction(id);
  };

  return (
    <>
      {/* Floating Action Bar Button on Bottom Right HUD */}
      <div className="fixed bottom-6 right-6 z-30 flex items-center gap-2">
        {/* Quick Sit / Stand Button */}
        <button
          onClick={toggleLocalSitting}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold shadow-xl backdrop-blur-md transition-all duration-200 border ${
            isLocalSitting
              ? 'bg-amber-500/90 text-slate-950 border-amber-300 ring-2 ring-amber-400/50 scale-105'
              : 'bg-slate-900/80 text-white border-white/10 hover:bg-slate-800 hover:border-amber-400/50'
          }`}
          title="Phím tắt: F (Ngồi ghế / Đứng dậy)"
        >
          <Armchair className="w-4 h-4 text-amber-400" />
          <span>{isLocalSitting ? (currentLang === 'vi' ? 'Đứng dậy [F]' : 'Stand Up [F]') : (currentLang === 'vi' ? 'Ngồi xuống [F]' : 'Sit Down [F]')}</span>
        </button>

        {/* Emote Panel Toggle Button */}
        <button
          onClick={toggleEmoteBarOpen}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold shadow-xl backdrop-blur-md transition-all duration-200 border ${
            isEmoteBarOpen || localAction
              ? 'bg-sky-500/90 text-white border-sky-300 ring-2 ring-sky-400/50'
              : 'bg-slate-900/80 text-white border-white/10 hover:bg-slate-800 hover:border-sky-400/50'
          }`}
          title="Phím tắt: B (Bảng Hành động & Cử chỉ)"
        >
          <Sparkles className="w-4 h-4 text-sky-400 animate-spin-slow" />
          <span>{currentLang === 'vi' ? 'Hành động [B]' : 'Emotes [B]'}</span>
          {localAction && (
            <span className="ml-1 text-sm">{CHARACTER_ACTIONS[localAction]?.emoji}</span>
          )}
        </button>
      </div>

      {/* Expanded Action & Emote Menu Drawer */}
      {isEmoteBarOpen && (
        <div className="fixed bottom-20 right-6 z-30 w-80 sm:w-96 rounded-2xl bg-slate-950/95 border border-sky-400/30 shadow-2xl backdrop-blur-xl p-4 animate-scale-in text-white">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-xl">{identityConfig.badge}</span>
              <div>
                <h3 className="text-sm font-bold tracking-wide text-white flex items-center gap-1.5">
                  {currentLang === 'vi' ? 'Bộ Kỹ Năng & Thói Quen' : 'Character Habits & Emotes'}
                </h3>
                <p className="text-[10px] text-sky-400 font-medium">
                  {currentLang === 'vi' ? identityConfig.nameVi : identityConfig.nameEn}
                </p>
              </div>
            </div>
            <button
              onClick={() => setEmoteBarOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Action List Grid */}
          <div className="mt-3 max-h-72 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
            {/* 1. Signature Role Actions */}
            <div>
              <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <span>🌟</span>
                <span>{currentLang === 'vi' ? 'Kỹ năng đặc thù vai trò' : 'Role Signature Actions'}</span>
              </p>
              <div className="grid grid-cols-2 gap-2">
                {actions
                  .filter((a) => a.forIdentities)
                  .map((action) => {
                    const isActive = localAction === action.id;
                    return (
                      <button
                        key={action.id}
                        onClick={() => handleActionClick(action.id)}
                        className={`flex items-start gap-2 p-2 rounded-xl text-left transition-all border ${
                          isActive
                            ? 'bg-amber-500/20 border-amber-400 text-amber-200 ring-1 ring-amber-400/40'
                            : 'bg-slate-900/70 border-white/5 hover:bg-slate-800 hover:border-amber-400/30 text-slate-200'
                        }`}
                      >
                        <span className="text-xl flex-shrink-0 mt-0.5">{action.emoji}</span>
                        <div>
                          <div className="text-xs font-semibold leading-tight text-white">
                            {currentLang === 'vi' ? action.labelVi : action.labelEn}
                          </div>
                          <div className="text-[10px] text-slate-400 leading-tight mt-0.5 line-clamp-2">
                            {currentLang === 'vi' ? action.descriptionVi : action.descriptionEn}
                          </div>
                        </div>
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* 2. Universal Actions */}
            <div>
              <p className="text-[11px] font-bold text-sky-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <span>🌐</span>
                <span>{currentLang === 'vi' ? 'Cử chỉ phổ biến' : 'Universal Emotes'}</span>
              </p>
              <div className="grid grid-cols-2 gap-2">
                {actions
                  .filter((a) => !a.forIdentities)
                  .map((action) => {
                    const isActive = localAction === action.id;
                    return (
                      <button
                        key={action.id}
                        onClick={() => handleActionClick(action.id)}
                        className={`flex items-center gap-2 p-2 rounded-xl text-left transition-all border ${
                          isActive
                            ? 'bg-sky-500/20 border-sky-400 text-sky-200 ring-1 ring-sky-400/40'
                            : 'bg-slate-900/70 border-white/5 hover:bg-slate-800 hover:border-sky-400/30 text-slate-200'
                        }`}
                      >
                        <span className="text-xl flex-shrink-0">{action.emoji}</span>
                        <div className="text-xs font-semibold text-white leading-tight">
                          {currentLang === 'vi' ? action.labelVi : action.labelEn}
                        </div>
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
