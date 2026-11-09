import React from 'react';

export const ServerRack: React.FC = () => {
  return (
    <group position={[5.4, 0, -4.4]}>
      {/* 1. Main 42U Server Enclosure Cabinet */}
      <mesh castShadow receiveShadow position={[0, 1.25, 0]}>
        <boxGeometry args={[1.4, 2.5, 1.2]} />
        <meshStandardMaterial color="#111317" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Front Glass / Perforated Door with Metal Trim */}
      <mesh position={[0, 1.25, 0.61]}>
        <planeGeometry args={[1.3, 2.4]} />
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* 2. Server Blade Trays with Blinking Activity LEDs */}
      {[0.4, 0.7, 1.0, 1.3, 1.6, 1.9, 2.1].map((y, idx) => (
        <group key={idx} position={[0, y, 0.58]}>
          {/* Blade Unit Faceplate */}
          <mesh>
            <boxGeometry args={[1.2, 0.18, 0.04]} />
            <meshStandardMaterial color="#1f242e" roughness={0.5} metalness={0.6} />
          </mesh>
          {/* Status LEDs */}
          <mesh position={[-0.45, 0, 0.025]}>
            <boxGeometry args={[0.04, 0.03, 0.01]} />
            <meshStandardMaterial
              color="#10b981"
              emissive="#10b981"
              emissiveIntensity={1.2}
            />
          </mesh>
          <mesh position={[-0.35, 0, 0.025]}>
            <boxGeometry args={[0.04, 0.03, 0.01]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={1.0}
            />
          </mesh>
          <mesh position={[-0.25, 0, 0.025]}>
            <boxGeometry args={[0.04, 0.03, 0.01]} />
            <meshStandardMaterial
              color="#f59e0b"
              emissive="#f59e0b"
              emissiveIntensity={0.8}
            />
          </mesh>
        </group>
      ))}

      {/* 3. Monitoring Screen mounted on rack arm */}
      <group position={[-0.75, 1.4, 0.2]} rotation={[0, 0.45, 0]}>
        {/* Arm */}
        <mesh position={[0.1, 0, 0]}>
          <boxGeometry args={[0.2, 0.04, 0.04]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
        {/* Screen Frame */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.5, 0.35, 0.03]} />
          <meshStandardMaterial color="#090a0f" roughness={0.4} />
        </mesh>
        {/* Screen Content (System Telemetry & Architecture Dashboard) */}
        <mesh position={[0, 0, 0.018]}>
          <planeGeometry args={[0.46, 0.31]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#0891b2"
            emissiveIntensity={0.9}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Subtle server corner ambient glow */}
      <pointLight position={[-0.2, 1.4, 0.8]} color="#38bdf8" intensity={0.8} distance={2.5} />
    </group>
  );
};
