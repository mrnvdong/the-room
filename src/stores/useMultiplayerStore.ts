import { create } from 'zustand';
import { VisitorIdentity } from '@/types';

export interface RemotePlayer {
  id: string;
  nickname: string;
  identity: VisitorIdentity;
  position: [number, number, number];
  rotationY: number;
  isMoving: boolean;
  isRunning: boolean;
  lastSeen: number;
}

export interface MultiplayerToast {
  id: string;
  message: string;
  type: 'join' | 'leave' | 'info';
}

interface MultiplayerStoreState {
  myClientId: string;
  remotePlayers: Map<string, RemotePlayer>;
  toasts: MultiplayerToast[];
  isMultiplayerActive: boolean;

  setMyClientId: (id: string) => void;
  updateRemotePlayer: (player: RemotePlayer) => void;
  removeRemotePlayer: (id: string) => void;
  addToast: (message: string, type?: 'join' | 'leave' | 'info') => void;
  removeToast: (id: string) => void;
  spawnDemoVisitor: (identity?: VisitorIdentity, name?: string) => void;
  removeDemoVisitor: (id: string) => void;
  cleanStalePlayers: (maxAgeMs?: number) => void;
}

const DEMO_NAMES = [
  'Minh Lead Dev',
  'Sarah Recruiter',
  'David Architect',
  'Chi Chi',
  'CyberBot-X',
  'Ghostly Dev',
];

export const useMultiplayerStore = create<MultiplayerStoreState>((set, get) => ({
  myClientId: `client_${Math.random().toString(36).substring(2, 9)}`,
  remotePlayers: new Map(),
  toasts: [],
  isMultiplayerActive: true,

  setMyClientId: (id) => set({ myClientId: id }),

  updateRemotePlayer: (player) =>
    set((state) => {
      const isNew = !state.remotePlayers.has(player.id);
      const newMap = new Map(state.remotePlayers);
      newMap.set(player.id, {
        ...player,
        lastSeen: Date.now(),
      });

      if (isNew) {
        get().addToast(`${player.nickname} joined the workspace!`, 'join');
      }

      return { remotePlayers: newMap };
    }),

  removeRemotePlayer: (id) =>
    set((state) => {
      const existing = state.remotePlayers.get(id);
      if (existing) {
        get().addToast(`${existing.nickname} left the workspace.`, 'leave');
      }
      const newMap = new Map(state.remotePlayers);
      newMap.delete(id);
      return { remotePlayers: newMap };
    }),

  addToast: (message, type = 'info') => {
    const id = `toast_${Date.now()}_${Math.random()}`;
    set((state) => ({
      toasts: [...state.toasts.slice(-4), { id, message, type }],
    }));
    setTimeout(() => {
      get().removeToast(id);
    }, 4000);
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),

  spawnDemoVisitor: (identity, name) => {
    const id = `demo_${Date.now()}`;
    const identities: VisitorIdentity[] = [
      'recruiter',
      'partner',
      'friend',
      'thief',
      'ghost',
      'robot',
      'mystery',
    ];
    const chosenIdentity =
      identity || identities[Math.floor(Math.random() * identities.length)];
    const chosenName =
      name || DEMO_NAMES[Math.floor(Math.random() * DEMO_NAMES.length)];

    // Random position in open area of room (X: [-3, 3], Z: [-2, 3])
    const rx = (Math.random() - 0.5) * 5;
    const rz = (Math.random() - 0.5) * 4;

    const demoPlayer: RemotePlayer = {
      id,
      nickname: chosenName,
      identity: chosenIdentity,
      position: [rx, 0, rz],
      rotationY: Math.random() * Math.PI * 2,
      isMoving: false,
      isRunning: false,
      lastSeen: Date.now(),
    };

    get().updateRemotePlayer(demoPlayer);
  },

  removeDemoVisitor: (id) => {
    get().removeRemotePlayer(id);
  },

  cleanStalePlayers: (maxAgeMs = 60000) => {
    const now = Date.now();
    set((state) => {
      let changed = false;
      const newMap = new Map(state.remotePlayers);
      for (const [id, player] of newMap.entries()) {
        // Keep demo players or players seen recently (timeout only for zombie ungraceful drops)
        if (!id.startsWith('demo_') && now - player.lastSeen > maxAgeMs) {
          newMap.delete(id);
          changed = true;
        }
      }
      return changed ? { remotePlayers: newMap } : state;
    });
  },
}));

if (typeof window !== 'undefined') {
  (window as unknown as { __MULTIPLAYER_STORE__: typeof useMultiplayerStore }).__MULTIPLAYER_STORE__ = useMultiplayerStore;
}

