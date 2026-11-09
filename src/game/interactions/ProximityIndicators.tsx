import React from 'react';
import { useInteractionStore } from '@/stores/useInteractionStore';

export const ProximityIndicators: React.FC = () => {
  const activeNearObject = useInteractionStore((state) => state.activeNearObject);

  if (!activeNearObject) return null;

  const [ox, , oz] = activeNearObject.position;

  return (
    <group position={[ox, 0.02, oz]}>
      {/* Outer pulsing beacon ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 0.65, 32]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.65} />
      </mesh>
      {/* Center glowing spot */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.25, 24]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.35} />
      </mesh>
    </group>
  );
};
