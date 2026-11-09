import React from 'react';
import { useGameStore } from '@/stores/useGameStore';
import { useRoomStateStore, WeatherMode } from '@/stores/useRoomStateStore';

export const RoomLighting: React.FC = () => {
  const qualityPreset = useGameStore((state) => state.qualityPreset);
  const weatherMode = useRoomStateStore((state) => state.weatherMode);
  const enableShadows = qualityPreset !== 'low';

  const weatherPresets: Record<
    WeatherMode,
    {
      ambientColor: string;
      ambientIntensity: number;
      sunColor: string;
      sunIntensity: number;
      sunPos: [number, number, number];
      ceilingColor: string;
      ceilingIntensity: number;
    }
  > = {
    clear: {
      ambientColor: '#cbd5e1',
      ambientIntensity: 0.7,
      sunColor: '#fffbeb',
      sunIntensity: enableShadows ? 2.4 : 1.8,
      sunPos: [-9, 7, 1],
      ceilingColor: '#fef3c7',
      ceilingIntensity: 1.2,
    },
    sunset: {
      ambientColor: '#fed7aa',
      ambientIntensity: 0.65,
      sunColor: '#fb923c',
      sunIntensity: enableShadows ? 2.6 : 2.0,
      sunPos: [-9, 4.2, 1],
      ceilingColor: '#ffedd5',
      ceilingIntensity: 1.1,
    },
    rain: {
      ambientColor: '#64748b',
      ambientIntensity: 0.55,
      sunColor: '#94a3b8',
      sunIntensity: enableShadows ? 1.4 : 1.0,
      sunPos: [-9, 7, 1],
      ceilingColor: '#fef3c7',
      ceilingIntensity: 1.3,
    },
    night: {
      ambientColor: '#1e293b',
      ambientIntensity: 0.42,
      sunColor: '#38bdf8',
      sunIntensity: enableShadows ? 0.9 : 0.6,
      sunPos: [-9, 6, 1],
      ceilingColor: '#fbbf24',
      ceilingIntensity: 1.6,
    },
  };

  const current = weatherPresets[weatherMode] || weatherPresets.clear;

  return (
    <group>
      {/* 1. Base Ambient Environment Light */}
      <ambientLight intensity={current.ambientIntensity} color={current.ambientColor} />

      {/* 2. Directional Sunlight Streaming Through Window */}
      <directionalLight
        position={current.sunPos}
        target-position={[0, 1, 0]}
        intensity={current.sunIntensity}
        color={current.sunColor}
        castShadow={enableShadows}
        shadow-mapSize-width={enableShadows ? 2048 : 512}
        shadow-mapSize-height={enableShadows ? 2048 : 512}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.0005}
      />

      {/* 3. Warm Interior Ceiling Fill Light */}
      <pointLight
        position={[0, 3.8, 0]}
        intensity={current.ceilingIntensity}
        color={current.ceilingColor}
        distance={12}
      />

      {/* 4. Subtle Cool Accent Light from Room Center */}
      <pointLight position={[2, 3.2, 2]} intensity={0.6} color="#e0f2fe" distance={8} />
    </group>
  );
};
