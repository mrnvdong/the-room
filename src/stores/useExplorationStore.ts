import { create } from 'zustand';

export interface ExplorationZone {
  id: string;
  nameEn: string;
  nameVi: string;
  position: [number, number, number];
  radius: number;
}

export const EXPLORATION_ZONES: ExplorationZone[] = [
  { id: 'entrance', nameEn: 'Entrance Threshold', nameVi: 'Khu vực Lối vào', position: [0, 0, 4.5], radius: 2.2 },
  { id: 'workstation', nameEn: 'Developer Workstation', nameVi: 'Bàn Làm Việc Kỹ Sư', position: [-4.7, 0, -3.7], radius: 2.5 },
  { id: 'bookshelf', nameEn: 'Technical Library', nameVi: 'Tủ Sách Kỹ Thuật', position: [-0.2, 0, -4.7], radius: 2.5 },
  { id: 'servers', nameEn: 'Edge Server Rack', nameVi: 'Hạ Tầng Server Edge', position: [4.7, 0, -4.0], radius: 2.5 },
  { id: 'projects_wall', nameEn: 'Architectural Project Wall', nameVi: 'Tường Triển Lãm Dự Án', position: [5.5, 0, -2.0], radius: 2.8 },
  { id: 'skyline', nameEn: 'Panoramic Skyline Window', nameVi: 'Cửa Sổ Ngắm Toàn Cảnh', position: [-5.8, 0, 0.0], radius: 2.8 },
];

interface ExplorationStoreState {
  discoveredZoneIds: string[];
  justDiscoveredZone: ExplorationZone | null;
  discoverZone: (zoneId: string) => void;
  clearNotification: () => void;
}

export const useExplorationStore = create<ExplorationStoreState>((set, get) => ({
  discoveredZoneIds: ['entrance'],
  justDiscoveredZone: null,

  discoverZone: (zoneId) => {
    const { discoveredZoneIds } = get();
    if (!discoveredZoneIds.includes(zoneId)) {
      const zone = EXPLORATION_ZONES.find((z) => z.id === zoneId) || null;
      set({
        discoveredZoneIds: [...discoveredZoneIds, zoneId],
        justDiscoveredZone: zone,
      });
    }
  },

  clearNotification: () => set({ justDiscoveredZone: null }),
}));
