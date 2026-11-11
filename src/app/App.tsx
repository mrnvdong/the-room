import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { RoomScene } from '@/game/objects/RoomScene';
import { EntranceScene } from '@/game/scenes/EntranceScene';
import { HUD } from '@/components/hud/HUD';
import { EntranceOverlay } from '@/components/entrance/EntranceOverlay';
import { Portfolio2DView } from '@/components/portfolio2d/Portfolio2DView';
import { MultiplayerSync } from '@/features/multiplayer/MultiplayerSync';
import { useGameStore } from '@/stores/useGameStore';
import { soundManager } from '@/features/audio/soundManager';
import { Loader } from 'lucide-react';

const LoadingFallback: React.FC = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-room-dark text-white z-50">
    <div className="flex items-center gap-3 text-sky-400 font-mono text-sm tracking-wider animate-pulse">
      <Loader className="w-5 h-5 animate-spin" />
      <span>INITIALIZING 3D ENVIRONMENT...</span>
    </div>
  </div>
);

export const App: React.FC = () => {
  const gameState = useGameStore((state) => state.gameState);
  const viewMode = useGameStore((state) => state.viewMode);
  const setViewMode = useGameStore((state) => state.setViewMode);
  const initializeSession = useGameStore((state) => state.initializeSession);

  const [doorbellAlert, setDoorbellAlert] = useState<string | null>(null);
  const [cameraAlert, setCameraAlert] = useState<string | null>(null);

  useEffect(() => {
    initializeSession();
  }, [initializeSession]);

  // If user requests 2D Accessible mode
  if (viewMode === '2d') {
    return (
      <>
        <MultiplayerSync />
        <Portfolio2DView onSwitchTo3D={() => setViewMode('3d')} />
      </>
    );
  }

  const isEntranceActive =
    gameState === 'BOOT' ||
    gameState === 'INTRO' ||
    gameState === 'IDENTIFICATION' ||
    gameState === 'AVATAR_SELECTION' ||
    gameState === 'ENTERING';

  const handleDoorbellRing = () => {
    soundManager.playDoorbell();
    setDoorbellAlert('Ding-dong! Doorbell chime reverberates through corridor.');
    setTimeout(() => setDoorbellAlert(null), 3000);
  };

  const handleCameraScan = (msg?: string) => {
    setCameraAlert(msg || 'Security Camera: Optical sensor tracking visitor coordinates.');
    setTimeout(() => setCameraAlert(null), 4000);
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-room-dark select-none touch-none">
      {/* Real-Time Multiplayer Presence Synchronization (Active across 3D & UI) */}
      <MultiplayerSync />

      {/* 3D WebGL Canvas */}
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          shadows
          camera={{ fov: 50, near: 0.1, far: 120, position: [0, 1.7, 5.2] }}
          gl={{
            antialias: true,
            powerPreference: 'default',
            stencil: false,
          }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener(
              'webglcontextlost',
              (e) => {
                e.preventDefault();
                console.warn('WebGL context lost, preventing default crash.');
              },
              false
            );
          }}
          className="w-full h-full"
        >
          <Suspense fallback={null}>
            {isEntranceActive ? (
              <EntranceScene
                onDoorbellRing={handleDoorbellRing}
                onCameraInteract={handleCameraScan}
              />
            ) : (
              <RoomScene />
            )}
          </Suspense>
        </Canvas>
      </Suspense>

      {/* Dynamic Overlay depending on state */}
      {isEntranceActive ? (
        <EntranceOverlay
          doorbellAlert={doorbellAlert}
          cameraAlert={cameraAlert}
          onRingDoorbell={handleDoorbellRing}
          onCameraScan={() => handleCameraScan()}
        />
      ) : (
        <HUD />
      )}
    </main>
  );
};

export default App;
