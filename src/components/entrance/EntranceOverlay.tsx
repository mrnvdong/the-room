import React, { useState } from 'react';
import { useGameStore } from '@/stores/useGameStore';
import { useI18nStore } from '@/stores/useI18nStore';
import { IDENTITY_LIST, VISITOR_IDENTITIES } from '@/features/visitor/identityData';
import { AvatarPreview } from '@/game/characters/AvatarPreview';
import { VisitorIdentity } from '@/types';
import {
  Bell,
  Camera,
  DoorOpen,
  FastForward,
  Sparkles,
  Volume2,
  VolumeX,
  Globe,
  FileText,
} from 'lucide-react';

interface EntranceOverlayProps {
  doorbellAlert?: string | null;
  cameraAlert?: string | null;
  onRingDoorbell?: () => void;
  onCameraScan?: () => void;
}

export const EntranceOverlay: React.FC<EntranceOverlayProps> = ({
  doorbellAlert,
  cameraAlert,
  onRingDoorbell,
  onCameraScan,
}) => {
  const gameState = useGameStore((state) => state.gameState);
  const setGameState = useGameStore((state) => state.setGameState);
  const setViewMode = useGameStore((state) => state.setViewMode);
  const visitorNickname = useGameStore((state) => state.visitorNickname);
  const visitorIdentity = useGameStore((state) => state.visitorIdentity);
  const setVisitor = useGameStore((state) => state.setVisitor);
  const soundEnabled = useGameStore((state) => state.soundEnabled);
  const toggleSound = useGameStore((state) => state.toggleSound);

  const t = useI18nStore((state) => state.t);
  const language = useI18nStore((state) => state.language);
  const toggleLanguage = useI18nStore((state) => state.toggleLanguage);

  const [localNickname, setLocalNickname] = useState(
    visitorNickname === 'Visitor' ? '' : visitorNickname
  );
  const [selectedIdentity, setSelectedIdentity] = useState<VisitorIdentity>(visitorIdentity);

  // During cinematic, render a clean cinematic HUD with Skip button
  if (gameState === 'ENTERING') {
    return (
      <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-between p-6 bg-black/20 backdrop-blur-[2px] transition-all">
        <div className="flex justify-between items-center w-full">
          <div className="bg-slate-900/80 px-4 py-2 rounded-xl border border-sky-500/30 text-xs font-mono text-sky-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            <span>{language === 'vi' ? 'ĐANG BƯỚC VÀO PHÒNG // ĐÃ CẤP QUYỀN' : 'ENTERING WORKSPACE // ACCESS GRANTED'}</span>
          </div>
          <button
            type="button"
            data-testid="skip-cinematic-button"
            onClick={() => setGameState('EXPLORING')}
            className="pointer-events-auto flex items-center gap-2 px-4 py-2 bg-slate-900/90 hover:bg-slate-800 text-white rounded-xl border border-white/20 text-xs font-semibold shadow-2xl transition-all"
          >
            <FastForward className="w-4 h-4 text-sky-400" />
            <span>{t.skipCinematic}</span>
          </button>
        </div>

        <div className="text-center pb-8">
          <div className="inline-block px-6 py-2.5 rounded-full bg-slate-900/90 border border-white/10 text-white font-medium text-sm backdrop-blur-md shadow-2xl">
            {language === 'vi' ? 'Chào mừng,' : 'Welcome,'} <span className="text-sky-400 font-bold">{visitorNickname}</span>. {language === 'vi' ? "Đang mở cửa phòng của Dong..." : "Entering Dong's Workspace..."}
          </div>
        </div>
      </div>
    );
  }

  const handleIdentitySelect = (id: VisitorIdentity) => {
    setSelectedIdentity(id);
    const chosenName = localNickname.trim() || 'Visitor';
    setVisitor(chosenName, id);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.slice(0, 30); // Max 30 chars
    setLocalNickname(val);
    setVisitor(val.trim() || 'Visitor', selectedIdentity);
  };

  const handleEnterWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = localNickname.trim() || 'Visitor';
    setVisitor(finalName, selectedIdentity);
    setGameState('ENTERING');
  };

  const currentIdentityConfig = VISITOR_IDENTITIES[selectedIdentity];

  return (
    <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between p-4 md:p-6 overflow-y-auto">
      {/* Top Header */}
      <header className="flex items-center justify-between w-full pointer-events-auto">
        <div className="bg-slate-900/85 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 shadow-xl flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <div>
            <div className="text-xs font-bold text-white tracking-wider uppercase">
              {t.workspaceTitle}
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              3D Interactive Virtual Studio // v1.0
            </div>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Switch to 2D Mode */}
          <button
            type="button"
            onClick={() => setViewMode('2d')}
            title="Switch to 2D Accessible Portfolio"
            className="px-3 py-2 rounded-xl bg-slate-900/85 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 backdrop-blur-md transition-colors shadow-lg flex items-center gap-1.5 text-xs font-semibold"
          >
            <FileText className="w-4 h-4 text-sky-400" />
            <span className="hidden sm:inline">{t.twoDMode}</span>
          </button>

          {/* Language Switcher */}
          <button
            type="button"
            onClick={toggleLanguage}
            title="Toggle Language: English / Tiếng Việt"
            className="px-3 py-2 rounded-xl bg-slate-900/85 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 backdrop-blur-md transition-colors shadow-lg flex items-center gap-1.5 text-xs font-mono font-bold"
          >
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>{language.toUpperCase()}</span>
          </button>

          {onRingDoorbell && (
            <button
              type="button"
              onClick={onRingDoorbell}
              title="Ring Entrance Doorbell"
              className="p-2.5 rounded-xl bg-slate-900/85 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 backdrop-blur-md transition-colors shadow-lg flex items-center gap-1.5 text-xs font-semibold"
            >
              <Bell className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">{language === 'vi' ? 'Chuông' : 'Doorbell'}</span>
            </button>
          )}

          {onCameraScan && (
            <button
              type="button"
              onClick={onCameraScan}
              title="Security Camera Scan"
              className="p-2.5 rounded-xl bg-slate-900/85 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 backdrop-blur-md transition-colors shadow-lg flex items-center gap-1.5 text-xs font-semibold"
            >
              <Camera className="w-4 h-4 text-sky-400" />
              <span className="hidden sm:inline">{language === 'vi' ? 'Camera' : 'Scan'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={toggleSound}
            title={soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
            className="p-2.5 rounded-xl bg-slate-900/85 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 backdrop-blur-md transition-colors shadow-lg"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-sky-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>
        </div>
      </header>

      {/* Alert Toasts */}
      <div className="flex flex-col gap-2 items-center my-2 pointer-events-auto">
        {doorbellAlert && (
          <div className="px-4 py-2 bg-amber-500/90 text-slate-950 font-semibold text-xs rounded-xl shadow-xl backdrop-blur-md animate-bounce flex items-center gap-2">
            <Bell className="w-4 h-4" />
            <span>{doorbellAlert}</span>
          </div>
        )}
        {cameraAlert && (
          <div className="px-4 py-2 bg-sky-500/90 text-slate-950 font-semibold text-xs rounded-xl shadow-xl backdrop-blur-md animate-pulse flex items-center gap-2">
            <Camera className="w-4 h-4" />
            <span>{cameraAlert}</span>
          </div>
        )}
      </div>

      {/* Main Visitor Identity Form Card */}
      <div className="pointer-events-auto max-w-xl w-full mx-auto my-auto bg-slate-900/90 border border-white/15 rounded-3xl p-5 md:p-6 shadow-2xl backdrop-blur-xl space-y-5">
        <form onSubmit={handleEnterWorkspace} className="space-y-4">
          {/* Nickname Input */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label htmlFor="nickname" className="font-mono text-sky-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.nicknameLabel}</span>
              </label>
              <span className="text-slate-400 font-mono text-[11px]">
                {localNickname.length}/30
              </span>
            </div>
            <input
              id="nickname"
              type="text"
              value={localNickname}
              onChange={handleNicknameChange}
              placeholder={t.nicknamePlaceholder}
              maxLength={30}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 text-white placeholder-slate-500 text-sm outline-none transition-all font-sans"
            />
          </div>

          {/* Archetype Selector */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider">
              {t.selectRole}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {IDENTITY_LIST.map((ident) => {
                const isSelected = selectedIdentity === ident.id;
                return (
                  <button
                    key={ident.id}
                    type="button"
                    data-testid={`role-${ident.id}`}
                    onClick={() => handleIdentitySelect(ident.id)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-sky-500/20 border-sky-400 text-white shadow-lg shadow-sky-500/20 scale-[1.02]'
                        : 'bg-slate-950/40 border-white/5 text-slate-400 hover:text-white hover:bg-slate-800/40'
                    }`}
                  >
                    <span className="text-xl mb-1">{ident.badge}</span>
                    <span className="text-xs font-semibold leading-tight line-clamp-1">
                      {language === 'vi' ? ident.nameVi : ident.nameEn}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live 3D Avatar Turntable Preview */}
          <div className="h-36 rounded-2xl bg-slate-950/70 border border-white/10 overflow-hidden relative shadow-inner">
            <AvatarPreview identity={selectedIdentity} />
            <div className="absolute bottom-2 left-3 pointer-events-none text-[11px] font-mono text-sky-400/90 bg-slate-900/80 px-2.5 py-1 rounded-md border border-white/5">
              <span>{currentIdentityConfig.badge} {language === 'vi' ? currentIdentityConfig.nameVi : currentIdentityConfig.nameEn}</span>
            </div>
          </div>

          {/* Enter Button */}
          <button
            type="submit"
            data-testid="enter-room-button"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-sky-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <DoorOpen className="w-5 h-5" />
            <span>{t.enterRoom}</span>
          </button>
        </form>
      </div>

      {/* Footer Instructions */}
      <footer className="text-center py-2 text-[11px] font-mono text-slate-400 pointer-events-auto">
        <span>{t.tagline}</span>
      </footer>
    </div>
  );
};
