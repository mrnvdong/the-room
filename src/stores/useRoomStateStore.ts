import { create } from 'zustand';

export type WeatherMode = 'clear' | 'sunset' | 'rain' | 'night';

interface RoomStateStoreState {
  deskLampOn: boolean;
  ambientSoundPlaying: boolean;
  isSittingOnSofa: boolean;
  isWindowLookout: boolean;
  weatherMode: WeatherMode;
  secretDrawerUnlocked: boolean;
  coffeeSipsCount: number;

  toggleDeskLamp: () => void;
  toggleAmbientSound: () => void;
  setSittingOnSofa: (sitting: boolean) => void;
  setWindowLookout: (lookout: boolean) => void;
  setWeatherMode: (mode: WeatherMode) => void;
  unlockSecretDrawer: () => void;
  incrementCoffeeSips: () => void;
}

export const useRoomStateStore = create<RoomStateStoreState>((set) => ({
  deskLampOn: true,
  ambientSoundPlaying: false,
  isSittingOnSofa: false,
  isWindowLookout: false,
  weatherMode: 'clear',
  secretDrawerUnlocked: false,
  coffeeSipsCount: 3,

  toggleDeskLamp: () => set((state) => ({ deskLampOn: !state.deskLampOn })),
  toggleAmbientSound: () =>
    set((state) => ({ ambientSoundPlaying: !state.ambientSoundPlaying })),
  setSittingOnSofa: (sitting) => set({ isSittingOnSofa: sitting }),
  setWindowLookout: (lookout) => set({ isWindowLookout: lookout }),
  setWeatherMode: (mode) => set({ weatherMode: mode }),
  unlockSecretDrawer: () => set({ secretDrawerUnlocked: true }),
  incrementCoffeeSips: () =>
    set((state) => ({ coffeeSipsCount: state.coffeeSipsCount + 1 })),
}));
