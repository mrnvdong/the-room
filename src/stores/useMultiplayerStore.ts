import { create } from 'zustand';
import { VisitorIdentity } from '@/types';
import { CharacterActionId, CHARACTER_ACTIONS } from '@/features/character/characterActions';
import { soundManager } from '@/features/audio/soundManager';

export interface RemotePlayer {
  id: string;
  nickname: string;
  identity: VisitorIdentity;
  position: [number, number, number];
  rotationY: number;
  isMoving: boolean;
  isRunning: boolean;
  currentAction?: CharacterActionId | null;
  actionStartTime?: number;
  isSitting?: boolean;
  chatMessage?: string | null;
  chatExpiresAt?: number;
  lastSeen: number;
}

export interface MultiplayerToast {
  id: string;
  message: string;
  type: 'join' | 'leave' | 'info';
}

export interface InRoomChatMessage {
  id: string;
  senderId: string;
  nickname: string;
  identity: VisitorIdentity;
  text: string;
  timestamp: number;
}

interface MultiplayerStoreState {
  myClientId: string;
  remotePlayers: Map<string, RemotePlayer>;
  toasts: MultiplayerToast[];
  chatMessages: InRoomChatMessage[];
  isMultiplayerActive: boolean;

  // Local character interactive states
  localAction: CharacterActionId | null;
  localActionStartTime: number;
  isLocalSitting: boolean;
  localChatMessage: string | null;
  localChatExpiresAt: number;
  isChatOpen: boolean;
  isEmoteBarOpen: boolean;

  setMyClientId: (id: string) => void;
  updateRemotePlayer: (player: RemotePlayer) => void;
  removeRemotePlayer: (id: string) => void;
  addToast: (message: string, type?: 'join' | 'leave' | 'info') => void;
  removeToast: (id: string) => void;

  // Chat Actions
  addChatMessage: (msg: InRoomChatMessage) => void;
  setLocalChatMessage: (text: string | null) => void;
  setChatOpen: (open: boolean) => void;
  toggleChatOpen: () => void;

  // Action / Emote
  setEmoteBarOpen: (open: boolean) => void;
  toggleEmoteBarOpen: () => void;
  triggerLocalAction: (actionId: CharacterActionId) => void;
  clearLocalAction: () => void;
  setLocalSitting: (isSitting: boolean) => void;
  toggleLocalSitting: () => void;

  // Demo bots & lifecycle
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
  chatMessages: [
    {
      id: 'welcome_chat',
      senderId: 'system',
      nickname: 'System',
      identity: 'visitor',
      text: 'Chào mừng bạn đến với THE ROOM! Bấm [C] hoặc icon Chat để trò chuyện, bấm [B] để thực hiện cử chỉ.',
      timestamp: Date.now(),
    },
  ],
  isMultiplayerActive: true,

  localAction: null,
  localActionStartTime: 0,
  isLocalSitting: false,
  localChatMessage: null,
  localChatExpiresAt: 0,
  isChatOpen: false,
  isEmoteBarOpen: false,

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

  addChatMessage: (msg) => {
    soundManager.playChatPop();
    set((state) => ({
      chatMessages: [...state.chatMessages.slice(-30), msg],
    }));
  },

  setLocalChatMessage: (text) => {
    if (!text) {
      set({ localChatMessage: null, localChatExpiresAt: 0 });
      return;
    }
    const expiresAt = Date.now() + 7000;
    set({ localChatMessage: text, localChatExpiresAt: expiresAt });
    setTimeout(() => {
      if (get().localChatExpiresAt <= Date.now()) {
        set({ localChatMessage: null, localChatExpiresAt: 0 });
      }
    }, 7200);
  },

  setChatOpen: (open) => set({ isChatOpen: open }),
  toggleChatOpen: () => set((state) => ({ isChatOpen: !state.isChatOpen })),

  setEmoteBarOpen: (open) => set({ isEmoteBarOpen: open }),
  toggleEmoteBarOpen: () => set((state) => ({ isEmoteBarOpen: !state.isEmoteBarOpen })),

  triggerLocalAction: (actionId) => {
    if (actionId === 'sit') {
      get().toggleLocalSitting();
      return;
    }

    const actionDef = CHARACTER_ACTIONS[actionId];
    if (actionId === 'take_photo') {
      soundManager.playCameraClick();
    } else {
      soundManager.playEmoteChime();
    }

    const now = Date.now();
    set({
      localAction: actionId,
      localActionStartTime: now,
    });

    const duration = actionDef ? actionDef.durationMs : 4000;
    setTimeout(() => {
      if (get().localAction === actionId && get().localActionStartTime === now) {
        set({ localAction: null });
      }
    }, duration);
  },

  clearLocalAction: () => set({ localAction: null }),

  setLocalSitting: (isSitting) => set({ isLocalSitting: isSitting }),
  toggleLocalSitting: () =>
    set((state) => {
      const next = !state.isLocalSitting;
      soundManager.playInteractBeep();
      return { isLocalSitting: next };
    }),

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
