import { create } from 'zustand';

interface InputStoreState {
  // Move direction [x, z]: x in [-1, 1], z in [-1, 1]
  moveVector: [number, number];
  isRunning: boolean;
  // Accumulated mouse / touch camera deltas for the frame
  cameraLookDelta: [number, number];
  isInteractingTriggered: boolean;
  isTouchDevice: boolean;

  setMoveVector: (vec: [number, number]) => void;
  setRunning: (running: boolean) => void;
  addLookDelta: (dx: number, dy: number) => void;
  consumeLookDelta: () => [number, number];
  triggerInteract: () => void;
  clearInteractTrigger: () => void;
  setIsTouchDevice: (isTouch: boolean) => void;
}

export const useInputStore = create<InputStoreState>((set, get) => ({
  moveVector: [0, 0],
  isRunning: false,
  cameraLookDelta: [0, 0],
  isInteractingTriggered: false,
  isTouchDevice: false,

  setMoveVector: (vec) => set({ moveVector: vec }),
  setRunning: (running) => set({ isRunning: running }),
  addLookDelta: (dx, dy) =>
    set((state) => ({
      cameraLookDelta: [state.cameraLookDelta[0] + dx, state.cameraLookDelta[1] + dy],
    })),
  consumeLookDelta: () => {
    const current = get().cameraLookDelta;
    if (current[0] !== 0 || current[1] !== 0) {
      set({ cameraLookDelta: [0, 0] });
    }
    return current;
  },
  triggerInteract: () => set({ isInteractingTriggered: true }),
  clearInteractTrigger: () => set({ isInteractingTriggered: false }),
  setIsTouchDevice: (isTouch) => set({ isTouchDevice: isTouch }),
}));
