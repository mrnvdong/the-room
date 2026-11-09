import React from 'react';
import { useRoomStateStore } from '@/stores/useRoomStateStore';

export const DeskSet: React.FC = () => {
  const deskLampOn = useRoomStateStore((state) => state.deskLampOn);
  const secretDrawerUnlocked = useRoomStateStore((state) => state.secretDrawerUnlocked);
  return (
    <group position={[-4.7, 0, -3.7]}>
      {/* 1. Main Desk Tabletop */}
      <mesh castShadow receiveShadow position={[0, 0.76, 0]}>
        <boxGeometry args={[2.8, 0.08, 1.4]} />
        <meshStandardMaterial color="#3b322a" roughness={0.6} />
      </mesh>

      {/* Desk Legs (Black Steel Frame) */}
      <mesh castShadow position={[-1.3, 0.38, -0.55]}>
        <boxGeometry args={[0.08, 0.76, 0.08]} />
        <meshStandardMaterial color="#1e2024" roughness={0.4} metalness={0.7} />
      </mesh>
      <mesh castShadow position={[1.3, 0.38, -0.55]}>
        <boxGeometry args={[0.08, 0.76, 0.08]} />
        <meshStandardMaterial color="#1e2024" roughness={0.4} metalness={0.7} />
      </mesh>
      <mesh castShadow position={[-1.3, 0.38, 0.55]}>
        <boxGeometry args={[0.08, 0.76, 0.08]} />
        <meshStandardMaterial color="#1e2024" roughness={0.4} metalness={0.7} />
      </mesh>
      <mesh castShadow position={[1.3, 0.38, 0.55]}>
        <boxGeometry args={[0.08, 0.76, 0.08]} />
        <meshStandardMaterial color="#1e2024" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Desk Mat */}
      <mesh receiveShadow position={[0, 0.805, 0.05]}>
        <boxGeometry args={[1.8, 0.01, 0.8]} />
        <meshStandardMaterial color="#1a1c23" roughness={0.9} />
      </mesh>

      {/* 2. Main Curved Ultrawide Monitor */}
      <group position={[-0.2, 0.8, -0.35]}>
        {/* Stand */}
        <mesh castShadow position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.44, 12]} />
          <meshStandardMaterial color="#2d3139" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.01, 0]}>
          <boxGeometry args={[0.35, 0.02, 0.25]} />
          <meshStandardMaterial color="#2d3139" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Screen Frame */}
        <mesh castShadow position={[0, 0.44, 0]}>
          <boxGeometry args={[1.3, 0.52, 0.05]} />
          <meshStandardMaterial color="#111216" roughness={0.4} />
        </mesh>
        {/* Display Panel (Glowing Virtual Desktop) */}
        <mesh position={[0, 0.44, 0.028]}>
          <planeGeometry args={[1.25, 0.48]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={0.85}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* 3. Secondary Portrait Monitor */}
      <group position={[0.78, 0.8, -0.32]} rotation={[0, -0.35, 0]}>
        {/* Stand */}
        <mesh castShadow position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.44, 12]} />
          <meshStandardMaterial color="#2d3139" metalness={0.8} />
        </mesh>
        {/* Screen Frame */}
        <mesh castShadow position={[0, 0.44, 0]}>
          <boxGeometry args={[0.42, 0.72, 0.04]} />
          <meshStandardMaterial color="#111216" roughness={0.4} />
        </mesh>
        {/* Display Panel */}
        <mesh position={[0, 0.44, 0.023]}>
          <planeGeometry args={[0.38, 0.68]} />
          <meshStandardMaterial
            color="#10b981"
            emissive="#059669"
            emissiveIntensity={0.7}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* 4. Mechanical Keyboard */}
      <mesh castShadow position={[-0.2, 0.82, 0.1]}>
        <boxGeometry args={[0.48, 0.025, 0.18]} />
        <meshStandardMaterial color="#1e222a" roughness={0.5} />
      </mesh>

      {/* Wireless Mouse */}
      <mesh castShadow position={[0.3, 0.82, 0.1]}>
        <boxGeometry args={[0.09, 0.03, 0.14]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} />
      </mesh>

      {/* 5. Minimalist Desk Lamp with Warm Glow */}
      <group position={[-1.1, 0.8, -0.35]}>
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.03, 16]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.7} roughness={0.2} />
        </mesh>
        {/* Stem */}
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.65, 12]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.7} roughness={0.2} />
        </mesh>
        {/* Shade */}
        <mesh position={[0.12, 0.68, 0]} rotation={[0, 0, -0.4]}>
          <coneGeometry args={[0.12, 0.18, 16]} />
          <meshStandardMaterial
            color={deskLampOn ? '#fef3c7' : '#94a3b8'}
            emissive={deskLampOn ? '#fef3c7' : '#000000'}
            emissiveIntensity={deskLampOn ? 0.8 : 0}
            roughness={0.3}
          />
        </mesh>
        {/* Point light from lamp (toggled via interaction) */}
        {deskLampOn && (
          <pointLight position={[0.12, 0.6, 0]} color="#fef3c7" intensity={2.5} distance={4.2} />
        )}
      </group>

      {/* Secret Drawer Cabinet under right side of desk */}
      <group position={[1.0, 0.35, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.55, 0.65, 0.9]} />
          <meshStandardMaterial color="#2c221a" roughness={0.7} />
        </mesh>
        {/* Drawer Face */}
        <mesh position={[0, -0.1, 0.46]}>
          <boxGeometry args={[0.5, 0.28, 0.02]} />
          <meshStandardMaterial color="#3d2f24" roughness={0.6} />
        </mesh>
        {/* Keypad Padlock on Secret Drawer */}
        <mesh position={[0, -0.1, 0.475]}>
          <boxGeometry args={[0.12, 0.16, 0.02]} />
          <meshStandardMaterial
            color={secretDrawerUnlocked ? '#10b981' : '#f59e0b'}
            emissive={secretDrawerUnlocked ? '#10b981' : '#f59e0b'}
            emissiveIntensity={0.6}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* 6. Coffee Mug */}
      <group position={[-0.8, 0.8, 0.2]}>
        <mesh castShadow position={[0, 0.07, 0]}>
          <cylinderGeometry args={[0.05, 0.045, 0.12, 16]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.2} />
        </mesh>
        {/* Coffee Liquid */}
        <mesh position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.046, 0.046, 0.01, 16]} />
          <meshStandardMaterial color="#451a03" roughness={0.1} />
        </mesh>
      </group>

      {/* 7. Smartphone Stand */}
      <group position={[0.9, 0.8, 0.15]} rotation={[0, -0.3, 0]}>
        <mesh castShadow position={[0, 0.08, 0]}>
          <boxGeometry args={[0.1, 0.16, 0.015]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={0.5}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* 8. Modern Ergonomic Office Chair */}
      <group position={[0, 0, 1.7]} rotation={[0, Math.PI, 0]}>
        {/* Wheel base */}
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.04, 8]} />
          <meshStandardMaterial color="#111827" roughness={0.5} />
        </mesh>
        {/* Gas lift cylinder */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.4, 12]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Padded Seat Cushion */}
        <mesh castShadow position={[0, 0.52, 0]}>
          <boxGeometry args={[0.55, 0.1, 0.55]} />
          <meshStandardMaterial color="#1e293b" roughness={0.8} />
        </mesh>
        {/* Mesh Backrest */}
        <mesh castShadow position={[0, 0.95, -0.24]}>
          <boxGeometry args={[0.52, 0.72, 0.06]} />
          <meshStandardMaterial color="#334155" roughness={0.7} />
        </mesh>
        {/* Armrests */}
        <mesh position={[-0.3, 0.75, -0.05]}>
          <boxGeometry args={[0.06, 0.04, 0.3]} />
          <meshStandardMaterial color="#0f172a" roughness={0.5} />
        </mesh>
        <mesh position={[0.3, 0.75, -0.05]}>
          <boxGeometry args={[0.06, 0.04, 0.3]} />
          <meshStandardMaterial color="#0f172a" roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
};
