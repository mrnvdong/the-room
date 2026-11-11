import React from 'react';
import * as THREE from 'three';

export const ServerRack: React.FC = () => {
  return (
    <group position={[5.4, 0, -4.4]}>
      {/* =========================================================================
          1. 42U HIGH-DENSITY ENTERPRISE SERVER ENCLOSURE
      ========================================================================= */}
      {/* Heavy Steel Outer Cabinet with Chamfered Trim */}
      <mesh castShadow receiveShadow position={[0, 1.25, 0]}>
        <boxGeometry args={[1.38, 2.5, 1.18]} />
        <meshStandardMaterial color="#0c0e12" roughness={0.25} metalness={0.8} />
      </mesh>

      {/* Smoked Tempered Glass Door with Perforated Metal Vent Border */}
      <group position={[0, 1.25, 0.6]}>
        {/* Outer Door Frame */}
        <mesh>
          <boxGeometry args={[1.34, 2.44, 0.02]} />
          <meshStandardMaterial color="#11151c" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Tempered Glass Center Panel */}
        <mesh position={[0, 0, 0.012]}>
          <planeGeometry args={[1.18, 2.28]} />
          <meshPhysicalMaterial
            color="#0284c7"
            transmission={0.82}
            opacity={0.35}
            transparent
            roughness={0.06}
            ior={1.5}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Vertical Brushed Aluminum Door Handle */}
        <mesh position={[0.56, 0, 0.03]}>
          <cylinderGeometry args={[0.012, 0.012, 0.5, 12]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.95} roughness={0.15} />
        </mesh>
      </group>

      {/* =========================================================================
          2. RACKMOUNT HARDWARE: SERVERS, PATCH PANELS & NETWORKING
      ========================================================================= */}
      {/* Top 1U Gigabit Patch Panel with Colorful RJ45 Network Cables */}
      <group position={[0, 2.25, 0.52]}>
        <mesh>
          <boxGeometry args={[1.2, 0.09, 0.04]} />
          <meshStandardMaterial color="#1e2430" roughness={0.4} metalness={0.7} />
        </mesh>
        {/* 16 RJ45 Jack Ports */}
        {[-0.45, -0.35, -0.25, -0.15, -0.05, 0.05, 0.15, 0.25, 0.35, 0.45].map((x, i) => (
          <group key={i} position={[x, 0, 0.022]}>
            <mesh>
              <boxGeometry args={[0.025, 0.02, 0.01]} />
              <meshStandardMaterial color="#090d14" />
            </mesh>
            {/* Arched Patch Cable Loop */}
            <mesh position={[0, -0.05, 0.03]} rotation={[0.4, 0, 0]}>
              <cylinderGeometry args={[0.005, 0.005, 0.09, 6]} />
              <meshStandardMaterial
                color={i % 3 === 0 ? '#38bdf8' : i % 3 === 1 ? '#22c55e' : '#f59e0b'}
                roughness={0.7}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* 2U Core Network Switch with Activity LED Matrix */}
      <group position={[0, 2.12, 0.52]}>
        <mesh>
          <boxGeometry args={[1.2, 0.14, 0.04]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Blinking Port LEDs */}
        {[-0.4, -0.25, -0.1, 0.05, 0.2, 0.35].map((x, i) => (
          <mesh key={i} position={[x, 0.03, 0.022]}>
            <circleGeometry args={[0.008, 8]} />
            <meshStandardMaterial
              color="#22c55e"
              emissive="#22c55e"
              emissiveIntensity={1.8}
            />
          </mesh>
        ))}
      </group>

      {/* Array of 2U High-Density Storage Servers with Hot-Swap Drive Caddies */}
      {[0.4, 0.68, 0.96, 1.24, 1.52, 1.8].map((y, idx) => (
        <group key={idx} position={[0, y, 0.52]}>
          {/* 2U Chassis Faceplate */}
          <mesh>
            <boxGeometry args={[1.2, 0.22, 0.04]} />
            <meshStandardMaterial color="#1a202c" roughness={0.4} metalness={0.7} />
          </mesh>
          {/* 4 Drive Caddies per Server */}
          {[-0.38, -0.12, 0.14, 0.4].map((dx, cIdx) => (
            <group key={cIdx} position={[dx, 0, 0.022]}>
              <mesh>
                <boxGeometry args={[0.2, 0.17, 0.01]} />
                <meshStandardMaterial color="#0f172a" roughness={0.5} />
              </mesh>
              {/* Caddy Release Latch */}
              <mesh position={[0, -0.06, 0.008]}>
                <boxGeometry args={[0.16, 0.02, 0.008]} />
                <meshStandardMaterial color="#64748b" metalness={0.8} />
              </mesh>
              {/* Drive Activity LED */}
              <mesh position={[0.07, 0.06, 0.008]}>
                <circleGeometry args={[0.006, 8]} />
                <meshStandardMaterial
                  color={cIdx % 2 === 0 ? '#10b981' : '#38bdf8'}
                  emissive={cIdx % 2 === 0 ? '#10b981' : '#38bdf8'}
                  emissiveIntensity={1.6}
                />
              </mesh>
            </group>
          ))}
        </group>
      ))}

      {/* =========================================================================
          3. ARTICULATED KVM SYSTEM TELEMETRY MONITOR ARM
      ========================================================================= */}
      <group position={[-0.75, 1.45, 0.2]} rotation={[0, 0.48, 0]}>
        {/* Heavy Cast Arm */}
        <mesh position={[0.12, 0, 0]}>
          <boxGeometry args={[0.24, 0.04, 0.04]} />
          <meshStandardMaterial color="#334155" metalness={0.85} roughness={0.2} />
        </mesh>
        {/* Monitor Enclosure */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.54, 0.38, 0.03]} />
          <meshStandardMaterial color="#090d14" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Active Telemetry Screen (Kubernetes, Network Latency, Memory) */}
        <mesh position={[0, 0, 0.018]}>
          <planeGeometry args={[0.5, 0.34]} />
          <meshStandardMaterial
            color="#083344"
            emissive="#06b6d4"
            emissiveIntensity={0.85}
            roughness={0.15}
          />
        </mesh>
      </group>

      {/* Ambient Server Rack Corner Cyan Glow */}
      <pointLight position={[-0.1, 1.4, 0.75]} color="#38bdf8" intensity={0.9} distance={2.8} />
    </group>
  );
};
