import { create } from 'zustand';
import { GameState, VisitorIdentity, QualityPreset, VisitorSession } from '@/types';

interface GameStoreState {
  gameState: GameState;
  viewMode: '3d' | '2d';
  visitorNickname: string;
  visitorIdentity: VisitorIdentity;
  discoveredAreas: string[];
  soundEnabled: boolean;
  qualityPreset: QualityPreset;
  session: VisitorSession | null;

  setGameState: (state: GameState) => void;
  setViewMode: (mode: '3d' | '2d') => void;
  setVisitor: (nickname: string, identity: VisitorIdentity) => void;
  discoverArea: (areaId: string) => void;
  toggleSound: () => void;
  setQualityPreset: (preset: QualityPreset) => void;
  initializeSession: () => void;
}

const getInitialViewMode = (): '3d' | '2d' => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    if (params.get('mode') === '2d') return '2d';
  }
  return '3d';
};

export const useGameStore = create<GameStoreState>((set, get) => ({
  gameState: 'IDENTIFICATION', // Start at Entrance identification for visitor journey
  viewMode: getInitialViewMode(),
  visitorNickname: 'Visitor',
  visitorIdentity: 'visitor',
  discoveredAreas: ['entrance'],
  soundEnabled: true,
  qualityPreset: 'medium',
  session: null,

  setGameState: (state) => {
    // If entering room, register main_room as discovered
    if (state === 'EXPLORING') {
      get().discoverArea('main_room');
    }
    set({ gameState: state });
  },

  setViewMode: (mode) => set({ viewMode: mode }),

  setVisitor: (nickname, identity) => {
    const prevSession = get().session;
    const updatedSession: VisitorSession = prevSession
      ? { ...prevSession, nickname, identity }
      : {
          sessionId: `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          nickname,
          identity,
          startedAt: new Date().toISOString(),
          deviceType: window.innerWidth < 768 ? 'mobile' : 'desktop',
          language: 'en',
        };

    set({
      visitorNickname: nickname,
      visitorIdentity: identity,
      session: updatedSession,
    });
  },

  discoverArea: (areaId) =>
    set((state) => ({
      discoveredAreas: state.discoveredAreas.includes(areaId)
        ? state.discoveredAreas
        : [...state.discoveredAreas, areaId],
    })),

  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  setQualityPreset: (preset) => set({ qualityPreset: preset }),

  initializeSession: () => {
    if (!get().session) {
      const newSession: VisitorSession = {
        sessionId: `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        nickname: get().visitorNickname,
        identity: get().visitorIdentity,
        startedAt: new Date().toISOString(),
        deviceType: window.innerWidth < 768 ? 'mobile' : 'desktop',
        language: 'en',
      };
      set({ session: newSession });
    }
  },
}));
