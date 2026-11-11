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
      accentColor: string;
    }
  > = {
    clear: {
      ambientColor: '#e2e8f0',
      ambientIntensity: 0.85,
      sunColor: '#fffdf2',
      sunIntensity: enableShadows ? 2.8 : 2.0,
      sunPos: [-11, 7.5, 1.5],
      ceilingColor: '#fef3c7',
      ceilingIntensity: 1.3,
      accentColor: '#38bdf8',
    },
    sunset: {
      ambientColor: '#fed7aa',
      ambientIntensity: 0.75,
      sunColor: '#f97316',
      sunIntensity: enableShadows ? 2.9 : 2.2,
      sunPos: [-11, 4.2, 2],
      ceilingColor: '#ffedd5',
      ceilingIntensity: 1.3,
      accentColor: '#f43f5e',
    },
    rain: {
      ambientColor: '#64748b',
      ambientIntensity: 0.65,
      sunColor: '#94a3b8',
      sunIntensity: enableShadows ? 1.5 : 1.1,
      sunPos: [-11, 7.5, 1],
      ceilingColor: '#fef3c7',
      ceilingIntensity: 1.4,
      accentColor: '#38bdf8',
    },
    night: {
      ambientColor: '#0f172a',
      ambientIntensity: 0.45,
      sunColor: '#60a5fa',
      sunIntensity: enableShadows ? 1.1 : 0.75,
      sunPos: [-11, 6.5, 2],
      ceilingColor: '#fbbf24',
      ceilingIntensity: 1.8,
      accentColor: '#818cf8',
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
        shadow-bias={-0.0003}
        shadow-radius={2.5}
      />

      {/* 3. Warm Interior Ceiling Fill Light */}
      <pointLight
        position={[0, 3.8, 0]}
        intensity={current.ceilingIntensity}
        color={current.ceilingColor}
        distance={14}
        decay={2}
      />

      {/* 4. Architectural Workstation Overhead Downlight */}
      <spotLight
        position={[-4.7, 4.0, -2.5]}
        target-position={[-4.7, 0.8, -3.7]}
        intensity={2.2}
        color="#fffbeb"
        angle={0.65}
        penumbra={0.7}
        distance={6}
        decay={2}
      />

      {/* 5. Lounge Overhead Warm Mood Light */}
      <spotLight
        position={[4.5, 4.0, 1.8]}
        target-position={[4.5, 0.4, 2.0]}
        intensity={1.8}
        color="#fef3c7"
        angle={0.7}
        penumbra={0.8}
        distance={6}
        decay={2}
      />

      {/* 6. Subtle Cool Accent Rim Light from Room Center */}
      <pointLight
        position={[2, 3.2, 2]}
        intensity={0.6}
        color={current.accentColor}
        distance={9}
        decay={2}
      />
    </group>
  );
};
