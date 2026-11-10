import React from 'react';
import { useRoomStateStore } from '@/stores/useRoomStateStore';

export const DeskSet: React.FC = () => {
  const deskLampOn = useRoomStateStore((state) => state.deskLampOn);
  const secretDrawerUnlocked = useRoomStateStore((state) => state.secretDrawerUnlocked);

  return (
    <group position={[-4.7, 0, -3.7]}>
      {/* ==================== 1. MAIN WORKSTATION DESK ==================== */}
      {/* Chamfered Solid Walnut Tabletop */}
      <mesh castShadow receiveShadow position={[0, 0.76, 0]}>
        <boxGeometry args={[2.85, 0.08, 1.4]} />
        <meshStandardMaterial
          color="#382519"
          roughness={0.45}
          metalness={0.05}
        />
      </mesh>

      {/* Sleek Matte Black Industrial Steel Desk Frame */}
      {/* Left Leg Frame */}
      <group position={[-1.3, 0.38, 0]}>
        <mesh castShadow position={[0, 0, -0.55]}>
          <boxGeometry args={[0.07, 0.76, 0.07]} />
          <meshStandardMaterial color="#0f1115" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh castShadow position={[0, 0, 0.55]}>
          <boxGeometry args={[0.07, 0.76, 0.07]} />
          <meshStandardMaterial color="#0f1115" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.34, 0]}>
          <boxGeometry args={[0.07, 0.04, 1.18]} />
          <meshStandardMaterial color="#0f1115" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* Right Leg Frame */}
      <group position={[1.3, 0.38, 0]}>
        <mesh castShadow position={[0, 0, -0.55]}>
          <boxGeometry args={[0.07, 0.76, 0.07]} />
          <meshStandardMaterial color="#0f1115" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh castShadow position={[0, 0, 0.55]}>
          <boxGeometry args={[0.07, 0.76, 0.07]} />
          <meshStandardMaterial color="#0f1115" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.34, 0]}>
          <boxGeometry args={[0.07, 0.04, 1.18]} />
          <meshStandardMaterial color="#0f1115" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* Premium Felt Desk Pad with Stitched Edges */}
      <mesh receiveShadow position={[0, 0.805, 0.08]}>
        <boxGeometry args={[1.9, 0.012, 0.82]} />
        <meshStandardMaterial color="#181a20" roughness={0.9} />
      </mesh>

      {/* ==================== 2. MAIN CURVED ULTRAWIDE MONITOR ==================== */}
      <group position={[-0.2, 0.8, -0.35]}>
        {/* Heavy Cast Aluminum Monitor Arm */}
        <mesh castShadow position={[0, 0.24, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.48, 16]} />
          <meshStandardMaterial color="#1e222a" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.01, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.02, 20]} />
          <meshStandardMaterial color="#1e222a" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Curved Ultra-Thin Frame */}
        <mesh castShadow position={[0, 0.46, 0]}>
          <boxGeometry args={[1.34, 0.54, 0.035]} />
          <meshStandardMaterial color="#090a0f" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* High-Res OLED Screen Panel (DONG-OS) */}
        <mesh position={[0, 0.46, 0.02]}>
          <planeGeometry args={[1.3, 0.5]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={0.85}
            roughness={0.15}
          />
        </mesh>

        {/* Ambient Backlight Glow on Wall behind Ultrawide Monitor */}
        <mesh position={[0, 0.46, -0.025]}>
          <planeGeometry args={[1.2, 0.4]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      </group>

      {/* ==================== 3. SECONDARY PORTRAIT MONITOR ==================== */}
      <group position={[0.82, 0.8, -0.32]} rotation={[0, -0.38, 0]}>
        {/* Arm Stand */}
        <mesh castShadow position={[0, 0.24, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.48, 12]} />
          <meshStandardMaterial color="#1e222a" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Frame */}
        <mesh castShadow position={[0, 0.46, 0]}>
          <boxGeometry args={[0.44, 0.76, 0.03]} />
          <meshStandardMaterial color="#090a0f" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Glowing Code / Telemetry Panel */}
        <mesh position={[0, 0.46, 0.018]}>
          <planeGeometry args={[0.4, 0.72]} />
          <meshStandardMaterial
            color="#10b981"
            emissive="#059669"
            emissiveIntensity={0.7}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* ==================== 4. PERIPHERALS ==================== */}
      {/* Custom Mechanical Keyboard (Gasket Mount) */}
      <group position={[-0.2, 0.82, 0.12]}>
        <mesh castShadow>
          <boxGeometry args={[0.46, 0.024, 0.17]} />
          <meshStandardMaterial color="#111317" roughness={0.4} metalness={0.6} />
        </mesh>
        {/* RGB Keycaps Layer */}
        <mesh position={[0, 0.015, 0]}>
          <boxGeometry args={[0.44, 0.012, 0.15]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.4} />
        </mesh>
      </group>

      {/* Ergonomic Wireless Mouse */}
      <mesh castShadow position={[0.32, 0.82, 0.12]}>
        <boxGeometry args={[0.08, 0.03, 0.13]} />
        <meshStandardMaterial color="#0f172a" roughness={0.25} metalness={0.4} />
      </mesh>

      {/* ==================== 5. MINIMALIST DESK SPOTLIGHT LAMP ==================== */}
      <group position={[-1.15, 0.8, -0.35]}>
        <mesh position={[0, 0.015, 0]}>
          <cylinderGeometry args={[0.11, 0.11, 0.03, 20]} />
          <meshStandardMaterial color="#1e222a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.36, 0]}>
          <cylinderGeometry args={[0.018, 0.018, 0.68, 12]} />
          <meshStandardMaterial color="#1e222a" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Brushed Brass Lamp Shade */}
        <mesh position={[0.14, 0.7, 0]} rotation={[0, 0, -0.45]}>
          <coneGeometry args={[0.11, 0.18, 20]} />
          <meshStandardMaterial
            color={deskLampOn ? '#fbbf24' : '#64748b'}
            metalness={0.7}
            roughness={0.3}
            emissive={deskLampOn ? '#fef3c7' : '#000000'}
            emissiveIntensity={deskLampOn ? 0.7 : 0}
          />
        </mesh>
        {deskLampOn && (
          <pointLight position={[0.14, 0.62, 0]} color="#fffbeb" intensity={2.8} distance={4.5} />
        )}
      </group>

      {/* ==================== 6. SECRET DRAWER LOCKBOX ==================== */}
      <group position={[1.02, 0.35, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.55, 0.65, 0.9]} />
          <meshStandardMaterial color="#2c1e14" roughness={0.7} />
        </mesh>
        <mesh position={[0, -0.1, 0.46]}>
          <boxGeometry args={[0.5, 0.28, 0.02]} />
          <meshStandardMaterial color="#3d2c1d" roughness={0.6} />
        </mesh>
        {/* Keypad Padlock */}
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

      {/* Dark Roast Ceramic Coffee Mug */}
      <group position={[-0.8, 0.8, 0.22]}>
        <mesh castShadow position={[0, 0.07, 0]}>
          <cylinderGeometry args={[0.05, 0.045, 0.12, 18]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.15} />
        </mesh>
        <mesh position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.046, 0.046, 0.01, 16]} />
          <meshStandardMaterial color="#451a03" roughness={0.1} />
        </mesh>
      </group>

      {/* Personal Smartphone Stand */}
      <group position={[0.88, 0.8, 0.15]} rotation={[0, -0.32, 0]}>
        <mesh castShadow position={[0, 0.08, 0]}>
          <boxGeometry args={[0.09, 0.16, 0.012]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={0.5}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* ==================== 7. MODERN ERGONOMIC CHAIR ==================== */}
      <group position={[0, 0, 1.7]} rotation={[0, Math.PI, 0]}>
        {/* 5-Star Chrome Star Base */}
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.34, 0.34, 0.03, 16]} />
          <meshStandardMaterial color="#090a0f" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Pneumatic Cylinder */}
        <mesh position={[0, 0.28, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.42, 16]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Contoured Padded Seat Cushion */}
        <mesh castShadow position={[0, 0.52, 0]}>
          <boxGeometry args={[0.56, 0.11, 0.56]} />
          <meshStandardMaterial color="#1e2430" roughness={0.7} />
        </mesh>
        {/* Ergonomic Curved Lumbar Backrest */}
        <mesh castShadow position={[0, 0.96, -0.25]} rotation={[-0.05, 0, 0]}>
          <boxGeometry args={[0.52, 0.72, 0.05]} />
          <meshStandardMaterial color="#2d3748" roughness={0.6} />
        </mesh>
        {/* Adjustable Headrest */}
        <mesh position={[0, 1.4, -0.28]}>
          <boxGeometry args={[0.26, 0.12, 0.06]} />
          <meshStandardMaterial color="#1e2430" roughness={0.7} />
        </mesh>
        {/* Curved Armrests */}
        <mesh position={[-0.31, 0.75, -0.05]}>
          <boxGeometry args={[0.07, 0.035, 0.28]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} />
        </mesh>
        <mesh position={[0.31, 0.75, -0.05]}>
          <boxGeometry args={[0.07, 0.035, 0.28]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} />
        </mesh>
      </group>
    </group>
  );
};
