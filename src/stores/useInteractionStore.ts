import { create } from 'zustand';
import { InteractableObject } from '@/types';

interface InteractionStoreState {
  objects: Map<string, InteractableObject>;
  activeNearObject: InteractableObject | null;
  activeModalObject: InteractableObject | null;

  registerObject: (obj: InteractableObject) => void;
  unregisterObject: (id: string) => void;
  setActiveNearObject: (obj: InteractableObject | null) => void;
  openModal: (obj: InteractableObject) => void;
  closeModal: () => void;
}

export const useInteractionStore = create<InteractionStoreState>((set) => ({
  objects: new Map(),
  activeNearObject: null,
  activeModalObject: null,

  registerObject: (obj) =>
    set((state) => {
      const newMap = new Map(state.objects);
      newMap.set(obj.id, obj);
      return { objects: newMap };
    }),

  unregisterObject: (id) =>
    set((state) => {
      const newMap = new Map(state.objects);
      newMap.delete(id);
      return { objects: newMap };
    }),

  setActiveNearObject: (obj) => set({ activeNearObject: obj }),
  openModal: (obj) => set({ activeModalObject: obj }),
  closeModal: () => set({ activeModalObject: null }),
}));
