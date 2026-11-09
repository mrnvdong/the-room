import React from 'react';
import { SAMPLE_PROJECTS } from '@/features/portfolio/portfolioData';

export const ProjectWall: React.FC = () => {
  // 4 framed posters arranged horizontally along the Right Wall (X = 6.93)
  // Perfectly positioned between Z = -4.5 and Z = +0.5, clear of Lounge area at Z >= +0.7
  const posterPositions = [
    { z: -2.25, color: '#38bdf8', category: '3D WEB' },
    { z: -0.75, color: '#f97316', category: 'EDGE CLOUD' },
    { z: 0.75, color: '#a855f7', category: 'AI AGENTS' },
    { z: 2.25, color: '#10b981', category: 'FULL-STACK' },
  ];

  return (
    <group position={[6.93, 2.0, -2.0]} rotation={[0, -Math.PI / 2, 0]}>
      {SAMPLE_PROJECTS.map((proj, idx) => {
        const layout = posterPositions[idx] || posterPositions[0];
        return (
          <group key={proj.id} position={[layout.z, 0, 0]}>
            {/* Outer Matte Black Metal Frame */}
            <mesh castShadow position={[0, 0, 0]}>
              <boxGeometry args={[1.3, 1.8, 0.05]} />
              <meshStandardMaterial color="#090a0f" roughness={0.4} metalness={0.8} />
            </mesh>

            {/* Inset Dark Mat Board */}
            <mesh position={[0, 0, 0.026]}>
              <planeGeometry args={[1.2, 1.7]} />
              <meshStandardMaterial color="#0f172a" roughness={0.7} />
            </mesh>

            {/* Poster Graphic Artwork */}
            <mesh position={[0, 0.18, 0.028]}>
              <planeGeometry args={[1.08, 0.95]} />
              <meshStandardMaterial
                color={layout.color}
                emissive={layout.color}
                emissiveIntensity={0.35}
                roughness={0.3}
              />
            </mesh>

            {/* Poster Title Banner */}
            <mesh position={[0, -0.52, 0.028]}>
              <planeGeometry args={[1.08, 0.28]} />
              <meshStandardMaterial color="#1e293b" roughness={0.5} />
            </mesh>

            {/* Category Tag Line */}
            <mesh position={[0, -0.38, 0.03]}>
              <planeGeometry args={[0.7, 0.06]} />
              <meshStandardMaterial color={layout.color} emissive={layout.color} emissiveIntensity={0.8} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};
