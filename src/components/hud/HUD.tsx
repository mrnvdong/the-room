import React, { useState, useEffect } from 'react';
import { IdentityBadge } from './IdentityBadge';
import { MultiplayerBadge } from './MultiplayerBadge';
import { MultiplayerToasts } from './MultiplayerToasts';
import { InteractionPrompt } from './InteractionPrompt';
import { ControlsHelp } from './ControlsHelp';
import { InRoomChat } from './InRoomChat';
import { EmoteBar } from './EmoteBar';
import { MobileControls } from '../mobile/MobileControls';
import { Modal } from '../ui/Modal';
import { AdminModal } from '../admin/AdminModal';
import { useGameStore } from '@/stores/useGameStore';
import { useInputStore } from '@/stores/useInputStore';
import { useRoomStateStore } from '@/stores/useRoomStateStore';
import { useI18nStore } from '@/stores/useI18nStore';
import { useExplorationStore } from '@/stores/useExplorationStore';
import {
  Volume2,
  VolumeX,
  HelpCircle,
  Smartphone,
  Monitor,
  Eye,
  Armchair,
  Globe,
  FileText,
  Info,
  X,
  Compass,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export const HUD: React.FC = () => {
  const [showHelp, setShowHelp] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showRoleWelcome, setShowRoleWelcome] = useState(true);

  const soundEnabled = useGameStore((state) => state.soundEnabled);
  const toggleSound = useGameStore((state) => state.toggleSound);
  const setViewMode = useGameStore((state) => state.setViewMode);
  const visitorIdentity = useGameStore((state) => state.visitorIdentity);

  const isTouchDevice = useInputStore((state) => state.isTouchDevice);
  const setIsTouchDevice = useInputStore((state) => state.setIsTouchDevice);

  const isWindowLookout = useRoomStateStore((state) => state.isWindowLookout);
  const setWindowLookout = useRoomStateStore((state) => state.setWindowLookout);
  const isSittingOnSofa = useRoomStateStore((state) => state.isSittingOnSofa);
  const setSittingOnSofa = useRoomStateStore((state) => state.setSittingOnSofa);

  const t = useI18nStore((state) => state.t);
  const language = useI18nStore((state) => state.language);
  const toggleLanguage = useI18nStore((state) => state.toggleLanguage);

  const discoveredZoneIds = useExplorationStore((state) => state.discoveredZoneIds);
  const justDiscoveredZone = useExplorationStore((state) => state.justDiscoveredZone);
  const clearNotification = useExplorationStore((state) => state.clearNotification);

  // Auto detect touch device on mount
  useEffect(() => {
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (hasTouch) {
      setIsTouchDevice(true);
    }
  }, [setIsTouchDevice]);

  // Handle escape to exit special camera modes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isWindowLookout) setWindowLookout(false);
        if (isSittingOnSofa) setSittingOnSofa(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isWindowLookout, setWindowLookout, isSittingOnSofa, setSittingOnSofa]);

  // Role-specific greeting text
  const getRoleWelcomeMessage = () => {
    switch (visitorIdentity) {
      case 'recruiter':
        return t.welcomeRecruiter;
      case 'partner':
        return t.welcomePartner;
      case 'friend':
        return t.welcomeFriend;
      default:
        return t.welcomeDefault;
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-10 flex flex-col justify-between p-4 md:p-6">
      {/* Top Header Bar */}
      <header className="flex flex-wrap items-center justify-between w-full gap-3">
        {/* Visitor Identity Badge & Online Visitor Count & Exploration Progress */}
        <div className="flex items-center gap-3">
          <IdentityBadge />
          <MultiplayerBadge />
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs font-mono text-slate-300 backdrop-blur-md shadow-lg pointer-events-auto">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-white">{discoveredZoneIds.length}/6</span>
            <span className="text-slate-400 text-[10px]">
              ({Math.round((discoveredZoneIds.length / 6) * 100)}%)
            </span>
          </div>
        </div>

        {/* Global Controls & Utility Icons */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Switch to 2D Accessible Portfolio */}
          <button
            type="button"
            onClick={() => setViewMode('2d')}
            title="Switch to Non-3D Accessible 2D Portfolio"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 backdrop-blur-md transition-colors shadow-lg text-xs font-semibold"
          >
            <FileText className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">{t.twoDMode}</span>
          </button>

          {/* Language Switcher (EN / VI) */}
          <button
            type="button"
            onClick={toggleLanguage}
            title="Toggle Language: English / Tiếng Việt"
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 backdrop-blur-md transition-colors shadow-lg text-xs font-mono font-bold"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>{language.toUpperCase()}</span>
          </button>

          {/* Toggle Touch Controls on/off for easy testing on any device */}
          <button
            type="button"
            onClick={() => setIsTouchDevice(!isTouchDevice)}
            title={isTouchDevice ? 'Switch to Desktop Controls' : 'Switch to Mobile Controls'}
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 backdrop-blur-md transition-colors shadow-lg"
            aria-label="Toggle mobile / desktop controls mode"
          >
            {isTouchDevice ? <Smartphone className="w-4 h-4 text-sky-400" /> : <Monitor className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Audio Mute/Unmute */}
          <button
            type="button"
            onClick={toggleSound}
            title={soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 backdrop-blur-md transition-colors shadow-lg"
            aria-label="Toggle sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-sky-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Admin Control Center Button */}
          <button
            type="button"
            onClick={() => setShowAdmin(true)}
            title="Admin Control Center"
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 backdrop-blur-md transition-colors shadow-lg"
            aria-label="Admin control center"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </button>

          {/* Help Modal Button */}
          <button
            type="button"
            onClick={() => setShowHelp(true)}
            title="Controls Guide"
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 backdrop-blur-md transition-colors shadow-lg"
            aria-label="Controls guide"
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </header>

      {/* Exploration Zone Discovery Notification */}
      {justDiscoveredZone && (
        <div className="pointer-events-auto mx-auto my-1.5 px-4 py-2 bg-gradient-to-r from-amber-600/90 to-amber-500/90 text-white rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-2 text-xs font-semibold animate-bounce">
          <Sparkles className="w-4 h-4 text-yellow-200" />
          <span>
            {language === 'vi' ? 'Khu vực mới khám phá:' : 'New Zone Discovered:'}{' '}
            {language === 'vi' ? justDiscoveredZone.nameVi : justDiscoveredZone.nameEn}
          </span>
          <button type="button" onClick={clearNotification} className="ml-2 hover:opacity-80">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Role-Specific Welcoming Toast Banner */}
      {showRoleWelcome && (
        <div className="pointer-events-auto mx-auto max-w-xl my-2 p-3.5 bg-slate-900/95 border border-sky-500/30 rounded-2xl shadow-2xl backdrop-blur-xl flex items-start gap-3 animate-fadeIn">
          <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-200 leading-relaxed font-sans flex-1">
            {getRoleWelcomeMessage()}
          </p>
          <button
            type="button"
            onClick={() => setShowRoleWelcome(false)}
            className="text-slate-500 hover:text-white transition-colors p-0.5"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Special State Banners (Lookout mode / Sofa sitting) */}
      {isWindowLookout && (
        <div className="pointer-events-auto mx-auto my-2 p-3 bg-slate-900/90 border border-sky-400/40 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-4 text-xs font-mono text-sky-300 animate-fadeIn">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-sky-400 animate-pulse" />
            <span>{t.lookoutModeActive}</span>
          </div>
          <button
            type="button"
            onClick={() => setWindowLookout(false)}
            className="px-3 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded font-sans font-semibold transition-colors"
          >
            {t.exitLookout}
          </button>
        </div>
      )}

      {isSittingOnSofa && (
        <div className="pointer-events-auto mx-auto my-2 p-3 bg-slate-900/90 border border-amber-400/40 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-4 text-xs font-mono text-amber-300 animate-fadeIn">
          <div className="flex items-center gap-2">
            <Armchair className="w-4 h-4 text-amber-400" />
            <span>{t.relaxingOnSofa}</span>
          </div>
          <button
            type="button"
            onClick={() => setSittingOnSofa(false)}
            className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded font-sans font-semibold transition-colors"
          >
            {t.standUp}
          </button>
        </div>
      )}

      {/* Multiplayer Join/Leave Notifications */}
      <MultiplayerToasts />

      {/* Real-time In-Room Chat & Preset Phrases */}
      <InRoomChat />

      {/* Character Habits, Actions & Emotes Bar */}
      <EmoteBar />

      {/* Center Bottom: Contextual Interaction Prompt (Desktop or Tablet) */}
      <div className="flex justify-center w-full mb-8 pointer-events-none">
        <InteractionPrompt />
      </div>

      {/* Mobile Touch Controls Layer */}
      {isTouchDevice && <MobileControls />}

      {/* Help Modal */}
      {showHelp && <ControlsHelp onClose={() => setShowHelp(false)} />}

      {/* Active Object Modal (Dialog) */}
      <Modal />

      {/* Admin Dashboard Modal */}
      <AdminModal isOpen={showAdmin} onClose={() => setShowAdmin(false)} />
    </div>
  );
};
