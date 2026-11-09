import React from 'react';

export const WindowArea: React.FC = () => {
  return (
    <group position={[-7.0, 0, 0]}>
      {/* 1. Window Mullions & Frame Structure */}
      {/* Center vertical mullion */}
      <mesh position={[0.02, 2.1, 0]}>
        <boxGeometry args={[0.08, 3.4, 0.08]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Horizontal transom bar */}
      <mesh position={[0.02, 2.7, 0]}>
        <boxGeometry args={[0.08, 0.08, 5.8]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Glass Pane */}
      <mesh position={[0.02, 2.1, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[5.8, 3.4]} />
        <meshPhysicalMaterial
          color="#93c5fd"
          transmission={0.9}
          opacity={0.3}
          transparent
          roughness={0.1}
          ior={1.4}
        />
      </mesh>

      {/* 2. Stylized City Skyline Backdrop outside */}
      <group position={[-6.0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        {/* Sky / Horizon Backdrop Plane */}
        <mesh position={[0, 5, -2]}>
          <planeGeometry args={[22, 14]} />
          <meshBasicMaterial color="#1e293b" />
        </mesh>

        {/* Distant Stylized Skyscrapers */}
        {[
          { x: -5, w: 1.4, h: 6.2, z: -1, color: '#090d16' },
          { x: -3.2, w: 1.8, h: 8.5, z: 0, color: '#0f172a' },
          { x: -1.2, w: 1.5, h: 5.8, z: 0.5, color: '#131b2e' },
          { x: 0.8, w: 2.1, h: 7.6, z: 0, color: '#0f172a' },
          { x: 3.2, w: 1.6, h: 9.2, z: -0.5, color: '#0c1220' },
          { x: 5.4, w: 1.7, h: 6.0, z: 0.8, color: '#131b2e' },
        ].map((bldg, i) => (
          <group key={i} position={[bldg.x, bldg.h / 2, bldg.z]}>
            <mesh>
              <boxGeometry args={[bldg.w, bldg.h, 1.2]} />
              <meshStandardMaterial color={bldg.color} roughness={0.8} />
            </mesh>
            {/* Distant window glow dots */}
            <mesh position={[0, bldg.h * 0.2, 0.61]}>
              <planeGeometry args={[bldg.w * 0.7, bldg.h * 0.5]} />
              <meshBasicMaterial color="#fef08a" transparent opacity={0.15} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};
