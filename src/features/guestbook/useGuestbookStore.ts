import { create } from 'zustand';
import { getApiUrl } from '@/config/api';

export interface GuestbookEntry {
  id: string;
  displayName: string;
  message: string;
  identity: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

interface GuestbookStoreState {
  entries: GuestbookEntry[];
  isLoading: boolean;
  isSubmitting: boolean;
  submitSuccess: boolean;
  error: string | null;

  fetchEntries: () => Promise<void>;
  submitEntry: (displayName: string, message: string, identity?: string) => Promise<boolean>;
}

export const useGuestbookStore = create<GuestbookStoreState>((set) => ({
  entries: [],
  isLoading: false,
  isSubmitting: false,
  submitSuccess: false,
  error: null,

  fetchEntries: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(getApiUrl('/api/guestbook')).catch(() => null);
      if (res && res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) set({ entries: data });
      }
      set({ entries: [], isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  submitEntry: async (displayName, message, identity = 'visitor') => {
    const trimmedName = displayName.trim();
    const trimmedMsg = message.trim();

    if (!trimmedName || trimmedName.length > 30) {
      set({ error: 'Name must be between 1 and 30 characters.' });
      return false;
    }
    if (!trimmedMsg || trimmedMsg.length < 3 || trimmedMsg.length > 300) {
      set({ error: 'Message must be between 3 and 300 characters.' });
      return false;
    }

    set({ isSubmitting: true, error: null, submitSuccess: false });

    const newEntry: GuestbookEntry = {
      id: `entry_${Date.now()}`,
      displayName: trimmedName,
      message: trimmedMsg,
      identity,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(getApiUrl('/api/guestbook'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry),
      });
      if (!response.ok) throw new Error('Guestbook submission was rejected.');

      set((state) => ({
        entries: [newEntry, ...state.entries],
        isSubmitting: false,
        submitSuccess: true,
      }));
      return true;
    } catch (error) {
      set({
        isSubmitting: false,
        submitSuccess: false,
        error: error instanceof Error ? error.message : 'Could not submit guestbook note.',
      });
      return false;
    }
  },

}));
